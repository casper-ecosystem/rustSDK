//! Auction JSON helpers: filter bids/delegators/unbonding by account identity.
//! Shared field mapping with Validators screens (no mcp path-dep).

use serde::Serialize;
use serde_json::Value;

/// Keys that identify an account across auction rows.
#[derive(Debug, Clone, Default)]
pub struct AccountMatchKeys {
    pub raw: String,
    pub public_key: Option<String>,
    pub account_hash: Option<String>,
    pub main_purse: Option<String>,
}

impl AccountMatchKeys {
    pub fn from_identity(identity: &str) -> Self {
        let raw = identity.trim().to_string();
        let lower = raw.to_ascii_lowercase();
        let mut keys = Self {
            raw: raw.clone(),
            public_key: None,
            account_hash: None,
            main_purse: None,
        };
        if lower.starts_with("uref-") {
            keys.main_purse = Some(normalize_uref(&raw));
        } else if lower.starts_with("account-hash-") {
            keys.account_hash = Some(normalize_hash(&raw));
        } else if looks_like_public_key(&raw) {
            keys.public_key = Some(raw.to_ascii_lowercase());
        }
        keys
    }

    pub fn with_entity_fields(
        mut self,
        account_hash: Option<String>,
        main_purse: Option<String>,
    ) -> Self {
        if let Some(h) = account_hash {
            self.account_hash = Some(normalize_hash(&h));
        }
        if let Some(p) = main_purse {
            self.main_purse = Some(normalize_uref(&p));
        }
        self
    }

    fn matches_public_key(&self, candidate: &str) -> bool {
        let c = candidate.trim().to_ascii_lowercase();
        if c.is_empty() {
            return false;
        }
        if let Some(pk) = &self.public_key {
            if pk == &c {
                return true;
            }
        }
        let raw = self.raw.trim().to_ascii_lowercase();
        !raw.is_empty() && raw == c
    }

    fn matches_purse(&self, candidate: &str) -> bool {
        let Some(want) = &self.main_purse else {
            return false;
        };
        normalize_uref(candidate) == *want
    }
}

/// Validator self-stake row (bid matches the account public key).
#[derive(Debug, Clone)]
pub struct SelfStakeRow {
    pub public_key: String,
    pub staked_amount: String,
    pub bonding_purse: String,
    pub delegation_rate: Option<u64>,
    pub inactive: bool,
    pub delegator_count: usize,
}

/// Delegator stake under a validator bid.
#[derive(Debug, Clone, Serialize)]
pub struct DelegationRow {
    pub validator_public_key: String,
    pub delegator_public_key: String,
    pub staked_amount: String,
    pub bonding_purse: String,
}

/// Unbonding / undelegation purse row when present in auction JSON.
#[derive(Debug, Clone)]
pub struct UndelegationRow {
    pub validator_public_key: String,
    pub unbonder_public_key: String,
    pub amount: String,
    pub bonding_purse: String,
    pub era_of_creation: Option<u64>,
}

/// Normalized auction bid for Validators / Bidders lists.
#[derive(Debug, Clone, Serialize)]
pub struct ValidatorRow {
    pub public_key: String,
    pub staked_amount: String,
    pub total_stake: String,
    pub bonding_purse: String,
    pub delegation_rate: Option<u64>,
    pub inactive: bool,
    pub delegator_count: usize,
}

/// Bidder list row (same shape as [`ValidatorRow`]; all auction bids).
pub type BidderRow = ValidatorRow;

/// One validator bid with delegators for detail / MCP get.
#[derive(Debug, Clone, Serialize)]
pub struct ValidatorDetail {
    pub validator: ValidatorRow,
    pub delegators: Vec<DelegationRow>,
}

/// Filter auction payload for stakes tied to `keys`.
pub fn filter_account_stakes(
    auction: &Value,
    keys: &AccountMatchKeys,
) -> (
    Option<SelfStakeRow>,
    Vec<DelegationRow>,
    Vec<UndelegationRow>,
) {
    let bids = bids_array(auction);
    let mut self_stake = None;
    let mut delegations = Vec::new();

    for bid_entry in bids {
        let validator_pk = bid_public_key(bid_entry);
        let bid = bid_entry.get("bid").unwrap_or(bid_entry);

        if keys.matches_public_key(&validator_pk) {
            self_stake = Some(SelfStakeRow {
                public_key: validator_pk.clone(),
                staked_amount: json_str(bid.get("staked_amount")),
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
            });
        }

        if let Some(dels) = bid.get("delegators").and_then(|d| d.as_array()) {
            for del_entry in dels {
                let (del_pk, del_body) = delegator_parts(del_entry);
                let purse = json_str(del_body.get("bonding_purse"));
                let matches = keys.matches_public_key(&del_pk) || keys.matches_purse(&purse);
                if !matches {
                    continue;
                }
                let validator = json_str(
                    del_body
                        .get("validator_public_key")
                        .filter(|v| !json_str(Some(v)).is_empty())
                        .or(Some(&Value::String(validator_pk.clone()))),
                );
                delegations.push(DelegationRow {
                    validator_public_key: validator,
                    delegator_public_key: del_pk,
                    staked_amount: json_str(del_body.get("staked_amount")),
                    bonding_purse: purse,
                });
            }
        }
    }

    let undelegations = filter_undelegations(auction, keys);
    (self_stake, delegations, undelegations)
}

