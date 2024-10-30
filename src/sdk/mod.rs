pub mod binary_port;
#[allow(hidden_glob_reexports)]
pub(crate) mod deploy;
pub mod rpcs;
#[allow(hidden_glob_reexports)]
pub(crate) mod transaction;
pub use deploy::*;
pub use transaction::*;

pub(crate) mod deploy_utils;
pub(crate) use deploy_utils::*;

pub(crate) mod transaction_utils;
pub(crate) use transaction_utils::*;

pub mod watcher;

pub(crate) mod contract;
pub use contract::*;

use wasm_bindgen::prelude::*;

use crate::{debug::log, types::verbosity::Verbosity};

#[wasm_bindgen]
pub struct SDK {
    rpc_address: Option<String>,
    node_address: Option<String>,
    verbosity: Option<Verbosity>,
}

impl Default for SDK {
    fn default() -> Self {
        Self::new(None, None, None)
    }
}

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(constructor)]
    pub fn new(
        rpc_address: Option<String>,
        node_address: Option<String>,
        verbosity: Option<Verbosity>,
    ) -> Self {
        SDK {
            rpc_address,
            node_address,
            verbosity,
        }
    }

    #[wasm_bindgen(js_name = "getRPCAddress")]
    pub fn get_rpc_address(&self, rpc_address: Option<String>) -> String {
        rpc_address
            .as_ref()
            .cloned()
            .or_else(|| self.rpc_address.as_ref().map(String::to_owned))
            .unwrap_or_default()
    }

    #[wasm_bindgen(js_name = "setRPCAddress")]
    pub fn set_rpc_address(&mut self, rpc_address: Option<String>) -> Result<(), String> {
        self.rpc_address = rpc_address;
        Ok(())
    }

    #[wasm_bindgen(js_name = "getNodeAddress")]
    pub fn get_node_address(&self, node_address: Option<String>) -> String {
        node_address
            .as_ref()
            .cloned()
            .or_else(|| self.node_address.as_ref().map(String::to_owned))
            .unwrap_or_default()
    }

    #[wasm_bindgen(js_name = "setNodeAddress")]
    pub fn set_node_address(&mut self, node_address: Option<String>) -> Result<(), String> {
        log(&(node_address.clone().unwrap()));
        self.node_address = node_address;
        Ok(())
    }

    #[wasm_bindgen(js_name = "getVerbosity")]
    pub fn get_verbosity(&self, verbosity: Option<Verbosity>) -> Verbosity {
        verbosity.unwrap_or(self.verbosity.unwrap_or(Verbosity::Low))
    }

    #[wasm_bindgen(js_name = "setVerbosity")]
    pub fn set_verbosity(&mut self, verbosity: Option<Verbosity>) -> Result<(), String> {
        self.verbosity = verbosity;
        Ok(())
    }
}
