use casper_types::{
    addressable_entity::EntryPointType as _EntryPointType, contracts::EntryPoint as _EntryPoint,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::contracts::EntryPoint`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct EntryPoint(_EntryPoint);

impl EntryPoint {
    pub fn inner(&self) -> &_EntryPoint {
        &self.0
    }

    pub fn name(&self) -> String {
        self.0.name().to_string()
    }

    pub fn entry_point_type(&self) -> String {
        match self.0.entry_point_type() {
            _EntryPointType::Caller => "Caller".to_string(),
            _EntryPointType::Called => "Called".to_string(),
            _EntryPointType::Factory => "Factory".to_string(),
        }
    }
}

#[wasm_bindgen]
impl EntryPoint {
    #[wasm_bindgen(js_name = "name")]
    pub fn name_js(&self) -> String {
        self.name()
    }

    #[wasm_bindgen(js_name = "entryPointType")]
    pub fn entry_point_type_js(&self) -> String {
        self.entry_point_type()
    }

    /// Nested args / access / return type as JSON for escape-hatch parsing.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<EntryPoint> for _EntryPoint {
    fn from(value: EntryPoint) -> Self {
        value.0
    }
}

impl From<_EntryPoint> for EntryPoint {
    fn from(value: _EntryPoint) -> Self {
        EntryPoint(value)
    }
}

impl AsRef<_EntryPoint> for EntryPoint {
    fn as_ref(&self) -> &_EntryPoint {
        &self.0
    }
}