/// First validator public key in auction bids (for smokes / defaults).
pub fn first_validator_public_key(auction: &Value) -> Option<String> {
    for bid_entry in bids_array(auction) {
        let pk = bid_public_key(bid_entry);
        if !pk.is_empty() {
            return Some(pk);
        }
    }
    None
}

/// Active validators (`inactive == false`), sorted by total stake descending.
pub fn list_validators(auction: &Value) -> Vec<ValidatorRow> {
    let mut rows: Vec<ValidatorRow> = list_bidders(auction)
        .into_iter()
        .filter(|r| !r.inactive)
        .collect();
    sort_by_total_stake_desc(&mut rows);
    rows
}

/// All auction bids (active + inactive), sorted by total stake descending.
pub fn list_bidders(auction: &Value) -> Vec<BidderRow> {
    let mut rows: Vec<ValidatorRow> = bids_array(auction)
        .iter()
        .filter_map(parse_validator_row)
        .collect();
    sort_by_total_stake_desc(&mut rows);
    rows
}

/// Detail for one public key (case-insensitive hex match).
pub fn get_validator(auction: &Value, public_key: &str) -> Option<ValidatorDetail> {
    let want = public_key.trim().to_ascii_lowercase();
    if want.is_empty() {
        return None;
    }
    for bid_entry in bids_array(auction) {
        let pk = bid_public_key(bid_entry);
        if pk.to_ascii_lowercase() != want {
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
    let staked_amount = json_str(bid.get("staked_amount"));
    let total = bid_entry_total_stake(bid_entry);
    Some(ValidatorRow {
        public_key,
        staked_amount,
        total_stake: total.to_string(),
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

fn sort_by_total_stake_desc(rows: &mut [ValidatorRow]) {
    rows.sort_by(|a, b| {
        let ta = a.total_stake.parse::<u128>().unwrap_or(0);
        let tb = b.total_stake.parse::<u128>().unwrap_or(0);
        tb.cmp(&ta).then_with(|| a.public_key.cmp(&b.public_key))
    });
}

fn parse_u128(v: Option<&Value>) -> u128 {
    match v {
        Some(Value::String(s)) => s.parse().unwrap_or(0),
        Some(Value::Number(n)) => n.as_u64().unwrap_or(0) as u128,
        _ => 0,
    }
}

fn filter_undelegations(auction: &Value, keys: &AccountMatchKeys) -> Vec<UndelegationRow> {
    let mut out = Vec::new();
    let candidates = [
        auction.pointer("/auction_state/unbonding_purses"),
        auction.pointer("/auction_state/withdraw_purses"),
        auction.get("unbonding_purses"),
        auction.get("unbonding"),
    ];
    for node in candidates.into_iter().flatten() {
        collect_unbonding_node(node, keys, &mut out);
    }
    for bid_entry in bids_array(auction) {
        let bid = bid_entry.get("bid").unwrap_or(bid_entry);
        for key in ["unbonding_purses", "unbonding", "withdraw_purses"] {
            if let Some(node) = bid.get(key) {
                collect_unbonding_node(node, keys, &mut out);
            }
        }
    }
    out
}

fn collect_unbonding_node(node: &Value, keys: &AccountMatchKeys, out: &mut Vec<UndelegationRow>) {
    match node {
        Value::Array(items) => {
            for item in items {
                collect_unbonding_node(item, keys, out);
            }
        }
        Value::Object(map) => {
            if map.contains_key("unbonder_public_key")
                || map.contains_key("bonding_purse")
                || (map.contains_key("amount") && map.contains_key("validator_public_key"))
            {
                maybe_push_unbonding(node, None, keys, out);
                return;
            }
            for (k, v) in map {
                let map_pk = looks_like_public_key(k).then(|| k.to_string());
                collect_unbonding_entries(v, map_pk.as_deref(), keys, out);
            }
        }
        _ => {}
    }
}

fn collect_unbonding_entries(
    node: &Value,
    map_pk: Option<&str>,
    keys: &AccountMatchKeys,
    out: &mut Vec<UndelegationRow>,
) {
    match node {
        Value::Array(items) => {
            for item in items {
                maybe_push_unbonding(item, map_pk, keys, out);
            }
        }
        Value::Object(_) => maybe_push_unbonding(node, map_pk, keys, out),
        _ => {}
    }
}

fn maybe_push_unbonding(
    item: &Value,
    map_pk: Option<&str>,
    keys: &AccountMatchKeys,
    out: &mut Vec<UndelegationRow>,
) {
    let mut unbonder = json_str(
        item.get("unbonder_public_key")
            .or_else(|| item.get("public_key")),
    );
    if unbonder.is_empty() {
        if let Some(pk) = map_pk {
            unbonder = pk.to_string();
        }
    }
    let purse = json_str(item.get("bonding_purse"));
    if !keys.matches_public_key(&unbonder) && !keys.matches_purse(&purse) {
        return;
    }
    out.push(UndelegationRow {
        validator_public_key: json_str(item.get("validator_public_key")),
        unbonder_public_key: unbonder,
        amount: json_str(item.get("amount")),
        bonding_purse: purse,
        era_of_creation: item
            .get("era_of_creation")
            .or_else(|| item.get("era"))
            .and_then(|v| v.as_u64()),
    });
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

fn normalize_hash(s: &str) -> String {
    s.trim().to_ascii_lowercase()
}

fn normalize_uref(s: &str) -> String {
    s.trim().to_ascii_lowercase()
}

fn looks_like_public_key(s: &str) -> bool {
    let t = s.trim();
    (t.len() == 66 || t.len() == 68) && t.chars().all(|c| c.is_ascii_hexdigit())
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn sample_auction() -> Value {
        json!({
            "auction_state": {
                "bids": [{
                    "public_key": "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "bid": {
                        "staked_amount": "1000",
                        "bonding_purse": "uref-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-007",
                        "delegation_rate": 10,
                        "inactive": false,
                        "delegators": [{
                            "delegator_public_key": "013bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                            "delegator": {
                                "staked_amount": "500",
                                "bonding_purse": "uref-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-007",
                                "validator_public_key": "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                            }
                        }]
                    }
                }, {
                    "public_key": "015ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                    "bid": {
                        "staked_amount": "50",
                        "bonding_purse": "uref-cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc-007",
                        "delegation_rate": 5,
                        "inactive": true,
                        "delegators": []
                    }
                }]
            }
        })
    }

    #[test]
    fn filters_validator_self_stake() {
        let keys = AccountMatchKeys::from_identity(
            "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        );
        let (self_stake, dels, undels) = filter_account_stakes(&sample_auction(), &keys);
        assert!(self_stake.is_some());
        assert_eq!(self_stake.unwrap().staked_amount, "1000");
        assert!(dels.is_empty());
        assert!(undels.is_empty());
    }

    #[test]
    fn first_validator_from_sample() {
        let pk = first_validator_public_key(&sample_auction()).unwrap();
        assert_eq!(
            pk,
            "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
    }

    #[test]
    fn lists_validators_active_sorted() {
        let rows = list_validators(&sample_auction());
        assert_eq!(rows.len(), 1);
        assert_eq!(rows[0].total_stake, "1500");
        assert!(!rows[0].inactive);
    }

    #[test]
    fn lists_bidders_includes_inactive() {
        let rows = list_bidders(&sample_auction());
        assert_eq!(rows.len(), 2);
        assert_eq!(rows[0].total_stake, "1500");
        assert!(rows[1].inactive);
    }

    #[test]
    fn get_validator_detail() {
        let d = get_validator(
            &sample_auction(),
            "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        )
        .unwrap();
        assert_eq!(d.delegators.len(), 1);
        assert_eq!(d.delegators[0].staked_amount, "500");
    }

    #[test]
    fn filters_delegator_by_pubkey() {
        let keys = AccountMatchKeys::from_identity(
            "013bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        );
        let (self_stake, dels, _) = filter_account_stakes(&sample_auction(), &keys);
        assert!(self_stake.is_none());
        assert_eq!(dels.len(), 1);
        assert_eq!(dels[0].staked_amount, "500");
    }

    #[test]
    fn filters_delegator_by_purse() {
        let keys = AccountMatchKeys::from_identity(
            "uref-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-007",
        );
        let (_, dels, _) = filter_account_stakes(&sample_auction(), &keys);
        assert_eq!(dels.len(), 1);
    }

    #[test]
    fn filters_unbonding_map() {
        let auction = json!({
            "auction_state": {
                "bids": [],
                "unbonding_purses": {
                    "013bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb": [{
                        "validator_public_key": "014aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "amount": "42",
                        "bonding_purse": "uref-cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc-007",
                        "era_of_creation": 9
                    }]
                }
            }
        });
        let keys = AccountMatchKeys::from_identity(
            "013bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        );
        let (_, _, undels) = filter_account_stakes(&auction, &keys);
        assert_eq!(undels.len(), 1);
        assert_eq!(undels[0].amount, "42");
    }
}
