use crate::{
    types::{
        sdk_error::SdkError,
        transaction::Transaction,
        transaction_params::transaction_str_params::{
            transaction_str_params_to_casper_client, TransactionStrParams,
        },
        uref::URef,
    },
    SDK,
};
use casper_client::cli::{
    make_transaction as client_make_transaction, parse::transfer_target, TransactionBuilderParams,
};
use casper_types::U512;
use rand::Rng;
use std::str::FromStr;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `make_transfer_transaction` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for `make_transfer_transaction`.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `amount` - The transfer amount.
    /// * `target` - The target account.
    /// * `transaction_params` - The transaction parameters.
    /// * `maybe_id` - Optional transfer identifier.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Transaction` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "make_transfer_transaction")]
    pub fn make_transfer_transaction_js_alias(
        &self,
        maybe_source: Option<URef>,
        target: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
    ) -> Result<Transaction, JsError> {
        // log("make_transfer_transaction");
        let result = self.make_transfer_transaction(
            maybe_source,
            target,
            amount,
            transaction_params,
            maybe_id,
        );
        match result {
            Ok(data) => Ok(data),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    /// Creates a transfer transaction with the provided parameters.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `amount` - The transfer amount.
    /// * `target` - The target account.
    /// * `transaction_params` - The transaction parameters.
    /// * `maybe_id` - Optional transfer identifier.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Transaction` or a `SdkError` in case of an error.
    pub fn make_transfer_transaction(
        &self,
        maybe_source: Option<URef>,
        target: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
    ) -> Result<Transaction, SdkError> {
        // log("make_transfer_transaction");
        make_transfer_transaction(maybe_source, target, amount, transaction_params, maybe_id)
            .map_err(SdkError::from)
    }
}

/// Internal function to create a transfer transaction.
pub(crate) fn make_transfer_transaction(
    maybe_source: Option<URef>,
    target: &str,
    amount: &str,
    transaction_params: TransactionStrParams,
    maybe_id: Option<String>,
) -> Result<Transaction, SdkError> {
    let id = if let Some(maybe_id) = maybe_id {
        u64::from_str(&maybe_id).unwrap_or_else(|_| rand::thread_rng().gen::<u64>())
    } else {
        rand::thread_rng().gen::<u64>()
    };

    let target = transfer_target(target)?;

    let amount = U512::from_dec_str(amount).map_err(|error| SdkError::FailedToDecodeHex {
        context: "make_transfer_transaction",
        error: error.to_string(),
    })?;

    let builder_params = TransactionBuilderParams::Transfer {
        maybe_source: maybe_source.map(Into::into),
        target,
        amount,
        maybe_id: Some(id),
    };

    transaction_params.set_standard_payment(true);

    let transaction = client_make_transaction(
        builder_params,
        transaction_str_params_to_casper_client(&transaction_params),
        false,
    );
    transaction.map(Into::into).map_err(SdkError::from)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::{
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    async fn test_make_transfer_transaction_with_valid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk.make_transfer_transaction(
            None,
            &initiator_addr,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        );

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_transfer_transaction_with_valid_transfer_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk.make_transfer_transaction(
            None,
            &initiator_addr,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        );

        // Assert
        assert!(result.is_ok());
    }
}
