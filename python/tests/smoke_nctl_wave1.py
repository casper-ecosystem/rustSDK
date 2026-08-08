"""Backward-compatible NCTL entrypoint that runs the pytest nctl suite. """

from __future__ import annotations

import sys
from pathlib import Path

import pytest


def main() -> int:
    here = Path(__file__).resolve().parent
    return pytest.main(
        [str(here / "test_nctl_integration.py"), "-m", "nctl", "-q", "--tb=short"]
    )


if __name__ == "__main__":
    sys.exit(main())
