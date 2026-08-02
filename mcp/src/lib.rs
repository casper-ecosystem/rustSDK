//! MCP sidecar library for `casper-rust-wasm-sdk`.
//!
//! Phase 1 stub: path-depends on the SDK and compiles. Tool surface lands in later phases.

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
    features
}

/// Ensure the SDK path dependency stays linked in Phase 1 (no tools yet).
pub fn sdk_crate_name() -> &'static str {
    // Touch a public SDK root item so the dep is not dead-code eliminated in checks.
    let _ = std::any::type_name::<casper_rust_wasm_sdk::SDK>();
    "casper-rust-wasm-sdk"
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

    #[test]
    fn sdk_path_dep_resolves() {
        assert_eq!(sdk_crate_name(), "casper-rust-wasm-sdk");
    }
}
