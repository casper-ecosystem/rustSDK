#[cfg(target_arch = "wasm32")]
use crate::types::digest::Digest;
use crate::types::{
    global_state_identifier::GlobalStateIdentifier, purse_identifier::PurseIdentifier,
};
use crate::{
    types::{sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::cli::parse::purse_identifier as parse_purse_identifier;
use casper_client::{
    cli::query_balance as query_balance_cli, query_balance as query_balance_lib,
    rpcs::results::QueryBalanceResult as _QueryBalanceResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the QueryBalanceResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct QueryBalanceResult(_QueryBalanceResult);

#[cfg(target_arch = "wasm32")]
impl From<QueryBalanceResult> for _QueryBalanceResult {
    fn from(result: QueryBalanceResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_QueryBalanceResult> for QueryBalanceResult {
    fn from(result: _QueryBalanceResult) -> Self {
        QueryBalanceResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl QueryBalanceResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the balance as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn balance(&self) -> JsValue {
        JsValue::from_serde(&self.0.balance).unwrap()
    }

    /// Converts the QueryBalanceResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `query_balance` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryBalanceOptions", getter_with_clone)]
pub struct QueryBalanceOptions {
    pub purse_identifier_as_string: Option<String>,
    pub purse_identifier: Option<PurseIdentifier>,
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses query balance options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing query balance options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed query balance options as a `QueryBalanceOptions` struct.
    pub fn query_balance_options(&self, options: JsValue) -> Result<QueryBalanceOptions, JsError> {
        options
            .into_serde::<QueryBalanceOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves balance information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "query_balance")]
    pub async fn query_balance_js_alias(
        &self,
        options: Option<QueryBalanceOptions>,
    ) -> Result<QueryBalanceResult, JsError> {
        let QueryBalanceOptions {
            global_state_identifier,
            purse_identifier_as_string,
            purse_identifier,
            state_root_hash_as_string,
            state_root_hash,
            maybe_block_id_as_string,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let result = if let Some(hash) = state_root_hash {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                Some(hash.to_string()),
                None,
                verbosity,
                rpc_address,
            )
            .await
        } else if let Some(hash) = state_root_hash_as_string {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                Some(hash.to_string()),
                None,
                verbosity,
                rpc_address,
            )
            .await
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                None,
                Some(maybe_block_id_as_string),
                verbosity,
                rpc_address,
            )
            .await
        } else {
            self.query_balance(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                None,
                None,
                verbosity,
                rpc_address,
            )
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
}

impl SDK {
    /// Retrieves balance information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_global_state_identifier` - An optional `GlobalStateIdentifier` for specifying global state.
    /// * `purse_identifier_as_string` - An optional string representing a purse identifier.
    /// * `purse_identifier` - An optional `PurseIdentifier`.
    /// * `state_root_hash` - An optional string representing a state root hash.
    /// * `maybe_block_id` - An optional string representing a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_QueryBalanceResult>` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    #[allow(clippy::too_many_arguments)]
    pub async fn query_balance(
        &self,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier_as_string: Option<String>,
        purse_identifier: Option<PurseIdentifier>,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_QueryBalanceResult>, SdkError> {
        //log("query_balance!");

        let purse_identifier: PurseIdentifier = if let Some(purse_identifier) = purse_identifier {
            purse_identifier
        } else if let Some(purse_id) = purse_identifier_as_string.clone() {
            match parse_purse_identifier(&purse_id) {
                Ok(parsed) => parsed.into(),
                Err(err) => {
                    return Err(err.into());
                }
            }
        } else {
            let err = "Error: Missing purse identifier".to_string();
            return Err(SdkError::InvalidArgument {
                context: "query_global_state",
                error: err,
            });
        };

        if let Some(maybe_global_state_identifier) = maybe_global_state_identifier {
            query_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                Some(maybe_global_state_identifier.into()),
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if maybe_global_state_identifier.is_none() {
            query_balance_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                None,
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(state_root_hash) = state_root_hash {
            query_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                "",
                &state_root_hash,
                &purse_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        } else {
            query_balance_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id.unwrap_or_default(),
                "",
                &purse_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::{digest::Digest, public_key::PublicKey},
    };
    use sdk_tests::tests::helpers::{get_network_constants, get_user_secret_key};

    fn get_purse_identifier() -> PurseIdentifier {
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let public_key = PublicKey::new(&account).unwrap();

        PurseIdentifier::from_main_purse_under_public_key(public_key)
    }

    #[tokio::test]
    async fn test_query_balance_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";

        // Act
        let result = sdk
            .query_balance(
                None,
                None,
                Some(get_purse_identifier()),
                None,
                None,
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
    async fn test_query_balance_with_missing_purse() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "Error: Missing purse identifier";

        // Act
        let result = sdk
            .query_balance(None, None, None, None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();

        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_balance_with_global_state_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let global_state_identifier = GlobalStateIdentifier::from_block_height(1);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        // Act
        let result = sdk
            .query_balance(
                Some(global_state_identifier.clone()),
                None,
                Some(get_purse_identifier()),
                None,
                None,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();
        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, verbosity, Some(rpc_address.clone()))
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        // Act
        let result = sdk
            .query_balance(
                None,
                None,
                Some(get_purse_identifier()),
                Some(state_root_hash.to_string()),
                None,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_with_block_id() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance(
                None,
                None,
                Some(get_purse_identifier()),
                None,
                Some("1".to_string()),
                verbosity,
                Some(rpc_address.clone()),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_with_purse_identifier() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance(
                None,
                None,
                Some(get_purse_identifier()),
                None,
                None,
                verbosity,
                Some(rpc_address.clone()),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_with_purse_identifier_as_string() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance(
                None,
                Some(get_purse_identifier().to_string()),
                None,
                None,
                None,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .query_balance(
                None,
                Some(get_purse_identifier().to_string()),
                None,
                None,
                None,
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
