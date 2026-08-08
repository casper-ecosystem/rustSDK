# casper-rust-wasm-sdk-py

PyO3 + maturin bindings over [`casper-rust-wasm-sdk`](../). Same Rust `rlib`, thin Python face (like Wasm / MCP). Not a port of the SDK into Python.

Deploy APIs and binary-port are not wrapped. Prefer Transaction V1 and Runtime V1 / V2.

## Surface

Async SDK calls use an owned tokio multi-thread runtime and `block_on` inside each pyfunction. Most RPC / write results are JSON strings (MCP-style args where practical).

### Status and keys

| Function | Behavior |
| --- | --- |
| `get_node_status(rpc_address=None)` | JSON-RPC `info_get_status` → dict (`chainspec_name`, `build_version`, `api_version`, `json`) |
| `make_signed_transfer(...)` | Make + sign a native transfer (no put) → transaction JSON |
| `generate_secret_key_pem()` / `public_key_hex(pem)` | Aliases for `secret_key_generate` / `public_key_from_secret_key` |
| `version()` | Extension package version |

### JSON-RPC reads

Deprecated / deploy paths are not wrapped (`get_deploy`, `get_account`, `get_era_info`, `speculative_exec_deploy`).

| Function | JSON-RPC |
| --- | --- |
| `get_peers` / `get_chainspec` / `get_validator_changes` / `list_rpcs` | info / discover |
| `get_block` / `get_block_transfers` / `get_state_root_hash` | chain |
| `get_auction_info` / `get_era_summary` / `get_reward` | auction / era / reward |
| `query_balance` / `query_balance_details` / `get_balance` | balances |
| `get_entity` / `query_global_state` / `get_dictionary_item` | entity / state |
| `get_transaction` | transaction (not deploy) |
| `speculative_exec(transaction_json, …)` | speculative (transaction only) |

### Helpers and session

PEM inputs are secrets. `secret_key_from_pem` validates and does not echo the key.

| Function / class | Behavior |
| --- | --- |
| `Sdk(rpc_address=None, node_address=None, verbosity=None)` | get/set RPC, node, verbosity (`low`\|`medium`\|`high`) |
| `get_current_timestamp` / `parse_timestamp` / `get_ttl_or_default` / `parse_ttl` / `get_gas_price_or_default` | Time / pricing |
| `get_blake2b_hash` / `make_dictionary_item_key` / `get_base64_key_from_*` / `contract_hash_key_for_global_state` | Hash / key helpers |
| `secret_key_generate` / `secret_key_secp256k1_generate` / `secret_key_from_pem` / `public_key_from_secret_key` | Keys |
| `hex_to_uint8_vec` / `hex_to_string` / `motes_to_cspr` / `cl_value_to_json` / `json_pretty_print` | Bytes / display |

### Transaction and contract

Params are JSON strings. Builder JSON may set `"runtime": "v1"|"v2"`. `install` / `call_entrypoint` also take optional `runtime_v2` (None/true → V2 on install; call leaves builder unless set).

| Function | Behavior |
| --- | --- |
| `make_transaction` / `make_transfer_transaction` | Build only → transaction JSON |
| `sign_transaction` / `put_transaction` | Sign PEM / submit |
| `transaction` / `transfer_transaction` | Build+sign+put |
| `speculative_transaction` / `speculative_transfer_transaction` | Speculative (tx path) |
| `query_contract_key` / `query_contract_dict` | Contract reads |
| `install` / `call_entrypoint` | Put install / entrypoint (not `*_deploy`) |

### Watcher

| Function | Behavior |
| --- | --- |
| `wait_transaction(events_url, transaction_hash, timeout_ms=None)` | SSE wait |

## Package layout

Lives under [`python/`](./). Path-depends on the repo root crate with `default-features = false` and features `transaction`, `helpers`, `contract`, `watcher` (no `deploy`, no `binary-port`). Build with maturin in this directory; Wasm packs and default crate features are unchanged.

## Build

Requires CPython 3.10+, a Rust toolchain, and (for live checks) a reachable JSON-RPC node.

```bash
cd python
uv venv .venv
source .venv/bin/activate
uv pip install maturin
maturin develop
python -c "import casper_rust_wasm_sdk_py as m; print(m.get_node_status('http://127.0.0.1:11101/rpc'))"
```

Use the venv interpreter (`python` after `source .venv/bin/activate`, or `.venv/bin/python`).

From the repo root:

```bash
make python-test
make python-test-nctl
```

`python-test` is offline. `python-test-nctl` needs a local node; optional put/wait via `CASPER_SECRET_KEY_PEM_FILE` and `CASPER_PURSE_ID`.

## Examples

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

pem = casper.secret_key_generate()
sender = casper.public_key_from_secret_key(pem)
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

```python
json.loads(casper.get_peers(RPC))
json.loads(casper.get_chainspec(RPC))
json.loads(casper.get_validator_changes(RPC))
json.loads(casper.list_rpcs(RPC))
json.loads(casper.get_block_transfers(None, RPC))
json.loads(casper.get_auction_info(None, RPC))
json.loads(casper.get_era_summary(None, RPC))
# get_reward / get_transaction / get_balance / query_balance_details /
# query_global_state / get_dictionary_item / speculative_exec
```

```python
pem = casper.secret_key_generate()
pk = casper.public_key_from_secret_key(pem)
assert casper.secret_key_from_pem(pem)["algorithm"] == "ed25519"

print(casper.get_blake2b_hash("hello"))
print(casper.motes_to_cspr("2500000000"))
print(casper.contract_hash_key_for_global_state("entity-contract-" + "ab" * 32))

sdk = casper.Sdk(RPC, verbosity="low")
sdk.set_verbosity("medium")
print(sdk.get_rpc_address(), sdk.get_verbosity())
```

```python
params = json.dumps({
    "chain_name": status["chainspec_name"],
    "payment_amount": "100000000",
    "secret_key": pem,
})
unsigned = casper.make_transfer_transaction(sender, "2500000000", params)
signed = casper.sign_transaction(unsigned, pem)
# put_transaction(signed, RPC)
# wait_transaction("http://127.0.0.1:18101/events", tx_hash, timeout_ms=60_000)
```
