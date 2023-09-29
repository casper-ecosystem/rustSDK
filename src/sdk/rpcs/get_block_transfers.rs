#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
use crate::types::block_hash::BlockHash;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    types::{block_identifier::BlockIdentifierInput, sdk_error::SdkError, verbosity::Verbosity},
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
    pub node_address: Option<String>,
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
    #[wasm_bindgen(js_name = "get_block_transfers_options")]
    pub fn get_block_transfers_options(&self, options: JsValue) -> GetBlockTransfersOptions {
        let options_result = options.into_serde::<GetBlockTransfersOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetBlockTransfersOptions::default()
            }
        }
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
            .get_block_transfers(maybe_block_identifier, verbosity, node_address)
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
}

impl SDK {
    /// Retrieves block transfers information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` specifying the block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBlockTransfersResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_block_transfers(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBlockTransfersResult>, SdkError> {
        //log("get_block_transfers!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_block_transfers_cli(
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
            get_block_transfers_lib(
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