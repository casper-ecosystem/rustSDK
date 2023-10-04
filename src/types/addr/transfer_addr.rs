//use casper_types::TransferAddr as _TransferAddr;
use crate::debug::error;
use casper_types::TRANSFER_ADDR_LENGTH;
use wasm_bindgen::prelude::*;

// TODO Fix with TransferAddr as _TransferAddr, and [u8; 32]
#[wasm_bindgen]
pub struct TransferAddr([u8; TRANSFER_ADDR_LENGTH]);

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
        Ok(TransferAddr(array))
    }
}

impl From<Vec<u8>> for TransferAddr {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; TRANSFER_ADDR_LENGTH];
        array.copy_from_slice(&bytes);
        TransferAddr(array)
    }
}

// TODO cannot initialize a tuple struct which contains private fields
// Implement Into<_TransferAddr> for TransferAddr
// impl Into<_TransferAddr> for TransferAddr {
//     fn into(self) -> _TransferAddr {
//         _TransferAddr(self.0)
//     }
// }

#[wasm_bindgen(js_name = "fromTransfer")]
pub fn from_transfer(key: Vec<u8>) -> TransferAddr {
    TransferAddr::from(key)
}
