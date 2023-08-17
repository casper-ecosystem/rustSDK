use super::public_key::PublicKey;
use crate::debug::error;
use casper_types::{
    account::AccountHash as _AccountHash,
    bytesrepr::{self, FromBytes, ToBytes, U8_SERIALIZED_LENGTH},
    crypto,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct AccountHash(_AccountHash);

#[wasm_bindgen]
impl AccountHash {
    #[wasm_bindgen(constructor)]
    pub fn new(account_hash_hex_str: &str) -> Result<AccountHash, JsValue> {
        let account_hash = _AccountHash::from_formatted_str(account_hash_hex_str)
            .map_err(|err| error(&format!("Failed to parse AccountHash: {:?}", err)))
            .unwrap();
        Ok(AccountHash(account_hash))
    }

    #[wasm_bindgen]
    pub fn from_public_key(public_key: PublicKey) -> AccountHash {
        let account_hash = _AccountHash::from_public_key(&(public_key.into()), crypto::blake2b);
        AccountHash(account_hash)
    }

    #[wasm_bindgen(js_name = fromFormattedStr)]
    pub fn from_formatted_str(input: &str) -> Result<AccountHash, JsValue> {
        let account_hash = _AccountHash::from_formatted_str(input)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse AccountHash from formatted string: {:?}",
                    err
                ))
            })
            .unwrap();
        Ok(AccountHash(account_hash))
    }

    #[wasm_bindgen(js_name = toFormattedString)]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[wasm_bindgen(js_name = "fromUint8Array")]
    pub fn from_bytes(bytes: Vec<u8>) -> AccountHash {
        let account_hash =
            _AccountHash::try_from(&bytes).expect("Failed to convert bytes to AccountHash");
        AccountHash(account_hash)
    }
}

impl From<AccountHash> for _AccountHash {
    fn from(account_hash: AccountHash) -> Self {
        account_hash.0
    }
}

impl From<_AccountHash> for AccountHash {
    fn from(account_hash: _AccountHash) -> Self {
        AccountHash(account_hash)
    }
}

impl FromBytes for AccountHash {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        let (account_hash, remainder) = _AccountHash::from_bytes(bytes)?;
        Ok((AccountHash(account_hash), remainder))
    }
}

impl ToBytes for AccountHash {
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
