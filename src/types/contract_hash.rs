use crate::debug::error;
use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    ContractHash as _ContractHash,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug)]
pub struct ContractHash(_ContractHash);

#[wasm_bindgen]
impl ContractHash {
    #[wasm_bindgen(constructor)]
    #[wasm_bindgen(js_name = "fromString")]
    pub fn new(input: &str) -> Result<ContractHash, JsValue> {
        let prefixed_input = format!("contract-{}", input);
        ContractHash::from_formatted_str(&prefixed_input)
    }

    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(input: &str) -> Result<ContractHash, JsValue> {
        let contract_hash = _ContractHash::from_formatted_str(input)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse ContractHash from formatted string: {:?}",
                    err
                ))
            })
            .unwrap();
        Ok(ContractHash(contract_hash))
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
