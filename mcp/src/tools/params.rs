//! JSON → SDK *StrParams / TransactionBuilderParams parsers for MCP tools.

#![allow(deprecated)]

use casper_rust_wasm_sdk::helpers;
use casper_rust_wasm_sdk::types::cl::bytes::Bytes;
use casper_rust_wasm_sdk::types::deploy_params::deploy_str_params::DeployStrParams;
use casper_rust_wasm_sdk::types::deploy_params::payment_str_params::PaymentStrParams;
use casper_rust_wasm_sdk::types::deploy_params::session_str_params::SessionStrParams;
use casper_rust_wasm_sdk::types::hash::account_hash::AccountHash;
use casper_rust_wasm_sdk::types::hash::addressable_entity_hash::AddressableEntityHash;
use casper_rust_wasm_sdk::types::hash::package_hash::PackageHash;
use casper_rust_wasm_sdk::types::pricing_mode::PricingMode;
use casper_rust_wasm_sdk::types::public_key::PublicKey;
use casper_rust_wasm_sdk::types::transaction_params::transaction_builder_params::{
    TransactionBuilderParams, TransferTarget, TransferTargetKind,
};
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;
use casper_rust_wasm_sdk::types::uref::URef;
use serde_json::Value;

fn req_str(obj: &Value, key: &str) -> Result<String, String> {
    obj.get(key)
        .and_then(|v| v.as_str())
        .map(str::to_string)
        .ok_or_else(|| format!("missing or non-string field `{key}`"))
}

fn opt_str(obj: &Value, key: &str) -> Option<String> {
    obj.get(key).and_then(|v| v.as_str()).map(str::to_string)
}

fn opt_bool(obj: &Value, key: &str) -> Option<bool> {
    obj.get(key).and_then(|v| v.as_bool())
}

fn opt_u64(obj: &Value, key: &str) -> Option<u64> {
    obj.get(key).and_then(|v| {
        v.as_u64()
            .or_else(|| v.as_str().and_then(|s| s.parse().ok()))
    })
}

fn opt_string_vec(obj: &Value, key: &str) -> Option<Vec<String>> {
    obj.get(key).and_then(|v| {
        if let Some(arr) = v.as_array() {
            Some(
                arr.iter()
                    .filter_map(|x| x.as_str().map(str::to_string))
                    .collect(),
            )
        } else {
            None
        }
    })
}

fn parse_pricing_mode(raw: &str) -> Result<PricingMode, String> {
    match raw.trim().to_lowercase().as_str() {
        "fixed" => Ok(PricingMode::Fixed),
        "classic" => Ok(PricingMode::Classic),
        "reserved" => Ok(PricingMode::Reserved),
        other => Err(format!(
            "invalid pricing_mode `{other}` (fixed|classic|reserved)"
        )),
    }
}

fn bytes_from_hex(hex: &str) -> Result<Bytes, String> {
    let bytes = helpers::hex_to_uint8_vec(hex);
    if bytes.is_empty() && !hex.is_empty() {
        return Err("invalid hex for bytes".into());
    }
    Ok(Bytes::from(bytes))
}

