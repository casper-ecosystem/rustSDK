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

/// Trim, strip optional `0x`, drop internal whitespace.
fn normalize_hexish(s: &str) -> String {
    let t = s.trim();
    let t = t
        .strip_prefix("0x")
        .or_else(|| t.strip_prefix("0X"))
        .unwrap_or(t);
    t.chars().filter(|c| !c.is_whitespace()).collect()
}

fn require_public_key_hex(label: &str, raw: &str) -> Result<String, String> {
    let n = normalize_hexish(raw);
    if n.is_empty() {
        return Err(format!("{label} is empty"));
    }
    PublicKey::new(&n).map_err(|_| {
        format!(
            "{label}: need a hex public key (01… Ed25519 or 02… Secp256k1, typically 66 hex chars). Got {} chars.",
            n.len()
        )
    })?;
    Ok(n)
}

/// Transfer target: public key hex, `account-hash-…`, or `uref-…` (casper-client parse).
fn require_transfer_target(raw: &str) -> Result<String, String> {
    let n = normalize_hexish(raw);
    if n.is_empty() {
        return Err(
            "target is empty: paste recipient public key hex (01…/02…), account-hash-<64 hex>, or uref-…"
                .into(),
        );
    }
    if PublicKey::new(&n).is_ok() {
        return Ok(n);
    }
    if n.starts_with("account-hash-") || n.starts_with("uref-") {
        return Ok(n);
    }
    if n.len() == 64 && n.chars().all(|c| c.is_ascii_hexdigit()) {
        return Err(
            "target looks like a bare 64-hex account hash. Prefix it as account-hash-<hex>, or use a full public key (01…/02…)."
                .into(),
        );
    }
    Err(format!(
        "target is not a public key, account-hash-…, or uref-… ({} chars after trim). Placeholder text like \"01…\" is not valid.",
        n.len()
    ))
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
    let initiator = require_public_key_hex("initiator", args.initiator)?;
    let target = require_transfer_target(args.target)?;
    let amount = args.amount.trim();
    if amount.is_empty() {
        return Err("amount is empty".into());
    }
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(Verbosity::Low));
    let params = base_params(args.chain_name, &initiator, args.payment, args.ttl);
    let tx = sdk
        .make_transfer_transaction(None, &target, amount, params, None)
        .map_err(|e| e.to_string())?;
    tx_to_value(&tx)
}

pub fn build_stake(args: StakeBuild<'_>) -> Result<Value, String> {
    let initiator = require_public_key_hex("initiator", args.initiator)?;
    let validator = require_public_key_hex("validator", args.validator)?;
    let amount = args.amount.trim();
    if amount.is_empty() {
        return Err("amount is empty".into());
    }
    let sdk = SDK::new(Some(args.rpc.to_string()), None, Some(Verbosity::Low));
    let delegator = PublicKey::new(&initiator).map_err(|e| e.to_string())?;
    let validator_pk = PublicKey::new(&validator).map_err(|e| e.to_string())?;
    let builder = match args.kind {
        WriteKind::Delegate => {
            TransactionBuilderParams::new_delegate(delegator, validator_pk, amount)
        }
        WriteKind::Undelegate => {
            TransactionBuilderParams::new_undelegate(delegator, validator_pk, amount)
        }
        WriteKind::Redelegate => {
            let new_v = args
                .new_validator
                .ok_or_else(|| "redelegate needs new_validator".to_string())?;
            let new_hex = require_public_key_hex("new_validator", new_v)?;
            let new_pk = PublicKey::new(&new_hex).map_err(|e| e.to_string())?;
            TransactionBuilderParams::new_redelegate(delegator, validator_pk, new_pk, amount)
        }
        WriteKind::Transfer => return Err("use build_transfer for Transfer".into()),
    };
    let params = base_params(args.chain_name, &initiator, args.payment, args.ttl);
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

#[cfg(test)]
mod tests {
    use super::*;

    const INITIATOR: &str = "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    const TARGET: &str = "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";
    const FAUCET: &str = "0107514b42acc9be064bca097321530af97d4bb7f9b965b45efbf73e474df2690f";

    #[test]
    fn build_transfer_accepts_valid_public_keys() {
        let v = build_transfer(TransferBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            chain_name: "casper-net-1",
            initiator: INITIATOR,
            target: TARGET,
            amount: "2500000000",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .expect("compose transfer");
        assert!(
            v.get("Version1").is_some() || v.get("hash").is_some(),
            "unexpected tx shape: {v}"
        );
    }

    #[test]
    fn build_transfer_trims_whitespace_and_0x() {
        let spaced = format!("  0x{}\n", TARGET);
        build_transfer(TransferBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            chain_name: "casper-net-1",
            initiator: INITIATOR,
            target: &spaced,
            amount: "1000000000",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .expect("trimmed target");
    }

    #[test]
    fn build_transfer_rejects_empty_and_placeholder() {
        let err = build_transfer(TransferBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            chain_name: "casper-net-1",
            initiator: INITIATOR,
            target: "",
            amount: "1",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .unwrap_err();
        assert!(err.contains("empty"), "{err}");

        let err = build_transfer(TransferBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            chain_name: "casper-net-1",
            initiator: INITIATOR,
            target: "01…",
            amount: "1",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .unwrap_err();
        assert!(err.contains("target"), "{err}");
    }

    #[test]
    fn build_transfer_hints_bare_account_hash() {
        let bare = "a".repeat(64);
        let err = build_transfer(TransferBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            chain_name: "casper-net-1",
            initiator: INITIATOR,
            target: &bare,
            amount: "1",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .unwrap_err();
        assert!(err.contains("account-hash-"), "{err}");
    }

    #[test]
    fn build_delegate_accepts_valid_keys() {
        let v = build_stake(StakeBuild {
            rpc: "http://127.0.0.1:11101/rpc",
            kind: WriteKind::Delegate,
            chain_name: "casper-net-1",
            initiator: FAUCET,
            validator: TARGET,
            new_validator: None,
            amount: "1000000000000",
            payment: DEFAULT_PAYMENT_MOTES,
            ttl: DEFAULT_TTL,
        })
        .expect("compose delegate");
        assert!(v.get("Version1").is_some() || v.get("hash").is_some());
    }
}
