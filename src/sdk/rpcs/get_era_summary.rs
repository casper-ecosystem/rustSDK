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
    cli::get_era_summary as get_era_summary_cli, get_era_summary as get_era_summary_lib,
    rpcs::results::GetEraSummaryResult as _GetEraSummaryResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `GetEraSummaryResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetEraSummaryResult(_GetEraSummaryResult);

#[cfg(target_arch = "wasm32")]
impl From<GetEraSummaryResult> for _GetEraSummaryResult {
    fn from(result: GetEraSummaryResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetEraSummaryResult> for GetEraSummaryResult {
    fn from(result: _GetEraSummaryResult) -> Self {
        GetEraSummaryResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetEraSummaryResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the era summary as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn era_summary(&self) -> JsValue {
        JsValue::from_serde(&self.0.era_summary).unwrap()
    }

    /// Converts the GetEraSummaryResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_era_summary` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getEraSummaryOptions", getter_with_clone)]
pub struct GetEraSummaryOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses era summary options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing era summary options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed era summary options as a `GetEraSummaryOptions` struct.
    pub fn get_era_summary_options(
        &self,
        options: JsValue,
    ) -> Result<GetEraSummaryOptions, JsError> {
        options
            .into_serde::<GetEraSummaryOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves era summary information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_era_summary")]
    pub async fn get_era_summary_js_alias(
        &self,
        options: Option<GetEraSummaryOptions>,
    ) -> Result<GetEraSummaryResult, JsError> {
        let GetEraSummaryOptions {
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
            .get_era_summary(maybe_block_identifier, verbosity, rpc_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_era_summary`
    #[wasm_bindgen(js_name = "chain_get_era_summary")]
    #[deprecated(note = "This function is an alias. Please use `get_era_summary` instead.")]
    #[allow(deprecated)]
    pub async fn chain_get_era_summary(
        &self,
        options: Option<GetEraSummaryOptions>,
    ) -> Result<GetEraSummaryResult, JsError> {
        self.get_era_summary_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves era summary information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` for specifying a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetEraSummaryResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_era_summary(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetEraSummaryResult>, SdkError> {
        //log("get_era_summary!");
        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_era_summary_cli(
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
            get_era_summary_lib(
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
    async fn test_get_era_summary_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_era_summary(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_era_summary_with_block_id_string() {
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
            .get_era_summary(Some(block_identifier), verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_era_summary_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(11));
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_era_summary(Some(block_identifier), verbosity, Some(rpc_address.clone()))
            .await;
        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_era_summary_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_era_summary(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
