//! `casper-rust-wasm-sdk-mcp` — MCP server (stdio by default, optional Streamable HTTP).

use anyhow::Result;
use casper_rust_wasm_sdk_mcp::server::{run, run_http, DEFAULT_HTTP_LISTEN};
use clap::Parser;

#[derive(Debug, Parser)]
#[command(
    name = "casper-rust-wasm-sdk-mcp",
    about = "casper-rust-wasm-sdk MCP server (stdio or Streamable HTTP)",
    version
)]
struct Cli {
    /// Serve Streamable HTTP instead of stdio (also: `CASPER_SDK_MCP_HTTP=1`).
    #[arg(long, env = "CASPER_SDK_MCP_HTTP")]
    http: bool,

    /// HTTP bind address when `--http` is set (also: `CASPER_SDK_MCP_ADDR`).
    #[arg(long, env = "CASPER_SDK_MCP_ADDR", default_value = DEFAULT_HTTP_LISTEN)]
    listen: String,
}

fn init_logging() {
    // Keep stdio MCP quiet: Cursor surfaces any stderr line as [error].
    // Default warn; override with RUST_LOG when debugging.
    let filter = tracing_subscriber::EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("warn"));
    tracing_subscriber::fmt()
        .with_env_filter(filter)
        .with_ansi(false)
        .with_writer(std::io::stderr)
        .init();
}

#[tokio::main]
async fn main() -> Result<()> {
    init_logging();
    let cli = Cli::parse();

    if cli.http {
        tracing::info!(addr = %cli.listen, "casper-rust-wasm-sdk-mcp starting (HTTP)");
        run_http(&cli.listen)
            .await
            .map_err(|err| anyhow::anyhow!("{err}"))?;
    } else {
        tracing::info!("casper-rust-wasm-sdk-mcp starting (stdio)");
        run().await.map_err(|err| anyhow::anyhow!("{err}"))?;
    }
    Ok(())
}
