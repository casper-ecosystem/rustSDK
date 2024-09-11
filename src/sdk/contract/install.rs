#[cfg(target_arch = "wasm32")]
use crate::transaction::transaction::PutTransactionResult;
use crate::{
    types::{
        cl::bytes::Bytes,
        sdk_error::SdkError,
        transaction_category::TransactionCategory,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    },
    SDK,
};
use casper_client::{
    rpcs::results::PutTransactionResult as _PutTransactionResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// A set of functions for installing smart contracts on the blockchain.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Installs a smart contract with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///.
    /// * `transaction_params` - Transaction parameters.
    /// * `transaction_bytes` - Transaction Bytes to install
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the installation.
    #[wasm_bindgen(js_name = "install")]
    pub async fn install_js_alias(
        &self,
        transaction_params: TransactionStrParams,
        transaction_bytes: Bytes,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        let result = self
            .install(transaction_params, transaction_bytes, node_address)
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

/// A set of functions for installing smart contracts on the blockchain.
/// Alias of sdk.transaction
impl SDK {
    /// Installs a smart contract with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///
    /// * `transaction_params` - Transaction parameters.
    /// * `transaction_bytes` - Transaction Bytes to install
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_PutTransactionResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the installation.
    pub async fn install(
        &self,
        transaction_params: TransactionStrParams,
        transaction_bytes: Bytes,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutTransactionResult>, SdkError> {
        //log("install!");
        let builder_params = TransactionBuilderParams::new_session(
            Some(transaction_bytes),
            Some(TransactionCategory::InstallUpgrade),
        );
        self.transaction(builder_params, transaction_params, None, node_address)
            .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use once_cell::sync::Lazy;
    use sdk_tests::{
        config::{ARGS_SIMPLE, HELLO_CONTRACT, PAYMENT_AMOUNT, WASM_PATH},
        tests::helpers::{get_network_constants, get_user_secret_key, read_wasm_file},
    };
    use tokio;

    static ARGS: Lazy<Vec<String>> =
        Lazy::new(|| ARGS_SIMPLE.iter().map(|s| s.to_string()).collect());

    #[tokio::test]
    async fn test_install_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let transaction_params = TransactionStrParams::default();
        let transaction_bytes = Bytes::default();

        let error_message =
            "transaction requires account - use `with_account` or `with_secret_key`";

        // Act
        let result = sdk
            .install(transaction_params, transaction_bytes, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_install_with_valid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let transaction_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };

        // Act
        let result = sdk
            .install(
                transaction_params,
                transaction_bytes.into(),
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
        let transaction_hash = result.unwrap().result.transaction_hash;
        assert!(!transaction_hash.to_string().is_empty());
    }

    #[tokio::test]
    async fn test_install_with_invalid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, _) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let error_message = "The transaction sent to the network had an invalid chain name";

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name("test");
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let transaction_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };

        // Act
        let result = sdk
            .install(
                transaction_params,
                transaction_bytes.into(),
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_install_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let error_message = "the transaction was invalid: invalid associated keys";

        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_session_args_simple(ARGS.to_vec());

        let transaction_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };

        // Act
        let result = sdk
            .install(
                transaction_params,
                transaction_bytes.into(),
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_install_with_error() {
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

        let transaction_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };
        // Act
        let result = sdk
            .install(transaction_params, transaction_bytes.into(), None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
