//! Binary-port tools domain logic (feature `binary-port`).

use casper_rust_wasm_sdk::helpers;
use casper_rust_wasm_sdk::types::digest::Digest;
use casper_rust_wasm_sdk::types::hash::block_hash::BlockHash;
use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
use casper_rust_wasm_sdk::types::key::Key;
use casper_rust_wasm_sdk::types::public_key::PublicKey;
use casper_rust_wasm_sdk::types::record_id::RecordId;
use casper_rust_wasm_sdk::types::transaction::Transaction;
use casper_types::EraId;
use mcpkit::prelude::ToolOutput;
use serde::Serialize;

use crate::format;
use crate::sdk_handle;

/// Registered binary-port tool names for help text.
pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_get_binary_latest_switch_block_header",
        "sdk_get_binary_latest_block_header",
        "sdk_get_binary_block_header_by_height",
        "sdk_get_binary_block_header_by_hash",
        "sdk_get_binary_latest_block_with_signatures",
        "sdk_get_binary_block_with_signatures_by_height",
        "sdk_get_binary_block_with_signatures_by_hash",
        "sdk_get_binary_transaction_by_hash",
        "sdk_get_binary_peers",
        "sdk_get_binary_uptime",
        "sdk_get_binary_last_progress",
        "sdk_get_binary_reactor_state",
        "sdk_get_binary_network_name",
        "sdk_get_binary_consensus_validator_changes",
        "sdk_get_binary_block_synchronizer_status",
        "sdk_get_binary_available_block_range",
        "sdk_get_binary_next_upgrade",
        "sdk_get_binary_consensus_status",
        "sdk_get_binary_chainspec_raw_bytes",
        "sdk_get_binary_node_status",
        "sdk_get_binary_validator_reward_by_era",
        "sdk_get_binary_validator_reward_by_block_height",
        "sdk_get_binary_validator_reward_by_block_hash",
        "sdk_get_binary_delegator_reward_by_era",
        "sdk_get_binary_delegator_reward_by_block_height",
        "sdk_get_binary_delegator_reward_by_block_hash",
        "sdk_get_binary_read_record",
        "sdk_get_binary_global_state_item",
        "sdk_get_binary_global_state_item_by_state_root_hash",
        "sdk_get_binary_global_state_item_by_block_hash",
        "sdk_get_binary_global_state_item_by_block_height",
        "sdk_get_binary_try_speculative_execution",
        "sdk_get_binary_protocol_version",
    ]
}

fn bin_ok<T: Serialize, E: std::fmt::Display>(result: Result<T, E>) -> ToolOutput {
    match result {
        Ok(value) => format::serialize_ok(&value),
        Err(err) => format::err(err),
    }
}

fn parse_block_hash(hex: &str) -> Result<casper_types::BlockHash, String> {
    BlockHash::new(hex)
        .map(Into::into)
        .map_err(|e| e.to_string())
}

fn parse_tx_hash(hex: &str) -> Result<casper_types::TransactionHash, String> {
    TransactionHash::new(hex)
        .map(Into::into)
        .map_err(|e| e.to_string())
}

fn parse_pubkey(hex: &str) -> Result<casper_types::PublicKey, String> {
    PublicKey::new(hex)
        .map(Into::into)
        .map_err(|e| e.to_string())
}

fn parse_key(formatted: &str) -> Result<casper_types::Key, String> {
    Key::from_formatted_str(formatted)
        .map(Into::into)
        .map_err(|e| e.to_string())
}

fn parse_digest(hex: &str) -> Result<casper_types::Digest, String> {
    Digest::new(hex)
        .map(Into::into)
        .map_err(|e| e.to_string())
}

fn parse_path(path: Option<String>) -> Result<Vec<String>, String> {
    let Some(raw) = path.filter(|s| !s.trim().is_empty()) else {
        return Ok(Vec::new());
    };
    let trimmed = raw.trim();
    if trimmed.starts_with('[') {
        serde_json::from_str(trimmed).map_err(|e| format!("path JSON array: {e}"))
    } else {
        Ok(trimmed
            .split('/')
            .filter(|p| !p.is_empty())
            .map(str::to_string)
            .collect())
    }
}

macro_rules! bin_call {
    ($expr:expr) => {
        bin_ok($expr.await)
    };
}

pub async fn get_binary_latest_switch_block_header(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_latest_switch_block_header(node_address))
}

pub async fn get_binary_latest_block_header(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_latest_block_header(node_address))
}

pub async fn get_binary_block_header_by_height(
    height: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_block_header_by_height(node_address, height))
}

pub async fn get_binary_block_header_by_hash(
    block_hash: String,
    node_address: Option<String>,
) -> ToolOutput {
    let hash = match parse_block_hash(&block_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_block_header_by_hash(node_address, hash))
}

pub async fn get_binary_latest_block_with_signatures(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_latest_block_with_signatures(node_address))
}

pub async fn get_binary_block_with_signatures_by_height(
    height: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_block_with_signatures_by_height(node_address, height))
}

pub async fn get_binary_block_with_signatures_by_hash(
    block_hash: String,
    node_address: Option<String>,
) -> ToolOutput {
    let hash = match parse_block_hash(&block_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_block_with_signatures_by_hash(node_address, hash))
}

pub async fn get_binary_transaction_by_hash(
    hash: String,
    with_finalized_approvals: Option<bool>,
    node_address: Option<String>,
) -> ToolOutput {
    let tx_hash = match parse_tx_hash(&hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_transaction_by_hash(
        node_address,
        tx_hash,
        with_finalized_approvals.unwrap_or(false)
    ))
}

