use crate::types::{digest::Digest, sdk_error::SdkError};
use casper_types::{BlockHash as _BlockHash, Digest as _Digest};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct BlockHash(_BlockHash);

impl BlockHash {
    pub fn new(deploy_hash_hex_str: &str) -> Result<BlockHash, SdkError> {
        let bytes =
            hex::decode(deploy_hash_hex_str).map_err(|err| SdkError::FailedToDecodeHex {
                context: "BlockHash::new",
                error: format!("Decoding hex string {:?}", err),
            })?;
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_digest(Digest::from(hash))
    }

    pub fn from_digest(digest: Digest) -> Result<BlockHash, SdkError> {
        Ok(_BlockHash::new(digest.into()).into())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl BlockHash {
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(block_hash_hex_str: &str) -> Result<BlockHash, JsError> {
        Self::new(block_hash_hex_str).map_err(Into::into)
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest_js_alias(digest: Digest) -> Result<BlockHash, JsError> {
        Self::from_digest(digest).map_err(Into::into)
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for BlockHash {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", hex::encode(self.0))
    }
}

impl From<BlockHash> for _BlockHash {
    fn from(block_hash: BlockHash) -> Self {
        block_hash.0
    }
}

impl From<_BlockHash> for BlockHash {
    fn from(block_hash: _BlockHash) -> Self {
        BlockHash(block_hash)
    }
}

impl From<Digest> for BlockHash {
    fn from(digest: Digest) -> Self {
        _BlockHash::new(digest.into()).into()
    }
}
