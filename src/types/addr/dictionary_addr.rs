use casper_types::{DictionaryAddr as _DictionaryAddr, KEY_DICTIONARY_LENGTH};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct DictionaryAddr(_DictionaryAddr);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl DictionaryAddr {
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new(bytes: Vec<u8>) -> Result<DictionaryAddr, JsError> {
        if bytes.len() != KEY_DICTIONARY_LENGTH {
            return Err(JsError::new("Invalid DictionaryAddr length"));
        }
        let mut array = [0u8; KEY_DICTIONARY_LENGTH];
        array.copy_from_slice(&bytes);
        Ok(DictionaryAddr(array))
    }
}

impl From<Vec<u8>> for DictionaryAddr {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; KEY_DICTIONARY_LENGTH];
        array.copy_from_slice(&bytes);
        DictionaryAddr(array)
    }
}

impl From<DictionaryAddr> for _DictionaryAddr {
    fn from(dictionary_addr: DictionaryAddr) -> Self {
        dictionary_addr.0
    }
}

impl From<_DictionaryAddr> for DictionaryAddr {
    fn from(dictionary_addr: _DictionaryAddr) -> Self {
        DictionaryAddr(dictionary_addr)
    }
}
