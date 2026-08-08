//! Thin async wrapper around `casper_rust_wasm_sdk::SDK`.

use casper_rust_wasm_sdk::helpers::{get_blake2b_hash, get_current_timestamp, motes_to_cspr};
use casper_rust_wasm_sdk::rpcs::get_dictionary_item::DictionaryItemInput;
use casper_rust_wasm_sdk::rpcs::query_global_state::{
    KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams,
};
use casper_rust_wasm_sdk::types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams;
use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
use casper_rust_wasm_sdk::types::identifier::block_identifier::BlockIdentifierInput;
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_rust_wasm_sdk::SDK;
use serde::Serialize;
use serde_json::{json, Value};
use std::collections::HashMap;
use tokio::sync::mpsc;

use crate::model::{AccountLoadResult, ContractLoadResult, RpcEvent};
use crate::network_data::build_snapshot;
use crate::policy::WritePolicy;
use crate::write_flow::{
    build_stake, build_transfer, one_shot_transfer, put_tx_json, sign_tx_json, OneShotTransfer,
    StakeBuild, TransferBuild, WriteKind, DEFAULT_PAYMENT_MOTES, DEFAULT_TRANSFER_MOTES,
};

/// Session context for write-gated Actions.
#[derive(Clone, Default)]
pub struct ActionWriteCtx {
    pub pem: Option<String>,
    pub public_key: String,
    pub chain_name: String,
    pub policy: WritePolicy,
}

/// Fields for an async write build job.
pub struct WriteBuildJob {
    pub kind: WriteKind,
    pub chain_name: String,
    pub initiator: String,
    pub target: String,
    pub amount: String,
    pub payment: String,
    pub validator: String,
    pub new_validator: String,
}

/// Owns connection settings; builds a fresh `SDK` per spawn.
#[derive(Clone)]
pub struct SdkClient {
    rpc_url: String,
    verbosity: Verbosity,
}

impl SdkClient {
    pub fn new(rpc_url: String, verbosity: Verbosity) -> Self {
        Self { rpc_url, verbosity }
    }

    pub fn rpc_url(&self) -> &str {
        &self.rpc_url
    }

    pub fn verbosity(&self) -> Verbosity {
        self.verbosity
    }

    pub fn set_rpc_url(&mut self, rpc_url: String) {
        self.rpc_url = rpc_url;
    }

    fn sdk_at(rpc_url: &str, verbosity: Verbosity) -> SDK {
        SDK::new(Some(rpc_url.to_string()), None, Some(verbosity))
    }

