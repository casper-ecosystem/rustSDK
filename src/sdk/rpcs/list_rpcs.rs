#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    list_rpcs, rpcs::results::ListRpcsResult as _ListRpcsResult, Error, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `ListRpcsResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct ListRpcsResult(_ListRpcsResult);

#[cfg(target_arch = "wasm32")]
impl From<ListRpcsResult> for _ListRpcsResult {
    fn from(result: ListRpcsResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_ListRpcsResult> for ListRpcsResult {
    fn from(result: _ListRpcsResult) -> Self {
        ListRpcsResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl ListRpcsResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the name of the RPC.
    #[wasm_bindgen(getter)]
    pub fn name(&self) -> String {
        self.0.name.clone()
    }

    /// Gets the schema of the RPC as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn schema(&self) -> JsValue {
        JsValue::from_serde(&self.0.schema).unwrap()
    }

    /// Converts the ListRpcsResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// SDK methods for listing available RPCs.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Lists available RPCs using the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the listing process.
    #[wasm_bindgen(js_name = "list_rpcs")]
    pub async fn list_rpcs_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<ListRpcsResult, JsError> {
        let result = self.list_rpcs(verbosity, node_address).await;
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
    /// Lists available RPCs based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `ListRpcsResult` or an `Error` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns an `Error` if there is an error during the listing process.
    pub async fn list_rpcs(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_ListRpcsResult>, Error> {
        //log("list_rpcs!");
        list_rpcs(
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
    async fn test_list_rpcs_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.list_rpcs(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_list_rpcs_with_specific_arguments() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk.list_rpcs(verbosity, Some(node_address)).await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_list_rpcs_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.list_rpcs(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
