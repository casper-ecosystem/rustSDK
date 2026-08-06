use casper_types::{ByteCode as _ByteCode, ByteCodeKind as _ByteCodeKind};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::ByteCode`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct ByteCode(_ByteCode);

impl ByteCode {
    pub fn inner(&self) -> &_ByteCode {
        &self.0
    }

    pub fn kind(&self) -> String {
        match self.0.kind() {
            _ByteCodeKind::Empty => "Empty".to_string(),
            _ByteCodeKind::V1CasperWasm => "V1CasperWasm".to_string(),
            _ByteCodeKind::V2CasperWasm => "V2CasperWasm".to_string(),
        }
    }

    pub fn bytes(&self) -> Vec<u8> {
        self.0.bytes().to_vec()
    }

    pub fn len(&self) -> usize {
        self.0.bytes().len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.bytes().is_empty()
    }
}

#[wasm_bindgen]
impl ByteCode {
    #[wasm_bindgen(js_name = "kind")]
    pub fn kind_js(&self) -> String {
        self.kind()
    }

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

impl From<ByteCode> for _ByteCode {
    fn from(value: ByteCode) -> Self {
        value.0
    }
}

impl From<_ByteCode> for ByteCode {
    fn from(value: _ByteCode) -> Self {
        ByteCode(value)
    }
}

impl AsRef<_ByteCode> for ByteCode {
    fn as_ref(&self) -> &_ByteCode {
        &self.0
    }
}
