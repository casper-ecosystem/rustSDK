//! Writes session: build / sign / put transaction helpers.

use casper_rust_wasm_sdk::helpers::public_key_from_secret_key;
use casper_rust_wasm_sdk::types::public_key::PublicKey;
use casper_rust_wasm_sdk::types::transaction::Transaction;
use casper_rust_wasm_sdk::types::transaction_params::transaction_builder_params::TransactionBuilderParams;
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_rust_wasm_sdk::SDK;
use serde_json::Value;

use crate::policy::WritePolicy;

pub const DEFAULT_PAYMENT_MOTES: &str = "100000000";
pub const DEFAULT_TRANSFER_MOTES: &str = "2500000000";
pub const DEFAULT_TTL: &str = "30m";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WriteKind {
    Transfer,
    Delegate,
    Undelegate,
    Redelegate,
}

impl WriteKind {
    pub const ALL: [WriteKind; 4] = [
        Self::Transfer,
        Self::Delegate,
        Self::Undelegate,
        Self::Redelegate,
    ];

    pub fn title(self) -> &'static str {
        match self {
            Self::Transfer => "Transfer",
            Self::Delegate => "Delegate",
            Self::Undelegate => "Undelegate",
            Self::Redelegate => "Redelegate",
        }
    }

    pub fn op_name(self) -> &'static str {
        match self {
            Self::Transfer => "transfer",
            Self::Delegate => "delegate",
            Self::Undelegate => "undelegate",
            Self::Redelegate => "redelegate",
        }
    }

    pub fn next(self) -> Self {
        let idx = Self::ALL.iter().position(|k| *k == self).unwrap_or(0);
        Self::ALL[(idx + 1) % Self::ALL.len()]
    }

    pub fn prev(self) -> Self {
        let idx = Self::ALL.iter().position(|k| *k == self).unwrap_or(0);
        let len = Self::ALL.len();
        Self::ALL[(idx + len - 1) % len]
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WriteStage {
    Form,
    Preview,
    Signed,
    Result,
}

/// Shared fields for unsigned transfer build.
pub struct TransferBuild<'a> {
    pub rpc: &'a str,
    pub verbosity: Verbosity,
    pub chain_name: &'a str,
    pub initiator: &'a str,
    pub target: &'a str,
    pub amount: &'a str,
    pub payment: &'a str,
}

/// Shared fields for unsigned stake build.
pub struct StakeBuild<'a> {
    pub rpc: &'a str,
    pub verbosity: Verbosity,
    pub kind: WriteKind,
    pub chain_name: &'a str,
    pub initiator: &'a str,
    pub validator: &'a str,
    pub new_validator: Option<&'a str>,
    pub amount: &'a str,
    pub payment: &'a str,
}

/// Load PEM text from disk and derive the public key hex.
pub fn load_pem_file(path: &str) -> Result<(String, String), String> {
    let raw = std::fs::read_to_string(path).map_err(|e| format!("read PEM `{path}`: {e}"))?;
    let pem = raw.trim().to_string();
    if pem.is_empty() {
        return Err("PEM file is empty".into());
    }
    let public_key = public_key_from_secret_key(&pem).map_err(|e| e.to_string())?;
    Ok((pem, public_key))
}

pub fn chain_name_for_preset(preset: &str) -> &'static str {
    let p = preset.to_ascii_lowercase();
    if p.contains("testnet") {
        "casper-test"
    } else if p.contains("mainnet") {
        "casper"
    } else {
        "casper-net-1"
    }
}

fn base_params(chain_name: &str, initiator: &str, payment: &str) -> TransactionStrParams {
    let params = TransactionStrParams::default();
    params.set_chain_name(chain_name);
    params.set_initiator_addr(initiator);
    params.set_payment_amount(payment);
    params.set_ttl(Some(DEFAULT_TTL.to_string()));
    params
}

/// Build an unsigned transfer transaction → JSON value.
pub fn build_transfer(args: TransferBuild<'_>) -> Result<Value, String> {
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(args.verbosity));
    let params = base_params(args.chain_name, args.initiator, args.payment);
    let tx = sdk
        .make_transfer_transaction(None, args.target, args.amount, params, None)
        .map_err(|e| e.to_string())?;
    tx_to_value(&tx)
}

