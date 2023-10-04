use super::addr::transfer_addr::TransferAddr;
use super::addr::{dictionary_addr::DictionaryAddr, hash_addr::HashAddr, uref_addr::URefAddr};
use super::era_id::EraId;
use super::{account_hash::AccountHash, deploy_hash::DeployHash, uref::URef};
use crate::debug::error;
use crate::types::sdk_error::SdkError;
use casper_types::Key as _Key;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct Key(_Key);

#[wasm_bindgen]
impl Key {
    #[wasm_bindgen(constructor)]
    pub fn new(key: Key) -> Result<Key, JsValue> {
        let key: _Key = key.into();
        Ok(Key(key))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[wasm_bindgen(js_name = "fromURef")]
    pub fn from_uref(key: URef) -> Key {
        Key(_Key::URef(key.into()))
    }

    #[wasm_bindgen(js_name = "fromDeployInfo")]
    pub fn from_deploy_info(key: DeployHash) -> Key {
        Key(_Key::DeployInfo(key.into()))
    }

    #[wasm_bindgen(js_name = "fromAccount")]
    pub fn from_account(key: AccountHash) -> Key {
        Key(_Key::Account(key.into()))
    }

    #[wasm_bindgen]
    #[wasm_bindgen(js_name = "fromHash")]
    pub fn from_hash(key: HashAddr) -> Key {
        Key(_Key::Hash(key.into()))
    }

    #[wasm_bindgen(js_name = "fromTransfer")]
    pub fn from_transfer(key: Vec<u8>) -> TransferAddr {
        // TODO Fix with TransferAddr as _TransferAddr, and [u8; 32]
        // Key(_Key::Transfer(key.into()))
        TransferAddr::from(key)
    }

    #[wasm_bindgen(js_name = "fromEraInfo")]
    pub fn from_era_info(key: EraId) -> Key {
        Key(_Key::EraInfo(key.into()))
    }

    #[wasm_bindgen(js_name = "fromBalance")]
    pub fn from_balance(key: URefAddr) -> Key {
        Key(_Key::Balance(key.into()))
    }

    #[wasm_bindgen(js_name = "fromBid")]
    pub fn from_bid(key: AccountHash) -> Key {
        Key(_Key::Bid(key.into()))
    }

    #[wasm_bindgen(js_name = "fromWithdraw")]
    pub fn from_withdraw(key: AccountHash) -> Key {
        Key(_Key::Withdraw(key.into()))
    }

    #[wasm_bindgen(js_name = "fromDictionaryAddr")]
    pub fn from_dictionary_addr(key: DictionaryAddr) -> Key {
        Key(_Key::Dictionary(key.into()))
    }

    #[wasm_bindgen(js_name = "asDictionaryAddr")]
    pub fn as_dictionary(&self) -> Option<DictionaryAddr> {
        match &self.0 {
            _Key::Dictionary(v) => Some((*v).into()),
            _ => None,
        }
    }

    #[wasm_bindgen(js_name = "fromSystemContractRegistry")]
    pub fn from_system_contract_registry() -> Key {
        Key(_Key::SystemContractRegistry)
    }

    #[wasm_bindgen(js_name = "fromEraSummary")]
    pub fn from_era_summary() -> Key {
        Key(_Key::EraSummary)
    }

    #[wasm_bindgen(js_name = "fromUnbond")]
    pub fn from_unbond(key: AccountHash) -> Key {
        Key(_Key::Unbond(key.into()))
    }

    #[wasm_bindgen(js_name = "fromChainspecRegistry")]
    pub fn from_chainspec_registry() -> Key {
        Key(_Key::ChainspecRegistry)
    }

    #[wasm_bindgen(js_name = "fromChecksumRegistry")]
    pub fn from_checksum_registry() -> Key {
        Key(_Key::ChecksumRegistry)
    }

    #[wasm_bindgen(js_name = "toFormattedString")]
    pub fn to_formatted_string(&self) -> String {
        _Key::to_formatted_string(self.0)
    }

    #[wasm_bindgen(js_name = "fromFormattedString")]
    pub fn from_formatted_str_js_alias(input: JsValue) -> Result<Key, JsValue> {
        let input_string = input.as_string();
        if let Some(input_string) = input_string {
            Key::from_formatted_str(&input_string)
                .map_err(|err| {
                    error(&format!("Error parsing Key from formatted string, {}", err));
                    JsValue::null()
                })
                .map(Into::into)
        } else {
            error("Input is not a string");
            Err(JsValue::null())
        }
    }

    #[wasm_bindgen(js_name = "fromDictionaryKey")]
    pub fn from_dictionary_key(seed_uref: URef, dictionary_item_key: &[u8]) -> Self {
        _Key::dictionary(seed_uref.into(), dictionary_item_key).into()
    }

    #[wasm_bindgen(js_name = "isDictionaryKey")]
    pub fn is_dictionary_key(&self) -> bool {
        matches!(&self.0, _Key::Dictionary(_))
    }

    #[wasm_bindgen(js_name = "intoAccount")]
    pub fn into_account(self) -> Option<AccountHash> {
        match self.0 {
            _Key::Account(bytes) => Some(bytes.into()),
            _ => None,
        }
    }

    #[wasm_bindgen(js_name = "intoHash")]
    pub fn into_hash(self) -> Option<HashAddr> {
        match self.0 {
            _Key::Hash(hash) => Some(hash.into()),
            _ => None,
        }
    }

    #[wasm_bindgen(js_name = "asBalance")]
    pub fn as_balance(&self) -> Option<URefAddr> {
        match &self.0 {
            _Key::Balance(v) => Some((*v).into()),
            _ => None,
        }
    }

    #[wasm_bindgen(js_name = "intoURef")]
    pub fn into_uref(self) -> Option<URef> {
        match self.0 {
            _Key::URef(uref) => Some(uref.into()),
            _ => None,
        }
    }

    #[wasm_bindgen(js_name = "urefToHash")]
    pub fn uref_to_hash(&self) -> Option<Key> {
        if let _Key::URef(uref) = &self.0 {
            let addr = uref.addr();
            return Some(Key(_Key::Hash(addr)));
        }
        None
    }

    #[wasm_bindgen(js_name = "withdrawToUnbond")]
    pub fn withdraw_to_unbond(&self) -> Option<Key> {
        if let _Key::Withdraw(account_hash) = &self.0 {
            return Some(Key(_Key::Unbond(*account_hash)));
        }
        None
    }
}

impl Key {
    pub fn from_formatted_str(input: &str) -> Result<Key, SdkError> {
        _Key::from_formatted_str(input)
            .map(Into::into)
            .map_err(|error| SdkError::FailedToParseKey {
                context: "Key from formatted string",
                error,
            })
    }
}

impl From<Key> for _Key {
    fn from(key: Key) -> Self {
        key.0
    }
}

impl From<_Key> for Key {
    fn from(key: _Key) -> Self {
        Key(key)
    }
}
