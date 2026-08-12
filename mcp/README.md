# MCP server for casper-rust-wasm-sdk

Rust **rmcp** crate (`casper-rust-wasm-sdk-mcp`) exposing the native SDK API as MCP tools (in-process path dependency, not an HTTP proxy of the SDK).

Points at **your** Casper JSON-RPC / binary-port endpoints (`CASPER_RPC_URL`, `CASPER_NODE_URL`). No cloud indexer, no API key for chain data.

**Hub images:**

| Image | Role |
| ----- | ---- |
| **`interchouette/casper-rust-wasm-sdk-mcp`** | Slim MCP binary (stdio / HTTP `:5790`) |
| **`interchouette/casper-webclient`** | SPA demo; embeds the same binary (`ENABLE_MCP=1`, `/mcp` on `:8080`) |

Inventory: [TOOLS.md](TOOLS.md). Patterns: [PATTERNS.md](PATTERNS.md). Client sample: [mcp.json.example](mcp.json.example).

## Transports

**stdio** – client launches the binary (or `docker run -i …`). Default for editor MCP configs.

**HTTP** – Streamable HTTP on path `/mcp`. You start the listener first; the client only needs the URL. No auth headers.

| Mode | How | URL / notes |
| ---- | --- | ----------- |
| **HTTP (Docker)** | `make mcp-http` | `http://127.0.0.1:5790/mcp` |
| **HTTP (host)** | `make run-mcp-http` | same URL |
| **Hosted** | webclient with MCP on | `https://casper-webclient.interchouette.net/mcp` |
| **stdio (Docker)** | Hub image in [mcp.json.example](mcp.json.example) | `:dev` (tip) / `:latest` = stable (e.g. `2.2.2`) |
| **stdio (host)** | `make run-mcp` | cargo debug |

```bash
make mcp-http           # slim image → http://127.0.0.1:5790/mcp
make mcp-http-stop
make run-mcp            # stdio (host cargo)
make run-mcp-http       # HTTP host on 127.0.0.1:5790
make mcp-test
make mcp-test-live      # ignored tests vs live local node (CASPER_RPC_URL)
```

Docker containers reach the host node via `host.docker.internal`.

## Connect over HTTP

1. `make mcp-http` (or use the hosted URL above).
2. Point the MCP client at the URL. Example from [mcp.json.example](mcp.json.example):

```json
{
  "mcpServers": {
    "casper-rust-wasm-sdk-http": {
      "url": "http://127.0.0.1:5790/mcp"
    }
  }
}
```

Any client that speaks Streamable HTTP MCP can use the same URL (local or hosted). stdio blocks live in the same example file.

## Env

| Variable              | Role                                    | Default                                                     |
| --------------------- | --------------------------------------- | ----------------------------------------------------------- |
| `ENABLE_MCP`          | Start MCP inside webclient (`web` mode) | `1`                                                         |
| `MCP_HTTP`            | Use HTTP transport (binary)             | off (stdio) / on (Docker HTTP / web loopback)               |
| `CASPER_SDK_MCP_ADDR` | HTTP bind                               | `0.0.0.0:5790` (slim / host) / `127.0.0.1:5790` (webclient) |
| `CASPER_RPC_URL`      | JSON-RPC                                | `http://127.0.0.1:11101`                                    |
| `CASPER_NODE_URL`     | Binary port                             | `127.0.0.1:28101`                                           |
| `CASPER_VERBOSITY`    | `low` / `medium` / `high`               | `low`                                                       |
| `RUST_LOG`            | tracing filter (stderr, no ANSI)        | `warn`                                                      |

## Features

MCP features enable the matching SDK features (`casper-rust-wasm-sdk` is `default-features = false`). Default is `full`.

| Feature          | Tools                                                   | SDK feature                       |
| ---------------- | ------------------------------------------------------- | --------------------------------- |
| _(always)_       | `sdk_help`, `sdk_get_endpoints`, `sdk_set_endpoints`    | core RPC                          |
| `helpers`        | utilities (keys, blake2b, motes, …)                     | `helpers`                         |
| `rpc`            | JSON-RPC reads + speculative RPC                        | (always on in SDK)                |
| `binary-port`    | binary-port queries (needs `CASPER_NODE_URL`)           | `binary-port`                     |
| `transaction`    | make / speculative transaction builders                 | `transaction`                     |
| `deploy`         | legacy make / speculative deploy builders               | `deploy`                          |
| `contract`       | `query_contract_dict`, `query_contract_key`             | `contract`                        |
| `write`          | sign/put/submit, install, call_entrypoint, `try_accept` | `transaction`+`deploy`+`contract` |
| `SSE`            | wait, `SSE_collect`, CES parse                          | `SSE`                             |
| `full` (default) | all of the above                                        | all SDK features gated above      |

```bash
cargo build -p casper-rust-wasm-sdk-mcp
```

## Tools

**helpers** (18) · **rpc** (22) · **binary-port** (33) · **transaction** (4) · **deploy** (4) · **contract** (2) · **write** (13).

Complex inputs use JSON strings — see [TOOLS.md](TOOLS.md) and `tools/params.rs`.

## MCP client config

Hub tags: **`dev`** (tip), **`latest`** = current stable semver (e.g. **`2.2.2`**). GitHub Pre-release **`dev-preview`** is overwritten after green `nightly-test` and attaches tip Electron (exe / AppImage / snap), the MCP linux binary, and the Casperatatui linux binary (not Latest).

| Server name (example)       | Mode  | Backing                                                       |
| --------------------------- | ----- | ------------------------------------------------------------- |
| `casper-rust-wasm-sdk`      | stdio | `interchouette/casper-rust-wasm-sdk-mcp:dev`                  |
| `casper-rust-wasm-sdk-http` | HTTP  | `http://127.0.0.1:5790/mcp` (slim) or hosted webclient `/mcp` |

Full sample: [mcp.json.example](mcp.json.example).
