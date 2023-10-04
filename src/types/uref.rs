use crate::{
    debug::error,
    types::{access_rights::AccessRights, addr::uref_addr::URefAddr},
};
use casper_types::URef as _URef;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Deserialize, Serialize)]
#[wasm_bindgen]

pub struct URef(_URef);

#[wasm_bindgen]
impl URef {
    #[wasm_bindgen(constructor)]
    pub fn new(uref_hex_str: &str, access_rights: u8) -> Result<URef, JsValue> {
        // Convert the input hexadecimal string to bytes
        let bytes = match hex::decode(uref_hex_str) {
            Ok(bytes) => bytes,
            Err(err) => {
                error(&format!("Invalid hex string: {}", err));
                return Err(JsValue::null());
            }
        };

        let uref = _URef::new(
            URefAddr::new(bytes).unwrap().into(),
            AccessRights::new(access_rights).unwrap_or_default().into(),
        );

        Ok(URef(uref))
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>, access_rights: u8) -> Self {
        let mut address_array = [0u8; 32];
        address_array[..bytes.len()].copy_from_slice(&bytes);

        URef(_URef::new(
            address_array,
            AccessRights::new(access_rights).unwrap_or_default().into(),
        ))
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<_URef> for URef {
    fn from(uref: _URef) -> Self {
        URef(uref)
    }
}

impl From<URef> for _URef {
    fn from(uref: URef) -> Self {
        uref.0
    }
}
