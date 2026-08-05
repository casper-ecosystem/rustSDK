#[cfg(all(target_arch = "wasm32", feature = "transaction"))]
use crate::helpers::insert_js_value_arg;
use crate::helpers::secret_key_from_pem;
#[cfg(feature = "transaction")]
use crate::helpers::{
    get_current_timestamp, get_ttl_or_default, insert_arg, parse_timestamp, parse_ttl,
};
#[cfg(feature = "transaction")]
use crate::types::{
    cl::bytes::Bytes,
    hash::{addressable_entity_hash::AddressableEntityHash, package_hash::PackageHash},
    public_key::PublicKey,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
    uref::URef,
};
use crate::types::{hash::account_hash::AccountHash, sdk_error::SdkError};
use crate::{
    debug::{error, log},
    types::{digest::Digest, hash::transaction_hash::TransactionHash, pricing_mode::PricingMode},
};
#[cfg(feature = "transaction")]
use crate::{make_transaction, make_transfer_transaction::make_transfer_transaction};
#[cfg(feature = "transaction")]
use casper_client::cli::TransactionV1Builder;
use casper_types::PricingMode as _PricingMode;
#[cfg(feature = "transaction")]
use casper_types::{
    account::AccountHash as _AccountHash, bytesrepr::Bytes as _Bytes,
    AddressableEntityHash as _AddressableEntityHash, PackageHash as _PackageHash,
    PublicKey as _PublicKey, SecretKey, TimeDiff, TransactionInvocationTarget,
    TransferTarget as _TransferTarget, URef as _URef, U512,
};
use casper_types::{
    bytesrepr, Approval, ApprovalsHash, AsymmetricType, Deploy, GasLimited, InitiatorAddr,
    RuntimeArgs, Timestamp, Transaction as _Transaction, TransactionArgs, TransactionEntryPoint,
    TransactionTarget, TransactionV1,
};
use chrono::{DateTime, Utc};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct Transaction(_Transaction);

const ARGS_MAP_KEY: u16 = 0;
const TARGET_MAP_KEY: u16 = 1;
const ENTRY_POINT_MAP_KEY: u16 = 2;
const DEFAULT_GAS_PRICE_TOLERANCE: u8 = 1;

