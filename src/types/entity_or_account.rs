use crate::types::{
    account::Account, addressable_entity::AddressableEntity, entry_point_value::EntryPointValue,
    named_keys::NamedKeys,
};
// Client's RPC wrapper type is also named AddressableEntity (entity + named_keys + entry_points).
use casper_client::rpcs::{AddressableEntity as _EntityInfo, EntityOrAccount as _EntityOrAccount};
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Typed view of `state_get_entity` payload for addressable-entity mode.
///
/// Contains the entity body plus named keys and entry points returned by the RPC.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct AddressableEntityInfo(_EntityInfo);

impl AddressableEntityInfo {
    pub fn inner(&self) -> &_EntityInfo {
        &self.0
    }

    pub fn entity(&self) -> AddressableEntity {
        self.0.entity.clone().into()
    }

    pub fn named_keys(&self) -> NamedKeys {
        self.0.named_keys.clone().into()
    }

    pub fn entry_points(&self) -> Vec<EntryPointValue> {
        self.0
            .entry_points
            .iter()
            .cloned()
            .map(EntryPointValue::from)
            .collect()
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl AddressableEntityInfo {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "entity"))]
    pub fn entity_js(&self) -> AddressableEntity {
        self.entity()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "namedKeys"))]
    pub fn named_keys_js(&self) -> NamedKeys {
        self.named_keys()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "entryPoints"))]
    pub fn entry_points_js(&self) -> Vec<EntryPointValue> {
        self.entry_points()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<AddressableEntityInfo> for _EntityInfo {
    fn from(value: AddressableEntityInfo) -> Self {
        value.0
    }
}

impl From<_EntityInfo> for AddressableEntityInfo {
    fn from(value: _EntityInfo) -> Self {
        AddressableEntityInfo(value)
    }
}

/// Dual-mode `state_get_entity` result body.
///
/// - Addressable-entity mode (`enable_addressable_entity = true`): `AddressableEntity`
/// - Legacy mode (default in NCTL/CI): `LegacyAccount` (node may serialize as `Account`)
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct EntityOrAccount(_EntityOrAccount);

impl EntityOrAccount {
    pub fn inner(&self) -> &_EntityOrAccount {
        &self.0
    }

    pub fn variant(&self) -> &'static str {
        match &self.0 {
            _EntityOrAccount::AddressableEntity(_) => "AddressableEntity",
            _EntityOrAccount::LegacyAccount(_) => "LegacyAccount",
        }
    }

    pub fn as_addressable_entity(&self) -> Option<AddressableEntityInfo> {
        self.0
            .addressable_entity()
            .cloned()
            .map(AddressableEntityInfo::from)
    }

    pub fn as_legacy_account(&self) -> Option<Account> {
        self.0.legacy_account().cloned().map(Account::from)
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl EntityOrAccount {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "variant"))]
    pub fn variant_js(&self) -> String {
        self.variant().to_string()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asAddressableEntity"))]
    pub fn as_addressable_entity_js(&self) -> Option<AddressableEntityInfo> {
        self.as_addressable_entity()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asLegacyAccount"))]
    pub fn as_legacy_account_js(&self) -> Option<Account> {
        self.as_legacy_account()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<EntityOrAccount> for _EntityOrAccount {
    fn from(value: EntityOrAccount) -> Self {
        value.0
    }
}

impl From<_EntityOrAccount> for EntityOrAccount {
    fn from(value: _EntityOrAccount) -> Self {
        EntityOrAccount(value)
    }
}

impl AsRef<_EntityOrAccount> for EntityOrAccount {
    fn as_ref(&self) -> &_EntityOrAccount {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use casper_types::{
        account::{Account as _Account, ActionThresholds, AssociatedKeys, Weight},
        contracts::NamedKeys as _NamedKeys,
        AccessRights, URef as _URef,
    };

    fn sample_account() -> _Account {
        let account_hash = casper_types::account::AccountHash::new([7u8; 32]);
        let main_purse = _URef::new([9u8; 32], AccessRights::READ_ADD_WRITE);
        let associated_keys = AssociatedKeys::new(account_hash, Weight::new(1));
        let action_thresholds = ActionThresholds::new(Weight::new(1), Weight::new(1)).unwrap();
        _Account::new(
            account_hash,
            _NamedKeys::new(),
            main_purse,
            associated_keys,
            action_thresholds,
        )
    }

    #[test]
    fn deserializes_legacy_account_canonical() {
        let account = sample_account();
        let json = serde_json::json!({ "LegacyAccount": account });
        let parsed: _EntityOrAccount = serde_json::from_value(json).expect("LegacyAccount");
        let wrapped = EntityOrAccount::from(parsed);
        assert_eq!(wrapped.variant(), "LegacyAccount");
        assert!(wrapped.as_legacy_account().is_some());
        assert!(wrapped.as_addressable_entity().is_none());
    }
}
