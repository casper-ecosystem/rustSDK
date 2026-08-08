//! Network summary parsing from parallel RPC payloads.

use serde_json::Value;
use std::fmt::Write as _;

/// Friendly Network table after a multi-RPC refresh.
#[derive(Debug, Clone, Default)]
pub struct NetworkSnapshot {
    pub chainspec: String,
    pub api_version: String,
    pub build_version: String,
    pub peers: u64,
    pub height: Option<u64>,
    pub era: Option<u64>,
    pub state_root_hash: String,
    pub total_stake_motes: Option<String>,
    pub bidder_count: Option<usize>,
    pub partial_errors: Vec<String>,
}

impl NetworkSnapshot {
    pub fn render_table(&self) -> String {
        let mut out = String::new();
        let _ = writeln!(
            out,
            "+------------------+--------------------------------------------+"
        );
        let _ = writeln!(
            out,
            "| Field            | Value                                      |"
        );
        let _ = writeln!(
            out,
            "+------------------+--------------------------------------------+"
        );
        row(&mut out, "Chainspec", &self.chainspec);
        row(&mut out, "API", &self.api_version);
        row(&mut out, "Build", &self.build_version);
        row(&mut out, "Peers", &self.peers.to_string());
        row(
            &mut out,
            "Height",
            &self
                .height
                .map(|h| h.to_string())
                .unwrap_or_else(|| "?".into()),
        );
        row(
            &mut out,
            "Era",
            &self
                .era
                .map(|e| e.to_string())
                .unwrap_or_else(|| "?".into()),
        );
        row(&mut out, "State root", &truncate(&self.state_root_hash, 40));
        let stake = match &self.total_stake_motes {
            Some(s) => format_stake(s),
            None => "? (auction still shy)".into(),
        };
        row(&mut out, "Total stake", &stake);
        if let Some(n) = self.bidder_count {
            row(&mut out, "Bidders", &n.to_string());
        }
        let _ = writeln!(
            out,
            "+------------------+--------------------------------------------+"
        );
        if !self.partial_errors.is_empty() {
            let _ = writeln!(out);
            let _ = writeln!(
                out,
                "Side quests that flopped (partial refresh is still a win):"
            );
            for err in &self.partial_errors {
                let _ = writeln!(out, "  - {err}");
            }
        }
        let _ = writeln!(out);
        let _ = writeln!(
            out,
            "r refresh | e edit RPC | 7 Actions for deeper hauntings"
        );
        let _ = writeln!(
            out,
            "(ASCII table on purpose: select+copy works; mouse capture is off.)"
        );
        out
    }
}

fn row(out: &mut String, key: &str, value: &str) {
    let _ = writeln!(out, "| {key:<16} | {value:<42} |");
}

fn truncate(s: &str, max: usize) -> String {
    if s.len() <= max {
        s.to_string()
    } else {
        format!("{}...", &s[..max.saturating_sub(3)])
    }
}

fn format_stake(motes: &str) -> String {
    // Show motes + rough CSPR (9 decimals) when parseable.
    if let Ok(n) = motes.parse::<u128>() {
        let cspr = n / 1_000_000_000;
        format!("{motes} motes (~{cspr} CSPR)")
    } else {
        format!("{motes} motes")
    }
}

