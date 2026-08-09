use crate::types::{
    addr::{
        dictionary_addr::DictionaryAddr, hash_addr::HashAddr, transfer_addr::TransferAddr,
        uref_addr::URefAddr,
    },
    era_id::EraId,
    hash::{account_hash::AccountHash, deploy_hash::DeployHash},
    sdk_error::SdkError,
    uref::URef,
};
use casper_types::{bytesrepr::ToBytes, Key as _Key};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct Key(_Key);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl Key {
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    #[cfg(feature = "js")]
    pub fn new(key: Key) -> Result<Key, JsError> {
        let key: _Key = key.into();
        Ok(Key(key))
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromURef"))]
    pub fn from_uref(key: URef) -> Self {
        Self(_Key::URef(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromDeployInfo"))]
    pub fn from_deploy_info(key: DeployHash) -> Self {
        Self(_Key::DeployInfo(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromAccount"))]
    pub fn from_account(key: AccountHash) -> Self {
        Self(_Key::Account(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromHash"))]
    pub fn from_hash(key: HashAddr) -> Self {
        Self(_Key::Hash(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromTransfer"))]
    pub fn from_transfer(key: Vec<u8>) -> Self {
        Self(_Key::Transfer(TransferAddr::from(key).into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromEraInfo"))]
    pub fn from_era_info(key: EraId) -> Self {
        Self(_Key::EraInfo(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromBalance"))]
    pub fn from_balance(key: URefAddr) -> Self {
        Self(_Key::Balance(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromBid"))]
    pub fn from_bid(key: AccountHash) -> Self {
        Self(_Key::Bid(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromWithdraw"))]
    pub fn from_withdraw(key: AccountHash) -> Self {
        Self(_Key::Withdraw(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromDictionaryAddr"))]
    pub fn from_dictionary_addr(key: DictionaryAddr) -> Self {
        Self(_Key::Dictionary(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asDictionaryAddr"))]
    pub fn as_dictionary(&self) -> Option<DictionaryAddr> {
        match &self.0 {
            _Key::Dictionary(v) => Some((*v).into()),
            _ => None,
        }
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromSystemEntityRegistry"))]
    pub fn from_system_contract_registry() -> Self {
        Self(_Key::SystemEntityRegistry)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromEraSummary"))]
    pub fn from_era_summary() -> Self {
        Self(_Key::EraSummary)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromUnbond"))]
    pub fn from_unbond(key: AccountHash) -> Self {
        Self(_Key::Unbond(key.into()))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromChainspecRegistry"))]
    pub fn from_chainspec_registry() -> Self {
        Self(_Key::ChainspecRegistry)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromChecksumRegistry"))]
    pub fn from_checksum_registry() -> Self {
        Self(_Key::ChecksumRegistry)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toFormattedString"))]
    pub fn to_formatted_string(&self) -> String {
        _Key::to_formatted_string(self.0)
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromFormattedString"))]
    pub fn from_formatted_str_js_alias(formatted_str: &str) -> Result<Key, JsError> {
        Self::from_formatted_str(formatted_str)
            .map_err(|err| JsError::new(&format!("Error parsing Key from formatted string, {err}")))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "fromDictionaryKey"))]
    pub fn from_dictionary_key(seed_uref: URef, dictionary_item_key: &[u8]) -> Self {
        _Key::dictionary(seed_uref.into(), dictionary_item_key).into()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "isDictionaryKey"))]
    pub fn is_dictionary_key(&self) -> bool {
        matches!(&self.0, _Key::Dictionary(_))
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "intoAccount"))]
    pub fn into_account(self) -> Option<AccountHash> {
        match self.0 {
            _Key::Account(bytes) => Some(bytes.into()),
            _ => None,
        }
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "intoHash"))]
    pub fn into_hash(self) -> Option<HashAddr> {
        match self.0 {
            _Key::Hash(hash) => Some(hash.into()),
            _ => None,
        }
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asBalance"))]
    pub fn as_balance(&self) -> Option<URefAddr> {
        match &self.0 {
            _Key::Balance(v) => Some((*v).into()),
            _ => None,
        }
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "intoURef"))]
    pub fn into_uref(self) -> Option<URef> {
        match self.0 {
            _Key::URef(uref) => Some(uref.into()),
            _ => None,
        }
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "urefToHash"))]
    pub fn uref_to_hash(&self) -> Option<Key> {
        if let _Key::URef(uref) = &self.0 {
            let addr = uref.addr();
            return Some(Key(_Key::Hash(addr)));
        }
        None
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "withdrawToUnbond"))]
    pub fn withdraw_to_unbond(&self) -> Option<Key> {
        if let _Key::Withdraw(account_hash) = &self.0 {
            return Some(Key(_Key::Unbond(*account_hash)));
        }
        None
    }
}

impl Key {
    pub fn from_formatted_str(formatted_str: &str) -> Result<Key, Box<SdkError>> {
        _Key::from_formatted_str(formatted_str)
            .map(Into::into)
            .map_err(|error| {
                Box::new(SdkError::FailedToParseKey {
                    context: "Key from formatted string",
                    error,
                })
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

impl ToBytes for Key {
    fn to_bytes(&self) -> Result<Vec<u8>, casper_types::bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }
}
