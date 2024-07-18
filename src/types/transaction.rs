use super::{
    account_hash::AccountHash,
    addressable_entity_hash::AddressableEntityHash,
    cl::bytes::Bytes,
    package_hash::PackageHash,
    public_key::PublicKey,
    sdk_error::SdkError,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
    uref::URef,
};
#[cfg(target_arch = "wasm32")]
use crate::helpers::insert_js_value_arg;
use crate::{
    debug::{error, log},
    helpers::{
        get_current_timestamp, get_ttl_or_default, insert_arg, parse_timestamp, parse_ttl,
        secret_key_from_pem,
    },
    make_transaction,
    make_transfer_transaction::make_transfer_transaction,
    types::transaction_hash::TransactionHash,
};
use casper_types::{
    bytesrepr::{self, Bytes as _Bytes},
    Approval, ApprovalsHash, AsymmetricType, Deploy, InitiatorAddr, PricingMode, RuntimeArgs,
    SecretKey, TimeDiff, Timestamp, Transaction as _Transaction, TransactionCategory,
    TransactionHeader, TransactionV1, TransactionV1Body, TransactionV1Builder,
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

#[derive(Default)]
struct BuildParams {
    chain_name: Option<String>,
    timestamp: Option<Timestamp>,
    ttl: Option<TimeDiff>,
    body: Option<TransactionV1Body>,
    pricing_mode: Option<PricingMode>,
    initiator_addr: Option<InitiatorAddr>,
    secret_key: Option<String>,
}

#[wasm_bindgen]
impl Transaction {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(transaction: JsValue) -> Self {
        let transaction: _Transaction = transaction
            .into_serde()
            .map_err(|err| error(&format!("Failed to deserialize Transaction: {:?}", err)))
            .unwrap();
        transaction.into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.0) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing data to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    // static context
    #[wasm_bindgen(js_name = "newSession")]
    pub fn new_session(
        builder_params: TransactionBuilderParams,
        transaction_params: TransactionStrParams,
    ) -> Result<Transaction, String> {
        make_transaction(builder_params, transaction_params)
            .map(Into::into)
            .map_err(|err| {
                let err_msg = format!("Error creating body transaction: {}", err);
                err_msg
            })
    }

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
        .map(Into::into)
        .map_err(|err| format!("Error creating transfer transaction: {}", err))
    }

    #[wasm_bindgen(js_name = "withTTL")]
    pub fn with_ttl(&self, ttl: &str, secret_key: Option<String>) -> Transaction {
        let mut ttl = parse_ttl(ttl);
        if let Err(err) = &ttl {
            error(&format!("Error parsing TTL: {}", err));
            ttl = parse_ttl(&get_ttl_or_default(None));
        }
        self.build(BuildParams {
            secret_key,
            ttl: Some(ttl.unwrap()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withTimestamp")]
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Transaction {
        let mut timestamp = parse_timestamp(timestamp);
        if let Err(err) = &timestamp {
            error(&format!("Error parsing Timestamp: {}", err));
            timestamp = parse_timestamp(&get_current_timestamp(None));
        }
        self.build(BuildParams {
            secret_key,
            timestamp: Some(timestamp.unwrap()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withChainName")]
    pub fn with_chain_name(&self, chain_name: &str, secret_key: Option<String>) -> Transaction {
        self.build(BuildParams {
            secret_key,
            chain_name: Some(chain_name.to_string()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withPublicKey")]
    pub fn with_public_key(
        &self,
        public_key: PublicKey,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            initiator_addr: Some(InitiatorAddr::PublicKey(public_key.into())),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withAccountHash")]
    pub fn with_account_hash(
        &self,
        account_hash: AccountHash,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            initiator_addr: Some(InitiatorAddr::AccountHash(account_hash.into())),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withEntryPoint")]
    pub fn with_entry_point(&self, entry_point: &str, secret_key: Option<String>) -> Transaction {
        self.build(BuildParams {
            secret_key,
            body: Some(modify_body(
                &self.body(),
                NewBodyParams {
                    new_entry_point: Some(entry_point.to_string()),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withEntityHash")]
    pub fn with_entity_hash(
        &self,
        hash: AddressableEntityHash,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            body: Some(modify_body(
                &self.body(),
                NewBodyParams {
                    new_hash: Some(hash),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withPackageHash")]
    pub fn with_package_hash(
        &self,
        package_hash: PackageHash,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            body: Some(modify_body(
                &self.body(),
                NewBodyParams {
                    new_package_hash: Some(package_hash),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withTransactionBytes")]
    pub fn with_transaction_bytes(
        &self,
        transaction_bytes: Bytes,
        secret_key: Option<String>,
    ) -> Transaction {
        self.build(BuildParams {
            secret_key,
            body: Some(modify_body(
                &self.body(),
                NewBodyParams {
                    new_transaction_bytes: Some(&transaction_bytes),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withSecretKey")]
    pub fn with_secret_key(&self, secret_key: Option<String>) -> Transaction {
        self.build(BuildParams {
            secret_key,
            ..Default::default()
        })
    }

    // Load body from json
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "withBody")]
    pub fn with_body(&self, body: JsValue, secret_key: Option<String>) -> Transaction {
        let body_item_result = body.into_serde();

        match body_item_result {
            Ok(body_item) => self.build(BuildParams {
                secret_key,
                body: Some(body_item),
                ..Default::default()
            }),
            Err(err) => {
                error(&format!("Error parsing body: {}", err));
                self.0.clone().into()
            }
        }
    }

    #[wasm_bindgen(js_name = "verify")]
    pub fn verify(&self) -> bool {
        match self.0.clone().verify() {
            Ok(()) => true,
            Err(err) => {
                log(&format!("Warning Transaction is not valid: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn hash(&self) -> TransactionHash {
        self.0.clone().hash().into()
    }

    #[wasm_bindgen(getter)]
    pub fn expired(&self) -> bool {
        let now: DateTime<Utc> = Utc::now();
        let now_millis = now.timestamp_millis() as u64;
        let timestamp = Timestamp::from(now_millis);
        match self.0.clone().expired(timestamp) {
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
                error(&format!("Error serializing expires to JSON: {:?}", err));
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
                error(&format!("Error serializing signers to JSON: {:?}", err));
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
                    "Error serializing authorization_keys to JSON: {:?}",
                    err
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
            error(&format!("Error loading secret key: {:?}", err));
            return transaction.into();
        }
        transaction.sign(&secret_key_from_pem.unwrap());
        if let Err(err) = transaction.verify() {
            error(&format!("Transaction has not a valid: {:?}", err));
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
                    "Error serializing compute_approvals_hash to JSON: {:?}",
                    err
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
                error(&format!("Error serializing approvals to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(getter, js_name = "header")]
    pub fn header_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.header()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing header to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn is_native(&self) -> bool {
        self.0.clone().is_native()
    }

    #[wasm_bindgen(getter)]
    pub fn is_standard_payment(&self) -> bool {
        self.0.clone().is_standard_payment()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "session_args")]
    pub fn session_args_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.session_args()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!(
                    "Error serializing session_args to JSON: {:?}",
                    err
                ));
                JsValue::null()
            }
        }
    }

    #[wasm_bindgen(js_name = "addSignature")]
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

    #[wasm_bindgen(getter)]
    pub fn entry_point(&self) -> String {
        self.0.clone().entry_point().to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn ttl(&self) -> String {
        self.0.clone().ttl().to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn timestamp(&self) -> String {
        self.0.clone().timestamp().to_string()
    }

    #[wasm_bindgen(getter)]
    pub fn size_estimate(&self) -> usize {
        self.0.clone().size_estimate()
    }

    #[wasm_bindgen(getter)]
    pub fn chain_name(&self) -> String {
        match &self.0.header() {
            TransactionHeader::Deploy(header) => header.chain_name().to_string(),
            TransactionHeader::V1(header) => header.chain_name().to_string(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn initiator_addr(&self) -> String {
        let initiator_addr: InitiatorAddr = self.0.clone().initiator_addr().clone();
        match initiator_addr {
            InitiatorAddr::PublicKey(public_key) => public_key.to_hex(),
            InitiatorAddr::AccountHash(hash) => hash.to_formatted_string(),
        }
    }

    #[wasm_bindgen(getter)]
    pub fn account_hash(&self) -> AccountHash {
        let initiator_addr: InitiatorAddr = self.0.clone().initiator_addr().clone();
        initiator_addr.account_hash().into()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg_js_alias(
        &mut self,
        js_value_arg: JsValue,
        secret_key: Option<String>,
    ) -> Result<Transaction, JsError> {
        let mut args = self.0.clone().session_args().clone();
        let new_args = match insert_js_value_arg(&mut args, js_value_arg) {
            Ok(new_args) => new_args,
            Err(err) => return Err(JsError::new(&format!("Error adding argument: {}", err))),
        };
        let new_body = modify_body(
            &self.body(),
            NewBodyParams {
                new_args: Some(new_args),
                ..Default::default()
            },
        );

        Ok(self.build(BuildParams {
            secret_key,
            body: Some(new_body),
            ..Default::default()
        }))
    }
}

impl Transaction {
    pub fn session_args(&self) -> RuntimeArgs {
        self.0.clone().session_args().clone()
    }

    fn body(&self) -> TransactionV1Body {
        let body = match self.0.clone() {
            _Transaction::Deploy(_deploy) => todo!("deploy body in transaction"),
            _Transaction::V1(ref transaction_v1) => transaction_v1.body().clone(),
        };
        body
    }

    pub fn add_arg(&mut self, new_value_arg: String, secret_key: Option<String>) -> Transaction {
        let mut args = self.0.clone().session_args().clone();
        let new_args = insert_arg(&mut args, new_value_arg);
        let new_body = modify_body(
            &self.body(),
            NewBodyParams {
                new_args: Some(new_args),
                ..Default::default()
            },
        );

        self.build(BuildParams {
            secret_key,
            body: Some(new_body),
            ..Default::default()
        })
    }

    pub fn to_json_string(&self) -> Result<String, SdkError> {
        serde_json::to_string(&self.0).map_err(SdkError::from)
    }

    pub fn from_json_string(json_str: &str) -> Result<Deploy, SdkError> {
        serde_json::from_str(json_str).map_err(Into::into)
    }

    pub fn compute_approvals_hash(&self) -> Result<ApprovalsHash, bytesrepr::Error> {
        self.0.clone().compute_approvals_hash()
    }

    pub fn approvals(&self) -> Vec<Approval> {
        self.0.clone().approvals().iter().cloned().collect()
    }

    pub fn header(&self) -> TransactionHeader {
        self.0.clone().header()
    }

    pub fn expires(&self) -> Timestamp {
        self.0.clone().expires()
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
        self.0
            .clone()
            .authorization_keys()
            .into_iter()
            .map(Into::into)
            .collect()
    }

    fn build(&self, transaction_params: BuildParams) -> Transaction {
        let BuildParams {
            chain_name,
            ttl,
            timestamp,
            initiator_addr,
            body,
            pricing_mode,
            secret_key,
        } = transaction_params;
        let transaction = self.0.clone();
        let chain_name = if let Some(chain_name) = chain_name {
            chain_name
        } else {
            self.chain_name()
        };
        let ttl = if let Some(ttl) = ttl {
            ttl
        } else {
            transaction.ttl()
        };
        let timestamp = if let Some(timestamp) = timestamp {
            timestamp
        } else {
            transaction.timestamp()
        };

        let initiator_addr = if let Some(initiator_addr) = initiator_addr {
            initiator_addr
        } else {
            transaction.initiator_addr().clone()
        };

        let body = if let Some(body) = body {
            body
        } else {
            match transaction {
                _Transaction::Deploy(_deploy) => todo!("deploy body in transaction"),
                _Transaction::V1(ref transaction_v1) => transaction_v1.body().clone(),
            }
        };

        let pricing_mode = if let Some(pricing_mode) = pricing_mode {
            pricing_mode
        } else {
            match transaction {
                _Transaction::Deploy(_deploy) => todo!("deploy pricing_mode in transaction"),
                _Transaction::V1(transaction_v1) => transaction_v1.pricing_mode().clone(),
            }
        };

        let mut transaction_builder = TransactionV1Builder::new(body)
            .with_chain_name(chain_name)
            .with_pricing_mode(pricing_mode)
            .with_initiator_addr(initiator_addr)
            .with_ttl(ttl)
            .with_timestamp(timestamp);

        let secret_key_result = secret_key
            .clone()
            .map(|key| secret_key_from_pem(&key).unwrap())
            .unwrap_or_else(|| {
                if secret_key.is_some() {
                    error("Error loading secret key");
                }
                // Default will never be used in next if secret_key.is_some()
                SecretKey::generate_ed25519().unwrap()
            });
        if secret_key.is_some() {
            transaction_builder = transaction_builder.with_secret_key(&secret_key_result);
        }
        let transaction = transaction_builder
            .build()
            .map_err(|err| error(&format!("Failed to build transaction: {:?}", err)))
            .unwrap();

        let transaction: Transaction = transaction.into();
        // let _ = transaction.validate_transaction_size();
        transaction
    }
}

#[derive(Default)]
struct NewBodyParams<'a> {
    new_args: Option<&'a RuntimeArgs>,
    new_hash: Option<AddressableEntityHash>,
    new_package_hash: Option<PackageHash>,
    new_entry_point: Option<String>,
    new_alias: Option<String>,
    new_version: Option<u32>,
    new_transaction_bytes: Option<&'a Bytes>,
}

fn modify_body(
    body: &TransactionV1Body,
    NewBodyParams {
        new_args,
        new_hash,
        new_package_hash,
        new_entry_point,
        new_alias,
        new_version,
        new_transaction_bytes,
    }: NewBodyParams,
) -> TransactionV1Body {
    let runtime_args = new_args.cloned().unwrap_or_else(|| body.args().clone());
    let entry_point = body.entry_point().to_string();
    let transaction_category =
        TransactionCategory::try_from(body.transaction_category()).unwrap_or_default();
    match body.target() {
        casper_types::TransactionTarget::Native => {
            unimplemented!("native transfer not implemented!")
        }
        casper_types::TransactionTarget::Stored { id, runtime: _ } => match id {
            casper_types::TransactionInvocationTarget::ByHash(hash) => {
                (*TransactionV1Builder::new_targeting_invocable_entity(
                    new_hash.unwrap_or((*hash).into()).into(),
                    new_entry_point.unwrap_or_else(|| entry_point.clone()),
                )
                .with_runtime_args(runtime_args)
                .body())
                .clone()
            }
            casper_types::TransactionInvocationTarget::ByName(alias) => {
                (*TransactionV1Builder::new_targeting_invocable_entity_via_alias(
                    new_alias.unwrap_or_else(|| alias.clone()),
                    new_entry_point.unwrap_or_else(|| entry_point.clone()),
                )
                .with_runtime_args(runtime_args)
                .body())
                .clone()
            }
            casper_types::TransactionInvocationTarget::ByPackageHash { addr, version } => {
                (*TransactionV1Builder::new_targeting_package(
                    new_package_hash.unwrap_or((*addr).into()).into(),
                    Some(new_version.unwrap_or(version.unwrap_or(1))),
                    new_entry_point.unwrap_or_else(|| entry_point.clone()),
                )
                .with_runtime_args(runtime_args)
                .body())
                .clone()
            }
            casper_types::TransactionInvocationTarget::ByPackageName { name, version } => {
                (*TransactionV1Builder::new_targeting_package_via_alias(
                    new_alias.unwrap_or_else(|| name.clone()),
                    Some(new_version.unwrap_or(version.unwrap_or(1))),
                    new_entry_point.unwrap_or_else(|| entry_point.clone()),
                )
                .with_runtime_args(runtime_args)
                .body())
                .clone()
            }
        },
        casper_types::TransactionTarget::Session {
            module_bytes: transaction_bytes,
            runtime: _,
        } => {
            let default: _Bytes = transaction_bytes.clone();
            let new_bytes = new_transaction_bytes.unwrap();
            let new: &Bytes = new_bytes;
            let new_transaction_bytes: _Bytes = {
                let new_bytes: _Bytes = _Bytes::from((*new).to_vec());
                if new_bytes.len() > 0 {
                    new_bytes
                } else {
                    default
                }
            };

            (*TransactionV1Builder::new_session(transaction_category, new_transaction_bytes)
                .with_runtime_args(runtime_args)
                .body())
            .clone()
        }
    }
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
