//! SSE client + CES tools (feature `SSE`; includes `watcher`).

use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
use casper_rust_wasm_sdk::SSE::{
    parse_schemas_from_hex, CESParser, ContractMetadata, EventName, SSEClient,
};
use mcpkit::prelude::ToolOutput;
use serde_json::Value;

use crate::format;
use crate::sdk_handle;

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_SSE_collect",
        "sdk_CES_parser_create",
        "sdk_CES_parse_execution_result",
        "sdk_CES_parse_transaction",
    ]
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

#[allow(non_snake_case)]
pub async fn SSE_collect(
    events_url: String,
    event_names: String,
    max_events: Option<u64>,
    timeout_ms: Option<u64>,
    start_from: Option<u64>,
) -> ToolOutput {
    let names = match parse_event_names(&event_names) {
        Ok(n) => n,
        Err(err) => return format::err(err),
    };
    if names.is_empty() {
        return format::err("provide at least one event name");
    }
    let max = max_events.unwrap_or(10).max(1) as usize;
    let timeout = timeout_ms.unwrap_or(15_000);
    let client = SSEClient::new(events_url);
    match client.collect(&names, max, timeout, start_from).await {
        Ok(events) => format::serialize_ok(&events),
        Err(err) => format::err(err),
    }
}

#[allow(non_snake_case)]
pub async fn CES_parser_create(
    contract_hashes_json: String,
    state_root_hash: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let hashes: Vec<String> = match serde_json::from_str(&contract_hashes_json) {
        Ok(v) => v,
        Err(err) => {
            return format::err(format!(
                "contract_hashes_json must be a JSON string array: {err}"
            ))
        }
    };
    if hashes.is_empty() {
        return format::err("contract_hashes_json must be non-empty");
    }
    let sdk = sdk_handle::sdk_snapshot();
    let rpc = rpc_address.or_else(|| {
        let snap = sdk_handle::endpoint_snapshot();
        if snap.rpc_address.is_empty() {
            None
        } else {
            Some(snap.rpc_address)
        }
    });
    match CESParser::create(&sdk, &hashes, state_root_hash.as_deref(), rpc).await {
        Ok(parser) => match parser.schemas_json() {
            Ok(json) => format::text_ok(json),
            Err(err) => format::err(err),
        },
        Err(err) => format::err(err),
    }
}

#[allow(non_snake_case)]
pub fn CES_parse_execution_result(
    schemas_metadata_json: String,
    execution_result_json: String,
) -> ToolOutput {
    let parser = match parser_from_metadata_json(&schemas_metadata_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    match parser.parse_execution_result_json(&execution_result_json) {
        Ok(results) => format::serialize_ok(&results),
        Err(err) => format::err(err),
    }
}

#[allow(non_snake_case)]
pub async fn CES_parse_transaction(
    contract_hashes_json: String,
    transaction_hash: String,
    finalized_approvals: Option<bool>,
    state_root_hash: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let hashes: Vec<String> = match serde_json::from_str(&contract_hashes_json) {
        Ok(v) => v,
        Err(err) => {
            return format::err(format!(
                "contract_hashes_json must be a JSON string array: {err}"
            ))
        }
    };
    let hash = match TransactionHash::new(&transaction_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err.to_string()),
    };
    let sdk = sdk_handle::sdk_snapshot();
    let parser = match CESParser::create(
        &sdk,
        &hashes,
        state_root_hash.as_deref(),
        rpc_address.clone(),
    )
    .await
    {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };

    let tx = match sdk
        .get_transaction(
            hash,
            finalized_approvals,
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(r) => r,
        Err(err) => return format::err(format!("get_transaction failed: {err}")),
    };

    let tx_json = match serde_json::to_value(&tx.result) {
        Ok(v) => v,
        Err(err) => return format::err(format!("serialize transaction: {err}")),
    };

    let execution = tx_json
        .pointer("/execution_info/execution_result")
        .or_else(|| tx_json.pointer("/execution_result"))
        .cloned();

    let Some(execution) = execution else {
        return format::err("transaction has no execution_result");
    };

    match parser.parse_execution_result(&execution) {
        Ok(results) => format::serialize_ok(&serde_json::json!({
            "transaction_hash": transaction_hash,
            "events": results,
        })),
        Err(err) => format::err(err),
    }
}

fn parse_event_names(event_names: &str) -> Result<Vec<EventName>, String> {
    match serde_json::from_str::<Value>(event_names) {
        Ok(Value::Array(arr)) => {
            let mut out = Vec::new();
            for v in arr {
                let Some(s) = v.as_str() else {
                    return Err("event_names must be a JSON array of strings".into());
                };
                out.push(EventName::parse(s).ok_or_else(|| format!("unknown event name: {s}"))?);
            }
            Ok(out)
        }
        Ok(Value::String(s)) => Ok(vec![
            EventName::parse(&s).ok_or_else(|| format!("unknown event name: {s}"))?
        ]),
        _ => {
            let mut out = Vec::new();
            for part in event_names.split(',') {
                let s = part.trim();
                if s.is_empty() {
                    continue;
                }
                out.push(EventName::parse(s).ok_or_else(|| format!("unknown event name: {s}"))?);
            }
            Ok(out)
        }
    }
}

fn parser_from_metadata_json(schemas_metadata_json: &str) -> Result<CESParser, String> {
    let root: Value = serde_json::from_str(schemas_metadata_json)
        .map_err(|e| format!("invalid schemas_metadata_json: {e}"))?;

    let mut parser = CESParser::new();
    let Some(obj) = root.as_object() else {
        return Err("schemas_metadata_json must be a JSON object".into());
    };

    if obj.contains_key("schemaHex") && obj.contains_key("eventsUref") {
        insert_from_entry(
            &mut parser,
            obj.get("eventsUref").and_then(|v| v.as_str()).unwrap_or(""),
            obj,
        )?;
        return Ok(parser);
    }

    for (uref, meta) in obj {
        let Some(meta_obj) = meta.as_object() else {
            continue;
        };
        insert_from_entry(&mut parser, uref, meta_obj)?;
    }
    Ok(parser)
}

fn insert_from_entry(
    parser: &mut CESParser,
    uref: &str,
    meta: &serde_json::Map<String, Value>,
) -> Result<(), String> {
    let schema_hex = meta
        .get("schemaHex")
        .and_then(|v| v.as_str())
        .ok_or_else(|| {
            format!(
                "metadata for uref {uref} missing schemaHex (pass sdk_CES_parser_create output)"
            )
        })?;
    let schemas = parse_schemas_from_hex(schema_hex)?;
    let schema_bytes = hex::decode(schema_hex).map_err(|e| e.to_string())?;
    let contract_hash = meta
        .get("contractHash")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();
    let package = meta
        .get("contractPackageHash")
        .and_then(|v| v.as_str())
        .map(str::to_string);
    let schema_uref = meta
        .get("eventsSchemaUref")
        .and_then(|v| v.as_str())
        .unwrap_or("")
        .to_string();
    let events_uref = meta
        .get("eventsUref")
        .and_then(|v| v.as_str())
        .unwrap_or(uref)
        .to_string();
    parser.insert_metadata(ContractMetadata {
        schemas,
        contract_hash,
        contract_package_hash: package,
        events_schema_uref: schema_uref,
        events_uref,
        schema_bytes,
    });
    Ok(())
}
