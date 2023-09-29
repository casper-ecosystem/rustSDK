use super::digest::Digest;
use crate::debug::error;
use casper_client::types::BlockHash as _BlockHash;
use casper_hashing::Digest as _Digest;
use gloo_utils::format::JsValueSerdeExt;
use hex::decode;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct BlockHash(_BlockHash);

#[wasm_bindgen]
impl BlockHash {
    #[wasm_bindgen(constructor)]
    pub fn new(block_hash_hex_str: &str) -> Result<BlockHash, JsValue> {
        let bytes = decode(block_hash_hex_str)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_digest(Digest::from(hash))
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest(digest: Digest) -> Result<BlockHash, JsValue> {
        Ok(_BlockHash::new(digest.into()).into())
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_name(&self) -> String {
        self.to_string()
    }
}

impl ToString for BlockHash {
    fn to_string(&self) -> String {
        hex::encode(self.0)
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
