use crate::types::{
    account::Account,
    addressable_entity::AddressableEntity,
    byte_code::ByteCode,
    cl::cl_value::CLValue,
    contract_wasm::ContractWasm,
    contracts::{Contract, ContractPackage},
    deploy_info::DeployInfo,
    entry_point_value::EntryPointValue,
    era_info::EraInfo,
    named_key_value::NamedKeyValue,
    package::Package,
    transfer::Transfer,
};
use casper_types::StoredValue as _StoredValue;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::StoredValue`].
///
/// Typed `as_*` covers the common query variants. Auction/message variants
/// (`Bid`, `BidKind`, `Withdraw`, `Unbonding`, `MessageTopic`, `Message`,
/// `Prepayment`) expose `variant` and `toJson` only.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct StoredValue(_StoredValue);

impl StoredValue {
    pub fn inner(&self) -> &_StoredValue {
        &self.0
    }

    pub fn variant(&self) -> &'static str {
        match &self.0 {
            _StoredValue::CLValue(_) => "CLValue",
            _StoredValue::Account(_) => "Account",
            _StoredValue::ContractWasm(_) => "ContractWasm",
            _StoredValue::Contract(_) => "Contract",
            _StoredValue::ContractPackage(_) => "ContractPackage",
            _StoredValue::Transfer(_) => "Transfer",
            _StoredValue::DeployInfo(_) => "DeployInfo",
            _StoredValue::EraInfo(_) => "EraInfo",
            _StoredValue::Bid(_) => "Bid",
            _StoredValue::Withdraw(_) => "Withdraw",
            _StoredValue::Unbonding(_) => "Unbonding",
            _StoredValue::AddressableEntity(_) => "AddressableEntity",
            _StoredValue::BidKind(_) => "BidKind",
            _StoredValue::SmartContract(_) => "SmartContract",
            _StoredValue::ByteCode(_) => "ByteCode",
            _StoredValue::MessageTopic(_) => "MessageTopic",
            _StoredValue::Message(_) => "Message",
            _StoredValue::NamedKey(_) => "NamedKey",
            _StoredValue::Prepayment(_) => "Prepayment",
            _StoredValue::EntryPoint(_) => "EntryPoint",
            _StoredValue::RawBytes(_) => "RawBytes",
        }
    }

    pub fn as_cl_value(&self) -> Option<CLValue> {
        self.0.as_cl_value().cloned().map(CLValue::from)
    }

    pub fn as_account(&self) -> Option<Account> {
        self.0.as_account().cloned().map(Account::from)
    }

    pub fn as_contract(&self) -> Option<Contract> {
        self.0.as_contract().cloned().map(Contract::from)
    }

    pub fn as_contract_package(&self) -> Option<ContractPackage> {
        self.0
            .as_contract_package()
            .cloned()
            .map(ContractPackage::from)
    }

    pub fn as_addressable_entity(&self) -> Option<AddressableEntity> {
        self.0
            .as_addressable_entity()
            .cloned()
            .map(AddressableEntity::from)
    }

    pub fn as_smart_contract(&self) -> Option<Package> {
        self.0.as_package().cloned().map(Package::from)
    }

    pub fn as_named_key(&self) -> Option<NamedKeyValue> {
        match &self.0 {
            _StoredValue::NamedKey(named_key) => Some(named_key.clone().into()),
            _ => None,
        }
    }

    pub fn as_entry_point(&self) -> Option<EntryPointValue> {
        self.0
            .as_entry_point_value()
            .cloned()
            .map(EntryPointValue::from)
    }

    pub fn as_contract_wasm(&self) -> Option<ContractWasm> {
        self.0.as_contract_wasm().cloned().map(ContractWasm::from)
    }

    pub fn as_byte_code(&self) -> Option<ByteCode> {
        self.0.as_byte_code().cloned().map(ByteCode::from)
    }

    pub fn as_transfer(&self) -> Option<Transfer> {
        self.0.as_transfer().cloned().map(Transfer::from)
    }

    pub fn as_deploy_info(&self) -> Option<DeployInfo> {
        self.0.as_deploy_info().cloned().map(DeployInfo::from)
    }

    pub fn as_era_info(&self) -> Option<EraInfo> {
        self.0.as_era_info().cloned().map(EraInfo::from)
    }

    pub fn as_raw_bytes(&self) -> Option<Vec<u8>> {
        match &self.0 {
            _StoredValue::RawBytes(bytes) => Some(bytes.clone()),
            _ => None,
        }
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl StoredValue {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "variant"))]
    pub fn variant_js(&self) -> String {
        self.variant().to_string()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asClValue"))]
    pub fn as_cl_value_js(&self) -> Option<CLValue> {
        self.as_cl_value()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asAccount"))]
    pub fn as_account_js(&self) -> Option<Account> {
        self.as_account()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asContract"))]
    pub fn as_contract_js(&self) -> Option<Contract> {
        self.as_contract()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asContractPackage"))]
    pub fn as_contract_package_js(&self) -> Option<ContractPackage> {
        self.as_contract_package()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asAddressableEntity"))]
    pub fn as_addressable_entity_js(&self) -> Option<AddressableEntity> {
        self.as_addressable_entity()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asSmartContract"))]
    pub fn as_smart_contract_js(&self) -> Option<Package> {
        self.as_smart_contract()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asNamedKey"))]
    pub fn as_named_key_js(&self) -> Option<NamedKeyValue> {
        self.as_named_key()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asEntryPoint"))]
    pub fn as_entry_point_js(&self) -> Option<EntryPointValue> {
        self.as_entry_point()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asContractWasm"))]
    pub fn as_contract_wasm_js(&self) -> Option<ContractWasm> {
        self.as_contract_wasm()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asByteCode"))]
    pub fn as_byte_code_js(&self) -> Option<ByteCode> {
        self.as_byte_code()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asTransfer"))]
    pub fn as_transfer_js(&self) -> Option<Transfer> {
        self.as_transfer()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asDeployInfo"))]
    pub fn as_deploy_info_js(&self) -> Option<DeployInfo> {
        self.as_deploy_info()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asEraInfo"))]
    pub fn as_era_info_js(&self) -> Option<EraInfo> {
        self.as_era_info()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "asRawBytes"))]
    pub fn as_raw_bytes_js(&self) -> Option<Vec<u8>> {
        self.as_raw_bytes()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<StoredValue> for _StoredValue {
    fn from(value: StoredValue) -> Self {
        value.0
    }
}

impl From<_StoredValue> for StoredValue {
    fn from(value: _StoredValue) -> Self {
        StoredValue(value)
    }
}

impl AsRef<_StoredValue> for StoredValue {
    fn as_ref(&self) -> &_StoredValue {
        &self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use casper_types::system::auction::EraInfo as _EraInfo;
    use casper_types::{
        account::{Account as _Account, ActionThresholds, AssociatedKeys, Weight},
        contracts::{
            Contract as _Contract, ContractPackage as _ContractPackage,
            ContractPackageHash as _ContractPackageHash, EntryPoint as _EntryPoint,
            EntryPoints as _EntryPoints, NamedKeys as _NamedKeys,
        },
        AccessRights, ByteCode as _ByteCode, ByteCodeKind as _ByteCodeKind,
        ContractWasm as _ContractWasm, ContractWasmHash, DeployHash, DeployInfo as _DeployInfo,
        Digest, Package as _Package, ProtocolVersion, TransferV1 as _TransferV1, URef as _URef,
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

    fn sample_contract() -> _Contract {
        let mut entry_points = _EntryPoints::new();
        entry_points.add_entry_point(_EntryPoint::default_with_name("call"));
        _Contract::new(
            _ContractPackageHash::new([1u8; 32]),
            ContractWasmHash::new([2u8; 32]),
            _NamedKeys::new(),
            entry_points,
            ProtocolVersion::V2_0_0,
        )
    }

    #[test]
    fn exposes_variant_and_cl_value() {
        let inner = casper_types::CLValue::from_t(7u64).unwrap();
        let stored_value = StoredValue::from(_StoredValue::CLValue(inner));
        assert_eq!(stored_value.variant(), "CLValue");
        assert!(stored_value.as_cl_value().is_some());
        assert!(stored_value.as_raw_bytes().is_none());
    }

    #[test]
    fn exposes_raw_bytes() {
        let stored_value = StoredValue::from(_StoredValue::RawBytes(vec![1u8, 2u8, 3u8]));
        assert_eq!(stored_value.variant(), "RawBytes");
        assert_eq!(stored_value.as_raw_bytes(), Some(vec![1u8, 2u8, 3u8]));
        assert!(stored_value.as_cl_value().is_none());
    }

    #[test]
    fn exposes_account_contract_and_package() {
        let account = StoredValue::from(_StoredValue::Account(sample_account()));
        assert_eq!(account.variant(), "Account");
        let wrapped_account = account.as_account().expect("account");
        assert_eq!(
            wrapped_account.account_hash().to_formatted_string(),
            sample_account().account_hash().to_formatted_string()
        );
        assert!(wrapped_account.named_keys().is_empty());

        let contract = StoredValue::from(_StoredValue::Contract(sample_contract()));
        assert_eq!(contract.variant(), "Contract");
        let wrapped_contract = contract.as_contract().expect("contract");
        assert!(wrapped_contract.has_entry_point("call"));
        assert_eq!(
            wrapped_contract
                .entry_point("call")
                .expect("entry point")
                .name(),
            "call"
        );
        assert!(!wrapped_contract.protocol_version().is_empty());

        let package = StoredValue::from(_StoredValue::ContractPackage(_ContractPackage::default()));
        assert_eq!(package.variant(), "ContractPackage");
        assert!(package.as_contract_package().is_some());
    }

    #[test]
    fn exposes_smart_contract_package_variant() {
        let stored = StoredValue::from(_StoredValue::SmartContract(_Package::default()));
        assert_eq!(stored.variant(), "SmartContract");
        assert!(stored.as_smart_contract().is_some());
        assert!(stored.as_addressable_entity().is_none());
    }

    #[test]
    fn exposes_contract_wasm_byte_code_transfer_and_deploy_info() {
        let wasm = StoredValue::from(_StoredValue::ContractWasm(_ContractWasm::new(vec![9, 8])));
        assert_eq!(wasm.variant(), "ContractWasm");
        assert_eq!(wasm.as_contract_wasm().expect("wasm").bytes(), vec![9, 8]);

        let byte_code = StoredValue::from(_StoredValue::ByteCode(_ByteCode::new(
            _ByteCodeKind::V1CasperWasm,
            vec![1, 2, 3, 4],
        )));
        assert_eq!(byte_code.variant(), "ByteCode");
        let wrapped_bc = byte_code.as_byte_code().expect("byte code");
        assert_eq!(wrapped_bc.kind(), "V1CasperWasm");
        assert_eq!(wrapped_bc.bytes(), vec![1, 2, 3, 4]);
        assert_eq!(wrapped_bc.len(), 4);

        let from = casper_types::account::AccountHash::new([3u8; 32]);
        let source = _URef::new([4u8; 32], AccessRights::READ_ADD_WRITE);
        let target = _URef::new([5u8; 32], AccessRights::READ_ADD_WRITE);
        let transfer = StoredValue::from(_StoredValue::Transfer(_TransferV1::new(
            DeployHash::new(Digest::from([6u8; 32])),
            from,
            Some(from),
            source,
            target,
            100u64.into(),
            1u64.into(),
            Some(42),
        )));
        assert_eq!(transfer.variant(), "Transfer");
        let wrapped_transfer = transfer.as_transfer().expect("transfer");
        assert_eq!(wrapped_transfer.amount(), "100");
        assert_eq!(wrapped_transfer.id(), Some(42));
        assert_eq!(
            wrapped_transfer.from_account().to_formatted_string(),
            from.to_formatted_string()
        );
        assert!(wrapped_transfer.to().is_some());

        let deploy_info = StoredValue::from(_StoredValue::DeployInfo(_DeployInfo::new(
            DeployHash::new(Digest::from([7u8; 32])),
            &[],
            from,
            source,
            9u64.into(),
        )));
        assert_eq!(deploy_info.variant(), "DeployInfo");
        let wrapped_di = deploy_info.as_deploy_info().expect("deploy info");
        assert_eq!(wrapped_di.gas(), "9");
        assert_eq!(wrapped_di.transfer_count(), 0);
        assert!(wrapped_di.transfer_addrs().is_empty());

        let era = StoredValue::from(_StoredValue::EraInfo(_EraInfo::new()));
        assert_eq!(era.variant(), "EraInfo");
        assert_eq!(
            era.as_era_info()
                .expect("era")
                .seigniorage_allocation_count(),
            0
        );
    }

    #[test]
    fn typed_accessors_are_mutually_exclusive() {
        let account = StoredValue::from(_StoredValue::Account(sample_account()));
        assert!(account.as_account().is_some());
        assert!(account.as_contract().is_none());
        assert!(account.as_transfer().is_none());
        assert!(account.as_byte_code().is_none());
        assert!(account.as_raw_bytes().is_none());
    }

    #[test]
    fn serde_round_trip_preserves_variant() {
        let stored = StoredValue::from(_StoredValue::RawBytes(vec![9, 9, 9]));
        let json = serde_json::to_value(&stored).expect("serialize");
        let back: StoredValue = serde_json::from_value(json).expect("deserialize");
        assert_eq!(back.variant(), "RawBytes");
        assert_eq!(back.as_raw_bytes(), Some(vec![9, 9, 9]));
    }

    #[test]
    fn obscure_variants_are_named_only() {
        for (stored, name) in [
            (
                StoredValue::from(_StoredValue::Withdraw(vec![])),
                "Withdraw",
            ),
            (
                StoredValue::from(_StoredValue::Unbonding(vec![])),
                "Unbonding",
            ),
        ] {
            assert_eq!(stored.variant(), name);
            assert!(stored.as_account().is_none());
            assert!(stored.as_contract().is_none());
            assert!(stored.as_addressable_entity().is_none());
            assert!(stored.as_smart_contract().is_none());
            assert!(stored.as_raw_bytes().is_none());
        }
    }
}
