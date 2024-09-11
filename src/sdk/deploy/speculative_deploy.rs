#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec_deploy::SpeculativeExecResult;
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
    cli::deploy::make_deploy, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// This function allows executing a deploy speculatively.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - Deployment parameters for the deploy.
    /// * `session_params` - Session parameters for the deploy.
    /// * `payment_params` - Payment parameters for the deploy.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "speculative_deploy")]
    #[allow(clippy::too_many_arguments, deprecated)]
    #[deprecated(note = "prefer speculative_transaction")]
    pub async fn speculative_deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let result = self
            .speculative_deploy(
                deploy_params,
                session_params,
                payment_params,
                verbosity,
                node_address,
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
    /// This function allows executing a deploy speculatively.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - Deployment parameters for the deploy.
    /// * `session_params` - Session parameters for the deploy.
    /// * `payment_params` - Payment parameters for the deploy.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_SpeculativeExecResult>` or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments, deprecated)]
    #[deprecated(note = "prefer speculative_transaction")]
    pub async fn speculative_deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        // log("speculative_deploy!");
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

        self.speculative_exec_deploy(deploy.unwrap().into(), verbosity, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::{
        config::{ARGS_SIMPLE, HELLO_CONTRACT, PAYMENT_AMOUNT, WASM_PATH},
        tests::helpers::{get_network_constants, get_user_secret_key, read_wasm_file},
    };

    fn get_session_params() -> &'static SessionStrParams {
        static mut SESSION_PARAMS: Option<SessionStrParams> = None;

        unsafe {
            if SESSION_PARAMS.is_none() {
                let mut session_params = SessionStrParams::default();
                let file_path = &format!("{WASM_PATH}{HELLO_CONTRACT}");
                let module_bytes = match read_wasm_file(file_path) {
                    Ok(module_bytes) => module_bytes,
                    Err(err) => {
                        eprintln!("Error reading file: {:?}", err);
                        unimplemented!()
                    }
                };
                session_params.set_session_bytes(module_bytes.into());
                let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
                session_params.set_session_args(args_simple);
                SESSION_PARAMS = Some(session_params);
            }
            SESSION_PARAMS.as_ref().unwrap()
        }
    }

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_deploy_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_deploy_with_valid_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let deploy_params = DeployStrParams::new(&chain_name, "", None, None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_speculative_deploy_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, _) = get_network_constants();

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]";

        let deploy_params = DeployStrParams::default();
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
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
