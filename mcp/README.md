# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** sidecar (`casper-rust-wasm-sdk-mcp`) exposing the native SDK API as MCP tools (in-process path dependency — not an HTTP proxy of the SDK).

Inventory: [TOOLS.md](TOOLS.md). Patterns: [PATTERNS.md](PATTERNS.md). Cursor config sample: [mcp.json.example](mcp.json.example).

## Transports

| Mode | Command | Use |
| --- | --- | --- |
| **stdio** | `make run-mcp` | Local Cursor spawn |
| **HTTP** | `make mcp-http` / `make run-mcp-http` | Streamable HTTP on **8790** → `http://127.0.0.1:8790/mcp` |

```bash
make mcp-build          # release binary → target/release/casper-rust-wasm-sdk-mcp
make run-mcp            # stdio
make mcp-http           # HTTP :8790
make mcp-test
```

Family ports: 8787 tvs / 8788 nctl / 8789 kms / **8790 sdk**.

## Env

| Variable | Role | Default |
| --- | --- | --- |
| `CASPER_SDK_MCP_HTTP` | Use HTTP transport | off |
| `CASPER_SDK_MCP_ADDR` | HTTP bind | `0.0.0.0:8790` |
| `CASPER_RPC_URL` | JSON-RPC | `http://127.0.0.1:11101` |
| `CASPER_NODE_URL` | Binary port | `127.0.0.1:28101` |
| `CASPER_VERBOSITY` | `low` / `medium` / `high` | `low` |
| `RUST_LOG` | tracing filter (stderr, no ANSI) | `warn` |

## Features

| Feature | Tools |
| --- | --- |
| *(always)* | `sdk_help`, `sdk_get_endpoints`, `sdk_set_endpoints` |
| `helpers` | utilities (keys, blake2b, motes, …) |
| `rpc` | JSON-RPC reads + speculative RPC |
| `binary-port` | binary-port queries (needs `CASPER_NODE_URL`) |
| `transaction` | make / speculative transaction builders |
| `deploy` | legacy make / speculative deploy builders |
| `contract` | `query_contract_dict`, `query_contract_key` |
| `write` | sign/put/submit, install, call_entrypoint, `try_accept` |
| `full` (default) | all of the above |

```bash
cargo build -p casper-rust-wasm-sdk-mcp
cargo build -p casper-rust-wasm-sdk-mcp --no-default-features --features "rpc,helpers"
```

> mcpkit may still compile tool handlers when a feature is off; `sdk_help` lists only enabled groups.

## Tools

**helpers** (18) · **rpc** (22) · **binary-port** (33) · **transaction** (4) · **deploy** (4) · **contract** (2) · **write** (13).

Complex inputs use JSON strings — see [TOOLS.md](TOOLS.md) and `tools/params.rs` (`transaction_params_json`, `builder_params_json`, …).

## Cursor

Copy an entry from [mcp.json.example](mcp.json.example) into `.cursor/mcp.json`:

1. Start HTTP with `make mcp-http`, then use the `…-http` URL entry; **or**
2. Use `…-stdio-cargo` for spawn-from-source; **or**
3. `make mcp-build` then `…-stdio-host` for the release binary.

Point `CASPER_RPC_URL` / `CASPER_NODE_URL` at NCTL (or another node). Compose with **casper-nctl-2-docker** MCP (:8788) for network lifecycle and **kms-secp256k1-api** MCP (:8789) for KMS signing if needed — this sidecar owns SDK calls only.
