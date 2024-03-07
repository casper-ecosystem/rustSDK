#[cfg(target_arch = "wasm32")]
use crate::rpcs::query_global_state::QueryGlobalStateResult;
#[cfg(target_arch = "wasm32")]
use crate::types::global_state_identifier::GlobalStateIdentifier;
#[cfg(target_arch = "wasm32")]
use crate::{
    debug::error,
    types::{digest::Digest, key::Key, path::Path, verbosity::Verbosity},
};
use crate::{rpcs::query_global_state::QueryGlobalStateParams, types::sdk_error::SdkError, SDK};
use casper_client::{
    rpcs::results::QueryGlobalStateResult as _QueryGlobalStateResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[derive(Deserialize, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryContractKeyOptions", getter_with_clone)]
pub struct QueryContractKeyOptions {
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    #[serde(rename = "key_as_string")]
    pub contract_key_as_string: Option<String>,
    #[serde(rename = "key")]
    pub contract_key: Option<Key>,
    pub path_as_string: Option<String>,
    pub path: Option<Path>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Deserialize query_contract_key_options from a JavaScript object.
    #[wasm_bindgen(js_name = "query_contract_key_options")]
    pub fn query_contract_key_state_options(&self, options: JsValue) -> QueryContractKeyOptions {
        let options_result = options.into_serde::<QueryContractKeyOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryContractKeyOptions::default()
            }
        }
    }

    /// JavaScript alias for query_contract_key with deserialized options.
    #[wasm_bindgen(js_name = "query_contract_key")]
    pub async fn query_contract_key_js_alias(
        &self,
        options: Option<QueryContractKeyOptions>,
    ) -> Result<QueryGlobalStateResult, JsError> {
        let js_value_options =
            JsValue::from_serde::<QueryContractKeyOptions>(&options.unwrap_or_default());
        if let Err(err) = js_value_options {
            let err = &format!("Error serializing options:  {:?}", err);
            error(err);
            return Err(JsError::new(err));
        }
        let options = self.query_global_state_options(js_value_options.unwrap());
        self.query_global_state_js_alias(Some(options)).await
    }
}

/// Alias of sdk.query_global_state
impl SDK {
    /// Query a contract key.
    ///
    /// # Arguments
    ///
    /// * `query_params` - Query global state parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<QueryGlobalStateResult>` or a `SdkError` in case of an error.
    pub async fn query_contract_key(
        &self,
        query_params: QueryGlobalStateParams,
    ) -> Result<SuccessResponse<_QueryGlobalStateResult>, SdkError> {
        //log("query_contract_key!");
        self.query_global_state(query_params)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        install_cep78,
        rpcs::query_global_state::KeyIdentifierInput,
        types::{
            digest::Digest, global_state_identifier::GlobalStateIdentifier, verbosity::Verbosity,
        },
    };
    use sdk_tests::tests::helpers::{get_block, get_network_constants};

    async fn get_key_input() -> KeyIdentifierInput {
        KeyIdentifierInput::String(install_cep78().await)
    }

    #[tokio::test]
    async fn test_query_contract_key_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error: relative URL without a base".to_string();

        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key: get_key_input().await,
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                verbosity: None,
                node_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_missing_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message =
            "Invalid argument 'query_global_state': Error: Missing key from formatted string"
                .to_string();

        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key: KeyIdentifierInput::String(String::new()),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                verbosity: None,
                node_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_global_state_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        let key = get_key_input().await;
        let (_, block_height) = get_block(&node_address.clone()).await;
        let global_state_identifier = GlobalStateIdentifier::from_block_height(block_height);

        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key,
                path: None,
                maybe_global_state_identifier: Some(global_state_identifier.clone()),
                state_root_hash: None,
                maybe_block_id: None,
                verbosity,
                node_address: Some(node_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();
        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, verbosity, Some(node_address.clone()))
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key: get_key_input().await,
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: Some(state_root_hash.to_string()),
                maybe_block_id: None,
                verbosity,
                node_address: Some(node_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_block_id() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        let key = get_key_input().await;

        let (_, block_height) = get_block(&node_address.clone()).await;

        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key,
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: Some(block_height.to_string()),
                verbosity,
                node_address: Some(node_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc): error trying to connect: tcp connect error: Connection refused (os error 111)".to_string();
        // Act
        let result = sdk
            .query_contract_key(QueryGlobalStateParams {
                key: get_key_input().await,
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                verbosity: None,
                node_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }
}
