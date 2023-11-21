use crate::types::deploy::Deploy;
use crate::SDK;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `sign_deploy` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS Alias for `sign_deploy`.
    ///
    /// # Arguments
    ///
    /// * `deploy` - The deploy to sign.
    /// * `secret_key` - The secret key for signing.
    ///
    /// # Returns
    ///
    /// The signed `Deploy`.
    #[wasm_bindgen(js_name = "sign_deploy")]
    pub fn sign_deploy_js_alias(&self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

impl SDK {
    /// Signs a deploy using the provided secret key.
    ///
    /// # Arguments
    ///
    /// * `deploy` - The deploy to sign.
    /// * `secret_key` - The secret key for signing.
    ///
    /// # Returns
    ///
    /// The signed `Deploy`.
    pub fn sign_deploy(&self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

/// Internal function to sign a deploy.
pub(crate) fn sign_deploy(mut deploy: Deploy, secret_key: &str) -> Deploy {
    // log("sign_deploy!");
    deploy.sign(secret_key)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_private_key,
        rpcs::PRIVATE_KEY_NCTL_PATH,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    };
    use sdk_tests::{
        config::{CHAIN_NAME, PAYMENT_AMOUNT, PRIVATE_KEY_NAME},
        tests::helpers::read_pem_file,
    };

    #[tokio::test]
    async fn test_sign_deploy_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_private_key(&private_key).unwrap();

        let deploy_params = DeployStrParams::new(CHAIN_NAME, &account, None, None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point("test");
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let deploy = sdk
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();

        let signed_deploy = sdk.sign_deploy(deploy, &private_key);

        // Assert
        assert!(signed_deploy.is_valid());
        assert!(signed_deploy.has_valid_hash());
        assert!(!signed_deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_deploy.account(), account);

        // // Parse the JSON string in 1.6
        // let parsed_json: Value =
        //     serde_json::from_str(&signed_deploy.to_json_string().unwrap()).unwrap();
        // let cl_value_as_value = &parsed_json["approvals"][0]["signer"];
        // assert_eq!(*cl_value_as_value, Value::String(account.to_string()));
        // let cl_value_as_value = &parsed_json["approvals"][0]["signature"];
        // assert!(cl_value_as_value.is_string());
    }

    #[tokio::test]
    async fn test_sign_deploy_with_invalid_signature() {
        // Arrange
        let sdk = SDK::new(None, None);

        let private_key =
            read_pem_file(&format!("{PRIVATE_KEY_NCTL_PATH}{PRIVATE_KEY_NAME}")).unwrap();
        let account = public_key_from_private_key(&private_key).unwrap();

        let deploy_params = DeployStrParams::new(CHAIN_NAME, &account, None, None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point("test");
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let deploy = sdk
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();

        let signed_deploy = sdk.sign_deploy(deploy, "test_wrong_signature");

        // Assert
        assert!(!signed_deploy.is_valid());
        assert!(!signed_deploy.has_valid_hash());
        assert!(!signed_deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_deploy.account(), account);

        // // Parse the JSON string in 1.6
        // let parsed_json: Value =
        //     serde_json::from_str(&signed_deploy.to_json_string().unwrap()).unwrap();
        // let cl_value_as_value = &parsed_json["approvals"][0]["signer"];
        // assert_eq!(*cl_value_as_value, Value::Null);
    }
}
