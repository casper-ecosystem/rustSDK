//! Parse block / transfer JSON into TUI rows (ASCII-friendly).

use serde_json::Value;

#[derive(Debug, Clone)]
pub struct BlockRow {
    pub height: u64,
    pub hash: String,
    pub era: Option<u64>,
    pub timestamp: Option<String>,
    pub tx_hashes: Vec<String>,
}

#[derive(Debug, Clone)]
pub struct TransferRow {
    pub amount: String,
    pub from: String,
    pub to: String,
    pub transaction_hash: Option<String>,
}

/// Unwrap Version1 / Version2 / flat block object from get_block result.
pub fn block_inner(value: &Value) -> Option<&Value> {
    let block = value
        .pointer("/block_with_signatures/block")
        .or_else(|| value.get("block"))?;
    if let Some(v) = block.get("Version2").or_else(|| block.get("Version1")) {
        return Some(v);
    }
    if block.get("header").is_some() {
        return Some(block);
    }
    // Sometimes { "Version2": { ... } } is the only content.
    block
        .as_object()?
        .values()
        .find(|v| v.get("header").is_some())
}

pub fn block_row_from_value(value: &Value) -> Result<BlockRow, String> {
    let inner = block_inner(value).ok_or_else(|| "block JSON missing header/body".to_string())?;
    let header = inner
        .get("header")
        .ok_or_else(|| "block missing header".to_string())?;
    let height = header
        .get("height")
        .and_then(|v| v.as_u64())
        .ok_or_else(|| "block missing height".to_string())?;
    let era = header
        .get("era_id")
        .or_else(|| header.get("eraId"))
        .and_then(|v| v.as_u64());
    let timestamp = header
        .get("timestamp")
        .and_then(|v| v.as_str())
        .map(str::to_string);
    let hash = inner
        .get("hash")
        .and_then(|v| v.as_str())
        .or_else(|| {
            value
                .pointer("/block_with_signatures/block/hash")
                .and_then(|v| v.as_str())
        })
        .or_else(|| header.get("block_hash").and_then(|v| v.as_str()))
        .unwrap_or("?")
        .to_string();
    let body = inner.get("body").unwrap_or(inner);
    let tx_hashes = extract_tx_hashes(body);
    Ok(BlockRow {
        height,
        hash,
        era,
        timestamp,
        tx_hashes,
    })
}

pub fn extract_tx_hashes(body: &Value) -> Vec<String> {
    let mut out = Vec::new();
    // Casper 2.x: body.transactions = [ [Category, [hash, ...]], ... ]
    if let Some(arr) = body.get("transactions").and_then(|v| v.as_array()) {
        for entry in arr {
            collect_hashes(entry, &mut out);
        }
    }
    for key in [
        "deploy_hashes",
        "deployHashes",
        "transfer_hashes",
        "transferHashes",
        "mint",
        "auction",
        "install_upgrade",
        "standard",
    ] {
        if let Some(v) = body.get(key) {
            collect_hashes(v, &mut out);
        }
    }
    out.sort();
    out.dedup();
    out
}

fn collect_hashes(value: &Value, out: &mut Vec<String>) {
    match value {
        Value::String(s) => {
            if looks_like_hash(s) {
                out.push(s.clone());
            }
        }
        Value::Array(items) => {
            for item in items {
                collect_hashes(item, out);
            }
        }
        Value::Object(map) => {
            for v in map.values() {
                collect_hashes(v, out);
            }
        }
        _ => {}
    }
}

fn looks_like_hash(s: &str) -> bool {
    let s = s.strip_prefix("transaction-").unwrap_or(s);
    s.len() >= 64 && s.chars().all(|c| c.is_ascii_hexdigit())
}

pub fn transfers_from_value(value: &Value) -> Vec<TransferRow> {
    let arr = value
        .get("transfers")
        .and_then(|v| v.as_array())
        .cloned()
        .unwrap_or_default();
    arr.iter()
        .map(|t| TransferRow {
            amount: str_field(t, &["amount"]).unwrap_or_else(|| "?".into()),
            from: str_field(t, &["from", "source"]).unwrap_or_else(|| "?".into()),
            to: str_field(t, &["to", "target", "to_account_hash", "toAccountHash"])
                .unwrap_or_else(|| "?".into()),
            transaction_hash: str_field(t, &["transaction_hash", "transactionHash", "deploy_hash"]),
        })
        .collect()
}

fn str_field(v: &Value, keys: &[&str]) -> Option<String> {
    for k in keys {
        if let Some(s) = v.get(*k).and_then(|x| x.as_str()) {
            return Some(s.to_string());
        }
        if let Some(n) = v.get(*k).and_then(|x| x.as_u64()) {
            return Some(n.to_string());
        }
    }
    None
}

pub fn short_hash(hash: &str) -> String {
    if hash.len() <= 16 {
        hash.to_string()
    } else {
        format!("{}...{}", &hash[..8], &hash[hash.len() - 6..])
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn parses_version2_block() {
        let v = json!({
            "block_with_signatures": {
                "block": {
                    "Version2": {
                        "hash": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "header": {
                            "height": 42,
                            "era_id": 7,
                            "timestamp": "2026-01-01T00:00:00Z"
                        },
                        "body": {
                            "transactions": [
                                ["Mint", ["bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"]],
                                ["Standard", ["cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"]]
                            ]
                        }
                    }
                }
            }
        });
        let row = block_row_from_value(&v).unwrap();
        assert_eq!(row.height, 42);
        assert_eq!(row.era, Some(7));
        assert_eq!(row.tx_hashes.len(), 2);
    }
}
