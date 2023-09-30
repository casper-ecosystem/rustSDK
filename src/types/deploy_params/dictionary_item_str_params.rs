use crate::{debug::error, helpers::get_str_or_default, types::sdk_error::SdkError};
use casper_client::cli::DictionaryItemStrParams as _DictionaryItemStrParams;
use casper_types::URef;
use gloo_utils::format::JsValueSerdeExt;
use once_cell::sync::OnceCell;
use serde::{de::Error as SerdeError, Deserialize, Serialize, Serializer};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct AccountNamedKey {
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    key: OnceCell<String>,
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    dictionary_name: OnceCell<String>,
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ContractNamedKey {
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    key: OnceCell<String>,
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    dictionary_name: OnceCell<String>,
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct URefVariant {
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    seed_uref: OnceCell<String>,
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    dictionary_item_key: OnceCell<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DictionaryVariant {
    #[serde(serialize_with = "serialize_once_cell")]
    #[serde(deserialize_with = "deserialize_once_cell")]
    value: OnceCell<String>,
}

fn deserialize_once_cell<'de, D>(deserializer: D) -> Result<OnceCell<String>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let value: String = Deserialize::deserialize(deserializer)?;
    let cell = OnceCell::new();
    cell.set(value)
        .map(|_| cell)
        .map_err(|_| SerdeError::custom("Could not deser DictionaryItemStrParams"))
}

fn serialize_once_cell<S>(value: &OnceCell<String>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    let value_str = value.get().map(|s| s.as_str()).unwrap_or_default();
    serializer.serialize_str(value_str)
}

#[wasm_bindgen]
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DictionaryItemStrParams {
    account_named_key: Option<AccountNamedKey>,
    contract_named_key: Option<ContractNamedKey>,
    uref: Option<URefVariant>,
    dictionary: Option<DictionaryVariant>,
}

#[wasm_bindgen]
impl DictionaryItemStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        DictionaryItemStrParams {
            account_named_key: None,
            contract_named_key: None,
            uref: None,
            dictionary: None,
        }
    }

    #[wasm_bindgen(js_name = "setAccountNamedKey")]
    pub fn set_account_named_key(
        &mut self,
        key: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) {
        self.account_named_key = Some(AccountNamedKey {
            key: OnceCell::new(),
            dictionary_name: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });

        if let Some(account_named_key) = &mut self.account_named_key {
            let _ = account_named_key.key.set(key.to_string());
            let _ = account_named_key
                .dictionary_name
                .set(dictionary_name.to_string());
            let _ = account_named_key
                .dictionary_item_key
                .set(dictionary_item_key.to_string());
        }
    }

    #[wasm_bindgen(js_name = "setContractNamedKey")]
    pub fn set_contract_named_key(
        &mut self,
        key: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
    ) {
        self.contract_named_key = Some(ContractNamedKey {
            key: OnceCell::new(),
            dictionary_name: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });

        if let Some(contract_named_key) = &mut self.contract_named_key {
            let _ = contract_named_key.key.set(key.to_string());
            let _ = contract_named_key
                .dictionary_name
                .set(dictionary_name.to_string());
            let _ = contract_named_key
                .dictionary_item_key
                .set(dictionary_item_key.to_string());
        }
    }

    #[wasm_bindgen(js_name = "setUref")]
    pub fn set_uref(&mut self, seed_uref: &str, dictionary_item_key: &str) {
        self.uref = Some(URefVariant {
            seed_uref: OnceCell::new(),
            dictionary_item_key: OnceCell::new(),
        });
        if let Some(uref) = &mut self.uref {
            let seed_uref = URef::from_formatted_str(seed_uref)
                .map_err(|error| SdkError::FailedToParseURef {
                    context: "dictionary item uref",
                    error,
                })
                .unwrap();
            uref.seed_uref.set(seed_uref.to_formatted_string()).unwrap();
            let _ = uref
                .dictionary_item_key
                .set(dictionary_item_key.to_string());
        }
    }

    #[wasm_bindgen(js_name = "setDictionary")]
    pub fn set_dictionary(&mut self, value: &str) {
        self.dictionary = Some(DictionaryVariant {
            value: OnceCell::new(),
        });

        if let Some(dictionary) = &mut self.dictionary {
            let _ = dictionary.value.set(value.to_string());
        }
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(self).unwrap_or(JsValue::null())
    }
}

impl Default for DictionaryItemStrParams {
    fn default() -> Self {
        Self::new()
    }
}

impl DictionaryItemStrParams {
    pub fn account_named_key(&self) -> Option<AccountNamedKey> {
        self.account_named_key.clone()
    }
    pub fn contract_named_key(&self) -> Option<ContractNamedKey> {
        self.contract_named_key.clone()
    }
    pub fn uref(&self) -> Option<URefVariant> {
        self.uref.clone()
    }
    pub fn dictionary(&self) -> Option<DictionaryVariant> {
        self.dictionary.clone()
    }
}

pub fn dictionary_item_str_params_to_casper_client(
    dictionary_item_params: &DictionaryItemStrParams,
) -> _DictionaryItemStrParams<'_> {
    if let Some(account_named_key) = &dictionary_item_params.account_named_key {
        let account_hash = get_str_or_default(account_named_key.key.get());
        let dictionary_name = get_str_or_default(account_named_key.dictionary_name.get());
        let dictionary_item_key = get_str_or_default(account_named_key.dictionary_item_key.get());
        _DictionaryItemStrParams::AccountNamedKey {
            account_hash,
            dictionary_name,
            dictionary_item_key,
        }
    } else if let Some(contract_named_key) = &dictionary_item_params.contract_named_key {
        let hash_addr = get_str_or_default(contract_named_key.key.get());
        let dictionary_name = get_str_or_default(contract_named_key.dictionary_name.get());
        let dictionary_item_key = get_str_or_default(contract_named_key.dictionary_item_key.get());
        return _DictionaryItemStrParams::ContractNamedKey {
            hash_addr,
            dictionary_name,
            dictionary_item_key,
        };
    } else if let Some(uref_variant) = &dictionary_item_params.uref {
        let seed_uref = get_str_or_default(uref_variant.seed_uref.get());
        let dictionary_item_key = get_str_or_default(uref_variant.dictionary_item_key.get());
        return _DictionaryItemStrParams::URef {
            seed_uref,
            dictionary_item_key,
        };
    } else if let Some(dictionary_variant) = &dictionary_item_params.dictionary {
        let value = get_str_or_default(dictionary_variant.value.get());
        return _DictionaryItemStrParams::Dictionary(value);
    } else {
        error("Error converting dictionary_item_params");
        return _DictionaryItemStrParams::Dictionary("");
    }
}
