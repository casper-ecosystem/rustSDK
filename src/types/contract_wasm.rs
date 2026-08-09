use casper_types::ContractWasm as _ContractWasm;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::ContractWasm`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct ContractWasm(_ContractWasm);

impl ContractWasm {
    pub fn inner(&self) -> &_ContractWasm {
        &self.0
    }

    pub fn bytes(&self) -> Vec<u8> {
        self.0.clone().take_bytes()
    }

    pub fn len(&self) -> usize {
        self.bytes().len()
    }

    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl ContractWasm {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "bytes"))]
    pub fn bytes_js(&self) -> Vec<u8> {
        self.bytes()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "len"))]
    pub fn len_js(&self) -> usize {
        self.len()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "isEmpty"))]
    pub fn is_empty_js(&self) -> bool {
        self.is_empty()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<ContractWasm> for _ContractWasm {
    fn from(value: ContractWasm) -> Self {
        value.0
    }
}

impl From<_ContractWasm> for ContractWasm {
    fn from(value: _ContractWasm) -> Self {
        ContractWasm(value)
    }
}

impl AsRef<_ContractWasm> for ContractWasm {
    fn as_ref(&self) -> &_ContractWasm {
        &self.0
    }
}
