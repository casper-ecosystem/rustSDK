use crate::{
    debug::error,
    types::{
        cl::bytes::Bytes,
        hash::{
            account_hash::AccountHash, addressable_entity_hash::AddressableEntityHash,
            package_hash::PackageHash,
        },
        public_key::PublicKey,
        uref::URef,
    },
};

use casper_client::cli::TransactionBuilderParams as _TransactionBuilderParams;
use casper_types::{TransferTarget as _TransferTarget, U512};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug)]
pub enum TransferTargetKind {
    PublicKey,
    AccountHash,
    URef,
}

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct TransferTarget {
    kind: TransferTargetKind,
    public_key: Option<PublicKey>,
    account_hash: Option<AccountHash>,
    uref: Option<URef>,
}

#[wasm_bindgen]
impl TransferTarget {
    #[wasm_bindgen(constructor)]
    pub fn new(
        kind: TransferTargetKind,
        public_key: Option<PublicKey>,
        account_hash: Option<AccountHash>,
        uref: Option<URef>,
    ) -> Self {
        TransferTarget {
            kind,
            public_key,
            account_hash,
            uref,
        }
    }
}

#[wasm_bindgen]
#[derive(Clone, Debug, Default)]
pub struct TransactionBuilderParams {
    kind: TransactionKind,
    is_install_upgrade: Option<bool>,
    transaction_bytes: Option<Bytes>,
    maybe_source: Option<URef>,
    target: Option<TransferTarget>,
    amount: Option<U512>,
    maybe_id: Option<u64>,
    entity_hash: Option<AddressableEntityHash>,
    entity_alias: Option<String>,
    entry_point: Option<String>,
    package_hash: Option<PackageHash>,
    package_alias: Option<String>,
    maybe_entity_version: Option<u32>,
    public_key: Option<PublicKey>,
    delegation_rate: Option<u8>,
    delegator: Option<PublicKey>,
    validator: Option<PublicKey>,
    new_validator: Option<PublicKey>,
    minimum_delegation_amount: Option<u64>,
    maximum_delegation_amount: Option<u64>,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, Default)]
pub enum TransactionKind {
    InvocableEntity,
    InvocableEntityAlias,
    Package,
    PackageAlias,
    #[default]
    Session,
    Transfer,
    AddBid,
    Delegate,
    Undelegate,
    Redelegate,
    WithdrawBid,
}

