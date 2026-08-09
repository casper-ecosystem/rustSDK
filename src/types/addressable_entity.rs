use crate::types::{hash::package_hash::PackageHash, uref::URef};
use casper_types::{
    account::AccountHash as _AccountHash, addressable_entity::EntityKind as _EntityKind,
    AddressableEntity as _AddressableEntity,
};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::AddressableEntity`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct AddressableEntity(_AddressableEntity);

impl AddressableEntity {
    pub fn inner(&self) -> &_AddressableEntity {
        &self.0
    }

    pub fn package_hash(&self) -> PackageHash {
        self.0.package_hash().into()
    }

    pub fn byte_code_hash(&self) -> String {
        self.0.byte_code_hash().to_formatted_string()
    }

    pub fn main_purse(&self) -> URef {
        self.0.main_purse().into()
    }

    pub fn protocol_version(&self) -> String {
        self.0.protocol_version().to_string()
    }

    pub fn entity_kind(&self) -> String {
        match self.0.entity_kind() {
            _EntityKind::System(_) => "System".to_string(),
            _EntityKind::Account(_) => "Account".to_string(),
            _EntityKind::SmartContract(_) => "SmartContract".to_string(),
        }
    }

    pub fn account_hash(&self) -> Option<String> {
        match self.0.entity_kind() {
            _EntityKind::Account(account_hash) => {
                let hash: _AccountHash = account_hash;
                Some(hash.to_formatted_string())
            }
            _ => None,
        }
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl AddressableEntity {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "packageHash"))]
    pub fn package_hash_js(&self) -> PackageHash {
        self.package_hash()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "byteCodeHash"))]
    pub fn byte_code_hash_js(&self) -> String {
        self.byte_code_hash()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "mainPurse"))]
    pub fn main_purse_js(&self) -> URef {
        self.main_purse()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "protocolVersion"))]
    pub fn protocol_version_js(&self) -> String {
        self.protocol_version()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "entityKind"))]
    pub fn entity_kind_js(&self) -> String {
        self.entity_kind()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "accountHash"))]
    pub fn account_hash_js(&self) -> Option<String> {
        self.account_hash()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<AddressableEntity> for _AddressableEntity {
    fn from(value: AddressableEntity) -> Self {
        value.0
    }
}

impl From<_AddressableEntity> for AddressableEntity {
    fn from(value: _AddressableEntity) -> Self {
        AddressableEntity(value)
    }
}

impl AsRef<_AddressableEntity> for AddressableEntity {
    fn as_ref(&self) -> &_AddressableEntity {
        &self.0
    }
}
