use crate::types::{hash::account_hash::AccountHash, public_key::PublicKey, uref::URef};
use casper_client::rpcs::PurseIdentifier as _PurseIdentifier;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use std::fmt;
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct PurseIdentifier(_PurseIdentifier);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl PurseIdentifier {
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromPublicKey"))]
    pub fn from_main_purse_under_public_key(key: PublicKey) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderPublicKey(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromAccountHash"))]
    pub fn from_main_purse_under_account_hash(account_hash: AccountHash) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(
            account_hash.into(),
        ))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromURef"))]
    pub fn from_purse_uref(uref: URef) -> Self {
        PurseIdentifier(_PurseIdentifier::PurseUref(uref.into()))
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl fmt::Display for PurseIdentifier {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match &self.0 {
            _PurseIdentifier::MainPurseUnderPublicKey(key) => {
                write!(f, "{}", PublicKey::from(key.clone()))
            }
            _PurseIdentifier::MainPurseUnderAccountHash(hash) => write!(f, "{hash}"),
            _PurseIdentifier::PurseUref(uref) => write!(f, "{uref}"),
            _PurseIdentifier::MainPurseUnderEntityAddr(entity_addr) => write!(f, "{entity_addr}"),
        }
    }
}

impl From<PurseIdentifier> for PublicKey {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        match purse_identifier {
            PurseIdentifier(_PurseIdentifier::MainPurseUnderPublicKey(key)) => key.into(),
            _ => unimplemented!("Conversion not implemented for PurseIdentifier to Key"),
        }
    }
}

impl From<PurseIdentifier> for _PurseIdentifier {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        purse_identifier.0
    }
}

impl From<_PurseIdentifier> for PurseIdentifier {
    fn from(purse_identifier: _PurseIdentifier) -> Self {
        PurseIdentifier(purse_identifier)
    }
}

impl From<PurseIdentifier> for AccountHash {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        match purse_identifier {
            PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(account_hash)) => {
                account_hash.into()
            }
            _ => unimplemented!("Conversion not implemented for PurseIdentifier to AccountHash"),
        }
    }
}

impl From<PurseIdentifier> for URef {
    fn from(purse_identifier: PurseIdentifier) -> Self {
        match purse_identifier {
            PurseIdentifier(_PurseIdentifier::PurseUref(uref)) => uref.into(),
            _ => unimplemented!("Conversion not implemented for PurseIdentifier to URef"),
        }
    }
}

impl From<PublicKey> for PurseIdentifier {
    fn from(key: PublicKey) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderPublicKey(key.into()))
    }
}

impl From<AccountHash> for PurseIdentifier {
    fn from(account_hash: AccountHash) -> Self {
        PurseIdentifier(_PurseIdentifier::MainPurseUnderAccountHash(
            account_hash.into(),
        ))
    }
}

impl From<URef> for PurseIdentifier {
    fn from(uref: URef) -> Self {
        PurseIdentifier(_PurseIdentifier::PurseUref(uref.into()))
    }
}
