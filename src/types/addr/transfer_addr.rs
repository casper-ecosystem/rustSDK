use casper_types::{TransferAddr as _TransferAddr, TRANSFER_ADDR_LENGTH};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct TransferAddr(_TransferAddr);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl TransferAddr {
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new(bytes: Vec<u8>) -> Result<TransferAddr, JsError> {
        if bytes.len() != TRANSFER_ADDR_LENGTH {
            return Err(JsError::new("Invalid TransferAddr length"));
        }
        let mut array = [0u8; TRANSFER_ADDR_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(_TransferAddr::new(array).into())
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

impl From<_TransferAddr> for TransferAddr {
    fn from(transfer_hash_addr: _TransferAddr) -> Self {
        TransferAddr(transfer_hash_addr)
    }
}