#[wasm_bindgen]
impl TransactionBuilderParams {
    #[wasm_bindgen(js_name = "newSession")]
    pub fn new_session(
        transaction_bytes: Option<Bytes>,
        is_install_upgrade: Option<bool>,
    ) -> TransactionBuilderParams {
        TransactionBuilderParams {
            kind: TransactionKind::Session,
            is_install_upgrade,
            transaction_bytes,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newTransfer")]
    pub fn new_transfer(
        maybe_source: Option<URef>,
        target: TransferTarget,
        amount: &str,
        maybe_id: Option<u64>,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Transfer,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source,
            target: Some(target),
            amount,
            maybe_id,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newInvocableEntity")]
    pub fn new_invocable_entity(
        entity_hash: AddressableEntityHash,
        entry_point: &str,
    ) -> TransactionBuilderParams {
        TransactionBuilderParams {
            kind: TransactionKind::InvocableEntity,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: Some(entity_hash),
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newInvocableEntityAlias")]
    pub fn new_invocable_entity_alias(
        entity_alias: &str,
        entry_point: &str,
    ) -> TransactionBuilderParams {
        TransactionBuilderParams {
            kind: TransactionKind::InvocableEntityAlias,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: Some(entity_alias.to_string()),
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newPackage")]
    pub fn new_package(
        package_hash: PackageHash,
        entry_point: &str,
        maybe_entity_version: Option<String>,
    ) -> TransactionBuilderParams {
        let maybe_entity_version_as_u32 = parse_maybe_entity_version(maybe_entity_version);

        TransactionBuilderParams {
            kind: TransactionKind::Package,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: Some(package_hash),
            package_alias: None,
            maybe_entity_version: maybe_entity_version_as_u32,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newPackageAlias")]
    pub fn new_package_alias(
        package_alias: &str,
        entry_point: &str,
        maybe_entity_version: Option<String>,
    ) -> TransactionBuilderParams {
        let maybe_entity_version_as_u32 = parse_maybe_entity_version(maybe_entity_version);
        TransactionBuilderParams {
            kind: TransactionKind::PackageAlias,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: Some(entry_point.to_string()),
            maybe_source: None,
            target: None,
            amount: None,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: Some(package_alias.to_string()),
            maybe_entity_version: maybe_entity_version_as_u32,
            public_key: None,
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newAddBid")]
    pub fn new_add_bid(
        public_key: PublicKey,
        delegation_rate: u8,
        amount: &str,
        minimum_delegation_amount: u64,
        maximum_delegation_amount: u64,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::AddBid,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: Some(public_key),
            delegation_rate: Some(delegation_rate),
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: Some(minimum_delegation_amount),
            maximum_delegation_amount: Some(maximum_delegation_amount),
        }
    }

    #[wasm_bindgen(js_name = "newDelegate")]
    pub fn new_delegate(
        delegator: PublicKey,
        validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Delegate,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newUndelegate")]
    pub fn new_undelegate(
        delegator: PublicKey,
        validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Undelegate,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newRedelegate")]
    pub fn new_redelegate(
        delegator: PublicKey,
        validator: PublicKey,
        new_validator: PublicKey,
        amount: &str,
    ) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::Redelegate,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: None,
            delegation_rate: None,
            delegator: Some(delegator),
            validator: Some(validator),
            new_validator: Some(new_validator),
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(js_name = "newWithdrawBid")]
    pub fn new_withdraw_bid(public_key: PublicKey, amount: &str) -> TransactionBuilderParams {
        let amount = convert_amount(amount);
        TransactionBuilderParams {
            kind: TransactionKind::WithdrawBid,
            is_install_upgrade: Some(false),
            transaction_bytes: None,
            entry_point: None,
            maybe_source: None,
            target: None,
            amount,
            maybe_id: None,
            entity_hash: None,
            entity_alias: None,
            package_hash: None,
            package_alias: None,
            maybe_entity_version: None,
            public_key: Some(public_key),
            delegation_rate: None,
            delegator: None,
            validator: None,
            new_validator: None,
            minimum_delegation_amount: None,
            maximum_delegation_amount: None,
        }
    }

    #[wasm_bindgen(getter)]
    pub fn kind(&self) -> TransactionKind {
        self.kind
    }

    #[wasm_bindgen(setter)]
    pub fn set_kind(&mut self, kind: TransactionKind) {
        self.kind = kind;
    }

    #[wasm_bindgen(getter)]
    pub fn transaction_bytes(&self) -> Option<Bytes> {
        self.transaction_bytes.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_transaction_bytes(&mut self, transaction_bytes: Bytes) {
        self.transaction_bytes = Some(transaction_bytes);
    }

    #[wasm_bindgen(getter)]
    pub fn maybe_source(&self) -> Option<URef> {
        self.maybe_source.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_maybe_source(&mut self, maybe_source: URef) {
        self.maybe_source = Some(maybe_source);
    }

    #[wasm_bindgen(getter)]
    pub fn target(&self) -> Option<TransferTarget> {
        self.target.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_target(&mut self, target: TransferTarget) {
        self.target = Some(target);
    }

    #[wasm_bindgen(getter)]
    pub fn amount(&self) -> Option<String> {
        self.amount.map(|amount| amount.to_string())
    }

    #[wasm_bindgen(setter)]
    pub fn set_amount(&mut self, amount: &str) {
        let amount = convert_amount(amount);
        self.amount = amount;
    }

    #[wasm_bindgen(getter)]
    pub fn maybe_id(&self) -> Option<u64> {
        self.maybe_id
    }

    #[wasm_bindgen(setter)]
    pub fn set_maybe_id(&mut self, id: u64) {
        self.maybe_id = Some(id);
    }

    #[wasm_bindgen(getter)]
    pub fn entity_hash(&self) -> Option<AddressableEntityHash> {
        self.entity_hash
    }

    #[wasm_bindgen(setter)]
    pub fn set_entity_hash(&mut self, entity_hash: AddressableEntityHash) {
        self.entity_hash = Some(entity_hash);
    }

    #[wasm_bindgen(getter)]
    pub fn entity_alias(&self) -> Option<String> {
        self.entity_alias.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_entity_alias(&mut self, entity_alias: &str) {
        self.entity_alias = Some(entity_alias.to_string());
    }

    #[wasm_bindgen(getter)]
    pub fn entry_point(&self) -> Option<String> {
        self.entry_point.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_entry_point(&mut self, entry_point: &str) {
        self.entry_point = Some(entry_point.to_string());
    }

    #[wasm_bindgen(getter)]
    pub fn package_hash(&self) -> Option<PackageHash> {
        self.package_hash
    }

    #[wasm_bindgen(setter)]
    pub fn set_package_hash(&mut self, package_hash: PackageHash) {
        self.package_hash = Some(package_hash);
    }

    #[wasm_bindgen(getter)]
    pub fn package_alias(&self) -> Option<String> {
        self.package_alias.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_package_alias(&mut self, package_alias: &str) {
        self.package_alias = Some(package_alias.to_string());
    }

    #[wasm_bindgen(getter)]
    pub fn public_key(&self) -> Option<PublicKey> {
        self.public_key.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_public_key(&mut self, public_key: PublicKey) {
        self.public_key = Some(public_key);
    }

    #[wasm_bindgen(getter)]
    pub fn delegation_rate(&self) -> Option<u8> {
        self.delegation_rate
    }

    #[wasm_bindgen(setter)]
    pub fn set_delegation_rate(&mut self, delegation_rate: u8) {
        self.delegation_rate = Some(delegation_rate);
    }

    #[wasm_bindgen(getter)]
    pub fn delegator(&self) -> Option<PublicKey> {
        self.delegator.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_delegator(&mut self, delegator: PublicKey) {
        self.delegator = Some(delegator);
    }

    #[wasm_bindgen(getter)]
    pub fn validator(&self) -> Option<PublicKey> {
        self.validator.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_validator(&mut self, validator: PublicKey) {
        self.validator = Some(validator);
    }

    #[wasm_bindgen(getter)]
    pub fn new_validator(&self) -> Option<PublicKey> {
        self.new_validator.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_new_validator(&mut self, new_validator: PublicKey) {
        self.new_validator = Some(new_validator);
    }

    #[wasm_bindgen(getter)]
    pub fn minimum_delegation_amount(&self) -> Option<u64> {
        self.minimum_delegation_amount
    }

    #[wasm_bindgen(setter)]
    pub fn set_minimum_delegation_amount(&mut self, minimum_delegation_amount: u64) {
        self.minimum_delegation_amount = Some(minimum_delegation_amount);
    }

    #[wasm_bindgen(getter)]
    pub fn maximum_delegation_amount(&self) -> Option<u64> {
        self.maximum_delegation_amount
    }

    #[wasm_bindgen(setter)]
    pub fn set_maximum_delegation_amount(&mut self, maximum_delegation_amount: u64) {
        self.maximum_delegation_amount = Some(maximum_delegation_amount);
    }

    #[wasm_bindgen(getter)]
    pub fn is_install_upgrade(&self) -> Option<bool> {
        self.is_install_upgrade
    }

    #[wasm_bindgen(setter)]
    pub fn set_is_install_upgrade(&mut self, is_install_upgrade: bool) {
        self.is_install_upgrade = Some(is_install_upgrade);
    }
}

// Convert TransactionBuilderParams to casper_client::cli::TransactionBuilderParams
pub fn transaction_builder_params_to_casper_client(
    transaction_params: &TransactionBuilderParams,
) -> _TransactionBuilderParams<'_> {
    match transaction_params.kind {
        TransactionKind::Session => _TransactionBuilderParams::Session {
            is_install_upgrade: transaction_params.is_install_upgrade.unwrap_or_default(),
            transaction_bytes: transaction_params
                .transaction_bytes
                .clone()
                .unwrap_or_default()
                .into(),
        },
        TransactionKind::Transfer => _TransactionBuilderParams::Transfer {
            maybe_source: transaction_params.maybe_source.clone().map(Into::into),
            target: transaction_params
                .target
                .as_ref()
                .map(|transaction| match transaction.kind {
                    TransferTargetKind::PublicKey => {
                        _TransferTarget::PublicKey(transaction.public_key.clone().unwrap().into())
                    }
                    TransferTargetKind::AccountHash => _TransferTarget::AccountHash(
                        transaction.account_hash.clone().unwrap().into(),
                    ),
                    TransferTargetKind::URef => {
                        _TransferTarget::URef(transaction.uref.clone().unwrap().into())
                    }
                })
                .unwrap(),
            amount: transaction_params.amount.unwrap_or_default(),
            maybe_id: transaction_params.maybe_id,
        },
        TransactionKind::InvocableEntity => _TransactionBuilderParams::InvocableEntity {
            entity_hash: transaction_params.entity_hash.unwrap().into(),
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::InvocableEntityAlias => _TransactionBuilderParams::InvocableEntityAlias {
            entity_alias: transaction_params
                .entity_alias
                .as_deref()
                .unwrap_or_default(),
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::Package => _TransactionBuilderParams::Package {
            package_hash: transaction_params.package_hash.unwrap().into(),
            maybe_entity_version: transaction_params.maybe_entity_version,
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::PackageAlias => _TransactionBuilderParams::PackageAlias {
            package_alias: transaction_params
                .package_alias
                .as_deref()
                .unwrap_or_default(),
            maybe_entity_version: transaction_params.maybe_entity_version,
            entry_point: transaction_params
                .entry_point
                .as_deref()
                .unwrap_or_default(),
        },
        TransactionKind::AddBid => _TransactionBuilderParams::AddBid {
            public_key: transaction_params.public_key.clone().unwrap().into(),
            delegation_rate: transaction_params.delegation_rate.unwrap(),
            amount: transaction_params.amount.unwrap_or_default(),
            minimum_delegation_amount: transaction_params
                .minimum_delegation_amount
                .unwrap_or_default(),
            maximum_delegation_amount: transaction_params
                .maximum_delegation_amount
                .unwrap_or_default(),
        },
        TransactionKind::Delegate => _TransactionBuilderParams::Delegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
        TransactionKind::Undelegate => _TransactionBuilderParams::Undelegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
        TransactionKind::Redelegate => _TransactionBuilderParams::Redelegate {
            delegator: transaction_params.delegator.clone().unwrap().into(),
            validator: transaction_params.validator.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
            new_validator: transaction_params.new_validator.clone().unwrap().into(),
        },
        TransactionKind::WithdrawBid => _TransactionBuilderParams::WithdrawBid {
            public_key: transaction_params.public_key.clone().unwrap().into(),
            amount: transaction_params.amount.unwrap_or_default(),
        },
    }
}

fn parse_maybe_entity_version(maybe_entity_version: Option<String>) -> Option<u32> {
    maybe_entity_version.and_then(|version| {
        version
            .parse::<u32>()
            .map_err(|err| {
                error(&format!("Error parsing version: {}", err));
            })
            .ok()
    })
}

fn convert_amount(amount: &str) -> Option<U512> {
    let cloned_amount = amount.to_string();
    U512::from_dec_str(&cloned_amount)
        .map_err(|err| {
            error(&format!("Error converting amount: {:?}", err));
        })
        .ok()
}