    /// Parallel Network refresh: status, peers, era, SRH, auction.
    pub fn spawn_network_refresh(&self, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let status_sdk = Self::sdk_at(&rpc, verbosity);
            let peers_sdk = Self::sdk_at(&rpc, verbosity);
            let era_sdk = Self::sdk_at(&rpc, verbosity);
            let srh_sdk = Self::sdk_at(&rpc, verbosity);
            let auction_sdk = Self::sdk_at(&rpc, verbosity);

            let (status, peers, era, srh, auction) = tokio::join!(
                status_sdk.get_node_status(None, None),
                peers_sdk.get_peers(None, None),
                era_sdk.get_era_summary(None, None, None),
                srh_sdk.get_state_root_hash(None, None, None),
                auction_sdk.get_auction_info(None, None, None),
            );

            let snap = build_snapshot(
                ok_json(status.map(|r| r.result)),
                ok_json(peers.map(|r| r.result)),
                ok_json(era.map(|r| r.result)),
                ok_json(srh.map(|r| r.result)),
                ok_json(auction.map(|r| r.result)),
            );
            let _ = tx.send(RpcEvent::Network(snap));
        });
    }

    /// Run a catalog action; helpers are sync, RPCs async.
    pub fn spawn_action(
        &self,
        method: &str,
        args: HashMap<String, String>,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        self.spawn_action_with_write(method, args, ActionWriteCtx::default(), tx);
    }

    /// Run a catalog action with optional session PEM / policy for write methods.
    pub fn spawn_action_with_write(
        &self,
        method: &str,
        args: HashMap<String, String>,
        write: ActionWriteCtx,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let method = method.to_string();
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = run_action(&method, &args, &rpc, verbosity, &write).await;
            let _ = tx.send(RpcEvent::Action { method, result });
        });
    }

    /// Build unsigned transfer / stake transaction for the Writes view.
    pub fn spawn_write_build(&self, job: WriteBuildJob, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = match job.kind {
                WriteKind::Transfer => build_transfer(TransferBuild {
                    rpc: &rpc,
                    verbosity,
                    chain_name: &job.chain_name,
                    initiator: &job.initiator,
                    target: &job.target,
                    amount: &job.amount,
                    payment: &job.payment,
                }),
                kind => build_stake(StakeBuild {
                    rpc: &rpc,
                    verbosity,
                    kind,
                    chain_name: &job.chain_name,
                    initiator: &job.initiator,
                    validator: &job.validator,
                    new_validator: if job.new_validator.is_empty() {
                        None
                    } else {
                        Some(job.new_validator.as_str())
                    },
                    amount: &job.amount,
                    payment: &job.payment,
                }),
            };
            let _ = tx.send(RpcEvent::WriteBuild(result));
        });
    }

    pub fn spawn_write_sign(
        &self,
        tx_json: Value,
        pem: String,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = sign_tx_json(&rpc, verbosity, &tx_json, &pem);
            let _ = tx.send(RpcEvent::WriteSign(result));
        });
    }

    pub fn spawn_write_put(&self, tx_json: Value, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = put_tx_json(&rpc, verbosity, &tx_json).await;
            let _ = tx.send(RpcEvent::WritePut(result));
        });
    }

    pub fn spawn_one_shot_transfer(
        &self,
        args: OneShotTransferOwned,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = one_shot_transfer(OneShotTransfer {
                rpc: &rpc,
                verbosity,
                chain_name: &args.chain_name,
                pem: &args.pem,
                public_key: &args.public_key,
                target: &args.target,
                amount: &args.amount,
                payment: &args.payment,
                policy: &args.policy,
            })
            .await;
            let _ = tx.send(RpcEvent::WritePut(result));
        });
    }

    /// SSE wait until transaction is processed (or timeout).
    pub fn spawn_wait_transaction(
        &self,
        events_url: String,
        transaction_hash: String,
        timeout_ms: Option<u64>,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let sdk = Self::sdk_at(&rpc, verbosity);
            let result = match sdk
                .wait_transaction(&events_url, &transaction_hash, timeout_ms)
                .await
            {
                Ok(parsed) => serde_json::to_value(&parsed).map_err(|e| e.to_string()),
                Err(err) => Err(err),
            };
            let _ = tx.send(RpcEvent::WaitDone(result));
        });
    }

    /// Bounded SSE collect of selected event names.
    pub fn spawn_sse_collect(
        &self,
        events_url: String,
        event_names: Vec<String>,
        max_events: usize,
        timeout_ms: u64,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        tokio::spawn(async move {
            use casper_rust_wasm_sdk::SSE::{EventName, SSEClient};
            let names: Result<Vec<EventName>, String> =
                event_names.iter().map(|s| parse_event_name(s)).collect();
            let result = match names {
                Ok(names) if names.is_empty() => Err("select at least one event name".into()),
                Ok(names) => {
                    let client = SSEClient::new(events_url);
                    match client.collect(&names, max_events, timeout_ms, None).await {
                        Ok(events) => serde_json::to_value(&events).map_err(|e| e.to_string()),
                        Err(err) => Err(err),
                    }
                }
                Err(err) => Err(err),
            };
            let _ = tx.send(RpcEvent::SseCollect(result));
        });
    }

    /// Walk tip height down for `count` blocks.
    pub fn spawn_latest_blocks(&self, count: u32, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = fetch_latest_blocks(&rpc, verbosity, count).await;
            let _ = tx.send(RpcEvent::LatestBlocks(result));
        });
    }

    /// Fetch one block + its transfers in parallel.
    pub fn spawn_block_detail(
        &self,
        block_identifier: Option<String>,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let id = block_identifier
                .as_ref()
                .map(|s| s.trim().to_string())
                .filter(|s| !s.is_empty())
                .map(BlockIdentifierInput::String);
            let block_sdk = Self::sdk_at(&rpc, verbosity);
            let xfer_sdk = Self::sdk_at(&rpc, verbosity);
            let (block, transfers) = tokio::join!(
                block_sdk.get_block(id.clone(), None, None),
                xfer_sdk.get_block_transfers(id, None, None),
            );
            let _ = tx.send(RpcEvent::BlockDetail {
                block: ok_json(block.map(|r| r.result)),
                transfers: ok_json(transfers.map(|r| r.result)),
            });
        });
    }

    pub fn spawn_transaction(&self, hash: String, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = async {
                let sdk = SdkClient::sdk_at(&rpc, verbosity);
                let th = TransactionHash::new(&hash).map_err(|e| e.to_string())?;
                ok_json(
                    sdk.get_transaction(th, None, None, None)
                        .await
                        .map(|r| r.result),
                )
            }
            .await;
            let _ = tx.send(RpcEvent::Transaction(result));
        });
    }

    /// Entity (or legacy account) + balances + auction for Accounts.
    ///
    /// Prefers `get_entity` (AE on). On AE-off / missing entity, falls back to
    /// `get_account` and normalizes into the same overview JSON. Balance queries
    /// use `main_purse` when present, else the identity string.
    pub fn spawn_account_load(&self, identity: String, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let id = identity.trim().to_string();
            let entity = fetch_entity_value(&rpc, verbosity, id.clone()).await;
            let purse = entity
                .as_ref()
                .ok()
                .and_then(|v| crate::account_view::parse_entity_overview(v).ok())
                .and_then(|o| o.main_purse)
                .unwrap_or_else(|| id.clone());

            let bal_sdk = Self::sdk_at(&rpc, verbosity);
            let details_sdk = Self::sdk_at(&rpc, verbosity);
            let auction_sdk = Self::sdk_at(&rpc, verbosity);
            let (balance, balance_details, auction) = tokio::join!(
                bal_sdk.query_balance(None, Some(purse.clone()), None, None, None, None, None),
                details_sdk.query_balance_details(None, Some(purse), None, None, None, None, None),
                auction_sdk.get_auction_info(None, None, None),
            );

            let _ = tx.send(RpcEvent::Account(AccountLoadResult {
                identity: id,
                entity,
                balance: ok_json(balance.map(|r| r.result)),
                balance_details: ok_json(balance_details.map(|r| r.result)),
                auction: ok_json(auction.map(|r| r.result)),
            }));
        });
    }

    /// Load `get_auction_info` for Validators / Bidders screens.
    pub fn spawn_auction_info(&self, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let sdk = Self::sdk_at(&rpc, verbosity);
            let result = ok_json(
                sdk.get_auction_info(None, None, None)
                    .await
                    .map(|r| r.result),
            );
            let _ = tx.send(RpcEvent::ValidatorsAuction(result));
        });
    }

    /// Era reward lookup (`info_get_reward`).
    pub fn spawn_reward(
        &self,
        validator: String,
        delegator: Option<String>,
        era_id: Option<String>,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = async {
                let sdk = SdkClient::sdk_at(&rpc, verbosity);
                let del = delegator
                    .as_deref()
                    .map(str::trim)
                    .filter(|s| !s.is_empty());
                let era = era_id.as_deref().map(str::trim).filter(|s| !s.is_empty());
                ok_json(
                    sdk.get_reward_as_string(&validator, del, era, None, None)
                        .await
                        .map(|r| r.result),
                )
            }
            .await;
            let _ = tx.send(RpcEvent::Reward(result));
        });
    }

    /// Load a contract / package via `query_global_state` (resolves system shortcuts).
    pub fn spawn_contract_load(&self, raw_key: String, tx: mpsc::UnboundedSender<RpcEvent>) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = fetch_contract(&rpc, verbosity, raw_key).await;
            let _ = tx.send(RpcEvent::Contract(result));
        });
    }

    /// `query_contract_key` for a named path under the loaded entity/hash.
    pub fn spawn_contract_query_key(
        &self,
        entity: String,
        path: String,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = async {
                let sdk = SdkClient::sdk_at(&rpc, verbosity);
                let path = PathIdentifierInput::String(path);
                ok_json(
                    sdk.query_contract_key(None, Some(entity), path, None, None, None)
                        .await
                        .map(|r| r.result),
                )
            }
            .await;
            let _ = tx.send(RpcEvent::ContractQuery(result));
        });
    }

    /// `query_contract_dict` via uref seed + item key.
    pub fn spawn_contract_query_dict(
        &self,
        seed_uref: String,
        item_key: String,
        state_root_hash: Option<String>,
        tx: mpsc::UnboundedSender<RpcEvent>,
    ) {
        let rpc = self.rpc_url.clone();
        let verbosity = self.verbosity;
        tokio::spawn(async move {
            let result = async {
                let sdk = SdkClient::sdk_at(&rpc, verbosity);
                let mut params = DictionaryItemStrParams::new();
                params.set_uref(&seed_uref, &item_key);
                let input = DictionaryItemInput::Params(Box::new(params));
                ok_json(
                    sdk.query_contract_dict(input, state_root_hash.as_deref(), None, None)
                        .await
                        .map(|r| r.result),
                )
            }
            .await;
            let _ = tx.send(RpcEvent::ContractQuery(result));
        });
    }
}

