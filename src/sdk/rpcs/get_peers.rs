#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_peers, rpcs::results::GetPeersResult as _GetPeersResult, Error, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// A wrapper for the `GetPeersResult` type from the Casper client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetPeersResult(_GetPeersResult);

#[cfg(target_arch = "wasm32")]
impl From<GetPeersResult> for _GetPeersResult {
    fn from(result: GetPeersResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetPeersResult> for GetPeersResult {
    fn from(result: _GetPeersResult) -> Self {
        GetPeersResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetPeersResult {
    /// Gets the API version as a JSON value.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the peers as a JSON value.
    #[wasm_bindgen(getter)]
    pub fn peers(&self) -> JsValue {
        JsValue::from_serde(&self.0.peers).unwrap()
    }

    /// Converts the result to JSON format as a JavaScript value.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Retrieves peers asynchronously.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
    #[wasm_bindgen(js_name = "get_peers")]
    pub async fn get_peers_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetPeersResult, JsError> {
        let result = self.get_peers(verbosity, node_address).await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    /// Retrieves peers.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing `SuccessResponse` with `_GetPeersResult` or an `Error` if an error occurs.
    pub async fn get_peers(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetPeersResult>, Error> {
        get_peers(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}