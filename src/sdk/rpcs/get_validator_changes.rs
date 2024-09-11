use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_validator_changes, rpcs::results::GetValidatorChangesResult as _GetValidatorChangesResult,
    Error, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `GetValidatorChangesResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetValidatorChangesResult(_GetValidatorChangesResult);

#[cfg(target_arch = "wasm32")]
impl From<GetValidatorChangesResult> for _GetValidatorChangesResult {
    fn from(result: GetValidatorChangesResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetValidatorChangesResult> for GetValidatorChangesResult {
    fn from(result: _GetValidatorChangesResult) -> Self {
        GetValidatorChangesResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetValidatorChangesResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the validator changes as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn changes(&self) -> JsValue {
        JsValue::from_serde(&self.0.changes).unwrap()
    }

    /// Converts the GetValidatorChangesResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// SDK methods for working with validator changes.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Retrieves validator changes using the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_validator_changes")]
    pub async fn get_validator_changes_js_alias(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetValidatorChangesResult, JsError> {
        let result = self.get_validator_changes(verbosity, node_address).await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_validator_changes`
    #[deprecated(note = "This function is an alias. Please use `get_validator_changes` instead.")]
    #[allow(deprecated)]
    pub async fn info_get_validator_change(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<GetValidatorChangesResult, JsError> {
        self.get_validator_changes_js_alias(verbosity, node_address)
            .await
    }
}

impl SDK {
    /// Retrieves validator changes based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetValidatorChangesResult` or an `Error` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns an `Error` if there is an error during the retrieval process.
    pub async fn get_validator_changes(
        &self,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetValidatorChangesResult>, Error> {
        //log("get_validator_changes!");
        get_validator_changes(
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
    async fn test_get_validator_changes_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_validator_changes(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_validator_changes_with_specific_arguments() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_validator_changes(verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_validator_changes_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_validator_changes(None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