async fn fetch_contract(
    rpc: &str,
    verbosity: Verbosity,
    raw_key: String,
) -> Result<ContractLoadResult, String> {
    use crate::contract_view::{
        is_system_shortcut, normalize_contract_key, system_contract_hash_from_registry,
        system_entity_registry_key,
    };

    let normalized = normalize_contract_key(&raw_key);
    if normalized.is_empty() {
        return Err("empty contract key".into());
    }

    let key = if is_system_shortcut(&normalized) {
        let sdk = SdkClient::sdk_at(rpc, verbosity);
        let registry = sdk
            .query_global_state(QueryGlobalStateParams {
                key: KeyIdentifierInput::String(system_entity_registry_key().to_string()),
                path: None,
                maybe_global_state_identifier: None,
                state_root_hash: None,
                maybe_block_id: None,
                rpc_address: None,
                verbosity: None,
            })
            .await
            .map_err(|e| e.to_string())?;
        let reg_json = serde_json::to_value(&registry.result).map_err(|e| e.to_string())?;
        system_contract_hash_from_registry(&reg_json, &normalized)
            .ok_or_else(|| format!("system contract `{normalized}` not found in entity registry"))?
    } else {
        normalized
    };

    let sdk = SdkClient::sdk_at(rpc, verbosity);
    let resp = sdk
        .query_global_state(QueryGlobalStateParams {
            key: KeyIdentifierInput::String(key.clone()),
            path: None,
            maybe_global_state_identifier: None,
            state_root_hash: None,
            maybe_block_id: None,
            rpc_address: None,
            verbosity: None,
        })
        .await
        .map_err(|e| e.to_string())?;
    let raw = serde_json::to_value(&resp.result).map_err(|e| e.to_string())?;
    Ok(ContractLoadResult { key, raw })
}

