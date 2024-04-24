#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_chainspec, rpcs::results::GetChainspecResult as _GetChainspecResult, Error, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// A struct representing the result of the `get_chainspec` function.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetChainspecResult(_GetChainspecResult);

#[cfg(target_arch = "wasm32")]
impl From<GetChainspecResult> for _GetChainspecResult {
    fn from(result: GetChainspecResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetChainspecResult> for GetChainspecResult {
    fn from(result: _GetChainspecResult) -> Self {
        GetChainspecResult(result)
    }
}

/// Implementations for the `GetChainspecResult` struct.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetChainspecResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the chainspec bytes as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn chainspec_bytes(&self) -> JsValue {
        JsValue::from_serde(&self.0.chainspec_bytes).unwrap()
    }

    /// Converts the `GetChainspecResult` to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Implementations for the `SDK` struct.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Asynchronously retrieves the chainspec.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` parameter.
    /// * `node_address` - An optional node address as a string.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "get_chainspec")]
    pub async fn get_chainspec_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetChainspecResult, JsError> {
        let result = self.get_chainspec(verbosity, node_address).await;
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

/// Implementations for the `SDK` struct.
impl SDK {
    /// Asynchronously retrieves the chainspec.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` parameter.
    /// * `node_address` - An optional node address as a string.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetChainspecResult` or a `SdkError` in case of an error.
    pub async fn get_chainspec(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetChainspecResult>, Error> {
        //log("get_chainspec!");
        get_chainspec(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
        )
        .await
    }
}

#[cfg(test)]
mod tests {

    use sdk_tests::tests::helpers::get_network_constants;

    use super::*;

    #[tokio::test]
    async fn test_get_chainspec_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_chainspec(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_chainspec_with_specific_arguments() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk.get_chainspec(verbosity, Some(node_address)).await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_chainspec_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_chainspec(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