pub fn build_snapshot(
    status: Result<Value, String>,
    peers: Result<Value, String>,
    era: Result<Value, String>,
    srh: Result<Value, String>,
    auction: Result<Value, String>,
) -> NetworkSnapshot {
    let mut snap = NetworkSnapshot::default();
    let mut errs = Vec::new();

    match status {
        Ok(v) => {
            snap.chainspec =
                str_field(&v, &["chainspec_name", "chainspecName"]).unwrap_or_else(|| "?".into());
            snap.api_version =
                str_field(&v, &["api_version", "apiVersion"]).unwrap_or_else(|| "?".into());
            snap.build_version =
                str_field(&v, &["build_version", "buildVersion"]).unwrap_or_else(|| "?".into());
            snap.height = u64_pointer(
                &v,
                &[
                    "/last_added_block_info/height",
                    "/lastAddedBlockInfo/height",
                ],
            );
            snap.era = u64_pointer(
                &v,
                &[
                    "/last_added_block_info/era_id",
                    "/lastAddedBlockInfo/era_id",
                ],
            );
            if let Some(p) = v.get("peers").and_then(|p| p.as_array()) {
                snap.peers = p.len() as u64;
            }
        }
        Err(e) => errs.push(format!("get_node_status: {e}")),
    }

    match peers {
        Ok(v) => {
            if let Some(p) = v.get("peers").and_then(|p| p.as_array()) {
                snap.peers = p.len() as u64;
            }
        }
        Err(e) => errs.push(format!("get_peers: {e}")),
    }

    match era {
        Ok(v) => {
            if let Some(e) = u64_pointer(&v, &["/era_summary/era_id", "/eraSummary/era_id"]) {
                snap.era = Some(e);
            }
            if snap.state_root_hash.is_empty() {
                if let Some(h) = str_pointer(
                    &v,
                    &["/era_summary/state_root_hash", "/eraSummary/stateRootHash"],
                ) {
                    snap.state_root_hash = h;
                }
            }
        }
        Err(e) => errs.push(format!("get_era_summary: {e}")),
    }

    match srh {
        Ok(v) => {
            if let Some(h) = str_field(&v, &["state_root_hash", "stateRootHash"]) {
                snap.state_root_hash = h;
            }
        }
        Err(e) => errs.push(format!("get_state_root_hash: {e}")),
    }

    match auction {
        Ok(v) => match total_stake_from_auction(&v) {
            Ok((total, count)) => {
                snap.total_stake_motes = Some(total);
                snap.bidder_count = Some(count);
                if snap.state_root_hash.is_empty() {
                    if let Some(h) = str_pointer(
                        &v,
                        &[
                            "/auction_state/state_root_hash",
                            "/auctionState/stateRootHash",
                        ],
                    ) {
                        snap.state_root_hash = h;
                    }
                }
            }
            Err(e) => errs.push(format!("auction parse: {e}")),
        },
        Err(e) => errs.push(format!("get_auction_info: {e}")),
    }

    if snap.state_root_hash.is_empty() {
        snap.state_root_hash = "?".into();
    }
    snap.partial_errors = errs;
    snap
}

fn total_stake_from_auction(v: &Value) -> Result<(String, usize), String> {
    let bids = v
        .pointer("/auction_state/bids")
        .or_else(|| v.pointer("/auctionState/bids"))
        .and_then(|b| b.as_array())
        .ok_or_else(|| "no bids array".to_string())?;

    let mut total: u128 = 0;
    for entry in bids {
        total = total.saturating_add(bid_entry_stake(entry));
    }
    Ok((total.to_string(), bids.len()))
}

fn bid_entry_stake(entry: &Value) -> u128 {
    let bid = entry.get("bid").unwrap_or(entry);
    let mut sum = parse_u128(
        bid.get("staked_amount")
            .or_else(|| bid.get("stakedAmount"))
            .or_else(|| bid.pointer("/validator_bid/staked_amount"))
            .or_else(|| bid.pointer("/validatorBid/stakedAmount")),
    );
    if let Some(dels) = bid
        .get("delegators")
        .or_else(|| bid.get("delegator_bids"))
        .or_else(|| bid.get("delegatorBids"))
        .and_then(|d| d.as_array())
    {
        for d in dels {
            let inner = d.get("delegator").unwrap_or(d);
            sum = sum.saturating_add(parse_u128(
                inner
                    .get("staked_amount")
                    .or_else(|| inner.get("stakedAmount")),
            ));
        }
    }
    sum
}

fn parse_u128(v: Option<&Value>) -> u128 {
    match v {
        Some(Value::String(s)) => s.parse().unwrap_or(0),
        Some(Value::Number(n)) => n.as_u64().unwrap_or(0) as u128,
        _ => 0,
    }
}

fn str_field(v: &Value, keys: &[&str]) -> Option<String> {
    for k in keys {
        if let Some(s) = v.get(*k).and_then(|x| x.as_str()) {
            return Some(s.to_string());
        }
    }
    None
}

fn str_pointer(v: &Value, paths: &[&str]) -> Option<String> {
    for p in paths {
        if let Some(s) = v.pointer(p).and_then(|x| x.as_str()) {
            return Some(s.to_string());
        }
    }
    None
}

fn u64_pointer(v: &Value, paths: &[&str]) -> Option<u64> {
    for p in paths {
        if let Some(n) = v.pointer(p).and_then(|x| x.as_u64()) {
            return Some(n);
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn sums_classic_bids() {
        let v = json!({
            "auction_state": {
                "bids": [
                    {
                        "public_key": "01aa",
                        "bid": {
                            "staked_amount": "100",
                            "delegators": [
                                { "delegator": { "staked_amount": "50" } }
                            ]
                        }
                    },
                    {
                        "bid": { "staked_amount": "10", "delegators": [] }
                    }
                ]
            }
        });
        let (total, n) = total_stake_from_auction(&v).unwrap();
        assert_eq!(total, "160");
        assert_eq!(n, 2);
    }
}