async fn fetch_latest_blocks(
    rpc: &str,
    verbosity: Verbosity,
    count: u32,
) -> Result<Vec<crate::block_view::BlockRow>, String> {
    let count = count.clamp(1, 50) as usize;
    let sdk = SdkClient::sdk_at(rpc, verbosity);
    let status = sdk
        .get_node_status(None, None)
        .await
        .map_err(|e| e.to_string())?;
    let tip = serde_json::to_value(&status.result)
        .ok()
        .and_then(|v| {
            v.pointer("/last_added_block_info/height")
                .or_else(|| v.pointer("/lastAddedBlockInfo/height"))
                .and_then(|h| h.as_u64())
        })
        .ok_or_else(|| "could not read tip height from get_node_status".to_string())?;

    let mut rows = Vec::with_capacity(count);
    for i in 0..count {
        let height = match tip.checked_sub(i as u64) {
            Some(h) => h,
            None => break,
        };
        let sdk = SdkClient::sdk_at(rpc, verbosity);
        let id = Some(BlockIdentifierInput::String(height.to_string()));
        match sdk.get_block(id, None, None).await {
            Ok(resp) => match serde_json::to_value(&resp.result) {
                Ok(value) => match crate::block_view::block_row_from_value(&value) {
                    Ok(row) => rows.push(row),
                    Err(err) => return Err(format!("height {height}: {err}")),
                },
                Err(err) => return Err(format!("height {height}: {err}")),
            },
            Err(err) => return Err(format!("height {height}: {err}")),
        }
    }
    Ok(rows)
}

