# MCP patterns

How this product’s `mcp/` crate is laid out, built, and run.

---

## Layout (sidecar)

```
mcp/
  Cargo.toml
  README.md
  mcp.json.example
  TOOLS.md              # tool inventory checklist
  PATTERNS.md           # this file
  src/
    main.rs             # clap + init_logging + run/run_http
    lib.rs              # mods + re-exports
    server.rs           # #[mcp_server] + handlers + version test
    sdk_handle.rs       # SDK::new from env
    format.rs           # Result → ToolOutput
    tools/              # feature-gated tool modules
```

Keep mcpkit **out** of the root wasm SDK `Cargo.toml`.

---

## Cargo.toml

```toml
edition = "2021"
rust-version = "1.85"

anyhow = "1"
clap = { version = "4", features = ["derive", "env"] }
mcpkit = "0.7"
mcpkit-axum = "0.7"
serde_json = "1"
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

casper-rust-wasm-sdk = { path = ".." }
```

Features: `default = ["full"]`, `full = ["rpc", "binary-port", "transaction", "deploy", "contract", "helpers", "write"]`.

Release profile (family): `lto`, `codegen-units=1`, `panic=abort`, `strip=symbols`, `opt-level=s`.

**Workspace:** root must be a workspace with `members = [".", "mcp"]` so `[patch.crates-io]` applies.

---

## CLI + env

| Flag       | Env                   | Default        |
| ---------- | --------------------- | -------------- |
| `--http`   | `MCP_HTTP` | false (stdio)  |
| `--listen` | `CASPER_SDK_MCP_ADDR` | `0.0.0.0:5790` |

SDK env: `CASPER_RPC_URL`, `CASPER_NODE_URL`, `CASPER_VERBOSITY`, `RUST_LOG`.

HTTP MCP for this product: **`5790`**. Webclient SPA proxies `/mcp` on **`8080`**.

---

## Logging

- Writer: **stderr**
- Default filter: **warn** (`RUST_LOG` override)
- `with_ansi(false)` — avoid ANSI so clients do not treat colored stderr as errors

---

## Transports

```rust
pub async fn run() -> Result<(), McpError> {
    let transport = StdioTransport::new();
    let server = ServerBuilder::new(Handle)
        .with_tools(Handle)
        .build();
    server.serve(transport).await
}

pub async fn run_http(addr: &str) -> std::io::Result<()> {
    McpRouter::new(Handle).serve(addr).await
}
```

Stub empty `ResourceHandler` / `PromptHandler` (`invalid_params` on unknown).

---

## Version sync test

```rust
let needle = format!(
    r#"#[mcp_server(name = "casper-rust-wasm-sdk", version = "{}")]"#,
    env!("CARGO_PKG_VERSION")
);
assert!(include_str!("server.rs").contains(&needle));
```

---

## Makefile targets

| Target | Role |
| --- | --- |
| `mcp-build` | release build of mcp package |
| `run-mcp` | stdio (host cargo) |
| `mcp-http` | webclient Docker → `http://127.0.0.1:8080/mcp` |
| `run-mcp-http` | host cargo HTTP on `127.0.0.1:5790` |
| `mcp-test` | `cargo test -p casper-rust-wasm-sdk-mcp` |

Runtime image: `interchouette/casper-webclient:{dev,latest,$APP_VERSION}`. See [mcp.json.example](mcp.json.example).

---

## Layout notes

| Choice | Why |
| --- | --- |
| Separate `mcp/` crate, mcpkit | keep mcpkit off the wasm root crate |
| Path-dep on SDK lib | in-process tools, not an HTTP proxy of the SDK |
| clap `--http` / `--listen` | stdio or Streamable HTTP from one binary |
| MCP embedded in webclient image | SPA `:8080` + loopback MCP `:5790` + `/mcp` proxy |
| stderr warn logging | quiet default for MCP clients |
