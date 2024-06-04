use crate::{
    debug::error,
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
    cli::make_transaction, rpcs::results::PutTransactionResult as _PutTransactionResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the result of a transaction.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct PutTransactionResult(_PutTransactionResult);

/// Implement conversions between PutTransactionResult and _PutTransactionResult.
#[cfg(target_arch = "wasm32")]
impl From<PutTransactionResult> for _PutTransactionResult {
    fn from(result: PutTransactionResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_PutTransactionResult> for PutTransactionResult {
    fn from(result: _PutTransactionResult) -> Self {
        PutTransactionResult(result)
    }
}

/// Implement JavaScript bindings for PutTransactionResult.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl PutTransactionResult {
    /// Gets the API version as a JavaScript value.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    // /// Gets the transaction hash associated with this result.
    // #[wasm_bindgen(getter)]
    // pub fn transaction_hash(&self) -> TransactionV1Hash {
    //     self.0.transaction_hash.into()
    // }

    /// Converts PutTransactionResult to a JavaScript object.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JavaScript function for transactioning with deserialized parameters.
    ///
    /// # Arguments
    ///
    /// * `transaction_params` - Transaction parameters.
    /// * `builder_params` - Session parameters.
    /// * `verbosity` - An optional verbosity level.
    /// * `node_address` - An optional node address.
    ///
    /// # Returns
    ///
    /// A result containing PutTransactionResult or a JsError.
    #[wasm_bindgen(js_name = "transaction")]
    pub async fn transaction_js_alias(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        let result = self
            .transaction(builder_params, transaction_params, verbosity, node_address)
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
    /// Perform a transaction operation.
    ///
    /// # Arguments
    ///
    /// * `builder_params` - Transaction Builder parameters.
    /// * `transaction_params` - Transaction parameters.
    /// * `verbosity` - An optional verbosity level.
    /// * `node_address` - An optional node address.
    ///
    /// # Returns
    ///
    /// A result containing a `SuccessResponse<_PutTransactionResult>` or an SdkError.
    pub async fn transaction(
        &self,
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutTransactionResult>, SdkError> {
        //log("transaction!");
        let transaction = match make_transaction(
            transaction_builder_params_to_casper_client(&builder_params),
            transaction_str_params_to_casper_client(&transaction_params),
            false,
        ) {
            Ok(transaction) => transaction,
            Err(err) => {
                let err_msg = format!("Error during transaction: {}", err);
                error(&err_msg);
                return Err(SdkError::from(err));
            }
        };

        self.put_transaction(transaction.into(), verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use once_cell::sync::Lazy;
    use sdk_tests::{
        config::{ARGS_SIMPLE, HELLO_CONTRACT, PAYMENT_AMOUNT, WASM_PATH},
        tests::helpers::{get_network_constants, get_user_private_key, read_wasm_file},
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
                let builder_params =
                    TransactionBuilderParams::new_session(Some(transaction_bytes.into()));
                BUILDER_PARAMS = Some(builder_params);
            }
            BUILDER_PARAMS.as_ref().unwrap()
        }
    }

    #[tokio::test]
    async fn test_transaction_with_valid_transaction_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        // Act
        let result = sdk
            .transaction(
                get_builder_params().clone(),
                transaction_params,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        // dbg!(result);
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_transaction_with_valid_transaction_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&private_key).unwrap();
        let error_message = "Invalid transaction";

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        // Act
        let result = sdk
            .transaction(
                get_builder_params().clone(),
                transaction_params,
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
    async fn test_transaction_with_invalid_transaction_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, chain_name) = get_network_constants();

        let error_message = "Invalid argument 'create_transaction (payment_amount)': payment_amount is required to be non empty";
        let private_key = get_user_private_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&private_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .transaction(
                get_builder_params().clone(),
                transaction_params,
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
