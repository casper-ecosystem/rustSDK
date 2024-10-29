#[cfg(target_arch = "wasm32")]
use crate::types::deploy::Deploy;
use crate::types::hash::deploy_hash::DeployHash;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult as _GetDeployResult, Error, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetDeployResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetDeployResult(_GetDeployResult);

#[cfg(target_arch = "wasm32")]
impl From<GetDeployResult> for _GetDeployResult {
    fn from(result: GetDeployResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetDeployResult> for GetDeployResult {
    fn from(result: _GetDeployResult) -> Self {
        GetDeployResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetDeployResult {
    #[wasm_bindgen(getter)]
    /// Gets the API version as a JavaScript value.
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    /// Gets the deploy information.
    pub fn deploy(&self) -> Deploy {
        self.0.deploy.clone().into()
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

/// Options for the `get_deploy` method.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDeployOptions", getter_with_clone)]
pub struct GetDeployOptions {
    pub deploy_hash_as_string: Option<String>,
    pub deploy_hash: Option<DeployHash>,
    pub finalized_approvals: Option<bool>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses deploy options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing deploy options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed deploy options as a `GetDeployOptions` struct.
    #[deprecated(note = "prefer 'get_transaction_options'")]
    #[allow(deprecated)]
    pub fn get_deploy_options(&self, options: JsValue) -> Result<GetDeployOptions, JsError> {
        let mut options: GetDeployOptions = options.into_serde()?;

        // Handle finalized_approvals
        if let Some(finalized_approvals) = options.finalized_approvals {
            options.finalized_approvals =
                Some(JsValue::from_bool(finalized_approvals) == JsValue::TRUE);
        }

        Ok(options)
    }

    /// Retrieves deploy information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetDeployOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetDeployResult` or an error.
    #[deprecated(note = "prefer 'get_transaction'")]
    #[allow(deprecated)]
    #[wasm_bindgen(js_name = "get_deploy")]
    pub async fn get_deploy_js_alias(
        &self,
        options: Option<GetDeployOptions>,
    ) -> Result<GetDeployResult, JsError> {
        let GetDeployOptions {
            deploy_hash_as_string,
            deploy_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let err_msg = "Error: Missing deploy hash as string or deploy hash".to_string();
        let deploy_hash = if let Some(deploy_hash_as_string) = deploy_hash_as_string {
            DeployHash::new(&deploy_hash_as_string)?
        } else {
            if deploy_hash.is_none() {
                return Err(JsError::new(&err_msg));
            }
            deploy_hash.unwrap()
        };

        let result = self
            .get_deploy(deploy_hash, finalized_approvals, verbosity, rpc_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// Retrieves deploy information using the provided options, alias for `get_deploy`.
    #[deprecated(note = "This function is an alias. Please use `get_transaction` instead.")]
    #[allow(deprecated)]
    pub async fn info_get_deploy(
        &self,
        options: Option<GetDeployOptions>,
    ) -> Result<GetDeployResult, JsError> {
        self.get_deploy_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves deploy information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - The deploy hash.
    /// * `finalized_approvals` - An optional boolean indicating finalized approvals.
    /// * `verbosity` - An optional verbosity level.
    /// * `rpc_address` - An optional rpc address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_GetDeployResult` or an error.
    #[deprecated(note = "prefer 'get_transaction'")]
    #[allow(deprecated)]
    pub async fn get_deploy(
        &self,
        deploy_hash: DeployHash,
        finalized_approvals: Option<bool>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDeployResult>, Error> {
        //log("get_deploy!");
        get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_rpc_address(rpc_address),
            self.get_verbosity(verbosity).into(),
            deploy_hash.into(),
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
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        },
    };
    use sdk_tests::{
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_deploy_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let deploy_hash = DeployHash::from_digest([1u8; 32].into()).unwrap();
        let error_message = "builder error";

        // Act
        let result = sdk.get_deploy(deploy_hash, None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_deploy_with_invalid_deploy_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let deploy_hash = DeployHash::from_digest([1u8; 32].into()).unwrap();
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_deploy(deploy_hash, None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_deploy_with_valid_deploy_hash() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let make_transfer = sdk
            .transfer(
                TRANSFER_AMOUNT,
                &account, // self transfer
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(rpc_address.clone()),
            )
            .await
            .unwrap();
        let deploy_hash = make_transfer.result.deploy_hash;
        assert!(!deploy_hash.to_string().is_empty());

        // Act
        let result = sdk
            .get_deploy(deploy_hash.into(), None, verbosity, Some(rpc_address))
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_deploy_with_finalized_approvals() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let make_transfer = sdk
            .transfer(
                TRANSFER_AMOUNT,
                &account, // self transfer
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(rpc_address.clone()),
            )
            .await
            .unwrap();
        let deploy_hash = make_transfer.result.deploy_hash;
        assert!(!deploy_hash.to_string().is_empty());
        let finalized_approvals = true;

        // Act
        let result = sdk
            .get_deploy(
                deploy_hash.into(),
                Some(finalized_approvals),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_get_deploy_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let deploy_hash = DeployHash::from_digest([1u8; 32].into()).unwrap();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk.get_deploy(deploy_hash, None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
