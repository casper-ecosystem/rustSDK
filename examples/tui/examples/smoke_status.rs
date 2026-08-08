//! One-shot smoke: Network + Blocks/Txs + Accounts (Phase 1-3 paths).

use anyhow::Result;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_sdk_tui::model::RpcEvent;
use casper_sdk_tui::sdk_client::SdkClient;
use std::collections::HashMap;
use tokio::sync::mpsc;
use tokio::time::{timeout, Duration};

#[tokio::main]
async fn main() -> Result<()> {
    let rpc = std::env::var("CASPER_RPC_URL").unwrap_or_else(|_| "http://127.0.0.1:11101".into());
    let client = SdkClient::new(rpc.clone(), Verbosity::Low);
    let (tx, mut rx) = mpsc::unbounded_channel();

    client.spawn_network_refresh(tx.clone());
    match timeout(Duration::from_secs(20), rx.recv()).await {
        Ok(Some(RpcEvent::Network(snap))) => {
            println!(
                "network OK | chainspec={} height={:?} peers={}",
                snap.chainspec, snap.height, snap.peers
            );
        }
        other => anyhow::bail!("network unexpected: {other:?}"),
    }

    client.spawn_latest_blocks(5, tx.clone());
    match timeout(Duration::from_secs(60), rx.recv()).await {
        Ok(Some(RpcEvent::LatestBlocks(Ok(rows)))) => {
            println!(
                "latest blocks OK | count={} tip_height={:?}",
                rows.len(),
                rows.first().map(|r| r.height)
            );
            if let Some(row) = rows.first() {
                client.spawn_block_detail(Some(row.height.to_string()), tx.clone());
                match timeout(Duration::from_secs(20), rx.recv()).await {
                    Ok(Some(RpcEvent::BlockDetail { block, transfers })) => {
                        println!(
                            "block detail OK | block={} transfers={}",
                            block.is_ok(),
                            transfers
                                .as_ref()
                                .ok()
                                .and_then(|v| v.get("transfers").and_then(|t| t.as_array()))
                                .map(|a| a.len())
                                .unwrap_or(0)
                        );
                        if let Ok(b) = &block {
                            if let Ok(parsed) = casper_sdk_tui::block_view::block_row_from_value(b)
                            {
                                println!(
                                    "  parsed height={} txs={}",
                                    parsed.height,
                                    parsed.tx_hashes.len()
                                );
                                if let Some(hash) = parsed.tx_hashes.first() {
                                    client.spawn_transaction(hash.clone(), tx.clone());
                                    match timeout(Duration::from_secs(20), rx.recv()).await {
                                        Ok(Some(RpcEvent::Transaction(Ok(_)))) => {
                                            println!(
                                                "transaction OK | hash={}",
                                                &hash[..16.min(hash.len())]
                                            );
                                        }
                                        Ok(Some(RpcEvent::Transaction(Err(err)))) => {
                                            println!(
                                                "transaction soft-fail (ok if empty chain): {err}"
                                            );
                                        }
                                        other => anyhow::bail!("tx unexpected: {other:?}"),
                                    }
                                }
                            }
                        }
                    }
                    other => anyhow::bail!("block detail unexpected: {other:?}"),
                }
            }
        }
        other => anyhow::bail!("latest blocks unexpected: {other:?}"),
    }

    let account = std::env::var("CASPER_SMOKE_ACCOUNT").unwrap_or_else(|_| {
        // NCTL faucet (dev profile); override with CASPER_SMOKE_ACCOUNT when needed.
        "0107514b42acc9be064bca097321530af97d4bb7f9b965b45efbf73e474df2690f".into()
    });
    client.spawn_account_load(account.clone(), tx.clone());
    match timeout(Duration::from_secs(30), rx.recv()).await {
        Ok(Some(RpcEvent::Account(load))) => {
            let entity_ok = load.entity.is_ok();
            let balance_ok = load.balance.is_ok();
            let auction_ok = load.auction.is_ok();
            println!(
                "account OK | identity={} entity={} balance={} auction={}",
                &load.identity[..16.min(load.identity.len())],
                entity_ok,
                balance_ok,
                auction_ok
            );
            if let Err(err) = &load.entity {
                println!("  entity err: {err}");
            }
            if let Ok(entity) = &load.entity {
                if let Ok(overview) = casper_sdk_tui::account_view::parse_entity_overview(entity) {
                    println!(
                        "  entity kind={} hash={}",
                        overview.kind,
                        overview
                            .account_hash
                            .as_deref()
                            .unwrap_or("?")
                            .chars()
                            .take(40)
                            .collect::<String>()
                    );
                }
            }
            if let Ok(bal) = &load.balance {
                if let Some(motes) = bal.get("balance").and_then(|v| v.as_str()) {
                    println!("  balance motes={}", &motes[..motes.len().min(24)]);
                }
            }
            if !entity_ok || !balance_ok {
                anyhow::bail!("account load needs entity+balance");
            }
        }
        other => anyhow::bail!("account unexpected: {other:?}"),
    }

    // Validator pubkey: expect self-stake row from auction filter.
    let validator = std::env::var("CASPER_SMOKE_VALIDATOR").unwrap_or_else(|_| {
        "014a3339473ad5cfc87346e7a3d6ca7ca85997386c7a03520bb8549650f4c1de10".into()
    });
    client.spawn_account_load(validator.clone(), tx.clone());
    match timeout(Duration::from_secs(30), rx.recv()).await {
        Ok(Some(RpcEvent::Account(load))) => {
            if let Ok(auction) = &load.auction {
                let keys =
                    casper_sdk_tui::auction_view::AccountMatchKeys::from_identity(&validator);
                let (self_stake, dels, undels) =
                    casper_sdk_tui::auction_view::filter_account_stakes(auction, &keys);
                println!(
                    "validator stakes OK | self={} dels={} undels={}",
                    self_stake.is_some(),
                    dels.len(),
                    undels.len()
                );
                if self_stake.is_none() {
                    anyhow::bail!("expected validator self-stake in auction");
                }
            } else {
                anyhow::bail!("validator auction failed");
            }
        }
        other => anyhow::bail!("validator account unexpected: {other:?}"),
    }

    client.spawn_reward(validator, None, Some("62".into()), tx.clone());
    match timeout(Duration::from_secs(20), rx.recv()).await {
        Ok(Some(RpcEvent::Reward(Ok(v)))) => {
            println!(
                "reward OK | {}",
                serde_json::to_string(&v).unwrap_or_default()
            );
        }
        Ok(Some(RpcEvent::Reward(Err(err)))) => {
            println!("reward soft-fail (expected on young NCTL): {err}");
        }
        other => anyhow::bail!("reward unexpected: {other:?}"),
    }

    client.spawn_contract_load("auction".into(), tx.clone());
    let auction_key = match timeout(Duration::from_secs(30), rx.recv()).await {
        Ok(Some(RpcEvent::Contract(Ok(load)))) => {
            let overview =
                casper_sdk_tui::contract_view::parse_contract_overview(&load.key, &load.raw)
                    .map_err(|e| anyhow::anyhow!(e))?;
            println!(
                "contract OK | key={} kind={} entry_points={} named_keys={}",
                &load.key[..20.min(load.key.len())],
                overview.kind,
                overview.entry_points.len(),
                overview.named_keys.len()
            );
            if overview.entry_points.is_empty() {
                anyhow::bail!("expected auction entry points");
            }
            // Prefer a uref named key for dict soft-check later.
            let uref = overview
                .named_keys
                .iter()
                .find(|nk| nk.key.starts_with("uref-"))
                .map(|nk| nk.key.clone());
            (load.key, uref)
        }
        other => anyhow::bail!("contract unexpected: {other:?}"),
    };

    client.spawn_contract_query_key(auction_key.0.clone(), "era_id".into(), tx.clone());
    match timeout(Duration::from_secs(20), rx.recv()).await {
        Ok(Some(RpcEvent::ContractQuery(Ok(v)))) => {
            println!(
                "query_contract_key OK | {}",
                serde_json::to_string(&v)
                    .unwrap_or_default()
                    .chars()
                    .take(120)
                    .collect::<String>()
            );
        }
        Ok(Some(RpcEvent::ContractQuery(Err(err)))) => {
            anyhow::bail!("query_contract_key failed: {err}");
        }
        other => anyhow::bail!("query_contract_key unexpected: {other:?}"),
    }

    if let Some(uref) = auction_key.1 {
        client.spawn_contract_query_dict(uref, "0".into(), None, tx.clone());
        match timeout(Duration::from_secs(20), rx.recv()).await {
            Ok(Some(RpcEvent::ContractQuery(Ok(_)))) => {
                println!("query_contract_dict OK");
            }
            Ok(Some(RpcEvent::ContractQuery(Err(err)))) => {
                println!("query_contract_dict soft-fail (ok if not a dict uref): {err}");
            }
            other => anyhow::bail!("query_contract_dict unexpected: {other:?}"),
        }
    }

    let mut motes = HashMap::new();
    motes.insert("motes".into(), "2500000000".into());
    client.spawn_action("motes_to_cspr", motes, tx);
    match timeout(Duration::from_secs(5), rx.recv()).await {
        Ok(Some(RpcEvent::Action { result: Ok(v), .. })) => {
            println!("helper OK | {v}");
        }
        other => anyhow::bail!("helper unexpected: {other:?}"),
    }

    println!("smoke done (Network + Blocks/Txs + Accounts + Contracts paths)");
    Ok(())
}
