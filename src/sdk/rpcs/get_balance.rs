use crate::{
    types::{
        digest::{Digest, ToDigest},
        sdk_error::SdkError,
        uref::URef,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::get_balance as get_balance_cli, get_balance as get_balance_lib,
    rpcs::results::GetBalanceResult as _GetBalanceResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetBalanceResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetBalanceResult(_GetBalanceResult);

#[cfg(target_arch = "wasm32")]
impl From<GetBalanceResult> for _GetBalanceResult {
    fn from(result: GetBalanceResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetBalanceResult> for GetBalanceResult {
    fn from(result: _GetBalanceResult) -> Self {
        GetBalanceResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetBalanceResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the balance value as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn balance_value(&self) -> JsValue {
        JsValue::from_serde(&self.0.balance_value).unwrap()
    }

    /// Gets the Merkle proof as a string.
    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    /// Converts the GetBalanceResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_balance` method.
#[derive(Default, Debug, Deserialize, Clone, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getBalanceOptions", getter_with_clone)]
pub struct GetBalanceOptions {
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub purse_uref_as_string: Option<String>,
    pub purse_uref: Option<URef>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses balance options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing balance options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed balance options as a `GetBalanceOptions` struct.
    pub fn get_balance_options(&self, options: JsValue) -> Result<GetBalanceOptions, JsError> {
        options
            .into_serde::<GetBalanceOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves balance information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "get_balance")]
    pub async fn get_balance_js_alias(
        &self,
        options: Option<GetBalanceOptions>,
    ) -> Result<GetBalanceResult, JsError> {
        let GetBalanceOptions {
            state_root_hash_as_string,
            state_root_hash,
            purse_uref_as_string,
            purse_uref,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let purse_uref = if let Some(purse_uref) = purse_uref {
            GetBalanceInput::PurseUref(purse_uref)
        } else if let Some(purse_uref_as_string) = purse_uref_as_string {
            GetBalanceInput::PurseUrefAsString(purse_uref_as_string)
        } else {
            let err = "Error: Missing purse uref as string or purse uref";
            return Err(JsError::new(err));
        };

        let result = if let Some(hash) = state_root_hash {
            self.get_balance(hash, purse_uref, verbosity, rpc_address)
                .await
        } else if let Some(hash) = state_root_hash_as_string.clone() {
            let hash = if !hash.is_empty() {
                match Digest::new(&hash) {
                    Ok(digest) => digest.to_string(),
                    _ => "".to_string(),
                }
            } else {
                "".to_string()
            };
            self.get_balance(&*hash, purse_uref, verbosity, rpc_address)
                .await
        } else {
            self.get_balance("", purse_uref, verbosity, rpc_address)
                .await
        };

        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// JavaScript Alias for `get_balance`.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "state_get_balance")]
    #[deprecated(note = "This function is an alias. Please use `get_balance` instead.")]
    #[allow(deprecated)]
    pub async fn state_get_balance(
        &self,
        options: Option<GetBalanceOptions>,
    ) -> Result<GetBalanceResult, JsError> {
        self.get_balance_js_alias(options).await
    }
}

/// Enum representing different ways to specify the purse uref.
#[derive(Debug, Clone)]
pub enum GetBalanceInput {
    PurseUref(URef),
    PurseUrefAsString(String),
}

impl SDK {
    /// Retrieves balance information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `state_root_hash` - The state root hash to query for balance information.
    /// * `purse_uref` - The purse uref specifying the purse for which to retrieve the balance.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetBalanceResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_balance(
        &self,
        state_root_hash: impl ToDigest,
        purse_uref: GetBalanceInput,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetBalanceResult>, SdkError> {
        //log("get_balance!");
        let state_root_hash = if state_root_hash.is_empty() {
            let state_root_hash = self
                .get_state_root_hash(None, None, Some(self.get_rpc_address(rpc_address.clone())))
                .await;

            match state_root_hash {
                Ok(state_root_hash) => {
                    let state_root_hash: Digest =
                        state_root_hash.result.state_root_hash.unwrap().into();
                    state_root_hash
                }
                Err(_) => "".to_digest(),
            }
        } else {
            state_root_hash.to_digest()
        };
        match purse_uref {
            GetBalanceInput::PurseUref(purse_uref) => get_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                state_root_hash.into(),
                purse_uref.into(),
            )
            .await
            .map_err(SdkError::from),
            GetBalanceInput::PurseUrefAsString(purse_uref) => get_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &state_root_hash.to_string(),
                &purse_uref,
            )
            .await
            .map_err(SdkError::from),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::tests::helpers::{
        get_enable_addressable_entity, get_network_constants, get_user_secret_key,
    };

    async fn get_main_purse() -> URef {
        let sdk = SDK::new(None, None, None);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let main_purse = if get_enable_addressable_entity() {
            sdk.get_entity(None, Some(account), None, None, Some(rpc_address))
                .await
                .unwrap()
                .result
                .entity_result
                .addressable_entity()
                .unwrap()
                .entity
                .main_purse()
        } else {
            #[allow(deprecated)]
            sdk.get_account(None, Some(account), None, None, Some(rpc_address))
                .await
                .unwrap()
                .result
                .account
                .main_purse()
        };

        main_purse.into()
    }

    #[tokio::test]
    async fn test_get_balance_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let purse_uref = GetBalanceInput::PurseUref(get_main_purse().await);
        let error_message = "builder error";

        // Act
        let result = sdk
            .get_balance(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_balance does not support empty string as state_root_hash
                purse_uref,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_balance_with_purse_uref() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let purse_uref = GetBalanceInput::PurseUref(get_main_purse().await);

        // Act
        let result = sdk
            .get_balance("", purse_uref, None, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_balance_with_purse_uref_as_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let purse_uref =
            GetBalanceInput::PurseUrefAsString(get_main_purse().await.to_formatted_string());

        // Act
        let result = sdk
            .get_balance("", purse_uref, None, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_balance_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (rpc_address, _, _, _, _) = get_network_constants();

        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, Some(Verbosity::High), Some(rpc_address.clone()))
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        let purse_uref = GetBalanceInput::PurseUref(get_main_purse().await);

        // Act
        let result = sdk
            .get_balance(
                state_root_hash.to_digest(),
                purse_uref,
                None,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_balance_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let error_message = "error sending request for url (http://localhost/rpc)";
        let purse_uref = GetBalanceInput::PurseUref(get_main_purse().await);
        // Act
        let result = sdk
            .get_balance(
                "7d3dc9c74fe93e83fe6cc7a9830ba223035ad4fd4fd464489640742069ca31ed", // get_balance does not support empty string as state_root_hash
                purse_uref,
                None,
                None,
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
