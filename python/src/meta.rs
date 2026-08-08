//! Wave 2: SDK session meta (rpc / node / verbosity).

use casper_rust_wasm_sdk::SDK;
use pyo3::prelude::*;

use crate::{parse_verbosity, py_err, verbosity_label};

/// Thin session wrapper around native `SDK` (addresses + verbosity).
#[pyclass(name = "Sdk")]
pub struct PySdk {
    inner: SDK,
}

#[pymethods]
impl PySdk {
    /// Construct with optional RPC URL, node URL, and verbosity (`low`|`medium`|`high`).
    #[new]
    #[pyo3(signature = (rpc_address=None, node_address=None, verbosity=None))]
    fn new(
        rpc_address: Option<String>,
        node_address: Option<String>,
        verbosity: Option<String>,
    ) -> PyResult<Self> {
        let verbosity = match verbosity {
            Some(v) => Some(parse_verbosity(&v)?),
            None => None,
        };
        Ok(Self {
            inner: SDK::new(rpc_address, node_address, verbosity),
        })
    }

    /// Effective RPC address (optional override, else stored, else empty).
    #[pyo3(signature = (rpc_address=None))]
    fn get_rpc_address(&self, rpc_address: Option<String>) -> String {
        self.inner.get_rpc_address(rpc_address)
    }

    /// Set stored RPC address.
    #[pyo3(signature = (rpc_address=None))]
    fn set_rpc_address(&mut self, rpc_address: Option<String>) -> PyResult<()> {
        self.inner.set_rpc_address(rpc_address).map_err(py_err)
    }

    /// Effective node address (optional override, else stored, else empty).
    #[pyo3(signature = (node_address=None))]
    fn get_node_address(&self, node_address: Option<String>) -> String {
        self.inner.get_node_address(node_address)
    }

    /// Set stored node address (binary-port not exposed in this epic).
    #[pyo3(signature = (node_address=None))]
    fn set_node_address(&mut self, node_address: Option<String>) -> PyResult<()> {
        self.inner.set_node_address(node_address).map_err(py_err)
    }

    /// Effective verbosity as `low`|`medium`|`high` (optional override, else stored).
    #[pyo3(signature = (verbosity=None))]
    fn get_verbosity(&self, verbosity: Option<String>) -> PyResult<String> {
        let override_v = match verbosity {
            Some(v) => Some(parse_verbosity(&v)?),
            None => None,
        };
        Ok(verbosity_label(self.inner.get_verbosity(override_v)).to_string())
    }

    /// Set stored verbosity (`low`|`medium`|`high`).
    #[pyo3(signature = (verbosity=None))]
    fn set_verbosity(&mut self, verbosity: Option<String>) -> PyResult<()> {
        let verbosity = match verbosity {
            Some(v) => Some(parse_verbosity(&v)?),
            None => None,
        };
        self.inner.set_verbosity(verbosity).map_err(py_err)
    }
}

pub fn register(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_class::<PySdk>()?;
    Ok(())
}
