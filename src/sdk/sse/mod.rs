//! Shared SSE framing, wait/watch helpers, and (with feature `SSE`) full client + CES.
//!
//! - `watcher`: framing + wait/watch
//! - `SSE`: enables `watcher`, plus `SSEClient` and `CESParser`
//!
//! Public crates use `casper_rust_wasm_sdk::watcher` and `casper_rust_wasm_sdk::SSE`.

#[cfg(feature = "watcher")]
pub(crate) mod framing;

#[cfg(feature = "watcher")]
pub mod watcher;

#[cfg(feature = "SSE")]
pub mod ces;
#[cfg(feature = "SSE")]
pub mod client;
#[cfg(feature = "SSE")]
pub mod event;
