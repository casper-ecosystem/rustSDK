#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
#[cfg(target_arch = "wasm32")]
use crate::{rpcs::query_global_state::QueryGlobalStateResult, types::path::Path};
use crate::{
    rpcs::query_global_state::{KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams},
    types::{
        block_identifier::BlockIdentifierInput, entity_identifier::EntityIdentifier,
        sdk_error::SdkError, verbosity::Verbosity,
    },
    SDK,
};
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
    pub entity_identifier: Option<EntityIdentifier>,
    pub entity_identifier_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub maybe_block_id_as_string: Option<String>,
    pub path_as_string: Option<String>,
    pub path: Option<Path>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Deserialize query_contract_key_options from a JavaScript object.
    #[wasm_bindgen(js_name = "query_contract_key_options")]
    pub fn query_contract_key_state_options(
        &self,
        options: JsValue,
    ) -> Result<QueryContractKeyOptions, JsError> {
        options
            .into_serde::<QueryContractKeyOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// JavaScript function for query_contract_key with deserialized options.
    #[wasm_bindgen(js_name = "query_contract_key")]
    pub async fn query_contract_key_js_alias(
        &self,
        options: Option<QueryContractKeyOptions>,
    ) -> Result<QueryGlobalStateResult, JsError> {
        let options = options.unwrap_or_default();

        // Ensure valid conversion of `path` from `QueryContractKeyOptions`
        let path_input = match (options.path, options.path_as_string) {
            (Some(path), None) => PathIdentifierInput::Path(path),
            (None, Some(path_string)) => PathIdentifierInput::String(path_string),
            (Some(_), Some(_)) => {
                let err = "Only one of `path` or `path_as_string` can be provided".to_string();
                return Err(JsError::new(&err));
            }
            (None, None) => {
                let err = "Either `path` or `path_as_string` must be provided".to_string();
                return Err(JsError::new(&err));
            }
        };

        let maybe_block_identifier =
            if let Some(maybe_block_identifier) = options.maybe_block_identifier {
                Some(BlockIdentifierInput::BlockIdentifier(
                    maybe_block_identifier,
                ))
            } else {
                options
                    .maybe_block_id_as_string
                    .map(BlockIdentifierInput::String)
            };

        let result = self
            .query_contract_key(
                options.entity_identifier,
                options.entity_identifier_as_string,
                path_input,
                maybe_block_identifier,
                options.verbosity,
                options.rpc_address,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
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
    /// A `Result` containing either a `SuccessResponse<_GetAddressableEntityResult>` or a `SdkError` in case of an error.
    pub async fn query_contract_key(
        &self,
        entity_identifier: Option<EntityIdentifier>,
        entity_identifier_as_string: Option<String>,
        path: PathIdentifierInput,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_QueryGlobalStateResult>, SdkError> {
        let path_string = match path {
            PathIdentifierInput::Path(ref path_struct) => {
                if path_struct.is_empty() {
                    return Err(SdkError::InvalidArgument {
                        context: "Path",
                        error: "Path is empty".to_string(),
                    });
                }
                path_struct.to_string()
            }
            PathIdentifierInput::String(ref path_string) => {
                if path_string.is_empty() {
                    return Err(SdkError::InvalidArgument {
                        context: "Path string",
                        error: "Path string is empty".to_string(),
                    });
                }
                path_string.clone()
            }
        };

        //log("query_contract_key!");
        let entity = self
            .get_entity(
                entity_identifier,
                entity_identifier_as_string,
                maybe_block_identifier,
                verbosity,
                rpc_address.clone(),
            )
            .await
            .map_err(SdkError::from);

        let addressable_entity = entity
            .as_ref()
            .map_err(|err| SdkError::InvalidArgument {
                context: "Addressable entity",
                error: format!("Failed to get entity: {}", err),
            })?
            .result
            .entity_result
            .addressable_entity()
            .ok_or_else(|| SdkError::InvalidArgument {
                context: "Addressable entity",
                error: "Addressable entity is missing".to_string(),
            })?;

        let named_key = *addressable_entity
            .named_keys
            .get(&path_string)
            .ok_or_else(|| SdkError::InvalidArgument {
                context: "Named key",
                error: format!("No key found for path string '{}'", path_string),
            })?;

        let key = KeyIdentifierInput::Key(named_key.into());

        self.query_global_state(QueryGlobalStateParams {
            key,
            path: None,
            maybe_global_state_identifier: None,
            state_root_hash: None,
            maybe_block_id: None,
            verbosity,
            rpc_address,
        })
        .await
        .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        install_cep78,
        types::{
            block_identifier::BlockIdentifier, entity_identifier::EntityIdentifier,
            verbosity::Verbosity,
        },
    };
    use sdk_tests::tests::helpers::{get_block, get_network_constants};
    use tokio;

    async fn get_entity_input() -> EntityIdentifier {
        EntityIdentifier::from_formatted_str(&install_cep78().await).unwrap()
    }

    #[tokio::test]
    async fn test_query_contract_key_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        let path = PathIdentifierInput::String("installer".to_string());

        // Act
        let result = sdk
            .query_contract_key(Some(get_entity_input().await), None, path, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_missing_key() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "Invalid argument 'get_entity': Error: Missing entity identifier";

        let path = PathIdentifierInput::String("installer".to_string());

        // Act
        let result = sdk
            .query_contract_key(None, None, path, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_entity_identifier_as_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let entity = get_entity_input().await;

        let path = PathIdentifierInput::String("installer".to_string());

        let (_, block_height) = get_block(&rpc_address.clone()).await;
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(block_height));

        // Act
        let result = sdk
            .query_contract_key(
                Some(entity),
                None,
                path,
                Some(block_identifier),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_global_state_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let entity = get_entity_input().await;

        let path = PathIdentifierInput::String("installer".to_string());

        let (_, block_height) = get_block(&rpc_address.clone()).await;
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(block_height));
        // Act
        let result = sdk
            .query_contract_key(
                None,
                Some(entity.to_string()),
                path,
                Some(block_identifier),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_missing_path() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let entity = get_entity_input().await;
        let error_message = "Invalid argument 'Path': Path is empty";

        let vec_of_strings = vec!["".to_string()]; // empty path should error
        let path = PathIdentifierInput::Path(vec_of_strings.into());

        // Act
        let result = sdk
            .query_contract_key(Some(entity), None, path, None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_missing_path_as_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let entity = get_entity_input().await;
        let error_message = "Invalid argument 'Path string': Path string is empty";

        let path = PathIdentifierInput::String("".to_string()); // empty path should error

        // Act
        let result = sdk
            .query_contract_key(Some(entity), None, path, None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_contract_key_with_path_as_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let entity = get_entity_input().await;

        let vec_of_strings = vec!["installer".to_string()];
        let path = PathIdentifierInput::Path(vec_of_strings.into());

        // Act
        let result = sdk
            .query_contract_key(Some(entity), None, path, None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_contract_key_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";
        let entity = get_entity_input().await;

        let path = PathIdentifierInput::String("installer".to_string());

        // Act
        let result = sdk
            .query_contract_key(Some(entity), None, path, None, None, None)
            .await;
        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
