#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
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
        let path_string: String = if path.is_null() {
            String::from("")
        } else {
            path.as_string().unwrap_or_else(|| String::from(""))
        };
        Path::from(path_string)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromArray")]
    pub fn from_js_array(path: JsValue) -> Self {
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

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.path).unwrap_or(JsValue::null())
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        self.to_string()
    }

    pub fn is_empty(&self) -> bool {
        self.path.is_empty() || self.path.iter().all(|s| s.is_empty())
    }
}

impl std::fmt::Display for Path {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", self.path.join("/"))
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

impl From<String> for Path {
    fn from(path_string: String) -> Self {
        let segments: Vec<String> = path_string.split('/').map(ToString::to_string).collect();
        Path { path: segments }
    }
}
