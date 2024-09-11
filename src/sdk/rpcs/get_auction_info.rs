#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_auction_info as get_auction_info_cli, get_auction_info as get_auction_info_lib,
    rpcs::results::GetAuctionInfoResult as _GetAuctionInfoResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetAuctionInfoResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetAuctionInfoResult(_GetAuctionInfoResult);

#[cfg(target_arch = "wasm32")]
impl From<GetAuctionInfoResult> for _GetAuctionInfoResult {
    fn from(result: GetAuctionInfoResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetAuctionInfoResult> for GetAuctionInfoResult {
    fn from(result: _GetAuctionInfoResult) -> Self {
        GetAuctionInfoResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetAuctionInfoResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the auction state as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn auction_state(&self) -> JsValue {
        JsValue::from_serde(&self.0.auction_state).unwrap()
    }

    /// Converts the GetAuctionInfoResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_auction_info` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getAuctionInfoOptions", getter_with_clone)]
pub struct GetAuctionInfoOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses auction info options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing auction info options to be parsed.
    ///
    /// # Returns
    ///
    /// Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
    /// or a `JsError` if deserialization fails.
    pub fn get_auction_info_options(
        &self,
        options: JsValue,
    ) -> Result<GetAuctionInfoOptions, JsError> {
        options
            .into_serde::<GetAuctionInfoOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves auction information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_auction_info")]
    pub async fn get_auction_info_js_alias(
        &self,
        options: Option<GetAuctionInfoOptions>,
    ) -> Result<GetAuctionInfoResult, JsError> {
        let GetAuctionInfoOptions {
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
            .get_auction_info(maybe_block_identifier, verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_auction_info`
    #[wasm_bindgen(js_name = "state_get_auction_info_js_alias")]
    pub async fn state_get_auction_info(
        &self,
        options: Option<GetAuctionInfoOptions>,
    ) -> Result<GetAuctionInfoResult, JsError> {
        self.get_auction_info_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves auction information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` for specifying a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetAuctionInfoResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_auction_info(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetAuctionInfoResult>, SdkError> {
        //log("get_auction_info!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_auction_info_cli(
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
            get_auction_info_lib(
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
    use super::*;
    use crate::types::{block_hash::BlockHash, block_identifier::BlockIdentifier};
    use sdk_tests::tests::helpers::get_network_constants;

    #[tokio::test]
    async fn test_get_auction_info_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_auction_info(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_auction_info_with_block_id_string() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();
        let result = sdk
            .get_block(None, verbosity, Some(node_address.clone()))
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
            .get_auction_info(Some(block_identifier), verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_auction_info_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_auction_info(Some(block_identifier), verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_auction_info_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_auction_info(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