/// Parse `TransactionStrParams` from a JSON object string.
pub fn parse_transaction_str_params(json: &str) -> Result<TransactionStrParams, String> {
    let obj: Value =
        serde_json::from_str(json).map_err(|e| format!("transaction_params JSON: {e}"))?;
    let obj = obj
        .as_object()
        .ok_or_else(|| "transaction_params must be a JSON object".to_string())?;
    let obj = Value::Object(obj.clone());

    let chain_name = req_str(&obj, "chain_name")?;
    let mut params = TransactionStrParams::default();
    params.set_chain_name(&chain_name);

    if let Some(v) = opt_str(&obj, "initiator_addr") {
        params.set_initiator_addr(&v);
    }
    if let Some(v) = opt_str(&obj, "secret_key") {
        params.set_secret_key(&v);
    }
    if obj.get("timestamp").is_some() {
        params.set_timestamp(opt_str(&obj, "timestamp"));
    }
    if obj.get("ttl").is_some() {
        params.set_ttl(opt_str(&obj, "ttl"));
    }
    if let Some(args) = opt_string_vec(&obj, "session_args_simple") {
        params.set_session_args_simple(args);
    }
    if let Some(v) = opt_str(&obj, "session_args_json") {
        params.set_session_args_json(&v);
    }
    if let Some(v) = opt_str(&obj, "pricing_mode") {
        params.set_pricing_mode(parse_pricing_mode(&v)?);
    }
    if let Some(v) = opt_str(&obj, "additional_computation_factor") {
        params.set_additional_computation_factor(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_amount") {
        params.set_payment_amount(&v);
    }
    if let Some(v) = opt_str(&obj, "gas_price_tolerance") {
        params.set_gas_price_tolerance(&v);
    }
    if let Some(v) = opt_str(&obj, "receipt") {
        params.set_receipt(&v);
    }
    if let Some(v) = opt_bool(&obj, "standard_payment") {
        params.set_standard_payment(v);
    }
    if let Some(v) = opt_str(&obj, "transferred_value") {
        params.set_transferred_value(&v);
    }
    if let Some(v) = opt_str(&obj, "session_entry_point") {
        params.set_session_entry_point(&v);
    }
    if let Some(v) = opt_str(&obj, "chunked_args_hex") {
        params.set_chunked_args(bytes_from_hex(&v)?);
    }
    if let Some(v) = opt_bool(&obj, "min_bid_override") {
        params.set_min_bid_override(v);
    }
    Ok(params)
}

fn parse_uref(s: &str) -> Result<URef, String> {
    URef::from_formatted_str(s).map_err(|e| e.to_string())
}

fn parse_pubkey(s: &str) -> Result<PublicKey, String> {
    PublicKey::new(s).map_err(|e| e.to_string())
}

fn parse_transfer_target(obj: &Value) -> Result<TransferTarget, String> {
    let kind_raw = req_str(obj, "kind")?;
    match kind_raw.to_lowercase().as_str() {
        "publickey" | "public_key" => {
            let pk = parse_pubkey(&req_str(obj, "public_key")?)?;
            Ok(TransferTarget::new(
                TransferTargetKind::PublicKey,
                Some(pk),
                None,
                None,
            ))
        }
        "accounthash" | "account_hash" => {
            let ah = AccountHash::from_formatted_str(&req_str(obj, "account_hash")?)
                .map_err(|e| e.to_string())?;
            Ok(TransferTarget::new(
                TransferTargetKind::AccountHash,
                None,
                Some(ah),
                None,
            ))
        }
        "uref" => {
            let uref = parse_uref(&req_str(obj, "uref")?)?;
            Ok(TransferTarget::new(
                TransferTargetKind::URef,
                None,
                None,
                Some(uref),
            ))
        }
        other => Err(format!(
            "unknown transfer target kind `{other}` (PublicKey|AccountHash|URef)"
        )),
    }
}

/// Parse `TransactionBuilderParams` from JSON (`kind` discriminant).
pub fn parse_transaction_builder_params(json: &str) -> Result<TransactionBuilderParams, String> {
    let obj: Value = serde_json::from_str(json).map_err(|e| format!("builder_params JSON: {e}"))?;
    let kind = req_str(&obj, "kind")?;
    let mut params = match kind.to_lowercase().as_str() {
        "session" => {
            let bytes = match opt_str(&obj, "transaction_bytes_hex") {
                Some(h) => Some(bytes_from_hex(&h)?),
                None => None,
            };
            Ok(TransactionBuilderParams::new_session(
                bytes,
                opt_bool(&obj, "is_install_upgrade"),
            ))
        }
        "transfer" => {
            let target = obj
                .get("target")
                .ok_or_else(|| "transfer requires `target` object".to_string())?;
            let target = parse_transfer_target(target)?;
            let amount = req_str(&obj, "amount")?;
            let source = match opt_str(&obj, "source") {
                Some(s) => Some(parse_uref(&s)?),
                None => None,
            };
            Ok(TransactionBuilderParams::new_transfer(
                source,
                target,
                &amount,
                opt_u64(&obj, "maybe_id"),
            ))
        }
        "invocableentity" | "invocable_entity" => {
            let raw = req_str(&obj, "entity_hash")?;
            let entity = AddressableEntityHash::from_formatted_str(&raw)
                .or_else(|_| AddressableEntityHash::new(&raw))
                .map_err(|e| e.to_string())?;
            let entry = req_str(&obj, "entry_point")?;
            Ok(TransactionBuilderParams::new_invocable_entity(
                entity, &entry,
            ))
        }
        "invocableentityalias" | "invocable_entity_alias" => {
            let alias = req_str(&obj, "entity_alias")?;
            let entry = req_str(&obj, "entry_point")?;
            Ok(TransactionBuilderParams::new_invocable_entity_alias(
                &alias, &entry,
            ))
        }
        "package" => {
            let raw = req_str(&obj, "package_hash")?;
            let hash = PackageHash::from_formatted_str(&raw)
                .or_else(|_| PackageHash::new(&raw))
                .map_err(|e| e.to_string())?;
            let entry = req_str(&obj, "entry_point")?;
            let version = opt_str(&obj, "maybe_entity_version");
            Ok(TransactionBuilderParams::new_package(hash, &entry, version))
        }
        "packagealias" | "package_alias" => {
            let alias = req_str(&obj, "package_alias")?;
            let entry = req_str(&obj, "entry_point")?;
            let version = opt_str(&obj, "maybe_entity_version");
            Ok(TransactionBuilderParams::new_package_alias(
                &alias, &entry, version,
            ))
        }
        "addbid" | "add_bid" => {
            let pk = parse_pubkey(&req_str(&obj, "public_key")?)?;
            let amount = req_str(&obj, "amount")?;
            let rate = obj
                .get("delegation_rate")
                .and_then(|v| v.as_u64())
                .ok_or_else(|| "add_bid requires delegation_rate".to_string())?
                as u8;
            Ok(TransactionBuilderParams::new_add_bid(
                pk,
                rate,
                &amount,
                opt_u64(&obj, "minimum_delegation_amount"),
                opt_u64(&obj, "maximum_delegation_amount"),
                obj.get("reserved_slots")
                    .and_then(|v| v.as_u64())
                    .map(|v| v as u32),
            ))
        }
        "delegate" => {
            let delegator = parse_pubkey(&req_str(&obj, "delegator")?)?;
            let validator = parse_pubkey(&req_str(&obj, "validator")?)?;
            let amount = req_str(&obj, "amount")?;
            Ok(TransactionBuilderParams::new_delegate(
                delegator, validator, &amount,
            ))
        }
        "undelegate" => {
            let delegator = parse_pubkey(&req_str(&obj, "delegator")?)?;
            let validator = parse_pubkey(&req_str(&obj, "validator")?)?;
            let amount = req_str(&obj, "amount")?;
            Ok(TransactionBuilderParams::new_undelegate(
                delegator, validator, &amount,
            ))
        }
        "redelegate" => {
            let delegator = parse_pubkey(&req_str(&obj, "delegator")?)?;
            let validator = parse_pubkey(&req_str(&obj, "validator")?)?;
            let new_validator = parse_pubkey(&req_str(&obj, "new_validator")?)?;
            let amount = req_str(&obj, "amount")?;
            Ok(TransactionBuilderParams::new_redelegate(
                delegator,
                validator,
                new_validator,
                &amount,
            ))
        }
        "withdrawbid" | "withdraw_bid" => {
            let pk = parse_pubkey(&req_str(&obj, "public_key")?)?;
            let amount = req_str(&obj, "amount")?;
            Ok(TransactionBuilderParams::new_withdraw_bid(pk, &amount))
        }
        other => Err(format!(
            "unknown builder kind `{other}` (Session|Transfer|InvocableEntity|…)"
        )),
    }?;
    apply_builder_runtime(&mut params, &obj)?;
    Ok(params)
}

fn apply_builder_runtime(params: &mut TransactionBuilderParams, obj: &Value) -> Result<(), String> {
    let seed = match opt_str(obj, "seed_hex") {
        Some(h) => Some(Vec::<u8>::from(bytes_from_hex(&h)?)),
        None => None,
    };
    if let Some(runtime) = opt_str(obj, "runtime") {
        match runtime.to_lowercase().as_str() {
            "v1" | "vmcasperv1" | "vm_casper_v1" => params.set_runtime_v1(),
            "v2" | "vmcasperv2" | "vm_casper_v2" => {
                let transferred_value = opt_u64(obj, "transferred_value").unwrap_or(0);
                params.set_runtime_v2(transferred_value, seed);
            }
            other => return Err(format!("unknown runtime `{other}` (v1|v2)")),
        }
    } else if opt_u64(obj, "transferred_value").is_some() || seed.is_some() {
        let transferred_value = opt_u64(obj, "transferred_value").unwrap_or(0);
        params.set_runtime_v2(transferred_value, seed);
    }
    Ok(())
}

/// Parse `DeployStrParams` from JSON.
pub fn parse_deploy_str_params(json: &str) -> Result<DeployStrParams, String> {
    let obj: Value = serde_json::from_str(json).map_err(|e| format!("deploy_params JSON: {e}"))?;
    let chain_name = req_str(&obj, "chain_name")?;
    let session_account = req_str(&obj, "session_account")?;
    Ok(DeployStrParams::new(
        &chain_name,
        &session_account,
        opt_str(&obj, "secret_key"),
        opt_str(&obj, "timestamp"),
        opt_str(&obj, "ttl"),
        opt_str(&obj, "gas_price_tolerance"),
    ))
}

/// Parse `SessionStrParams` from JSON.
pub fn parse_session_str_params(json: &str) -> Result<SessionStrParams, String> {
    let obj: Value = serde_json::from_str(json).map_err(|e| format!("session_params JSON: {e}"))?;
    let mut params = SessionStrParams::default();
    if let Some(v) = opt_str(&obj, "session_hash") {
        params.set_session_hash(&v);
    }
    if let Some(v) = opt_str(&obj, "session_name") {
        params.set_session_name(&v);
    }
    if let Some(v) = opt_str(&obj, "session_package_hash") {
        params.set_session_package_hash(&v);
    }
    if let Some(v) = opt_str(&obj, "session_package_name") {
        params.set_session_package_name(&v);
    }
    if let Some(v) = opt_str(&obj, "session_path") {
        params.set_session_path(&v);
    }
    if let Some(v) = opt_str(&obj, "session_bytes_hex") {
        params.set_session_bytes(bytes_from_hex(&v)?);
    }
    if let Some(args) = opt_string_vec(&obj, "session_args_simple") {
        params.set_session_args_simple(args);
    }
    if let Some(v) = opt_str(&obj, "session_args_json") {
        params.set_session_args_json(&v);
    }
    if let Some(v) = opt_str(&obj, "session_version") {
        params.set_session_version(&v);
    }
    if let Some(v) = opt_str(&obj, "session_entry_point") {
        params.set_session_entry_point(&v);
    }
    if let Some(v) = opt_bool(&obj, "is_session_transfer") {
        params.set_is_session_transfer(v);
    }
    Ok(params)
}

/// Parse `PaymentStrParams` from JSON (prefer `payment_amount` / `payment_args_json`).
pub fn parse_payment_str_params(json: &str) -> Result<PaymentStrParams, String> {
    let obj: Value = serde_json::from_str(json).map_err(|e| format!("payment_params JSON: {e}"))?;
    let params = PaymentStrParams::default();
    if let Some(v) = opt_str(&obj, "payment_amount") {
        params.set_payment_amount(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_hash") {
        params.set_payment_hash(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_name") {
        params.set_payment_name(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_package_hash") {
        params.set_payment_package_hash(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_package_name") {
        params.set_payment_package_name(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_path") {
        params.set_payment_path(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_args_json") {
        params.set_payment_args_json(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_version") {
        params.set_payment_version(&v);
    }
    if let Some(v) = opt_str(&obj, "payment_entry_point") {
        params.set_payment_entry_point(&v);
    }
    Ok(params)
}

pub fn parse_optional_uref(raw: Option<&str>) -> Result<Option<URef>, String> {
    match raw {
        None => Ok(None),
        Some(s) if s.is_empty() => Ok(None),
        Some(s) => Ok(Some(parse_uref(s)?)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_tx_str_params_minimal() {
        let p = parse_transaction_str_params(
            r#"{"chain_name":"casper-net-1","initiator_addr":"01aa"}"#,
        )
        .unwrap();
        assert!(p.chain_name().is_some());
    }

    #[test]
    fn parse_session_builder() {
        let b =
            parse_transaction_builder_params(r#"{"kind":"Session","is_install_upgrade":false}"#)
                .unwrap();
        let _ = b;
    }

    #[test]
    fn parse_deploy_params() {
        let d =
            parse_deploy_str_params(r#"{"chain_name":"casper-net-1","session_account":"01aa"}"#)
                .unwrap();
        let _ = d;
    }
}