/// Build unsigned stake transaction (delegate / undelegate / redelegate).
pub fn build_stake(args: StakeBuild<'_>) -> Result<Value, String> {
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(args.verbosity));
    let delegator = PublicKey::new(args.initiator).map_err(|e| e.to_string())?;
    let validator_pk = PublicKey::new(args.validator).map_err(|e| e.to_string())?;
    let builder = match args.kind {
        WriteKind::Delegate => {
            TransactionBuilderParams::new_delegate(delegator, validator_pk, args.amount)
        }
        WriteKind::Undelegate => {
            TransactionBuilderParams::new_undelegate(delegator, validator_pk, args.amount)
        }
        WriteKind::Redelegate => {
            let new_v = args
                .new_validator
                .ok_or_else(|| "redelegate needs new_validator".to_string())?;
            let new_pk = PublicKey::new(new_v).map_err(|e| e.to_string())?;
            TransactionBuilderParams::new_redelegate(delegator, validator_pk, new_pk, args.amount)
        }
        WriteKind::Transfer => {
            return Err("use build_transfer for Transfer".into());
        }
    };
    let params = base_params(args.chain_name, args.initiator, args.payment);
    let tx = sdk
        .make_transaction(builder, params)
        .map_err(|e| e.to_string())?;
    tx_to_value(&tx)
}

pub fn sign_tx_json(
    rpc: &str,
    verbosity: Verbosity,
    tx_json: &Value,
    pem: &str,
) -> Result<Value, String> {
    let sdk = SDK::new(Some(rpc.to_string()), None, Some(verbosity));
    let text = serde_json::to_string(tx_json).map_err(|e| e.to_string())?;
    let tx = Transaction::from_json_string(&text).map_err(|e| e.to_string())?;
    let signed = sdk.sign_transaction(tx, pem);
    tx_to_value(&signed)
}

pub async fn put_tx_json(
    rpc: &str,
    verbosity: Verbosity,
    tx_json: &Value,
) -> Result<Value, String> {
    let sdk = SDK::new(Some(rpc.to_string()), None, Some(verbosity));
    let text = serde_json::to_string(tx_json).map_err(|e| e.to_string())?;
    let tx = Transaction::from_json_string(&text).map_err(|e| e.to_string())?;
    let resp = sdk
        .put_transaction(tx, None, None)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&resp.result).map_err(|e| e.to_string())
}

/// One-shot transfer (build+sign+put) with policy check.
pub struct OneShotTransfer<'a> {
    pub rpc: &'a str,
    pub verbosity: Verbosity,
    pub chain_name: &'a str,
    pub pem: &'a str,
    pub public_key: &'a str,
    pub target: &'a str,
    pub amount: &'a str,
    pub payment: &'a str,
    pub policy: &'a WritePolicy,
}

pub async fn one_shot_transfer(args: OneShotTransfer<'_>) -> Result<Value, String> {
    args.policy.check_transfer(args.target, args.amount)?;
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(args.verbosity));
    let params = TransactionStrParams::default();
    params.set_chain_name(args.chain_name);
    params.set_secret_key(args.pem);
    params.set_initiator_addr(args.public_key);
    params.set_payment_amount(args.payment);
    params.set_ttl(Some(DEFAULT_TTL.to_string()));
    let resp = sdk
        .transfer_transaction(None, args.target, args.amount, params, None, None, None)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&resp.result).map_err(|e| e.to_string())
}

fn tx_to_value(tx: &Transaction) -> Result<Value, String> {
    let s = tx.to_json_string().map_err(|e| e.to_string())?;
    serde_json::from_str(&s).map_err(|e| e.to_string())
}

/// Extract transaction hash hex from put result JSON when present.
pub fn extract_tx_hash(put_result: &Value) -> Option<String> {
    put_result
        .pointer("/transaction_hash/Version1")
        .or_else(|| put_result.pointer("/transaction_hash"))
        .and_then(|v| match v {
            Value::String(s) => Some(s.clone()),
            other => other.as_str().map(|s| s.to_string()).or_else(|| {
                let s = other.to_string();
                Some(s.trim_matches('"').to_string())
            }),
        })
}
