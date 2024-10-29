use crate::types::{digest::Digest, sdk_error::SdkError};
use casper_types::{DeployHash as _DeployHash, Digest as _Digest};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct DeployHash(_DeployHash);

impl DeployHash {
    pub fn new(deploy_hash_hex_str: &str) -> Result<DeployHash, SdkError> {
        let bytes =
            hex::decode(deploy_hash_hex_str).map_err(|err| SdkError::FailedToDecodeHex {
                context: "DeployHash::new",
                error: format!("Decoding hex string {:?}", err),
            })?;
        let mut hash = [0u8; _Digest::LENGTH];
        hash.copy_from_slice(&bytes);
        Self::from_digest(Digest::from(hash))
    }

    pub fn from_digest(digest: Digest) -> Result<DeployHash, SdkError> {
        Ok(_DeployHash::new(digest.into()).into())
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl DeployHash {
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(deploy_hash_hex_str: &str) -> Result<DeployHash, JsError> {
        Self::new(deploy_hash_hex_str).map_err(Into::into)
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest_js_alias(digest: Digest) -> Result<DeployHash, JsError> {
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
        _DeployHash::new(digest.into()).into()
    }
}
