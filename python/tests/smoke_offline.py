"""Offline smoke for casper_rust_wasm_sdk_py (no JSON-RPC / NCTL)."""

from __future__ import annotations

import casper_rust_wasm_sdk_py as casper


def main() -> None:
    ver = casper.version()
    assert ver, "version() empty"

    pem = casper.generate_secret_key_pem()
    assert "BEGIN" in pem and "PRIVATE KEY" in pem, "unexpected PEM"

    pk = casper.public_key_hex(pem)
    assert pk.startswith(("01", "02")), f"unexpected public key prefix: {pk[:8]}"

    tx_json = casper.make_signed_transfer(
        target=pk,
        amount="2500000000",
        chain_name="casper-net-1",
        secret_key_pem=pem,
        payment_amount="100000000",
    )
    assert "hash" in tx_json and len(tx_json) > 100, "signed transfer JSON too small"

    print("OK", ver, pk[:18] + "...", "tx_len=", len(tx_json))


if __name__ == "__main__":
    main()