fn ok_json<T: Serialize, E: std::fmt::Display>(result: Result<T, E>) -> Result<Value, String> {
    match result {
        Ok(value) => serde_json::to_value(&value).map_err(|e| e.to_string()),
        Err(err) => Err(err.to_string()),
    }
}

/// Load account overview JSON for Accounts (AE on and AE off).
///
/// 1. Prefer `get_entity` (SDK default when addressable entities are enabled).
/// 2. If the typed decode fails but the node returned a result body, recover it
///    (legacy `Account` vs `LegacyAccount` mismatch).
/// 3. If the RPC errors (typical AE-off: "No such addressable entity"), fall
///    back to deprecated `get_account` and wrap as `{ entity: { Account: … } }`
///    so `parse_entity_overview` stays one path.
async fn fetch_entity_value(rpc: &str, verbosity: Verbosity, id: String) -> Result<Value, String> {
    let sdk = SdkClient::sdk_at(rpc, verbosity);
    match sdk
        .get_entity(None, Some(id.clone()), None, None, None)
        .await
    {
        Ok(resp) => serde_json::to_value(&resp.result).map_err(|e| e.to_string()),
        Err(err) => {
            let err_text = err.to_string();
            if let Some(recovered) = recover_entity_result_from_error(&err_text) {
                return Ok(recovered);
            }
            match fetch_account_as_entity(rpc, verbosity, id).await {
                Ok(value) => Ok(value),
                Err(account_err) => Err(format!(
                    "get_entity failed ({err_text}); get_account fallback failed ({account_err})"
                )),
            }
        }
    }
}

#[allow(deprecated)]
async fn fetch_account_as_entity(
    rpc: &str,
    verbosity: Verbosity,
    id: String,
) -> Result<Value, String> {
    let sdk = SdkClient::sdk_at(rpc, verbosity);
    let resp = sdk
        .get_account(None, Some(id), None, None, None)
        .await
        .map_err(|e| e.to_string())?;
    let value = serde_json::to_value(&resp.result).map_err(|e| e.to_string())?;
    let account = value
        .get("account")
        .cloned()
        .ok_or_else(|| "get_account result missing `account`".to_string())?;
    Ok(json!({ "entity": { "Account": account } }))
}

fn recover_entity_result_from_error(err: &str) -> Option<Value> {
    // SdkError embeds the raw JSON-RPC body after the typed decode failure.
    let idx = err.find("{\"jsonrpc\"")?;
    let envelope: Value = serde_json::from_str(&err[idx..]).ok()?;
    let result = envelope.get("result")?.clone();
    if result.get("entity").is_some() {
        Some(result)
    } else {
        None
    }
}

/// Owned args for one-shot transfer spawn (lives across await).
pub struct OneShotTransferOwned {
    pub chain_name: String,
    pub pem: String,
    pub public_key: String,
    pub target: String,
    pub amount: String,
    pub payment: String,
    pub policy: WritePolicy,
}

