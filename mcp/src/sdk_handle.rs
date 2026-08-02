//! Shared `SDK` handle initialized from environment (NCTL-friendly defaults).

use std::sync::{Arc, Mutex, OnceLock};

use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_rust_wasm_sdk::SDK;

/// Default JSON-RPC URL (local NCTL node-1).
pub const DEFAULT_RPC_URL: &str = "http://127.0.0.1:11101";

/// Default binary-port address (local NCTL node-1).
pub const DEFAULT_NODE_URL: &str = "127.0.0.1:28101";

/// Env: JSON-RPC endpoint.
pub const ENV_RPC_URL: &str = "CASPER_RPC_URL";

/// Env: binary-port endpoint.
pub const ENV_NODE_URL: &str = "CASPER_NODE_URL";

/// Env: verbosity (`low` | `medium` | `high` | `0` | `1` | `2`).
pub const ENV_VERBOSITY: &str = "CASPER_VERBOSITY";

static SHARED: OnceLock<Arc<Mutex<SDK>>> = OnceLock::new();

/// Process-wide SDK (lazy, env-initialized).
pub fn shared() -> Arc<Mutex<SDK>> {
    SHARED
        .get_or_init(|| Arc::new(Mutex::new(from_env())))
        .clone()
}

/// Build an `SDK` from env vars (does not touch the shared handle).
pub fn from_env() -> SDK {
    let rpc = std::env::var(ENV_RPC_URL).unwrap_or_else(|_| DEFAULT_RPC_URL.to_string());
    let node = std::env::var(ENV_NODE_URL).unwrap_or_else(|_| DEFAULT_NODE_URL.to_string());
    let verbosity = parse_verbosity(
        std::env::var(ENV_VERBOSITY)
            .unwrap_or_else(|_| "low".to_string())
            .as_str(),
    );
    SDK::new(Some(rpc), Some(node), Some(verbosity))
}

/// Parse verbosity without panicking on bad input (falls back to Low).
pub fn parse_verbosity(raw: &str) -> Verbosity {
    match raw.trim().to_lowercase().as_str() {
        "low" | "0" => Verbosity::Low,
        "medium" | "1" => Verbosity::Medium,
        "high" | "2" => Verbosity::High,
        _ => Verbosity::Low,
    }
}

/// Snapshot of current shared endpoints for help / diagnostics.
pub fn endpoint_snapshot() -> EndpointSnapshot {
    let sdk = shared();
    let guard = sdk.lock().expect("sdk mutex poisoned");
    EndpointSnapshot {
        rpc_address: guard.get_rpc_address(None),
        node_address: guard.get_node_address(None),
        verbosity: format!("{:?}", guard.get_verbosity(None)),
    }
}

#[derive(Debug, Clone)]
pub struct EndpointSnapshot {
    pub rpc_address: String,
    pub node_address: String,
    pub verbosity: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_verbosity_accepts_aliases() {
        assert_eq!(parse_verbosity("LOW"), Verbosity::Low);
        assert_eq!(parse_verbosity("1"), Verbosity::Medium);
        assert_eq!(parse_verbosity("high"), Verbosity::High);
        assert_eq!(parse_verbosity("nope"), Verbosity::Low);
    }
}
