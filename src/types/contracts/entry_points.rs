use crate::types::contracts::entry_point::EntryPoint;
use casper_types::contracts::EntryPoints as _EntryPoints;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::contracts::EntryPoints`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct EntryPoints(_EntryPoints);

impl EntryPoints {
    pub fn inner(&self) -> &_EntryPoints {
        &self.0
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn has_entry_point(&self, name: &str) -> bool {
        self.0.has_entry_point(name)
    }

    pub fn get(&self, name: &str) -> Option<EntryPoint> {
        self.0.get(name).cloned().map(EntryPoint::from)
    }

    pub fn names(&self) -> Vec<String> {
        self.0.keys().cloned().collect()
    }
}

#[wasm_bindgen]
impl EntryPoints {
    #[wasm_bindgen(js_name = "len")]
    pub fn len_js(&self) -> usize {
        self.len()
    }

    #[wasm_bindgen(js_name = "isEmpty")]
    pub fn is_empty_js(&self) -> bool {
        self.is_empty()
    }

    #[wasm_bindgen(js_name = "hasEntryPoint")]
    pub fn has_entry_point_js(&self, name: &str) -> bool {
        self.has_entry_point(name)
    }

    #[wasm_bindgen(js_name = "get")]
    pub fn get_js(&self, name: &str) -> Option<EntryPoint> {
        self.get(name)
    }

    #[wasm_bindgen(js_name = "names")]
    pub fn names_js(&self) -> Vec<String> {
        self.names()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<EntryPoints> for _EntryPoints {
    fn from(value: EntryPoints) -> Self {
        value.0
    }
}

impl From<_EntryPoints> for EntryPoints {
    fn from(value: _EntryPoints) -> Self {
        EntryPoints(value)
    }
}

impl AsRef<_EntryPoints> for EntryPoints {
    fn as_ref(&self) -> &_EntryPoints {
        &self.0
    }
}
