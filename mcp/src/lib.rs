//! MCP sidecar library for `casper-rust-wasm-sdk`.

pub mod compose;
pub mod format;
pub mod sdk_handle;
pub mod server;
pub mod tool_args;
pub mod tools;

pub use server::{run, run_http, DEFAULT_HTTP_LISTEN};

/// Crate version (kept in sync with `Cargo.toml`).
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

/// Package name for the MCP binary / server identity.
pub const NAME: &str = env!("CARGO_PKG_NAME");

/// Enabled Cargo features as a stable list for help / diagnostics.
pub fn enabled_features() -> Vec<&'static str> {
    let mut features = Vec::new();
    #[cfg(feature = "rpc")]
    features.push("rpc");
    #[cfg(feature = "binary-port")]
    features.push("binary-port");
    #[cfg(feature = "transaction")]
    features.push("transaction");
    #[cfg(feature = "deploy")]
    features.push("deploy");
    #[cfg(feature = "contract")]
    features.push("contract");
    #[cfg(feature = "helpers")]
    features.push("helpers");
    #[cfg(feature = "write")]
    features.push("write");
    #[cfg(feature = "watcher")]
    features.push("watcher");
    #[cfg(feature = "SSE")]
    features.push("SSE");
    features
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn version_is_semverish() {
        assert!(!VERSION.is_empty());
        assert!(VERSION.contains('.'));
    }

    #[test]
    fn default_features_include_full_set() {
        let features = enabled_features();
        assert!(features.contains(&"rpc"));
        assert!(features.contains(&"helpers"));
        assert!(features.contains(&"write"));
    }
}
