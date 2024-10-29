use crate::{
    types::{
        digest::Digest, identifier::global_state_identifier::GlobalStateIdentifier, key::Key,
        path::Path, sdk_error::SdkError, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::query_global_state as query_global_state_cli,
    query_global_state as query_global_state_lib,
    rpcs::results::QueryGlobalStateResult as _QueryGlobalStateResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// Define a struct to wrap the QueryGlobalStateResult
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct QueryGlobalStateResult(_QueryGlobalStateResult);

impl From<QueryGlobalStateResult> for _QueryGlobalStateResult {
    fn from(result: QueryGlobalStateResult) -> Self {
        result.0
    }
}

impl From<_QueryGlobalStateResult> for QueryGlobalStateResult {
    fn from(result: _QueryGlobalStateResult) -> Self {
        QueryGlobalStateResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl QueryGlobalStateResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the block header as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn block_header(&self) -> JsValue {
        JsValue::from_serde(&self.0.block_header).unwrap()
    }

    /// Gets the stored value as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn stored_value(&self) -> JsValue {
        JsValue::from_serde(&self.0.stored_value).unwrap()
    }

    /// Gets the Merkle proof as a string.
    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    /// Converts the QueryGlobalStateResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `query_global_state` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(js_name = "queryGlobalStateOptions", getter_with_clone)]
pub struct QueryGlobalStateOptions {
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    pub key_as_string: Option<String>,
    pub key: Option<Key>,
    pub path_as_string: Option<String>,
    pub path: Option<Path>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses query global state options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing query global state options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed query global state options as a `QueryGlobalStateOptions` struct.
    pub fn query_global_state_options(
        &self,
        options: JsValue,
    ) -> Result<QueryGlobalStateOptions, JsError> {
        options
            .into_serde::<QueryGlobalStateOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves global state information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "query_global_state")]
    pub async fn query_global_state_js_alias(
        &self,
        options: Option<QueryGlobalStateOptions>,
    ) -> Result<QueryGlobalStateResult, JsError> {
        match self.query_global_state_js_alias_params(options) {
            Ok(params) => {
                let result = self.query_global_state(params).await;
                match result {
                    Ok(data) => Ok(data.result.into()),
                    Err(err) => {
                        let err = &format!("Error occurred with {:?}", err);
                        Err(JsError::new(err))
                    }
                }
            }
            Err(err) => {
                let err = &format!("Error building parameters: {:?}", err);
                Err(JsError::new(err))
            }
        }
    }
}

/// Enum to represent input for KeyIdentifier.
#[derive(Debug, Clone)]
pub enum KeyIdentifierInput {
    Key(Key),
    String(String),
}

/// Enum to represent input for PathIdentifier.
#[derive(Debug, Clone)]
pub enum PathIdentifierInput {
    Path(Path),
    String(String),
}

/// Struct to store parameters for querying global state.
#[derive(Debug)]
pub struct QueryGlobalStateParams {
    pub key: KeyIdentifierInput,
    pub path: Option<PathIdentifierInput>,
    pub maybe_global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash: Option<String>,
    pub maybe_block_id: Option<String>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

impl SDK {
    /// Builds parameters for querying global state based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `QueryGlobalStateParams` struct or a `SdkError` in case of an error.
    pub fn query_global_state_js_alias_params(
        &self,
        options: Option<QueryGlobalStateOptions>,
    ) -> Result<QueryGlobalStateParams, SdkError> {
        let QueryGlobalStateOptions {
            global_state_identifier,
            state_root_hash_as_string,
            state_root_hash,
            maybe_block_id_as_string,
            key_as_string,
            key,
            path_as_string,
            path,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let key = if let Some(key) = key {
            Some(KeyIdentifierInput::Key(key))
        } else if let Some(key_as_string) = key_as_string {
            Some(KeyIdentifierInput::String(key_as_string))
        } else {
            let err_msg = "Error: Missing Key as string or Key".to_string();
            return Err(SdkError::InvalidArgument {
                context: "query_global_state",
                error: err_msg,
            });
        };

        let maybe_path = if let Some(path) = path {
            Some(PathIdentifierInput::Path(path))
        } else if let Some(path_str) = path_as_string {
            if path_str.is_empty() {
                None
            } else {
                Some(PathIdentifierInput::String(path_str))
            }
        } else {
            None
        };

        let query_params = if let Some(hash) = state_root_hash {
            let state_root_hash_str = hash.to_string();
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: if state_root_hash_str.is_empty() {
                    None
                } else {
                    Some(state_root_hash_str)
                },
                maybe_block_id: None,
                verbosity,
                rpc_address,
            }
        } else if let Some(hash) = state_root_hash_as_string {
            let state_root_hash_str = hash.to_string();
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: if state_root_hash_str.is_empty() {
                    None
                } else {
                    Some(state_root_hash_str)
                },
                maybe_block_id: None,
                verbosity,
                rpc_address,
            }
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: Some(maybe_block_id_as_string),
                verbosity,
                rpc_address,
            }
        } else {
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: None,
                verbosity,
                rpc_address,
            }
        };
        Ok(query_params)
    }

    /// Retrieves global state information based on the provided parameters.
    ///
    /// # Arguments
    ///
    /// * `query_params` - A `QueryGlobalStateParams` struct containing query parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_QueryGlobalStateResult>` or a `SdkError` in case of an error.
    pub async fn query_global_state(
        &self,
        query_params: QueryGlobalStateParams,
    ) -> Result<SuccessResponse<_QueryGlobalStateResult>, SdkError> {
        //log("query_global_state!");

        let QueryGlobalStateParams {
            key,
            path,
            maybe_global_state_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        } = query_params;

        let key = match key {
            KeyIdentifierInput::Key(key) => Some(key),
            KeyIdentifierInput::String(key_string) => match Key::from_formatted_str(&key_string) {
                Ok(key) => Some(key),
                Err(_) => None,
            },
        };

        if key.is_none() {
            let err = "Error: Missing key from formatted string".to_string();
            return Err(SdkError::InvalidArgument {
                context: "query_global_state",
                error: err,
            });
        }

        let path = if let Some(path) = path {
            let path = match path {
                PathIdentifierInput::Path(path) => path,
                PathIdentifierInput::String(path_string) => Path::from(path_string),
            };
            Some(path)
        } else {
            None
        };

        let path_str: String = match path.clone() {
            Some(p) => p.to_string(),
            None => String::new(),
        };
        if let Some(maybe_global_state_identifier) = maybe_global_state_identifier {
            query_global_state_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                maybe_global_state_identifier.into(),
                key.unwrap().into(),
                match path {
                    Some(path) if path.is_empty() => Vec::new(),
                    Some(path) => path.into(),
                    None => Vec::new(),
                },
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(state_root_hash) = state_root_hash {
            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                "",
                &state_root_hash,
                &key.unwrap().to_formatted_string(),
                &path_str,
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(maybe_block_id) = maybe_block_id {
            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id,
                "",
                &key.unwrap().to_formatted_string(),
                &path_str,
            )
            .await
            .map_err(SdkError::from)
        } else {
            let state_root_hash = self
                .get_state_root_hash(None, None, Some(self.get_rpc_address(rpc_address.clone())))
                .await;

            let state_root_hash_as_string: String = match state_root_hash {
                Ok(state_root_hash) => {
                    let state_root_hash: Digest =
                        state_root_hash.result.state_root_hash.unwrap().into();
                    state_root_hash.to_string()
                }
                Err(_) => "".to_string(),
            };

            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                "",
                &state_root_hash_as_string,
                &key.unwrap().to_formatted_string(),
                &path_str,
            )
            .await
            .map_err(SdkError::from)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{helpers::public_key_from_secret_key, types::public_key::PublicKey};
    use sdk_tests::tests::helpers::{get_network_constants, get_user_secret_key};

    fn get_key_input() -> KeyIdentifierInput {
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let public_key = PublicKey::new(&account).unwrap();
        KeyIdentifierInput::String(public_key.to_account_hash().to_formatted_string())
    }

    #[tokio::test]
    async fn test_query_global_state_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "Failed to parse state identifier";

        // Act
        let result = sdk
            .query_global_state(QueryGlobalStateParams {
                key: get_key_input(),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                verbosity: None,
                rpc_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_global_state_with_missing_key() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message =
            "Invalid argument 'query_global_state': Error: Missing key from formatted string";

        // Act
        let result = sdk
            .query_global_state(QueryGlobalStateParams {
                key: KeyIdentifierInput::String(String::new()),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                verbosity: None,
                rpc_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_global_state_with_global_state_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let global_state_identifier = GlobalStateIdentifier::from_block_height(1);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_global_state(QueryGlobalStateParams {
                key: get_key_input(),
                path: None,
                maybe_global_state_identifier: Some(global_state_identifier.clone()),
                state_root_hash: None,
                maybe_block_id: None,
                verbosity,
                rpc_address: Some(rpc_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_global_state_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
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
            .query_global_state(QueryGlobalStateParams {
                key: get_key_input(),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: Some(state_root_hash.to_string()),
                maybe_block_id: None,
                verbosity,
                rpc_address: Some(rpc_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_global_state_with_block_id() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_global_state(QueryGlobalStateParams {
                key: get_key_input(),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: Some("1".to_string()),
                verbosity,
                rpc_address: Some(rpc_address),
            })
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_global_state_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";
        // Act
        let result = sdk
            .query_global_state(QueryGlobalStateParams {
                key: get_key_input(),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: Some(
                    "588ee7aacb2d3d31476a2d2fb7800ced453926024b97788f8d8cc5cd56b45bf0".to_string(),
                ),
                maybe_block_id: None,
                verbosity: None,
                rpc_address: None,
            })
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
