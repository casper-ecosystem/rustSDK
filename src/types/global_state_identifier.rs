use super::{block_hash::BlockHash, digest::Digest};
use casper_client::rpcs::GlobalStateIdentifier as _GlobalStateIdentifier;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GlobalStateIdentifier(_GlobalStateIdentifier);

#[wasm_bindgen]
impl GlobalStateIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(global_state_identifier: GlobalStateIdentifier) -> GlobalStateIdentifier {
        global_state_identifier
    }

    #[wasm_bindgen(js_name = "fromBlockHash")]
    pub fn from_block_hash(block_hash: BlockHash) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHash(block_hash.into()))
    }

    #[wasm_bindgen(js_name = "fromBlockHeight")]
    pub fn from_block_height(block_height: u64) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::BlockHeight(block_height))
    }

    #[wasm_bindgen(js_name = "fromStateRootHash")]
    pub fn from_state_root_hash(state_root_hash: Digest) -> GlobalStateIdentifier {
        GlobalStateIdentifier(_GlobalStateIdentifier::StateRootHash(
            state_root_hash.into(),
        ))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<GlobalStateIdentifier> for _GlobalStateIdentifier {
    fn from(global_state_identifier: GlobalStateIdentifier) -> Self {
        global_state_identifier.0
    }
}

impl From<_GlobalStateIdentifier> for GlobalStateIdentifier {
    fn from(identifier: _GlobalStateIdentifier) -> Self {
        GlobalStateIdentifier(identifier)
    }
}
