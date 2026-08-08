//! Parse `query_global_state` Contract / Package payloads for the Contracts view.

use casper_rust_wasm_sdk::helpers::contract_hash_key_for_global_state;
use serde_json::Value;

/// Named key under a contract or package.
#[derive(Debug, Clone)]
pub struct NamedKeyRow {
    pub name: String,
    pub key: String,
}

/// Entry point row (name + args summary).
#[derive(Debug, Clone)]
pub struct EntryPointRow {
    pub name: String,
    pub args_summary: String,
    pub ret: String,
    pub access: String,
}

/// Parsed contract / package overview.
#[derive(Debug, Clone, Default)]
pub struct ContractOverview {
    pub kind: String,
    pub key: String,
    pub package_hash: Option<String>,
    pub wasm_hash: Option<String>,
    pub named_keys: Vec<NamedKeyRow>,
    pub entry_points: Vec<EntryPointRow>,
}

/// Normalize user input into a formatted global-state key.
pub fn normalize_contract_key(raw: &str) -> String {
    let t = raw.trim();
    if t.is_empty() {
        return String::new();
    }
    // Shortcuts for NCTL / Casper system contracts (resolved later via registry).
    let lower = t.to_ascii_lowercase();
    if lower == "auction"
        || lower == "mint"
        || lower == "handle payment"
        || lower == "handle_payment"
    {
        return lower.replace('_', " ");
    }
    if let Some(name) = lower.strip_prefix("system:") {
        return name.replace('_', " ").to_string();
    }
    contract_hash_key_for_global_state(t)
}

/// True when the input is a system-contract shortcut (not a hash yet).
pub fn is_system_shortcut(key: &str) -> bool {
    matches!(
        key.trim().to_ascii_lowercase().as_str(),
        "auction" | "mint" | "handle payment"
    )
}

/// System entity registry key (padded zeros).
pub fn system_entity_registry_key() -> &'static str {
    "system-entity-registry-0000000000000000000000000000000000000000000000000000000000000000"
}

/// Parse registry CLValue map → hex hash for `name` (e.g. "auction").
pub fn system_contract_hash_from_registry(registry: &Value, name: &str) -> Option<String> {
    let want = name.trim().to_ascii_lowercase();
    let parsed = registry
        .pointer("/stored_value/CLValue/parsed")
        .or_else(|| registry.pointer("/CLValue/parsed"))?;
    let items = parsed.as_array()?;
    for item in items {
        let key = item
            .get("key")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_ascii_lowercase();
        if key == want {
            let hex = item.get("value").and_then(|v| v.as_str())?;
            return Some(format!("hash-{hex}"));
        }
    }
    None
}

/// Parse `query_global_state` result into a contract overview.
pub fn parse_contract_overview(key: &str, value: &Value) -> Result<ContractOverview, String> {
    let stored = value
        .get("stored_value")
        .ok_or_else(|| "missing stored_value".to_string())?;

    if let Some(contract) = stored.get("Contract") {
        return Ok(parse_contract_body(key, "Contract", contract));
    }
    if let Some(pkg) = stored
        .get("ContractPackage")
        .or_else(|| stored.get("SmartContract"))
    {
        return Ok(parse_package_body(key, pkg));
    }
    if let Some(addr) = stored.get("AddressableEntity") {
        return Ok(parse_addressable_entity(key, addr));
    }
    Err(format!(
        "unsupported stored_value (keys: {:?})",
        stored
            .as_object()
            .map(|o| o.keys().cloned().collect::<Vec<_>>())
            .unwrap_or_default()
    ))
}

fn parse_contract_body(key: &str, kind: &str, body: &Value) -> ContractOverview {
    ContractOverview {
        kind: kind.to_string(),
        key: key.to_string(),
        package_hash: body
            .get("contract_package_hash")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        wasm_hash: body
            .get("contract_wasm_hash")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        named_keys: parse_named_keys(body.get("named_keys")),
        entry_points: parse_entry_points(body.get("entry_points")),
    }
}

