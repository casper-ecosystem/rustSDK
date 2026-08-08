//! CLI and network presets.

use anyhow::{bail, Result};
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use clap::{Parser, ValueEnum};
use std::path::PathBuf;

use crate::policy::WritePolicy;

const NCTL_RPC: &str = "http://127.0.0.1:11101";
const NCTL_EVENTS: &str = "http://127.0.0.1:18101/events";
const TESTNET_RPC: &str = "https://node.testnet.casper.network";
const TESTNET_EVENTS: &str = "https://events.testnet.casper.network/events";
const MAINNET_RPC: &str = "https://node.mainnet.casper.network";
const MAINNET_EVENTS: &str = "https://events.mainnet.casper.network/events";

/// Friendly neighborhood Casper explorer.
#[derive(Debug, Parser)]
#[command(
    name = "casperatatui",
    about = "Casperatatui: Casper SDK terminal explorer (boo!)",
    long_about = "Casperatatui browses a Casper node from your terminal via casper-rust-wasm-sdk.\n\
                  Press h for help, : for the command palette, q to restore your shell."
)]
pub struct Cli {
    /// JSON-RPC base URL (env: CASPER_RPC_URL).
    #[arg(long, env = "CASPER_RPC_URL")]
    pub rpc_url: Option<String>,

    /// SSE / events URL (env: CASPER_EVENTS_URL).
    #[arg(long, env = "CASPER_EVENTS_URL")]
    pub events_url: Option<String>,

    /// Fill default RPC + events URLs when flags/env are unset.
    #[arg(long, value_enum, default_value_t = Preset::Nctl)]
    pub preset: Preset,

    /// SDK verbosity: low | medium | high (env: CASPER_VERBOSITY).
    #[arg(long, env = "CASPER_VERBOSITY", default_value = "low")]
    pub verbosity: String,

    /// Unlock Writes UI and write Actions (PEM still required to sign/put).
    #[arg(long, default_value_t = false)]
    pub enable_writes: bool,

    /// Optional PEM path loaded at startup (only used with --enable-writes).
    #[arg(long, env = "CASPER_SECRET_KEY")]
    pub secret_key: Option<PathBuf>,

    /// Write policy JSON (default: examples/desktop/tui/policy.sample.json relative to CWD or crate).
    #[arg(long, env = "CASPER_POLICY_PATH")]
    pub policy_path: Option<PathBuf>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, ValueEnum)]
pub enum Preset {
    Nctl,
    Testnet,
    Mainnet,
}

impl Preset {
    pub fn label(self) -> &'static str {
        match self {
            Self::Nctl => "nctl (local ghosts)",
            Self::Testnet => "testnet",
            Self::Mainnet => "mainnet",
        }
    }

    fn defaults(self) -> (&'static str, &'static str) {
        match self {
            Self::Nctl => (NCTL_RPC, NCTL_EVENTS),
            Self::Testnet => (TESTNET_RPC, TESTNET_EVENTS),
            Self::Mainnet => (MAINNET_RPC, MAINNET_EVENTS),
        }
    }
}

/// Resolved addresses after applying preset defaults.
#[derive(Debug, Clone)]
pub struct ResolvedConfig {
    pub rpc_url: String,
    pub events_url: String,
    pub verbosity: Verbosity,
    pub preset: Preset,
    pub enable_writes: bool,
    pub secret_key_path: Option<PathBuf>,
    pub policy: WritePolicy,
    pub policy_path: PathBuf,
}

impl Cli {
    pub fn resolve(self) -> Result<ResolvedConfig> {
        let (rpc_default, events_default) = self.preset.defaults();
        let rpc_url = self
            .rpc_url
            .filter(|s| !s.trim().is_empty())
            .unwrap_or_else(|| rpc_default.to_string());
        let events_url = self
            .events_url
            .filter(|s| !s.trim().is_empty())
            .unwrap_or_else(|| events_default.to_string());
        let verbosity = parse_verbosity(&self.verbosity)?;
        let policy_path = self.policy_path.unwrap_or_else(default_policy_path);
        let policy = if self.enable_writes {
            WritePolicy::load(&policy_path).map_err(|e| anyhow::anyhow!(e))?
        } else {
            WritePolicy::default()
        };
        Ok(ResolvedConfig {
            rpc_url,
            events_url,
            verbosity,
            preset: self.preset,
            enable_writes: self.enable_writes,
            secret_key_path: self.secret_key,
            policy,
            policy_path,
        })
    }
}

fn default_policy_path() -> PathBuf {
    // Prefer crate-relative sample when run from repo root or examples/desktop/tui.
    let candidates = [
        PathBuf::from("examples/desktop/tui/policy.sample.json"),
        PathBuf::from("policy.sample.json"),
    ];
    for c in candidates {
        if c.is_file() {
            return c;
        }
    }
    PathBuf::from("examples/desktop/tui/policy.sample.json")
}

fn parse_verbosity(raw: &str) -> Result<Verbosity> {
    match raw.trim().to_ascii_lowercase().as_str() {
        "low" | "0" => Ok(Verbosity::Low),
        "medium" | "1" => Ok(Verbosity::Medium),
        "high" | "2" => Ok(Verbosity::High),
        other => bail!("unknown verbosity `{other}` (use low|medium|high)"),
    }
}
