//! CEP Actions behind feature `ceps` (ceps-client path-dep).

use casper_rust_wasm_sdk::helpers::public_key_from_secret_key;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use ceps_client::cep18::InstallArgs as Cep18InstallArgs;
use ceps_client::cep78::InstallArgs as Cep78InstallArgs;
use ceps_client::cep85::InstallArgs as Cep85InstallArgs;
use ceps_client::cep95::InstallArgs as Cep95InstallArgs;
use ceps_client::{
    CallResult, Cep18Client, Cep78Client, Cep85Client, Cep95Client, DeployParams, EventsMode,
    EventsMode78,
};
use serde_json::{json, Value};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;

use crate::policy::WritePolicy;

const DEFAULT_CEP18_PAYMENT: &str = "400000000000";
const DEFAULT_CEP78_PAYMENT: &str = "600000000000";
const DEFAULT_CEP85_PAYMENT: &str = "550000000000";
const DEFAULT_CEP95_PAYMENT: &str = "600000000000";

/// Endpoints + session bits shared by CEP action handlers.
pub struct CepsCtx<'a> {
    pub rpc: &'a str,
    pub events_url: &'a str,
    pub chain_name: &'a str,
    pub verbosity: Verbosity,
    pub pem: Option<&'a str>,
    pub policy: &'a WritePolicy,
}

