//! MCP server (`mcpkit`) for `casper-rust-wasm-sdk-mcp` (stdio or Streamable HTTP).

#![allow(clippy::unused_async)]

use mcpkit::prelude::*;
use mcpkit::transport::stdio::StdioTransport;
use mcpkit_axum::McpRouter;

use crate::{format, sdk_handle, tools};

/// MCP server handle exposing Casper SDK tools.
pub struct CasperSdkMcp;

/// Default HTTP bind address for Streamable MCP.
pub const DEFAULT_HTTP_LISTEN: &str = "0.0.0.0:8790";

// Keep in sync with Cargo.toml `version` (enforced by unit test below).
#[mcp_server(name = "casper-rust-wasm-sdk", version = "2.2.2")]
impl CasperSdkMcp {
    #[tool(
        description = "Help: feature matrix, env vars, endpoints, and planned/available sdk_* tools"
    )]
    async fn sdk_help(&self) -> ToolOutput {
        format::text_ok(help_text())
    }

    #[tool(description = "Show current CASPER_RPC_URL / CASPER_NODE_URL / verbosity on the shared SDK")]
    async fn sdk_get_endpoints(&self) -> ToolOutput {
        let snap = sdk_handle::endpoint_snapshot();
        format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
            "env": {
                "CASPER_RPC_URL": sdk_handle::ENV_RPC_URL,
                "CASPER_NODE_URL": sdk_handle::ENV_NODE_URL,
                "CASPER_VERBOSITY": sdk_handle::ENV_VERBOSITY,
            }
        }))
    }

    #[tool(
        description = "Update shared SDK endpoints for this process (optional rpc_address, node_address, verbosity)"
    )]
    async fn sdk_set_endpoints(
        &self,
        rpc_address: Option<String>,
        node_address: Option<String>,
        verbosity: Option<String>,
    ) -> ToolOutput {
        let sdk = sdk_handle::shared();
        let mut guard = match sdk.lock() {
            Ok(g) => g,
            Err(err) => return format::err(format!("sdk mutex poisoned: {err}")),
        };
        if let Some(rpc) = rpc_address {
            if let Err(err) = guard.set_rpc_address(Some(rpc)) {
                return format::err(err);
            }
        }
        if let Some(node) = node_address {
            if let Err(err) = guard.set_node_address(Some(node)) {
                return format::err(err);
            }
        }
        if let Some(raw) = verbosity {
            let v = sdk_handle::parse_verbosity(&raw);
            if let Err(err) = guard.set_verbosity(Some(v)) {
                return format::err(err);
            }
        }
        let snap = sdk_handle::EndpointSnapshot {
            rpc_address: guard.get_rpc_address(None),
            node_address: guard.get_node_address(None),
            verbosity: format!("{:?}", guard.get_verbosity(None)),
        };
        format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
        }))
    }
}

fn help_text() -> String {
    let snap = sdk_handle::endpoint_snapshot();
    let groups = tools::enabled_tool_groups().join(", ");
    let pending = tools::pending_tool_placeholders().join("\n  - ");
    format!(
        r#"casper-rust-wasm-sdk-mcp {version}

Transports
  stdio (default)  |  --http / CASPER_SDK_MCP_HTTP  listen CASPER_SDK_MCP_ADDR (default {listen})

Env (SDK)
  {rpc_env}   JSON-RPC URL   (default {rpc_default})
  {node_env}  binary port    (default {node_default})
  {verb_env}  low|medium|high|0|1|2 (default low)

Current endpoints
  rpc_address  = {rpc}
  node_address = {node}
  verbosity    = {verbosity}

Enabled feature groups
  {groups}

Always-on tools
  - sdk_help
  - sdk_get_endpoints
  - sdk_set_endpoints

Pending tool groups (see mcp/TOOLS.md)
  - {pending}

Compose with sibling MCPs: casper-nctl-2-docker (:8788), kms-secp256k1-api (:8789).
"#,
        version = env!("CARGO_PKG_VERSION"),
        listen = DEFAULT_HTTP_LISTEN,
        rpc_env = sdk_handle::ENV_RPC_URL,
        node_env = sdk_handle::ENV_NODE_URL,
        verb_env = sdk_handle::ENV_VERBOSITY,
        rpc_default = sdk_handle::DEFAULT_RPC_URL,
        node_default = sdk_handle::DEFAULT_NODE_URL,
        rpc = snap.rpc_address,
        node = snap.node_address,
        verbosity = snap.verbosity,
        groups = groups,
        pending = pending,
    )
}

/// Serves MCP over stdio until the client disconnects.
pub async fn run() -> Result<(), McpError> {
    let transport = StdioTransport::new();
    let server = ServerBuilder::new(CasperSdkMcp)
        .with_tools(CasperSdkMcp)
        .build();
    server.serve(transport).await
}

/// Serves MCP over Streamable HTTP until the process is stopped.
pub async fn run_http(addr: &str) -> std::io::Result<()> {
    McpRouter::new(CasperSdkMcp).serve(addr).await
}

impl ResourceHandler for CasperSdkMcp {
    async fn list_resources(&self, _ctx: &Context<'_>) -> Result<Vec<Resource>, McpError> {
        Ok(Vec::new())
    }

    async fn read_resource(
        &self,
        uri: &str,
        _ctx: &Context<'_>,
    ) -> Result<Vec<ResourceContents>, McpError> {
        Err(McpError::invalid_params(
            "resources/read",
            format!("unknown resource: {uri}"),
        ))
    }
}

impl PromptHandler for CasperSdkMcp {
    async fn list_prompts(&self, _ctx: &Context<'_>) -> Result<Vec<Prompt>, McpError> {
        Ok(Vec::new())
    }

    async fn get_prompt(
        &self,
        name: &str,
        _args: Option<serde_json::Map<String, serde_json::Value>>,
        _ctx: &Context<'_>,
    ) -> Result<GetPromptResult, McpError> {
        Err(McpError::invalid_params(
            "prompts/get",
            format!("unknown prompt: {name}"),
        ))
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn mcp_server_version_matches_crate() {
        let src = include_str!("server.rs");
        let needle = format!(
            r#"#[mcp_server(name = "casper-rust-wasm-sdk", version = "{}")]"#,
            env!("CARGO_PKG_VERSION")
        );
        assert!(
            src.contains(&needle),
            "bump #[mcp_server(version = …)] to {} when changing Cargo.toml version",
            env!("CARGO_PKG_VERSION")
        );
    }
}
