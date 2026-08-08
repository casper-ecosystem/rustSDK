//! Non-deprecated JSON-RPC reads (JSON string results).

use casper_rust_wasm_sdk::{
    rpcs::{
        get_balance::GetBalanceInput,
        get_dictionary_item::DictionaryItemInput,
        query_global_state::{KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams},
    },
    types::{
        deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
        hash::transaction_hash::TransactionHash,
        identifier::block_identifier::BlockIdentifierInput, transaction::Transaction,
    },
    SDK,
};
use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;

use crate::{py_err, runtime};

fn block_id(maybe: Option<String>) -> Option<BlockIdentifierInput> {
    maybe.map(BlockIdentifierInput::String)
}

fn rpc_json<T: serde::Serialize>(result: T) -> PyResult<String> {
    serde_json::to_string(&result).map_err(py_err)
}

/// JSON-RPC `info_get_peers` → result JSON.
#[pyfunction]
#[pyo3(signature = (rpc_address=None))]
fn get_peers(rpc_address: Option<String>) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_peers(None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `info_get_chainspec` → result JSON.
#[pyfunction]
#[pyo3(signature = (rpc_address=None))]
fn get_chainspec(rpc_address: Option<String>) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_chainspec(None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `info_get_validator_changes` → result JSON.
#[pyfunction]
#[pyo3(signature = (rpc_address=None))]
fn get_validator_changes(rpc_address: Option<String>) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_validator_changes(None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `rpc.discover` / list RPCs → result JSON.
#[pyfunction]
#[pyo3(signature = (rpc_address=None))]
fn list_rpcs(rpc_address: Option<String>) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.list_rpcs(None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `chain_get_block` → result JSON.
#[pyfunction]
#[pyo3(signature = (maybe_block_identifier=None, rpc_address=None))]
fn get_block(
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_block(block_id(maybe_block_identifier), None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `chain_get_block_transfers` → result JSON.
#[pyfunction]
#[pyo3(signature = (maybe_block_identifier=None, rpc_address=None))]
fn get_block_transfers(
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_block_transfers(block_id(maybe_block_identifier), None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `chain_get_state_root_hash` → result JSON.
#[pyfunction]
#[pyo3(signature = (maybe_block_identifier=None, rpc_address=None))]
fn get_state_root_hash(
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_state_root_hash(block_id(maybe_block_identifier), None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `state_get_auction_info` → result JSON.
#[pyfunction]
#[pyo3(signature = (maybe_block_identifier=None, rpc_address=None))]
fn get_auction_info(
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_auction_info(block_id(maybe_block_identifier), None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `chain_get_era_summary` → result JSON.
#[pyfunction]
#[pyo3(signature = (maybe_block_identifier=None, rpc_address=None))]
fn get_era_summary(
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_era_summary(block_id(maybe_block_identifier), None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `info_get_reward` → result JSON.
#[pyfunction]
#[pyo3(signature = (validator, delegator=None, maybe_era_id=None, rpc_address=None))]
fn get_reward(
    validator: String,
    delegator: Option<String>,
    maybe_era_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_reward_as_string(
            &validator,
            delegator.as_deref(),
            maybe_era_id.as_deref(),
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `state_get_entity` → result JSON.
#[pyfunction]
#[pyo3(signature = (entity_identifier, maybe_block_identifier=None, rpc_address=None))]
fn get_entity(
    entity_identifier: String,
    maybe_block_identifier: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_entity(
            None,
            Some(entity_identifier),
            block_id(maybe_block_identifier),
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `info_get_transaction` → result JSON.
#[pyfunction]
#[pyo3(signature = (transaction_hash, finalized_approvals=None, rpc_address=None))]
fn get_transaction(
    transaction_hash: String,
    finalized_approvals: Option<bool>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let hash = TransactionHash::new(&transaction_hash).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_transaction(hash, finalized_approvals, None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `state_get_balance` (purse uref) → result JSON.
#[pyfunction]
#[pyo3(signature = (purse_uref, state_root_hash=None, rpc_address=None))]
fn get_balance(
    purse_uref: String,
    state_root_hash: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_balance(
            GetBalanceInput::PurseUrefAsString(purse_uref),
            state_root_hash.as_deref(),
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `query_balance` → result JSON.
#[pyfunction]
#[pyo3(signature = (purse_identifier, state_root_hash=None, maybe_block_id=None, rpc_address=None))]
fn query_balance(
    purse_identifier: String,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.query_balance(
            None,
            Some(purse_identifier),
            None,
            state_root_hash,
            maybe_block_id,
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `query_balance_details` → result JSON.
#[pyfunction]
#[pyo3(signature = (purse_identifier, state_root_hash=None, maybe_block_id=None, rpc_address=None))]
fn query_balance_details(
    purse_identifier: String,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.query_balance_details(
            None,
            Some(purse_identifier),
            None,
            state_root_hash,
            maybe_block_id,
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `query_global_state` → result JSON.
#[pyfunction]
#[pyo3(signature = (key, path=None, state_root_hash=None, maybe_block_id=None, rpc_address=None))]
fn query_global_state(
    key: String,
    path: Option<String>,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let params = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(key),
        path: path.map(PathIdentifierInput::String),
        maybe_global_state_identifier: None,
        state_root_hash,
        maybe_block_id,
        rpc_address,
        verbosity: None,
    };
    let response = rt
        .block_on(sdk.query_global_state(params))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `state_get_dictionary_item` → result JSON.
///
/// `kind`: `uref` | `dictionary` | `account_named_key` | `contract_named_key` | `entity_named_key`.
#[pyfunction]
#[pyo3(signature = (
    kind,
    key=None,
    dictionary_name=None,
    dictionary_item_key=None,
    seed_uref=None,
    dictionary_value=None,
    state_root_hash=None,
    rpc_address=None
))]
fn get_dictionary_item(
    kind: String,
    key: Option<String>,
    dictionary_name: Option<String>,
    dictionary_item_key: Option<String>,
    seed_uref: Option<String>,
    dictionary_value: Option<String>,
    state_root_hash: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let mut params = DictionaryItemStrParams::new();
    match kind.as_str() {
        "uref" => {
            let seed = seed_uref.ok_or_else(|| {
                PyRuntimeError::new_err("kind=uref requires seed_uref")
            })?;
            let item_key = dictionary_item_key.ok_or_else(|| {
                PyRuntimeError::new_err("kind=uref requires dictionary_item_key")
            })?;
            params.set_uref(&seed, &item_key);
        }
        "dictionary" => {
            let value = dictionary_value.ok_or_else(|| {
                PyRuntimeError::new_err("kind=dictionary requires dictionary_value")
            })?;
            params.set_dictionary(&value);
        }
        "account_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return Err(PyRuntimeError::new_err(
                        "kind=account_named_key requires key, dictionary_name, dictionary_item_key",
                    ))
                }
            };
            params.set_account_named_key(&k, &dn, &dik);
        }
        "contract_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return Err(PyRuntimeError::new_err(
                        "kind=contract_named_key requires key, dictionary_name, dictionary_item_key",
                    ))
                }
            };
            params.set_contract_named_key(&k, &dn, &dik);
        }
        "entity_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return Err(PyRuntimeError::new_err(
                        "kind=entity_named_key requires key, dictionary_name, dictionary_item_key",
                    ))
                }
            };
            params.set_entity_named_key(&k, &dn, &dik);
        }
        other => {
            return Err(PyRuntimeError::new_err(format!(
                "unknown kind '{other}' (uref|dictionary|account_named_key|contract_named_key|entity_named_key)"
            )))
        }
    }

    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_dictionary_item(
            DictionaryItemInput::Params(Box::new(params)),
            state_root_hash.as_deref(),
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    rpc_json(response.result)
}

/// JSON-RPC `speculative_exec` (transaction JSON in) → result JSON.
#[pyfunction]
#[pyo3(signature = (transaction_json, rpc_address=None))]
fn speculative_exec(transaction_json: String, rpc_address: Option<String>) -> PyResult<String> {
    let transaction = Transaction::from_json_string(&transaction_json).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.speculative_exec(transaction, None, rpc_address))
        .map_err(py_err)?;
    rpc_json(response.result)
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(get_peers, m)?)?;
    m.add_function(wrap_pyfunction!(get_chainspec, m)?)?;
    m.add_function(wrap_pyfunction!(get_validator_changes, m)?)?;
    m.add_function(wrap_pyfunction!(list_rpcs, m)?)?;
    m.add_function(wrap_pyfunction!(get_block, m)?)?;
    m.add_function(wrap_pyfunction!(get_block_transfers, m)?)?;
    m.add_function(wrap_pyfunction!(get_state_root_hash, m)?)?;
    m.add_function(wrap_pyfunction!(get_auction_info, m)?)?;
    m.add_function(wrap_pyfunction!(get_era_summary, m)?)?;
    m.add_function(wrap_pyfunction!(get_reward, m)?)?;
    m.add_function(wrap_pyfunction!(get_entity, m)?)?;
    m.add_function(wrap_pyfunction!(get_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(get_balance, m)?)?;
    m.add_function(wrap_pyfunction!(query_balance, m)?)?;
    m.add_function(wrap_pyfunction!(query_balance_details, m)?)?;
    m.add_function(wrap_pyfunction!(query_global_state, m)?)?;
    m.add_function(wrap_pyfunction!(get_dictionary_item, m)?)?;
    m.add_function(wrap_pyfunction!(speculative_exec, m)?)?;
    Ok(())
}
