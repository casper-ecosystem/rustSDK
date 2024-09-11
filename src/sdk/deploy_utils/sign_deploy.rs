use crate::types::deploy::Deploy;
use crate::SDK;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `sign_deploy` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for `sign_deploy`.
    ///
    /// # Arguments
    ///
    /// * `deploy` - The deploy to sign.
    /// * `secret_key` - The secret key for signing.
    ///
    /// # Returns
    ///
    /// The signed `Deploy`.
    #[deprecated(note = "prefer sign_transaction")]
    #[allow(deprecated)]
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
    #[deprecated(note = "prefer sign_transaction")]
    #[allow(deprecated)]
    pub fn sign_deploy(&self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

/// Internal function to sign a deploy.
#[deprecated(note = "prefer sign_transaction")]
#[allow(deprecated)]
pub(crate) fn sign_deploy(mut deploy: Deploy, secret_key: &str) -> Deploy {
    // log("sign_deploy!");
    deploy.sign(secret_key)
}

#[cfg(test)]
#[allow(deprecated)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    };
    use sdk_tests::{
        config::{ENTRYPOINT_MINT, PAYMENT_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    async fn test_sign_deploy_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let deploy = sdk
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();

        let signed_deploy = sdk.sign_deploy(deploy, &secret_key);

        // Assert
        assert!(signed_deploy.is_valid());
        assert!(signed_deploy.has_valid_hash());
        assert!(!signed_deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_deploy.account(), account);
    }

    #[tokio::test]
    async fn test_sign_deploy_with_invalid_signature() {
        // Arrange
        let sdk = SDK::new(None, None);
        let (_, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();

        let deploy_params = DeployStrParams::new(&chain_name, &account, None, None, None, None);
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            "hash-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        // Act
        let deploy = sdk
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();

        let signed_deploy = sdk.sign_deploy(deploy, "test_wrong_signature");

        // Assert
        assert!(signed_deploy.has_valid_hash());
        assert!(!signed_deploy.is_valid());
        assert!(!signed_deploy
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_deploy.account(), account);
    }
}
