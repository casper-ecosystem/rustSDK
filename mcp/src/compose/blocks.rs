//! Block composition tools: latest-N walk + tx hashes in a block.

use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
use casper_rust_wasm_sdk::types::identifier::block_identifier::BlockIdentifierInput;
use rmcp::model::CallToolResult;
use serde_json::{json, Value};

use crate::format;
use crate::sdk_handle;

pub fn tool_names() -> &'static [&'static str] {
    &["sdk_get_latest_blocks", "sdk_get_block_transactions"]
}

fn block_id(maybe: Option<String>) -> Option<BlockIdentifierInput> {
    maybe.map(BlockIdentifierInput::String)
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

fn ok_json<T: serde::Serialize, E: std::fmt::Display>(
    result: Result<T, E>,
) -> Result<Value, String> {
    match result {
        Ok(v) => serde_json::to_value(&v).map_err(|e| e.to_string()),
        Err(e) => Err(e.to_string()),
    }
}

/// Tip height from status, then fetch `count` blocks walking down.
pub async fn get_latest_blocks(
    count: Option<u32>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> CallToolResult {
    let count = count.unwrap_or(10).clamp(1, 50) as usize;
    let sdk = sdk_handle::sdk_snapshot();

    let status = match sdk
        .get_node_status(verb(verbosity.as_deref()), rpc_address.clone())
        .await
    {
        Ok(r) => r,
        Err(err) => return format::err(err),
    };
    let tip = match serde_json::to_value(&status.result).ok().and_then(|v| {
        v.pointer("/last_added_block_info/height")
            .or_else(|| v.pointer("/lastAddedBlockInfo/height"))
            .and_then(|h| h.as_u64())
    }) {
        Some(h) => h,
        None => return format::err("could not read tip height from get_node_status"),
    };

    let mut blocks = Vec::with_capacity(count);
    for i in 0..count {
        let height = match tip.checked_sub(i as u64) {
            Some(h) => h,
            None => break,
        };
        let sdk = sdk_handle::sdk_snapshot();
        match sdk
            .get_block(
                Some(BlockIdentifierInput::String(height.to_string())),
                verb(verbosity.as_deref()),
                rpc_address.clone(),
            )
            .await
        {
            Ok(resp) => match serde_json::to_value(&resp.result) {
                Ok(v) => blocks.push(v),
                Err(err) => return format::err(err),
            },
            Err(err) => return format::err(format!("height {height}: {err}")),
        }
    }

    format::json_ok(&json!({
        "tip_height": tip,
        "count": blocks.len(),
        "blocks": blocks,
    }))
}

/// Transaction hashes from a block body; optionally expand each via get_transaction.
pub async fn get_block_transactions(
    block_identifier: String,
    expand: Option<bool>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> CallToolResult {
    let sdk = sdk_handle::sdk_snapshot();
    let block = match sdk
        .get_block(
            block_id(Some(block_identifier)),
            verb(verbosity.as_deref()),
            rpc_address.clone(),
        )
        .await
    {
        Ok(resp) => match serde_json::to_value(&resp.result) {
            Ok(v) => v,
            Err(err) => return format::err(err),
        },
        Err(err) => return format::err(err),
    };

    let hashes = extract_tx_hashes(&block);
    if !expand.unwrap_or(false) {
        return format::json_ok(&json!({
            "transaction_hashes": hashes,
            "count": hashes.len(),
            "expanded": false,
        }));
    }

    let mut transactions = Vec::with_capacity(hashes.len());
    for hash in &hashes {
        let sdk = sdk_handle::sdk_snapshot();
        let th = match TransactionHash::new(hash) {
            Ok(h) => h,
            Err(err) => {
                transactions.push(json!({ "hash": hash, "error": err.to_string() }));
                continue;
            }
        };
        match sdk
            .get_transaction(th, None, verb(verbosity.as_deref()), rpc_address.clone())
            .await
        {
            Ok(resp) => match ok_json(Ok::<_, String>(resp.result)) {
                Ok(v) => transactions.push(json!({ "hash": hash, "transaction": v })),
                Err(err) => transactions.push(json!({ "hash": hash, "error": err })),
            },
            Err(err) => transactions.push(json!({ "hash": hash, "error": err.to_string() })),
        }
    }

    format::json_ok(&json!({
        "transaction_hashes": hashes,
        "count": transactions.len(),
        "expanded": true,
        "transactions": transactions,
    }))
}

fn extract_tx_hashes(block_value: &Value) -> Vec<String> {
    let mut out = Vec::new();
    let body = block_value
        .pointer("/block_with_signatures/block/Version2/body")
        .or_else(|| block_value.pointer("/block_with_signatures/block/Version1/body"))
        .or_else(|| block_value.pointer("/block_with_signatures/block/body"))
        .or_else(|| block_value.pointer("/block/body"))
        .unwrap_or(block_value);
    collect_hashes(body, &mut out);
    out.sort();
    out.dedup();
    out
}

fn collect_hashes(value: &Value, out: &mut Vec<String>) {
    match value {
        Value::String(s) => {
            let s = s.strip_prefix("transaction-").unwrap_or(s);
            if s.len() >= 64 && s.chars().all(|c| c.is_ascii_hexdigit()) {
                out.push(s.to_string());
            }
        }
        Value::Array(items) => {
            for item in items {
                collect_hashes(item, out);
            }
        }
        Value::Object(map) => {
            for v in map.values() {
                collect_hashes(v, out);
            }
        }
        _ => {}
    }
}
