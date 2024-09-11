#[cfg(target_arch = "wasm32")]
use crate::transaction::transaction::PutTransactionResult;
use crate::{
    types::{transaction::Transaction, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    put_transaction, rpcs::results::PutTransactionResult as _PutTransactionResult, Error,
    JsonRpcId, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// SDK methods for putting a transaction.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Puts a transaction using the provided options.
    ///
    /// # Arguments
    ///
    /// * `transaction` - The `Transaction` object to be sent.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `PutTransactionResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the transaction process.
    #[wasm_bindgen(js_name = "put_transaction")]
    pub async fn put_transaction_js_alias(
        &self,
        transaction: Transaction,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        let result = self
            .put_transaction(transaction, verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// JavaScript Alias for `put_transaction`.
    #[deprecated(note = "This function is an alias. Please use `put_transaction` instead.")]
    #[allow(deprecated)]
    pub async fn account_put_transaction(
        &self,
        transaction: Transaction,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutTransactionResult, JsError> {
        self.put_transaction_js_alias(transaction, verbosity, node_address)
            .await
    }
}

impl SDK {
    /// Puts a transaction based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `transaction` - The `Transaction` object to be sent.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_PutTransactionResult` or an `Error` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns an `Error` if there is an error during the transaction process.
    pub async fn put_transaction(
        &self,
        transaction: Transaction,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutTransactionResult>, Error> {
        //log("account_put_transaction!");
        put_transaction(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            transaction.into(),
        )
        .await
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::transaction_params::transaction_str_params::TransactionStrParams,
    };
    use sdk_tests::{
        config::TRANSFER_AMOUNT,
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    fn get_transaction() -> Transaction {
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();
        let (_, _, _, _, chain_name) = get_network_constants();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        Transaction::new_transfer(
            None,
            &initiator_addr, // self transfer
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap()
    }

    #[tokio::test]
    async fn test_put_transaction_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";
        let transaction = get_transaction();

        // Act
        let result = sdk.put_transaction(transaction, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_put_transaction() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();
        let transaction = get_transaction();

        // Act
        let result = sdk
            .put_transaction(transaction, verbosity, Some(node_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_put_transaction_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let error_message = "error sending request for url (http://localhost/rpc)";
        let transaction = get_transaction();

        // Act
        let result = sdk.put_transaction(transaction, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
