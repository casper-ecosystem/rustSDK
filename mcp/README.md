# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** sidecar (`casper-rust-wasm-sdk-mcp`) exposing the SDK as MCP tools.

See [TOOLS.md](TOOLS.md) and [PATTERNS.md](PATTERNS.md).

## Transports

| Mode      | Command                                           | Use                                  |
| --------- | ------------------------------------------------- | ------------------------------------ |
| **stdio** | `cargo run -p casper-rust-wasm-sdk-mcp`           | Local Cursor spawn                   |
| **HTTP**  | `cargo run -p casper-rust-wasm-sdk-mcp -- --http` | Streamable HTTP on **8790** → `/mcp` |

## Env

| Variable              | Role                      | Default                  |
| --------------------- | ------------------------- | ------------------------ |
| `CASPER_SDK_MCP_HTTP` | Use HTTP transport        | off                      |
| `CASPER_SDK_MCP_ADDR` | HTTP bind                 | `0.0.0.0:8790`           |
| `CASPER_RPC_URL`      | JSON-RPC                  | `http://127.0.0.1:11101` |
| `CASPER_NODE_URL`     | Binary port               | `127.0.0.1:28101`        |
| `CASPER_VERBOSITY`    | `low` / `medium` / `high` | `low`                    |
| `RUST_LOG`            | tracing filter            | `warn`                   |

## Build

```bash
cargo build -p casper-rust-wasm-sdk-mcp
cargo run -p casper-rust-wasm-sdk-mcp -- --help
```

Slim feature set:

```bash
cargo build -p casper-rust-wasm-sdk-mcp --no-default-features --features "rpc,helpers"
```

## Tools (Phase 3–5)

Always on: `sdk_help`, `sdk_get_endpoints`, `sdk_set_endpoints`.

**helpers** (18): timestamp, blake2b, dictionary key, CEP-18 base64 keys, TTL/gas, keygen, hex, motes, JSON/CLValue helpers.

**rpc** (22): node status, peers, chainspec, blocks, balances, entity/account, transaction/deploy lookups, dictionary/global state, speculative exec, `list_rpcs`.

**binary-port** (33): headers/blocks, peers/status/uptime, rewards, global state, speculative execution, protocol version (needs `CASPER_NODE_URL`).

**transaction** (4): make / make_transfer / speculative builders.

**deploy** (4): legacy make / speculative builders.

**contract** (2): `query_contract_dict`, `query_contract_key`.

**write** (13): sign/put/submit transaction & deploy, install, call_entrypoint, binary `try_accept`.

Complex inputs use JSON strings — see `mcp/TOOLS.md` and `tools/params.rs` (`transaction_params_json`, `builder_params_json`, …).
