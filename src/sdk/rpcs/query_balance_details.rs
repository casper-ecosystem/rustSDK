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
    cli::query_balance_details as query_balance_details_cli,
    query_balance_details as query_balance_details_lib,
    rpcs::results::QueryBalanceDetailsResult as _QueryBalanceDetailsResult, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the QueryBalanceDetailsResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct QueryBalanceDetailsResult(_QueryBalanceDetailsResult);

#[cfg(target_arch = "wasm32")]
impl From<QueryBalanceDetailsResult> for _QueryBalanceDetailsResult {
    fn from(result: QueryBalanceDetailsResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_QueryBalanceDetailsResult> for QueryBalanceDetailsResult {
    fn from(result: _QueryBalanceDetailsResult) -> Self {
        QueryBalanceDetailsResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl QueryBalanceDetailsResult {
    /// Gets the API version as a JsValue.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn total_balance(&self) -> JsValue {
        JsValue::from_serde(&self.0.total_balance).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn available_balance(&self) -> JsValue {
        JsValue::from_serde(&self.0.available_balance).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn total_balance_proof(&self) -> JsValue {
        JsValue::from_serde(&self.0.total_balance_proof).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn holds(&self) -> JsValue {
        JsValue::from_serde(&self.0.holds).unwrap()
    }

    /// Converts the QueryBalanceDetailsResult to a JsValue.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `query_balance` method.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "queryBalanceDetailsOptions", getter_with_clone)]
pub struct QueryBalanceDetailsOptions {
    pub purse_identifier_as_string: Option<String>,
    pub purse_identifier: Option<PurseIdentifier>,
    pub global_state_identifier: Option<GlobalStateIdentifier>,
    pub state_root_hash_as_string: Option<String>,
    pub state_root_hash: Option<Digest>,
    pub maybe_block_id_as_string: Option<String>,
    pub node_address: Option<String>,
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
    /// Parsed query balance options as a `QueryBalanceDetailsOptions` struct.
    pub fn query_balance_details_options(
        &self,
        options: JsValue,
    ) -> Result<QueryBalanceDetailsOptions, JsError> {
        options
            .into_serde::<QueryBalanceDetailsOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves balance information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `QueryBalanceDetailsOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `QueryBalanceDetailsResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process.
    #[wasm_bindgen(js_name = "query_balance_details")]
    pub async fn query_balance_details_js_alias(
        &self,
        options: Option<QueryBalanceDetailsOptions>,
    ) -> Result<QueryBalanceDetailsResult, JsError> {
        let QueryBalanceDetailsOptions {
            global_state_identifier,
            purse_identifier_as_string,
            purse_identifier,
            state_root_hash_as_string,
            state_root_hash,
            maybe_block_id_as_string,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let result = if let Some(hash) = state_root_hash {
            self.query_balance_details(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                Some(hash.to_string()),
                None,
                verbosity,
                node_address,
            )
            .await
        } else if let Some(hash) = state_root_hash_as_string {
            self.query_balance_details(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                Some(hash.to_string()),
                None,
                verbosity,
                node_address,
            )
            .await
        } else if let Some(maybe_block_id_as_string) = maybe_block_id_as_string {
            self.query_balance_details(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                None,
                Some(maybe_block_id_as_string),
                verbosity,
                node_address,
            )
            .await
        } else {
            self.query_balance_details(
                global_state_identifier,
                purse_identifier_as_string,
                purse_identifier,
                None,
                None,
                verbosity,
                node_address,
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
    /// Retrieves balance information details based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `maybe_global_state_identifier` - An optional `GlobalStateIdentifier` for specifying global state.
    /// * `purse_identifier_as_string` - An optional string representing a purse identifier.
    /// * `purse_identifier` - An optional `PurseIdentifier`.
    /// * `state_root_hash` - An optional string representing a state root hash.
    /// * `maybe_block_id` - An optional string representing a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_QueryBalanceDetailsResult>` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    #[allow(clippy::too_many_arguments)]
    pub async fn query_balance_details(
        &self,
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
        purse_identifier_as_string: Option<String>,
        purse_identifier: Option<PurseIdentifier>,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_QueryBalanceDetailsResult>, SdkError> {
        //log("query_balance_details!");

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
            query_balance_details_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                Some(maybe_global_state_identifier.into()),
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if maybe_global_state_identifier.is_none() {
            query_balance_details_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                None,
                purse_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        } else if let Some(state_root_hash) = state_root_hash {
            query_balance_details_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                "",
                &state_root_hash,
                &purse_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        } else {
            query_balance_details_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
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
    async fn test_query_balance_details_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";

        // Act
        let result = sdk
            .query_balance_details(
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
    async fn test_query_balance_details_with_missing_purse() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "Error: Missing purse identifier";

        // Act
        let result = sdk
            .query_balance_details(None, None, None, None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();

        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_query_balance_details_with_global_state_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let global_state_identifier = GlobalStateIdentifier::from_block_height(1);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();
        // Act
        let result = sdk
            .query_balance_details(
                Some(global_state_identifier.clone()),
                None,
                Some(get_purse_identifier()),
                None,
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_details_with_state_root_hash() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();
        let state_root_hash: Digest = sdk
            .get_state_root_hash(None, verbosity, Some(node_address.clone()))
            .await
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        // Act
        let result = sdk
            .query_balance_details(
                None,
                None,
                Some(get_purse_identifier()),
                Some(state_root_hash.to_string()),
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_details_with_block_id() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance_details(
                None,
                None,
                Some(get_purse_identifier()),
                None,
                Some("1".to_string()),
                verbosity,
                Some(node_address.clone()),
            )
            .await;
        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_details_with_purse_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance_details(
                None,
                None,
                Some(get_purse_identifier()),
                None,
                None,
                verbosity,
                Some(node_address.clone()),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_details_with_purse_identifier_as_string() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .query_balance_details(
                None,
                Some(get_purse_identifier().to_string()),
                None,
                None,
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_query_balance_details_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);

        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .query_balance_details(
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
