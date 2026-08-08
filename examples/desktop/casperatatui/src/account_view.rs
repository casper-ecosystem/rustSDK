//! Parse entity / balance JSON for the Accounts overview.

use serde_json::Value;

/// Named key entry under an account or addressable entity.
#[derive(Debug, Clone)]
pub struct NamedKeyRow {
    pub name: String,
    pub key: String,
}

/// Associated key weight row.
#[derive(Debug, Clone)]
pub struct AssociatedKeyRow {
    pub account_hash: String,
    pub weight: u64,
}

/// Parsed entity fields used by the Accounts view.
#[derive(Debug, Clone, Default)]
pub struct EntityOverview {
    pub kind: String,
    pub account_hash: Option<String>,
    pub main_purse: Option<String>,
    pub named_keys: Vec<NamedKeyRow>,
    pub associated_keys: Vec<AssociatedKeyRow>,
}

/// Parse `state_get_entity` or normalized `get_account` JSON into overview fields.
pub fn parse_entity_overview(value: &Value) -> Result<EntityOverview, String> {
    // Legacy `state_get_account_info` shape (before TUI wrap, or raw paste).
    if let Some(account) = value.get("account") {
        return Ok(parse_account_like(account, "Account"));
    }

    let entity = value
        .get("entity")
        .ok_or_else(|| "entity payload missing `entity`".to_string())?;

    if let Some(account) = entity
        .get("Account")
        .or_else(|| entity.get("LegacyAccount"))
    {
        return Ok(parse_account_like(account, "Account"));
    }
    if let Some(addr) = entity
        .get("AddressableEntity")
        .or_else(|| entity.get("addressable_entity"))
    {
        return Ok(parse_account_like(addr, "AddressableEntity"));
    }
    // Some nodes wrap under Entity / SmartContract.
    if let Some(obj) = entity.as_object() {
        if let Some((kind, inner)) = obj.iter().next() {
            if inner.is_object() {
                return Ok(parse_account_like(inner, kind));
            }
        }
    }
    Err("unsupported entity shape".into())
}

fn parse_account_like(node: &Value, kind: &str) -> EntityOverview {
    let account_hash = node
        .get("account_hash")
        .or_else(|| node.get("entity_hash"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    let main_purse = node
        .get("main_purse")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    let named_keys = parse_named_keys(node.get("named_keys"));
    let associated_keys = parse_associated_keys(node.get("associated_keys"));
    EntityOverview {
        kind: kind.to_string(),
        account_hash,
        main_purse,
        named_keys,
        associated_keys,
    }
}

fn parse_named_keys(node: Option<&Value>) -> Vec<NamedKeyRow> {
    let Some(Value::Array(items)) = node else {
        return Vec::new();
    };
    items
        .iter()
        .filter_map(|item| {
            let name = item
                .get("name")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            let key = item
                .get("key")
                .map(|v| match v {
                    Value::String(s) => s.clone(),
                    other => other.to_string(),
                })
                .unwrap_or_default();
            if name.is_empty() && key.is_empty() {
                None
            } else {
                Some(NamedKeyRow { name, key })
            }
        })
        .collect()
}

fn parse_associated_keys(node: Option<&Value>) -> Vec<AssociatedKeyRow> {
    let Some(Value::Array(items)) = node else {
        return Vec::new();
    };
    items
        .iter()
        .filter_map(|item| {
            let account_hash = item
                .get("account_hash")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            let weight = item.get("weight").and_then(|v| v.as_u64()).unwrap_or(0);
            if account_hash.is_empty() {
                None
            } else {
                Some(AssociatedKeyRow {
                    account_hash,
                    weight,
                })
            }
        })
        .collect()
}

/// `query_balance` result → motes string.
pub fn parse_balance_motes(value: &Value) -> Option<String> {
    value
        .get("balance")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
}

/// `query_balance_details` → (total, available).
pub fn parse_balance_details(value: &Value) -> (Option<String>, Option<String>) {
    let total = value
        .get("total_balance")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    let available = value
        .get("available_balance")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string());
    (total, available)
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn parses_account_entity() {
        let v = json!({
            "entity": {
                "Account": {
                    "account_hash": "account-hash-abc",
                    "main_purse": "uref-xyz-007",
                    "named_keys": [{"name": "foo", "key": "uref-1-007"}],
                    "associated_keys": [{"account_hash": "account-hash-abc", "weight": 1}]
                }
            }
        });
        let o = parse_entity_overview(&v).unwrap();
        assert_eq!(o.kind, "Account");
        assert_eq!(o.account_hash.as_deref(), Some("account-hash-abc"));
        assert_eq!(o.named_keys.len(), 1);
        assert_eq!(o.associated_keys[0].weight, 1);
    }

    #[test]
    fn parses_legacy_get_account_shape() {
        let v = json!({
            "account": {
                "account_hash": "account-hash-legacy",
                "main_purse": "uref-purse-007",
                "named_keys": [],
                "associated_keys": []
            }
        });
        let o = parse_entity_overview(&v).unwrap();
        assert_eq!(o.kind, "Account");
        assert_eq!(o.account_hash.as_deref(), Some("account-hash-legacy"));
        assert_eq!(o.main_purse.as_deref(), Some("uref-purse-007"));
    }
}
