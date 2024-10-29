use crate::types::sdk_error::SdkError;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    PackageAddr, PackageHash as _PackageHash,
};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
pub struct PackageHash(_PackageHash);

impl PackageHash {
    pub fn new(package_hash_hex_str: &str) -> Result<Self, SdkError> {
        let prefixed_input = format!("package-{}", package_hash_hex_str);
        Self::from_formatted_str(&prefixed_input)
    }

    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, SdkError> {
        let package_hash = _PackageHash::from_formatted_str(formatted_str).map_err(|error| {
            SdkError::FailedToParsePackageHash {
                context: "PackageHash::from_formatted_str",
                error,
            }
        })?;
        Ok(Self(package_hash))
    }
}

#[wasm_bindgen]
impl PackageHash {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(package_hash_hex_str: &str) -> Result<PackageHash, JsError> {
        Self::new(package_hash_hex_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse PackageHash from hex string: {:?}",
                err
            ))
        })
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str_js_alias(formatted_str: &str) -> Result<PackageHash, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse PackageHash from formatted string: {:?}",
                err
            ))
        })
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> PackageHash {
        let package_hash =
            _PackageHash::try_from(&bytes).expect("Failed to convert bytes to PackageHash");
        Self(package_hash)
    }
}

impl From<PackageHash> for _PackageHash {
    fn from(package_hash: PackageHash) -> Self {
        package_hash.0
    }
}

impl From<_PackageHash> for PackageHash {
    fn from(package_hash: _PackageHash) -> Self {
        Self(package_hash)
    }
}

impl FromBytes for PackageHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (package_hash, remainder) = _PackageHash::from_bytes(bytes)?;
        Ok((Self(package_hash), remainder))
    }
}

impl ToBytes for PackageHash {
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

impl From<PackageAddr> for PackageHash {
    fn from(bytes: PackageAddr) -> Self {
        _PackageHash::from_bytes(&bytes)
            .map(|(hash, _)| hash)
            .expect("Failed to convert bytes to PackageHash")
            .into()
    }
}
