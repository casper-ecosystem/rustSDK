#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec::SpeculativeExecResult;
#[cfg(target_arch = "wasm32")]
use crate::types::block_identifier::BlockIdentifier;
use crate::{
    debug::error,
    types::{
        block_identifier::BlockIdentifierInput,
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
    cli::make_deploy, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
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
    /// * `maybe_block_id_as_string` - An optional block ID as a string.
    /// * `maybe_block_identifier` - Optional block identifier.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "speculative_deploy")]
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        maybe_block_id_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifier>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };
        let result = self
            .speculative_deploy(
                deploy_params,
                session_params,
                payment_params,
                maybe_block_identifier,
                verbosity,
                node_address,
            )
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
    /// This function allows executing a deploy speculatively.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - Deployment parameters for the deploy.
    /// * `session_params` - Session parameters for the deploy.
    /// * `payment_params` - Payment parameters for the deploy.
    /// * `maybe_block_identifier` - Optional block identifier.
    /// * `verbosity` - Optional verbosity level.
    /// * `node_address` - Optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<SpeculativeExecResult>` or a `SdkError` in case of an error.
    pub async fn speculative_deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifierInput>,
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
            let err_msg = format!("Error during speculative_deploy: {}", err);
            error(&err_msg);
            return Err(SdkError::from(err));
        }

        self.speculative_exec(
            deploy.unwrap().into(),
            maybe_block_identifier,
            verbosity,
            node_address,
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
        rpcs::{PRIVATE_KEY_NCTL_PATH, WASM_PATH},
        types::block_identifier::BlockIdentifier,
    };
    use sdk_tests::{
        config::{
            ARGS_SIMPLE, CHAIN_NAME, DEFAULT_NODE_ADDRESS, HELLO_CONTRACT, PAYMENT_AMOUNT,
            PRIVATE_KEY_NAME,
        },
        tests::helpers::{read_pem_file, read_wasm_file},
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

    // TODO speculative_exec not available in 1.6
    // #[tokio::test]
    async fn _test_speculative_deploy_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(CHAIN_NAME, &account, Some(private_key), None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                None,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    // TODO speculative_exec not available in 1.6
    // #[tokio::test]
    async fn _test_speculative_deploy_with_block_identifier() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(CHAIN_NAME, &account, Some(private_key), None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                Some(block_identifier),
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_deploy_with_valid_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let deploy_params = DeployStrParams::new(CHAIN_NAME, "", None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                None,
                verbosity,
                node_address,
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
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]".to_string();

        let deploy_params = DeployStrParams::default();
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .speculative_deploy(
                deploy_params,
                get_session_params().clone(),
                payment_params,
                None,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }
}