async fn run_action(
    method: &str,
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    match method {
        "motes_to_cspr" => {
            let motes = required(args, "motes")?;
            let cspr = motes_to_cspr(&motes).map_err(|e| e.to_string())?;
            Ok(json!({ "motes": motes, "cspr": cspr }))
        }
        "get_blake2b_hash" => {
            let meta = required(args, "meta_data")?;
            Ok(json!({ "hash": get_blake2b_hash(&meta) }))
        }
        "get_current_timestamp" => {
            let ts = args.get("timestamp").cloned().filter(|s| !s.is_empty());
            Ok(json!({ "timestamp": get_current_timestamp(ts) }))
        }
        "get_node_status" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            ok_json(sdk.get_node_status(None, None).await.map(|r| r.result))
        }
        "get_peers" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            ok_json(sdk.get_peers(None, None).await.map(|r| r.result))
        }
        "get_chainspec" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            ok_json(sdk.get_chainspec(None, None).await.map(|r| r.result))
        }
        "list_rpcs" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            ok_json(sdk.list_rpcs(None, None).await.map(|r| r.result))
        }
        "get_block" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let id = optional_block_id(args);
            ok_json(sdk.get_block(id, None, None).await.map(|r| r.result))
        }
        "get_era_summary" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let id = optional_block_id(args);
            ok_json(sdk.get_era_summary(id, None, None).await.map(|r| r.result))
        }
        "get_auction_info" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let id = optional_block_id(args);
            ok_json(sdk.get_auction_info(id, None, None).await.map(|r| r.result))
        }
        "get_entity" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let entity = required(args, "entity_identifier")?;
            ok_json(
                sdk.get_entity(None, Some(entity), None, None, None)
                    .await
                    .map(|r| r.result),
            )
        }
        "query_balance" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let purse = required(args, "purse_identifier")?;
            ok_json(
                sdk.query_balance(None, Some(purse), None, None, None, None, None)
                    .await
                    .map(|r| r.result),
            )
        }
        "get_transaction" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let hash_str = required(args, "transaction_hash")?;
            let hash = TransactionHash::new(&hash_str).map_err(|e| e.to_string())?;
            ok_json(
                sdk.get_transaction(hash, None, None, None)
                    .await
                    .map(|r| r.result),
            )
        }
        "query_global_state" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let key = required(args, "key")?;
            let path = args
                .get("path")
                .map(|s| s.trim().to_string())
                .filter(|s| !s.is_empty())
                .map(PathIdentifierInput::String);
            ok_json(
                sdk.query_global_state(QueryGlobalStateParams {
                    key: KeyIdentifierInput::String(key),
                    path,
                    maybe_global_state_identifier: None,
                    state_root_hash: None,
                    maybe_block_id: None,
                    rpc_address: None,
                    verbosity: None,
                })
                .await
                .map(|r| r.result),
            )
        }
        "query_contract_key" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let entity = required(args, "entity_identifier")?;
            let path = required(args, "path")?;
            ok_json(
                sdk.query_contract_key(
                    None,
                    Some(entity),
                    PathIdentifierInput::String(path),
                    None,
                    None,
                    None,
                )
                .await
                .map(|r| r.result),
            )
        }
        "query_contract_dict" => {
            let sdk = SdkClient::sdk_at(rpc, verbosity);
            let seed = required(args, "seed_uref")?;
            let item = required(args, "dictionary_item_key")?;
            let srh = args
                .get("state_root_hash")
                .map(|s| s.trim().to_string())
                .filter(|s| !s.is_empty());
            let mut params = DictionaryItemStrParams::new();
            params.set_uref(&seed, &item);
            let input = DictionaryItemInput::Params(Box::new(params));
            ok_json(
                sdk.query_contract_dict(input, srh.as_deref(), None, None)
                    .await
                    .map(|r| r.result),
            )
        }
        "make_transfer_transaction" => run_make_transfer(args, rpc, verbosity, write),
        "make_transaction" => run_make_stake(args, rpc, verbosity, write),
        "sign_transaction" => run_sign_action(args, rpc, verbosity, write),
        "put_transaction" => run_put_action(args, rpc, verbosity, write).await,
        "transfer_transaction" => run_transfer_action(args, rpc, verbosity, write).await,
        "install" | "call_entrypoint" => Err(format!(
            "`{method}` needs a loaded PEM; transfer/stake live on Writes (8), install/call forms still WIP"
        )),
        other => Err(format!(
            "unknown action `{other}` · the catalog is confused"
        )),
    }
}

fn run_make_transfer(
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    let target = required(args, "target")?;
    let amount = optional_or(args, "amount", DEFAULT_TRANSFER_MOTES);
    let payment = optional_or(args, "payment_amount", DEFAULT_PAYMENT_MOTES);
    let chain_name = optional_or(args, "chain_name", &write.chain_name);
    let initiator = args
        .get("initiator")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| write.public_key.clone());
    if initiator.is_empty() {
        return Err("initiator missing | load a PEM (o) or pass initiator".into());
    }
    build_transfer(TransferBuild {
        rpc,
        verbosity,
        chain_name: &chain_name,
        initiator: &initiator,
        target: &target,
        amount: &amount,
        payment: &payment,
    })
}

