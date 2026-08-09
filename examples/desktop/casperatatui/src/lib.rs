//! Casperatatui: Casper TUI over casper-rust-wasm-sdk (ratatui).
//!
//! Network, Blocks/Txs, Accounts, Contracts, Actions, Writes, Wait/SSE.

pub mod account_view;
pub mod actions_catalog;
pub mod auction_view;
pub mod block_view;
#[cfg(feature = "ceps")]
pub mod ceps_actions;
pub mod command;
pub mod config;
pub mod contract_view;
pub mod draw;
pub mod model;
pub mod network_data;
pub mod policy;
pub mod sdk_client;
pub mod terminal;
pub mod text_input;
pub mod views;
pub mod write_flow;

pub use config::{Cli, ResolvedConfig};
pub use model::{AppModel, ViewMode};
pub use terminal::TerminalGuard;
