#[cfg(target_arch = "wasm32")]
use crate::transaction::transaction::PutTransactionResult;
use crate::types::transaction_params::{
    transaction_builder_params::TransactionBuilderParams,
    transaction_str_params::TransactionStrParams,
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{
    rpcs::results::PutTransactionResult as _PutTransactionResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// A set of functions for working with smart contract entry points.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Calls a smart contract entry point with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///
    /// * `transaction_params` - Transaction parameters.
    /// * `builder_params` - Transaction Builder parameters.
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the call.
    #[wasm_bindgen(js_name = "call_entrypoint")]
    pub async fn call_entrypoint_js_alias(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        let result = self
            .call_entrypoint(builder_params, transaction_params, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }
}

/// A set of functions for working with smart contract entry points.
/// Alias of sdk.transaction
impl SDK {
    /// Calls a smart contract entry point with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///
    /// * `builder_params` - Transaction Builder parameters.
    /// * `transaction_params` - Transaction parameters.
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_PutTransactionResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the call.
    pub async fn call_entrypoint(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutTransactionResult>, SdkError> {
        //log("call_entrypoint!");;
        self.transaction(builder_params, transaction_params, None, node_address)
            .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key, install_cep78, types::addr::entity_addr::EntityAddr,
    };
    use once_cell::sync::Lazy;
    use sdk_tests::{
        config::{ARGS_SIMPLE, ENTRYPOINT_MINT, PAYMENT_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };
    use tokio;

    static ARGS: Lazy<Vec<String>> =
        Lazy::new(|| ARGS_SIMPLE.iter().map(|s| s.to_string()).collect());

    async fn get_entity_key() -> String {
        install_cep78().await
    }

    #[tokio::test]
    async fn test_call_entrypoint_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let builder_params = TransactionBuilderParams::default();
        let transaction_params = TransactionStrParams::default();

        let error_message =
            "transaction requires account - use `with_account` or `with_secret_key`";

        // Act
        let result = sdk
            .call_entrypoint(builder_params, transaction_params, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_with_valid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let entity_addr = EntityAddr::from_formatted_str(&get_entity_key().await).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let result = sdk
            .call_entrypoint(builder_params, transaction_params, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
        let transaction_hash = result.unwrap().result.transaction_hash;
        assert!(!transaction_hash.to_string().is_empty());
    }

    #[tokio::test]
    async fn test_call_entrypoint_with_invalid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let error_message = "the transaction was invalid: no such contract at hash";
        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let entity_addr = EntityAddr::from_formatted_str(
            "entity-contract-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let result = sdk
            .call_entrypoint(builder_params, transaction_params, Some(node_address))
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let error_message = "the transaction was invalid: invalid associated keys";

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let entity_addr = EntityAddr::from_formatted_str(
            "entity-contract-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let result = sdk
            .call_entrypoint(builder_params, transaction_params, Some(node_address))
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let error_message = "error sending request for url (http://localhost/rpc)";

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let entity_addr = EntityAddr::from_formatted_str(
            "entity-contract-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let result = sdk
            .call_entrypoint(builder_params, transaction_params, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
