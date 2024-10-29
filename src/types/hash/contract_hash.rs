use crate::types::{hash::addressable_entity_hash::AddressableEntityHash, sdk_error::SdkError};
use casper_types::{
    addressable_entity::CONTRACT_ENTITY_PREFIX,
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    contracts::ContractHash as _ContractHash,
    AddressableEntityHash as _AddressableEntityHash,
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
pub struct ContractHash(_ContractHash);

impl ContractHash {
    pub fn new(contract_hash_hex_str: &str) -> Result<Self, SdkError> {
        let prefixed_input = format!("{}{}", CONTRACT_ENTITY_PREFIX, contract_hash_hex_str);
        Self::from_formatted_str(&prefixed_input)
    }

    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, SdkError> {
        let contract_hash = _ContractHash::from_formatted_str(formatted_str).map_err(|error| {
            SdkError::FailedToParseContractHash {
                context: "ContractHash::from_formatted_str",
                error,
            }
        })?;
        Ok(Self(contract_hash))
    }
}

#[wasm_bindgen]
impl ContractHash {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(contract_hash_hex_str: &str) -> Result<ContractHash, JsError> {
        Self::new(contract_hash_hex_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse ContractHash from hex string: {:?}",
                err
            ))
        })
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str_js_alias(formatted_str: &str) -> Result<ContractHash, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse ContractHash from formatted string: {:?}",
                err
            ))
        })
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> ContractHash {
        let contract_hash =
            _ContractHash::try_from(&bytes).expect("Failed to convert bytes to ContractHash");
        ContractHash(contract_hash)
    }
}

impl From<ContractHash> for _ContractHash {
    fn from(contract_hash: ContractHash) -> Self {
        contract_hash.0
    }
}

impl From<_ContractHash> for ContractHash {
    fn from(contract_hash: _ContractHash) -> Self {
        ContractHash(contract_hash)
    }
}

impl FromBytes for ContractHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (contract_hash, remainder) = _ContractHash::from_bytes(bytes)?;
        Ok((ContractHash(contract_hash), remainder))
    }
}

impl From<ContractHash> for _AddressableEntityHash {
    fn from(contract_hash: ContractHash) -> Self {
        _AddressableEntityHash::new(contract_hash.0.value())
    }
}

impl From<ContractHash> for AddressableEntityHash {
    fn from(contract_hash: ContractHash) -> Self {
        _AddressableEntityHash::new(contract_hash.0.value()).into()
    }
}

impl From<_AddressableEntityHash> for ContractHash {
    fn from(addressable_entity_hash: _AddressableEntityHash) -> Self {
        let bytes = addressable_entity_hash
            .to_bytes()
            .expect("Failed to convert AddressableEntityHash to bytes");
        ContractHash::from_bytes(bytes)
    }
}

impl ToBytes for ContractHash {
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