#[wasm_bindgen]
impl Transaction {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(transaction: JsValue) -> Self {
        let transaction: _Transaction = transaction
            .into_serde()
            .map_err(|err| error(&format!("Failed to deserialize Transaction: {err:?}")))
            .unwrap();
        transaction.into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.0) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[cfg(feature = "transaction")]
    // static context
    #[wasm_bindgen(js_name = "newSession")]
    pub fn new_session(
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, String> {
        make_transaction(builder_params, transaction_params).map_err(|err| {
            let err_msg = format!("Error creating body transaction: {err}");
            err_msg
        })
    }

    #[cfg(feature = "transaction")]
    // static context
    #[wasm_bindgen(js_name = "newTransfer")]
    pub fn new_transfer(
        maybe_source: Option<URef>,
        target_account: &str,
        amount: &str,
        transaction_params: TransactionStrParams,
        maybe_id: Option<String>,
    ) -> Result<Transaction, String> {
        make_transfer_transaction(
            maybe_source,
            target_account,
            amount,
            transaction_params,
            maybe_id,
        )
        .map_err(|err| format!("Error creating transfer transaction: {err}"))
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withTTL")]
    pub fn with_ttl(&self, ttl: &str, secret_key: Option<String>) -> Transaction {
        let mut ttl = parse_ttl(ttl);
        if let Err(err) = &ttl {
            error(&format!("Error parsing TTL: {err}"));
            ttl = parse_ttl(&get_ttl_or_default(None));
        }
        let mut overrides = RebuildOverrides {
            secret_key,
            ..Default::default()
        };
        if let Ok(ttl) = ttl {
            overrides.ttl = Some(ttl);
        }
        self.rebuild(overrides, NewBuilderParams::default())
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withTimestamp")]
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Transaction {
        let mut timestamp = parse_timestamp(timestamp);
        if let Err(err) = &timestamp {
            error(&format!("Error parsing Timestamp: {err}"));
            timestamp = parse_timestamp(&get_current_timestamp(None));
        }
        let mut overrides = RebuildOverrides {
            secret_key,
            ..Default::default()
        };
        if let Ok(timestamp) = timestamp {
            overrides.timestamp = Some(timestamp);
        }
        self.rebuild(overrides, NewBuilderParams::default())
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withChainName")]
    pub fn with_chain_name(&self, chain_name: &str, secret_key: Option<String>) -> Transaction {
        self.rebuild(
            RebuildOverrides {
                chain_name: Some(chain_name.to_string()),
                secret_key,
                ..Default::default()
            },
            NewBuilderParams::default(),
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withPublicKey")]
    pub fn with_public_key(
        &self,
        public_key: PublicKey,
        secret_key: Option<String>,
    ) -> Transaction {
        self.rebuild(
            RebuildOverrides {
                initiator_addr: Some(InitiatorAddr::PublicKey(public_key.into())),
                secret_key,
                ..Default::default()
            },
            NewBuilderParams::default(),
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withAccountHash")]
    pub fn with_account_hash(
        &self,
        account_hash: AccountHash,
        secret_key: Option<String>,
    ) -> Transaction {
        self.rebuild(
            RebuildOverrides {
                initiator_addr: Some(InitiatorAddr::AccountHash(account_hash.into())),
                secret_key,
                ..Default::default()
            },
            NewBuilderParams::default(),
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withEntryPoint")]
    pub fn with_entry_point(&self, entry_point: &str, secret_key: Option<String>) -> Transaction {
        let new_builder_params = NewBuilderParams::<'_> {
            new_entry_point: Some(entry_point.to_string()),
            ..Default::default()
        };
        self.rebuild(
            RebuildOverrides {
                secret_key,
                ..Default::default()
            },
            new_builder_params,
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withEntityHash")]
    pub fn with_entity_hash(
        &self,
        hash: AddressableEntityHash,
        secret_key: Option<String>,
    ) -> Transaction {
        let new_builder_params = NewBuilderParams::<'_> {
            new_hash: Some(hash),
            ..Default::default()
        };
        self.rebuild(
            RebuildOverrides {
                secret_key,
                ..Default::default()
            },
            new_builder_params,
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withPackageHash")]
    pub fn with_package_hash(
        &self,
        package_hash: PackageHash,
        secret_key: Option<String>,
    ) -> Transaction {
        let new_builder_params = NewBuilderParams::<'_> {
            new_package_hash: Some(package_hash),
            ..Default::default()
        };
        self.rebuild(
            RebuildOverrides {
                secret_key,
                ..Default::default()
            },
            new_builder_params,
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withTransactionBytes")]
    pub fn with_transaction_bytes(
        &self,
        transaction_bytes: Bytes,
        is_install_upgrade: Option<bool>,
        secret_key: Option<String>,
    ) -> Transaction {
        let new_builder_params = NewBuilderParams::<'_> {
            new_transaction_bytes: Some(&transaction_bytes),
            new_is_install_upgrade: is_install_upgrade,
            ..Default::default()
        };
        self.rebuild(
            RebuildOverrides {
                secret_key,
                ..Default::default()
            },
            new_builder_params,
        )
    }

    #[cfg(feature = "transaction")]
    #[wasm_bindgen(js_name = "withSecretKey")]
    pub fn with_secret_key(&self, secret_key: Option<String>) -> Transaction {
        self.rebuild(
            RebuildOverrides {
                secret_key,
                ..Default::default()
            },
            NewBuilderParams::default(),
        )
    }

    #[wasm_bindgen(js_name = "verify")]
    pub fn verify(&self) -> bool {
        match self.0.verify() {
            Ok(()) => true,
            Err(err) => {
                log(&format!("Warning Transaction is not valid: {err:?}"));
                false
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn hash(&self) -> TransactionHash {
        self.0.hash().into()
    }

    #[wasm_bindgen(getter)]
    pub fn expired(&self) -> bool {
        let now: DateTime<Utc> = Utc::now();
        let now_millis = now.timestamp_millis() as u64;
        let timestamp = Timestamp::from(now_millis);
        match self.0.expired(timestamp) {
            false => false,
            true => {
                error("Transaction has expired");
                true
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "expires")]
    pub fn expires_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.expires()) {
            Ok(expires) => expires,
            Err(err) => {
                error(&format!("Error serializing expires to JSON: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "signers")]
    pub fn signers_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.signers()) {
            Ok(signers) => signers,
            Err(err) => {
                error(&format!("Error serializing signers to JSON: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "authorization_keys")]
    pub fn authorization_keys_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.authorization_keys()) {
            Ok(authorization_keys) => authorization_keys,
            Err(err) => {
                error(&format!(
                    "Error serializing authorization_keys to JSON: {err:?}"
                ));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "sign")]
    pub fn sign(&mut self, secret_key: &str) -> Transaction {
        let mut transaction: _Transaction = self.0.clone();
        let secret_key_from_pem = secret_key_from_pem(secret_key);
        if let Err(err) = secret_key_from_pem {
            error(&format!("Error loading secret key: {err:?}"));
            return transaction.into();
        }
        transaction.sign(&secret_key_from_pem.unwrap());
        if let Err(err) = transaction.verify() {
            error(&format!("Transaction is not a valid: {err:?}"));
        }
        transaction.into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "approvalsHash")]
    pub fn compute_approvals_hash_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.compute_approvals_hash()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!(
                    "Error serializing compute_approvals_hash to JSON: {err:?}"
                ));
                JsValue::null()
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "approvals")]
    pub fn approvals_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.approvals()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing approvals to JSON: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn is_native(&self) -> bool {
        match &self.0 {
            _Transaction::Deploy(deploy) => deploy.is_transfer(),
            _Transaction::V1(_transaction_v1) => {
                match self.target() {
                    Ok(target) => target == TransactionTarget::Native,
                    Err(_) => false, // Return false on error
                }
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "target")]
    pub fn target_js_alias(&self) -> JsValue {
        match self.target() {
            Ok(target_value) => match JsValue::from_serde(&target_value) {
                Ok(json) => json,
                Err(err) => {
                    error(&format!("Error serializing target to JSON: {err:?}"));
                    JsValue::null()
                }
            },
            Err(err) => {
                error(&format!("Error retrieving target: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn is_standard_payment(&self) -> bool {
        self.0.is_standard_payment()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "session_args")]
    pub fn session_args_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.session_args()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing session_args to JSON: {err:?}"));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "addSignature")]
    pub fn add_signature_json_alias(&self, public_key: &str, signature: &str) -> Transaction {
        self.add_signature(public_key, signature)
    }

    #[wasm_bindgen(getter)]
    pub fn entry_point(&self) -> String {
        match &self.0 {
            _Transaction::Deploy(deploy) => deploy.session().entry_point_name().into(),
            _Transaction::V1(transaction_v1) => {
                match transaction_v1.deserialize_field::<TransactionEntryPoint>(ENTRY_POINT_MAP_KEY)
                {
                    Ok(entry_point) => entry_point.to_string(),
                    Err(_) => String::new(), // Return an empty string on error
                }
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn ttl(&self) -> String {
        self.0.ttl().to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn timestamp(&self) -> String {
        self.0.timestamp().to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn size_estimate(&self) -> usize {
        self.0.size_estimate()
    }

    #[wasm_bindgen(getter)]
    pub fn chain_name(&self) -> String {
        self.0.chain_name()
    }

    #[wasm_bindgen(getter)]
    pub fn initiator_addr(&self) -> String {
        let initiator_addr: InitiatorAddr = self.0.initiator_addr().clone();
        match initiator_addr {
            InitiatorAddr::PublicKey(public_key) => public_key.to_hex(),
            InitiatorAddr::AccountHash(hash) => hash.to_formatted_string(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn pricing_mode(&self) -> PricingMode {
        match &self.0 {
            _Transaction::Deploy(_deploy) => {
                unimplemented!("pricing_mode not implemented in deploy!")
            }
            _Transaction::V1(transaction_v1) => transaction_v1.pricing_mode().clone().into(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn payment_amount(&self) -> Option<u64> {
        match &self.0 {
            _Transaction::Deploy(_deploy) => _deploy
                .session()
                .payment_amount(1u8)
                .map(|g| g.value().as_u64()),
            _Transaction::V1(transaction_v1) => {
                if let _PricingMode::PaymentLimited { payment_amount, .. } =
                    transaction_v1.pricing_mode()
                {
                    Some(*payment_amount)
                } else {
                    None
                }
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn additional_computation_factor(&self) -> u8 {
        match &self.0 {
            _Transaction::Deploy(_deploy) => {
                unimplemented!("additional_computation_factor not implemented in deploy!")
            }
            _Transaction::V1(transaction_v1) => transaction_v1
                .pricing_mode()
                .additional_computation_factor(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn receipt(&self) -> Digest {
        match &self.0 {
            _Transaction::Deploy(_deploy) => {
                unimplemented!("receipt not implemented in deploy!")
            } // TODO
            // _Transaction::V1(transaction_v1) => transaction_v1.pricing_mode().receipt().into(),
            _Transaction::V1(_transaction_v1) => Digest::new("0").unwrap(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn gas_price_tolerance(&self) -> u8 {
        match &self.0 {
            _Transaction::Deploy(deploy) => deploy
                .gas_price_tolerance()
                .unwrap_or(DEFAULT_GAS_PRICE_TOLERANCE),
            _Transaction::V1(transaction_v1) => transaction_v1.gas_price_tolerance(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn account_hash(&self) -> AccountHash {
        let initiator_addr: InitiatorAddr = self.0.initiator_addr().clone();
        initiator_addr.account_hash().into()
    }

    #[cfg(all(target_arch = "wasm32", feature = "transaction"))]
    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg_js_alias(
        &mut self,
        js_value_arg: JsValue,
        secret_key: Option<String>,
    ) -> Result<Transaction, JsError> {
        let mut args = self.session_args().clone();
        let new_args = match insert_js_value_arg(&mut args, js_value_arg) {
            Ok(new_args) => new_args,
            Err(err) => return Err(JsError::new(&format!("Error adding argument: {err}"))),
        };
        Ok(self.add_arg_common(new_args, secret_key))
    }
}

impl Transaction {
    pub fn session_args(&self) -> RuntimeArgs {
        match &self.0 {
            _Transaction::Deploy(deploy) => deploy.session().args().clone(),
            _Transaction::V1(transaction_v1) => {
                let args = transaction_v1
                    .deserialize_field::<TransactionArgs>(ARGS_MAP_KEY)
                    .map_err(|err| SdkError::FieldDeserialization {
                        index: TARGET_MAP_KEY,
                        error: format!("{err:?}"),
                    })
                    .unwrap();

                match args {
                    TransactionArgs::Named(runtime_args) => runtime_args,
                    TransactionArgs::Bytesrepr(_) => unimplemented!(), // TODO Return TransactionArgs for new Bytesrepr
                }
            }
        }
    }

    pub fn target(&self) -> Result<TransactionTarget, Box<SdkError>> {
        match &self.0 {
            _Transaction::Deploy(_deploy) => unimplemented!("target not implemented for deploy!"),
            _Transaction::V1(transaction_v1) => Ok(transaction_v1
                .deserialize_field::<TransactionTarget>(TARGET_MAP_KEY)
                .map_err(|err| SdkError::FieldDeserialization {
                    index: TARGET_MAP_KEY,
                    error: format!("{err:?}"),
                })?),
        }
    }

    #[cfg(feature = "transaction")]
    pub fn add_arg(&mut self, new_value_arg: String, secret_key: Option<String>) -> Transaction {
        let mut session_args = self.session_args().clone();
        let new_args = insert_arg(&mut session_args, new_value_arg);
        self.add_arg_common(new_args, secret_key)
    }

    #[cfg(feature = "transaction")]
    fn add_arg_common(
        &mut self,
        new_args: &RuntimeArgs,
        secret_key: Option<String>,
    ) -> Transaction {
        self.rebuild(
            RebuildOverrides {
                secret_key,
                session_args: Some(new_args.clone()),
                ..Default::default()
            },
            NewBuilderParams::default(),
        )
    }

    pub fn to_json_string(&self) -> Result<String, Box<SdkError>> {
        Ok(serde_json::to_string(&self.0).map_err(SdkError::from)?)
    }

    pub fn from_json_string(json_str: &str) -> Result<Self, Box<SdkError>> {
        Ok(serde_json::from_str(json_str).map_err(SdkError::from)?)
    }

    pub fn compute_approvals_hash(&self) -> Result<ApprovalsHash, bytesrepr::Error> {
        self.0.compute_approvals_hash()
    }

    pub fn approvals(&self) -> Vec<Approval> {
        self.0.approvals().iter().cloned().collect()
    }

    pub fn expires(&self) -> Timestamp {
        self.0.expires()
    }

    pub fn signers(&self) -> Vec<AccountHash> {
        self.0
            .clone()
            .signers()
            .into_iter()
            .map(Into::into)
            .collect()
    }

    pub fn authorization_keys(&self) -> Vec<AccountHash> {
        self.approvals()
            .iter()
            .map(|approval| approval.signer().to_account_hash())
            .map(Into::into)
            .collect()
    }

    pub fn add_signature(&self, public_key: &str, signature: &str) -> Transaction {
        // Serialize the existing approvals to JSON
        let casper_transaction: _Transaction = self.0.clone();
        let existing_approvals_json = casper_transaction
            .approvals()
            .iter()
            .map(|approval| {
                json!({
                    "signer": approval.signer().to_hex(),
                    "signature": approval.signature().to_hex(),
                })
            })
            .collect::<Vec<_>>();

        // Create JSON object for the new approval
        let new_approval_json = json!({
            "signer": public_key,
            "signature": signature,
        });

        // Append the new approval to existing approvals
        let mut all_approvals_json = existing_approvals_json;
        all_approvals_json.push(new_approval_json);

        // Convert the approvals JSON back to string
        let updated_approvals_str = serde_json::to_string(&all_approvals_json)
            .expect("Failed to serialize updated approvals JSON");

        // Replace the approvals field in the original transaction JSON string
        let mut transaction_json: Value = serde_json::from_str(&self.to_json_string().unwrap())
            .expect("Failed to deserialize transaction JSON");
        transaction_json["Version1"]["approvals"] = serde_json::from_str(&updated_approvals_str)
            .expect("Failed to deserialize updated approvals JSON");

        // Convert the updated transaction JSON back to a Transaction struct
        let updated_transaction: Transaction = serde_json::from_value(transaction_json)
            .expect("Failed to deserialize updated transaction JSON");

        updated_transaction
    }

    #[cfg(feature = "transaction")]
    fn transaction_entry_point(&self) -> TransactionEntryPoint {
        match &self.0 {
            _Transaction::Deploy(_) => TransactionEntryPoint::Call,
            _Transaction::V1(transaction_v1) => transaction_v1
                .deserialize_field::<TransactionEntryPoint>(ENTRY_POINT_MAP_KEY)
                .unwrap_or(TransactionEntryPoint::Call),
        }
    }

    #[cfg(feature = "transaction")]
    fn pricing_mode_typed(&self) -> _PricingMode {
        match &self.0 {
            _Transaction::Deploy(_) => {
                unimplemented!("pricing_mode not implemented in deploy!")
            }
            _Transaction::V1(transaction_v1) => transaction_v1.pricing_mode().clone(),
        }
    }

    /// Rebuild via public `TransactionV1Builder` (lib path). Does not rematerialize StrParams or
    /// call `cli::make_transaction`.
    #[cfg(feature = "transaction")]
    fn rebuild(
        &self,
        overrides: RebuildOverrides,
        new_builder_params: NewBuilderParams,
    ) -> Transaction {
        let RebuildOverrides {
            chain_name,
            ttl,
            timestamp,
            initiator_addr,
            secret_key,
            session_args,
        } = overrides;

        let mut builder = self.seed_transaction_v1_builder(new_builder_params);

        let chain_name = chain_name.unwrap_or_else(|| self.chain_name());
        let ttl = ttl.unwrap_or_else(|| self.0.ttl());
        let timestamp = timestamp.unwrap_or_else(|| self.0.timestamp());
        let initiator_addr = initiator_addr.unwrap_or_else(|| self.0.initiator_addr().clone());
        let runtime_args = session_args.unwrap_or_else(|| self.session_args());

        builder = builder
            .with_chain_name(chain_name)
            .with_ttl(ttl)
            .with_timestamp(timestamp)
            .with_pricing_mode(self.pricing_mode_typed())
            .with_initiator_addr(initiator_addr)
            .with_runtime_args(runtime_args);

        let secret_key_owned: Option<SecretKey> = secret_key.as_ref().map(|pem| {
            secret_key_from_pem(pem)
                .map_err(|err| {
                    error(&format!("Error loading secret key: {err:?}"));
                    err
                })
                .unwrap_or_else(|_| SecretKey::generate_ed25519().unwrap())
        });
        if let Some(ref sk) = secret_key_owned {
            builder = builder.with_secret_key(sk);
        }

        let transaction_v1 = builder
            .build()
            .map_err(|err| {
                let err_msg = format!("Error building transaction: {err}");
                log(&err_msg);
                err_msg
            })
            .unwrap();
        transaction_v1.into()
    }

    #[cfg(feature = "transaction")]
    fn seed_transaction_v1_builder(
        &self,
        NewBuilderParams {
            new_hash,
            new_package_hash,
            new_entry_point,
            new_alias,
            new_version,
            new_transaction_bytes,
            new_is_install_upgrade,
        }: NewBuilderParams,
    ) -> TransactionV1Builder<'_> {
        let target = self
            .target()
            .map_err(|err| error(&format!("Failed to get transaction target: {err:?}")))
            .unwrap();
        let live_entry_point = self.transaction_entry_point();
        let entry_point = match new_entry_point {
            Some(ref name) => TransactionEntryPoint::from(name.as_str()),
            None => live_entry_point.clone(),
        };
        let entry_point_name_for_ctor = match &entry_point {
            TransactionEntryPoint::Custom(name) => name.clone(),
            other => other.to_string(),
        };

        let builder = match target {
            TransactionTarget::Native => match entry_point {
                TransactionEntryPoint::Transfer => {
                    let args = self.session_args();

                    let target_arg = args.get("target").expect("Expected 'target' argument");

                    let transfer_target = if let Ok(public_key) =
                        target_arg.clone().into_t::<_PublicKey>()
                    {
                        _TransferTarget::PublicKey(public_key)
                    } else if let Ok(account_hash) = target_arg.clone().into_t::<_AccountHash>() {
                        _TransferTarget::AccountHash(account_hash)
                    } else if let Ok(uref) = target_arg.clone().into_t::<_URef>() {
                        _TransferTarget::URef(uref)
                    } else {
                        unimplemented!("unimplemented target: {:?}", target_arg);
                    };

                    let amount = args
                        .get("amount")
                        .and_then(|cl_value| cl_value.clone().into_t::<U512>().ok())
                        .expect("Expected 'amount' to be of type U512");

                    let maybe_id = args
                        .get("id")
                        .and_then(|cl_value| cl_value.clone().into_t::<Option<u64>>().ok())
                        .flatten();

                    let maybe_source: Option<_URef> = args
                        .get("source")
                        .and_then(|cl_value| cl_value.clone().into_t::<Option<_URef>>().ok())
                        .flatten();

                    TransactionV1Builder::new_transfer(
                        amount,
                        maybe_source,
                        transfer_target,
                        maybe_id,
                    )
                    .map_err(|err| {
                        error(&format!("Failed to seed transfer builder: {err:?}"));
                        err
                    })
                    .unwrap()
                }
                _ => {
                    unimplemented!(
                        "unimplemented native entry point: {}",
                        entry_point_name_for_ctor
                    );
                }
            },
            TransactionTarget::Stored { id, runtime } => {
                let builder = match id {
                    TransactionInvocationTarget::ByHash(hash) => {
                        let entity_hash: _AddressableEntityHash = new_hash
                            .map(Into::into)
                            .unwrap_or_else(|| _AddressableEntityHash::from(hash));
                        TransactionV1Builder::new_targeting_invocable_entity(
                            entity_hash,
                            entry_point_name_for_ctor,
                            runtime,
                        )
                    }
                    TransactionInvocationTarget::ByName(alias) => {
                        TransactionV1Builder::new_targeting_invocable_entity_via_alias(
                            new_alias.unwrap_or(alias),
                            entry_point_name_for_ctor,
                            runtime,
                        )
                    }
                    TransactionInvocationTarget::ByPackageHash {
                        addr,
                        version,
                        protocol_version_major,
                    } => {
                        let package_hash: _PackageHash = new_package_hash
                            .map(Into::into)
                            .unwrap_or_else(|| PackageHash::from_bytes(addr.into()).into());
                        let version = Some(new_version.unwrap_or(version.unwrap_or(1)));
                        TransactionV1Builder::new_targeting_package_with_version_key(
                            package_hash,
                            version,
                            protocol_version_major,
                            entry_point_name_for_ctor,
                            runtime,
                        )
                    }
                    TransactionInvocationTarget::ByPackageName {
                        name,
                        version,
                        protocol_version_major,
                    } => {
                        let version = Some(new_version.unwrap_or(version.unwrap_or(1)));
                        TransactionV1Builder::new_targeting_package_via_alias_with_version_key(
                            new_alias.unwrap_or(name),
                            version,
                            protocol_version_major,
                            entry_point_name_for_ctor,
                            runtime,
                        )
                    }
                };
                builder.with_entry_point(entry_point)
            }
            TransactionTarget::Session {
                is_install_upgrade,
                module_bytes: transaction_bytes,
                runtime,
            } => {
                let default: _Bytes = transaction_bytes;
                let bytes_default = Bytes::default();
                let new_bytes = new_transaction_bytes.unwrap_or(&bytes_default);
                let new_transaction_bytes: _Bytes = {
                    let new_bytes: _Bytes = _Bytes::from((*new_bytes).to_vec());
                    if !new_bytes.is_empty() {
                        new_bytes
                    } else {
                        default
                    }
                };

                let mut builder = TransactionV1Builder::new_session(
                    new_is_install_upgrade.unwrap_or(is_install_upgrade),
                    new_transaction_bytes,
                    runtime,
                );
                if new_entry_point.is_some() {
                    builder = builder.with_entry_point(entry_point);
                }
                builder
            }
        };

        builder
    }
}

#[derive(Default)]
#[cfg(feature = "transaction")]
struct NewBuilderParams<'a> {
    new_hash: Option<AddressableEntityHash>,
    new_package_hash: Option<PackageHash>,
    new_entry_point: Option<String>,
    new_alias: Option<String>,
    new_version: Option<u32>,
    new_transaction_bytes: Option<&'a Bytes>,
    new_is_install_upgrade: Option<bool>,
}

/// Typed overrides for lib-path rebuild (not CLI StrParams).
#[derive(Default)]
#[cfg(feature = "transaction")]
struct RebuildOverrides {
    chain_name: Option<String>,
    ttl: Option<TimeDiff>,
    timestamp: Option<Timestamp>,
    initiator_addr: Option<InitiatorAddr>,
    secret_key: Option<String>,
    session_args: Option<RuntimeArgs>,
}

impl From<Transaction> for _Transaction {
    fn from(transaction: Transaction) -> Self {
        transaction.0
    }
}

impl From<_Transaction> for Transaction {
    fn from(transaction: _Transaction) -> Self {
        Transaction(transaction)
    }
}

impl From<Deploy> for Transaction {
    fn from(deploy: Deploy) -> Self {
        _Transaction::Deploy(deploy).into()
    }
}

impl From<TransactionV1> for Transaction {
    fn from(transaction: TransactionV1) -> Self {
        _Transaction::V1(transaction).into()
    }
}

#[cfg(all(test, feature = "transaction"))]
mod tests {
    use super::*;
    use crate::helpers::public_key_from_secret_key;
    use sdk_tests::{
        config::PAYMENT_AMOUNT,
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[test]
    fn test_add_arg_without_secret_key() {
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let builder_params = TransactionBuilderParams::default();
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        let transaction = transaction.add_arg("foo:bool='false".to_string(), None);

        assert_eq!(transaction.session_args().len(), 1);
        // Direct RuntimeArgs path (bool false), not JSON→CLI rematerialization.
        let expected_inner_bytes = vec![0];

        assert_eq!(
            *transaction.session_args().get("foo").unwrap().inner_bytes(),
            expected_inner_bytes
        );
    }

    #[test]
    fn test_add_arg_with_secret_key() {
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_initiator_addr(&initiator_addr);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let builder_params = TransactionBuilderParams::default();
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        let transaction = transaction.add_arg("foo:bool='false".to_string(), None);

        let expected_inner_bytes = vec![0];

        assert_eq!(
            *transaction.session_args().get("foo").unwrap().inner_bytes(),
            expected_inner_bytes
        );
    }

    #[test]
    fn test_with_ttl_preserves_session_args() {
        let (_, _, _, _, chain_name) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let builder_params = TransactionBuilderParams::default();
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        let transaction = transaction.add_arg("foo:bool='true".to_string(), None);
        let rebuilt = transaction.with_ttl("1h", None);

        assert_eq!(rebuilt.ttl(), "1h");
        assert_eq!(rebuilt.chain_name(), chain_name);
        assert_eq!(rebuilt.session_args().len(), 1);
        assert_eq!(
            *rebuilt.session_args().get("foo").unwrap().inner_bytes(),
            vec![1]
        );
    }

    #[test]
    fn test_runtime_args_to_json_array_helper() {
        let mut runtime_args = RuntimeArgs::new();
        runtime_args
            .insert("collection_name", "enhanced-nft-1")
            .unwrap();
        runtime_args.insert("collection_symbol", "ENFT-1").unwrap();
        runtime_args.insert("total_token_supply", 10u64).unwrap();
        runtime_args.insert("ownership_mode", 0u8).unwrap();
        runtime_args.insert("nft_kind", 1u8).unwrap();
        runtime_args.insert("allow_minting", true).unwrap();
        runtime_args
            .insert("owner_reverse_lookup_mode", 0u8)
            .unwrap();
        runtime_args.insert("nft_metadata_kind", 2u8).unwrap();
        runtime_args.insert("identifier_mode", 0u8).unwrap();
        runtime_args.insert("metadata_mutability", 0u8).unwrap();
        runtime_args.insert("events_mode", 1u8).unwrap();

        let json_array = crate::types::runtime_args::runtime_args_to_json_array(&runtime_args);
        let generated_json: serde_json::Value = serde_json::to_value(&json_array).unwrap();

        let expected_json = r#"[{"name":"collection_name","type":{"ByteArray":23},"value":[18,0,0,0,14,0,0,0,101,110,104,97,110,99,101,100,45,110,102,116,45,49,10]},{"name":"collection_symbol","type":{"ByteArray":15},"value":[10,0,0,0,6,0,0,0,69,78,70,84,45,49,10]},{"name":"total_token_supply","type":{"ByteArray":13},"value":[8,0,0,0,10,0,0,0,0,0,0,0,5]},{"name":"ownership_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"nft_kind","type":{"ByteArray":6},"value":[1,0,0,0,1,3]},{"name":"allow_minting","type":{"ByteArray":6},"value":[1,0,0,0,1,0]},{"name":"owner_reverse_lookup_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"nft_metadata_kind","type":{"ByteArray":6},"value":[1,0,0,0,2,3]},{"name":"identifier_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"metadata_mutability","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"events_mode","type":{"ByteArray":6},"value":[1,0,0,0,1,3]}]"#;

        assert_eq!(
            &serde_json::to_string(&generated_json).unwrap(),
            expected_json
        );
    }
}
