//! Fail-closed write policy for Put.

use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WritePolicy {
    #[serde(default = "default_max_transfer")]
    pub max_transfer_motes: String,
    #[serde(default)]
    pub allowed_targets: Vec<String>,
    #[serde(default)]
    pub allowed_ops: Vec<String>,
    #[serde(default)]
    pub allow_put: bool,
}

fn default_max_transfer() -> String {
    "0".into()
}

impl Default for WritePolicy {
    fn default() -> Self {
        Self {
            max_transfer_motes: "0".into(),
            allowed_targets: Vec::new(),
            allowed_ops: Vec::new(),
            allow_put: false,
        }
    }
}

impl WritePolicy {
    pub fn load(path: &Path) -> Result<Self, String> {
        let raw =
            fs::read_to_string(path).map_err(|e| format!("read policy {}: {e}", path.display()))?;
        serde_json::from_str(&raw).map_err(|e| format!("parse policy: {e}"))
    }

    pub fn allows_op(&self, op: &str) -> bool {
        let want = op.trim().to_ascii_lowercase();
        self.allowed_ops.iter().any(|o| {
            let o = o.trim().to_ascii_lowercase();
            o == "*" || o == want
        })
    }

    pub fn check_put(&self, op: &str) -> Result<(), String> {
        if !self.allow_put {
            return Err("policy: allow_put is false".into());
        }
        if !self.allows_op(op) {
            return Err(format!("policy: `{op}` op not allowed"));
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_blocks_put() {
        let p = WritePolicy::default();
        assert!(p.check_put("transfer").is_err());
    }

    #[test]
    fn allowlist_put() {
        let p = WritePolicy {
            max_transfer_motes: "0".into(),
            allowed_targets: vec![],
            allowed_ops: vec!["put_transaction".into()],
            allow_put: true,
        };
        assert!(p.check_put("put_transaction").is_ok());
        assert!(p.check_put("transfer").is_err());
    }
}
