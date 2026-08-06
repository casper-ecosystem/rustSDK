use casper_types::{
    addressable_entity::EntryPointType as _EntryPointType, EntryPointValue as _EntryPointValue,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::EntryPointValue`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct EntryPointValue(_EntryPointValue);

impl EntryPointValue {
    pub fn inner(&self) -> &_EntryPointValue {
        &self.0
    }

    pub fn variant(&self) -> &'static str {
        match &self.0 {
            _EntryPointValue::V1CasperVm(_) => "V1CasperVm",
        }
    }

    pub fn name(&self) -> Option<String> {
        match &self.0 {
            _EntryPointValue::V1CasperVm(entry_point) => Some(entry_point.name().to_string()),
        }
    }

    pub fn entry_point_type(&self) -> Option<String> {
        match &self.0 {
            _EntryPointValue::V1CasperVm(entry_point) => {
                Some(match entry_point.entry_point_type() {
                    _EntryPointType::Caller => "Caller".to_string(),
                    _EntryPointType::Called => "Called".to_string(),
                    _EntryPointType::Factory => "Factory".to_string(),
                })
            }
        }
    }
}

#[wasm_bindgen]
impl EntryPointValue {
    #[wasm_bindgen(js_name = "variant")]
    pub fn variant_js(&self) -> String {
        self.variant().to_string()
    }

    #[wasm_bindgen(js_name = "name")]
    pub fn name_js(&self) -> Option<String> {
        self.name()
    }

    #[wasm_bindgen(js_name = "entryPointType")]
    pub fn entry_point_type_js(&self) -> Option<String> {
        self.entry_point_type()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<EntryPointValue> for _EntryPointValue {
    fn from(value: EntryPointValue) -> Self {
        value.0
    }
}

impl From<_EntryPointValue> for EntryPointValue {
    fn from(value: _EntryPointValue) -> Self {
        EntryPointValue(value)
    }
}

impl AsRef<_EntryPointValue> for EntryPointValue {
    fn as_ref(&self) -> &_EntryPointValue {
        &self.0
    }
}
