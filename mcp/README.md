# MCP server for casper-rust-wasm-sdk

Rust **mcpkit** sidecar (`casper-rust-wasm-sdk-mcp`) exposing the SDK as MCP tools.

> Phase 1: workspace stub that path-depends on the SDK. Stdio / HTTP server and tools land in later phases.

See [TOOLS.md](TOOLS.md) and [PATTERNS.md](PATTERNS.md).

## Build

From the repo root (workspace):

```bash
cargo build -p casper-rust-wasm-sdk-mcp
cargo run -p casper-rust-wasm-sdk-mcp
```

Slim feature set:

```bash
cargo build -p casper-rust-wasm-sdk-mcp --no-default-features --features "rpc,helpers"
```

## Planned transports (Phase 2+)

| Mode      | Command                       | Use                |
| --------- | ----------------------------- | ------------------ |
| **stdio** | `casper-rust-wasm-sdk-mcp`    | Local Cursor spawn |
| **HTTP**  | `--http` on **8790** → `/mcp` | Streamable HTTP    |
