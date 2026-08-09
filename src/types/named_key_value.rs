use crate::types::{cl::cl_value::CLValue, key::Key};
use casper_types::addressable_entity::NamedKeyValue as _NamedKeyValue;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::NamedKeyValue`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct NamedKeyValue(_NamedKeyValue);

impl NamedKeyValue {
    pub fn inner(&self) -> &_NamedKeyValue {
        &self.0
    }

    pub fn name_cl_value(&self) -> CLValue {
        self.0.get_name_as_cl_value().clone().into()
    }

    pub fn key_cl_value(&self) -> CLValue {
        self.0.get_key_as_cl_value().clone().into()
    }

    pub fn name(&self) -> Option<String> {
        self.0.get_name().ok()
    }

    pub fn key(&self) -> Option<Key> {
        self.0.get_key().ok().map(Key::from)
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl NamedKeyValue {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "nameClValue"))]
    pub fn name_cl_value_js(&self) -> CLValue {
        self.name_cl_value()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "keyClValue"))]
    pub fn key_cl_value_js(&self) -> CLValue {
        self.key_cl_value()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "name"))]
    pub fn name_js(&self) -> Option<String> {
        self.name()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "key"))]
    pub fn key_js(&self) -> Option<Key> {
        self.key()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<NamedKeyValue> for _NamedKeyValue {
    fn from(value: NamedKeyValue) -> Self {
        value.0
    }
}

impl From<_NamedKeyValue> for NamedKeyValue {
    fn from(value: _NamedKeyValue) -> Self {
        NamedKeyValue(value)
    }
}

impl AsRef<_NamedKeyValue> for NamedKeyValue {
    fn as_ref(&self) -> &_NamedKeyValue {
        &self.0
    }
}
