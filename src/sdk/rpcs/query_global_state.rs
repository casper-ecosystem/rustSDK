use crate::debug::error;
use crate::types::digest::Digest;
use crate::types::global_state_identifier::GlobalStateIdentifier;
use crate::{
    types::{key::Key, path::Path, sdk_error::SdkError, verbosity::Verbosity},
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
    pub node_address: Option<String>,
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
    #[wasm_bindgen(js_name = "query_global_state_options")]
    pub fn query_global_state_options(&self, options: JsValue) -> QueryGlobalStateOptions {
        let options_result = options.into_serde::<QueryGlobalStateOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                QueryGlobalStateOptions::default()
            }
        }
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
                        error(err);
                        Err(JsError::new(err))
                    }
                }
            }
            Err(err) => {
                let err = &format!("Error building parameters: {:?}", err);
                error(err);
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
    pub node_address: Option<String>,
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
            node_address,
        } = options.unwrap_or_default();

        let key = if let Some(key) = key {
            Some(KeyIdentifierInput::Key(key))
        } else if let Some(key_as_string) = key_as_string {
            Some(KeyIdentifierInput::String(key_as_string))
        } else {
            let err_msg = "Error: Missing Key as string or Key".to_string();
            error(&err_msg);
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
                node_address,
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
                node_address,
            }
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: Some(maybe_block_id_as_string),
                verbosity,
                node_address,
            }
        } else {
            QueryGlobalStateParams {
                key: key.unwrap(),
                path: maybe_path.clone(),
                maybe_global_state_identifier: global_state_identifier.clone(),
                state_root_hash: None,
                maybe_block_id: None,
                verbosity,
                node_address,
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
            node_address,
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
            error(&err);
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
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                Some(maybe_global_state_identifier.into()),
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
                &self.get_node_address(node_address),
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
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id,
                "",
                &key.unwrap().to_formatted_string(),
                &path_str,
            )
            .await
            .map_err(SdkError::from)
        } else {
            let state_root_hash: Digest = self
                .get_state_root_hash(None, None, None)
                .await
                .unwrap()
                .result
                .state_root_hash
                .unwrap()
                .into();
            query_global_state_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                "",
                &state_root_hash.to_string(),
                &key.unwrap().to_formatted_string(),
                &path_str,
            )
            .await
            .map_err(SdkError::from)
        }
    }
}
