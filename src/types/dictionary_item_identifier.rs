use crate::debug::error;

use super::key::Key;
use casper_client::rpcs::DictionaryItemIdentifier as _DictionaryItemIdentifier;
use casper_types::Key as _Key;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct DictionaryItemIdentifier(_DictionaryItemIdentifier);

#[wasm_bindgen]
impl DictionaryItemIdentifier {
    // static context
    #[wasm_bindgen(js_name = "newFromAccountInfo")]
    pub fn new_from_account_info(
        account_hash: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsValue> {
        let key = Key::from_formatted_str(account_hash)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse key from formatted string: {:?}",
                    err
                ));
                JsValue::null()
            })
            .unwrap();

        Ok(DictionaryItemIdentifier(
            _DictionaryItemIdentifier::AccountNamedKey {
                key: key.to_formatted_string(),
                dictionary_name: dictionary_name.to_string(),
                dictionary_item_key: dictionary_item_key.to_string(),
            },
        ))
    }

    // static context
    #[wasm_bindgen(js_name = "newFromContractInfo")]
    pub fn new_from_contract_info(
        contract_addr: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsValue> {
        let key = Key::from_formatted_str(contract_addr)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse key from formatted string: {:?}",
                    err
                ));
                JsValue::null()
            })
            .unwrap();

        Ok(DictionaryItemIdentifier(
            _DictionaryItemIdentifier::ContractNamedKey {
                key: key.to_formatted_string(),
                dictionary_name: dictionary_name.to_string(),
                dictionary_item_key: dictionary_item_key.to_string(),
            },
        ))
    }

    // static context
    #[wasm_bindgen(js_name = "newFromSeedUref")]
    pub fn new_from_seed_uref(
        seed_uref: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsValue> {
        let key: _Key = Key::from_formatted_str(seed_uref)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse key from formatted string: {:?}",
                    err
                ));
                JsValue::null()
            })
            .unwrap()
            .into();

        Ok(DictionaryItemIdentifier(_DictionaryItemIdentifier::URef {
            seed_uref: *key.as_uref().ok_or_else(|| {
                error("Key is not a URef");
                JsValue::null()
            })?,
            dictionary_item_key: dictionary_item_key.to_string(),
        }))
    }

    // static context
    #[wasm_bindgen(js_name = "newFromDictionaryKey")]
    pub fn new_from_dictionary_key(
        dictionary_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsValue> {
        let _ = Key::from_formatted_str(dictionary_key)
            .map_err(|err| {
                error(&format!(
                    "Failed to parse key from formatted string: {:?}",
                    err
                ));
                JsValue::null()
            })
            .unwrap();
        Ok(DictionaryItemIdentifier(
            _DictionaryItemIdentifier::Dictionary(dictionary_key.to_string()),
        ))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl From<DictionaryItemIdentifier> for _DictionaryItemIdentifier {
    fn from(dictionary_item_identifier: DictionaryItemIdentifier) -> Self {
        dictionary_item_identifier.0
    }
}

impl From<_DictionaryItemIdentifier> for DictionaryItemIdentifier {
    fn from(identifier: _DictionaryItemIdentifier) -> Self {
        DictionaryItemIdentifier(identifier)
    }
}
