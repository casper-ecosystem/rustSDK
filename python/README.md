# casper-rust-wasm-sdk-py

PyO3 + maturin bindings over [`casper-rust-wasm-sdk`](../) for [#9](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/9) / [#120](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/120).

Not a port of the SDK into Python. Same Rust `rlib`, thin Python face (like Wasm / MCP). Expand by wave; Deploy path and binary-port are out of scope for this epic.

## Surface

### Spike (kept)

| Function                                            | Behavior                                                                                     |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `get_node_status(rpc_address=None)`                 | JSON-RPC `info_get_status` → dict (`chainspec_name`, `build_version`, `api_version`, `json`) |
| `make_signed_transfer(...)`                         | Make + sign a native transfer (no put) → transaction JSON                                    |
| `generate_secret_key_pem()` / `public_key_hex(pem)` | Local key helpers                                                                            |
| `version()`                                         | Extension package version                                                                    |

### Wave 1 — JSON-RPC reads (result JSON strings)

Args mirror MCP where practical. Deprecated / deploy paths are not wrapped (`get_deploy`, `get_account`, `get_era_info`, `speculative_exec_deploy`).

| Function                                                              | JSON-RPC                       |
| --------------------------------------------------------------------- | ------------------------------ |
| `get_peers` / `get_chainspec` / `get_validator_changes` / `list_rpcs` | info / discover                |
| `get_block` / `get_block_transfers` / `get_state_root_hash`           | chain                          |
| `get_auction_info` / `get_era_summary` / `get_reward`                 | auction / era / reward         |
| `query_balance` / `query_balance_details` / `get_balance`             | balances                       |
| `get_entity` / `query_global_state` / `get_dictionary_item`           | entity / state                 |
| `get_transaction`                                                     | transaction (not deploy)       |
| `speculative_exec(transaction_json, …)`                               | speculative (transaction only) |

### Wave 2 — Helpers + session meta

Offline helpers (PEM inputs are secrets; `secret_key_from_pem` validates and does not echo the key). Spike aliases `generate_secret_key_pem` / `public_key_hex` remain.

| Function / class                                                                                                 | Behavior                                                        |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `Sdk(rpc_address=None, node_address=None, verbosity=None)`                                                       | Session: get/set RPC, node, verbosity (`low`\|`medium`\|`high`) |
| `get_current_timestamp` / `parse_timestamp` / `get_ttl_or_default` / `parse_ttl` / `get_gas_price_or_default`    | Time / pricing                                                  |
| `get_blake2b_hash` / `make_dictionary_item_key` / `get_base64_key_from_*` / `contract_hash_key_for_global_state` | Hash / key helpers                                              |
| `secret_key_generate` / `secret_key_secp256k1_generate` / `secret_key_from_pem` / `public_key_from_secret_key`   | Keys                                                            |
| `hex_to_uint8_vec` / `hex_to_string` / `motes_to_cspr` / `cl_value_to_json` / `json_pretty_print`                | Bytes / display                                                 |

### Wave 3 — Transaction + contract (no deploy)

Params are JSON strings (same shape as MCP). Builder JSON may set `"runtime": "v1"|"v2"`. `install` / `call_entrypoint` also take optional `runtime_v2` (None/true → V2 on install; call leaves builder unless set).

| Function                                                       | Behavior                                  |
| -------------------------------------------------------------- | ----------------------------------------- |
| `make_transaction` / `make_transfer_transaction`               | Build only → transaction JSON             |
| `sign_transaction` / `put_transaction`                         | Sign PEM / submit                         |
| `transaction` / `transfer_transaction`                         | Build+sign+put                            |
| `speculative_transaction` / `speculative_transfer_transaction` | Speculative (tx path)                     |
| `query_contract_key` / `query_contract_dict`                   | Contract reads                            |
| `install` / `call_entrypoint`                                  | Put install / entrypoint (not `*_deploy`) |

### Wave 4 — Watcher

| Function                                                          | Behavior                     |
| ----------------------------------------------------------------- | ---------------------------- |
| `wait_transaction(events_url, transaction_hash, timeout_ms=None)` | SSE wait (feature `watcher`) |

Async SDK calls use an owned tokio multi-thread runtime and `block_on` inside the pyfunction.

## Isolation

- Package lives under [`python/`](./); path-depends on the repo root crate with `default-features = false` and `transaction` + `helpers` + `contract` + `watcher` (no `deploy`, no `binary-port`).
- Not part of the default Cargo build / CI clippy matrix for the Wasm SDK (build via maturin in this directory).
- No change to default features or Wasm packs.
- CI: separate workflow [`python-bindings`](../.github/workflows/python-bindings.yml) (path-filtered on `python/**`). Does not run inside `ci-test`. Offline smoke only (no NCTL).

## Build (local)

Requires a CPython 3.10+ venv, Rust toolchain, and (for live smokes) a reachable JSON-RPC node.

```bash
cd python
uv venv .venv
source .venv/bin/activate
uv pip install maturin
maturin develop
python -c "import casper_rust_wasm_sdk_py as m; print(m.get_node_status('http://127.0.0.1:11101/rpc'))"
```

Returns a dict (`chainspec_name`, `build_version`, `api_version`, `json`). Print the whole dict for a smoke check; pick fields only when you need them (e.g. `chain_name` for a transfer).

Use the venv interpreter (`python` after `source .venv/bin/activate`, or `.venv/bin/python`). System `python3` will not see the wheel.

From the repo root:

```bash
make python-test          # offline smoke (CI)
make python-test-nctl     # Wave 1 RPC subset against NCTL (local)
```

## Example

```python
import json
import casper_rust_wasm_sdk_py as casper

RPC = "http://127.0.0.1:11101/rpc"

status = casper.get_node_status(RPC)
print(status["chainspec_name"], status["build_version"])

block = json.loads(casper.get_block(None, RPC))
print(list(block.keys()))

srh = json.loads(casper.get_state_root_hash(None, RPC))
print(srh.get("state_root_hash"))

# query_balance / get_entity need a purse identifier (pubkey, account-hash, or uref)
# bal = json.loads(casper.query_balance(pubkey_hex, None, None, RPC))

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

### Other Wave 1 calls (same JSON-string pattern)

```python
json.loads(casper.get_peers(RPC))
json.loads(casper.get_chainspec(RPC))
json.loads(casper.get_validator_changes(RPC))
json.loads(casper.list_rpcs(RPC))
json.loads(casper.get_block_transfers(None, RPC))
json.loads(casper.get_auction_info(None, RPC))
json.loads(casper.get_era_summary(None, RPC))
# get_reward(validator_hex, delegator=None, maybe_era_id=None, rpc_address=RPC)
# get_transaction(tx_hash, finalized_approvals=None, rpc_address=RPC)
# get_balance(purse_uref, state_root_hash=None, rpc_address=RPC)
# query_balance_details(purse_id, state_root_hash=None, maybe_block_id=None, rpc_address=RPC)
# query_global_state(key, path=None, state_root_hash=None, maybe_block_id=None, rpc_address=RPC)
# get_dictionary_item(kind, key=..., dictionary_name=..., dictionary_item_key=..., ...)
# speculative_exec(signed_tx_json, rpc_address=RPC)  # needs speculative node endpoint
```

### Wave 2 helpers (offline)

```python
pem = casper.secret_key_generate()  # treat as secret
pk = casper.public_key_from_secret_key(pem)
assert casper.secret_key_from_pem(pem)["algorithm"] == "ed25519"

print(casper.get_blake2b_hash("hello"))
print(casper.motes_to_cspr("2500000000"))
print(casper.contract_hash_key_for_global_state("entity-contract-" + "ab" * 32))

sdk = casper.Sdk(RPC, verbosity="low")
sdk.set_verbosity("medium")
print(sdk.get_rpc_address(), sdk.get_verbosity())
```

### Wave 3 make + sign (no put)

```python
params = json.dumps({
    "chain_name": status["chainspec_name"],
    "payment_amount": "100000000",
    "secret_key": pem,
})
unsigned = casper.make_transfer_transaction(sender, "2500000000", params)
signed = casper.sign_transaction(unsigned, pem)
# put_transaction(signed, RPC)  # submits
# wait_transaction("http://127.0.0.1:18101/events", tx_hash, timeout_ms=60_000)
```
