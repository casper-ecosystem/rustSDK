#[cfg(target_arch = "wasm32")]
use crate::debug::error;
#[cfg(target_arch = "wasm32")]
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
use casper_client::cli::make_deploy as client_make_deploy;
use casper_client::types::Deploy as _Deploy;
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
            Ok(data) => Ok(data.into()),
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
    ) -> Result<_Deploy, SdkError> {
        make_deploy(deploy_params, session_params, payment_params).map_err(SdkError::from)
    }
}

/// Internal function to create a deploy.
pub(crate) fn make_deploy(
    deploy_params: DeployStrParams,
    session_params: SessionStrParams,
    payment_params: PaymentStrParams,
) -> Result<_Deploy, SdkError> {
    // log("make_deploy");
    client_make_deploy(
        "",
        deploy_str_params_to_casper_client(&deploy_params),
        session_str_params_to_casper_client(&session_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
    .map_err(SdkError::from)
}
