# casper-rust-wasm-sdk-py

PyO3 + maturin bindings over [`casper-rust-wasm-sdk`](../) for [#9](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/9).

Not a port of the SDK into Python. Same Rust `rlib`, thin Python face (like Wasm / MCP). Initial surface only; expand incrementally.

## Surface

| Function | Behavior |
| --- | --- |
| `get_node_status(rpc_address=None)` | JSON-RPC `info_get_status` → dict (`chainspec_name`, `build_version`, `api_version`, `json`) |
| `make_signed_transfer(...)` | Make + sign a native transfer (no put) → transaction JSON |
| `generate_secret_key_pem()` / `public_key_hex(pem)` | Local key helpers |
| `version()` | Extension package version |

Async SDK calls use an owned tokio multi-thread runtime and `block_on` inside the pyfunction.

## Isolation

- Package lives under [`python/`](./); path-depends on the repo root crate with `default-features = false` and `transaction` + `helpers` only.
- Not part of the default Cargo build / CI clippy matrix for the Wasm SDK (build via maturin in this directory).
- No change to default features or Wasm packs.

## Build (local)

Requires a CPython 3.10+ venv, Rust toolchain, and (for the status smoke) a reachable JSON-RPC node.

```bash
cd python
uv venv .venv
source .venv/bin/activate
uv pip install maturin
maturin develop
python -c "import casper_rust_wasm_sdk_py as m; print(m.get_node_status('http://127.0.0.1:11101/rpc')['chainspec_name'])"
```

Use the venv interpreter (`python` after `source .venv/bin/activate`, or `.venv/bin/python`). System `python3` will not see the wheel.

## Example

```python
import casper_rust_wasm_sdk_py as casper

RPC = "http://127.0.0.1:11101/rpc"

status = casper.get_node_status(RPC)
print(status["chainspec_name"], status["build_version"])

pem = casper.generate_secret_key_pem()
sender = casper.public_key_hex(pem)
tx_json = casper.make_signed_transfer(
    target=sender,
    amount="2500000000",
    chain_name=status["chainspec_name"],
    secret_key_pem=pem,
    payment_amount="100000000",
    rpc_address=RPC,
)
print(tx_json[:120], "...")
```
