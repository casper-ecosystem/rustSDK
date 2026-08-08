//! Wave 2: helpers (feature `helpers`; offline-friendly).

use casper_rust_wasm_sdk::{
    helpers,
    types::{key::Key, verbosity::Verbosity},
};
use casper_types::{SecretKey, U256};
use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;
use pyo3::types::PyDict;
use std::str::FromStr;

use crate::{parse_verbosity, py_err, secret_key_to_pem};

/// Current RFC3339 timestamp (optional unix-ms override string).
#[pyfunction]
#[pyo3(signature = (timestamp=None))]
fn get_current_timestamp(timestamp: Option<String>) -> String {
    helpers::get_current_timestamp(timestamp)
}

/// Blake2b-256 hex digest of a UTF-8 string.
#[pyfunction]
fn get_blake2b_hash(meta_data: String) -> String {
    helpers::get_blake2b_hash(&meta_data)
}

/// Dictionary item key from formatted key + exactly one of `value_key` or `value_u256`.
#[pyfunction]
#[pyo3(signature = (key, value_key=None, value_u256=None))]
fn make_dictionary_item_key(
    key: String,
    value_key: Option<String>,
    value_u256: Option<String>,
) -> PyResult<String> {
    let key = Key::from_formatted_str(&key).map_err(|e| py_err(format!("invalid key: {e}")))?;
    match (value_key, value_u256) {
        (Some(vk), None) => {
            let value = Key::from_formatted_str(&vk)
                .map_err(|e| py_err(format!("invalid value_key: {e}")))?;
            Ok(helpers::make_dictionary_item_key(&key, &value))
        }
        (None, Some(vu)) => {
            let value =
                U256::from_str(&vu).map_err(|e| py_err(format!("invalid value_u256: {e}")))?;
            Ok(helpers::make_dictionary_item_key(&key, &value))
        }
        _ => Err(PyRuntimeError::new_err(
            "provide exactly one of value_key or value_u256",
        )),
    }
}

/// CEP-18 base64 key from `account-hash-…` string.
#[pyfunction]
fn get_base64_key_from_account_hash(account_hash: String) -> PyResult<String> {
    helpers::get_base64_key_from_account_hash(&account_hash).map_err(py_err)
}

/// CEP-18 base64 key from `hash-…` formatted key.
#[pyfunction]
fn get_base64_key_from_key_hash(formatted_hash: String) -> PyResult<String> {
    helpers::get_base64_key_from_key_hash(&formatted_hash).map_err(py_err)
}

/// Remap `entity-contract-…` / bare hex to `hash-…` for global-state queries.
#[pyfunction]
fn contract_hash_key_for_global_state(formatted: String) -> String {
    helpers::contract_hash_key_for_global_state(&formatted)
}

/// TTL string or SDK default.
#[pyfunction]
#[pyo3(signature = (ttl=None))]
fn get_ttl_or_default(ttl: Option<String>) -> String {
    helpers::get_ttl_or_default(ttl.as_deref())
}

/// Parse a timestamp string → string form.
#[pyfunction]
fn parse_timestamp(value: String) -> PyResult<String> {
    helpers::parse_timestamp(&value)
        .map(|ts| ts.to_string())
        .map_err(py_err)
}

/// Parse a TTL / TimeDiff string → string form.
#[pyfunction]
fn parse_ttl(value: String) -> PyResult<String> {
    helpers::parse_ttl(&value)
        .map(|ttl| ttl.to_string())
        .map_err(py_err)
}

/// Gas price or SDK default.
#[pyfunction]
#[pyo3(signature = (gas_price=None))]
fn get_gas_price_or_default(gas_price: Option<u64>) -> u64 {
    helpers::get_gas_price_or_default(gas_price)
}

/// Generate Ed25519 secret key PEM (local; treat as secret).
#[pyfunction]
fn secret_key_generate() -> PyResult<String> {
    let sk = helpers::secret_key_generate().map_err(py_err)?;
    secret_key_to_pem(&sk)
}

/// Generate secp256k1 secret key PEM (local; treat as secret).
#[pyfunction]
fn secret_key_secp256k1_generate() -> PyResult<String> {
    let sk = helpers::secret_key_secp256k1_generate().map_err(py_err)?;
    secret_key_to_pem(&sk)
}

