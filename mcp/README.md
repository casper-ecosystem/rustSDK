# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** crate (`casper-rust-wasm-sdk-mcp`) exposing the native SDK API as MCP tools (in-process path dependency — not an HTTP proxy of the SDK).

**Runtime image:** MCP ships inside **`interchouette/casper-webclient`** (`:dev` / `:latest`). There is no separate Hub image for Cursor anymore; the slim `casper-rust-wasm-sdk-mcp` Hub repo is deprecated.

Inventory: [TOOLS.md](TOOLS.md). Patterns: [PATTERNS.md](PATTERNS.md). Cursor sample: [mcp.json.example](mcp.json.example). Active Cursor config: [`.cursor/mcp.json`](../.cursor/mcp.json) (itc-cursor product branch).

## Transports

| Mode | How | URL / notes |
| --- | --- | --- |
| **Hosted** | Render webclient | `https://casper-webclient.interchouette.net/mcp` |
| **HTTP (Docker)** | `make mcp-http` → webclient SPA | `http://127.0.0.1:8080/mcp` (`ENABLE_MCP=1`) |
| **stdio (Docker)** | Cursor / `docker run -i … --entrypoint casper-rust-wasm-sdk-mcp` | `interchouette/casper-webclient:dev` |
| **stdio (host)** | `make run-mcp` | cargo; for local debug |
| **HTTP (host)** | `make run-mcp-http` | cargo; **do not bind host `:8790`** (NCTL owns it) |

```bash
make mcp-http           # webclient → http://127.0.0.1:8080/mcp
make mcp-http-stop
make run-mcp            # stdio (host cargo)
make run-mcp-http       # HTTP host on 127.0.0.1:8081 (avoids NCTL :8790)
make mcp-test
make mcp-test-live      # ignored tests vs live NCTL (CASPER_RPC_URL)
```

Shared host MCP HTTP ports: tvscreener `6790`, KMS `7790`, **NCTL `8790`**, evaluator `9790`. This product does **not** own a host MCP port; use webclient `:8080/mcp` or cargo `:8081`.

## Env

| Variable | Role | Default |
| --- | --- | --- |
| `ENABLE_MCP` | Start MCP inside webclient (`web` mode) | `1` |
| `CASPER_SDK_MCP_HTTP` | Use HTTP transport (binary) | off (stdio) / on (web loopback) |
| `CASPER_SDK_MCP_ADDR` | HTTP bind inside container | `127.0.0.1:8790` (loopback only) |
| `CASPER_RPC_URL` | JSON-RPC | `http://127.0.0.1:11101` |
| `CASPER_NODE_URL` | Binary port | `127.0.0.1:28101` |
| `CASPER_VERBOSITY` | `low` / `medium` / `high` | `low` |
| `RUST_LOG` | tracing filter (stderr, no ANSI) | `warn` |

Docker containers reach host NCTL via `host.docker.internal`.

## Features

MCP features enable the matching SDK features (`casper-rust-wasm-sdk` is `default-features = false`). Default is `full`.

| Feature | Tools | SDK feature |
| --- | --- | --- |
| _(always)_ | `sdk_help`, `sdk_get_endpoints`, `sdk_set_endpoints` | core RPC |
| `helpers` | utilities (keys, blake2b, motes, …) | `helpers` |
| `rpc` | JSON-RPC reads + speculative RPC | (always on in SDK) |
| `binary-port` | binary-port queries (needs `CASPER_NODE_URL`) | `binary-port` |
| `transaction` | make / speculative transaction builders | `transaction` |
| `deploy` | legacy make / speculative deploy builders | `deploy` |
| `contract` | `query_contract_dict`, `query_contract_key` | `contract` |
| `write` | sign/put/submit, install, call_entrypoint, `try_accept` | `transaction`+`deploy`+`contract` |
| `full` (default) | all of the above | all SDK optional features |

```bash
cargo build -p casper-rust-wasm-sdk-mcp
```

## Tools

**helpers** (18) · **rpc** (22) · **binary-port** (33) · **transaction** (4) · **deploy** (4) · **contract** (2) · **write** (13).

Complex inputs use JSON strings — see [TOOLS.md](TOOLS.md) and `tools/params.rs`.

## Cursor

| Server | Transport | Backing |
| --- | --- | --- |
| `casper-rust-wasm-sdk` | stdio | `interchouette/casper-webclient:dev` via `.cursor/scripts/sdk-mcp.sh` |
| `casper-rust-wasm-sdk-http` | HTTP (mcp-remote) | same image; `http://127.0.0.1:8080/mcp` |

Hub webclient tags: **`dev`**, **`latest`** only. See [mcp.json.example](mcp.json.example). Agents must use `CallMcpTool` (`.cursor/rules/casper-sdk-use-mcp.mdc`).

## Smoke

```bash
make mcp-smoke   # needs NCTL up + webclient image (make mcp-http)
```
