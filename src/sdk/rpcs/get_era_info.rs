#[cfg(target_arch = "wasm32")]
use crate::types::identifier::block_identifier::BlockIdentifier;
use crate::{
    types::{
        identifier::block_identifier::BlockIdentifierInput, sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
#[allow(deprecated)]
use casper_client::{
    cli::get_era_info as get_era_info_cli, get_era_info as get_era_info_lib,
    rpcs::results::GetEraInfoResult as _GetEraInfoResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetEraInfoResult(_GetEraInfoResult);

#[cfg(target_arch = "wasm32")]
impl From<GetEraInfoResult> for _GetEraInfoResult {
    fn from(result: GetEraInfoResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetEraInfoResult> for GetEraInfoResult {
    fn from(result: _GetEraInfoResult) -> Self {
        GetEraInfoResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetEraInfoResult {
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn era_summary(&self) -> JsValue {
        JsValue::from_serde(&self.0.era_summary).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getEraInfoOptions", getter_with_clone)]
pub struct GetEraInfoOptions {
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    pub fn get_era_info_options(&self, options: JsValue) -> Result<GetEraInfoOptions, JsError> {
        options
            .into_serde::<GetEraInfoOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "get_era_info")]
    pub async fn get_era_info_js_alias(
        &self,
        options: Option<GetEraInfoOptions>,
    ) -> Result<GetEraInfoResult, JsError> {
        let GetEraInfoOptions {
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
            .get_era_info(maybe_block_identifier, verbosity, rpc_address)
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
    #[deprecated(note = "This function is an alias. Please use `get_era_info` instead.")]
    #[allow(deprecated)]
    pub async fn chain_get_era_info_by_switch_block(
        &self,
        options: Option<GetEraInfoOptions>,
    ) -> Result<GetEraInfoResult, JsError> {
        self.get_era_info_js_alias(options).await
    }
}

impl SDK {
    #[deprecated(note = "prefer 'get_era_summary' as it doesn't require a switch block")]
    #[allow(deprecated)]
    pub async fn get_era_info(
        &self,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetEraInfoResult>, SdkError> {
        //log("get_era_info!");

        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_era_info_cli(
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
            get_era_info_lib(
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
    #[allow(deprecated)]
    async fn test_get_era_info_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk.get_era_info(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_era_info_with_block_id_string() {
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
            .get_era_info(Some(block_identifier), verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_era_info_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_era_info(Some(block_identifier), verbosity, Some(rpc_address.clone()))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_era_info_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_era_info(None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
