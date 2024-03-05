#[cfg(target_arch = "wasm32")]
use crate::debug::error;
use crate::types::deploy::Deploy;
use crate::{
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
        },
        sdk_error::SdkError,
    },
    SDK,
};
use casper_client::cli::make_transfer as client_make_transfer;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `make_transfer` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS Alias for `make_transfer`.
    ///
    /// # Arguments
    ///
    /// * `amount` - The transfer amount.
    /// * `target_account` - The target account.
    /// * `transfer_id` - Optional transfer identifier.
    /// * `deploy_params` - The deploy parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Deploy` or a `JsError` in case of an error.
    #[wasm_bindgen(js_name = "make_transfer")]
    pub fn make_transfer_js_alias(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, JsError> {
        // log("make_transfer");
        let result = self.make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        );
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
    /// Creates a transfer deploy with the provided parameters.
    ///
    /// # Arguments
    ///
    /// * `amount` - The transfer amount.
    /// * `target_account` - The target account.
    /// * `transfer_id` - Optional transfer identifier.
    /// * `deploy_params` - The deploy parameters.
    /// * `payment_params` - The payment parameters.
    ///
    /// # Returns
    ///
    /// A `Result` containing the created `Deploy` or a `SdkError` in case of an error.
    pub fn make_transfer(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, SdkError> {
        // log("make_transfer");
        make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        )
        .map_err(SdkError::from)
    }
}

/// Internal function to create a transfer deploy.
pub(crate) fn make_transfer(
    amount: &str,
    target_account: &str,
    transfer_id: Option<String>,
    deploy_params: DeployStrParams,
    payment_params: PaymentStrParams,
) -> Result<Deploy, SdkError> {
    let transfer_id = if let Some(transfer_id) = transfer_id {
        transfer_id
    } else {
        rand::thread_rng().gen::<u64>().to_string()
    };
    client_make_transfer(
        "",
        amount,
        target_account,
        &transfer_id,
        deploy_str_params_to_casper_client(&deploy_params),
        payment_str_params_to_casper_client(&payment_params),
        false,
    )
    .map(Into::into)
    .map_err(SdkError::from)
}

#[cfg(test)]
mod tests {

    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        rpcs::PRIVATE_KEY_NCTL_PATH,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        },
    };
    use sdk_tests::{
        config::{CHAIN_NAME, PAYMENT_TRANSFER_AMOUNT, PRIVATE_KEY_NAME, TRANSFER_AMOUNT},
        tests::helpers::read_pem_file,
    };

    #[tokio::test]
    async fn test_make_transfer_with_valid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(CHAIN_NAME, &account, Some(private_key), None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk.make_transfer(
            TRANSFER_AMOUNT,
            &account,
            None,
            deploy_params,
            payment_params,
        );

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_transfer_with_valid_transfer_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params = DeployStrParams::new(CHAIN_NAME, &account, None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk.make_transfer(
            TRANSFER_AMOUNT,
            &account,
            None,
            deploy_params,
            payment_params,
        );

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_make_transfer_with_invalid_transfer_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]".to_string();
        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(CHAIN_NAME, &account, Some(private_key), None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(""); // This is not valid payment amount

        // Act
        let result = sdk.make_transfer(
            TRANSFER_AMOUNT,
            &account,
            None,
            deploy_params,
            payment_params,
        );
        // Assert

        assert!(result.is_err());

        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(&error_message));
    }
}
