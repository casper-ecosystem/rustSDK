//! Smoke CEP info + queries (feature `ceps`). Needs live RPC for queries when contract hashes are set.

use anyhow::{bail, Result};
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casperatatui::model::RpcEvent;
use casperatatui::sdk_client::{ActionWriteCtx, SdkClient};
use std::collections::HashMap;
use tokio::sync::mpsc;
use tokio::time::{timeout, Duration};

#[tokio::main]
async fn main() -> Result<()> {
    let rpc = std::env::var("CASPER_RPC_URL").unwrap_or_else(|_| "http://127.0.0.1:11101".into());
    let events = std::env::var("CASPER_EVENTS_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:18101/events".into());
    let chain = std::env::var("CASPER_CHAIN_NAME").unwrap_or_else(|_| "casper-net-1".into());

    let client = SdkClient::new(rpc, Verbosity::Low);
    let write = ActionWriteCtx {
        events_url: events,
        chain_name: chain,
        ..ActionWriteCtx::default()
    };
    let (tx, mut rx) = mpsc::unbounded_channel();

    for method in ["cep18_info", "cep78_info", "cep85_info", "cep95_info"] {
        client.spawn_action_with_write(method, HashMap::new(), write.clone(), tx.clone());
        match timeout(Duration::from_secs(30), rx.recv()).await {
            Ok(Some(RpcEvent::Action {
                method: m,
                result: Ok(v),
            })) => {
                println!("{m} OK | {v}");
            }
            Ok(Some(RpcEvent::Action {
                method: m,
                result: Err(e),
            })) => bail!("{m} failed: {e}"),
            other => bail!("{method} unexpected: {other:?}"),
        }
    }

    if let Ok(hash) = std::env::var("CEPS_CEP18_CONTRACT_HASH") {
        let hash = hash.trim().to_string();
        if !hash.is_empty() {
            let mut args = HashMap::new();
            args.insert("contract_hash".into(), hash);
            if let Ok(pkg) = std::env::var("CEPS_CEP18_PACKAGE_HASH") {
                let pkg = pkg.trim().to_string();
                if !pkg.is_empty() {
                    args.insert("package_hash".into(), pkg);
                }
            }
            client.spawn_action_with_write("cep18_name", args, write.clone(), tx.clone());
            match timeout(Duration::from_secs(30), rx.recv()).await {
                Ok(Some(RpcEvent::Action { result: Ok(v), .. })) => {
                    println!("cep18_name OK | {v}");
                }
                Ok(Some(RpcEvent::Action { result: Err(e), .. })) => {
                    bail!("cep18_name failed: {e}");
                }
                other => bail!("cep18_name unexpected: {other:?}"),
            }
        }
    } else {
        println!("skip cep18_name: set CEPS_CEP18_CONTRACT_HASH to exercise a query");
    }

    println!("smoke_ceps_query done");
    Ok(())
}
