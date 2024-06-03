#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::{
    types::{
        sdk_error::SdkError,
        transaction::Transaction,
        transaction_params::{
            transaction_builder_params::{
                transaction_builder_params_to_casper_client, TransactionBuilderParams,
            },
            transaction_str_params::{
                transaction_str_params_to_casper_client, TransactionStrParams,
            },
        },
    },
    SDK,
};
use casper_client::cli::make_transaction as client_make_transaction;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `make_transaction` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for `make_transaction`.
    ///
    /// # Arguments
    ///
    /// * `transaction_params` - The transaction parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Transaction` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "make_transaction")]
    pub fn make_transaction_js_alias(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, JsError> {
        let result = make_transaction(builder_params, transaction_params);
        match result {
            Ok(data) => Ok(data),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    /// Creates a transaction using the provided parameters.
    ///
    /// # Arguments
    ///
    /// * `transaction_params` - The transaction parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Transaction` or a `SdkError` in case of an error.
    pub fn make_transaction(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, SdkError> {
        make_transaction(builder_params, transaction_params).map_err(SdkError::from)
    }
}

/// Internal function to create a transaction.
pub(crate) fn make_transaction(
    builder_params: TransactionBuilderParams,
    transaction_params: TransactionStrParams,
) -> Result<Transaction, SdkError> {
    // log("make_transaction");
    let transaction = client_make_transaction(
        transaction_builder_params_to_casper_client(&builder_params),
        transaction_str_params_to_casper_client(&transaction_params),
        false,
    );
    transaction.map(Into::into).map_err(SdkError::from)
}

#[cfg(test)]
mod tests {

    use super::*;
    use crate::{
        helpers::public_key_from_secret_key, types::addressable_entity_hash::AddressableEntityHash,
    };
    use sdk_tests::{
        config::{ENTRYPOINT_MINT, PAYMENT_AMOUNT},
        tests::helpers::{get_network_constants, get_user_private_key},
    };

    #[tokio::test]
    async fn test_make_transaction_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_hash = AddressableEntityHash::from_formatted_str(
            "addressable-entity-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();
        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_hash, ENTRYPOINT_MINT);

        // Act
        let result = sdk.make_transaction(builder_params, transaction_params);

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_transaction_with_valid_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_hash = AddressableEntityHash::from_formatted_str(
            "addressable-entity-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();
        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_hash, ENTRYPOINT_MINT);

        // Act
        let result = sdk.make_transaction(builder_params, transaction_params);

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_transaction_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, _, chain_name) = get_network_constants();
        let error_message = "Invalid argument 'create_transaction (payment_amount)': payment_amount is required to be non empty";
        let private_key = get_user_private_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(""); // This is not valid payment amount

        let entity_hash = AddressableEntityHash::from_formatted_str(
            "addressable-entity-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();
        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_hash, ENTRYPOINT_MINT);

        // Act
        let result = sdk.make_transaction(builder_params, transaction_params);

        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}