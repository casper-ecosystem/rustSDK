use super::digest::Digest;
use crate::debug::error;
use casper_hashing::Digest as _Digest;
use casper_types::{DeployHash as _DeployHash, DEPLOY_HASH_LENGTH};
// Both Node and client exposes DeployHash
use casper_client::types::DeployHash as _DeployHashClient;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use hex::decode;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct DeployHash(_DeployHash);

#[wasm_bindgen]
impl DeployHash {
    #[wasm_bindgen(constructor)]
    pub fn new(deploy_hash_hex_str: &str) -> Result<DeployHash, JsValue> {
        let bytes = decode(deploy_hash_hex_str)
            .map_err(|err| error(&format!("{:?}", err)))
            .unwrap();
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_digest(Digest::from(hash))
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest(digest: Digest) -> Result<DeployHash, JsValue> {
        let mut hash_bytes = [0u8; DEPLOY_HASH_LENGTH];
        let digest_bytes: &[u8] = digest.as_ref();
        hash_bytes.copy_from_slice(&digest_bytes[..DEPLOY_HASH_LENGTH]);
        Ok(_DeployHash::new(hash_bytes).into())
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

impl fmt::Display for DeployHash {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", hex::encode(self.0))
    }
}

impl From<DeployHash> for _DeployHash {
    fn from(deploy_hash: DeployHash) -> Self {
        deploy_hash.0
    }
}

impl From<_DeployHash> for DeployHash {
    fn from(deploy_hash: _DeployHash) -> Self {
        DeployHash(deploy_hash)
    }
}

impl From<Digest> for DeployHash {
    fn from(digest: Digest) -> Self {
        let mut hash_bytes = [0u8; DEPLOY_HASH_LENGTH];
        let digest_bytes: &[u8] = digest.as_ref();
        hash_bytes.copy_from_slice(&digest_bytes[..DEPLOY_HASH_LENGTH]);
        _DeployHash::new(hash_bytes).into()
    }
}

// Both Node and Client expose DeployHash but differently
impl From<DeployHash> for _DeployHashClient {
    fn from(deploy_hash: DeployHash) -> Self {
        let mut bytes: [u8; DEPLOY_HASH_LENGTH] = [0; DEPLOY_HASH_LENGTH];
        bytes.copy_from_slice(deploy_hash.0.as_ref());
        let digest = Digest::from_digest(bytes.to_vec()).unwrap();
        _DeployHashClient::new(digest.into())
    }
}

impl From<_DeployHashClient> for DeployHash {
    fn from(deploy_hash: _DeployHashClient) -> Self {
        let digest = deploy_hash.inner();
        let deploy_hash = _DeployHash::new(digest.into());
        DeployHash(deploy_hash)
    }
}
