//! Smoke: one-shot transfer then wait_transaction (needs CASPER_SECRET_KEY + live NCTL).

use anyhow::{bail, Result};
use casper_rust_wasm_sdk::helpers::public_key_from_secret_key;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casperatatui::model::RpcEvent;
use casperatatui::policy::WritePolicy;
use casperatatui::sdk_client::{OneShotTransferOwned, SdkClient};
use casperatatui::write_flow::{DEFAULT_PAYMENT_MOTES, DEFAULT_TRANSFER_MOTES};
use tokio::sync::mpsc;
use tokio::time::{timeout, Duration};

#[tokio::main]
async fn main() -> Result<()> {
    let rpc = std::env::var("CASPER_RPC_URL").unwrap_or_else(|_| "http://127.0.0.1:11101".into());
    let events = std::env::var("CASPER_EVENTS_URL")
        .unwrap_or_else(|_| "http://127.0.0.1:18101/events".into());
    let pem_path = match std::env::var("CASPER_SECRET_KEY") {
        Ok(p) if !p.trim().is_empty() => p,
        _ => {
            println!("skip write+wait: set CASPER_SECRET_KEY to a PEM path to exercise put");
            // Still exercise SSE collect (bounded).
            return smoke_sse_only(&events).await;
        }
    };

    let pem = std::fs::read_to_string(&pem_path)?.trim().to_string();
    let public_key = public_key_from_secret_key(&pem).map_err(|e| anyhow::anyhow!(e))?;
    let target = std::env::var("CASPER_SMOKE_TARGET").unwrap_or_else(|_| public_key.clone());
    let amount =
        std::env::var("CASPER_SMOKE_AMOUNT").unwrap_or_else(|_| DEFAULT_TRANSFER_MOTES.to_string());

    let client = SdkClient::new(rpc, Verbosity::Low);
    let (tx, mut rx) = mpsc::unbounded_channel();

    println!(
        "put transfer | pk={}…",
        &public_key[..16.min(public_key.len())]
    );
    client.spawn_one_shot_transfer(
        OneShotTransferOwned {
            chain_name: "casper-net-1".into(),
            pem,
            public_key,
            target,
            amount,
            payment: DEFAULT_PAYMENT_MOTES.into(),
            policy: {
                use std::path::Path;
                WritePolicy::load(Path::new("examples/desktop/tui/policy.sample.json"))
                    .or_else(|_| WritePolicy::load(Path::new("policy.sample.json")))
                    .map_err(|e| anyhow::anyhow!(e))?
            },
        },
        tx.clone(),
    );

    let put = match timeout(Duration::from_secs(30), rx.recv()).await {
        Ok(Some(RpcEvent::WritePut(Ok(v)))) => v,
        Ok(Some(RpcEvent::WritePut(Err(e)))) => bail!("put failed: {e}"),
        other => bail!("put unexpected: {other:?}"),
    };
    let hash = casperatatui::write_flow::extract_tx_hash(&put)
        .ok_or_else(|| anyhow::anyhow!("no hash in put result: {put}"))?;
    println!("put OK | hash={}", &hash[..16.min(hash.len())]);

    client.spawn_wait_transaction(events.clone(), hash.clone(), Some(90_000), tx.clone());
    match timeout(Duration::from_secs(100), rx.recv()).await {
        Ok(Some(RpcEvent::WaitDone(Ok(_)))) => println!("wait OK | inclusion confirmed"),
        Ok(Some(RpcEvent::WaitDone(Err(e)))) => bail!("wait failed: {e}"),
        other => bail!("wait unexpected: {other:?}"),
    }

    smoke_sse_only(&events).await
}

async fn smoke_sse_only(events: &str) -> Result<()> {
    let client = SdkClient::new(
        std::env::var("CASPER_RPC_URL").unwrap_or_else(|_| "http://127.0.0.1:11101".into()),
        Verbosity::Low,
    );
    let (tx, mut rx) = mpsc::unbounded_channel();
    client.spawn_sse_collect(events.to_string(), vec!["BlockAdded".into()], 2, 20_000, tx);
    match timeout(Duration::from_secs(25), rx.recv()).await {
        Ok(Some(RpcEvent::SseCollect(Ok(v)))) => {
            let n = v.as_array().map(|a| a.len()).unwrap_or(0);
            println!("SSE collect OK | events={n}");
            Ok(())
        }
        Ok(Some(RpcEvent::SseCollect(Err(e)))) => bail!("SSE collect failed: {e}"),
        other => bail!("SSE unexpected: {other:?}"),
    }
}
