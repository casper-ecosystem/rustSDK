use crate::helpers::get_current_timestamp;
use crate::helpers::get_str_or_default;
use crate::helpers::get_ttl_or_default;
use casper_client::cli::DeployStrParams as _DeployStrParams;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct DeployStrParams {
    secret_key: OnceCell<String>,
    timestamp: OnceCell<String>,
    ttl: OnceCell<String>,
    chain_name: OnceCell<String>,
    session_account: OnceCell<String>,
}

impl Default for DeployStrParams {
    fn default() -> Self {
        DeployStrParams {
            secret_key: OnceCell::new(),
            timestamp: OnceCell::new(),
            ttl: OnceCell::new(),
            chain_name: OnceCell::new(),
            session_account: OnceCell::new(),
        }
    }
}

#[wasm_bindgen]
impl DeployStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new(
        chain_name: &str,
        session_account: &str,
        secret_key: Option<String>,
        timestamp: Option<String>,
        ttl: Option<String>,
    ) -> Self {
        let deploy_params = DeployStrParams::default();
        deploy_params.set_chain_name(chain_name);
        deploy_params.set_session_account(session_account);
        if let Some(secret_key) = secret_key {
            deploy_params.set_secret_key(&secret_key);
        };
        deploy_params.set_timestamp(timestamp);
        deploy_params.set_ttl(ttl);
        deploy_params
    }

    // Getter and setter for secret_key field
    #[wasm_bindgen(getter)]
    pub fn secret_key(&self) -> Option<String> {
        self.secret_key.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_secret_key(&self, secret_key: &str) {
        self.secret_key.set(secret_key.to_string()).unwrap();
    }

    // Getter and setter for timestamp field
    #[wasm_bindgen(getter)]
    pub fn timestamp(&self) -> Option<String> {
        self.timestamp.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_timestamp(&self, timestamp: Option<String>) {
        if let Some(mut timestamp) = timestamp {
            if timestamp.is_empty() {
                timestamp = get_current_timestamp(None);
            }
            self.timestamp.set(timestamp.to_string()).unwrap();
        } else {
            let timestamp = get_current_timestamp(timestamp);
            self.timestamp.set(timestamp).unwrap();
        };
    }

    #[wasm_bindgen(js_name = "setDefaultTimestamp")]
    pub fn set_default_timestamp(&self) {
        let current_timestamp = get_current_timestamp(None);
        self.timestamp.set(current_timestamp).unwrap();
    }

    // Getter and setter for ttl field
    #[wasm_bindgen(getter)]
    pub fn ttl(&self) -> Option<String> {
        self.ttl.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_ttl(&self, ttl: Option<String>) {
        if let Some(mut ttl) = ttl {
            if ttl.is_empty() {
                ttl = get_ttl_or_default(None);
            }
            self.ttl.set(ttl.to_string()).unwrap();
        } else {
            let ttl = get_ttl_or_default(ttl.as_deref());
            self.ttl.set(ttl).unwrap();
        };
    }

    #[wasm_bindgen(js_name = "setDefaultTTL")]
    pub fn set_default_ttl(&self) {
        let ttl = get_ttl_or_default(None);
        self.ttl.set(ttl).unwrap();
    }

    // Getter and setter for chain_name field
    #[wasm_bindgen(getter)]
    pub fn chain_name(&self) -> Option<String> {
        self.chain_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_chain_name(&self, chain_name: &str) {
        self.chain_name.set(chain_name.to_string()).unwrap();
    }

    // Getter and setter for session_account field
    #[wasm_bindgen(getter)]
    pub fn session_account(&self) -> Option<String> {
        self.session_account.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_account(&self, session_account: &str) {
        self.session_account
            .set(session_account.to_string())
            .unwrap();
    }
}

// Convert DeployStrParams to casper_client::cli::DeployStrParams
pub fn deploy_str_params_to_casper_client(deploy_params: &DeployStrParams) -> _DeployStrParams<'_> {
    _DeployStrParams {
        secret_key: get_str_or_default(deploy_params.secret_key.get()),
        timestamp: get_str_or_default(deploy_params.timestamp.get()),
        ttl: get_str_or_default(deploy_params.ttl.get()),
        chain_name: get_str_or_default(deploy_params.chain_name.get()),
        session_account: get_str_or_default(deploy_params.session_account.get()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deploy_str_params_to_casper_client() {
        let secret_key = OnceCell::new();
        secret_key.set("secret_key".to_string()).unwrap();

        let timestamp = OnceCell::new();
        timestamp.set("1234567890".to_string()).unwrap();

        let ttl = OnceCell::new();
        ttl.set("10".to_string()).unwrap();

        let chain_name = OnceCell::new();
        chain_name.set("test_chain".to_string()).unwrap();

        let session_account = OnceCell::new();
        session_account.set("account_id".to_string()).unwrap();

        let deploy_params = DeployStrParams {
            secret_key,
            timestamp,
            ttl,
            chain_name,
            session_account,
        };

        let result = deploy_str_params_to_casper_client(&deploy_params);

        assert_eq!(result.secret_key, "secret_key");
        assert_eq!(result.timestamp, "1234567890");
        assert_eq!(result.ttl, "10");
        assert_eq!(result.chain_name, "test_chain");
        assert_eq!(result.session_account, "account_id");
    }
}
