#[cfg(target_arch = "wasm32")]
use crate::deploy::deploy::PutDeployResult;
use crate::types::deploy::Deploy;
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    put_deploy, rpcs::results::PutDeployResult as _PutDeployResult, Error, JsonRpcId,
    SuccessResponse,
};
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// SDK methods for putting a deploy.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Puts a deploy using the provided options.
    ///
    /// # Arguments
    ///
    /// * `deploy` - The `Deploy` object to be sent.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the deploy process.
    #[wasm_bindgen(js_name = "put_deploy")]
    pub async fn put_deploy_js_alias(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        let result = self.put_deploy(deploy, verbosity, node_address).await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    /// JavaScript Alias for `put_deploy`.
    #[deprecated(note = "This function is an alias. Please use `put_deploy` instead.")]
    #[allow(deprecated)]
    pub async fn account_put_deploy(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<PutDeployResult, JsError> {
        self.put_deploy_js_alias(deploy, verbosity, node_address)
            .await
    }
}

impl SDK {
    /// Puts a deploy based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `deploy` - The `Deploy` object to be sent.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `node_address` - An optional string specifying the node address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `_PutDeployResult` or an `Error` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns an `Error` if there is an error during the deploy process.
    pub async fn put_deploy(
        &self,
        deploy: Deploy,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_PutDeployResult>, Error> {
        //log("account_put_deploy!");
        put_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            deploy.into(),
        )
        .await
    }
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        },
    };
    use sdk_tests::{
        config::{PAYMENT_TRANSFER_AMOUNT, TRANSFER_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    fn get_deploy() -> Deploy {
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let (_, _, _, _, chain_name) = get_network_constants();
        let deploy_params =
            DeployStrParams::new(&chain_name, &account, Some(secret_key), None, None, None);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        Deploy::with_transfer(
            TRANSFER_AMOUNT,
            &account, // self transfer
            None,
            deploy_params,
            payment_params,
        )
        .unwrap()
    }

    #[tokio::test]
    async fn test_put_deploy_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None);
        let error_message = "builder error";
        let deploy = get_deploy();

        // Act
        let result = sdk.put_deploy(deploy, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_put_deploy() {
        // Arrange
        let sdk = SDK::new(None, None);
        let verbosity = Some(Verbosity::High);
        let (node_address, _, _, _, _) = get_network_constants();
        let deploy = get_deploy();

        // Act
        let result = sdk.put_deploy(deploy, verbosity, Some(node_address)).await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_put_deploy_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None);
        let error_message = "error sending request for url (http://localhost/rpc)";
        let deploy = get_deploy();

        // Act
        let result = sdk.put_deploy(deploy, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
