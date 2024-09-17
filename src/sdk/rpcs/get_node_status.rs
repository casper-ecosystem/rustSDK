#[cfg(target_arch = "wasm32")]
use crate::types::{digest::Digest, public_key::PublicKey};
use crate::{
    types::{sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    get_node_status, rpcs::results::GetNodeStatusResult as _GetNodeStatusResult, Error, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `GetNodeStatusResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetNodeStatusResult(_GetNodeStatusResult);

#[cfg(target_arch = "wasm32")]
impl From<GetNodeStatusResult> for _GetNodeStatusResult {
    fn from(result: GetNodeStatusResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetNodeStatusResult> for GetNodeStatusResult {
    fn from(result: _GetNodeStatusResult) -> Self {
        GetNodeStatusResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetNodeStatusResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the chainspec name as a String.
    #[wasm_bindgen(getter)]
    pub fn chainspec_name(&self) -> String {
        self.0.chainspec_name.clone()
    }

    /// Gets the starting state root hash as a Digest.
    #[allow(deprecated)]
    #[wasm_bindgen(getter)]
    pub fn starting_state_root_hash(&self) -> Digest {
        self.0.starting_state_root_hash.into()
    }

    /// Gets the list of peers as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn peers(&self) -> JsValue {
        JsValue::from_serde(&self.0.peers).unwrap()
    }

    /// Gets information about the last added block as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn last_added_block_info(&self) -> JsValue {
        JsValue::from_serde(&self.0.last_added_block_info).unwrap()
    }

    /// Gets the public signing key as an Option<PublicKey>.
    #[wasm_bindgen(getter)]
    pub fn our_public_signing_key(&self) -> Option<PublicKey> {
        self.0.our_public_signing_key.clone().map(Into::into)
    }

    /// Gets the round length as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn round_length(&self) -> JsValue {
        JsValue::from_serde(&self.0.round_length).unwrap()
    }

    /// Gets information about the next upgrade as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn next_upgrade(&self) -> JsValue {
        JsValue::from_serde(&self.0.next_upgrade).unwrap()
    }

    /// Gets the build version as a String.
    #[wasm_bindgen(getter)]
    pub fn build_version(&self) -> String {
        self.0.build_version.clone()
    }

    /// Gets the uptime information as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn uptime(&self) -> JsValue {
        JsValue::from_serde(&self.0.uptime).unwrap()
    }

    /// Gets the reactor state information as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn reactor_state(&self) -> JsValue {
        JsValue::from_serde(&self.0.reactor_state).unwrap()
    }

    /// Gets the last progress information as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn last_progress(&self) -> JsValue {
        JsValue::from_serde(&self.0.last_progress).unwrap()
    }

    /// Gets the available block range as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn available_block_range(&self) -> JsValue {
        JsValue::from_serde(&self.0.available_block_range).unwrap()
    }

    /// Gets the block sync information as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn block_sync(&self) -> JsValue {
        JsValue::from_serde(&self.0.block_sync).unwrap()
    }

    /// Converts the GetNodeStatusResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// SDK methods related to retrieving node status information.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Retrieves node status information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_node_status")]
    pub async fn get_node_status_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetNodeStatusResult, JsError> {
        let result = self.get_node_status(verbosity, node_address).await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_node_status`
    #[deprecated(note = "This function is an alias. Please use `get_node_status` instead.")]
    #[allow(deprecated)]
    pub async fn info_get_status(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetNodeStatusResult, JsError> {
        self.get_node_status_js_alias(verbosity, node_address).await
    }

    #[wasm_bindgen(js_name = "get_binary_node_status")]
    pub async fn get_binary_node_status_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_node_status(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }
}

impl SDK {
    /// Retrieves node status information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetNodeStatusResult` or an `Error` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns an `Error` if there is an error during the retrieval process.
    pub async fn get_node_status(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetNodeStatusResult>, Error> {
        //log("get_node_status!");
        get_node_status(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sdk_tests::tests::helpers::get_network_constants;

    #[tokio::test]
    async fn test_get_node_status_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_node_status(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_node_status_with_specific_arguments() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk.get_node_status(verbosity, Some(node_address)).await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_node_status_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_node_status(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
