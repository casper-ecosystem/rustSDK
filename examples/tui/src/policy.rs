//! Fail-closed write policy for Put / one-shot transfers.

use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

/// JSON allowlist loaded from `--policy-path`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WritePolicy {
    /// Maximum transfer amount in motes (string integer).
    #[serde(default = "default_max_transfer")]
    pub max_transfer_motes: String,
    /// Allowed transfer/stake target public keys. Empty = block all. `"*"` = any.
    #[serde(default)]
    pub allowed_targets: Vec<String>,
    /// Allowed write ops: transfer, delegate, undelegate, redelegate, install, call_entrypoint.
    #[serde(default)]
    pub allowed_ops: Vec<String>,
    /// When false, Put is always refused.
    #[serde(default)]
    pub allow_put: bool,
}

fn default_max_transfer() -> String {
    "0".into()
}

impl Default for WritePolicy {
    fn default() -> Self {
        // Fail-closed empty allowlist.
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

    pub fn allows_target(&self, target: &str) -> bool {
        let t = target.trim().to_ascii_lowercase();
        if t.is_empty() {
            return false;
        }
        if self.allowed_targets.is_empty() {
            return false;
        }
        self.allowed_targets.iter().any(|a| {
            let a = a.trim().to_ascii_lowercase();
            a == "*" || a == t
        })
    }

    pub fn check_transfer(&self, target: &str, amount_motes: &str) -> Result<(), String> {
        if !self.allow_put {
            return Err("policy: allow_put is false".into());
        }
        if !self.allows_op("transfer") {
            return Err("policy: transfer op not allowed".into());
        }
        if !self.allows_target(target) {
            return Err("policy: target not in allowed_targets".into());
        }
        let amount = parse_u128(amount_motes)?;
        let max = parse_u128(&self.max_transfer_motes)?;
        if amount > max {
            return Err(format!(
                "policy: amount {amount} exceeds max_transfer_motes {max}"
            ));
        }
        Ok(())
    }

    pub fn check_stake(&self, op: &str, validator: &str, amount_motes: &str) -> Result<(), String> {
        if !self.allow_put {
            return Err("policy: allow_put is false".into());
        }
        if !self.allows_op(op) {
            return Err(format!("policy: `{op}` op not allowed"));
        }
        if !self.allows_target(validator) {
            return Err("policy: validator not in allowed_targets".into());
        }
        let amount = parse_u128(amount_motes)?;
        let max = parse_u128(&self.max_transfer_motes)?;
        if amount > max {
            return Err(format!(
                "policy: amount {amount} exceeds max_transfer_motes {max}"
            ));
        }
        Ok(())
    }

    pub fn check_put_generic(&self, op: &str) -> Result<(), String> {
        if !self.allow_put {
            return Err("policy: allow_put is false".into());
        }
        if !self.allows_op(op) {
            return Err(format!("policy: `{op}` op not allowed"));
        }
        Ok(())
    }
}

fn parse_u128(s: &str) -> Result<u128, String> {
    s.trim()
        .parse::<u128>()
        .map_err(|_| format!("invalid motes integer `{s}`"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_allowlist_blocks() {
        let p = WritePolicy::default();
        assert!(p.check_transfer("01aa", "1").is_err());
    }

    #[test]
    fn star_allows_target() {
        let p = WritePolicy {
            max_transfer_motes: "100".into(),
            allowed_targets: vec!["*".into()],
            allowed_ops: vec!["transfer".into()],
            allow_put: true,
        };
        assert!(p.check_transfer("01aa", "50").is_ok());
        assert!(p.check_transfer("01aa", "101").is_err());
    }
}
