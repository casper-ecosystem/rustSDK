use crate::types::{hash::account_hash::AccountHash, named_keys::NamedKeys, uref::URef};
use casper_types::account::Account as _Account;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::account::Account`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct Account(_Account);

impl Account {
    pub fn inner(&self) -> &_Account {
        &self.0
    }

    pub fn account_hash(&self) -> AccountHash {
        self.0.account_hash().into()
    }

    pub fn named_keys(&self) -> NamedKeys {
        self.0.named_keys().clone().into()
    }

    pub fn main_purse(&self) -> URef {
        self.0.main_purse().into()
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl Account {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "accountHash"))]
    pub fn account_hash_js(&self) -> AccountHash {
        self.account_hash()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "namedKeys"))]
    pub fn named_keys_js(&self) -> NamedKeys {
        self.named_keys()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "mainPurse"))]
    pub fn main_purse_js(&self) -> URef {
        self.main_purse()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<Account> for _Account {
    fn from(value: Account) -> Self {
        value.0
    }
}

impl From<_Account> for Account {
    fn from(value: _Account) -> Self {
        Account(value)
    }
}

impl AsRef<_Account> for Account {
    fn as_ref(&self) -> &_Account {
        &self.0
    }
}
