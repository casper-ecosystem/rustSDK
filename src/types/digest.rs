use super::sdk_error::SdkError;
use crate::debug::error;
use base16::DecodeError;
use casper_hashing::{Digest as _Digest, Error as DigestError};
use casper_types::bytesrepr::{self, FromBytes, ToBytes};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Deserialize, Serialize)]
#[wasm_bindgen]
pub struct Digest(_Digest);

#[wasm_bindgen]
impl Digest {
    #[wasm_bindgen(constructor)]
    #[wasm_bindgen(js_name = "new")]
    pub fn new_js_alias(digest_hex_str: &str) -> Result<Digest, JsValue> {
        Self::from_string(digest_hex_str)
    }

    #[wasm_bindgen(js_name = "fromString")]
    pub fn from_string(digest_hex_str: &str) -> Result<Digest, JsValue> {
        Ok(Digest::from(digest_hex_str))
    }

    #[wasm_bindgen(js_name = "fromDigest")]
    pub fn from_digest_js_alias(bytes: Vec<u8>) -> Result<Digest, JsValue> {
        Self::from_digest(bytes).map_err(|err| {
            error(&format!("Failed to parse digest from digest {}", err));
            JsValue::from_str(&format!("{:?}", err))
        })
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_name(&self) -> String {
        self.to_string()
    }
}

impl Digest {
    pub fn new(digest_hex_str: &str) -> Result<Digest, SdkError> {
        Ok(Digest::from(digest_hex_str))
    }

    pub fn from_digest(bytes: Vec<u8>) -> Result<Digest, SdkError> {
        let hex_string = hex::encode(bytes);
        Ok(Digest::from(&hex_string[..]))
    }
}

impl AsRef<[u8]> for Digest {
    fn as_ref(&self) -> &[u8] {
        self.0.as_ref()
    }
}

impl ToString for Digest {
    fn to_string(&self) -> String {
        hex::encode(self.0)
    }
}

impl From<Digest> for _Digest {
    fn from(digest: Digest) -> Self {
        digest.0
    }
}

impl From<_Digest> for Digest {
    fn from(digest: _Digest) -> Self {
        Digest(digest)
    }
}

impl ToBytes for Digest {
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

impl FromBytes for Digest {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        _Digest::from_bytes(bytes).map(|(digest, remainder)| (Digest(digest), remainder))
    }
}

impl From<[u8; _Digest::LENGTH]> for Digest {
    fn from(bytes: [u8; _Digest::LENGTH]) -> Self {
        let digest = _Digest::try_from(bytes).unwrap();
        Digest(digest)
    }
}

impl From<&str> for Digest {
    fn from(s: &str) -> Self {
        let bytes = hex::decode(s)
            .map_err(|err| {
                let context = format!("Decoding hex string {:?}", err);
                let base16_err = DecodeError::InvalidByte {
                    byte: 0,  // TODO Fix error
                    index: 0, // Set the index to 0 or a relevant value here
                };
                let error = DigestError::Base16DecodeError(base16_err);
                SdkError::FailedToParseDigest { context, error }
            })
            .unwrap_or_default();

        if bytes.len() != _Digest::LENGTH {
            let context = "Invalid Digest length";
            let error = DigestError::IncorrectDigestLength(bytes.len());
            let sdk_error = SdkError::FailedToParseDigest {
                context: context.to_string(),
                error,
            };
            // TODO remove this unreachable
            unreachable!("{:?}", sdk_error);
        }

        let mut digest_bytes = [0u8; _Digest::LENGTH];
        digest_bytes.copy_from_slice(&bytes);
        Digest(_Digest::from(digest_bytes))
    }
}

pub trait ToDigest {
    fn to_digest(&self) -> Digest;
    fn is_empty(&self) -> bool;
}

impl ToDigest for Digest {
    fn to_digest(&self) -> Digest {
        self.0.into()
    }
    fn is_empty(&self) -> bool {
        hex::encode(self.0).is_empty()
    }
}

impl ToDigest for &str {
    fn to_digest(&self) -> Digest {
        Digest::from(*self)
    }
    fn is_empty(&self) -> bool {
        self.trim().is_empty()
    }
}
