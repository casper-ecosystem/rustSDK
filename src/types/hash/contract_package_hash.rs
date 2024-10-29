use crate::types::sdk_error::SdkError;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    contracts::ContractPackageHash as _ContractPackageHash,
    PackageHash,
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
pub struct ContractPackageHash(_ContractPackageHash);

impl ContractPackageHash {
    pub fn new(contract_package_hash_hex_str: &str) -> Result<Self, SdkError> {
        let prefixed_input = format!("contract-package-{}", contract_package_hash_hex_str);
        Self::from_formatted_str(&prefixed_input)
    }

    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, SdkError> {
        let contract_package_hash = _ContractPackageHash::from_formatted_str(formatted_str)
            .map_err(|error| SdkError::FailedToParseContractPackageHash {
                context: "ContractPackageHash::from_formatted_str",
                error,
            })?;
        Ok(Self(contract_package_hash))
    }
}

#[wasm_bindgen]
impl ContractPackageHash {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(
        contract_package_hash_hex_str: &str,
    ) -> Result<ContractPackageHash, JsError> {
        Self::new(contract_package_hash_hex_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse ContractPackageHash from hex string: {:?}",
                err
            ))
        })
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str_js_alias(
        formatted_str: &str,
    ) -> Result<ContractPackageHash, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse ContractPackageHash from formatted string: {:?}",
                err
            ))
        })
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> ContractPackageHash {
        let contract_package_hash = _ContractPackageHash::try_from(&bytes)
            .expect("Failed to convert bytes to ContractPackageHash");
        ContractPackageHash(contract_package_hash)
    }
}

impl From<ContractPackageHash> for _ContractPackageHash {
    fn from(contract_package_hash: ContractPackageHash) -> Self {
        contract_package_hash.0
    }
}

impl From<_ContractPackageHash> for ContractPackageHash {
    fn from(contract_package_hash: _ContractPackageHash) -> Self {
        ContractPackageHash(contract_package_hash)
    }
}

impl FromBytes for ContractPackageHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (contract_package_hash, remainder) = _ContractPackageHash::from_bytes(bytes)?;
        Ok((ContractPackageHash(contract_package_hash), remainder))
    }
}

impl From<ContractPackageHash> for PackageHash {
    fn from(contract_package_hash: ContractPackageHash) -> Self {
        PackageHash::new(contract_package_hash.0.value())
    }
}

impl From<PackageHash> for ContractPackageHash {
    fn from(addressable_entity_hash: PackageHash) -> Self {
        let bytes = addressable_entity_hash
            .to_bytes()
            .expect("Failed to convert PackageHash to bytes");
        ContractPackageHash::from_bytes(bytes)
    }
}

impl ToBytes for ContractPackageHash {
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
