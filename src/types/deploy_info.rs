use crate::types::{hash::account_hash::AccountHash, uref::URef};
use casper_types::DeployInfo as _DeployInfo;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::DeployInfo`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct DeployInfo(_DeployInfo);

impl DeployInfo {
    pub fn inner(&self) -> &_DeployInfo {
        &self.0
    }

    pub fn deploy_hash(&self) -> String {
        self.0.deploy_hash.to_string()
    }

    pub fn from_account(&self) -> AccountHash {
        self.0.from.into()
    }

    pub fn source(&self) -> URef {
        self.0.source.into()
    }

    pub fn gas(&self) -> String {
        self.0.gas.to_string()
    }

    pub fn transfer_count(&self) -> usize {
        self.0.transfers.len()
    }

    pub fn transfer_addrs(&self) -> Vec<String> {
        self.0
            .transfers
            .iter()
            .map(|addr| addr.to_string())
            .collect()
    }
}

#[wasm_bindgen]
impl DeployInfo {
    #[wasm_bindgen(js_name = "deployHash")]
    pub fn deploy_hash_js(&self) -> String {
        self.deploy_hash()
    }

    #[wasm_bindgen(js_name = "fromAccount")]
    pub fn from_account_js(&self) -> AccountHash {
        self.from_account()
    }

    #[wasm_bindgen(js_name = "source")]
    pub fn source_js(&self) -> URef {
        self.source()
    }

    #[wasm_bindgen(js_name = "gas")]
    pub fn gas_js(&self) -> String {
        self.gas()
    }

    #[wasm_bindgen(js_name = "transferCount")]
    pub fn transfer_count_js(&self) -> usize {
        self.transfer_count()
    }

    #[wasm_bindgen(js_name = "transferAddrs")]
    pub fn transfer_addrs_js(&self) -> Vec<String> {
        self.transfer_addrs()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<DeployInfo> for _DeployInfo {
    fn from(value: DeployInfo) -> Self {
        value.0
    }
}

impl From<_DeployInfo> for DeployInfo {
    fn from(value: _DeployInfo) -> Self {
        DeployInfo(value)
    }
}

impl AsRef<_DeployInfo> for DeployInfo {
    fn as_ref(&self) -> &_DeployInfo {
        &self.0
    }
}
