"""Offline entrypoint: run unit tests (no JSON-RPC / NCTL).

Prefer `pytest tests/test_unit_offline.py` or `make python-test`.
"""

from __future__ import annotations

import sys

import pytest


def main() -> int:
    return pytest.main([str(__file__).replace("smoke_offline.py", "test_unit_offline.py"), "-q"])


if __name__ == "__main__":
    sys.exit(main())
