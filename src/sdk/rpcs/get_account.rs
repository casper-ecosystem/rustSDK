#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    debug::error,
    types::{
        account_identifier::AccountIdentifier, block_identifier::BlockIdentifierInput,
        sdk_error::SdkError, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::cli::parse::account_identifier as parse_account_identifier;
use casper_client::{
    cli::get_account as get_account_cli, get_account as get_account_lib,
    rpcs::results::GetAccountResult as _GetAccountResult, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define the GetAccountResult struct to wrap the result from Casper Client RPC call
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetAccountResult(_GetAccountResult);

// Implement conversions between GetAccountResult and _GetAccountResult
#[cfg(target_arch = "wasm32")]
impl From<GetAccountResult> for _GetAccountResult {
    fn from(result: GetAccountResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetAccountResult> for GetAccountResult {
    fn from(result: _GetAccountResult) -> Self {
        GetAccountResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetAccountResult {
    // Define getters for various fields of GetAccountResult
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn account(&self) -> JsValue {
        JsValue::from_serde(&self.0.account).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

// Define options for the `get_account` function
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getAccountOptions", getter_with_clone)]
pub struct GetAccountOptions {
    pub account_identifier: Option<AccountIdentifier>,
    pub account_identifier_as_string: Option<String>,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    // Deserialize options for `get_account` from a JavaScript object
    #[wasm_bindgen(js_name = "get_account_options")]
    pub fn get_account_options(&self, options: JsValue) -> GetAccountOptions {
        let options_result = options.into_serde::<GetAccountOptions>();
        match options_result {
            Ok(options) => options,
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetAccountOptions::default()
            }
        }
    }

    // JavaScript alias for `get_account` function
    #[wasm_bindgen(js_name = "get_account")]
    pub async fn get_account_js_alias(
        &self,
        options: Option<GetAccountOptions>,
    ) -> Result<GetAccountResult, JsError> {
        let GetAccountOptions {
            account_identifier,
            account_identifier_as_string,
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
            .get_account(
                account_identifier,
                account_identifier_as_string,
                maybe_block_identifier,
                verbosity,
                node_address,
            )
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

    // JavaScript alias for `get_account_js_alias`
    #[wasm_bindgen(js_name = "state_get_account_info")]
    pub async fn state_get_account_info_js_alias(
        &self,
        options: Option<GetAccountOptions>,
    ) -> Result<GetAccountResult, JsError> {
        self.get_account_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves account information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `account_identifier` - An optional `AccountIdentifier` for specifying the account identifier.
    /// * `account_identifier_as_string` - An optional string representing the account identifier.
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` for specifying a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_GetAccountResult>` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_account(
        &self,
        account_identifier: Option<AccountIdentifier>,
        account_identifier_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetAccountResult>, SdkError> {
        let account_identifier = if let Some(account_identifier) = account_identifier {
            account_identifier
        } else if let Some(account_identifier_as_string) = account_identifier_as_string.clone() {
            match parse_account_identifier(&account_identifier_as_string) {
                Ok(parsed) => parsed.into(),
                Err(err) => {
                    error(&err.to_string());
                    return Err(SdkError::FailedToParseAccountIdentifier);
                }
            }
        } else {
            let err = "Error: Missing account identifier".to_string();
            error(&err);
            return Err(SdkError::InvalidArgument {
                context: "get_account",
                error: err,
            });
        };
        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_account_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id,
                &account_identifier.to_string(),
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
            get_account_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_node_address(node_address),
                self.get_verbosity(verbosity).into(),
                maybe_block_identifier.map(Into::into),
                account_identifier.into(),
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
        types::{block_identifier::BlockIdentifier, public_key::PublicKey},
    };
    use sdk_tests::tests::helpers::{get_network_constants, get_user_private_key};

    fn get_account_identifier() -> AccountIdentifier {
        let private_key = get_user_private_key(None).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();
        let public_key = PublicKey::new(&account).unwrap();

        AccountIdentifier::from_account_account_under_public_key(public_key)
    }

    #[tokio::test]
    async fn test_get_account_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";
        let account_identifier = get_account_identifier();

        // Act
        let result = sdk
            .get_account(Some(account_identifier), None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_account_with_missing_account() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "Error: Missing account identifier";

        // Act
        let result = sdk.get_account(None, None, None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_account_with_account_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let account_identifier = get_account_identifier();
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_account(
                Some(account_identifier),
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
    async fn test_get_account_with_account_identifier_as_string() {
        // Arrange
        let sdk = SDK::new(None, None);
        let account_identifier_as_string = get_account_identifier().to_string();
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_account(
                None,
                Some(account_identifier_as_string),
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_account_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let account_identifier = get_account_identifier();
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_account(
                Some(account_identifier),
                None,
                Some(block_identifier),
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_account_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let account_identifier = get_account_identifier();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .get_account(Some(account_identifier), None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
