#[cfg(target_arch = "wasm32")]
use crate::types::block_hash::BlockHash;
use crate::types::deploy::Deploy;
use crate::{
    types::{sdk_error::SdkError, verbosity::Verbosity},
    SDK,
};
use casper_client::{
    rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    speculative_exec as speculative_exec_deploy_lib, JsonRpcId, SuccessResponse,
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
pub struct SpeculativeExecResult(_SpeculativeExecResult);

#[cfg(target_arch = "wasm32")]
impl From<SpeculativeExecResult> for _SpeculativeExecResult {
    fn from(result: SpeculativeExecResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_SpeculativeExecResult> for SpeculativeExecResult {
    fn from(result: _SpeculativeExecResult) -> Self {
        SpeculativeExecResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SpeculativeExecResult {
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
#[wasm_bindgen(js_name = "getSpeculativeExecDeployOptions", getter_with_clone)]
pub struct GetSpeculativeExecDeployOptions {
    /// The deploy as a JSON string.
    pub deploy_as_string: Option<String>,

    /// The deploy to execute.
    pub deploy: Option<Deploy>,

    /// The node address.
    pub node_address: Option<String>,

    /// The verbosity level for logging.
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Get options for speculative execution from a JavaScript value.
    #[deprecated(note = "prefer speculative_exec_transaction_options")]
    #[allow(deprecated)]
    pub fn get_speculative_exec_deploy_options(
        &self,
        options: JsValue,
    ) -> Result<GetSpeculativeExecDeployOptions, JsError> {
        options
            .into_serde::<GetSpeculativeExecDeployOptions>()
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
    #[deprecated(note = "prefer speculative_exec_transaction")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "speculative_exec_deploy")]
    pub async fn speculative_exec_deploy_js_alias(
        &self,
        options: Option<GetSpeculativeExecDeployOptions>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let GetSpeculativeExecDeployOptions {
            deploy_as_string,
            deploy,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let deploy = if let Some(deploy_as_string) = deploy_as_string {
            Deploy::new(deploy_as_string.into())
        } else if let Some(deploy) = deploy {
            deploy
        } else {
            let err = "Error: Missing deploy as json or deploy".to_string();
            return Err(JsError::new(&err));
        };

        let result = self
            .speculative_exec_deploy(deploy, verbosity, node_address)
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
    /// * `deploy` - The deploy to execute.
    /// * `verbosity` - The verbosity level for logging.
    /// * `node_address` - The address of the node to connect to.
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of _SpeculativeExecResult or a `SdkError` in case of an error.
    #[deprecated(note = "prefer speculative_exec_transaction")]
    #[allow(deprecated)]
    pub async fn speculative_exec_deploy(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        //log("speculative_exec_deploy!");

        speculative_exec_deploy_lib(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            deploy.into(),
        )
        .await
        .map_err(SdkError::from)
    }
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        },
    };
    use sdk_tests::{
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };
    use tokio;

    fn get_deploy() -> Deploy {
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let (_, _, _, _, chain_name) = get_network_constants();
        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &account, // self transfer
            None,
            deploy_params,
            payment_params,
        )
        .unwrap()
    }

    #[tokio::test]
    async fn test_speculative_exec_deploy_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let deploy = get_deploy();
        let error_message = "builder error";

        // Act
        let result = sdk.speculative_exec_deploy(deploy, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_exec_deploy() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, _) = get_network_constants();
        let deploy = get_deploy();
        // Act
        let result = sdk
            .speculative_exec_deploy(deploy, verbosity, Some(default_speculative_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_exec_deploy_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let deploy = get_deploy();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.speculative_exec_deploy(deploy, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
