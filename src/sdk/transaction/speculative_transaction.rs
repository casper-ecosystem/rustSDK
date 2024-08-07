#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecTxnResult;
use crate::{
    types::{
        sdk_error::SdkError,
        transaction_params::{
            transaction_builder_params::{
                transaction_builder_params_to_casper_client, TransactionBuilderParams,
            },
            transaction_str_params::{
                transaction_str_params_to_casper_client, TransactionStrParams,
            },
        },
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::make_transaction, rpcs::results::SpeculativeExecTxnResult as _SpeculativeExecTxnResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// This function allows executing a transaction speculatively.
    ///
    /// # Arguments
    ///
    /// * `builder_params` - Transaction Builder parameters.
    /// * `transaction_params` - Transactionment parameters for the transaction.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SpeculativeExecTxnResult` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "speculative_transaction")]
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transaction_js_alias(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecTxnResult, JsError> {
        let result = self
            .speculative_transaction(builder_params, transaction_params, verbosity, node_address)
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
    /// This function allows executing a transaction speculatively.
    ///
    /// # Arguments
    ///
    /// * `builder_params` - Transaction Builder parameters.
    /// * `transaction_params` - Transactionment parameters for the transaction.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_SpeculativeExecTxnResult>` or a `SdkError` in case of an error.
    pub async fn speculative_transaction(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecTxnResult>, SdkError> {
        // log("speculative_transaction!");
        let transaction = make_transaction(
            transaction_builder_params_to_casper_client(&builder_params),
            transaction_str_params_to_casper_client(&transaction_params),
            false,
        );

        if let Err(err) = transaction {
            return Err(SdkError::from(err));
        }

        self.speculative_exec(transaction.unwrap().into(), verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key, types::transaction_category::TransactionCategory,
    };
    use once_cell::sync::Lazy;
    use sdk_tests::{
        config::{ARGS_SIMPLE, HELLO_CONTRACT, PAYMENT_AMOUNT, WASM_PATH},
        tests::helpers::{get_network_constants, get_user_secret_key, read_wasm_file},
    };

    static ARGS: Lazy<Vec<String>> =
        Lazy::new(|| ARGS_SIMPLE.iter().map(|s| s.to_string()).collect());

    fn get_builder_params() -> &'static TransactionBuilderParams {
        static mut BUILDER_PARAMS: Option<TransactionBuilderParams> = None;

        unsafe {
            if BUILDER_PARAMS.is_none() {
                let file_path = &format!("{WASM_PATH}{HELLO_CONTRACT}");
                let transaction_bytes = match read_wasm_file(file_path) {
                    Ok(transaction_bytes) => transaction_bytes,
                    Err(err) => {
                        eprintln!("Error reading file: {:?}", err);
                        unimplemented!()
                    }
                };
                let builder_params = TransactionBuilderParams::new_session(
                    Some(transaction_bytes.into()),
                    Some(TransactionCategory::InstallUpgrade),
                );
                BUILDER_PARAMS = Some(builder_params);
            }
            BUILDER_PARAMS.as_ref().unwrap()
        }
    }

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_transaction_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        // Act
        let result = sdk
            .speculative_transaction(
                get_builder_params().clone(),
                transaction_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_transaction_with_valid_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        // Act
        let result = sdk
            .speculative_transaction(
                get_builder_params().clone(),
                transaction_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_speculative_transaction_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();

        let error_message = "Invalid transaction";

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);

        // Act
        let result = sdk
            .speculative_transaction(
                get_builder_params().clone(),
                transaction_params,
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
