#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
#[cfg(target_arch = "wasm32")]
use crate::types::identifier::block_identifier::BlockIdentifier;
use crate::{
    types::{
        identifier::block_identifier::BlockIdentifierInput, sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::get_state_root_hash as get_state_root_hash_cli,
    get_state_root_hash as get_state_root_hash_lib,
    rpcs::results::GetStateRootHashResult as _GetStateRootHashResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `GetStateRootHashResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetStateRootHashResult(_GetStateRootHashResult);

#[cfg(target_arch = "wasm32")]
impl From<GetStateRootHashResult> for _GetStateRootHashResult {
    fn from(result: GetStateRootHashResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetStateRootHashResult> for GetStateRootHashResult {
    fn from(result: _GetStateRootHashResult) -> Self {
        GetStateRootHashResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetStateRootHashResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the state root hash as an Option<Digest>.
    #[wasm_bindgen(getter)]
    pub fn state_root_hash(&self) -> Option<Digest> {
        self.0.state_root_hash.map(Into::into)
    }

    /// Gets the state root hash as a String.
    #[wasm_bindgen(getter)]
    pub fn state_root_hash_as_string(&self) -> String {
        self.0
            .state_root_hash
            .map(Into::<Digest>::into)
            .map(|digest| digest.to_string())
            .unwrap_or_default()
    }

    /// Alias for state_root_hash_as_string
    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        // You can still use to_string method for compatibility
        self.state_root_hash_as_string()
    }

    /// Converts the GetStateRootHashResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_state_root_hash` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getStateRootHashOptions", getter_with_clone)]
pub struct GetStateRootHashOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses state root hash options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing state root hash options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed state root hash options as a `GetStateRootHashOptions` struct.
    pub fn get_state_root_hash_options(
        &self,
        options: JsValue,
    ) -> Result<GetStateRootHashOptions, JsError> {
        options
            .into_serde::<GetStateRootHashOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves state root hash information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_state_root_hash")]
    pub async fn get_state_root_hash_js_alias(
        &self,
        options: Option<GetStateRootHashOptions>,
    ) -> Result<GetStateRootHashResult, JsError> {
        let GetStateRootHashOptions {
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_state_root_hash(maybe_block_identifier, verbosity, rpc_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// Retrieves state root hash information using the provided options (alias for `get_state_root_hash`).
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[deprecated(note = "This function is an alias. Please use `get_state_root_hash` instead.")]
    #[allow(deprecated)]
    pub async fn chain_get_state_root_hash(
        &self,
        options: Option<GetStateRootHashOptions>,
    ) -> Result<GetStateRootHashResult, JsError> {
        self.get_state_root_hash_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves state root hash information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` for specifying a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetStateRootHashResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_state_root_hash(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetStateRootHashResult>, SdkError> {
        //log("get_state_root_hash!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_state_root_hash_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id,
            )
            .await
            .map_err(SdkError::from)
        } else {
            let maybe_block_identifier =
                if let Some(BlockIdentifierInput::BlockIdentifier(maybe_block_identifier)) =
                    maybe_block_identifier
                {
                    Some(maybe_block_identifier)
                } else {
                    None
                };

            get_state_root_hash_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                maybe_block_identifier.map(Into::into),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{
        hash::block_hash::BlockHash, identifier::block_identifier::BlockIdentifier,
    };
    use sdk_tests::tests::helpers::get_network_constants;

    #[tokio::test]
    async fn test_get_state_root_hash_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_state_root_hash(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_state_root_hash_with_block_id_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let result = sdk
            .get_block(None, verbosity, Some(rpc_address.clone()))
            .await;
        let block_hash = BlockHash::from(
            *result
                .unwrap()
                .result
                .block_with_signatures
                .unwrap()
                .block
                .hash(),
        )
        .to_string();
        let block_identifier = BlockIdentifierInput::String(block_hash.to_string());

        // Act
        let result = sdk
            .get_state_root_hash(Some(block_identifier), verbosity, Some(rpc_address))
            .await;
        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_state_root_hash_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_state_root_hash(Some(block_identifier), verbosity, Some(rpc_address.clone()))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_state_root_hash_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_state_root_hash(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
