#[cfg(feature = "binary-port")]
pub mod binary_port;

#[cfg(feature = "deploy")]
#[allow(hidden_glob_reexports)]
pub(crate) mod deploy;
#[cfg(feature = "deploy")]
pub use deploy::*;

pub mod rpcs;

#[cfg(feature = "transaction")]
#[allow(hidden_glob_reexports)]
pub(crate) mod transaction;
#[cfg(feature = "transaction")]
pub use transaction::*;

#[cfg(feature = "deploy")]
pub(crate) mod deploy_utils;
#[cfg(feature = "deploy")]
pub(crate) use deploy_utils::*;

#[cfg(feature = "transaction")]
pub(crate) mod transaction_utils;
#[cfg(feature = "transaction")]
pub(crate) use transaction_utils::*;

/// On-disk `sse/` tree: framing + watcher always; client/CES only with `SSE`.
#[cfg(feature = "watcher")]
#[path = "sse/mod.rs"]
pub(crate) mod sse;

#[cfg(feature = "watcher")]
pub mod watcher {
    pub use crate::sdk::sse::watcher::*;
}

/// Full node SSE client + CES (feature `SSE`; pulls in `watcher`).
#[cfg(feature = "SSE")]
#[allow(non_snake_case)]
pub mod SSE {
    pub use crate::sdk::sse::ces::*;
    pub use crate::sdk::sse::client::*;
    pub use crate::sdk::sse::event::*;
    pub use crate::sdk::sse::framing::*;
}

#[cfg(feature = "contract")]
pub(crate) mod contract;
#[cfg(feature = "contract")]
pub use contract::*;

#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

use crate::types::verbosity::Verbosity;

#[cfg_attr(feature = "js", wasm_bindgen)]
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

#[cfg_attr(feature = "js", wasm_bindgen)]
impl SDK {
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
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

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "getRPCAddress"))]
    pub fn get_rpc_address(&self, rpc_address: Option<String>) -> String {
        rpc_address
            .as_ref()
            .cloned()
            .or_else(|| self.rpc_address.as_ref().map(String::to_owned))
            .unwrap_or_default()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "setRPCAddress"))]
    pub fn set_rpc_address(&mut self, rpc_address: Option<String>) -> Result<(), String> {
        self.rpc_address = rpc_address;
        Ok(())
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "getNodeAddress"))]
    pub fn get_node_address(&self, node_address: Option<String>) -> String {
        node_address
            .as_ref()
            .cloned()
            .or_else(|| self.node_address.as_ref().map(String::to_owned))
            .unwrap_or_default()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "setNodeAddress"))]
    pub fn set_node_address(&mut self, node_address: Option<String>) -> Result<(), String> {
        self.node_address = node_address;
        Ok(())
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "getVerbosity"))]
    pub fn get_verbosity(&self, verbosity: Option<Verbosity>) -> Verbosity {
        verbosity.unwrap_or(self.verbosity.unwrap_or(Verbosity::Low))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "setVerbosity"))]
    pub fn set_verbosity(&mut self, verbosity: Option<Verbosity>) -> Result<(), String> {
        self.verbosity = verbosity;
        Ok(())
    }
}
