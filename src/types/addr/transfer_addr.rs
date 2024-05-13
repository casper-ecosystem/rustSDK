use crate::debug::error;
use casper_types::TransferAddr as _TransferAddr;
use casper_types::TRANSFER_ADDR_LENGTH;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct TransferAddr(_TransferAddr);

#[wasm_bindgen]
impl TransferAddr {
    #[wasm_bindgen(constructor)]
    pub fn new(bytes: Vec<u8>) -> Result<TransferAddr, JsValue> {
        if bytes.len() != TRANSFER_ADDR_LENGTH {
            error("Invalid TransferAddr length");
            return Err(JsValue::null());
        }
        let mut array = [0u8; TRANSFER_ADDR_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(TransferAddr(_TransferAddr::new(array)))
    }
}

impl From<Vec<u8>> for TransferAddr {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; TRANSFER_ADDR_LENGTH];
        array.copy_from_slice(&bytes);
        TransferAddr(_TransferAddr::new(array))
    }
}

impl From<TransferAddr> for _TransferAddr {
    fn from(val: TransferAddr) -> Self {
        val.0
    }
}

#[wasm_bindgen(js_name = "fromTransfer")]
pub fn from_transfer(key: Vec<u8>) -> TransferAddr {
    TransferAddr::from(key)
}
