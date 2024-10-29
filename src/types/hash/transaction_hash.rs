use crate::types::{digest::Digest, sdk_error::SdkError};
use casper_types::{Digest as _Digest, DigestError, TransactionHash as _TransactionHash};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct TransactionHash(_TransactionHash);

impl TransactionHash {
    pub fn new(transaction_hash_hex_str: &str) -> Result<Self, SdkError> {
        let bytes =
            hex::decode(transaction_hash_hex_str).map_err(|err| SdkError::FailedToDecodeHex {
                context: "TransactionHash::new",
                error: format!("{}", err),
            })?;

        Self::from_raw(&bytes)
    }

    pub fn from_raw(bytes: &[u8]) -> Result<Self, SdkError> {
        if bytes.len() != _Digest::LENGTH {
            return Err(SdkError::FailedToParseDigest {
                context: "TransactionHash::from_raw".to_string(),
                error: DigestError::IncorrectDigestLength(bytes.len()),
            });
        }

        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(bytes);
        Ok(Self(_TransactionHash::from_raw(hash)))
    }

    pub fn digest(&self) -> Result<Digest, SdkError> {
        Ok(self.0.digest().into())
    }
}

#[wasm_bindgen]
impl TransactionHash {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(transaction_hash_hex_str: &str) -> Result<TransactionHash, JsError> {
        TransactionHash::new(transaction_hash_hex_str)
            .map_err(|err| JsError::new(&format!("{:?}", err)))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromRaw")]
    pub fn from_raw_js_alias(bytes: &[u8]) -> Result<TransactionHash, JsError> {
        TransactionHash::from_raw(bytes).map_err(|err| JsError::new(&format!("{:?}", err)))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "digest")]
    pub fn digest_js_alias(&self) -> Result<Digest, JsError> {
        self.digest()
            .map_err(|err| JsError::new(&format!("{:?}", err)))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for TransactionHash {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", hex::encode(self.0))
    }
}

impl From<TransactionHash> for _TransactionHash {
    fn from(transaction_hash: TransactionHash) -> Self {
        transaction_hash.0
    }
}

impl From<_TransactionHash> for TransactionHash {
    fn from(transaction_hash: _TransactionHash) -> Self {
        TransactionHash(transaction_hash)
    }
}
