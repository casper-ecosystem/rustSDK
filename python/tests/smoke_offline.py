"""Offline smoke for casper_rust_wasm_sdk_py (no JSON-RPC / NCTL)."""

from __future__ import annotations

import json

import casper_rust_wasm_sdk_py as casper


WAVE1_EXPORTS = (
    "get_peers",
    "get_chainspec",
    "get_validator_changes",
    "list_rpcs",
    "get_block",
    "get_block_transfers",
    "get_state_root_hash",
    "get_auction_info",
    "get_era_summary",
    "get_reward",
    "get_entity",
    "get_transaction",
    "get_balance",
    "query_balance",
    "query_balance_details",
    "query_global_state",
    "get_dictionary_item",
    "speculative_exec",
)
WAVE2_EXPORTS = (
    "get_current_timestamp",
    "get_blake2b_hash",
    "make_dictionary_item_key",
    "get_base64_key_from_account_hash",
    "get_base64_key_from_key_hash",
    "contract_hash_key_for_global_state",
    "get_ttl_or_default",
    "parse_timestamp",
    "parse_ttl",
    "get_gas_price_or_default",
    "secret_key_generate",
    "secret_key_secp256k1_generate",
    "secret_key_from_pem",
    "public_key_from_secret_key",
    "hex_to_uint8_vec",
    "hex_to_string",
    "motes_to_cspr",
    "json_pretty_print",
    "cl_value_to_json",
    "Sdk",
)
WAVE3_EXPORTS = (
    "make_transaction",
    "make_transfer_transaction",
    "sign_transaction",
    "put_transaction",
    "transaction",
    "transfer_transaction",
    "speculative_transaction",
    "speculative_transfer_transaction",
    "query_contract_dict",
    "query_contract_key",
    "install",
    "call_entrypoint",
)
WAVE4_EXPORTS = ("wait_transaction",)


def main() -> None:
    ver = casper.version()
    assert ver, "version() empty"

    for name in WAVE1_EXPORTS + WAVE2_EXPORTS + WAVE3_EXPORTS + WAVE4_EXPORTS:
        assert hasattr(casper, name), name

    # Helpers (offline)
    ts = casper.get_current_timestamp()
    assert "T" in ts or ts.isdigit(), ts

    h1 = casper.get_blake2b_hash("hello")
    h2 = casper.get_blake2b_hash("hello")
    assert h1 == h2 and len(h1) == 64, h1

    assert casper.get_ttl_or_default(None)
    assert casper.parse_ttl("1h")
    assert casper.get_gas_price_or_default(None) >= 1
    assert casper.motes_to_cspr("1000000000") == "1"
    assert casper.hex_to_string("68656c6c6f") == "hello"
    assert list(casper.hex_to_uint8_vec("68656c6c6f")) == [104, 101, 108, 108, 111]
    assert casper.contract_hash_key_for_global_state(
        "entity-contract-" + "ab" * 32
    ).startswith("hash-")
    pretty = casper.json_pretty_print('{"a":1}', "low")
    assert "a" in pretty
    assert casper.cl_value_to_json(
        '{"cl_type":"Bool","bytes":"01","parsed":true}'
    ) == "true"

    pem = casper.secret_key_generate()
    assert "BEGIN" in pem and "PRIVATE KEY" in pem
    info = casper.secret_key_from_pem(pem)
    assert info["ok"] is True and info["algorithm"] == "ed25519"
    pk = casper.public_key_from_secret_key(pem)
    assert pk.startswith("01")

    secp = casper.secret_key_secp256k1_generate()
    secp_info = casper.secret_key_from_pem(secp)
    assert secp_info["algorithm"] == "secp256k1"
    assert casper.public_key_from_secret_key(secp).startswith("02")

    assert casper.generate_secret_key_pem()
    assert casper.public_key_hex(pem).startswith("01")

    sdk = casper.Sdk("http://127.0.0.1:11101/rpc", None, "medium")
    assert sdk.get_rpc_address() == "http://127.0.0.1:11101/rpc"
    sdk.set_verbosity("high")
    assert sdk.get_verbosity() == "high"
    sdk.set_node_address("127.0.0.1:28101")
    assert "28101" in sdk.get_node_address()

    # Make + sign (no put)
    params = json.dumps(
        {
            "chain_name": "casper-net-1",
            "payment_amount": "100000000",
            "secret_key": pem,
        }
    )
    unsigned = casper.make_transfer_transaction(pk, "2500000000", params)
    assert "hash" in unsigned
    signed = casper.sign_transaction(unsigned, pem)
    assert "hash" in signed and len(signed) > 100

    builder = json.dumps(
        {
            "kind": "Transfer",
            "amount": "2500000000",
            "target": {"kind": "PublicKey", "public_key": pk},
            "runtime": "v1",
        }
    )
    built = casper.make_transaction(builder, params)
    assert "hash" in built

    tx_json = casper.make_signed_transfer(
        target=pk,
        amount="2500000000",
        chain_name="casper-net-1",
        secret_key_pem=pem,
        payment_amount="100000000",
    )
    assert "hash" in tx_json and len(tx_json) > 100

    print(
        "OK",
        ver,
        pk[:18] + "...",
        "tx_len=",
        len(tx_json),
        "w1=",
        len(WAVE1_EXPORTS),
        "w2=",
        len(WAVE2_EXPORTS),
        "w3=",
        len(WAVE3_EXPORTS),
        "w4=",
        len(WAVE4_EXPORTS),
    )


if __name__ == "__main__":
    main()
