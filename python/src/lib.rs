//! Thin PyO3 face over `casper-rust-wasm-sdk` (native cdylib).
//!
//! Spike + Waves 1–4 (RPC reads, helpers/meta, transaction/contract, watcher).

mod contract;
mod helpers;
mod meta;
mod params;
mod rpc;
mod transaction;
mod watcher;

use casper_rust_wasm_sdk::{
    helpers::public_key_from_secret_key,
    types::{
        transaction::Transaction, transaction_params::transaction_str_params::TransactionStrParams,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_types::SecretKey;
use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;
use pyo3::types::PyDict;

pub(crate) fn runtime() -> Result<tokio::runtime::Runtime, PyErr> {
    tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .map_err(|e| PyRuntimeError::new_err(format!("tokio runtime: {e}")))
}

pub(crate) fn py_err(err: impl std::fmt::Display) -> PyErr {
    PyRuntimeError::new_err(err.to_string())
}

pub(crate) fn secret_key_to_pem(secret_key: &SecretKey) -> Result<String, PyErr> {
    secret_key
        .to_pem()
        .map_err(|e| py_err(format!("secret key to pem: {e}")))
}

pub(crate) fn parse_verbosity(raw: &str) -> PyResult<Verbosity> {
    match raw.to_lowercase().as_str() {
        "low" | "0" => Ok(Verbosity::Low),
        "medium" | "1" => Ok(Verbosity::Medium),
        "high" | "2" => Ok(Verbosity::High),
        other => Err(PyRuntimeError::new_err(format!(
            "invalid verbosity '{other}' (low|medium|high)"
        ))),
    }
}

pub(crate) fn verbosity_label(v: Verbosity) -> &'static str {
    match v {
        Verbosity::Low => "low",
        Verbosity::Medium => "medium",
        Verbosity::High => "high",
    }
}

/// Call `info_get_status`. Returns chainspec name, build version, and full result JSON.
#[pyfunction]
#[pyo3(signature = (rpc_address=None))]
fn get_node_status(py: Python<'_>, rpc_address: Option<String>) -> PyResult<Bound<'_, PyDict>> {
    let rt = runtime()?;
    let sdk = SDK::new(rpc_address.clone(), None, None);
    let response = rt
        .block_on(sdk.get_node_status(None, rpc_address))
        .map_err(py_err)?;

    let result = response.result;
    let dict = PyDict::new(py);
    dict.set_item("chainspec_name", result.chainspec_name.clone())?;
    dict.set_item("build_version", result.build_version.clone())?;
    dict.set_item(
        "api_version",
        serde_json::to_string(&result.api_version).map_err(py_err)?,
    )?;
    dict.set_item("json", serde_json::to_string(&result).map_err(py_err)?)?;
    Ok(dict)
}

/// Spike alias for `secret_key_generate`.
#[pyfunction]
fn generate_secret_key_pem() -> PyResult<String> {
    let sk = casper_rust_wasm_sdk::helpers::secret_key_generate().map_err(py_err)?;
    secret_key_to_pem(&sk)
}

/// Spike alias for `public_key_from_secret_key`.
#[pyfunction]
fn public_key_hex(secret_key_pem: String) -> PyResult<String> {
    public_key_from_secret_key(&secret_key_pem).map_err(py_err)
}

/// Build and sign a native transfer transaction (does not submit).
///
/// Returns JSON for the signed `Transaction`.
#[pyfunction]
#[pyo3(signature = (target, amount, chain_name, secret_key_pem, payment_amount, rpc_address=None))]
fn make_signed_transfer(
    target: String,
    amount: String,
    chain_name: String,
    secret_key_pem: String,
    payment_amount: String,
    rpc_address: Option<String>,
) -> PyResult<String> {
    let sdk = SDK::new(rpc_address, None, None);
    let params = TransactionStrParams::default();
    params.set_secret_key(&secret_key_pem);
    params.set_chain_name(&chain_name);
    params.set_payment_amount(&payment_amount);

    let tx: Transaction = sdk
        .make_transfer_transaction(None, &target, &amount, params, None)
        .map_err(py_err)?;
    let signed = sdk.sign_transaction(tx, &secret_key_pem);
    signed.to_json_string().map_err(py_err)
}

/// Extension package version (`CARGO_PKG_VERSION`).
#[pyfunction]
fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[pymodule]
fn casper_rust_wasm_sdk_py(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(get_node_status, m)?)?;
    m.add_function(wrap_pyfunction!(make_signed_transfer, m)?)?;
    m.add_function(wrap_pyfunction!(generate_secret_key_pem, m)?)?;
    m.add_function(wrap_pyfunction!(public_key_hex, m)?)?;
    m.add_function(wrap_pyfunction!(version, m)?)?;
    rpc::register(m)?;
    helpers::register(m)?;
    meta::register(m)?;
    transaction::register(m)?;
    contract::register(m)?;
    watcher::register(m)?;
    Ok(())
}
