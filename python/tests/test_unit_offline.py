"""Offline unit tests for casper_rust_wasm_sdk_py (no JSON-RPC / NCTL)."""

from __future__ import annotations

import json

import casper_rust_wasm_sdk_py as casper
import pytest

RPC_EXPORTS = (
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
HELPER_EXPORTS = (
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
TX_CONTRACT_EXPORTS = (
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
WATCHER_EXPORTS = ("wait_transaction",)


@pytest.fixture(scope="module")
def ed25519_pem() -> str:
    return casper.secret_key_generate()


@pytest.fixture(scope="module")
def ed25519_pk(ed25519_pem: str) -> str:
    return casper.public_key_from_secret_key(ed25519_pem)


class TestExports:
    def test_version(self) -> None:
        assert casper.version()

    @pytest.mark.parametrize(
        "name",
        RPC_EXPORTS + HELPER_EXPORTS + TX_CONTRACT_EXPORTS + WATCHER_EXPORTS,
    )
    def test_export_callable(self, name: str) -> None:
        assert hasattr(casper, name), name


class TestHelpers:
    def test_timestamp_and_ttl(self) -> None:
        ts = casper.get_current_timestamp()
        assert "T" in ts or ts.isdigit(), ts
        assert casper.get_ttl_or_default(None)
        assert casper.parse_ttl("1h")
        assert casper.get_gas_price_or_default(None) >= 1

    def test_blake2b_deterministic(self) -> None:
        h1 = casper.get_blake2b_hash("hello")
        h2 = casper.get_blake2b_hash("hello")
        assert h1 == h2
        assert len(h1) == 64

    def test_bytes_and_motes(self) -> None:
        assert casper.motes_to_cspr("1000000000") == "1"
        assert casper.hex_to_string("68656c6c6f") == "hello"
        assert list(casper.hex_to_uint8_vec("68656c6c6f")) == [104, 101, 108, 108, 111]

    def test_contract_hash_remap(self) -> None:
        remapped = casper.contract_hash_key_for_global_state("entity-contract-" + "ab" * 32)
        assert remapped.startswith("hash-")

    def test_json_and_cl_value(self) -> None:
        pretty = casper.json_pretty_print('{"a":1}', "low")
        assert "a" in pretty
        assert (
            casper.cl_value_to_json('{"cl_type":"Bool","bytes":"01","parsed":true}')
            == "true"
        )

    def test_ed25519_keys(self, ed25519_pem: str, ed25519_pk: str) -> None:
        assert "BEGIN" in ed25519_pem and "PRIVATE KEY" in ed25519_pem
        info = casper.secret_key_from_pem(ed25519_pem)
        assert info["ok"] is True
        assert info["algorithm"] == "ed25519"
        assert ed25519_pk.startswith("01")
        assert casper.generate_secret_key_pem()
        assert casper.public_key_hex(ed25519_pem).startswith("01")

    def test_secp256k1_keys(self) -> None:
        secp = casper.secret_key_secp256k1_generate()
        info = casper.secret_key_from_pem(secp)
        assert info["algorithm"] == "secp256k1"
        assert casper.public_key_from_secret_key(secp).startswith("02")

    def test_sdk_session(self) -> None:
        sdk = casper.Sdk("http://127.0.0.1:11101/rpc", None, "medium")
        assert sdk.get_rpc_address() == "http://127.0.0.1:11101/rpc"
        sdk.set_verbosity("high")
        assert sdk.get_verbosity() == "high"
        sdk.set_node_address("127.0.0.1:28101")
        assert "28101" in sdk.get_node_address()


class TestTransactionOffline:
    def test_make_sign_transfer(
        self, ed25519_pem: str, ed25519_pk: str
    ) -> None:
        params = json.dumps(
            {
                "chain_name": "casper-net-1",
                "payment_amount": "100000000",
                "secret_key": ed25519_pem,
            }
        )
        unsigned = casper.make_transfer_transaction(
            ed25519_pk, "2500000000", params
        )
        assert "hash" in unsigned
        signed = casper.sign_transaction(unsigned, ed25519_pem)
        assert "hash" in signed
        assert len(signed) > 100

    def test_make_transaction_builder(
        self, ed25519_pem: str, ed25519_pk: str
    ) -> None:
        params = json.dumps(
            {
                "chain_name": "casper-net-1",
                "payment_amount": "100000000",
                "secret_key": ed25519_pem,
            }
        )
        builder = json.dumps(
            {
                "kind": "Transfer",
                "amount": "2500000000",
                "target": {"kind": "PublicKey", "public_key": ed25519_pk},
                "runtime": "v1",
            }
        )
        built = casper.make_transaction(builder, params)
        assert "hash" in built

    def test_make_signed_transfer_helper(
        self, ed25519_pem: str, ed25519_pk: str
    ) -> None:
        tx_json = casper.make_signed_transfer(
            target=ed25519_pk,
            amount="2500000000",
            chain_name="casper-net-1",
            secret_key_pem=ed25519_pem,
            payment_amount="100000000",
        )
        assert "hash" in tx_json
        assert len(tx_json) > 100
