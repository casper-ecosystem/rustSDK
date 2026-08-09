use crate::types::{hash::contract_hash::ContractHash, uref::URef};
use casper_types::contracts::ContractPackage as _ContractPackage;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::contracts::ContractPackage`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct ContractPackage(_ContractPackage);

impl ContractPackage {
    pub fn inner(&self) -> &_ContractPackage {
        &self.0
    }

    pub fn access_key(&self) -> URef {
        self.0.access_key().into()
    }

    pub fn is_locked(&self) -> bool {
        self.0.is_locked()
    }

    pub fn current_contract_hash(&self) -> Option<ContractHash> {
        self.0.current_contract_hash().map(ContractHash::from)
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl ContractPackage {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "accessKey"))]
    pub fn access_key_js(&self) -> URef {
        self.access_key()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "isLocked"))]
    pub fn is_locked_js(&self) -> bool {
        self.is_locked()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "currentContractHash"))]
    pub fn current_contract_hash_js(&self) -> Option<ContractHash> {
        self.current_contract_hash()
    }

    /// Versions / groups / lock metadata as JSON for escape-hatch parsing.
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<ContractPackage> for _ContractPackage {
    fn from(value: ContractPackage) -> Self {
        value.0
    }
}

impl From<_ContractPackage> for ContractPackage {
    fn from(value: _ContractPackage) -> Self {
        ContractPackage(value)
    }
}

impl AsRef<_ContractPackage> for ContractPackage {
    fn as_ref(&self) -> &_ContractPackage {
        &self.0
    }
}
