use casper_types::{HashAddr as _HashAddr, KEY_HASH_LENGTH};
use core::fmt::{Display, Formatter};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct HashAddr(_HashAddr);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl HashAddr {
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new(bytes: Vec<u8>) -> Result<HashAddr, JsError> {
        if bytes.len() != KEY_HASH_LENGTH {
            return Err(JsError::new("Invalid HashAddr length"));
        }
        let mut array = [0u8; KEY_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(HashAddr(array))
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toBytes"))]
    pub fn to_bytes_js_alias(&self) -> Vec<u8> {
        self.to_bytes()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toHexString"))]
    pub fn to_hex_string_js_alias(&self) -> String {
        self.to_string()
    }
}

impl HashAddr {
    pub fn to_bytes(&self) -> Vec<u8> {
        self.0.to_vec()
    }

    pub fn to_hex_string(&self) -> String {
        self.to_string()
    }
}

impl Display for HashAddr {
    fn fmt(&self, f: &mut Formatter<'_>) -> core::fmt::Result {
        write!(f, "{}", base16::encode_lower(&self.0))
    }
}

impl From<Vec<u8>> for HashAddr {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; KEY_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        HashAddr(array)
    }
}

impl From<HashAddr> for _HashAddr {
    fn from(hash_addr: HashAddr) -> Self {
        hash_addr.0
    }
}

impl From<_HashAddr> for HashAddr {
    fn from(hash_addr: _HashAddr) -> Self {
        HashAddr(hash_addr)
    }
}
