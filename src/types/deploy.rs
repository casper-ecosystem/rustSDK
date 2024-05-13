use super::{
    cl::bytes::Bytes,
    contract_hash::ContractHash,
    contract_package_hash::ContractPackageHash,
    deploy_hash::DeployHash,
    deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    },
    public_key::PublicKey,
};
#[cfg(target_arch = "wasm32")]
use crate::helpers::insert_js_value_arg;
use crate::{
    debug::error,
    helpers::{
        get_current_timestamp, get_ttl_or_default, insert_arg, parse_timestamp, parse_ttl,
        secret_key_from_pem,
    },
    make_deploy, make_transfer,
};
use casper_client::MAX_SERIALIZED_SIZE_OF_DEPLOY;
use casper_types::{
    bytesrepr::{self, Bytes as _Bytes},
    transaction::Deploy as _Deploy,
    ApprovalsHash, AsymmetricType, DeployBuilder, ExecutableDeployItem, Phase, RuntimeArgs,
    SecretKey, TimeDiff, Timestamp, U512,
};
use chrono::{DateTime, Utc};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use num_traits::cast::FromPrimitive;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use wasm_bindgen::prelude::*;

#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct Deploy(_Deploy);

#[derive(Default)]
struct BuildParams {
    secret_key: Option<String>,
    chain_name: Option<String>,
    ttl: Option<TimeDiff>,
    timestamp: Option<Timestamp>,
    session: Option<ExecutableDeployItem>,
    payment: Option<ExecutableDeployItem>,
    account: Option<PublicKey>,
}

