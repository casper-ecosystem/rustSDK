//! Wave 4: wait_transaction (feature `watcher`).

use casper_rust_wasm_sdk::SDK;
use pyo3::exceptions::PyRuntimeError;
use pyo3::prelude::*;

use crate::{py_err, runtime};

/// Wait for a transaction hash on an SSE events URL (bounded by `timeout_ms`).
///
/// NCTL tip SSE base is typically `http://127.0.0.1:18101/events` (not `/events/main`).
#[pyfunction]
#[pyo3(signature = (events_url, transaction_hash, timeout_ms=None))]
fn wait_transaction(
    events_url: String,
    transaction_hash: String,
    timeout_ms: Option<u64>,
) -> PyResult<String> {
    let rt = runtime()?;
    let sdk = SDK::new(None, None, None);
    let result = rt
        .block_on(sdk.wait_transaction(&events_url, &transaction_hash, timeout_ms))
        .map_err(py_err)?;
    if let Some(err) = result.err.as_ref() {
        return Err(PyRuntimeError::new_err(err.clone()));
    }
    serde_json::to_string(&result).map_err(py_err)
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(wait_transaction, m)?)?;
    Ok(())
}
