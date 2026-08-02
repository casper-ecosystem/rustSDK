//! Feature-gated tool modules.

/// Helpers domain (always compiled; enable via Cargo feature `helpers`).
pub mod helpers;

/// JSON-RPC domain (always compiled; enable via Cargo feature `rpc`).
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
    #[allow(unused_mut)]
    let mut pending = Vec::new();
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

/// Flat list of registered tool names for the current feature set.
pub fn registered_tool_names() -> Vec<&'static str> {
    let mut names = vec!["sdk_help", "sdk_get_endpoints", "sdk_set_endpoints"];
    #[cfg(feature = "helpers")]
    names.extend_from_slice(helpers::tool_names());
    #[cfg(feature = "rpc")]
    names.extend_from_slice(rpc::tool_names());
    names
}

/// Error when a Cargo feature is disabled (mcpkit still lists the tool).
pub fn feature_disabled(feature: &str) -> mcpkit::prelude::ToolOutput {
    crate::format::err(format!(
        "Cargo feature `{feature}` is disabled; rebuild with --features {feature} (or full)"
    ))
}
