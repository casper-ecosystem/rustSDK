use crate::types::{
    addr::{entity_addr::EntityAddr, hash_addr::HashAddr},
    sdk_error::SdkError,
};
use casper_types::{
    addressable_entity::{
        AddressableEntityHash as _AddressableEntityHash, ADDRESSABLE_ENTITY_STRING_PREFIX,
    },
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy, PartialEq, Eq)]
pub struct AddressableEntityHash(_AddressableEntityHash);

impl AddressableEntityHash {
    pub fn new(addressable_entity_hex_str: &str) -> Result<Self, SdkError> {
        let prefixed_input =
            format!("{ADDRESSABLE_ENTITY_STRING_PREFIX}{addressable_entity_hex_str}");
        Self::from_formatted_str(&prefixed_input)
    }

    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, SdkError> {
        let addressable_entity_hash = _AddressableEntityHash::from_formatted_str(formatted_str)
            .map_err(|error| SdkError::FailedToParseAddressableEntityHash {
                context: "AddressableEntityHash::from_formatted_str",
                error,
            })?;
        Ok(Self(addressable_entity_hash))
    }
}

#[wasm_bindgen]
impl AddressableEntityHash {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(
        addressable_entity_hex_str: &str,
    ) -> Result<AddressableEntityHash, JsError> {
        Self::new(addressable_entity_hex_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse AddressableEntityHash from hex string: {:?}",
                err
            ))
        })
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str_js_alias(
        formatted_str: &str,
    ) -> Result<AddressableEntityHash, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse AddressableEntityHash from formatted string: {:?}",
                err
            ))
        })
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> AddressableEntityHash {
        let addressable_entity_hash = _AddressableEntityHash::try_from(&bytes)
            .expect("Failed to convert bytes to AddressableEntityHash");
        Self(addressable_entity_hash)
    }
}

impl From<AddressableEntityHash> for _AddressableEntityHash {
    fn from(addressable_entity_hash: AddressableEntityHash) -> Self {
        addressable_entity_hash.0
    }
}

impl From<_AddressableEntityHash> for AddressableEntityHash {
    fn from(addressable_entity_hash: _AddressableEntityHash) -> Self {
        Self(addressable_entity_hash)
    }
}

impl FromBytes for AddressableEntityHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (addressable_entity_hash, remainder) = _AddressableEntityHash::from_bytes(bytes)?;
        Ok((Self(addressable_entity_hash), remainder))
    }
}

impl ToBytes for AddressableEntityHash {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        U8_SERIALIZED_LENGTH + self.0.value().len() * U8_SERIALIZED_LENGTH
    }

    fn write_bytes(&self, bytes: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(bytes)
    }
}

impl From<[u8; 32]> for AddressableEntityHash {
    fn from(bytes: [u8; 32]) -> Self {
        _AddressableEntityHash::from_bytes(&bytes)
            .map(|(hash, _)| hash)
            .expect("Failed to convert bytes to AddressableEntityHash")
            .into()
    }
}

impl From<HashAddr> for AddressableEntityHash {
    fn from(hash_addr: HashAddr) -> Self {
        let bytes = hash_addr.to_bytes();
        let array: [u8; 32] = bytes.try_into().expect("HashAddr must convert to [u8; 32]");
        AddressableEntityHash::from(array)
    }
}

impl From<EntityAddr> for AddressableEntityHash {
    fn from(entity_addr: EntityAddr) -> Self {
        _AddressableEntityHash::new(entity_addr.value().into()).into()
    }
}
