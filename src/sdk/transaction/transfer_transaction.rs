#[cfg(target_arch = "wasm32")]
use crate::transaction::transaction::PutTransactionResult;
use crate::{
    make_transfer_transaction,
    types::{
        sdk_error::SdkError, transaction_params::transaction_str_params::TransactionStrParams,
        uref::URef, verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    rpcs::results::PutTransactionResult as _PutTransactionResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for transaction transferring funds.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `target_account` - The target account.
    /// * `amount` - The amount to transfer.
    /// * `transaction_params` - The transaction parameters.
    /// * `maybe_id` - An optional transfer ID (defaults to a random number).
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the transfer or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "transfer_transaction")]
    #[allow(clippy::too_many_arguments)]
    pub async fn transfer_transactionjs_alias(
        &self,
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        let result = self
            .transfer_transaction(
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
    /// Perform a transfer transaction of funds.
    ///
    /// # Arguments
    ///
    /// * `maybe_source` - Optional transfer source uref.
    /// * `target_account` - The target account.
    /// * `amount` - The amount to transfer.
    /// * `transaction_params` - The transaction parameters.
    /// * `maybe_id` - An optional transfer ID (defaults to a random number).
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result a `SuccessResponse<_PutTransactionResult>` of the transfer or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    pub async fn transfer_transaction(
        &self,
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutTransactionResult>, SdkError> {
        //log("transfer!");
        let transaction = make_transfer_transaction(
            maybe_source,
            target_account,
            amount,
            transaction_params,
            maybe_id,
        )?;

        self.put_transaction(transaction, verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {

    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::{
        config::TRANSFER_AMOUNT,
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    async fn test_transfer_with_valid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_transfer_with_valid_transfer_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, chain_name) = get_network_constants();

        let error_message = "the transaction was invalid: invalid associated keys";

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_transfer_with_invalid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();

        let error_message = "The transaction sent to the network had an invalid chain name";
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name("");

        // Act
        let result = sdk
            .transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(node_address),
            )
            .await;
        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
