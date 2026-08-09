#[cfg(all(feature = "js", target_arch = "wasm32"))]
use crate::rpcs::get_dictionary_item::GetDictionaryItemResult;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use crate::types::digest::Digest;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use crate::types::{
    deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
    identifier::dictionary_item_identifier::DictionaryItemIdentifier,
};
use crate::{
    rpcs::get_dictionary_item::DictionaryItemInput,
    types::{digest::ToDigest, verbosity::Verbosity},
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{
    rpcs::results::GetDictionaryItemResult as _GetDictionaryItemResult, SuccessResponse,
};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use serde::{Deserialize, Serialize};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use wasm_bindgen::prelude::*;

#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(all(feature = "js", target_arch = "wasm32"))]
#[cfg_attr(
    feature = "js",
    wasm_bindgen(js_name = "queryContractDictOptions", getter_with_clone)
)]
pub struct QueryContractDictOptions {
    // Not supported by get_dictionary_item
    // pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub dictionary_item_params: Option<DictionaryItemStrParams>,
    pub dictionary_item_identifier: Option<DictionaryItemIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(all(feature = "js", target_arch = "wasm32"))]
#[cfg_attr(feature = "js", wasm_bindgen)]
impl SDK {
    /// Deserialize query_contract_dict_options from a JavaScript object.
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "query_contract_dict_options"))]
    #[cfg(feature = "js")]
    pub fn query_contract_dict_state_options(
        &self,
        options: JsValue,
    ) -> Result<QueryContractDictOptions, JsError> {
        options
            .into_serde::<QueryContractDictOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {err:?}")))
    }

    /// JavaScript function for query_contract_dict with deserialized options.
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "query_contract_dict"))]
    #[cfg(feature = "js")]
    pub async fn query_contract_dict_js_alias(
        &self,
        options: Option<QueryContractDictOptions>,
    ) -> Result<GetDictionaryItemResult, JsError> {
        let js_value_options =
            JsValue::from_serde::<QueryContractDictOptions>(&options.unwrap_or_default());
        if let Err(err) = js_value_options {
            let err = &format!("Error serializing options: {err:?}");
            return Err(JsError::new(err));
        }
        let options = self.get_dictionary_item_options(js_value_options.unwrap())?;
        self.get_dictionary_item_js_alias(Some(options)).await
    }
}

/// Alias of sdk.get_dictionary_item
impl SDK {
    /// Query a contract dictionary item.
    ///
    /// # Arguments
    ///
    /// * `state_root_hash` - State root hash.
    /// * `dictionary_item` - Dictionary item input.
    /// * `verbosity` - Optional verbosity level.
    /// * `rpc_address` - Optional rpc address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_GetDictionaryItemResult>` or a `SdkError` in case of an error.
    pub async fn query_contract_dict(
        &self,
        dictionary_item: DictionaryItemInput,
        state_root_hash: Option<impl ToDigest>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDictionaryItemResult>, SdkError> {
        // log("query_contract_dict!");
        self.get_dictionary_item(dictionary_item, state_root_hash, verbosity, rpc_address)
            .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        get_dictionary_item,
        types::{
            deploy_params::dictionary_item_str_params::DictionaryItemStrParams, digest::Digest,
        },
    };
    use sdk_tests::tests::helpers::get_network_constants;
    use tokio;

    #[tokio::test]
    async fn test_query_contract_dict_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "failed to parse node address as valid URL";

        // Act
        let result = sdk
            .query_contract_dict(
                get_dictionary_item(false).await,
                Some("7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed"), // query_contract_dict does not support empty string as state_root_hash
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
    async fn test_query_contract_dict_with_state_root_hash() {
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
            .query_contract_dict(
                dictionary_item,
                Some(state_root_hash),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_dict_with_empty_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let state_root_hash = "";

        // Act
        let result = sdk
            .query_contract_dict(
                get_dictionary_item(false).await,
                Some(state_root_hash),
                verbosity,
                Some(rpc_address),
            )
            .await;
        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_dict_with_valid_identifier_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let state_root_hash = "";

        // Act
        let result = sdk
            .query_contract_dict(
                get_dictionary_item(false).await,
                Some(state_root_hash),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_dict_with_valid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let state_root_hash = "";

        // Act
        let result = sdk
            .query_contract_dict(
                get_dictionary_item(true).await,
                Some(state_root_hash),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_dict_with_invalid_params_input() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let error_message = "no dictionary item params set";

        let state_root_hash = "";
        let params = DictionaryItemStrParams::new();

        // Act
        let result = sdk
            .query_contract_dict(
                DictionaryItemInput::Params(Box::new(params)),
                Some(state_root_hash),
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
    async fn test_query_contract_dict_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let error_message = "error sending request";

        // Act
        let result = sdk
            .query_contract_dict(
                get_dictionary_item(false).await,
                Some("7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed"), // query_contract_dict does not support empty string as state_root_hash
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
