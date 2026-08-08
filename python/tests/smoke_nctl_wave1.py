"""NCTL smoke: RPC reads + optional put + wait_transaction.

Env:
  CASPER_RPC_URL     default http://127.0.0.1:11101/rpc
  CASPER_EVENTS_URL  default http://127.0.0.1:18101/events
  CASPER_PURSE_ID    optional pubkey for query_balance / get_entity
  CASPER_SECRET_KEY_PEM  optional PEM path or PEM text for put+wait
  CASPER_SECRET_KEY_PEM_FILE  optional path to PEM file (preferred over inline)
"""

from __future__ import annotations

import json
import os
import sys

import casper_rust_wasm_sdk_py as casper

RPC = os.environ.get("CASPER_RPC_URL", "http://127.0.0.1:11101/rpc")
EVENTS = os.environ.get("CASPER_EVENTS_URL", "http://127.0.0.1:18101/events")


def load_secret_pem() -> str | None:
    path = os.environ.get("CASPER_SECRET_KEY_PEM_FILE")
    if path and os.path.isfile(path):
        return open(path, encoding="utf-8").read()
    raw = os.environ.get("CASPER_SECRET_KEY_PEM")
    if raw and "BEGIN" in raw:
        return raw
    if raw and os.path.isfile(raw):
        return open(raw, encoding="utf-8").read()
    return None


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


def smoke_reads() -> str:
    status = casper.get_node_status(RPC)
    assert status["chainspec_name"], "empty chainspec_name"
    print("status", status["chainspec_name"], status["build_version"])

    peers = json.loads(casper.get_peers(RPC))
    assert "peers" in peers, peers
    print("peers", len(peers.get("peers") or []))

    block = json.loads(casper.get_block(None, RPC))
    assert "block" in block or "block_with_signatures" in block or "version" in block, block.keys()
    print("block ok", list(block.keys())[:6])

    srh = json.loads(casper.get_state_root_hash(None, RPC))
    assert "state_root_hash" in srh, srh
    print("state_root_hash", str(srh.get("state_root_hash"))[:16] + "...")

    auction = json.loads(casper.get_auction_info(None, RPC))
    assert auction, "empty auction"
    print("auction keys", list(auction.keys())[:6])

    era = json.loads(casper.get_era_summary(None, RPC))
    assert era, "empty era_summary"
    print("era_summary keys", list(era.keys())[:6])

    validators = json.loads(casper.get_validator_changes(RPC))
    assert "changes" in validators or isinstance(validators, dict), validators
    print("validator_changes ok")

    chainspec = json.loads(casper.get_chainspec(RPC))
    assert chainspec, "empty chainspec"
    print("chainspec keys", list(chainspec.keys())[:6])

    rpcs = json.loads(casper.list_rpcs(RPC))
    assert rpcs, "empty list_rpcs"
    print("list_rpcs ok")

    transfers = json.loads(casper.get_block_transfers(None, RPC))
    assert transfers is not None
    print("block_transfers ok")

    purse = os.environ.get("CASPER_PURSE_ID")
    if purse:
        bal = json.loads(casper.query_balance(purse, None, None, RPC))
        assert "balance" in bal or bal, bal
        print("query_balance ok")
        try:
            entity = json.loads(casper.get_entity(purse, None, RPC))
            assert entity, "empty entity"
            print("get_entity ok")
        except Exception as exc:
            msg = str(exc)
            if "unknown variant `Account`" in msg or "LegacyAccount" in msg:
                print("get_entity soft-skip (Account variant):", msg.split(":", 1)[0])
            else:
                raise
    else:
        print("skip query_balance/get_entity (set CASPER_PURSE_ID)")

    return status["chainspec_name"]


def smoke_put_wait(chain_name: str, pem: str) -> None:
    sender = casper.public_key_from_secret_key(pem)
    # self-transfer keeps balances stable
    params = json.dumps(
        {
            "chain_name": chain_name,
            "payment_amount": "100000000",
            "secret_key": pem,
        }
    )
    unsigned = casper.make_transfer_transaction(sender, "2500000000", params)
    signed = casper.sign_transaction(unsigned, pem)
    put = json.loads(casper.put_transaction(signed, RPC))
    assert put, put
    tx_hash = extract_tx_hash(put, signed)
    assert tx_hash and len(tx_hash) >= 32, tx_hash
    print("put_transaction ok", tx_hash[:18] + "...")

    waited = casper.wait_transaction(EVENTS, tx_hash, 90_000)
    body = json.loads(waited)
    assert not body.get("err"), body
    print("wait_transaction ok", waited[:120].replace("\n", " "), "...")


def main() -> None:
    chain = smoke_reads()
    pem = load_secret_pem()
    if pem:
        smoke_put_wait(chain, pem)
    else:
        print("skip put/wait (set CASPER_SECRET_KEY_PEM_FILE)")
    print("OK nctl", casper.version())


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("FAIL:", exc, file=sys.stderr)
        sys.exit(1)