#[wasm_bindgen]
impl Deploy {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(deploy: JsValue) -> Deploy {
        let deploy: _Deploy = deploy
            .into_serde()
            .map_err(|err| error(&format!("Failed to deserialize Deploy: {:?}", err)))
            .unwrap();
        let deploy = match deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            Ok(()) => deploy,
            Err(err) => {
                error(&format!("Deploy has not a valid size: {:?}", err));
                deploy
            }
        };
        deploy.into()
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
    #[wasm_bindgen(js_name = "withPaymentAndSession")]
    pub fn with_payment_and_session(
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, String> {
        make_deploy(deploy_params, session_params, payment_params)
            .map(Into::into)
            .map_err(|err| {
                let err_msg = format!("Error creating session deploy: {}", err);
                error(&err_msg);
                err_msg
            })
    }

    // static context
    #[wasm_bindgen(js_name = "withTransfer")]
    pub fn with_transfer(
        amount: &str,
        target_account: &str,
        transfer_id: Option<String>,
        deploy_params: DeployStrParams,
        payment_params: PaymentStrParams,
    ) -> Result<Deploy, String> {
        make_transfer(
            amount,
            target_account,
            transfer_id,
            deploy_params,
            payment_params,
        )
        .map(Into::into)
        .map_err(|err| format!("Error creating transfer deploy: {}", err))
    }

    #[wasm_bindgen(js_name = "withTTL")]
    pub fn with_ttl(&self, ttl: &str, secret_key: Option<String>) -> Deploy {
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
    pub fn with_timestamp(&self, timestamp: &str, secret_key: Option<String>) -> Deploy {
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
    pub fn with_chain_name(&self, chain_name: &str, secret_key: Option<String>) -> Deploy {
        self.build(BuildParams {
            secret_key,
            chain_name: Some(chain_name.to_string()),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withAccount")]
    pub fn with_account(&self, account: PublicKey, secret_key: Option<String>) -> Deploy {
        self.build(BuildParams {
            secret_key,
            account: account.into(),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withEntryPointName")]
    pub fn with_entry_point_name(
        &self,
        entry_point_name: &str,
        secret_key: Option<String>,
    ) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        self.build(BuildParams {
            secret_key,
            session: Some(modify_session(
                session,
                NewSessionParams {
                    new_entry_point: Some(entry_point_name.to_string()),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withHash")]
    pub fn with_hash(&self, hash: ContractHash, secret_key: Option<String>) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        self.build(BuildParams {
            secret_key,
            session: Some(modify_session(
                session,
                NewSessionParams {
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
        package_hash: ContractPackageHash,
        secret_key: Option<String>,
    ) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        self.build(BuildParams {
            secret_key,
            session: Some(modify_session(
                session,
                NewSessionParams {
                    new_package_hash: Some(package_hash),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withModuleBytes")]
    pub fn with_module_bytes(&self, module_bytes: Bytes, secret_key: Option<String>) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        self.build(BuildParams {
            secret_key,
            session: Some(modify_session(
                session,
                NewSessionParams {
                    new_module_bytes: Some(&module_bytes),
                    ..Default::default()
                },
            )),
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withSecretKey")]
    pub fn with_secret_key(&self, secret_key: Option<String>) -> Deploy {
        self.build(BuildParams {
            secret_key,
            ..Default::default()
        })
    }

    #[wasm_bindgen(js_name = "withStandardPayment")]
    pub fn with_standard_payment(&self, amount: &str, secret_key: Option<String>) -> Deploy {
        let cloned_amount = amount.to_string();
        let amount = U512::from_dec_str(&cloned_amount);
        if let Err(err) = amount {
            error(&format!("Error converting amount: {:?}", err));
            return self.0.clone().into();
        }
        self.build(BuildParams {
            secret_key,
            payment: Some(ExecutableDeployItem::new_standard_payment(amount.unwrap())),
            ..Default::default()
        })
    }

    // Load payment from json
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "withPayment")]
    pub fn with_payment(&self, payment: JsValue, secret_key: Option<String>) -> Deploy {
        let payment_item_result = payment.into_serde();

        match payment_item_result {
            Ok(payment_item) => self.build(BuildParams {
                secret_key,
                payment: Some(payment_item),
                ..Default::default()
            }),
            Err(err) => {
                error(&format!("Error parsing payment: {}", err));
                self.0.clone().into()
            }
        }
    }

    // Load session from json
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "withSession")]
    pub fn with_session(&self, session: JsValue, secret_key: Option<String>) -> Deploy {
        let session_item_result = session.into_serde();

        match session_item_result {
            Ok(session_item) => self.build(BuildParams {
                secret_key,
                session: Some(session_item),
                ..Default::default()
            }),
            Err(err) => {
                error(&format!("Error parsing session: {}", err));
                self.0.clone().into()
            }
        }
    }

    #[wasm_bindgen(js_name = "validateDeploySize")]
    pub fn validate_deploy_size(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy has not a valid size: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "isValid")]
    pub fn is_valid(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.is_valid() {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy is not valid: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(getter)]
    pub fn hash(&self) -> DeployHash {
        let deploy: _Deploy = self.0.clone();
        let deploy_hash = (*deploy.hash()).to_string();
        match DeployHash::new(&deploy_hash) {
            Ok(deploy_hash) => deploy_hash,
            Err(err) => {
                error(&format!("Deploy has not a valid hash: {:?}", err));
                DeployHash::new("").unwrap()
            }
        }
    }

    #[wasm_bindgen(js_name = "hasValidHash")]
    pub fn has_valid_hash(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        match deploy.has_valid_hash() {
            Ok(()) => true,
            Err(err) => {
                error(&format!("Deploy has not a valid hash: {:?}", err));
                false
            }
        }
    }

    #[wasm_bindgen(js_name = "isExpired")]
    pub fn expired(&self) -> bool {
        let deploy: _Deploy = self.0.clone();
        let now: DateTime<Utc> = Utc::now();
        let now_millis = now.timestamp_millis() as u64;
        let timestamp = Timestamp::from(now_millis);
        match deploy.expired(timestamp) {
            false => false,
            true => {
                error("Deploy has expired");
                true
            }
        }
    }

    #[wasm_bindgen(js_name = "sign")]
    pub fn sign(&mut self, secret_key: &str) -> Deploy {
        let mut deploy: _Deploy = self.0.clone();
        let secret_key_from_pem = secret_key_from_pem(secret_key);
        if let Err(err) = secret_key_from_pem {
            error(&format!("Error loading secret key: {:?}", err));
            return deploy.into();
        }
        deploy.sign(&secret_key_from_pem.unwrap());
        if let Err(err) = deploy.is_valid_size(MAX_SERIALIZED_SIZE_OF_DEPLOY) {
            error(&format!("Deploy has not a valid size: {:?}", err));
        }
        deploy.into()
    }

    // #[cfg(target_arch = "wasm32")]
    // #[wasm_bindgen(js_name = "footprint")]
    // pub fn footprint_js_alias(&self) -> JsValue {
    //     match JsValue::from_serde(&self.footprint()) {
    //         Ok(json) => json,
    //         Err(err) => {
    //             error(&format!("Error serializing footprint to JSON: {:?}", err));
    //             JsValue::null()
    //         }
    //     }
    // }

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

    #[wasm_bindgen(js_name = "isTransfer")]
    pub fn is_transfer(&self) -> bool {
        self.0.clone().session().is_transfer()
    }

    #[wasm_bindgen(js_name = "isStandardPayment")]
    pub fn is_standard_payment(&self, phase: u8) -> bool {
        if let Some(phase_enum) = Phase::from_u8(phase) {
            self.0.clone().session().is_standard_payment(phase_enum)
        } else {
            false
        }
    }

    #[wasm_bindgen(js_name = "isStoredContract")]
    pub fn is_stored_contract(&self) -> bool {
        self.0.clone().session().is_stored_contract()
    }

    #[wasm_bindgen(js_name = "isStoredContractPackage")]
    pub fn is_stored_contract_package(&self) -> bool {
        self.0.clone().session().is_stored_contract_package()
    }

    #[wasm_bindgen(js_name = "isModuleBytes")]
    pub fn is_module_bytes(&self) -> bool {
        self.0.clone().session().is_module_bytes()
    }

    #[wasm_bindgen(js_name = "isByName")]
    pub fn is_by_name(&self) -> bool {
        self.0.clone().session().is_by_name()
    }

    #[wasm_bindgen(js_name = "byName")]
    pub fn by_name(&self) -> Option<String> {
        self.0.clone().session().by_name()
    }

    #[wasm_bindgen(js_name = "entryPointName")]
    pub fn entry_point_name(&self) -> String {
        self.0.clone().session().entry_point_name().to_string()
    }

    #[wasm_bindgen(js_name = "addSignature")]
    pub fn add_signature(&self, public_key: &str, signature: &str) -> Deploy {
        // Serialize the existing approvals to JSON
        let casper_deploy: _Deploy = self.0.clone();
        let existing_approvals_json = casper_deploy
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

        // Replace the approvals field in the original deploy JSON string
        let mut deploy_json: Value = serde_json::from_str(&self.to_json_string().unwrap())
            .expect("Failed to deserialize deploy JSON");
        deploy_json["approvals"] = serde_json::from_str(&updated_approvals_str)
            .expect("Failed to deserialize updated approvals JSON");

        // Convert the updated deploy JSON back to a Deploy struct
        let updated_deploy: Deploy =
            serde_json::from_value(deploy_json).expect("Failed to deserialize updated deploy JSON");

        updated_deploy
    }

    #[wasm_bindgen(js_name = "TTL")]
    pub fn ttl(&self) -> String {
        self.0.clone().header().ttl().to_string()
    }

    #[wasm_bindgen(js_name = "timestamp")]
    pub fn timestamp(&self) -> String {
        self.0.clone().header().timestamp().to_string()
    }

    #[wasm_bindgen(js_name = "chainName")]
    pub fn chain_name(&self) -> String {
        self.0.clone().header().chain_name().to_string()
    }

    #[wasm_bindgen(js_name = "account")]
    pub fn account(&self) -> String {
        let public_key: PublicKey = self.0.clone().header().account().clone().into();
        public_key.to_string()
    }

    #[wasm_bindgen(js_name = "paymentAmount")]
    pub fn payment_amount(&self, conv_rate: u8) -> String {
        self.0
            .clone()
            .payment()
            .payment_amount(conv_rate)
            .unwrap()
            .to_string()
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "args")]
    pub fn args_js_alias(&self) -> JsValue {
        match JsValue::from_serde(&self.args()) {
            Ok(json) => json,
            Err(err) => {
                error(&format!("Error serializing args to JSON: {:?}", err));
                JsValue::null()
            }
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "addArg")]
    pub fn add_arg_js_alias(
        &mut self,
        js_value_arg: JsValue,
        secret_key: Option<String>,
    ) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        let mut args = session.args().clone();
        let new_args = insert_js_value_arg(&mut args, js_value_arg);
        let new_session = modify_session(
            session,
            NewSessionParams {
                new_args: Some(new_args),
                ..Default::default()
            },
        );

        self.build(BuildParams {
            secret_key,
            session: Some(new_session),
            ..Default::default()
        })
    }
}

impl Deploy {
    pub fn args(&self) -> RuntimeArgs {
        self.0.clone().session().args().clone()
    }

    pub fn add_arg(&mut self, new_value_arg: String, secret_key: Option<String>) -> Deploy {
        let deploy = self.0.clone();
        let session = deploy.session();

        let mut args = session.args().clone();
        let new_args = insert_arg(&mut args, new_value_arg);
        let new_session = modify_session(
            session,
            NewSessionParams {
                new_args: Some(new_args),
                ..Default::default()
            },
        );

        self.build(BuildParams {
            secret_key,
            session: Some(new_session),
            ..Default::default()
        })
    }

    // pub fn footprint(&self) -> DeployFootprint {
    //     let deploy: _Deploy = self.0.clone();
    //     match deploy.footprint() {
    //         Ok(footprint) => footprint,
    //         Err(err) => {
    //             error(&format!("Error getting footprint: {:?}", err));
    //             deploy.footprint().unwrap()
    //         }
    //     }
    // }

    pub fn to_json_string(&self) -> Result<String, String> {
        let result = serde_json::to_string(&self.0);
        match result {
            Ok(json) => Ok(json),
            Err(err) => {
                let err_msg = format!("Error serializing data to JSON: {:?}", err);
                error(&err_msg);
                Err(err_msg)
            }
        }
    }

    pub fn compute_approvals_hash(&self) -> Result<ApprovalsHash, bytesrepr::Error> {
        let deploy: _Deploy = self.0.clone();
        deploy.compute_approvals_hash()
    }

    fn build(&self, deploy_params: BuildParams) -> Deploy {
        let BuildParams {
            secret_key,
            chain_name,
            ttl,
            timestamp,
            session,
            payment,
            account,
        } = deploy_params;
        let deploy: _Deploy = self.0.clone();
        let chain_name = if let Some(chain_name) = chain_name {
            chain_name
        } else {
            deploy.chain_name().into()
        };
        let ttl = if let Some(ttl) = ttl {
            ttl
        } else {
            deploy.ttl()
        };
        let timestamp = if let Some(timestamp) = timestamp {
            timestamp
        } else {
            deploy.timestamp()
        };
        let session = if let Some(session) = session {
            session
        } else {
            deploy.session().clone()
        };
        let payment = if let Some(payment) = payment {
            payment
        } else {
            deploy.payment().clone()
        };
        let account = if let Some(account) = account {
            account
        } else {
            deploy.account().clone().into()
        };
        let mut deploy_builder = DeployBuilder::new(chain_name, session)
            .with_account(account.into())
            .with_payment(payment)
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
            deploy_builder = deploy_builder.with_secret_key(&secret_key_result);
        }
        let deploy = deploy_builder
            .build()
            .map_err(|err| error(&format!("Failed to build deploy: {:?}", err)))
            .unwrap();

        let deploy: Deploy = deploy.into();
        let _ = deploy.validate_deploy_size();
        deploy
    }
}

#[derive(Default)]
struct NewSessionParams<'a> {
    new_args: Option<&'a RuntimeArgs>,
    new_hash: Option<ContractHash>,
    new_package_hash: Option<ContractPackageHash>,
    new_entry_point: Option<String>,
    new_name: Option<String>,
    new_version: Option<u32>,
    new_module_bytes: Option<&'a Bytes>,
}

fn modify_session(
    session: &ExecutableDeployItem,
    NewSessionParams {
        new_args,
        new_hash,
        new_package_hash,
        new_entry_point,
        new_name,
        new_version,
        new_module_bytes,
    }: NewSessionParams,
) -> ExecutableDeployItem {
    match session {
        ExecutableDeployItem::ModuleBytes { module_bytes, args } => {
            let default: _Bytes = module_bytes.clone();
            let new_bytes = new_module_bytes.unwrap();
            let new: &Bytes = new_bytes;
            let new_module_bytes: _Bytes = {
                let new_bytes: _Bytes = _Bytes::from((*new).to_vec());
                if new_bytes.len() > 0 {
                    new_bytes
                } else {
                    default
                }
            };

            ExecutableDeployItem::ModuleBytes {
                module_bytes: new_module_bytes,
                args: new_args.cloned().unwrap_or_else(|| args.clone()),
            }
        }
        ExecutableDeployItem::StoredContractByHash {
            hash,
            entry_point,
            args,
        } => ExecutableDeployItem::StoredContractByHash {
            hash: new_hash.unwrap_or((*hash).into()).into(),
            entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
            args: new_args.cloned().unwrap_or_else(|| args.clone()),
        },
        ExecutableDeployItem::StoredContractByName {
            name,
            entry_point,
            args,
        } => ExecutableDeployItem::StoredContractByName {
            name: new_name.unwrap_or_else(|| name.clone()),
            entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
            args: new_args.cloned().unwrap_or_else(|| args.clone()),
        },
        ExecutableDeployItem::StoredVersionedContractByHash {
            hash,
            version,
            entry_point,
            args,
        } => ExecutableDeployItem::StoredVersionedContractByHash {
            hash: new_package_hash.unwrap_or((*hash).into()).into(),
            version: Some(new_version.unwrap_or(version.unwrap_or(1))),
            entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
            args: new_args.cloned().unwrap_or_else(|| args.clone()),
        },
        ExecutableDeployItem::StoredVersionedContractByName {
            name,
            version,
            entry_point,
            args,
        } => ExecutableDeployItem::StoredVersionedContractByName {
            name: new_name.unwrap_or_else(|| name.clone()),
            version: Some(new_version.unwrap_or(version.unwrap_or(1))),
            entry_point: new_entry_point.unwrap_or_else(|| entry_point.clone()),
            args: new_args.cloned().unwrap_or_else(|| args.clone()),
        },
        ExecutableDeployItem::Transfer { args } => ExecutableDeployItem::Transfer {
            args: new_args.cloned().unwrap_or_else(|| args.clone()),
        },
    }
}

impl From<Deploy> for _Deploy {
    fn from(deploy: Deploy) -> Self {
        deploy.0
    }
}

impl From<_Deploy> for Deploy {
    fn from(deploy: _Deploy) -> Self {
        Deploy(deploy)
    }
}
