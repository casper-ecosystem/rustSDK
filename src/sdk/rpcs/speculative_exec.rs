#[cfg(target_arch = "wasm32")]
use crate::types::block_hash::BlockHash;
use crate::types::transaction::Transaction;
use crate::{
    types::{sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecTxnResult as _SpeculativeExecTxnResult,
    speculative_exec_txn as speculative_exec_lib, JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the result of a speculative execution.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct SpeculativeExecTxnResult(_SpeculativeExecTxnResult);

#[cfg(target_arch = "wasm32")]
impl From<SpeculativeExecTxnResult> for _SpeculativeExecTxnResult {
    fn from(result: SpeculativeExecTxnResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_SpeculativeExecTxnResult> for SpeculativeExecTxnResult {
    fn from(result: _SpeculativeExecTxnResult) -> Self {
        SpeculativeExecTxnResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SpeculativeExecTxnResult {
    /// Get the API version of the result.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Get the block hash.
    #[wasm_bindgen(getter)]
    pub fn block_hash(&self) -> BlockHash {
        self.0.execution_result.block_hash.into()
    }

    /// Get the execution result.
    #[wasm_bindgen(getter)]
    pub fn execution_result(&self) -> JsValue {
        JsValue::from_serde(&self.0.execution_result).unwrap()
    }

    /// Convert the result to JSON format.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for speculative execution.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getSpeculativeExecTxnOptions", getter_with_clone)]
pub struct GetSpeculativeExecTxnOptions {
    /// The transaction as a JSON string.
    pub transaction_as_string: Option<String>,

    /// The transaction to execute.
    pub transaction: Option<Transaction>,

    /// The node address.
    pub node_address: Option<String>,

    /// The verbosity level for logging.
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Get options for speculative execution from a JavaScript value.
    pub fn get_speculative_exec_options(
        &self,
        options: JsValue,
    ) -> Result<GetSpeculativeExecTxnOptions, JsError> {
        options
            .into_serde::<GetSpeculativeExecTxnOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// JS function for speculative execution.
    ///
    /// # Arguments
    ///
    /// * `options` - The options for speculative execution.
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "speculative_exec")]
    pub async fn speculative_exec_js_alias(
        &self,
        options: Option<GetSpeculativeExecTxnOptions>,
    ) -> Result<SpeculativeExecTxnResult, JsError> {
        let GetSpeculativeExecTxnOptions {
            transaction_as_string,
            transaction,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let transaction = if let Some(transaction_as_string) = transaction_as_string {
            Transaction::new(transaction_as_string.into())
        } else if let Some(transaction) = transaction {
            transaction
        } else {
            let err = "Error: Missing transaction as json or transaction".to_string();
            return Err(JsError::new(&err));
        };

        let result = self
            .speculative_exec(transaction, verbosity, node_address)
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
    /// Perform speculative execution.
    ///
    /// # Arguments
    ///
    /// * `transaction` - The transaction to execute.
    /// * `verbosity` - The verbosity level for logging.
    /// * `node_address` - The address of the node to connect to.
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of _SpeculativeExecTxnResult or a `SdkError` in case of an error.
    pub async fn speculative_exec(
        &self,
        transaction: Transaction,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecTxnResult>, SdkError> {
        //log("speculative_exec!");

        speculative_exec_lib(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            transaction.into(),
        )
        .await
        .map_err(SdkError::from)
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
    use tokio;

    fn get_transaction() -> Transaction {
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();
        let (_, _, _, chain_name) = get_network_constants();

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
    async fn test_speculative_exec_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let transaction = get_transaction();
        let error_message = "builder error";

        // Act
        let result = sdk.speculative_exec(transaction, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_exec() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _) = get_network_constants();
        let transaction = get_transaction();

        // Act
        let result = sdk
            .speculative_exec(transaction, verbosity, Some(default_speculative_address))
            .await;

        // Assert
        // dbg!(result);
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_exec_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let transaction = get_transaction();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.speculative_exec(transaction, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
