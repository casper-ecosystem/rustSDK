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
        },
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::make_transfer, rpcs::results::SpeculativeExecResult as _SpeculativeExecResult,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS Alias for speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `maybe_block_id_as_string` - An optional block ID as a string.
    /// * `maybe_block_identifier` - An optional block identifier.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(js_name = "speculative_transfer")]
    pub async fn speculative_transfer_js_alias(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
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
            .speculative_transfer(
                amount,
                target_account,
                transfer_id,
                deploy_params,
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
    /// Perform a speculative transfer.
    ///
    /// # Arguments
    ///
    /// * `amount` - The amount to transfer.
    /// * `target_account` - The target account.
    /// * `transfer_id` - An optional transfer ID (defaults to a random number).
    /// * `deploy_params` - The deployment parameters.
    /// * `payment_params` - The payment parameters.
    /// * `maybe_block_identifier` - An optional block identifier.
    /// * `verbosity` - The verbosity level for logging (optional).
    /// * `node_address` - The address of the node to connect to (optional).
    ///
    /// # Returns
    ///
    /// A `Result` containing the result of the speculative transfer or a `SdkError` in case of an error.
    #[allow(clippy::too_many_arguments)]
    pub async fn speculative_transfer(
        &self,
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
        maybe_block_identifier: Option<BlockIdentifierInput>,
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
            let err_msg = format!("Error during speculative_transfer: {}", err);
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
        helpers::public_key_from_secret_key, rpcs::PRIVATE_KEY_NCTL_PATH,
        types::block_identifier::BlockIdentifier,
    };
    use sdk_tests::{
        config::{
            CHAIN_NAME, DEFAULT_NODE_ADDRESS, PAYMENT_TRANSFER_AMOUNT, PRIVATE_KEY_NAME,
            TRANSFER_AMOUNT,
        },
        tests::helpers::read_pem_file,
    };

    #[tokio::test]
    async fn _test_speculative_transfer_with_valid_params() {
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
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
                payment_params,
                None,
                verbosity,
                node_address,
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn _test_speculative_transfer_with_block_identifier() {
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
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        // Act
        let result = sdk
            .speculative_transfer(
                TRANSFER_AMOUNT,
                &account,
                None,
                deploy_params,
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
    async fn test_speculative_transfer_with_valid_params_without_private_key() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params = DeployStrParams::new(CHAIN_NAME, &account, None, None, None);
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
                None,
                verbosity,
                node_address,
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
        let node_address = Some(DEFAULT_NODE_ADDRESS.to_string());

        let error_message = "Missing a required arg - exactly one of the following must be provided: [\"payment_amount\", \"payment_hash\", \"payment_name\", \"payment_package_hash\", \"payment_package_name\", \"payment_path\", \"has_payment_bytes\"]".to_string();
        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_secret_key(&private_key).unwrap();

        let deploy_params =
            DeployStrParams::new(CHAIN_NAME, &account, Some(private_key), None, None);
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
