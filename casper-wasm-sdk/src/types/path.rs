use gloo_utils::format::JsValueSerdeExt;
use js_sys::Array;
use serde::{Deserialize, Deserializer, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Serialize, Default)]
#[wasm_bindgen]
pub struct Path {
    path: Vec<String>,
}

#[wasm_bindgen]
impl Path {
    #[wasm_bindgen(constructor)]
    pub fn new(path: JsValue) -> Self {
        let path: Array = path.into();
        let path: Vec<String> = path
            .iter()
            .map(|value| {
                value
                    .as_string()
                    .unwrap_or_else(|| String::from("Invalid String"))
            })
            .collect();

        Path { path }
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.path).unwrap_or(JsValue::null())
    }

    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string(&self) -> String {
        self.path.join("/")
    }
}

impl<'de> Deserialize<'de> for Path {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let path: Vec<String> = Vec::deserialize(deserializer)?;
        Ok(Path { path })
    }
}

impl From<Path> for Vec<String> {
    fn from(path: Path) -> Self {
        path.path
    }
}

impl From<Vec<String>> for Path {
    fn from(path: Vec<String>) -> Self {
        Path { path }
    }
}
