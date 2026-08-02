# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** sidecar (`casper-rust-wasm-sdk-mcp`) exposing the native SDK API as MCP tools (in-process path dependency — not an HTTP proxy of the SDK).

Inventory: [TOOLS.md](TOOLS.md). Patterns: [PATTERNS.md](PATTERNS.md). Cursor config sample: [mcp.json.example](mcp.json.example).

## Transports

| Mode | Command | Use |
| --- | --- | --- |
| **stdio (Docker)** | see [mcp.json.example](mcp.json.example) `…-stdio` | Cursor spawn via image |
| **stdio (host)** | `make run-mcp` | Local Cursor spawn |
| **HTTP (Docker)** | `make mcp-http` | Streamable HTTP on **8790** |
| **HTTP (host)** | `make run-mcp-http` | Same URL without Docker |

```bash
make mcp-docker-build   # image casper-rust-wasm-sdk-mcp:2.2.2
make mcp-http           # docker compose → http://127.0.0.1:8790/mcp
make mcp-http-stop
make run-mcp            # stdio (host)
make run-mcp-http       # HTTP host
make mcp-test
make mcp-test-live      # ignored tests vs live NCTL (CASPER_RPC_URL)
```

Family ports: 8787 tvs / 8788 nctl / 8789 kms / **8790 sdk**.

## Env

| Variable | Role | Default |
| --- | --- | --- |
| `CASPER_SDK_MCP_HTTP` | Use HTTP transport | off (host) / on (image) |
| `CASPER_SDK_MCP_ADDR` | HTTP bind | `0.0.0.0:8790` |
| `CASPER_RPC_URL` | JSON-RPC | `http://127.0.0.1:11101` |
| `CASPER_NODE_URL` | Binary port | `127.0.0.1:28101` |
| `CASPER_VERBOSITY` | `low` / `medium` / `high` | `low` |
| `RUST_LOG` | tracing filter (stderr, no ANSI) | `warn` |

Docker containers reach host NCTL via `host.docker.internal` (compose sets `extra_hosts`).

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

Complex inputs use JSON strings — see [TOOLS.md](TOOLS.md) and `tools/params.rs`.

## Cursor

**Active** [`.cursor/mcp.json`](../.cursor/mcp.json):

| Server | Transport | Backing |
| --- | --- | --- |
| `casper-rust-wasm-sdk` | HTTP `:8790/mcp` | Docker image via `make mcp-http` |
| `casper-rust-wasm-sdk-stdio-docker` | stdio | Same image (`docker run -i …`) |

Both use image `casper-rust-wasm-sdk-mcp:2.2.2`. Cargo stdio is optional in [mcp.json.example](mcp.json.example) only (slow cold start).

Prerequisite: `make mcp-docker-build` once; keep HTTP up with `make mcp-http`.

Agents must use MCP for NCTL/chain access (`.cursor/rules/sdk-use-mcp-nctl.mdc`).

## Smoke

| Check | Result |
| --- | --- |
| Feature-matrix builds + unit tests | pass (Phase 7) |
| HTTP `initialize` on `:8790/mcp` | pass |
| Live NCTL `sdk_get_node_status` / `sdk_get_peers` | **pass** (NCTL 2.2 on `:11101`) |
| Docker HTTP `make mcp-http` + `tools/call` | **pass** |
| Docker stdio `docker run -i` initialize | **pass** |
| Host / cargo stdio initialize | **pass** |
