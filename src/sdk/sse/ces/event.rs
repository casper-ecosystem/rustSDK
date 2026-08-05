//! CES decoded contract event.

use serde::{Deserialize, Serialize};
use serde_json::Value;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

pub const EVENT_PREFIX: &str = "event_";

/// One CES event decoded from an execution transform.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
#[cfg_attr(target_arch = "wasm32", wasm_bindgen(getter_with_clone))]
pub struct CESEvent {
    pub name: String,
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "contractHash"))]
    pub contract_hash: Option<String>,
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "contractPackageHash"))]
    pub contract_package_hash: Option<String>,
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "eventId"))]
    pub event_id: u64,
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "transformIdx"))]
    pub transform_idx: usize,
    /// Field name → JSON string of CLValue map (use `dataJson` from wasm).
    #[serde(default)]
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "dataJson"))]
    pub data_json: String,
}

impl CESEvent {
    pub fn set_data(&mut self, data: Value) {
        self.data_json = serde_json::to_string(&data).unwrap_or_else(|_| "{}".to_string());
    }

    pub fn data(&self) -> Value {
        serde_json::from_str(&self.data_json).unwrap_or(Value::Object(Default::default()))
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl CESEvent {
    #[wasm_bindgen(js_name = "data")]
    pub fn data_js(&self) -> String {
        self.data_json.clone()
    }
}

/// Parse result for one transform (error soft-fails like ces-js-parser).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[cfg_attr(target_arch = "wasm32", wasm_bindgen(getter_with_clone))]
pub struct CESParseResult {
    pub event: CESEvent,
    pub error: Option<String>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl CESParseResult {
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> Result<String, String> {
        serde_json::to_string(self).map_err(|e| e.to_string())
    }
}

impl CESParseResult {
    pub fn to_json_native(&self) -> Result<String, String> {
        serde_json::to_string(self).map_err(|e| e.to_string())
    }
}
