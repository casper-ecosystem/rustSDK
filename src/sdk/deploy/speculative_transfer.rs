#[cfg(target_arch = "wasm32")]
use crate::rpcs::speculative_exec_deploy::SpeculativeExecResult;
use crate::{
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::deploy::make_transfer, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "speculative_transfer")]
    #[allow(clippy::too_many_arguments, deprecated)]
    #[deprecated(note = "prefer speculative_transfer_transaction")]
    pub async fn speculative_transfer_js_alias(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SpeculativeExecResult, JsError> {
        let result = self
            .speculative_transfer(
                amount,
                target_account,
                transfer_id,
                deploy_params,
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
    /// Perform a speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result a `SuccessResponse<_SpeculativeExecResult>` or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments, deprecated)]
    #[deprecated(note = "prefer speculative_transfer_transaction")]
    pub async fn speculative_transfer(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_SpeculativeExecResult>, SdkError> {
        // log("speculative_transfer!");
        let transfer_id = if let Some(transfer_id) = transfer_id {
            transfer_id
        } else {
            rand::thread_rng().gen::<u64>().to_string()
        };
        let deploy = make_transfer(
            "",
            amount,
            target_account,
            &transfer_id,
            deploy_str_params_to_casper_client(&deploy_params),
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
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    #[ignore]
    async fn _test_speculative_transfer_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_speculative_transfer_with_valid_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(default_speculative_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_speculative_transfer_with_invalid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (_, _, default_speculative_address, _, chain_name) = get_network_constants();

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]";
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
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
