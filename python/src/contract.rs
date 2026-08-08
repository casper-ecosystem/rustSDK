//! Wave 3: contract query / install / call_entrypoint (transaction path only).

use casper_rust_wasm_sdk::{
    helpers as sdk_helpers,
    rpcs::{get_dictionary_item::DictionaryItemInput, query_global_state::PathIdentifierInput},
    types::{
        cl::bytes::Bytes, deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
        identifier::block_identifier::BlockIdentifierInput,
    },
    SDK,
};
use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;

use crate::params::{parse_transaction_builder_params, parse_transaction_str_params};
use crate::{py_err, runtime};

fn parse_dictionary_item(
    kind: &str,
    fields: &serde_json::Value,
) -> Result<DictionaryItemInput, String> {
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

/// Query a contract dictionary item → result JSON.
#[pyfunction]
#[pyo3(signature = (kind, dictionary_item_json, state_root_hash=None, rpc_address=None))]
fn query_contract_dict(
    kind: String,
    dictionary_item_json: String,
    state_root_hash: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let fields: serde_json::Value = serde_json::from_str(&dictionary_item_json)
        .map_err(|e| py_err(format!("dictionary_item_json: {e}")))?;
    let input = parse_dictionary_item(&kind, &fields).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.query_contract_dict(input, state_root_hash.as_deref(), None, rpc_address))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Query a named key under an entity → result JSON.
#[pyfunction]
#[pyo3(signature = (entity_identifier, path, maybe_block_identifier=None, rpc_address=None))]
fn query_contract_key(
    entity_identifier: String,
    path: String,
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let path = PathIdentifierInput::String(path);
    let block = maybe_block_identifier.map(BlockIdentifierInput::String);
    let response = rt
        .block_on(sdk.query_contract_key(
            None,
            Some(entity_identifier),
            path,
            block,
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Install session wasm (`is_install_upgrade`). `runtime_v2`: None/true → V2; false → V1.
#[pyfunction]
#[pyo3(signature = (transaction_params_json, wasm_hex, rpc_address=None, runtime_v2=None))]
fn install(
    transaction_params_json: String,
    wasm_hex: String,
    rpc_address: Option<String>,
    runtime_v2: Option<bool>,
) -> PyResult<String> {
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let bytes = sdk_helpers::hex_to_uint8_vec(&wasm_hex);
    if bytes.is_empty() {
        return Err(PyRuntimeError::new_err("wasm_hex decoded empty"));
    }
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.install(params, Bytes::from(bytes), rpc_address, runtime_v2))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Call a contract entrypoint (put). Builder JSON may set `runtime` v1|v2; or pass `runtime_v2`.
#[pyfunction]
#[pyo3(signature = (builder_params_json, transaction_params_json, rpc_address=None, runtime_v2=None))]
fn call_entrypoint(
    builder_params_json: String,
    transaction_params_json: String,
    rpc_address: Option<String>,
    runtime_v2: Option<bool>,
) -> PyResult<String> {
    let builder = parse_transaction_builder_params(&builder_params_json).map_err(py_err)?;
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.call_entrypoint(builder, params, rpc_address, runtime_v2))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(query_contract_dict, m)?)?;
    m.add_function(wrap_pyfunction!(query_contract_key, m)?)?;
    m.add_function(wrap_pyfunction!(install, m)?)?;
    m.add_function(wrap_pyfunction!(call_entrypoint, m)?)?;
    Ok(())
}
