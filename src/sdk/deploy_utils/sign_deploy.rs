use crate::types::deploy::Deploy;
use crate::SDK;
use casper_client::types::Deploy as _Deploy;
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
    pub fn sign_deploy_js_alias(&mut self, deploy: Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy.into(), secret_key)
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
    pub fn sign_deploy(&mut self, deploy: _Deploy, secret_key: &str) -> Deploy {
        sign_deploy(deploy, secret_key)
    }
}

/// Internal function to sign a deploy.
pub(crate) fn sign_deploy(deploy: _Deploy, secret_key: &str) -> Deploy {
    // log("sign_deploy!");
    let mut deploy: Deploy = deploy.into();
    deploy.sign(secret_key)
}
