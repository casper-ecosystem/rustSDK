"""NCTL integration tests (requires a reachable JSON-RPC node).

Run with: `make python-test-nctl` or
`pytest tests/test_nctl_integration.py -m nctl`

Required env for this suite:
  CASPER_RPC_URL              default http://127.0.0.1:11101/rpc
  CASPER_EVENTS_URL           default http://127.0.0.1:18101/events
  CASPER_PURSE_ID             pubkey / account-hash / uref for query_balance
  CASPER_SECRET_KEY_PEM_FILE  path to funded secret key PEM for put + wait
"""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request

import casper_rust_wasm_sdk_py as casper
import pytest

RPC = os.environ.get("CASPER_RPC_URL", "http://127.0.0.1:11101/rpc")
EVENTS = os.environ.get("CASPER_EVENTS_URL", "http://127.0.0.1:18101/events")

pytestmark = pytest.mark.nctl


def _rpc_reachable() -> bool:
    body = b'{"jsonrpc":"2.0","id":1,"method":"info_get_status","params":null}'
    req = urllib.request.Request(
        RPC,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=3) as resp:
            return 200 <= resp.status < 300
    except (urllib.error.URLError, TimeoutError, OSError):
        return False


requires_rpc = pytest.mark.skipif(
    not _rpc_reachable(),
    reason=f"JSON-RPC not reachable at {RPC}",
)


def require_purse_id() -> str:
    purse = os.environ.get("CASPER_PURSE_ID", "").strip()
    assert purse, "CASPER_PURSE_ID is required for NCTL integration"
    return purse


def require_secret_pem() -> str:
    path = os.environ.get("CASPER_SECRET_KEY_PEM_FILE", "").strip()
    assert path, "CASPER_SECRET_KEY_PEM_FILE is required for NCTL integration"
    assert os.path.isfile(path), f"CASPER_SECRET_KEY_PEM_FILE not found: {path}"
    pem = open(path, encoding="utf-8").read()
    assert "BEGIN" in pem and "PRIVATE KEY" in pem, "PEM file is not a Casper secret key"
    return pem


def extract_tx_hash(put: dict, signed: str) -> str:
    raw = put.get("transaction_hash") or put.get("hash")
    if isinstance(raw, dict):
        for key in ("Version1", "Deploy", "version1", "deploy"):
            if key in raw and isinstance(raw[key], str):
                return raw[key]
        val = next(iter(raw.values()), None)
        if isinstance(val, str):
            return val
    if isinstance(raw, str):
        if raw.startswith("{"):
            try:
                return extract_tx_hash({"transaction_hash": json.loads(raw)}, signed)
            except json.JSONDecodeError:
                return raw
        return raw
    signed_obj = json.loads(signed)
    h = signed_obj.get("hash")
    if isinstance(h, str):
        return h
    if isinstance(h, dict):
        return extract_tx_hash({"transaction_hash": h}, signed)
    raise AssertionError(f"could not find tx hash in put keys={list(put.keys())}")


@requires_rpc
def test_node_status_and_reads() -> None:
    status = casper.get_node_status(RPC)
    assert status["chainspec_name"]

    peers = json.loads(casper.get_peers(RPC))
    assert "peers" in peers

    block = json.loads(casper.get_block(None, RPC))
    assert "block" in block or "block_with_signatures" in block or "version" in block

    srh = json.loads(casper.get_state_root_hash(None, RPC))
    assert "state_root_hash" in srh

    auction = json.loads(casper.get_auction_info(None, RPC))
    assert auction

    era = json.loads(casper.get_era_summary(None, RPC))
    assert era

    validators = json.loads(casper.get_validator_changes(RPC))
    assert isinstance(validators, dict)

    chainspec = json.loads(casper.get_chainspec(RPC))
    assert chainspec

    rpcs = json.loads(casper.list_rpcs(RPC))
    assert rpcs

    transfers = json.loads(casper.get_block_transfers(None, RPC))
    assert transfers is not None


@requires_rpc
def test_query_balance() -> None:
    purse = require_purse_id()
    bal = json.loads(casper.query_balance(purse, None, None, RPC))
    assert "balance" in bal or bal
    try:
        entity = json.loads(casper.get_entity(purse, None, RPC))
        assert entity
    except Exception as exc:
        msg = str(exc)
        # Known SDK serde gap for entity.Account (not AddressableEntity / LegacyAccount).
        if "unknown variant `Account`" in msg or "LegacyAccount" in msg:
            pytest.xfail("get_entity rejects Account variant (SDK serde gap)")
        raise


@requires_rpc
def test_put_and_wait() -> None:
    pem = require_secret_pem()
    status = casper.get_node_status(RPC)
    chain = status["chainspec_name"]
    sender = casper.public_key_from_secret_key(pem)
    params = json.dumps(
        {
            "chain_name": chain,
            "payment_amount": "100000000",
            "secret_key": pem,
        }
    )
    unsigned = casper.make_transfer_transaction(sender, "2500000000", params)
    signed = casper.sign_transaction(unsigned, pem)
    put = json.loads(casper.put_transaction(signed, RPC))
    assert put
    tx_hash = extract_tx_hash(put, signed)
    assert len(tx_hash) >= 32
    waited = casper.wait_transaction(EVENTS, tx_hash, 90_000)
    body = json.loads(waited)
    assert not body.get("err"), body
