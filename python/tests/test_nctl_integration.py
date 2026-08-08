"""NCTL integration tests (requires a reachable JSON-RPC node).

Run with: `make python-test-nctl` or
`pytest tests/test_nctl_integration.py -m nctl -v`

Required env (same key material as tip ci-test / e2e):
  CASPER_RPC_URL       default http://127.0.0.1:11101/rpc
  CASPER_EVENTS_URL    default http://127.0.0.1:18101/events
  SECRET_KEY_USER_1    PEM body line (ci-test / e2e), or
  CASPER_SECRET_KEY_PEM_FILE  path to a full funded PEM (local make)
  CASPER_PURSE_ID      pubkey / account-hash / uref; defaults to pubkey from secret
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


def _addressable_entity_enabled() -> bool:
    """Match tip ci-test / e2e: ENABLE_ADDRESSABLE_ENTITY (default false on Hub :dev)."""
    flag = os.environ.get("ENABLE_ADDRESSABLE_ENTITY", "false").strip().lower()
    return flag in ("true", "1", "yes")


requires_ae = pytest.mark.skipif(
    not _addressable_entity_enabled(),
    reason="get_entity needs ENABLE_ADDRESSABLE_ENTITY=true (AE on)",
)


def require_secret_pem() -> str:
    """Resolve funded key like e2e: SECRET_KEY_USER_1 body, else PEM file path."""
    body = os.environ.get("SECRET_KEY_USER_1", "").strip()
    if body:
        if "BEGIN" in body:
            return body
        return f"-----BEGIN PRIVATE KEY-----\n{body}\n-----END PRIVATE KEY-----"

    path = os.environ.get("CASPER_SECRET_KEY_PEM_FILE", "").strip()
    assert path, (
        "SECRET_KEY_USER_1 or CASPER_SECRET_KEY_PEM_FILE is required for NCTL integration"
    )
    assert os.path.isfile(path), f"CASPER_SECRET_KEY_PEM_FILE not found: {path}"
    pem = open(path, encoding="utf-8").read()
    assert "BEGIN" in pem and "PRIVATE KEY" in pem, "PEM file is not a Casper secret key"
    return pem


def require_purse_id(pem: str | None = None) -> str:
    purse = os.environ.get("CASPER_PURSE_ID", "").strip()
    if purse:
        return purse
    if pem is None:
        pem = require_secret_pem()
    return casper.public_key_from_secret_key(pem)


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
    """RPC smoke: status, peers, block, SRH, auction, era, validators, chainspec, list_rpcs, transfers."""
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
    """query_balance for SECRET_KEY_USER_1 / CASPER_PURSE_ID pubkey."""
    purse = require_purse_id()
    bal = json.loads(casper.query_balance(purse, None, None, RPC))
    assert "balance" in bal or bal


@requires_rpc
@requires_ae
def test_get_entity() -> None:
    """get_entity for the same purse (AE on only; skipped when AE off like e2e)."""
    purse = require_purse_id()
    entity = json.loads(casper.get_entity(purse, None, RPC))
    assert entity


@requires_rpc
def test_put_and_wait() -> None:
    """make_transfer_transaction → sign → put_transaction → wait_transaction (90s)."""
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
