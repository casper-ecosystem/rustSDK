//! Contract query tools (feature `contract`).

use casper_rust_wasm_sdk::rpcs::get_dictionary_item::DictionaryItemInput;
use casper_rust_wasm_sdk::rpcs::query_global_state::PathIdentifierInput;
use casper_rust_wasm_sdk::types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams;
use casper_rust_wasm_sdk::types::identifier::block_identifier::BlockIdentifierInput;
use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;

pub fn tool_names() -> &'static [&'static str] {
    &["sdk_query_contract_dict", "sdk_query_contract_key"]
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

fn parse_dictionary_item(kind: &str, fields: &serde_json::Value) -> Result<DictionaryItemInput, String> {
    let mut params = DictionaryItemStrParams::new();
    match kind {
        "uref" => {
            let seed = fields
                .get("seed_uref")
                .and_then(|v| v.as_str())
                .ok_or("uref requires seed_uref")?;
            let item = fields
                .get("dictionary_item_key")
                .and_then(|v| v.as_str())
                .ok_or("uref requires dictionary_item_key")?;
            params.set_uref(seed, item);
        }
        "dictionary" => {
            let value = fields
                .get("dictionary_value")
                .or_else(|| fields.get("value"))
                .and_then(|v| v.as_str())
                .ok_or("dictionary requires dictionary_value")?;
            params.set_dictionary(value);
        }
        "account_named_key" => {
            let key = fields
                .get("key")
                .and_then(|v| v.as_str())
                .ok_or("account_named_key requires key")?;
            let dn = fields
                .get("dictionary_name")
                .and_then(|v| v.as_str())
                .ok_or("account_named_key requires dictionary_name")?;
            let dik = fields
                .get("dictionary_item_key")
                .and_then(|v| v.as_str())
                .ok_or("account_named_key requires dictionary_item_key")?;
            params.set_account_named_key(key, dn, dik);
        }
        "contract_named_key" => {
            let key = fields
                .get("key")
                .and_then(|v| v.as_str())
                .ok_or("contract_named_key requires key")?;
            let dn = fields
                .get("dictionary_name")
                .and_then(|v| v.as_str())
                .ok_or("contract_named_key requires dictionary_name")?;
            let dik = fields
                .get("dictionary_item_key")
                .and_then(|v| v.as_str())
                .ok_or("contract_named_key requires dictionary_item_key")?;
            params.set_contract_named_key(key, dn, dik);
        }
        "entity_named_key" => {
            let key = fields
                .get("key")
                .and_then(|v| v.as_str())
                .ok_or("entity_named_key requires key")?;
            let dn = fields
                .get("dictionary_name")
                .and_then(|v| v.as_str())
                .ok_or("entity_named_key requires dictionary_name")?;
            let dik = fields
                .get("dictionary_item_key")
                .and_then(|v| v.as_str())
                .ok_or("entity_named_key requires dictionary_item_key")?;
            params.set_entity_named_key(key, dn, dik);
        }
        other => {
            return Err(format!(
                "unknown dictionary kind `{other}` (uref|dictionary|account_named_key|…)"
            ))
        }
    }
    Ok(DictionaryItemInput::Params(Box::new(params)))
}

pub async fn query_contract_dict(
    kind: String,
    dictionary_item_json: String,
    state_root_hash: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let fields: serde_json::Value = match serde_json::from_str(&dictionary_item_json) {
        Ok(v) => v,
        Err(err) => return format::err(format!("dictionary_item_json: {err}")),
    };
    let input = match parse_dictionary_item(&kind, &fields) {
        Ok(i) => i,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .query_contract_dict(
            input,
            state_root_hash.as_deref(),
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn query_contract_key(
    entity_identifier: String,
    path: String,
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    let path = PathIdentifierInput::String(path);
    let block = maybe_block_identifier.map(BlockIdentifierInput::String);
    match sdk
        .query_contract_key(
            None,
            Some(entity_identifier),
            path,
            block,
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}
