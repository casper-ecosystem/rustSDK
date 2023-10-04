use super::{account_hash::AccountHash, public_key::PublicKey};
use casper_client::rpcs::AccountIdentifier as _AccountIdentifier;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct AccountIdentifier(_AccountIdentifier);

#[wasm_bindgen]
impl AccountIdentifier {
    #[wasm_bindgen(constructor)]
    pub fn new(formatted_str: &str) -> Result<AccountIdentifier, JsValue> {
        Self::from_formatted_str(formatted_str)
    }

    #[wasm_bindgen(js_name = "fromFormattedStr")]
    pub fn from_formatted_str(formatted_str: &str) -> Result<AccountIdentifier, JsValue> {
        if formatted_str.contains("account-hash") {
            let account_hash = AccountHash::from_formatted_str(formatted_str)?;
            Ok(Self::from_account_under_account_hash(account_hash))
        } else {
            let public_key = PublicKey::new(formatted_str)?;
            Ok(Self::from_account_account_under_public_key(public_key))
        }
    }

    #[wasm_bindgen(js_name = "fromPublicKey")]
    pub fn from_account_account_under_public_key(key: PublicKey) -> Self {
        AccountIdentifier(_AccountIdentifier::PublicKey(key.into()))
    }

    #[wasm_bindgen(js_name = "fromAccountHash")]
    pub fn from_account_under_account_hash(account_hash: AccountHash) -> Self {
        AccountIdentifier(_AccountIdentifier::AccountHash(account_hash.into()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl ToString for AccountIdentifier {
    fn to_string(&self) -> String {
        match &self.0 {
            // TODO fix PublicKey to string not short version
            _AccountIdentifier::PublicKey(key) => PublicKey::from(key.clone()).to_string(),
            _AccountIdentifier::AccountHash(hash) => hash.to_formatted_string(),
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
