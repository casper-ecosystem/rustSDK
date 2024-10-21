#[cfg(target_arch = "wasm32")]
use crate::types::deploy_hash::DeployHash;
use crate::{
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::deploy::make_deploy, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the result of a deploy.
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct PutDeployResult(_PutDeployResult);

/// Implement conversions between PutDeployResult and _PutDeployResult.
#[cfg(target_arch = "wasm32")]
impl From<PutDeployResult> for _PutDeployResult {
    fn from(result: PutDeployResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_PutDeployResult> for PutDeployResult {
    fn from(result: _PutDeployResult) -> Self {
        PutDeployResult(result)
    }
}

/// Implement JavaScript bindings for PutDeployResult.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl PutDeployResult {
    /// Gets the API version as a JavaScript value.
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    /// Gets the deploy hash associated with this result.
    #[wasm_bindgen(getter)]
    pub fn deploy_hash(&self) -> DeployHash {
        self.0.deploy_hash.into()
    }

    /// Converts PutDeployResult to a JavaScript object.
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JavaScript function for deploying with deserialized parameters.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - Deploy parameters.
    /// * `session_params` - Session parameters.
    /// * `payment_params` - Payment parameters.
    /// * `verbosity` - An optional verbosity level.
    /// * `rpc_address` - An optional rpc address.
    ///
    /// # Returns
    ///
    /// A result containing PutDeployResult or a JsError.
    #[wasm_bindgen(js_name = "deploy")]
    pub async fn deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .deploy(
                deploy_params,
                session_params,
                payment_params,
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
}

impl SDK {
    /// Perform a deploy operation.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - Deploy parameters.
    /// * `session_params` - Session parameters.
    /// * `payment_params` - Payment parameters.
    /// * `verbosity` - An optional verbosity level.
    /// * `rpc_address` - An optional rpc address.
    ///
    /// # Returns
    ///
    /// A result containing a `SuccessResponse<_PutDeployResult>` or an SdkError.
    pub async fn deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("deploy!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        );

        if let Err(err) = deploy {
            return Err(SdkError::from(err));
        }

        // Send the deploy to the network and handle any errors.
        self.put_deploy(deploy.unwrap().into(), verbosity, rpc_address)
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
        tests::helpers::{get_network_constants, get_user_secret_key, read_wasm_file},
    };
    use std::sync::Mutex;

    static SESSION_PARAMS: Lazy<Mutex<Option<SessionStrParams>>> = Lazy::new(|| Mutex::new(None));

    fn get_session_params() -> SessionStrParams {
        let mut session_params = SESSION_PARAMS.lock().unwrap();

        if session_params.is_none() {
            let mut new_session_params = SessionStrParams::default();
            let file_path = &format!("{WASM_PATH}{HELLO_CONTRACT}");
            let module_bytes = match read_wasm_file(file_path) {
                Ok(module_bytes) => module_bytes,
                Err(err) => {
                    eprintln!("Error reading file: {:?}", err);
                    unimplemented!()
                }
            };
            new_session_params.set_session_bytes(module_bytes.into());
            let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
            new_session_params.set_session_args(args_simple);
            *session_params = Some(new_session_params);
        }

        session_params.clone().unwrap()
    }

    #[tokio::test]
    async fn test_deploy_with_valid_deploy_params() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_deploy_with_valid_deploy_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let error_message = "Invalid Deploy";

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_deploy_with_invalid_deploy_params() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, chain_name) = get_network_constants();

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]";
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                verbosity,
                Some(rpc_address),
            )
            .await;
        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
