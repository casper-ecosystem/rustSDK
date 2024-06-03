#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec_transaction::SpeculativeExecTxnResult;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    debug::error,
    make_transfer_transaction,
    types::{
        block_identifier::BlockIdentifierInput, sdk_error::SdkError,
        transaction_params::transaction_str_params::TransactionStrParams, uref::URef,
        verbosity::Verbosity,
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
    /// * `maybe_block_id_as_string` - An optional block ID as a string.
    /// * `maybe_block_identifier` - An optional block identifier.
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
        maybe_block_id_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecTxnResult, JsError> {
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };
        let result = self
            .speculative_transfer_transaction(
                maybe_source,
                target_account,
                amount,
                transaction_params,
                maybe_id,
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
    /// * `maybe_block_identifier` - An optional block identifier.
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
        maybe_block_identifier: Option<BlockIdentifierInput>,
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
        );

        if let Err(err) = transaction {
            let err_msg = format!("Error during speculative_transfer_transaction: {}", err);
            error(&err_msg);
            return Err(err);
        }

        self.speculative_exec_transaction(
            transaction.unwrap(),
            maybe_block_identifier,
            verbosity,
            node_address,
        )
        .await
        .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{helpers::public_key_from_secret_key, types::block_identifier::BlockIdentifier};
    use sdk_tests::{
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_private_key},
    };

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_transfer_transaction_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();

        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
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
                None,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_transfer_transaction_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));

        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
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
                Some(block_identifier),
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_transfer_transaction_with_valid_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();

        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();

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
        let (_, _, default_speculative_address, chain_name) = get_network_constants();

        let error_message = "Invalid argument 'create_transaction (payment_amount)': payment_amount is required to be non empty";
        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_secret_key(&private_key);
        transaction_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .speculative_transfer_transaction(
                None,
                &initiator_addr,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
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
