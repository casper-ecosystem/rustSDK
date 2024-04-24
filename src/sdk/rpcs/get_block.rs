#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_block as get_block_cli, get_block as get_block_lib,
    rpcs::results::GetBlockResult as _GetBlockResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetBlockResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Serialize)]
#[wasm_bindgen]
pub struct GetBlockResult(_GetBlockResult);

#[cfg(target_arch = "wasm32")]
impl From<GetBlockResult> for _GetBlockResult {
    fn from(result: GetBlockResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetBlockResult> for GetBlockResult {
    fn from(result: _GetBlockResult) -> Self {
        GetBlockResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetBlockResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the block information as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn block(&self) -> JsValue {
        let block = &self.0.block_with_signatures.clone().unwrap().block;
        JsValue::from_serde(&block).unwrap()
    }

    /// Converts the GetBlockResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_block` method.
#[derive(Debug, Deserialize, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBlockOptions", getter_with_clone)]
pub struct GetBlockOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses block options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing block options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed block options as a `GetBlockOptions` struct.
    #[wasm_bindgen(js_name = "get_block_options")]
    pub fn get_block_options(&self, options: JsValue) -> GetBlockOptions {
        let options_result = options.into_serde::<GetBlockOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetBlockOptions::default()
            }
        }
    }

    /// Retrieves block information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetBlockOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_block")]
    pub async fn get_block_js_alias(
        &self,
        options: Option<GetBlockOptions>,
    ) -> Result<GetBlockResult, JsError> {
        let GetBlockOptions {
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_block(maybe_block_identifier, verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    /// JS Alias for the `get_block` method to maintain compatibility.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetBlockOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "chain_get_block")]
    pub async fn chain_get_block_js_alias(
        &self,
        options: Option<GetBlockOptions>,
    ) -> Result<GetBlockResult, JsError> {
        self.get_block_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves block information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` specifying the block identifier.
    /// * `verbosity` - An optional `Verbosity` level for the retrieval.
    /// * `node_address` - An optional node address to target for retrieval.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBlockResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_block(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBlockResult>, SdkError> {
        //log("get_block!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_block_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
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
            get_block_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
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

    use sdk_tests::tests::helpers::get_network_constants;

    use crate::types::{block_hash::BlockHash, block_identifier::BlockIdentifier};

    use super::*;

    #[tokio::test]
    async fn test_get_block_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_block(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_block_with_block_id_string() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();
        let result = sdk
            .get_block(None, verbosity, Some(node_address.clone()))
            .await;
        let block_hash = BlockHash::from(*result.unwrap().result.block.unwrap().hash()).to_string();
        let block_identifier = BlockIdentifierInput::String(block_hash.to_string());

        // Act
        let result = sdk
            .get_block(Some(block_identifier), verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_block_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_block(Some(block_identifier), verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_block_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_block(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
