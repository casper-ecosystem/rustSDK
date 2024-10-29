#[cfg(target_arch = "wasm32")]
use crate::types::hash::block_hash::BlockHash;
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
    cli::get_block_transfers as get_block_transfers_cli,
    get_block_transfers as get_block_transfers_lib,
    rpcs::results::GetBlockTransfersResult as _GetBlockTransfersResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetBlockTransfersResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetBlockTransfersResult(_GetBlockTransfersResult);

#[cfg(target_arch = "wasm32")]
impl From<GetBlockTransfersResult> for _GetBlockTransfersResult {
    fn from(result: GetBlockTransfersResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetBlockTransfersResult> for GetBlockTransfersResult {
    fn from(result: _GetBlockTransfersResult) -> Self {
        GetBlockTransfersResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetBlockTransfersResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the block hash as an Option<BlockHash>.
    #[wasm_bindgen(getter)]
    pub fn block_hash(&self) -> Option<BlockHash> {
        self.0.block_hash.map(Into::into)
    }

    /// Gets the transfers as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn transfers(&self) -> JsValue {
        JsValue::from_serde(&self.0.transfers).unwrap()
    }

    /// Converts the GetBlockTransfersResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_block_transfers` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBlockTransfersOptions", getter_with_clone)]
pub struct GetBlockTransfersOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub verbosity: Option<Verbosity>,
    pub rpc_address: Option<String>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses block transfers options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing block transfers options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed block transfers options as a `GetBlockTransfersOptions` struct.
    pub fn get_block_transfers_options(
        &self,
        options: JsValue,
    ) -> Result<GetBlockTransfersOptions, JsError> {
        options
            .into_serde::<GetBlockTransfersOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves block transfers information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_block_transfers")]
    pub async fn get_block_transfers_js_alias(
        &self,
        options: Option<GetBlockTransfersOptions>,
    ) -> Result<GetBlockTransfersResult, JsError> {
        let GetBlockTransfersOptions {
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
            .get_block_transfers(maybe_block_identifier, verbosity, rpc_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_block_transfers`.
    #[wasm_bindgen(js_name = "chain_get_block_transfers")]
    #[deprecated(note = "This function is an alias. Please use `get_block_transfers` instead.")]
    #[allow(deprecated)]
    pub async fn chain_get_block_transfers(
        &self,
        options: Option<GetBlockTransfersOptions>,
    ) -> Result<GetBlockTransfersResult, JsError> {
        self.get_block_transfers_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves block transfers information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` specifying the block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetBlockTransfersResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_block_transfers(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBlockTransfersResult>, SdkError> {
        //log("get_block_transfers!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_block_transfers_cli(
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
            get_block_transfers_lib(
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
    async fn test_get_block_transfers_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_block_transfers(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_block_transfers_with_block_id_string() {
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
            .get_block_transfers(Some(block_identifier), verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_block_transfers_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_block_transfers(Some(block_identifier), verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_block_transfers_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_block_transfers(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
