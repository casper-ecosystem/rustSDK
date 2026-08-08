"""pytest markers for casper_rust_wasm_sdk_py tests."""

from __future__ import annotations

import pytest


def pytest_configure(config: pytest.Config) -> None:
    config.addinivalue_line(
        "markers",
        "nctl: needs a reachable Casper JSON-RPC node (and optional PEM for put/wait)",
    )
