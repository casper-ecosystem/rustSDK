use crate::types::{hash::account_hash::AccountHash, uref::URef};
use casper_types::TransferV1 as _TransferV1;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::TransferV1`] (`StoredValue::Transfer`).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Transfer(_TransferV1);

impl Transfer {
    pub fn inner(&self) -> &_TransferV1 {
        &self.0
    }

    pub fn deploy_hash(&self) -> String {
        self.0.deploy_hash.to_string()
    }

    pub fn from_account(&self) -> AccountHash {
        self.0.from.into()
    }

    pub fn to(&self) -> Option<AccountHash> {
        self.0.to.map(AccountHash::from)
    }

    pub fn source(&self) -> URef {
        self.0.source.into()
    }

    pub fn target(&self) -> URef {
        self.0.target.into()
    }

    pub fn amount(&self) -> String {
        self.0.amount.to_string()
    }

    pub fn gas(&self) -> String {
        self.0.gas.to_string()
    }

    pub fn id(&self) -> Option<u64> {
        self.0.id
    }
}

#[wasm_bindgen]
impl Transfer {
    #[wasm_bindgen(js_name = "deployHash")]
    pub fn deploy_hash_js(&self) -> String {
        self.deploy_hash()
    }

    #[wasm_bindgen(js_name = "fromAccount")]
    pub fn from_account_js(&self) -> AccountHash {
        self.from_account()
    }

    #[wasm_bindgen(js_name = "to")]
    pub fn to_js(&self) -> Option<AccountHash> {
        self.to()
    }

    #[wasm_bindgen(js_name = "source")]
    pub fn source_js(&self) -> URef {
        self.source()
    }

    #[wasm_bindgen(js_name = "target")]
    pub fn target_js(&self) -> URef {
        self.target()
    }

    #[wasm_bindgen(js_name = "amount")]
    pub fn amount_js(&self) -> String {
        self.amount()
    }

    #[wasm_bindgen(js_name = "gas")]
    pub fn gas_js(&self) -> String {
        self.gas()
    }

    #[wasm_bindgen(js_name = "id")]
    pub fn id_js(&self) -> Option<u64> {
        self.id()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<Transfer> for _TransferV1 {
    fn from(value: Transfer) -> Self {
        value.0
    }
}

impl From<_TransferV1> for Transfer {
    fn from(value: _TransferV1) -> Self {
        Transfer(value)
    }
}

impl AsRef<_TransferV1> for Transfer {
    fn as_ref(&self) -> &_TransferV1 {
        &self.0
    }
}