fn parse_package_body(key: &str, body: &Value) -> ContractOverview {
    let versions = body
        .get("versions")
        .and_then(|v| v.as_array())
        .map(|a| a.len())
        .unwrap_or(0);
    let mut overview = ContractOverview {
        kind: "ContractPackage".into(),
        key: key.to_string(),
        package_hash: Some(key.to_string()),
        wasm_hash: None,
        named_keys: parse_named_keys(body.get("named_keys")),
        entry_points: Vec::new(),
    };
    // Surface version count as a pseudo named key for overview.
    overview.named_keys.insert(
        0,
        NamedKeyRow {
            name: format!("(versions: {versions})"),
            key: String::new(),
        },
    );
    overview
}

fn parse_addressable_entity(key: &str, body: &Value) -> ContractOverview {
    let entity = body.get("entity").unwrap_or(body);
    ContractOverview {
        kind: "AddressableEntity".into(),
        key: key.to_string(),
        package_hash: entity
            .get("package_hash")
            .or_else(|| entity.get("package"))
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        wasm_hash: entity
            .get("byte_code_hash")
            .and_then(|v| v.as_str())
            .map(|s| s.to_string()),
        named_keys: parse_named_keys(body.get("named_keys").or_else(|| entity.get("named_keys"))),
        entry_points: parse_entry_points(
            body.get("entry_points")
                .or_else(|| entity.get("entry_points")),
        ),
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

fn parse_entry_points(node: Option<&Value>) -> Vec<EntryPointRow> {
    let Some(Value::Array(items)) = node else {
        return Vec::new();
    };
    items
        .iter()
        .map(|item| {
            let name = item
                .get("name")
                .and_then(|v| v.as_str())
                .unwrap_or("?")
                .trim()
                .to_string();
            let args = item
                .get("args")
                .and_then(|v| v.as_array())
                .map(|arr| {
                    arr.iter()
                        .filter_map(|a| {
                            let n = a.get("name").and_then(|v| v.as_str())?;
                            let t = cl_type_label(a.get("cl_type"));
                            Some(format!("{n}:{t}"))
                        })
                        .collect::<Vec<_>>()
                        .join(", ")
                })
                .unwrap_or_default();
            let ret = cl_type_label(item.get("ret"));
            let access = item
                .get("access")
                .map(|v| match v {
                    Value::String(s) => s.clone(),
                    other => other.to_string(),
                })
                .unwrap_or_else(|| "?".into());
            EntryPointRow {
                name,
                args_summary: args,
                ret,
                access,
            }
        })
        .collect()
}

fn cl_type_label(v: Option<&Value>) -> String {
    match v {
        Some(Value::String(s)) => s.clone(),
        Some(Value::Object(map)) => {
            if let Some((k, inner)) = map.iter().next() {
                format!("{k}({})", cl_type_label(Some(inner)))
            } else {
                "Object".into()
            }
        }
        Some(other) => other.to_string(),
        None => "?".into(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn parses_contract_entry_points() {
        let v = json!({
            "stored_value": {
                "Contract": {
                    "contract_package_hash": "contract-package-aa",
                    "contract_wasm_hash": "contract-wasm-bb",
                    "named_keys": [{"name": "era_id", "key": "uref-1-007"}],
                    "entry_points": [{
                        "name": "delegate",
                        "args": [
                            {"name": "delegator", "cl_type": "PublicKey"},
                            {"name": "amount", "cl_type": "U512"}
                        ],
                        "ret": "U512",
                        "access": "Public"
                    }]
                }
            }
        });
        let o = parse_contract_overview("hash-abc", &v).unwrap();
        assert_eq!(o.kind, "Contract");
        assert_eq!(o.named_keys.len(), 1);
        assert_eq!(o.entry_points.len(), 1);
        assert!(o.entry_points[0].args_summary.contains("delegator"));
    }

    #[test]
    fn normalizes_hash_prefix() {
        let hex = "aa".repeat(32);
        assert_eq!(normalize_contract_key(&hex), format!("hash-{hex}"));
    }
}