/// Dispatch a `cep*` catalog action.
pub async fn run_ceps_action(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "cep18_info" => {
            let c = cep18_client(ctx)?;
            Ok(endpoints_json(
                "cep18",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep18_name" => {
            let mut c = cep18_client(ctx)?;
            bind_contract(&mut c, args)?;
            Ok(json!({ "name": c.name().await.map_err(ceps_err)? }))
        }
        "cep18_symbol" => {
            let mut c = cep18_client(ctx)?;
            bind_contract(&mut c, args)?;
            Ok(json!({ "symbol": c.symbol().await.map_err(ceps_err)? }))
        }
        "cep18_decimals" => {
            let mut c = cep18_client(ctx)?;
            bind_contract(&mut c, args)?;
            Ok(json!({ "decimals": c.decimals().await.map_err(ceps_err)? }))
        }
        "cep18_balance_of" => {
            let mut c = cep18_client(ctx)?;
            bind_contract(&mut c, args)?;
            let account = required(args, "account")?;
            Ok(json!({
                "account": account,
                "balance": c.balance_of(&account).await.map_err(ceps_err)?,
            }))
        }
        "cep18_install" => cep18_install(args, ctx).await,

        "cep78_info" => {
            let c = cep78_client(ctx)?;
            Ok(endpoints_json(
                "cep78",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep78_name" => {
            let mut c = cep78_client(ctx)?;
            bind_contract78(&mut c, args)?;
            Ok(json!({ "name": c.collection_name().await.map_err(ceps_err)? }))
        }
        "cep78_balance" => {
            let mut c = cep78_client(ctx)?;
            bind_contract78(&mut c, args)?;
            let account = required(args, "account")?;
            Ok(json!({
                "account": account,
                "balance": c.balance_of(&account).await.map_err(ceps_err)?,
            }))
        }
        "cep78_install" => cep78_install(args, ctx).await,

        "cep85_info" => {
            let c = cep85_client(ctx)?;
            Ok(endpoints_json(
                "cep85",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep85_name" => {
            let mut c = cep85_client(ctx)?;
            bind_contract85(&mut c, args)?;
            Ok(json!({ "name": c.collection_name().await.map_err(ceps_err)? }))
        }
        "cep85_balance" => {
            let mut c = cep85_client(ctx)?;
            bind_contract85(&mut c, args)?;
            let account = required(args, "account")?;
            let id = required(args, "id")?;
            Ok(json!({
                "account": account,
                "id": id,
                "balance": c.balance_of(&account, &id).await.map_err(ceps_err)?,
            }))
        }
        "cep85_install" => cep85_install(args, ctx).await,

        "cep95_info" => {
            let c = cep95_client(ctx)?;
            Ok(endpoints_json(
                "cep95",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep95_name" => {
            let mut c = cep95_client(ctx)?;
            bind_contract95(&mut c, args)?;
            Ok(json!({ "name": c.name().await.map_err(ceps_err)? }))
        }
        "cep95_symbol" => {
            let mut c = cep95_client(ctx)?;
            bind_contract95(&mut c, args)?;
            Ok(json!({ "symbol": c.symbol().await.map_err(ceps_err)? }))
        }
        "cep95_owner_of" => {
            let mut c = cep95_client(ctx)?;
            bind_contract95(&mut c, args)?;
            let token_id = required(args, "token_id")?;
            Ok(json!({
                "token_id": token_id,
                "owner": c.owner_of(&token_id).await.map_err(ceps_err)?,
            }))
        }
        "cep95_balance" => {
            let mut c = cep95_client(ctx)?;
            bind_contract95(&mut c, args)?;
            let account = required(args, "account")?;
            Ok(json!({
                "account": account,
                "balance": c.balance_of(&account).await.map_err(ceps_err)?,
            }))
        }
        "cep95_install" => cep95_install(args, ctx).await,

        other => Err(format!("unknown ceps action `{other}`")),
    }
}

fn sse_opt(ctx: &CepsCtx<'_>) -> Option<String> {
    let s = ctx.events_url.trim();
    if s.is_empty() {
        None
    } else {
        Some(s.to_string())
    }
}

fn chain_opt(ctx: &CepsCtx<'_>) -> Option<String> {
    let s = ctx.chain_name.trim();
    if s.is_empty() {
        None
    } else {
        Some(s.to_string())
    }
}

fn cep18_client(ctx: &CepsCtx<'_>) -> Result<Cep18Client, String> {
    Cep18Client::new(ctx.rpc, sse_opt(ctx), chain_opt(ctx), Some(ctx.verbosity)).map_err(ceps_err)
}

fn cep78_client(ctx: &CepsCtx<'_>) -> Result<Cep78Client, String> {
    Cep78Client::new(ctx.rpc, sse_opt(ctx), chain_opt(ctx), Some(ctx.verbosity)).map_err(ceps_err)
}

fn cep85_client(ctx: &CepsCtx<'_>) -> Result<Cep85Client, String> {
    Cep85Client::new(ctx.rpc, sse_opt(ctx), chain_opt(ctx), Some(ctx.verbosity)).map_err(ceps_err)
}

fn cep95_client(ctx: &CepsCtx<'_>) -> Result<Cep95Client, String> {
    Cep95Client::new(ctx.rpc, sse_opt(ctx), chain_opt(ctx), Some(ctx.verbosity)).map_err(ceps_err)
}

fn endpoints_json(cep: &str, rpc: &str, sse: Option<&str>, chain: &str) -> Value {
    json!({
        "cep": cep,
        "rpc_url": rpc,
        "sse_url": sse,
        "chain_name": chain,
    })
}

fn package_opt(args: &HashMap<String, String>) -> Option<String> {
    args.get("package_hash")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
}

fn bind_contract(client: &mut Cep18Client, args: &HashMap<String, String>) -> Result<(), String> {
    let hash = required(args, "contract_hash")?;
    client
        .set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)
}

fn bind_contract78(client: &mut Cep78Client, args: &HashMap<String, String>) -> Result<(), String> {
    let hash = required(args, "contract_hash")?;
    client
        .set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)
}

fn bind_contract85(client: &mut Cep85Client, args: &HashMap<String, String>) -> Result<(), String> {
    let hash = required(args, "contract_hash")?;
    client
        .set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)
}

fn bind_contract95(client: &mut Cep95Client, args: &HashMap<String, String>) -> Result<(), String> {
    let hash = required(args, "contract_hash")?;
    client
        .set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)
}

async fn cep18_install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep18_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let symbol = optional_or(args, "symbol", "TUI");
    let decimals = parse_u8(&optional_or(args, "decimals", "9"))?;
    let total_supply = optional_or(args, "total_supply", "1000");
    let payment = optional_or(args, "payment_amount", DEFAULT_CEP18_PAYMENT);
    let wasm = read_wasm(args, &["CEPS_CEP18_WASM", "CEPS_WASM_PATH"])?;

    let client = cep18_client(ctx)?;
    let install_args = Cep18InstallArgs::new(&name, &symbol, decimals, &total_supply)
        .with_events_mode(EventsMode::Ces)
        .with_mint_and_burn(true);
    let deploy = deploy_params(pem, &payment, ctx);
    let put = client
        .install(&install_args, &wasm, &deploy)
        .await
        .map_err(ceps_err)?;

    let mut out = call_result_json(&put);
    if let Ok(pk) = public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .core()
            .get_account_named_key(&pk, &format!("cep18_contract_hash_{name}"))
            .await
        {
            let package = client
                .core()
                .get_account_named_key(&pk, &format!("cep18_contract_package_{name}"))
                .await
                .ok();
            let _ = client.set_contract_hash(&contract, package.as_deref());
            out["contract_hash"] = json!(contract);
            if let Some(p) = package {
                out["package_hash"] = json!(p);
            }
        }
        out["installer"] = json!(pk);
    }
    Ok(out)
}

async fn cep78_install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep78_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "collection_name")?;
    let symbol = optional_or(args, "collection_symbol", "T78");
    let supply = parse_u64(&optional_or(args, "total_token_supply", "50"))?;
    let payment = optional_or(args, "payment_amount", DEFAULT_CEP78_PAYMENT);
    let wasm = read_wasm(args, &["CEPS_CEP78_WASM", "CEPS_WASM_PATH"])?;

    let client = cep78_client(ctx)?;
    let install_args =
        Cep78InstallArgs::new(&name, &symbol, supply).with_events_mode(EventsMode78::Ces);
    let deploy = deploy_params(pem, &payment, ctx);
    let put = client
        .install(&install_args, &wasm, &deploy)
        .await
        .map_err(ceps_err)?;

    let mut out = call_result_json(&put);
    if let Ok(pk) = public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .core()
            .get_account_named_key(&pk, &format!("cep78_contract_hash_{name}"))
            .await
        {
            let package = client
                .core()
                .get_account_named_key(&pk, &format!("cep78_contract_package_{name}"))
                .await
                .ok();
            let _ = client.set_contract_hash(&contract, package.as_deref());
            out["contract_hash"] = json!(contract);
            if let Some(p) = package {
                out["package_hash"] = json!(p);
            }
        }
        out["installer"] = json!(pk);
    }
    Ok(out)
}

