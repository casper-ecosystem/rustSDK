# MCP patterns

How this product's `mcp/` crate is laid out, built, and run.

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
    server.rs           # #[tool_router] + ServerHandler + version test
    tool_args.rs        # Parameters<T> JSON-schema structs
    sdk_handle.rs       # SDK::new from env
    format.rs           # Result → CallToolResult
    tools/              # feature-gated tool modules
```

Keep rmcp **out** of the root wasm SDK `Cargo.toml`.

---

## Cargo.toml

```toml
edition = "2021"
rust-version = "1.88"

anyhow = "1"
axum = { version = "0.8", default-features = false, features = ["http1", "tokio", "json"] }
clap = { version = "4", features = ["derive", "env"] }
rmcp = { version = "3.1.2", default-features = false, features = [
  "server",
  "macros",
  "transport-io",
  "transport-streamable-http-server",
] }
schemars = "1"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["env-filter"] }

casper-rust-wasm-sdk = { path = ".." }
```

Features: `default = ["full"]`, `full = ["rpc", "binary-port", "transaction", "deploy", "contract", "helpers", "write", "watcher"]`.

**Workspace:** root must be a workspace with `members = [".", "mcp"]` so `[patch.crates-io]` applies.

---

## CLI + env

| Flag       | Env                   | Default        |
| ---------- | --------------------- | -------------- |
| `--http`   | `MCP_HTTP`            | false (stdio)  |
| `--listen` | `CASPER_SDK_MCP_ADDR` | `0.0.0.0:5790` |

SDK env: `CASPER_RPC_URL`, `CASPER_NODE_URL`, `CASPER_VERBOSITY`, `RUST_LOG`.

HTTP MCP for this product: **`5790`**. Webclient SPA proxies `/mcp` on **`8080`**.

---

## Logging

- Writer: **stderr**
- Default filter: **warn** (`RUST_LOG` override)
- `with_ansi(false)` - avoid ANSI so clients do not treat colored stderr as errors

---

## Transports

```rust
pub async fn run() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let server = CasperSdkMcp;
    let service = server.serve(stdio()).await?;
    service.waiting().await?;
    Ok(())
}

pub async fn run_http(addr: &str) -> std::io::Result<()> {
    let service = StreamableHttpService::new(|| Ok(CasperSdkMcp), /* session mgr */, config);
    let app = axum::Router::new()
        .route("/mcp", axum::routing::any_service(service));
    axum::serve(listener, app).await
}
```

Tools only (`ServerHandler::get_info` enables tools). No resource/prompt handlers.

---

## Version sync test

```rust
let info = CasperSdkMcp.get_info();
assert_eq!(info.server_info.version, env!("CARGO_PKG_VERSION"));
assert_eq!(info.server_info.name.as_ref(), "casper-rust-wasm-sdk");
```

---

## Makefile targets

| Target         | Role                                      |
| -------------- | ----------------------------------------- |
| `mcp-build`    | release build of mcp package              |
| `run-mcp`      | stdio (host cargo)                        |
| `mcp-http`     | slim Docker → `http://127.0.0.1:5790/mcp` |
| `run-mcp-http` | host cargo HTTP on `127.0.0.1:5790`       |
| `mcp-test`     | `cargo test -p casper-rust-wasm-sdk-mcp`  |

Cursor/agents image: `interchouette/casper-rust-wasm-sdk-mcp:{dev,latest,$APP_VERSION}`. SPA embeds the same binary: `interchouette/casper-webclient`. See [mcp.json.example](mcp.json.example).

---

## Layout notes

| Choice                         | Why                                               |
| ------------------------------ | ------------------------------------------------- |
| Separate `mcp/` crate, rmcp    | keep rmcp off the wasm root crate                 |
| Path-dep on SDK lib            | in-process tools, not an HTTP proxy of the SDK    |
| clap `--http` / `--listen`     | stdio or Streamable HTTP from one binary          |
| Slim Hub image for agents      | Cursor pulls MCP without SPA/Node layers          |
| MCP also embedded in webclient | SPA `:8080` + loopback MCP `:5790` + `/mcp` proxy |
| stderr warn logging            | quiet default for MCP clients                     |
