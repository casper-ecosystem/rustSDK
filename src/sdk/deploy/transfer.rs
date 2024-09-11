#[cfg(target_arch = "wasm32")]
use super::deploy::PutDeployResult;
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
    cli::deploy::make_transfer, rpcs::results::PutDeployResult as _PutDeployResult, SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for transferring funds.
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
    /// A `Result` containing the result of the transfer or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "transfer")]
    #[deprecated(note = "prefer transfer_transaction")]
    #[allow(clippy::too_many_arguments, deprecated)]
    pub async fn transfer_js_alias(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self
            .transfer(
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
    /// Perform a transfer of funds.
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
    /// A `Result` containing the result a `SuccessResponse<_PutDeployResult>` of the transfer or a `SdkError` in case of an error.
    #[deprecated(note = "prefer transfer_transaction")]
    #[allow(clippy::too_many_arguments, deprecated)]
    pub async fn transfer(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, SdkError> {
        //log("transfer!");
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

        self.put_deploy(deploy.unwrap().into(), verbosity, node_address)
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
    async fn test_transfer_with_valid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_transfer_with_valid_transfer_params_without_secret_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, chain_name) = get_network_constants();

        let error_message = "Invalid Deploy";

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(node_address),
            )
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_transfer_with_invalid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, chain_name) = get_network_constants();

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]";
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk
            .transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                verbosity,
                Some(node_address),
            )
            .await;
        // Assert
        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
