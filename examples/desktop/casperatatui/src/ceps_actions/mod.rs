//! CEP Actions behind feature `ceps` (ceps-client git dep).

mod cep18;
mod cep78;
mod cep85;
mod cep95;
mod ces;
mod shared;

use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use ceps_client::{CEPClient, TransactionParams, Verbosity as CepsVerbosity};
use serde_json::{json, Value};
use std::collections::HashMap;

use crate::policy::WritePolicy;

pub use cep18::run_cep18;
pub use cep78::run_cep78;
pub use cep85::run_cep85;
pub use cep95::run_cep95;
pub use ces::run_ces;
pub use shared::run_shared;

const DEFAULT_PAYMENT: &str = "500000000000";

/// Endpoints + session bits shared by CEP action handlers.
pub struct CepsCtx<'a> {
    pub rpc: &'a str,
    pub events_url: &'a str,
    pub chain_name: &'a str,
    pub verbosity: Verbosity,
    pub pem: Option<&'a str>,
    pub policy: &'a WritePolicy,
}

/// Dispatch a catalog action id to the matching CEP/CES/shared handler.
pub async fn run_ceps_action(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    if method.starts_with("cep18_") {
        return run_cep18(method, args, ctx).await;
    }
    if method.starts_with("cep78_") {
        return run_cep78(method, args, ctx).await;
    }
    if method.starts_with("cep85_") {
        return run_cep85(method, args, ctx).await;
    }
    if method.starts_with("cep95_") {
        return run_cep95(method, args, ctx).await;
    }
    if method.starts_with("ces_") {
        return run_ces(method, args, ctx).await;
    }
    if method.starts_with("ceps_") {
        return run_shared(method, args, ctx).await;
    }
    Err(format!("unknown ceps action `{method}`"))
}

pub(crate) fn sse_opt(ctx: &CepsCtx<'_>) -> Option<String> {
    let s = ctx.events_url.trim();
    if s.is_empty() {
        None
    } else {
        Some(s.to_string())
    }
}

pub(crate) fn chain_opt(ctx: &CepsCtx<'_>) -> Option<String> {
    let s = ctx.chain_name.trim();
    if s.is_empty() {
        None
    } else {
        Some(s.to_string())
    }
}

pub(crate) fn ceps_verbosity(v: Verbosity) -> CepsVerbosity {
    match v {
        Verbosity::Low => CepsVerbosity::Low,
        Verbosity::Medium => CepsVerbosity::Medium,
        Verbosity::High => CepsVerbosity::High,
    }
}

pub(crate) fn core_client(ctx: &CepsCtx<'_>) -> Result<CEPClient, String> {
    CEPClient::new(
        ctx.rpc,
        sse_opt(ctx),
        chain_opt(ctx),
        Some(ceps_verbosity(ctx.verbosity)),
    )
    .map_err(ceps_err)
}

pub(crate) fn endpoints_json(cep: &str, rpc: &str, sse: Option<&str>, chain: &str) -> Value {
    json!({
        "cep": cep,
        "rpc_url": rpc,
        "sse_url": sse,
        "chain_name": chain,
    })
}

pub(crate) fn package_opt(args: &HashMap<String, String>) -> Option<String> {
    args.get("package_hash")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
}

pub(crate) fn require_pem<'a>(ctx: &CepsCtx<'a>) -> Result<&'a str, String> {
    ctx.pem
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| "secret_key is missing | press o to load a PEM".to_string())
}

pub(crate) fn transaction_params(pem: &str, payment: &str, ctx: &CepsCtx<'_>) -> TransactionParams {
    let mut tx = TransactionParams::new(pem, payment);
    if !ctx.chain_name.trim().is_empty() {
        tx = tx.with_chain_name(ctx.chain_name.trim());
    }
    tx
}

pub(crate) fn payment(args: &HashMap<String, String>) -> String {
    optional_or(args, "payment_amount", DEFAULT_PAYMENT)
}

pub(crate) fn load_wasm(args: &HashMap<String, String>, alias: &str) -> Result<Vec<u8>, String> {
    if let Some(name) = args
        .get("wasm")
        .or_else(|| args.get("wasm_path"))
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
    {
        return ceps_client::wasm::load(&name).map_err(ceps_err);
    }
    for key in [
        format!("CEPS_{}_WASM", alias.to_uppercase().replace('-', "")),
        "CEPS_WASM_PATH".to_string(),
    ] {
        if let Ok(p) = std::env::var(&key) {
            let p = p.trim();
            if !p.is_empty() {
                return std::fs::read(p).map_err(|e| format!("read wasm {p}: {e}"));
            }
        }
    }
    ceps_client::wasm::load(alias).map_err(|e| {
        format!(
            "{e}; set wasm arg (alias `{alias}`) or CEPS_WASM_ROOT / CEPS_{}_WASM",
            alias.to_uppercase()
        )
    })
}

pub(crate) fn call_result_json(put: &ceps_client::CallResult) -> Value {
    json!({
        "transaction_hash": put.transaction_hash,
        "put_result": put.put_result,
        "execution_result": put.execution_result,
        "ces_events": put.ces_events,
    })
}

pub(crate) fn required(args: &HashMap<String, String>, name: &str) -> Result<String, String> {
    args.get(name)
        .cloned()
        .filter(|s| !s.trim().is_empty())
        .ok_or_else(|| format!("missing required arg `{name}`"))
}

pub(crate) fn optional_or(args: &HashMap<String, String>, name: &str, default: &str) -> String {
    args.get(name)
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| default.to_string())
}

pub(crate) fn optional(args: &HashMap<String, String>, name: &str) -> Option<String> {
    args.get(name)
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
}

pub(crate) fn parse_u8(s: &str) -> Result<u8, String> {
    s.trim()
        .parse::<u8>()
        .map_err(|_| format!("invalid u8 `{s}`"))
}

pub(crate) fn parse_u64(s: &str) -> Result<u64, String> {
    s.trim()
        .parse::<u64>()
        .map_err(|_| format!("invalid u64 `{s}`"))
}

pub(crate) fn parse_bool(s: &str) -> Result<bool, String> {
    match s.trim().to_ascii_lowercase().as_str() {
        "1" | "true" | "yes" | "y" => Ok(true),
        "0" | "false" | "no" | "n" => Ok(false),
        other => Err(format!("invalid bool `{other}`")),
    }
}

pub(crate) fn csv_list(s: &str) -> Vec<String> {
    s.split(',')
        .map(|p| p.trim().to_string())
        .filter(|p| !p.is_empty())
        .collect()
}

pub(crate) fn events_mode(s: &str) -> Result<ceps_client::EventsMode, String> {
    let t = s.trim().to_ascii_lowercase();
    if let Ok(n) = t.parse::<u8>() {
        return ceps_client::EventsMode::from_u8(n)
            .ok_or_else(|| format!("unknown events_mode u8 `{n}`"));
    }
    match t.as_str() {
        "ces" => Ok(ceps_client::EventsMode::CES),
        "noevents" | "none" | "off" => Ok(ceps_client::EventsMode::NoEvents),
        other => Err(format!("unknown events_mode `{other}`")),
    }
}

pub(crate) fn ceps_err(e: impl std::fmt::Display) -> String {
    e.to_string()
}

pub(crate) fn json_display(v: impl serde::Serialize) -> Result<Value, String> {
    serde_json::to_value(v).map_err(|e| e.to_string())
}
