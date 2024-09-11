#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecTxnResult;
use crate::{
    make_transfer_transaction,
    types::{
        sdk_error::SdkError, transaction_params::transaction_str_params::TransactionStrParams,
        uref::URef, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecTxnResult as _SpeculativeExecTxnResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for speculative transfer transaction.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `target_account` - The target account.
    /// * `amount` - The amount to transfer.
    /// * `maybe_id` - An optional transfer ID (defaults to a random number).
    /// * `transaction_params` - The transactionment parameters.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(js_name = "speculative_transfer_transaction")]
    pub async fn speculative_transfer_transaction_js_alias(
        &self,
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecTxnResult, JsError> {
        let result = self
            .speculative_transfer_transaction(
                maybe_source,
                target_account,
                amount,
                transaction_params,
                maybe_id,
                verbosity,
                node_address,
            )
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

impl SDK {
    /// Perform a speculative transfer transaction.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transaction_params` - The transactionment parameters.
    /// * `maybe_id` - An optional transfer ID (defaults to a random number).
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result a `SuccessResponse<_SpeculativeExecTxnResult>` or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transfer_transaction(
        &self,
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecTxnResult>, SdkError> {
        // log("speculative_transfer_transaction!");
        let transaction = make_transfer_transaction(
            maybe_source,
            target_account,
            amount,
            transaction_params,
            maybe_id,
        )?;

        self.speculative_exec(transaction, verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
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
    #[ignore]
    async fn _test_speculative_transfer_transaction_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_transfer_transaction_with_valid_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_speculative_transfer_transaction_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let error_message = "Node request failure";
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_secret_key(&secret_key);

        // Act
        let result = sdk
            .speculative_transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
