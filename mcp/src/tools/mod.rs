//! Feature-gated tool modules.

pub mod binary_port;
pub mod contract;
pub mod deploy;
pub mod helpers;
pub mod params;
pub mod rpc;
pub mod transaction;
pub mod write;

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

/// Placeholder summary for groups not yet wired.
pub fn pending_tool_placeholders() -> Vec<&'static str> {
    Vec::new()
}

/// Flat list of registered tool names for the current feature set.
pub fn registered_tool_names() -> Vec<&'static str> {
    let mut names = vec!["sdk_help", "sdk_get_endpoints", "sdk_set_endpoints"];
    #[cfg(feature = "helpers")]
    names.extend_from_slice(helpers::tool_names());
    #[cfg(feature = "rpc")]
    names.extend_from_slice(rpc::tool_names());
    #[cfg(feature = "binary-port")]
    names.extend_from_slice(binary_port::tool_names());
    #[cfg(feature = "transaction")]
    names.extend_from_slice(transaction::tool_names());
    #[cfg(feature = "deploy")]
    names.extend_from_slice(deploy::tool_names());
    #[cfg(feature = "contract")]
    names.extend_from_slice(contract::tool_names());
    #[cfg(feature = "write")]
    names.extend_from_slice(write::tool_names());
    names
}

/// Error when a Cargo feature is disabled (mcpkit still lists the tool).
pub fn feature_disabled(feature: &str) -> mcpkit::prelude::ToolOutput {
    crate::format::err(format!(
        "Cargo feature `{feature}` is disabled; rebuild with --features {feature} (or full)"
    ))
}
