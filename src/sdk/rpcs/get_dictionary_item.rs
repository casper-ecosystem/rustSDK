use crate::types::digest::Digest;
use crate::{
    types::{
        deploy_params::dictionary_item_str_params::{
            dictionary_item_str_params_to_casper_client, DictionaryItemStrParams,
        },
        digest::ToDigest,
        identifier::dictionary_item_identifier::DictionaryItemIdentifier,
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::get_dictionary_item as get_dictionary_item_cli,
    get_dictionary_item as get_dictionary_item_lib,
    rpcs::results::GetDictionaryItemResult as _GetDictionaryItemResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetDictionaryItemResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetDictionaryItemResult(_GetDictionaryItemResult);

#[cfg(target_arch = "wasm32")]
impl From<GetDictionaryItemResult> for _GetDictionaryItemResult {
    fn from(result: GetDictionaryItemResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetDictionaryItemResult> for GetDictionaryItemResult {
    fn from(result: _GetDictionaryItemResult) -> Self {
        GetDictionaryItemResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetDictionaryItemResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the dictionary key as a String.
    #[wasm_bindgen(getter)]
    pub fn dictionary_key(&self) -> String {
        self.0.dictionary_key.clone()
    }

    /// Gets the stored value as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn stored_value(&self) -> JsValue {
        JsValue::from_serde(&self.0.stored_value).unwrap()
    }

    /// Gets the merkle proof as a String.
    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    /// Converts the GetDictionaryItemResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_dictionary_item` method.
#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDictionaryItemOptions", getter_with_clone)]
pub struct GetDictionaryItemOptions {
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses dictionary item options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing dictionary item options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
    pub fn get_dictionary_item_options(
        &self,
        options: JsValue,
    ) -> Result<GetDictionaryItemOptions, JsError> {
        options
            .into_serde::<GetDictionaryItemOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves dictionary item information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_dictionary_item")]
    pub async fn get_dictionary_item_js_alias(
        &self,
        options: Option<GetDictionaryItemOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        let GetDictionaryItemOptions {
            state_root_hash_as_string,
            state_root_hash,
            dictionary_item_params,
            dictionary_item_identifier,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let dictionary_item = if let Some(identifier) = dictionary_item_identifier {
            DictionaryItemInput::Identifier(identifier)
        } else if let Some(params) = dictionary_item_params {
            DictionaryItemInput::Params(params)
        } else {
            let err = "Error: Missing dictionary item identifier or params";
            return Err(JsError::new(err));
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_dictionary_item(hash, dictionary_item, verbosity, rpc_address)
                .await
        } else if let Some(hash) = state_root_hash_as_string.clone() {
            self.get_dictionary_item(hash.as_str(), dictionary_item, verbosity, rpc_address)
                .await
        } else {
            self.get_dictionary_item("", dictionary_item, verbosity, rpc_address)
                .await
        };

        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// JavaScript Alias for `get_dictionary_item`
    #[deprecated(note = "This function is an alias. Please use `get_dictionary_item` instead.")]
    #[allow(deprecated)]
    pub async fn state_get_dictionary_item(
        &self,
        options: Option<GetDictionaryItemOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        self.get_dictionary_item_js_alias(options).await
    }
}
#[derive(Debug, Clone)]
pub enum DictionaryItemInput {
    Identifier(DictionaryItemIdentifier),
    Params(DictionaryItemStrParams),
}

impl SDK {
    /// Retrieves dictionary item information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `state_root_hash` - A `ToDigest` implementation for specifying the state root hash.
    /// * `dictionary_item` - A `DictionaryItemInput` enum specifying the dictionary item to retrieve.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetDictionaryItemResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_dictionary_item(
        &self,
        state_root_hash: impl ToDigest,
        dictionary_item_input: DictionaryItemInput,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDictionaryItemResult>, SdkError> {
        // log("state_get_dictionary_item!");

        let state_root_hash = if state_root_hash.is_empty() {
            let state_root_hash = self
                .get_state_root_hash(None, None, Some(self.get_rpc_address(rpc_address.clone())))
                .await;

            match state_root_hash {
                Ok(state_root_hash) => {
                    let state_root_hash: Digest =
                        state_root_hash.result.state_root_hash.unwrap().into();
                    state_root_hash
                }
                Err(_) => "".to_digest(),
            }
        } else {
            state_root_hash.to_digest()
        };

        match dictionary_item_input {
            DictionaryItemInput::Params(dictionary_item_params) => get_dictionary_item_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &state_root_hash.to_string(),
                dictionary_item_str_params_to_casper_client(&dictionary_item_params),
            )
            .await
            .map_err(SdkError::from),
            DictionaryItemInput::Identifier(dictionary_item_identifier) => get_dictionary_item_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                state_root_hash.into(),
                dictionary_item_identifier.into(),
            )
            .await
            .map_err(SdkError::from),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::get_dictionary_item;
    use sdk_tests::tests::helpers::get_network_constants;

    #[tokio::test]
    async fn test_get_dictionary_item_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk
            .get_dictionary_item(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_dictionary_item does not support empty string as state_root_hash
                get_dictionary_item(false).await,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let dictionary_item = get_dictionary_item(false).await;
        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, verbosity, Some(rpc_address.clone()))
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                dictionary_item,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_empty_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_dictionary_item(
                "",
                get_dictionary_item(false).await,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_valid_identifier_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_dictionary_item(
                "",
                get_dictionary_item(false).await,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_valid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_dictionary_item(
                "",
                get_dictionary_item(true).await,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_invalid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let error_message =
            "Failed to parse dictionary item address as a key: unknown prefix for key";

        let state_root_hash = "";
        let params = DictionaryItemStrParams::new();

        // Act
        let result = sdk
            .get_dictionary_item(
                state_root_hash,
                DictionaryItemInput::Params(params),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_dictionary_item_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .get_dictionary_item(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_dictionary_item does not support empty string as state_root_hash
                get_dictionary_item(false).await,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