fn run_make_stake(
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    let kind_raw = required(args, "kind")?;
    let kind = match kind_raw.trim().to_ascii_lowercase().as_str() {
        "delegate" => WriteKind::Delegate,
        "undelegate" => WriteKind::Undelegate,
        "redelegate" => WriteKind::Redelegate,
        other => {
            return Err(format!(
                "unknown kind `{other}` (delegate|undelegate|redelegate)"
            ))
        }
    };
    let validator = required(args, "validator")?;
    let amount = required(args, "amount")?;
    let payment = optional_or(args, "payment_amount", DEFAULT_PAYMENT_MOTES);
    let chain_name = optional_or(args, "chain_name", &write.chain_name);
    let initiator = args
        .get("initiator")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| write.public_key.clone());
    if initiator.is_empty() {
        return Err("initiator missing | load a PEM (o) or pass initiator".into());
    }
    let new_validator = args
        .get("new_validator")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty());
    build_stake(StakeBuild {
        rpc,
        verbosity,
        kind,
        chain_name: &chain_name,
        initiator: &initiator,
        validator: &validator,
        new_validator: new_validator.as_deref(),
        amount: &amount,
        payment: &payment,
    })
}

fn run_sign_action(
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    let pem = write
        .pem
        .as_deref()
        .filter(|s| !s.trim().is_empty())
        .ok_or_else(|| "secret_key is missing | press o to load a PEM".to_string())?;
    let raw = required(args, "transaction_json")?;
    let tx_json: Value =
        serde_json::from_str(&raw).map_err(|e| format!("transaction_json: {e}"))?;
    sign_tx_json(rpc, verbosity, &tx_json, pem)
}

async fn run_put_action(
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    write.policy.check_put_generic("put_transaction")?;
    let raw = required(args, "transaction_json")?;
    let tx_json: Value =
        serde_json::from_str(&raw).map_err(|e| format!("transaction_json: {e}"))?;
    put_tx_json(rpc, verbosity, &tx_json).await
}

async fn run_transfer_action(
    args: &HashMap<String, String>,
    rpc: &str,
    verbosity: Verbosity,
    write: &ActionWriteCtx,
) -> Result<Value, String> {
    let pem = write
        .pem
        .as_deref()
        .filter(|s| !s.trim().is_empty())
        .ok_or_else(|| "secret_key is missing | press o to load a PEM".to_string())?;
    if write.public_key.is_empty() {
        return Err("public key missing | reload PEM".into());
    }
    let target = required(args, "target")?;
    let amount = required(args, "amount")?;
    let payment = optional_or(args, "payment_amount", DEFAULT_PAYMENT_MOTES);
    let chain_name = optional_or(args, "chain_name", &write.chain_name);
    one_shot_transfer(OneShotTransfer {
        rpc,
        verbosity,
        chain_name: &chain_name,
        pem,
        public_key: &write.public_key,
        target: &target,
        amount: &amount,
        payment: &payment,
        policy: &write.policy,
    })
    .await
}

fn optional_or(args: &HashMap<String, String>, name: &str, default: &str) -> String {
    args.get(name)
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| default.to_string())
}

fn required(args: &HashMap<String, String>, name: &str) -> Result<String, String> {
    args.get(name)
        .cloned()
        .filter(|s| !s.trim().is_empty())
        .ok_or_else(|| format!("missing required arg `{name}`"))
}

fn optional_block_id(args: &HashMap<String, String>) -> Option<BlockIdentifierInput> {
    args.get("block_identifier")
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .map(BlockIdentifierInput::String)
}

fn parse_event_name(name: &str) -> Result<casper_rust_wasm_sdk::SSE::EventName, String> {
    casper_rust_wasm_sdk::SSE::EventName::parse(name.trim())
        .ok_or_else(|| format!("unknown event name: {name}"))
}
