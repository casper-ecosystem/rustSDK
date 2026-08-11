//! Smoke CEP-18 install (feature `ceps`). Needs NCTL, PEM, and tip WASM.

use anyhow::{bail, Result};
use casper_rust_wasm_sdk::helpers::public_key_from_secret_key;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casperatatui::model::RpcEvent;
use casperatatui::policy::WritePolicy;
use casperatatui::sdk_client::{ActionWriteCtx, SdkClient};
use std::collections::HashMap;
use std::path::Path;
use std::time::{SystemTime, UNIX_EPOCH};
use tokio::sync::mpsc;
use tokio::time::{timeout, Duration};

#[tokio::main]
async fn main() -> Result<()> {
    let rpc = std::env::var("CASPER_RPC_URL").unwrap_or_else(|_| "http://127.0.0.1:11101".into());
    let events = std::env::var("CASPER_EVENTS_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:18101/events".into());
    let chain = std::env::var("CASPER_CHAIN_NAME").unwrap_or_else(|_| "casper-net-1".into());

    let pem_path = match std::env::var("CASPER_SECRET_KEY") {
        Ok(p) if !p.trim().is_empty() => p,
        _ => {
            println!("skip install: set CASPER_SECRET_KEY to a PEM path");
            println!("also set CEPS_CEP18_WASM (or wasm_path) to tip cep18.wasm");
            return Ok(());
        }
    };
    let pem = std::fs::read_to_string(&pem_path)?.trim().to_string();
    let public_key = public_key_from_secret_key(&pem).map_err(|e| anyhow::anyhow!(e))?;

    let wasm_arg =
        match std::env::var("CEPS_CEP18_WASM").or_else(|_| std::env::var("CEPS_WASM_PATH")) {
            Ok(p) if !p.trim().is_empty() => p.trim().to_string(),
            _ if std::env::var("CEPS_WASM_ROOT").is_ok() => "cep18".to_string(),
            _ => {
                println!("skip install: set CEPS_WASM_ROOT (alias cep18) or CEPS_CEP18_WASM path");
                println!("tip: point CEPS_WASM_ROOT at tests/wasm (cep18/cep18.wasm layout)");
                return Ok(());
            }
        };

    let policy = WritePolicy::load(Path::new(
        "examples/desktop/casperatatui/policy.sample.json",
    ))
    .or_else(|_| WritePolicy::load(Path::new("policy.sample.json")))
    .map_err(|e| anyhow::anyhow!(e))?;

    let client = SdkClient::new(rpc, Verbosity::Low);
    let write = ActionWriteCtx {
        pem: Some(pem),
        public_key,
        chain_name: chain,
        events_url: events,
        policy,
    };
    let (tx, mut rx) = mpsc::unbounded_channel();

    let nonce = SystemTime::now().duration_since(UNIX_EPOCH)?.as_secs();
    let mut args = HashMap::new();
    args.insert("name".into(), format!("TuiCep18{nonce}"));
    args.insert("symbol".into(), "TUI".into());
    args.insert("wasm".into(), wasm_arg);

    println!("cep18_install …");
    client.spawn_action_with_write("cep18_install", args, write, tx);
    match timeout(Duration::from_secs(180), rx.recv()).await {
        Ok(Some(RpcEvent::Action { result: Ok(v), .. })) => {
            println!("cep18_install OK | {v}");
            if v.get("transaction_hash").and_then(|h| h.as_str()).is_none() {
                bail!("missing transaction_hash in result");
            }
        }
        Ok(Some(RpcEvent::Action { result: Err(e), .. })) => bail!("cep18_install failed: {e}"),
        other => bail!("cep18_install unexpected: {other:?}"),
    }

    println!("smoke_ceps_install done");
    Ok(())
}
