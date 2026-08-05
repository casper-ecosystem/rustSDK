#[cfg(target_arch = "wasm32")]
use crate::types::identifier::block_identifier::BlockIdentifier;
use crate::{
    types::{public_key::PublicKey, sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    cli::get_reward as get_reward_cli, get_reward as get_reward_lib,
    rpcs::results::GetRewardResult as _GetRewardResult, rpcs::EraIdentifier, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use casper_types::EraId;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Wrapper struct for the `GetRewardResult` from casper_client.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Serialize)]
#[wasm_bindgen]
pub struct GetRewardResult(_GetRewardResult);

#[cfg(target_arch = "wasm32")]
impl From<GetRewardResult> for _GetRewardResult {
    fn from(result: GetRewardResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetRewardResult> for GetRewardResult {
    fn from(result: _GetRewardResult) -> Self {
        GetRewardResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetRewardResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the reward amount as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn reward_amount(&self) -> JsValue {
        JsValue::from_serde(&self.0.reward_amount).unwrap()
    }

    /// Gets the era id as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn era_id(&self) -> JsValue {
        JsValue::from_serde(&self.0.era_id).unwrap()
    }

    /// Gets the delegation rate.
    #[wasm_bindgen(getter)]
    pub fn delegation_rate(&self) -> u8 {
        self.0.delegation_rate
    }

    /// Gets the switch block hash as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn switch_block_hash(&self) -> JsValue {
        JsValue::from_serde(&self.0.switch_block_hash).unwrap()
    }

    /// Converts the GetRewardResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_reward` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getRewardOptions", getter_with_clone)]
pub struct GetRewardOptions {
    pub validator_public_key: Option<PublicKey>,
    pub validator_public_key_as_string: Option<String>,
    pub delegator_public_key: Option<PublicKey>,
    pub delegator_public_key_as_string: Option<String>,
    pub maybe_era_id: Option<u64>,
    pub maybe_era_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses reward options from a JsValue.
    pub fn get_reward_options(&self, options: JsValue) -> Result<GetRewardOptions, JsError> {
        options
            .into_serde::<GetRewardOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {err:?}")))
    }

    /// Retrieves validator/delegator reward via JSON-RPC `info_get_reward`.
    #[wasm_bindgen(js_name = "get_reward")]
    pub async fn get_reward_js_alias(
        &self,
        options: Option<GetRewardOptions>,
    ) -> Result<GetRewardResult, JsError> {
        let GetRewardOptions {
            validator_public_key,
            validator_public_key_as_string,
            delegator_public_key,
            delegator_public_key_as_string,
            maybe_era_id,
            maybe_era_id_as_string,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let validator = if let Some(pk) = validator_public_key {
            pk
        } else if let Some(hex) = validator_public_key_as_string {
            PublicKey::new(&hex).map_err(|err| JsError::new(&format!("{err:?}")))?
        } else {
            return Err(JsError::new(
                "validator_public_key or validator_public_key_as_string is required",
            ));
        };

        let delegator = if let Some(pk) = delegator_public_key {
            Some(pk)
        } else if let Some(hex) = delegator_public_key_as_string {
            Some(PublicKey::new(&hex).map_err(|err| JsError::new(&format!("{err:?}")))?)
        } else {
            None
        };

        let maybe_era_identifier = if let Some(era_id) = maybe_era_id {
            Some(EraIdentifier::Era(EraId::new(era_id)))
        } else if let Some(era_str) = maybe_era_id_as_string {
            if era_str.is_empty() {
                None
            } else {
                let era_id: u64 = era_str
                    .parse()
                    .map_err(|err| JsError::new(&format!("Invalid era id: {err:?}")))?;
                Some(EraIdentifier::Era(EraId::new(era_id)))
            }
        } else {
            maybe_block_identifier.map(|block| EraIdentifier::Block(block.into()))
        };

        let result = self
            .get_reward(
                validator,
                delegator,
                maybe_era_identifier,
                verbosity,
                rpc_address,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {err:?}");
                Err(JsError::new(err))
            }
        }
    }

    /// JavaScript alias for `get_reward`.
    #[wasm_bindgen(js_name = "info_get_reward")]
    #[deprecated(note = "This function is an alias. Please use `get_reward` instead.")]
    #[allow(deprecated)]
    pub async fn info_get_reward(
        &self,
        options: Option<GetRewardOptions>,
    ) -> Result<GetRewardResult, JsError> {
        self.get_reward_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves reward information (`info_get_reward`).
    ///
    /// # Arguments
    ///
    /// * `validator` - Validator public key.
    /// * `maybe_delegator` - Optional delegator public key (validator reward when `None`).
    /// * `maybe_era_identifier` - Optional era or block identifier (`None` = last finalized era).
    /// * `verbosity` - Optional verbosity.
    /// * `rpc_address` - Optional RPC URL.
    pub async fn get_reward(
        &self,
        validator: PublicKey,
        maybe_delegator: Option<PublicKey>,
        maybe_era_identifier: Option<EraIdentifier>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetRewardResult>, SdkError> {
        let random_id = rand::rng().random::<u64>().to_string();
        get_reward_lib(
            JsonRpcId::from(random_id),
            &self.get_rpc_address(rpc_address),
            self.get_verbosity(verbosity).into(),
            maybe_era_identifier,
            validator.into(),
            maybe_delegator.map(Into::into),
        )
        .await
        .map_err(SdkError::from)
    }

    /// CLI-string convenience wrapper around `info_get_reward`.
    pub async fn get_reward_as_string(
        &self,
        validator: &str,
        maybe_delegator: Option<&str>,
        maybe_era_id: Option<&str>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetRewardResult>, SdkError> {
        let random_id = rand::rng().random::<u64>().to_string();
        get_reward_cli(
            &random_id,
            &self.get_rpc_address(rpc_address),
            self.get_verbosity(verbosity).into(),
            maybe_era_id.unwrap_or(""),
            validator,
            maybe_delegator.unwrap_or(""),
        )
        .await
        .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_get_reward_with_none_rpc_address() {
        let sdk = SDK::new(None, None, None);
        let error_message = "failed to parse node address as valid URL";
        let result = sdk
            .get_reward_as_string(
                "01aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                None,
                None,
                None,
                None,
            )
            .await;
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(
            err_string.contains(error_message)
                || err_string.contains("Failed")
                || err_string.contains("parse")
                || err_string.contains("PublicKey")
                || err_string.contains("Validator")
        );
    }

    #[tokio::test]
    async fn test_get_reward_with_error() {
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let result = sdk
            .get_reward_as_string(
                "01aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                None,
                None,
                None,
                None,
            )
            .await;
        assert!(result.is_err());
    }
}
