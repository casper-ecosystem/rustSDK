//! Auction composition: normalize get_auction_info for Validators / Bidders.

use mcpkit::prelude::ToolOutput;
use serde::Serialize;
use serde_json::{json, Value};

use crate::format;
use crate::sdk_handle;

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_list_validators",
        "sdk_get_validator",
        "sdk_list_bidders",
    ]
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

#[derive(Debug, Clone, Serialize)]
struct ValidatorRow {
    public_key: String,
    staked_amount: String,
    total_stake: String,
    bonding_purse: String,
    delegation_rate: Option<u64>,
    inactive: bool,
    delegator_count: usize,
}

#[derive(Debug, Clone, Serialize)]
struct DelegationRow {
    validator_public_key: String,
    delegator_public_key: String,
    staked_amount: String,
    bonding_purse: String,
}

#[derive(Debug, Clone, Serialize)]
struct ValidatorDetail {
    validator: ValidatorRow,
    delegators: Vec<DelegationRow>,
}

/// Active validators (`inactive == false`), sorted by total stake descending.
pub async fn list_validators(verbosity: Option<String>, rpc_address: Option<String>) -> ToolOutput {
    match fetch_auction(verbosity, rpc_address).await {
        Ok(auction) => {
            let rows: Vec<ValidatorRow> = list_bidders_rows(&auction)
                .into_iter()
                .filter(|r| !r.inactive)
                .collect();
            format::json_ok(&json!({ "count": rows.len(), "validators": rows }))
        }
        Err(err) => format::err(err),
    }
}

/// All auction bids, sorted by total stake descending.
pub async fn list_bidders(verbosity: Option<String>, rpc_address: Option<String>) -> ToolOutput {
    match fetch_auction(verbosity, rpc_address).await {
        Ok(auction) => {
            let rows = list_bidders_rows(&auction);
            format::json_ok(&json!({ "count": rows.len(), "bidders": rows }))
        }
        Err(err) => format::err(err),
    }
}

/// One validator bid + delegators by public key.
pub async fn get_validator(
    public_key: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let want = public_key.trim().to_ascii_lowercase();
    if want.is_empty() {
        return format::err("public_key is required");
    }
    match fetch_auction(verbosity, rpc_address).await {
        Ok(auction) => match get_validator_detail(&auction, &want) {
            Some(detail) => match serde_json::to_value(&detail) {
                Ok(v) => format::json_ok(&v),
                Err(err) => format::err(err),
            },
            None => format::err(format!("no bid for public_key {public_key}")),
        },
        Err(err) => format::err(err),
    }
}

async fn fetch_auction(
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> Result<Value, String> {
    let sdk = sdk_handle::sdk_snapshot();
    let resp = sdk
        .get_auction_info(None, verb(verbosity.as_deref()), rpc_address)
        .await
        .map_err(|e| e.to_string())?;
    serde_json::to_value(&resp.result).map_err(|e| e.to_string())
}

fn list_bidders_rows(auction: &Value) -> Vec<ValidatorRow> {
    let mut rows: Vec<ValidatorRow> = bids_array(auction)
        .iter()
        .filter_map(parse_validator_row)
        .collect();
    rows.sort_by(|a, b| {
        let ta = a.total_stake.parse::<u128>().unwrap_or(0);
        let tb = b.total_stake.parse::<u128>().unwrap_or(0);
        tb.cmp(&ta).then_with(|| a.public_key.cmp(&b.public_key))
    });
    rows
}

fn get_validator_detail(auction: &Value, want_lower: &str) -> Option<ValidatorDetail> {
    for bid_entry in bids_array(auction) {
        let pk = bid_public_key(bid_entry);
        if pk.to_ascii_lowercase() != want_lower {
            continue;
        }
        let row = parse_validator_row(bid_entry)?;
        let bid = bid_entry.get("bid").unwrap_or(bid_entry);
        let mut delegators = Vec::new();
        if let Some(dels) = bid.get("delegators").and_then(|d| d.as_array()) {
            for del_entry in dels {
                let (del_pk, del_body) = delegator_parts(del_entry);
                delegators.push(DelegationRow {
                    validator_public_key: pk.clone(),
                    delegator_public_key: del_pk,
                    staked_amount: json_str(del_body.get("staked_amount")),
                    bonding_purse: json_str(del_body.get("bonding_purse")),
                });
            }
        }
        return Some(ValidatorDetail {
            validator: row,
            delegators,
        });
    }
    None
}

fn parse_validator_row(bid_entry: &Value) -> Option<ValidatorRow> {
    let public_key = bid_public_key(bid_entry);
    if public_key.is_empty() {
        return None;
    }
    let bid = bid_entry.get("bid").unwrap_or(bid_entry);
    Some(ValidatorRow {
        public_key,
        staked_amount: json_str(bid.get("staked_amount")),
        total_stake: bid_entry_total_stake(bid_entry).to_string(),
        bonding_purse: json_str(bid.get("bonding_purse")),
        delegation_rate: bid.get("delegation_rate").and_then(|v| v.as_u64()),
        inactive: bid
            .get("inactive")
            .and_then(|v| v.as_bool())
            .unwrap_or(false),
        delegator_count: bid
            .get("delegators")
            .and_then(|d| d.as_array())
            .map(|a| a.len())
            .unwrap_or(0),
    })
}

fn bid_public_key(bid_entry: &Value) -> String {
    json_str(
        bid_entry
            .get("public_key")
            .or_else(|| bid_entry.pointer("/bid/validator_public_key")),
    )
}

fn bid_entry_total_stake(entry: &Value) -> u128 {
    let bid = entry.get("bid").unwrap_or(entry);
    let mut sum = parse_u128(bid.get("staked_amount"));
    if let Some(dels) = bid.get("delegators").and_then(|d| d.as_array()) {
        for d in dels {
            let inner = d.get("delegator").unwrap_or(d);
            sum = sum.saturating_add(parse_u128(inner.get("staked_amount")));
        }
    }
    sum
}

fn bids_array(auction: &Value) -> &[Value] {
    auction
        .pointer("/auction_state/bids")
        .or_else(|| auction.get("bids"))
        .and_then(|b| b.as_array())
        .map(|a| a.as_slice())
        .unwrap_or(&[])
}

fn delegator_parts(entry: &Value) -> (String, &Value) {
    if let Some(inner) = entry.get("delegator") {
        let pk = json_str(
            entry
                .get("delegator_public_key")
                .filter(|v| !json_str(Some(v)).is_empty())
                .or_else(|| inner.get("delegator_public_key")),
        );
        (pk, inner)
    } else {
        let pk = json_str(entry.get("delegator_public_key"));
        (pk, entry)
    }
}

fn json_str(v: Option<&Value>) -> String {
    match v {
        Some(Value::String(s)) => s.clone(),
        Some(Value::Number(n)) => n.to_string(),
        Some(other) => other.to_string(),
        None => String::new(),
    }
}

fn parse_u128(v: Option<&Value>) -> u128 {
    match v {
        Some(Value::String(s)) => s.parse().unwrap_or(0),
        Some(Value::Number(n)) => n.as_u64().unwrap_or(0) as u128,
        _ => 0,
    }
}
