//! Feature-gated tool modules (bodies land in Phases 3–5).

#[cfg(feature = "helpers")]
pub mod helpers;

#[cfg(feature = "rpc")]
pub mod rpc;

#[cfg(feature = "binary-port")]
pub mod binary_port;

#[cfg(feature = "transaction")]
pub mod transaction;

#[cfg(feature = "deploy")]
pub mod deploy;

#[cfg(feature = "contract")]
pub mod contract;

/// Human-readable list of tool groups enabled in this build.
pub fn enabled_tool_groups() -> Vec<&'static str> {
    let mut groups = vec!["meta"];
    #[cfg(feature = "helpers")]
    groups.push("helpers");
    #[cfg(feature = "rpc")]
    groups.push("rpc");
    #[cfg(feature = "binary-port")]
    groups.push("binary-port");
    #[cfg(feature = "transaction")]
    groups.push("transaction");
    #[cfg(feature = "deploy")]
    groups.push("deploy");
    #[cfg(feature = "contract")]
    groups.push("contract");
    #[cfg(feature = "write")]
    groups.push("write");
    groups
}

/// Placeholder summary for groups that are compiled but not yet wired as MCP tools.
pub fn pending_tool_placeholders() -> Vec<&'static str> {
    let mut pending = Vec::new();
    #[cfg(feature = "helpers")]
    pending.push("helpers (Phase 3)");
    #[cfg(feature = "rpc")]
    pending.push("rpc (Phase 3)");
    #[cfg(feature = "binary-port")]
    pending.push("binary-port (Phase 4)");
    #[cfg(feature = "transaction")]
    pending.push("transaction (Phase 5)");
    #[cfg(feature = "deploy")]
    pending.push("deploy (Phase 5)");
    #[cfg(feature = "contract")]
    pending.push("contract (Phase 5)");
    #[cfg(feature = "write")]
    pending.push("write (Phase 5)");
    pending
}
