//! Shared CEPS helpers: wasm resolve, put/wait, custom entrypoint.

use super::{
    call_result_json, ceps_err, core_client, optional, optional_or, package_opt, parse_bool,
    parse_u64, payment, require_pem, required, CepsCtx,
};
use casper_rust_wasm_sdk::types::addr::entity_addr::EntityAddr;
use casper_rust_wasm_sdk::types::transaction_params::transaction_builder_params::TransactionBuilderParams;
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;
use casper_rust_wasm_sdk::SDK;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::path::PathBuf;

pub async fn run_shared(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "ceps_wasm_root" => Ok(json!({
            "wasm_root": ceps_client::wasm::wasm_root().display().to_string()
        })),
        "ceps_wasm_resolve" => {
            let name = required(args, "name")?;
            let path = ceps_client::wasm::resolve(&name).map_err(ceps_err)?;
            Ok(json!({ "path": path.display().to_string() }))
        }
        "ceps_wasm_load" => {
            let name = required(args, "name")?;
            let bytes = ceps_client::wasm::load(&name).map_err(ceps_err)?;
            Ok(json!({ "name": name, "bytes": bytes.len() }))
        }
        "ceps_put_transaction" => {
            ctx.policy.check_put_generic("ceps_put_transaction")?;
            let mut core = core_client(ctx)?;
            if let Some(h) = optional(args, "contract_hash") {
                core.set_contract_hash(&h, package_opt(args).as_deref())
                    .map_err(ceps_err)?;
            }
            let raw = required(args, "transaction_json")?;
            let tx_val = load_json(&raw)?;
            let wait = optional(args, "wait")
                .map(|s| parse_bool(&s))
                .transpose()?
                .unwrap_or(true);
            let timeout = optional(args, "wait_timeout_ms")
                .map(|s| parse_u64(&s))
                .transpose()?;
            let put = core
                .put_transaction(&tx_val, wait, timeout)
                .await
                .map_err(ceps_err)?;
            Ok(call_result_json(&put))
        }
        "ceps_wait_transaction" => {
            let core = core_client(ctx)?;
            let hash = required(args, "transaction_hash")?;
            let timeout = optional(args, "wait_timeout_ms")
                .map(|s| parse_u64(&s))
                .transpose()?;
            let ev = core
                .wait_transaction(&hash, timeout)
                .await
                .map_err(ceps_err)?;
            Ok(ev)
        }
        "ceps_call_entrypoint" => call_entrypoint(args, ctx).await,
        other => Err(format!("unknown shared ceps action `{other}`")),
    }
}

fn load_json(raw: &str) -> Result<Value, String> {
    let t = raw.trim();
    if let Some(path) = t.strip_prefix('@') {
        let text = std::fs::read_to_string(path)
            .map_err(|e| format!("read transaction file {path}: {e}"))?;
        return serde_json::from_str(&text).map_err(|e| format!("transaction JSON: {e}"));
    }
    let p = PathBuf::from(t);
    if p.is_file() {
        let text = std::fs::read_to_string(&p).map_err(|e| format!("read {}: {e}", p.display()))?;
        return serde_json::from_str(&text).map_err(|e| format!("transaction JSON: {e}"));
    }
    serde_json::from_str(t).map_err(|e| format!("transaction JSON: {e}"))
}

async fn call_entrypoint(
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    ctx.policy.check_put_generic("ceps_call_entrypoint")?;
    let pem = require_pem(ctx)?;
    let contract = required(args, "contract_hash")?;
    let entry_point = required(args, "entry_point")?;
    let args_json = optional_or(args, "args_json", "[]");
    let pay = payment(args);

    let hash = contract
        .trim()
        .trim_start_matches("hash-")
        .trim_start_matches("entity-contract-");
    let entity = EntityAddr::from_formatted_str(&format!("entity-contract-{hash}"))
        .map_err(|e| format!("contract hash: {e}"))?;

    let builder = TransactionBuilderParams::new_invocable_entity(entity.into(), &entry_point);
    let params = TransactionStrParams::default();
    params.set_secret_key(pem);
    params.set_chain_name(if ctx.chain_name.trim().is_empty() {
        "casper-net-1"
    } else {
        ctx.chain_name.trim()
    });
    params.set_payment_amount(&pay);
    params.set_session_args_json(&args_json);

    let sdk = SDK::new(Some(ctx.rpc.to_string()), None, Some(ctx.verbosity));
    let tx = sdk
        .make_transaction(builder, params)
        .map_err(|e| e.to_string())?;
    let tx = sdk.sign_transaction(tx, pem);
    let put = sdk
        .put_transaction(tx, Some(ctx.verbosity), Some(ctx.rpc.to_string()))
        .await
        .map_err(|e| e.to_string())?;
    let hash = format!("{}", put.result.transaction_hash);
    Ok(json!({
        "transaction_hash": hash,
        "put_result": put.result,
    }))
}
