use casper_types::ContractWasm as _ContractWasm;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::ContractWasm`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
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

#[wasm_bindgen]
impl ContractWasm {
    #[wasm_bindgen(js_name = "bytes")]
    pub fn bytes_js(&self) -> Vec<u8> {
        self.bytes()
    }

    #[wasm_bindgen(js_name = "len")]
    pub fn len_js(&self) -> usize {
        self.len()
    }

    #[wasm_bindgen(js_name = "isEmpty")]
    pub fn is_empty_js(&self) -> bool {
        self.is_empty()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
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
