use crate::types::{public_key::PublicKey, sdk_error::SdkError};
use blake2::{
    digest::{Update, VariableOutput},
    Blake2bVar,
};
use casper_types::account::ACCOUNT_HASH_LENGTH;
use casper_types::BLAKE2B_DIGEST_LENGTH;
use casper_types::{
    account::AccountHash as _AccountHash,
    bytesrepr::{self, FromBytes, ToBytes},
};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize, Ord, PartialOrd, Eq, PartialEq)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct AccountHash(_AccountHash);

impl AccountHash {
    pub fn new(account_hash_hex_str: &str) -> Result<Self, Box<SdkError>> {
        hex::decode(account_hash_hex_str)
            .map(|bytes| {
                if bytes.len() != ACCOUNT_HASH_LENGTH {
                    Err(Box::new(SdkError::FailedToParseAccountHashLength {
                        context: "AccountHash::new",
                    }))
                } else {
                    let mut array = [0u8; ACCOUNT_HASH_LENGTH];
                    array.copy_from_slice(&bytes);
                    Ok(_AccountHash(array).into())
                }
            })
            .map_err(|err| {
                Box::new(SdkError::FailedToDecodeHex {
                    context: "AccountHash::new",
                    error: format!("{err:?}"),
                })
            })?
    }

    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, Box<SdkError>> {
        let account_hash = _AccountHash::from_formatted_str(formatted_str).map_err(|error| {
            Box::new(SdkError::FailedToParseAccountHash {
                context: "AccountHash::from_formatted_str",
                error,
            })
        })?;
        Ok(Self(account_hash))
    }

    fn custom_blake2b<T: AsRef<[u8]>>(data: T) -> [u8; BLAKE2B_DIGEST_LENGTH] {
        let mut result = [0u8; BLAKE2B_DIGEST_LENGTH];
        let mut hasher = Blake2bVar::new(BLAKE2B_DIGEST_LENGTH)
            .expect("Failed to create Blake2b hasher with the specified length");

        hasher.update(data.as_ref());
        hasher
            .finalize_variable(&mut result)
            .expect("Failed to finalize Blake2b hash");
        result
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl AccountHash {
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new_js_alias(account_hash_hex_str: &str) -> Result<AccountHash, JsError> {
        Self::new(account_hash_hex_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse AccountHash from hex string: {err:?}"
            ))
        })
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromFormattedStr"))]
    pub fn from_formatted_str_js_alias(formatted_str: &str) -> Result<AccountHash, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse AccountHash from formatted string: {err:?}"
            ))
        })
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromPublicKey"))]
    pub fn from_public_key(public_key: PublicKey) -> AccountHash {
        let account_hash =
            _AccountHash::from_public_key(&(public_key.into()), Self::custom_blake2b);
        Self(account_hash)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toFormattedString"))]
    pub fn to_formatted_string(&self) -> String {
        self.0.to_formatted_string()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toHexString"))]
    pub fn to_hex_string(&self) -> String {
        self.0.to_string()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromUint8Array"))]
    pub fn from_bytes(bytes: Vec<u8>) -> AccountHash {
        let account_hash =
            _AccountHash::try_from(&bytes).expect("Failed to convert bytes to AccountHash");
        Self(account_hash)
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<Vec<u8>> for AccountHash {
    fn from(bytes: Vec<u8>) -> Self {
        let mut array = [0u8; ACCOUNT_HASH_LENGTH];
        array.copy_from_slice(&bytes);
        AccountHash(_AccountHash::new(array))
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
        self.0.serialized_length()
    }

    fn write_bytes(&self, bytes: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
        self.0.write_bytes(bytes)
    }
}
