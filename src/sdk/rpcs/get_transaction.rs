#[cfg(target_arch = "wasm32")]
use crate::types::transaction::Transaction;
use crate::types::transaction_hash::TransactionHash;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_transaction, rpcs::results::GetTransactionResult as _GetTransactionResult, Error,
    JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetTransactionResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetTransactionResult(_GetTransactionResult);

#[cfg(target_arch = "wasm32")]
impl From<GetTransactionResult> for _GetTransactionResult {
    fn from(result: GetTransactionResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetTransactionResult> for GetTransactionResult {
    fn from(result: _GetTransactionResult) -> Self {
        GetTransactionResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetTransactionResult {
    #[wasm_bindgen(getter)]
    /// Gets the API version as a JavaScript value.
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    /// Gets the transaction information.
    pub fn transaction(&self) -> Transaction {
        self.0.transaction.clone().into()
    }

    #[wasm_bindgen(getter)]
    /// Gets the execution info as a JavaScript value.
    pub fn execution_info(&self) -> JsValue {
        JsValue::from_serde(&self.0.execution_info).unwrap()
    }

    #[wasm_bindgen(js_name = "toJson")]
    /// Converts the result to a JSON JavaScript value.
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_transaction` method.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getTransactionOptions", getter_with_clone)]
pub struct GetTransactionOptions {
    pub transaction_hash_as_string: Option<String>,
    pub transaction_hash: Option<TransactionHash>,
    pub finalized_approvals: Option<bool>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[wasm_bindgen]
impl SDK {
    /// Parses transaction options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing transaction options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed transaction options as a `GetTransactionOptions` struct.
    #[cfg(target_arch = "wasm32")]
    pub fn get_transaction_options(
        &self,
        options: JsValue,
    ) -> Result<GetTransactionOptions, JsError> {
        let options_result: Result<GetTransactionOptions, _> = options.into_serde();
        match options_result {
            Ok(mut options) => {
                if let Some(finalized_approvals) = options.finalized_approvals {
                    options.finalized_approvals =
                        Some(JsValue::from_bool(finalized_approvals) == JsValue::TRUE);
                }
                Ok(options)
            }
            Err(err) => Err(JsError::new(&format!(
                "Error deserializing options: {:?}",
                err
            ))),
        }
    }

    /// Retrieves transaction information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetTransactionOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetTransactionResult` or an error.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "get_transaction")]
    pub async fn get_transaction_js_alias(
        &self,
        options: Option<GetTransactionOptions>,
    ) -> Result<GetTransactionResult, JsError> {
        let GetTransactionOptions {
            transaction_hash_as_string,
            transaction_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let transaction_hash = if let Some(transaction_hash_as_string) = transaction_hash_as_string
        {
            TransactionHash::new(&transaction_hash_as_string)?
        } else {
            if transaction_hash.is_none() {
                let err_msg =
                    "Error: Missing transaction hash as string or transaction hash".to_string();
                return Err(JsError::new(&err_msg));
            }
            transaction_hash.unwrap()
        };

        let result = self
            .get_transaction(
                transaction_hash,
                finalized_approvals,
                verbosity,
                rpc_address,
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

    /// Retrieves transaction information using the provided options, alias for `get_transaction`.
    #[cfg(target_arch = "wasm32")]
    #[deprecated(note = "This function is an alias. Please use `get_transaction` instead.")]
    #[allow(deprecated)]
    pub async fn info_get_transaction(
        &self,
        options: Option<GetTransactionOptions>,
    ) -> Result<GetTransactionResult, JsError> {
        self.get_transaction_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves transaction information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `transaction_hash` - The transaction hash.
    /// * `finalized_approvals` - An optional boolean indicating finalized approvals.
    /// * `verbosity` - An optional verbosity level.
    /// * `rpc_address` - An optional rpc address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetTransactionResult` or an error.
    pub async fn get_transaction(
        &self,
        transaction_hash: TransactionHash,
        finalized_approvals: Option<bool>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetTransactionResult>, Error> {
        //log("get_transaction!");
        get_transaction(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_rpc_address(rpc_address),
            self.get_verbosity(verbosity).into(),
            transaction_hash.into(),
            finalized_approvals.unwrap_or_default(),
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

    #[tokio::test]
    async fn test_get_transaction_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let transaction_hash = TransactionHash::from_raw(&[1u8; 32]).unwrap();
        let error_message = "builder error";

        // Act
        let result = sdk
            .get_transaction(transaction_hash, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_transaction_with_invalid_transaction_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let transaction_hash = TransactionHash::from_raw(&[1u8; 32]).unwrap();
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_transaction(transaction_hash, None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_get_transaction_with_valid_transaction_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        let transfer = sdk
            .transfer_transaction(
                None,
                &initiator_addr, // self transfer
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(rpc_address.clone()),
            )
            .await
            .unwrap();
        let transaction_hash = transfer.result.transaction_hash;
        assert!(!transaction_hash.to_string().is_empty());

        // Act
        let result = sdk
            .get_transaction(transaction_hash.into(), None, verbosity, Some(rpc_address))
            .await;

        // Assert
        // dbg!(result);
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_transaction_with_finalized_approvals() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        let transfer = sdk
            .transfer_transaction(
                None,
                &initiator_addr, // self transfer
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                verbosity,
                Some(rpc_address.clone()),
            )
            .await
            .unwrap();
        let transaction_hash = transfer.result.transaction_hash;
        assert!(!transaction_hash.to_string().is_empty());
        let finalized_approvals = true;

        // Act
        let result = sdk
            .get_transaction(
                transaction_hash.into(),
                Some(finalized_approvals),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_transaction_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let transaction_hash = TransactionHash::from_raw(&[1u8; 32]).unwrap();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .get_transaction(transaction_hash, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
