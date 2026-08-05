# Phase 0 — MCP patterns to copy

Primary templates: **kms-secp256k1-api/mcp** (best overall) + **casper-nctl-2-docker/mcp**.
tvscreener-rs = in-crate MCP; use it only for path-dep-on-lib style of tool bodies.

---

## Layout (sidecar)

```
mcp/
  Cargo.toml
  README.md
  mcp.json.example
  TOOLS.md              # Phase 0 checklist
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
| `--http`   | `CASPER_SDK_MCP_HTTP` | false (stdio)  |
| `--listen` | `CASPER_SDK_MCP_ADDR` | `0.0.0.0:8790` |

SDK env: `CASPER_RPC_URL`, `CASPER_NODE_URL`, `CASPER_VERBOSITY`, `RUST_LOG`.

Ports in family: 8787 tvs / 8788 nctl / 8789 kms / **8790 sdk**.

---

## Logging (copy kms)

- Writer: **stderr**
- Default filter: **warn** (`RUST_LOG` override)
- `with_ansi(false)` — Cursor treats stderr noise as `[error]`

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

## Version sync test (prefer kms needle)

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
| `run-mcp-http` | host cargo HTTP on `127.0.0.1:8081` (not NCTL `:8790`) |
| `mcp-test` | `cargo test -p casper-rust-wasm-sdk-mcp` |

Runtime image: `interchouette/casper-webclient:{dev,latest}`. See [mcp.json.example](mcp.json.example).

---

## Copy vs differ

| Copy from kms/nctl | Differ for rustSDK |
| --- | --- |
| Separate `mcp/` crate, mcpkit 0.7 | Path-dep on SDK lib (in-process) |
| clap `--http` / `--listen` | MCP embedded in webclient image |
| stderr warn logging | No HTTP client to wrap an API |
| `run` / `run_http` + empty resources/prompts | Host `:8790` is NCTL; use `:8080/mcp` |
| Version sync test | Keep mcpkit off wasm root crate |
