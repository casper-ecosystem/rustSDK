use crate::types::key::Key;
use casper_types::NamedKeys as _NamedKeys;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::NamedKeys`].
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct NamedKeys(_NamedKeys);

impl NamedKeys {
    pub fn inner(&self) -> &_NamedKeys {
        &self.0
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    pub fn get(&self, name: &str) -> Option<Key> {
        self.0.get(name).copied().map(Key::from)
    }

    pub fn names(&self) -> Vec<String> {
        self.0.names().cloned().collect()
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl NamedKeys {
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new() -> Self {
        Self(_NamedKeys::new())
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "len"))]
    pub fn len_js(&self) -> usize {
        self.len()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "isEmpty"))]
    pub fn is_empty_js(&self) -> bool {
        self.is_empty()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "get"))]
    pub fn get_js(&self, name: &str) -> Option<Key> {
        self.get(name)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "names"))]
    pub fn names_js(&self) -> Vec<String> {
        self.names()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<NamedKeys> for _NamedKeys {
    fn from(value: NamedKeys) -> Self {
        value.0
    }
}

impl From<_NamedKeys> for NamedKeys {
    fn from(value: _NamedKeys) -> Self {
        NamedKeys(value)
    }
}

impl AsRef<_NamedKeys> for NamedKeys {
    fn as_ref(&self) -> &_NamedKeys {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{hash::account_hash::AccountHash, key::Key};

    #[test]
    fn names_and_get_round_trip() {
        let mut inner = _NamedKeys::new();
        let account_hash =
            AccountHash::new("0000000000000000000000000000000000000000000000000000000000000000")
                .unwrap();
        inner.insert("main".to_string(), Key::from_account(account_hash).into());
        let named_keys = NamedKeys::from(inner);

        assert_eq!(named_keys.len(), 1);
        assert_eq!(named_keys.names(), vec!["main".to_string()]);
        assert!(named_keys.get("main").is_some());
        assert!(named_keys.get("missing").is_none());
    }
}
