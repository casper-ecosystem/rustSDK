#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::types::deploy::Deploy;
use crate::{
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        sdk_error::SdkError,
    },
    SDK,
};
use casper_client::cli::deploy::make_deploy as client_make_deploy;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `make_deploy` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS Alias for `make_deploy`.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - The deploy parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Deploy` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "make_deploy")]
    pub fn make_deploy_js_alias(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, JsError> {
        let result = make_deploy(deploy_params, session_params, payment_params);
        match result {
            Ok(data) => Ok(data),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }
}

impl SDK {
    /// Creates a deploy using the provided parameters.
    ///
    /// # Arguments
    ///
    /// * `deploy_params` - The deploy parameters.
    /// * `session_params` - The session parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Deploy` or a `SdkError` in case of an error.
    pub fn make_deploy(
        &self,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, SdkError> {
        make_deploy(deploy_params, session_params, payment_params).map_err(SdkError::from)
    }
}

/// Internal function to create a deploy.
pub(crate) fn make_deploy(
    deploy_params: DeployStrParams,
    session_params: SessionStrParams,
    payment_params: PaymentStrParams,
) -> Result<Deploy, SdkError> {
    // log("make_deploy");
    client_make_deploy(
        "",
        deploy_str_params_to_casper_client(&deploy_params),
        session_str_params_to_casper_client(&session_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
    .map(Into::into)
    .map_err(SdkError::from)
}

#[cfg(test)]
mod tests {

    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::{
        config::PAYMENT_AMOUNT,
        tests::helpers::{get_network_constants, get_user_private_key},
    };

    #[tokio::test]
    async fn test_make_deploy_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(private_key), None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point("test");
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk.make_deploy(deploy_params, session_params, payment_params);

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_deploy_with_valid_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, chain_name) = get_network_constants();
        let private_key = get_user_private_key(None).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point("test");
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let result = sdk.make_deploy(deploy_params, session_params, payment_params);

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_deploy_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, chain_name) = get_network_constants();
        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]";
        let private_key = get_user_private_key(None).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(private_key), None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point("test");
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk.make_deploy(deploy_params, session_params, payment_params);

        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
