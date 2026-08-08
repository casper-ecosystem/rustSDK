//! Transaction make / sign / put / high-level / speculative.

use casper_rust_wasm_sdk::{types::transaction::Transaction, SDK};
use pyo3::prelude::*;

use crate::params::{
    parse_optional_uref, parse_transaction_builder_params, parse_transaction_str_params,
};
use crate::{py_err, runtime};

fn tx_json(tx: Transaction) -> PyResult<String> {
    tx.to_json_string().map_err(py_err)
}

/// Build a transaction from builder + str params JSON (no put).
#[pyfunction]
fn make_transaction(
    builder_params_json: String,
    transaction_params_json: String,
) -> PyResult<String> {
    let builder = parse_transaction_builder_params(&builder_params_json).map_err(py_err)?;
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let sdk = SDK::new(None, None, None);
    tx_json(sdk.make_transaction(builder, params).map_err(py_err)?)
}

/// Build a native transfer transaction (no put).
#[pyfunction]
#[pyo3(signature = (target, amount, transaction_params_json, maybe_source=None, maybe_id=None))]
fn make_transfer_transaction(
    target: String,
    amount: String,
    transaction_params_json: String,
    maybe_source: Option<String>,
    maybe_id: Option<String>,
) -> PyResult<String> {
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let source = parse_optional_uref(maybe_source.as_deref()).map_err(py_err)?;
    let sdk = SDK::new(None, None, None);
    tx_json(
        sdk.make_transfer_transaction(source, &target, &amount, params, maybe_id)
            .map_err(py_err)?,
    )
}

/// Sign a transaction JSON with a secret key PEM (does not put).
#[pyfunction]
fn sign_transaction(transaction_json: String, secret_key: String) -> PyResult<String> {
    let tx = Transaction::from_json_string(&transaction_json).map_err(py_err)?;
    let sdk = SDK::new(None, None, None);
    tx_json(sdk.sign_transaction(tx, &secret_key))
}

/// Submit a signed transaction JSON (`account_put_transaction`).
#[pyfunction]
#[pyo3(signature = (transaction_json, rpc_address=None))]
fn put_transaction(transaction_json: String, rpc_address: Option<String>) -> PyResult<String> {
    let tx = Transaction::from_json_string(&transaction_json).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.put_transaction(tx, None, rpc_address))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Build, sign (if secret in params), and put a transaction.
#[pyfunction]
#[pyo3(signature = (builder_params_json, transaction_params_json, rpc_address=None))]
fn transaction(
    builder_params_json: String,
    transaction_params_json: String,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let builder = parse_transaction_builder_params(&builder_params_json).map_err(py_err)?;
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.transaction(builder, params, None, rpc_address))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Build, sign, and put a native transfer.
#[pyfunction]
#[pyo3(signature = (target_account, amount, transaction_params_json, maybe_source=None, maybe_id=None, rpc_address=None))]
fn transfer_transaction(
    target_account: String,
    amount: String,
    transaction_params_json: String,
    maybe_source: Option<String>,
    maybe_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let source = parse_optional_uref(maybe_source.as_deref()).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.transfer_transaction(
            source,
            &target_account,
            &amount,
            params,
            maybe_id,
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Speculative exec of a built transaction (builder + params).
#[pyfunction]
#[pyo3(signature = (builder_params_json, transaction_params_json, rpc_address=None))]
fn speculative_transaction(
    builder_params_json: String,
    transaction_params_json: String,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let builder = parse_transaction_builder_params(&builder_params_json).map_err(py_err)?;
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.speculative_transaction(builder, params, None, rpc_address))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

/// Speculative native transfer.
#[pyfunction]
#[pyo3(signature = (target_account, amount, transaction_params_json, maybe_source=None, maybe_id=None, rpc_address=None))]
fn speculative_transfer_transaction(
    target_account: String,
    amount: String,
    transaction_params_json: String,
    maybe_source: Option<String>,
    maybe_id: Option<String>,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let params = parse_transaction_str_params(&transaction_params_json).map_err(py_err)?;
    let source = parse_optional_uref(maybe_source.as_deref()).map_err(py_err)?;
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.speculative_transfer_transaction(
            source,
            &target_account,
            &amount,
            params,
            maybe_id,
            None,
            rpc_address,
        ))
        .map_err(py_err)?;
    serde_json::to_string(&response.result).map_err(py_err)
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(make_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(make_transfer_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(sign_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(put_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(transaction, m)?)?;
    m.add_function(wrap_pyfunction!(transfer_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(speculative_transaction, m)?)?;
    m.add_function(wrap_pyfunction!(speculative_transfer_transaction, m)?)?;
    Ok(())
}
