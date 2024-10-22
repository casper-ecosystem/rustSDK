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
    types::{digest::Digest, pricing_mode::PricingMode, transaction_hash::TransactionHash},
};

use casper_types::{
    bytesrepr::{self, Bytes as _Bytes, ToBytes},
    Approval, ApprovalsHash, AsymmetricType, Deploy, GasLimited, InitiatorAddr, RuntimeArgs,
    Timestamp, Transaction as _Transaction, TransactionEntryPoint, TransactionInvocationTarget,
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
        let transaction_params = TransactionStrParams::default();
        if let Ok(ttl) = ttl {
            transaction_params.set_ttl(Some(ttl.to_string()));
        }
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "withTimestamp")]
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Transaction {
        let mut timestamp = parse_timestamp(timestamp);
        if let Err(err) = &timestamp {
            error(&format!("Error parsing Timestamp: {}", err));
            timestamp = parse_timestamp(&get_current_timestamp(None));
        }
        let transaction_params = TransactionStrParams::default();
        if let Ok(timestamp) = timestamp {
            transaction_params.set_timestamp(Some(timestamp.to_string()));
        }
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "withChainName")]
    pub fn with_chain_name(&self, chain_name: &str, secret_key: Option<String>) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(chain_name);
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "withPublicKey")]
    pub fn with_public_key(
        &self,
        public_key: PublicKey,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        transaction_params
            .set_initiator_addr(&InitiatorAddr::PublicKey(public_key.into()).to_string());
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "withAccountHash")]
    pub fn with_account_hash(
        &self,
        account_hash: AccountHash,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        transaction_params
            .set_initiator_addr(&InitiatorAddr::AccountHash(account_hash.into()).to_string());
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "withEntryPoint")]
    pub fn with_entry_point(&self, entry_point: &str, secret_key: Option<String>) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        let new_builder_params = NewBuilderParams::<'_> {
            new_entry_point: Some(entry_point.to_string()),
            ..Default::default()
        };
        self.rebuild(transaction_params, new_builder_params)
    }

    #[wasm_bindgen(js_name = "withEntityHash")]
    pub fn with_entity_hash(
        &self,
        hash: AddressableEntityHash,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        let new_builder_params = NewBuilderParams::<'_> {
            new_hash: Some(hash),
            ..Default::default()
        };
        self.rebuild(transaction_params, new_builder_params)
    }

    #[wasm_bindgen(js_name = "withPackageHash")]
    pub fn with_package_hash(
        &self,
        package_hash: PackageHash,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        let new_builder_params = NewBuilderParams::<'_> {
            new_package_hash: Some(package_hash),
            ..Default::default()
        };
        self.rebuild(transaction_params, new_builder_params)
    }

    #[wasm_bindgen(js_name = "withTransactionBytes")]
    pub fn with_transaction_bytes(
        &self,
        transaction_bytes: Bytes,
        is_install_upgrade: Option<bool>,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        let new_builder_params = NewBuilderParams::<'_> {
            new_transaction_bytes: Some(&transaction_bytes),
            new_is_install_upgrade: is_install_upgrade,
            ..Default::default()
        };
        self.rebuild(transaction_params, new_builder_params)
    }

    #[wasm_bindgen(js_name = "withSecretKey")]
    pub fn with_secret_key(&self, secret_key: Option<String>) -> Transaction {
        let transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }
        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    #[wasm_bindgen(js_name = "verify")]
    pub fn verify(&self) -> bool {
        match self.0.verify() {
            Ok(()) => true,
            Err(err) => {
                log(&format!("Warning Transaction is not valid: {:?}", err));
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
                    error(&format!("Error serializing target to JSON: {:?}", err));
                    JsValue::null()
                }
            },
            Err(err) => {
                error(&format!("Error retrieving target: {:?}", err));
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

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg_js_alias(
        &mut self,
        js_value_arg: JsValue,
        secret_key: Option<String>,
    ) -> Result<Transaction, JsError> {
        let mut args = self.session_args().clone();
        let new_args = match insert_js_value_arg(&mut args, js_value_arg) {
            Ok(new_args) => new_args,
            Err(err) => return Err(JsError::new(&format!("Error adding argument: {}", err))),
        };
        Ok(self.add_arg_common(new_args, secret_key))
    }
}

impl Transaction {
    pub fn session_args(&self) -> RuntimeArgs {
        match &self.0 {
            _Transaction::Deploy(deploy) => deploy.session().args().clone(),
            _Transaction::V1(transaction_v1) => transaction_v1
                .deserialize_field::<RuntimeArgs>(ARGS_MAP_KEY)
                .unwrap_or_default(),
        }
    }

    pub fn target(&self) -> Result<TransactionTarget, SdkError> {
        match &self.0 {
            _Transaction::Deploy(_deploy) => unimplemented!("target not implemented for deploy!"),
            _Transaction::V1(transaction_v1) => transaction_v1
                .deserialize_field::<TransactionTarget>(TARGET_MAP_KEY)
                .map_err(|err| SdkError::FieldDeserialization {
                    index: TARGET_MAP_KEY,
                    error: format!("{:?}", err),
                }),
        }
    }

    pub fn add_arg(&mut self, new_value_arg: String, secret_key: Option<String>) -> Transaction {
        let mut session_args = self.session_args().clone();
        let new_args = insert_arg(&mut session_args, new_value_arg);
        self.add_arg_common(new_args, secret_key)
    }

    fn add_arg_common(
        &mut self,
        new_args: &RuntimeArgs,
        secret_key: Option<String>,
    ) -> Transaction {
        let transaction_params = TransactionStrParams::default();

        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        }

        let json_array = self.args_to_json_array(new_args);

        // Convert the json_array to a JSON string and set it in the transaction params
        transaction_params.set_session_args_json(&serde_json::to_string(&json_array).unwrap());

        self.rebuild(transaction_params, NewBuilderParams::default())
    }

    pub fn to_json_string(&self) -> Result<String, SdkError> {
        serde_json::to_string(&self.0).map_err(SdkError::from)
    }

    pub fn from_json_string(json_str: &str) -> Result<Deploy, SdkError> {
        serde_json::from_str(json_str).map_err(Into::into)
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

    fn args_to_json_array(&self, new_args: &RuntimeArgs) -> Vec<serde_json::Value> {
        new_args
            .named_args()
            .map(|named_arg| {
                let name = named_arg.name().to_string();
                let cl_value = named_arg.cl_value();
                // let cl_type = cl_value.cl_type().to_string();
                // let capitalized_type = cl_type
                //     .chars()
                //     .next()
                //     .map(|c| c.to_uppercase().collect::<String>() + &cl_type[1..])
                //     .unwrap_or_default();

                // let value_json: serde_json::Value =
                //     serde_json::to_value(cl_value).unwrap_or(serde_json::Value::Null);

                // let value = value_json
                //     .get("parsed")
                //     .cloned()
                //     .unwrap_or(serde_json::Value::Null);

                let bytes = cl_value.to_bytes().unwrap_or_default();
                let size = bytes.len();

                let json_value = json!({
                    "name": name,
                    "type": json!({ "ByteArray": size }),
                    "value": bytes,
                });
                json_value
            })
            .collect()
    }

    fn rebuild(
        &self,
        transaction_params: TransactionStrParams,
        new_builder_params: NewBuilderParams,
    ) -> Transaction {
        let chain_name = if let Some(chain_name) = transaction_params.chain_name() {
            chain_name
        } else {
            self.chain_name()
        };
        let ttl = if let Some(ttl) = transaction_params.ttl() {
            ttl
        } else {
            self.ttl().to_string()
        };
        let timestamp = if let Some(timestamp) = transaction_params.timestamp() {
            timestamp
        } else {
            self.timestamp().to_string()
        };

        let initiator_addr = if let Some(initiator_addr) = transaction_params.initiator_addr() {
            initiator_addr
        } else {
            self.initiator_addr().to_string()
        };

        let transaction_params = TransactionStrParams::new_with_defaults(
            &chain_name,
            Some(initiator_addr),
            transaction_params.secret_key(),
            Some(ttl),
        );

        transaction_params.set_timestamp(Some(timestamp));

        let pricing_mode = if let Some(pricing_mode) = transaction_params.pricing_mode() {
            pricing_mode
        } else {
            self.pricing_mode()
        };

        let receipt = if pricing_mode == PricingMode::Reserved {
            if let Some(receipt) = transaction_params.receipt() {
                receipt
            } else {
                self.receipt().to_string()
            }
        } else {
            String::new()
        };

        let additional_computation_factor = if let Some(additional_computation_factor) =
            transaction_params.additional_computation_factor()
        {
            additional_computation_factor
        } else {
            self.additional_computation_factor().to_string()
        };

        let gas_price_tolerance =
            if let Some(gas_price_tolerance) = transaction_params.gas_price_tolerance() {
                gas_price_tolerance
            } else {
                self.gas_price_tolerance().to_string()
            };

        transaction_params.set_pricing_mode(pricing_mode);

        if !receipt.is_empty() {
            transaction_params.set_receipt(&receipt);
        }
        if !additional_computation_factor.is_empty() {
            transaction_params.set_additional_computation_factor(&additional_computation_factor);
        }
        if !gas_price_tolerance.is_empty() {
            transaction_params.set_gas_price_tolerance(&gas_price_tolerance);
        }

        let json_array = self.args_to_json_array(&self.session_args());

        transaction_params.set_session_args_json(
            &serde_json::to_string(&json_array)
                .map_err(|err| error(&format!("Failed to deserialize args: {:?}", err)))
                .unwrap(),
        );

        let builder_params = self.make_transaction_builder_params(new_builder_params);

        let transaction: Transaction = make_transaction(builder_params, transaction_params)
            .map(Into::into)
            .map_err(|err| {
                let err_msg = format!("Error building transaction: {}", err);
                log(&err_msg);
                err_msg
            })
            .unwrap();
        // let _ = transaction.validate_transaction_size();

        dbg!(transaction.clone());

        transaction
    }

    fn make_transaction_builder_params(
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
    ) -> TransactionBuilderParams {
        let target = self
            .target()
            .map_err(|err| error(&format!("Failed to get transaction target: {:?}", err)))
            .unwrap();
        let entry_point = new_entry_point.unwrap_or_else(|| self.entry_point().clone());

        match target {
            TransactionTarget::Native => {
                // "add_bid" => TransactionBuilderParams::new_add_bid(
                //     self.public_key().clone(),
                //     self.delegation_rate(),
                //     &self.amount(),
                //     self.min_delegation_amount(),
                //     self.max_delegation_amount(),
                // ),
                // "delegate" => TransactionBuilderParams::new_delegate(
                //     self.delegator_key().clone(),
                //     self.validator_key().clone(),
                //     &self.amount(),
                // ),
                // "undelegate" => TransactionBuilderParams::new_undelegate(
                //     self.delegator_key().clone(),
                //     self.validator_key().clone(),
                //     &self.amount(),
                // ),
                // "redelegate" => TransactionBuilderParams::new_redelegate(
                //     self.delegator_key().clone(),
                //     self.validator_key().clone(),
                //     self.new_validator_key().clone(),
                //     &self.amount(),
                // ),
                // "withdraw_bid" => TransactionBuilderParams::new_withdraw_bid(
                //     self.public_key().clone(),
                //     &self.amount(),
                // ),
                // "transfer" => TransactionBuilderParams::new_transfer(
                //     self.maybe_source(),
                //     self.target_transfer(),
                //     &self.amount(),
                //     self.maybe_id(),
                // ),
                {
                    unimplemented!("unimplemented native entry point: {}", entry_point);
                }
            }
            TransactionTarget::Stored { id, runtime: _ } => match id {
                casper_types::TransactionInvocationTarget::ByHash(hash) => {
                    TransactionBuilderParams::new_invocable_entity(
                        new_hash.unwrap_or(AddressableEntityHash::from_bytes(hash.into())),
                        &entry_point,
                    )
                }
                TransactionInvocationTarget::ByName(alias) => {
                    TransactionBuilderParams::new_invocable_entity_alias(
                        &new_alias.unwrap_or(alias.clone()),
                        &entry_point,
                    )
                }
                TransactionInvocationTarget::ByPackageHash { addr, version } => {
                    TransactionBuilderParams::new_package(
                        new_package_hash.unwrap_or(PackageHash::from_bytes(addr.into())),
                        &entry_point,
                        Some(new_version.unwrap_or(version.unwrap_or(1)).to_string()),
                    )
                }
                TransactionInvocationTarget::ByPackageName { name, version } => {
                    TransactionBuilderParams::new_package_alias(
                        &new_alias.unwrap_or(name.clone()),
                        &entry_point,
                        Some(new_version.unwrap_or(version.unwrap_or(1)).to_string()),
                    )
                }
            },
            casper_types::TransactionTarget::Session {
                is_install_upgrade,
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

                TransactionBuilderParams::new_session(
                    Some(new_transaction_bytes.into()),
                    Some(new_is_install_upgrade.unwrap_or(is_install_upgrade)),
                )
            }
        }
    }
}

#[derive(Default)]
struct NewBuilderParams<'a> {
    new_hash: Option<AddressableEntityHash>,
    new_package_hash: Option<PackageHash>,
    new_entry_point: Option<String>,
    new_alias: Option<String>,
    new_version: Option<u32>,
    new_transaction_bytes: Option<&'a Bytes>,
    new_is_install_upgrade: Option<bool>,
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

#[cfg(test)]
mod tests {
    use super::*;
    use sdk_tests::tests::helpers::{get_network_constants, get_user_secret_key};

    #[test]
    fn test_args_to_json_array() {
        let (_, _, _, _, chain_name) = get_network_constants();
        // Create a RuntimeArgs instance and populate it directly with CLValues
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

        let secret_key = get_user_secret_key(None).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);

        let builder_params = TransactionBuilderParams::default();
        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        let json_array = transaction.args_to_json_array(&runtime_args);

        // Convert the generated json_array to a serde_json Value
        let generated_json: serde_json::Value = serde_json::to_value(&json_array).unwrap();

        // Deserialize ARGS_JSON into a serde_json Value
        // let expected_json: serde_json::Value = serde_json::from_str(ARGS_JSON).unwrap();

        let expected_json = r#"[{"name":"collection_name","type":{"ByteArray":23},"value":[18,0,0,0,14,0,0,0,101,110,104,97,110,99,101,100,45,110,102,116,45,49,10]},{"name":"collection_symbol","type":{"ByteArray":15},"value":[10,0,0,0,6,0,0,0,69,78,70,84,45,49,10]},{"name":"total_token_supply","type":{"ByteArray":13},"value":[8,0,0,0,10,0,0,0,0,0,0,0,5]},{"name":"ownership_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"nft_kind","type":{"ByteArray":6},"value":[1,0,0,0,1,3]},{"name":"allow_minting","type":{"ByteArray":6},"value":[1,0,0,0,1,0]},{"name":"owner_reverse_lookup_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"nft_metadata_kind","type":{"ByteArray":6},"value":[1,0,0,0,2,3]},{"name":"identifier_mode","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"metadata_mutability","type":{"ByteArray":6},"value":[1,0,0,0,0,3]},{"name":"events_mode","type":{"ByteArray":6},"value":[1,0,0,0,1,3]}]"#;

        assert_eq!(
            &serde_json::to_string(&generated_json).unwrap(),
            expected_json
        );
    }
}
