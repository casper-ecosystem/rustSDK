use crate::types::{hash::account_hash::AccountHash, public_key::PublicKey, sdk_error::SdkError};
use casper_client::rpcs::AccountIdentifier as _AccountIdentifier;
use casper_types::account::ACCOUNT_HASH_FORMATTED_STRING_PREFIX;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct AccountIdentifier(_AccountIdentifier);

#[deprecated(note = "prefer 'EntityIdentifier'")]
#[allow(deprecated)]
impl AccountIdentifier {
    pub fn from_formatted_str(formatted_str: &str) -> Result<Self, SdkError> {
        if formatted_str.contains(ACCOUNT_HASH_FORMATTED_STRING_PREFIX) {
            let account_hash = AccountHash::from_formatted_str(formatted_str)?;
            Ok(Self::from_account_under_account_hash(account_hash))
        } else {
            let public_key = PublicKey::new(formatted_str)?;
            Ok(Self::from_account_under_public_key(public_key))
        }
    }
}

#[wasm_bindgen]
#[deprecated(note = "prefer 'EntityIdentifier'")]
#[allow(deprecated)]
impl AccountIdentifier {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(formatted_str: &str) -> Result<AccountIdentifier, JsError> {
        Self::from_formatted_str_js_alias(formatted_str)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str_js_alias(formatted_str: &str) -> Result<AccountIdentifier, JsError> {
        Self::from_formatted_str(formatted_str).map_err(|err| {
            JsError::new(&format!(
                "Failed to parse AccountIdentifier from formatted string: {:?}",
                err
            ))
        })
    }

    #[wasm_bindgen(js_name = "fromPublicKey")]
    pub fn from_account_under_public_key(key: PublicKey) -> Self {
        Self(_AccountIdentifier::PublicKey(key.into()))
    }

    #[wasm_bindgen(js_name = "fromAccountHash")]
    pub fn from_account_under_account_hash(account_hash: AccountHash) -> Self {
        Self(_AccountIdentifier::AccountHash(account_hash.into()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl fmt::Display for AccountIdentifier {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match &self.0 {
            _AccountIdentifier::PublicKey(key) => write!(f, "{}", PublicKey::from(key.clone())),
            _AccountIdentifier::AccountHash(hash) => write!(f, "{}", hash.to_formatted_string()),
        }
    }
}

impl From<AccountIdentifier> for PublicKey {
    fn from(account_identifier: AccountIdentifier) -> Self {
        match account_identifier {
            AccountIdentifier(_AccountIdentifier::PublicKey(key)) => key.into(),
            _ => unimplemented!("Conversion not implemented for AccountIdentifier to Key"),
        }
    }
}

impl From<AccountIdentifier> for _AccountIdentifier {
    fn from(account_identifier: AccountIdentifier) -> Self {
        account_identifier.0
    }
}

impl From<_AccountIdentifier> for AccountIdentifier {
    fn from(account_identifier: _AccountIdentifier) -> Self {
        AccountIdentifier(account_identifier)
    }
}

impl From<AccountIdentifier> for AccountHash {
    fn from(account_identifier: AccountIdentifier) -> Self {
        match account_identifier {
            AccountIdentifier(_AccountIdentifier::AccountHash(account_hash)) => account_hash.into(),
            _ => unimplemented!("Conversion not implemented for AccountIdentifier to AccountHash"),
        }
    }
}

impl From<PublicKey> for AccountIdentifier {
    fn from(key: PublicKey) -> Self {
        AccountIdentifier(_AccountIdentifier::PublicKey(key.into()))
    }
}

impl From<AccountHash> for AccountIdentifier {
    fn from(account_hash: AccountHash) -> Self {
        AccountIdentifier(_AccountIdentifier::AccountHash(account_hash.into()))
    }
}
