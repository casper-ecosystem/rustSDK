use crate::types::{key::Key, sdk_error::SdkError};
use casper_client::rpcs::DictionaryItemIdentifier as _DictionaryItemIdentifier;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct DictionaryItemIdentifier(_DictionaryItemIdentifier);

impl DictionaryItemIdentifier {
    // static context
    pub fn new_from_account_info(
        account_hash: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, SdkError> {
        let key = Key::from_formatted_str(account_hash).map_err(|err| SdkError::CustomError {
            context: "Failed to parse key from formatted string",
            error: format!("{:?}", err),
        })?;

        Ok(Self(_DictionaryItemIdentifier::AccountNamedKey {
            key: key.to_formatted_string(),
            dictionary_name: dictionary_name.to_string(),
            dictionary_item_key: dictionary_item_key.to_string(),
        }))
    }

    // static context
    pub fn new_from_contract_info(
        contract_addr: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, SdkError> {
        let key = Key::from_formatted_str(contract_addr).map_err(|err| SdkError::CustomError {
            context: "Failed to parse key from formatted string",
            error: format!("{:?}", err),
        })?;

        Ok(Self(_DictionaryItemIdentifier::ContractNamedKey {
            key: key.to_formatted_string(),
            dictionary_name: dictionary_name.to_string(),
            dictionary_item_key: dictionary_item_key.to_string(),
        }))
    }

    // static context
    pub fn new_from_entity_info(
        entity_addr: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, SdkError> {
        let key = Key::from_formatted_str(entity_addr).map_err(|err| SdkError::CustomError {
            context: "Failed to parse key from formatted string",
            error: format!("{:?}", err),
        })?;

        Ok(Self(_DictionaryItemIdentifier::EntityNamedKey {
            key: key.to_formatted_string(),
            dictionary_name: dictionary_name.to_string(),
            dictionary_item_key: dictionary_item_key.to_string(),
        }))
    }

    // static context
    pub fn new_from_seed_uref(
        seed_uref: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, SdkError> {
        let key = Key::from_formatted_str(seed_uref).map_err(|err| SdkError::CustomError {
            context: "Failed to parse key from formatted string",
            error: format!("{:?}", err),
        })?;

        let uref = key.into_uref().ok_or_else(|| SdkError::CustomError {
            context: "Key conversion error",
            error: "Key is not a URef".to_string(),
        })?;

        Ok(Self(_DictionaryItemIdentifier::URef {
            seed_uref: *uref,
            dictionary_item_key: dictionary_item_key.to_string(),
        }))
    }

    // static context
    pub fn new_from_dictionary_key(
        dictionary_key: &str,
    ) -> Result<DictionaryItemIdentifier, SdkError> {
        let key = Key::from_formatted_str(dictionary_key).map_err(|err| SdkError::CustomError {
            context: "Failed to parse key from formatted string",
            error: format!("{:?}", err),
        })?;
        Ok(Self(_DictionaryItemIdentifier::Dictionary(
            key.to_formatted_string(),
        )))
    }
}

#[wasm_bindgen]
impl DictionaryItemIdentifier {
    // static context
    #[wasm_bindgen(js_name = "newFromAccountInfo")]
    pub fn new_from_account_info_js_alias(
        account_hash: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsError> {
        Self::new_from_account_info(account_hash, dictionary_name, dictionary_item_key)
            .map_err(Into::into)
    }

    // static context
    #[wasm_bindgen(js_name = "newFromContractInfo")]
    pub fn new_from_contract_info_js_alias(
        contract_addr: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsError> {
        Self::new_from_contract_info(contract_addr, dictionary_name, dictionary_item_key)
            .map_err(Into::into)
    }

    #[wasm_bindgen(js_name = "newFromEntityInfo")]
    pub fn new_from_entity_info_js_alias(
        entity_addr: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsError> {
        Self::new_from_entity_info(entity_addr, dictionary_name, dictionary_item_key)
            .map_err(|err| JsError::new(&format!("SdkError: {}", err)))
    }

    // static context
    #[wasm_bindgen(js_name = "newFromSeedUref")]
    pub fn new_from_seed_uref_js_alias(
        seed_uref: &str,
        dictionary_item_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsError> {
        Self::new_from_seed_uref(seed_uref, dictionary_item_key).map_err(Into::into)
    }

    // static context
    #[wasm_bindgen(js_name = "newFromDictionaryKey")]
    pub fn new_from_dictionary_key_js_alias(
        dictionary_key: &str,
    ) -> Result<DictionaryItemIdentifier, JsError> {
        Self::new_from_dictionary_key(dictionary_key).map_err(Into::into)
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
