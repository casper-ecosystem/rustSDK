//! `casper-rust-wasm-sdk-mcp` — Phase 1 stub binary.
//!
//! Phase 2 wires mcpkit stdio / Streamable HTTP. This binary only proves the
//! workspace path-dep build.

use anyhow::Result;

fn main() -> Result<()> {
    println!(
        "{} {} (features: {})",
        casper_rust_wasm_sdk_mcp::NAME,
        casper_rust_wasm_sdk_mcp::VERSION,
        casper_rust_wasm_sdk_mcp::enabled_features().join(", ")
    );
    let _ = casper_rust_wasm_sdk_mcp::sdk_crate_name();
    Ok(())
}