pub async fn get_binary_peers(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_peers(node_address))
}

pub async fn get_binary_uptime(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_uptime(node_address))
}

pub async fn get_binary_last_progress(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_last_progress(node_address))
}

pub async fn get_binary_reactor_state(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_reactor_state(node_address))
}

pub async fn get_binary_network_name(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_network_name(node_address))
}

pub async fn get_binary_consensus_validator_changes(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_consensus_validator_changes(node_address))
}

pub async fn get_binary_block_synchronizer_status(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_block_synchronizer_status(node_address))
}

pub async fn get_binary_available_block_range(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_available_block_range(node_address))
}

pub async fn get_binary_next_upgrade(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_next_upgrade(node_address))
}

pub async fn get_binary_consensus_status(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_consensus_status(node_address))
}

pub async fn get_binary_chainspec_raw_bytes(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_chainspec_raw_bytes(node_address))
}

pub async fn get_binary_node_status(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_node_status(node_address))
}

pub async fn get_binary_validator_reward_by_era(
    validator_key: String,
    era: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let pk = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_validator_reward_by_era(node_address, pk, EraId::new(era)))
}

pub async fn get_binary_validator_reward_by_block_height(
    validator_key: String,
    block_height: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let pk = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_validator_reward_by_block_height(node_address, pk, block_height))
}

pub async fn get_binary_validator_reward_by_block_hash(
    validator_key: String,
    block_hash: String,
    node_address: Option<String>,
) -> ToolOutput {
    let pk = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let hash = match parse_block_hash(&block_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_validator_reward_by_block_hash(node_address, pk, hash))
}

pub async fn get_binary_delegator_reward_by_era(
    validator_key: String,
    delegator_key: String,
    era: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let v = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let d = match parse_pubkey(&delegator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_delegator_reward_by_era(node_address, v, d, EraId::new(era)))
}

pub async fn get_binary_delegator_reward_by_block_height(
    validator_key: String,
    delegator_key: String,
    block_height: u64,
    node_address: Option<String>,
) -> ToolOutput {
    let v = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let d = match parse_pubkey(&delegator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_delegator_reward_by_block_height(node_address, v, d, block_height))
}

pub async fn get_binary_delegator_reward_by_block_hash(
    validator_key: String,
    delegator_key: String,
    block_hash: String,
    node_address: Option<String>,
) -> ToolOutput {
    let v = match parse_pubkey(&validator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let d = match parse_pubkey(&delegator_key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let hash = match parse_block_hash(&block_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_delegator_reward_by_block_hash(node_address, v, d, hash))
}

pub async fn get_binary_read_record(
    record_id: u16,
    key_hex: String,
    node_address: Option<String>,
) -> ToolOutput {
    let id = match RecordId::new(record_id) {
        Ok(id) => id,
        Err(err) => return format::err(err),
    };
    let key = helpers::hex_to_uint8_vec(&key_hex);
    if key.is_empty() {
        return format::err("key_hex decoded empty (need even-length hex)");
    }
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .get_binary_read_record(node_address, id.into(), &key)
        .await
    {
        Ok(bytes) => format::json_ok(&serde_json::json!({
            "bytes_hex": hex::encode(bytes),
        })),
        Err(err) => format::err(err),
    }
}

pub async fn get_binary_global_state_item(
    key: String,
    path: Option<String>,
    node_address: Option<String>,
) -> ToolOutput {
    let key = match parse_key(&key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let path = match parse_path(path) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_global_state_item(node_address, key, path))
}

pub async fn get_binary_global_state_item_by_state_root_hash(
    state_root_hash: String,
    key: String,
    path: Option<String>,
    node_address: Option<String>,
) -> ToolOutput {
    let digest = match parse_digest(&state_root_hash) {
        Ok(d) => d,
        Err(err) => return format::err(err),
    };
    let key = match parse_key(&key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let path = match parse_path(path) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_global_state_item_by_state_root_hash(node_address, digest, key, path))
}

pub async fn get_binary_global_state_item_by_block_hash(
    block_hash: String,
    key: String,
    path: Option<String>,
    node_address: Option<String>,
) -> ToolOutput {
    let hash = match parse_block_hash(&block_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let key = match parse_key(&key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let path = match parse_path(path) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_global_state_item_by_block_hash(node_address, hash, key, path))
}

pub async fn get_binary_global_state_item_by_block_height(
    block_height: u64,
    key: String,
    path: Option<String>,
    node_address: Option<String>,
) -> ToolOutput {
    let key = match parse_key(&key) {
        Ok(k) => k,
        Err(err) => return format::err(err),
    };
    let path = match parse_path(path) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_global_state_item_by_block_height(node_address, block_height, key, path))
}

pub async fn get_binary_try_speculative_execution(
    transaction_json: String,
    node_address: Option<String>,
) -> ToolOutput {
    let transaction = match Transaction::from_json_string(&transaction_json) {
        Ok(t) => t,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_try_speculative_execution(node_address, transaction.into()))
}

pub async fn get_binary_protocol_version(node_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    bin_call!(sdk.get_binary_protocol_version(node_address))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_path_slash_and_json() {
        assert_eq!(
            parse_path(Some("a/b/c".into())).unwrap(),
            vec!["a", "b", "c"]
        );
        assert_eq!(
            parse_path(Some(r#"["x","y"]"#.into())).unwrap(),
            vec!["x", "y"]
        );
        assert!(parse_path(None).unwrap().is_empty());
    }

    #[test]
    fn tool_names_nonempty() {
        assert!(tool_names().len() >= 30);
    }
}