async fn cep85_install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep85_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let uri = optional_or(args, "uri", "https://example.com/metadata/{id}.json");
    let payment = optional_or(args, "payment_amount", DEFAULT_CEP85_PAYMENT);
    let wasm = read_wasm(args, &["CEPS_CEP85_WASM", "CEPS_WASM_PATH"])?;

    let client = cep85_client(ctx)?;
    let install_args = Cep85InstallArgs::new(&name, &uri)
        .with_events_mode(EventsMode::Ces)
        .with_enable_burn(true);
    let deploy = deploy_params(pem, &payment, ctx);
    let put = client
        .install(&install_args, &wasm, &deploy)
        .await
        .map_err(ceps_err)?;

    let mut out = call_result_json(&put);
    if let Ok(pk) = public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .core()
            .get_account_named_key(&pk, &format!("cep85_contract_hash_{name}"))
            .await
        {
            let package = client
                .core()
                .get_account_named_key(&pk, &format!("cep85_contract_package_{name}"))
                .await
                .ok();
            let _ = client.set_contract_hash(&contract, package.as_deref());
            out["contract_hash"] = json!(contract);
            if let Some(p) = package {
                out["package_hash"] = json!(p);
            }
        }
        out["installer"] = json!(pk);
    }
    Ok(out)
}

async fn cep95_install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep95_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let symbol = optional_or(args, "symbol", "T95");
    let package_key = required(args, "package_key_name")?;
    let payment = optional_or(args, "payment_amount", DEFAULT_CEP95_PAYMENT);
    let wasm = read_wasm(args, &["CEPS_CEP95_WASM", "CEPS_WASM_PATH"])?;

    let mut client = cep95_client(ctx)?;
    let install_args = Cep95InstallArgs::new(&name, &symbol, &package_key);
    let deploy = deploy_params(pem, &payment, ctx);
    let put = client
        .install(&install_args, &wasm, &deploy)
        .await
        .map_err(ceps_err)?;

    let mut out = call_result_json(&put);
    let pk = public_key_from_secret_key(pem).map_err(|e| e.to_string())?;
    let (contract, package) = client
        .bind_odra_install(&pk, &package_key)
        .await
        .map_err(ceps_err)?;
    out["contract_hash"] = json!(contract);
    out["package_hash"] = json!(package);
    out["installer"] = json!(pk);
    Ok(out)
}

fn deploy_params(pem: &str, payment: &str, ctx: &CepsCtx<'_>) -> DeployParams {
    let mut d = DeployParams::new(pem, payment);
    if !ctx.chain_name.trim().is_empty() {
        d = d.with_chain_name(ctx.chain_name.trim());
    }
    d
}

fn require_pem<'a>(ctx: &CepsCtx<'a>) -> Result<&'a str, String> {
    ctx.pem
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| "secret_key is missing | press o to load a PEM".to_string())
}

fn read_wasm(args: &HashMap<String, String>, env_keys: &[&str]) -> Result<Vec<u8>, String> {
    let path = resolve_wasm_path(args, env_keys)?;
    fs::read(&path).map_err(|e| format!("read wasm {}: {e}", path.display()))
}

fn resolve_wasm_path(args: &HashMap<String, String>, env_keys: &[&str]) -> Result<PathBuf, String> {
    if let Some(p) = args
        .get("wasm_path")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
    {
        return Ok(PathBuf::from(p));
    }
    for key in env_keys {
        if let Ok(p) = std::env::var(key) {
            let p = p.trim().to_string();
            if !p.is_empty() {
                return Ok(PathBuf::from(p));
            }
        }
    }
    Err(format!(
        "missing wasm_path (arg or env {}); tip WASM via ceps-rust-ts-client make wasm-from-ceps",
        env_keys.join(" / ")
    ))
}

fn call_result_json(put: &CallResult) -> Value {
    json!({
        "transaction_hash": put.transaction_hash,
        "put_result": put.put_result,
        "execution_result": put.execution_result,
    })
}

fn required(args: &HashMap<String, String>, name: &str) -> Result<String, String> {
    args.get(name)
        .cloned()
        .filter(|s| !s.trim().is_empty())
        .ok_or_else(|| format!("missing required arg `{name}`"))
}

fn optional_or(args: &HashMap<String, String>, name: &str, default: &str) -> String {
    args.get(name)
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| default.to_string())
}

fn parse_u8(s: &str) -> Result<u8, String> {
    s.trim()
        .parse::<u8>()
        .map_err(|_| format!("invalid u8 `{s}`"))
}

fn parse_u64(s: &str) -> Result<u64, String> {
    s.trim()
        .parse::<u64>()
        .map_err(|_| format!("invalid u64 `{s}`"))
}

fn ceps_err(e: impl std::fmt::Display) -> String {
    e.to_string()
}