/// Validate a secret key PEM (does not echo the secret). Returns algorithm label.
#[pyfunction]
fn secret_key_from_pem(py: Python<'_>, secret_key: String) -> PyResult<Bound<'_, PyDict>> {
    let sk = helpers::secret_key_from_pem(&secret_key).map_err(py_err)?;
    let algorithm = algorithm_label(&sk);
    let dict = PyDict::new(py);
    dict.set_item("ok", true)?;
    dict.set_item("algorithm", algorithm)?;
    Ok(dict)
}

/// Public key hex for a Casper secret key PEM.
#[pyfunction]
fn public_key_from_secret_key(secret_key: String) -> PyResult<String> {
    helpers::public_key_from_secret_key(&secret_key).map_err(py_err)
}

/// Decode hex string to bytes.
#[pyfunction]
fn hex_to_uint8_vec(hex_string: String) -> Vec<u8> {
    helpers::hex_to_uint8_vec(&hex_string)
}

/// Decode hex string to UTF-8 (lossy) text.
#[pyfunction]
fn hex_to_string(hex_string: String) -> String {
    helpers::hex_to_string(&hex_string)
}

/// Convert motes string to CSPR string.
#[pyfunction]
fn motes_to_cspr(motes: String) -> PyResult<String> {
    helpers::motes_to_cspr(&motes).map_err(py_err)
}

/// Pretty-print a JSON string at optional verbosity (`low`|`medium`|`high`).
#[pyfunction]
#[pyo3(signature = (value, verbosity=None))]
fn json_pretty_print(value: String, verbosity: Option<String>) -> PyResult<String> {
    let parsed: serde_json::Value =
        serde_json::from_str(&value).map_err(|e| py_err(format!("value must be JSON: {e}")))?;
    let verbosity: Option<Verbosity> = verbosity.as_deref().map(parse_verbosity).transpose()?;
    helpers::json_pretty_print(parsed, verbosity).map_err(py_err)
}

/// Convert a CLValue JSON document to JSON string.
#[pyfunction]
fn cl_value_to_json(cl_value_json: String) -> PyResult<String> {
    let cl_value: casper_types::CLValue = serde_json::from_str(&cl_value_json)
        .map_err(|e| py_err(format!("cl_value_json must deserialize as CLValue: {e}")))?;
    match helpers::cl_value_to_json(&cl_value) {
        Some(v) => serde_json::to_string(&v).map_err(py_err),
        None => Err(PyRuntimeError::new_err("cl_value_to_json returned None")),
    }
}

fn algorithm_label(sk: &SecretKey) -> &'static str {
    match sk {
        SecretKey::Ed25519(_) => "ed25519",
        SecretKey::Secp256k1(_) => "secp256k1",
        _ => "unknown",
    }
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(get_current_timestamp, m)?)?;
    m.add_function(wrap_pyfunction!(get_blake2b_hash, m)?)?;
    m.add_function(wrap_pyfunction!(make_dictionary_item_key, m)?)?;
    m.add_function(wrap_pyfunction!(get_base64_key_from_account_hash, m)?)?;
    m.add_function(wrap_pyfunction!(get_base64_key_from_key_hash, m)?)?;
    m.add_function(wrap_pyfunction!(contract_hash_key_for_global_state, m)?)?;
    m.add_function(wrap_pyfunction!(get_ttl_or_default, m)?)?;
    m.add_function(wrap_pyfunction!(parse_timestamp, m)?)?;
    m.add_function(wrap_pyfunction!(parse_ttl, m)?)?;
    m.add_function(wrap_pyfunction!(get_gas_price_or_default, m)?)?;
    m.add_function(wrap_pyfunction!(secret_key_generate, m)?)?;
    m.add_function(wrap_pyfunction!(secret_key_secp256k1_generate, m)?)?;
    m.add_function(wrap_pyfunction!(secret_key_from_pem, m)?)?;
    m.add_function(wrap_pyfunction!(public_key_from_secret_key, m)?)?;
    m.add_function(wrap_pyfunction!(hex_to_uint8_vec, m)?)?;
    m.add_function(wrap_pyfunction!(hex_to_string, m)?)?;
    m.add_function(wrap_pyfunction!(motes_to_cspr, m)?)?;
    m.add_function(wrap_pyfunction!(json_pretty_print, m)?)?;
    m.add_function(wrap_pyfunction!(cl_value_to_json, m)?)?;
    Ok(())
}
