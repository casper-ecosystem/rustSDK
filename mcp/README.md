# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** sidecar (`casper-rust-wasm-sdk-mcp`) exposing the SDK as MCP tools.

See [TOOLS.md](TOOLS.md) and [PATTERNS.md](PATTERNS.md).

## Transports

| Mode | Command | Use |
| --- | --- | --- |
| **stdio** | `cargo run -p casper-rust-wasm-sdk-mcp` | Local Cursor spawn |
| **HTTP** | `cargo run -p casper-rust-wasm-sdk-mcp -- --http` | Streamable HTTP on **8790** → `/mcp` |

## Env

| Variable | Role | Default |
| --- | --- | --- |
| `CASPER_SDK_MCP_HTTP` | Use HTTP transport | off |
| `CASPER_SDK_MCP_ADDR` | HTTP bind | `0.0.0.0:8790` |
| `CASPER_RPC_URL` | JSON-RPC | `http://127.0.0.1:11101` |
| `CASPER_NODE_URL` | Binary port | `127.0.0.1:28101` |
| `CASPER_VERBOSITY` | `low` / `medium` / `high` | `low` |
| `RUST_LOG` | tracing filter | `warn` |

## Build

```bash
cargo build -p casper-rust-wasm-sdk-mcp
cargo run -p casper-rust-wasm-sdk-mcp -- --help
```

Slim feature set:

```bash
cargo build -p casper-rust-wasm-sdk-mcp --no-default-features --features "rpc,helpers"
```

## Tools (Phase 2)

Always on: `sdk_help`, `sdk_get_endpoints`, `sdk_set_endpoints`.  
Feature groups (`helpers`, `rpc`, …) land in Phases 3–5 — see TOOLS.md.
