use crate::types::{
    contracts::entry_point::EntryPoint, contracts::entry_points::EntryPoints,
    hash::contract_package_hash::ContractPackageHash, named_keys::NamedKeys,
};
use casper_types::contracts::Contract as _Contract;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::contracts::Contract`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Contract(_Contract);

impl Contract {
    pub fn inner(&self) -> &_Contract {
        &self.0
    }

    pub fn contract_package_hash(&self) -> ContractPackageHash {
        self.0.contract_package_hash().into()
    }

    pub fn contract_wasm_hash(&self) -> String {
        self.0.contract_wasm_hash().to_formatted_string()
    }

    pub fn named_keys(&self) -> NamedKeys {
        self.0.named_keys().clone().into()
    }

    pub fn entry_points(&self) -> EntryPoints {
        self.0.entry_points().clone().into()
    }

    pub fn entry_point(&self, name: &str) -> Option<EntryPoint> {
        self.0.entry_point(name).cloned().map(EntryPoint::from)
    }

    pub fn has_entry_point(&self, name: &str) -> bool {
        self.0.has_entry_point(name)
    }

    pub fn protocol_version(&self) -> String {
        self.0.protocol_version().to_string()
    }
}

#[wasm_bindgen]
impl Contract {
    #[wasm_bindgen(js_name = "contractPackageHash")]
    pub fn contract_package_hash_js(&self) -> ContractPackageHash {
        self.contract_package_hash()
    }

    #[wasm_bindgen(js_name = "contractWasmHash")]
    pub fn contract_wasm_hash_js(&self) -> String {
        self.contract_wasm_hash()
    }

    #[wasm_bindgen(js_name = "namedKeys")]
    pub fn named_keys_js(&self) -> NamedKeys {
        self.named_keys()
    }

    #[wasm_bindgen(js_name = "entryPoints")]
    pub fn entry_points_js(&self) -> EntryPoints {
        self.entry_points()
    }

    #[wasm_bindgen(js_name = "entryPoint")]
    pub fn entry_point_js(&self, name: &str) -> Option<EntryPoint> {
        self.entry_point(name)
    }

    #[wasm_bindgen(js_name = "hasEntryPoint")]
    pub fn has_entry_point_js(&self, name: &str) -> bool {
        self.has_entry_point(name)
    }

    #[wasm_bindgen(js_name = "protocolVersion")]
    pub fn protocol_version_js(&self) -> String {
        self.protocol_version()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<Contract> for _Contract {
    fn from(value: Contract) -> Self {
        value.0
    }
}

impl From<_Contract> for Contract {
    fn from(value: _Contract) -> Self {
        Contract(value)
    }
}

impl AsRef<_Contract> for Contract {
    fn as_ref(&self) -> &_Contract {
        &self.0
    }
}
