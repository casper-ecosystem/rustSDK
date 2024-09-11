#[cfg(target_arch = "wasm32")]
use crate::deploy::deploy::PutDeployResult;
use crate::types::deploy_params::{
    deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
    payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
    session_str_params::{session_str_params_to_casper_client, SessionStrParams},
};
use crate::{types::sdk_error::SdkError, SDK};
use casper_client::{
    cli::deploy::make_deploy, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// A set of functions for working with smart contract entry points.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Calls a smart contract entry point with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - The deploy parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_amount` - The payment amount as a string.
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the call.
    #[wasm_bindgen(js_name = "call_entrypoint_deploy")]
    #[deprecated(note = "prefer 'call_entrypoint' with transaction")]
    #[allow(deprecated)]
    pub async fn call_entrypoint_deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_amount: &str,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(payment_amount);

        let result = self
            .call_entrypoint_deploy(deploy_params, session_params, payment_params, node_address)
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

/// A set of functions for working with smart contract entry points.
/// Alias of sdk.deploy
impl SDK {
    /// Calls a smart contract entry point with the specified parameters and returns the result.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - The deploy parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_params` - The payment parameters.
    /// * `node_address` - An optional node address to send the request to.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_PutDeployResult` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the call.
    #[deprecated(note = "prefer 'call_entrypoint' with transaction")]
    #[allow(deprecated)]
    pub async fn call_entrypoint_deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("call_entrypoint_deploy!");
        let deploy = make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        )?;

        self.put_deploy(deploy.into(), None, node_address)
            .await
            .map_err(SdkError::from)
    }
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use super::*;
    use crate::{helpers::public_key_from_secret_key, install_cep78};
    use sdk_tests::{
        config::{ARGS_SIMPLE, ENTRYPOINT_MINT, PAYMENT_AMOUNT, TTL},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };
    use tokio;

    async fn get_contract_hash() -> String {
        install_cep78().await
    }

    #[tokio::test]
    async fn test_call_entrypoint_deploy_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let deploy_params = DeployStrParams::new("", "", None, None, None, None);
        let session_params = SessionStrParams::default();
        let payment_params = PaymentStrParams::default();

        let error_message =
            "Invalid argument 'is_session_transfer': requires --session-arg to be present";

        // Act
        let result = sdk
            .call_entrypoint_deploy(deploy_params, session_params, payment_params, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_deploy_with_valid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        let mut session_params = SessionStrParams::default();
        session_params
            .set_session_hash(&(&get_contract_hash().await).replace("entity-contract", "hash"));
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);

        // Act
        let result = sdk
            .call_entrypoint_deploy(
                deploy_params,
                session_params,
                payment_params,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
        let deploy_hash = result.unwrap().result.deploy_hash;
        assert!(!deploy_hash.to_string().is_empty());
    }

    #[tokio::test]
    async fn test_call_entrypoint_deploy_with_invalid_input() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let error_message =
            "Missing a required arg - exactly one of the following must be provided";

        let deploy_params = DeployStrParams::new(
            &chain_name,
            &account,
            Some(secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        let mut session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);

        // Act
        let result = sdk
            .call_entrypoint_deploy(
                deploy_params,
                session_params,
                payment_params,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_deploy_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (node_address, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let error_message = "the deploy was invalid: invalid associated keys";

        let deploy_params = DeployStrParams::new(
            &chain_name,
            &account,
            None,
            None,
            Some(TTL.to_string()),
            None,
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        let mut session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);

        // Act
        let result = sdk
            .call_entrypoint_deploy(
                deploy_params,
                session_params,
                payment_params,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_call_entrypoint_deploy_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(
            &chain_name,
            &account,
            Some(secret_key.clone()),
            None,
            None,
            None,
        );

        let error_message = "error sending request for url (http://localhost/rpc)";

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        let mut session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);

        // Act
        let result = sdk
            .call_entrypoint_deploy(deploy_params, session_params, payment_params, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
