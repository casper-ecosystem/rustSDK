use core::fmt;

use crate::types::hash::block_hash::BlockHash;
use casper_client::rpcs::common::BlockIdentifier as _BlockIdentifier;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize, Copy)]
#[wasm_bindgen]
pub struct BlockIdentifier(_BlockIdentifier);

#[wasm_bindgen]
impl BlockIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(block_identifier: BlockIdentifier) -> Self {
        block_identifier
    }

    pub fn from_hash(hash: BlockHash) -> Self {
        Self(_BlockIdentifier::Hash(hash.into()))
    }

    #[wasm_bindgen(js_name = "fromHeight")]
    pub fn from_height(height: u64) -> Self {
        Self(_BlockIdentifier::Height(height))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<BlockIdentifier> for _BlockIdentifier {
    fn from(block_identifier: BlockIdentifier) -> Self {
        block_identifier.0
    }
}

impl From<_BlockIdentifier> for BlockIdentifier {
    fn from(block_identifier: _BlockIdentifier) -> Self {
        BlockIdentifier(block_identifier)
    }
}

impl fmt::Display for BlockIdentifierInput {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            BlockIdentifierInput::BlockIdentifier(identifier) => match identifier.0 {
                _BlockIdentifier::Hash(ref hash) => write!(f, "{}", hash),
                _BlockIdentifier::Height(height) => write!(f, "{}", height),
            },
            BlockIdentifierInput::String(ref value) => write!(f, "{}", value),
        }
    }
}

#[derive(Debug, Clone)]
pub enum BlockIdentifierInput {
    BlockIdentifier(BlockIdentifier),
    String(String),
}
