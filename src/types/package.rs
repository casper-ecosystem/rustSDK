use crate::types::addr::entity_addr::EntityAddr;
use casper_types::Package as _Package;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::Package`] (`StoredValue::SmartContract`).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Package(_Package);

impl Package {
    pub fn inner(&self) -> &_Package {
        &self.0
    }

    pub fn is_locked(&self) -> bool {
        self.0.is_locked()
    }

    pub fn current_entity_hash(&self) -> Option<EntityAddr> {
        self.0.current_entity_hash().map(EntityAddr::from)
    }
}

#[wasm_bindgen]
impl Package {
    #[wasm_bindgen(js_name = "isLocked")]
    pub fn is_locked_js(&self) -> bool {
        self.is_locked()
    }

    #[wasm_bindgen(js_name = "currentEntityHash")]
    pub fn current_entity_hash_js(&self) -> Option<EntityAddr> {
        self.current_entity_hash()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<Package> for _Package {
    fn from(value: Package) -> Self {
        value.0
    }
}

impl From<_Package> for Package {
    fn from(value: _Package) -> Self {
        Package(value)
    }
}

impl AsRef<_Package> for Package {
    fn as_ref(&self) -> &_Package {
        &self.0
    }
}
