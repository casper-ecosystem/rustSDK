//! Transaction make / sign / put / wait / get helpers.

use casper_rust_wasm_sdk::helpers::public_key_from_secret_key;
use casper_rust_wasm_sdk::types::public_key::PublicKey;
use casper_rust_wasm_sdk::types::transaction::Transaction;
use casper_rust_wasm_sdk::types::transaction_params::transaction_builder_params::TransactionBuilderParams;
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_rust_wasm_sdk::SDK;
use serde_json::Value;

pub const DEFAULT_PAYMENT_MOTES: &str = "100000000";
pub const DEFAULT_TTL: &str = "30m";

#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum WriteKind {
    Transfer,
    Delegate,
    Undelegate,
    Redelegate,
}

pub struct TransferBuild<'a> {
    pub rpc: &'a str,
    pub chain_name: &'a str,
    pub initiator: &'a str,
    pub target: &'a str,
    pub amount: &'a str,
    pub payment: &'a str,
    pub ttl: &'a str,
}

pub struct StakeBuild<'a> {
    pub rpc: &'a str,
    pub kind: WriteKind,
    pub chain_name: &'a str,
    pub initiator: &'a str,
    pub validator: &'a str,
    pub new_validator: Option<&'a str>,
    pub amount: &'a str,
    pub payment: &'a str,
    pub ttl: &'a str,
}

fn base_params(
    chain_name: &str,
    initiator: &str,
    payment: &str,
    ttl: &str,
) -> TransactionStrParams {
    let params = TransactionStrParams::default();
    params.set_chain_name(chain_name);
    params.set_initiator_addr(initiator);
    params.set_payment_amount(payment);
    params.set_ttl(Some(ttl.to_string()));
    params
}

fn tx_to_value(tx: &Transaction) -> Result<Value, String> {
    let s = tx.to_json_string().map_err(|e| e.to_string())?;
    serde_json::from_str(&s).map_err(|e| e.to_string())
}

pub fn load_pem_file(path: &str) -> Result<(String, String), String> {
    let raw = std::fs::read_to_string(path).map_err(|e| format!("read PEM `{path}`: {e}"))?;
    let pem = raw.trim().to_string();
    if pem.is_empty() {
        return Err("PEM file is empty".into());
    }
    let public_key = public_key_from_secret_key(&pem).map_err(|e| e.to_string())?;
    Ok((pem, public_key))
}

pub fn build_transfer(args: TransferBuild<'_>) -> Result<Value, String> {
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(Verbosity::Low));
    let params = base_params(args.chain_name, args.initiator, args.payment, args.ttl);
    let tx = sdk
        .make_transfer_transaction(None, args.target, args.amount, params, None)
        .map_err(|e| e.to_string())?;
    tx_to_value(&tx)
}

pub fn build_stake(args: StakeBuild<'_>) -> Result<Value, String> {
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(Verbosity::Low));
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
        WriteKind::Transfer => return Err("use build_transfer for Transfer".into()),
    };
    let params = base_params(args.chain_name, args.initiator, args.payment, args.ttl);
    let tx = sdk
        .make_transaction(builder, params)
        .map_err(|e| e.to_string())?;
    tx_to_value(&tx)
}

pub fn sign_tx_json(rpc: &str, tx_json: &Value, pem: &str) -> Result<Value, String> {
    let sdk = SDK::new(Some(rpc.to_string()), None, Some(Verbosity::Low));
    let text = serde_json::to_string(tx_json).map_err(|e| e.to_string())?;
    let tx = Transaction::from_json_string(&text).map_err(|e| e.to_string())?;
    let signed = sdk.sign_transaction(tx, pem);
    tx_to_value(&signed)
}

pub fn verify_tx_json(tx_json: &Value) -> Result<bool, String> {
    let text = serde_json::to_string(tx_json).map_err(|e| e.to_string())?;
    let tx = Transaction::from_json_string(&text).map_err(|e| e.to_string())?;
    Ok(tx.verify())
}

pub fn approvals_summary(tx_json: &Value) -> Result<Value, String> {
    // Prefer JSON shape over casper_types Approval accessors (stable for UI).
    if let Some(a) = tx_json.pointer("/Version1/approvals") {
        return Ok(a.clone());
    }
    if let Some(a) = tx_json.get("approvals") {
        return Ok(a.clone());
    }
    Ok(Value::Array(vec![]))
}

pub async fn put_tx_json(rpc: &str, tx_json: &Value) -> Result<Value, String> {
    let sdk = SDK::new(Some(rpc.to_string()), None, Some(Verbosity::Low));
    let text = serde_json::to_string(tx_json).map_err(|e| e.to_string())?;
    let tx = Transaction::from_json_string(&text).map_err(|e| e.to_string())?;
    let resp = sdk
        .put_transaction(tx, None, None)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&resp.result).map_err(|e| e.to_string())
}

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

pub async fn wait_tx(
    events_url: &str,
    hash: &str,
    timeout_ms: Option<u64>,
) -> Result<Value, String> {
    let sdk = SDK::new(None, None, Some(Verbosity::Low));
    let result = sdk
        .wait_transaction(events_url, hash, timeout_ms)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&result).map_err(|e| e.to_string())
}

pub async fn get_tx(rpc: &str, hash: &str) -> Result<Value, String> {
    use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
    let sdk = SDK::new(Some(rpc.to_string()), None, Some(Verbosity::Low));
    let th = TransactionHash::new(hash).map_err(|e| e.to_string())?;
    let resp = sdk
        .get_transaction(th, None, None, None)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&resp.result).map_err(|e| e.to_string())
}
