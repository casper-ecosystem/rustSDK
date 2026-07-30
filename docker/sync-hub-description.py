#!/usr/bin/env python3
"""Sync Docker Hub short + full description (+ categories) from docker/DOCKERHUB.md."""

from __future__ import annotations

import base64
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

HUB_LOGIN = "https://hub.docker.com/v2/users/login/"
HUB_REPO = "https://hub.docker.com/v2/repositories/{ns}/{name}/"
HUB_CATEGORIES = "https://hub.docker.com/v2/repositories/{ns}/{name}/categories/"
DEFAULT_SHORT = (
    "Casper-Webclient : Demo Angular-based web client for interacting with the Casper Blockchain 2.0"
)
DEFAULT_MD = pathlib.Path("docker/DOCKERHUB.md")
DEFAULT_REPOS = ("gregoshop/casper-webclient", "interchouette/casper-webclient")
# Match gregoshop Hub categories (max 3).
DEFAULT_CATEGORIES = (
    {"name": "Networking", "slug": "networking"},
    {"name": "API management", "slug": "api-management"},
    {"name": "Developer tools", "slug": "developer-tools"},
)


def docker_cfg_creds() -> tuple[str | None, str | None]:
    cfg = pathlib.Path.home() / ".docker" / "config.json"
    if not cfg.is_file():
        return None, None
    data = json.loads(cfg.read_text(encoding="utf-8"))
    auth = (data.get("auths") or {}).get("https://index.docker.io/v1/", {}).get("auth")
    if not auth:
        return None, None
    raw = base64.b64decode(auth).decode()
    user, _, password = raw.partition(":")
    return (user or None), (password or None)


def hub_token(username: str, password: str) -> str:
    req = urllib.request.Request(
        HUB_LOGIN,
        data=json.dumps({"username": username, "password": password}).encode(),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        token = json.load(resp).get("token")
    if not token:
        raise SystemExit("hub login returned no token")
    return token


def patch_repo(token: str, repo: str, short: str, full: str) -> None:
    ns, name = repo.split("/", 1)
    payload = json.dumps({"description": short, "full_description": full}).encode()
    req = urllib.request.Request(
        HUB_REPO.format(ns=ns, name=name),
        data=payload,
        method="PATCH",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"JWT {token}",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        json.load(resp)
    print(f"updated description {repo}")


def patch_categories(token: str, repo: str, categories: list[dict[str, str]]) -> None:
    ns, name = repo.split("/", 1)
    payload = json.dumps(categories).encode()
    req = urllib.request.Request(
        HUB_CATEGORIES.format(ns=ns, name=name),
        data=payload,
        method="PATCH",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"JWT {token}",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        # Some Hub responses are empty on success.
        raw = resp.read()
        if raw:
            json.loads(raw)
    print(f"updated categories {repo}")


def main() -> None:
    md_path = pathlib.Path(os.environ.get("DOCKERHUB_MD", DEFAULT_MD))
    if not md_path.is_file():
        raise SystemExit(f"missing {md_path}")
    full = md_path.read_text(encoding="utf-8")
    short = os.environ.get("HUB_SHORT_DESC", DEFAULT_SHORT)[:100]
    repos = os.environ.get("HUB_DESC_REPOS", " ".join(DEFAULT_REPOS)).split()
    categories = list(DEFAULT_CATEGORIES)

    user = os.environ.get("DOCKER_USERNAME")
    password = os.environ.get("DOCKER_PASSWORD")
    if not (user and password):
        user, password = docker_cfg_creds()
    if not (user and password):
        raise SystemExit("docker login (or set DOCKER_USERNAME / DOCKER_PASSWORD)")

    try:
        token = hub_token(user, password)
    except urllib.error.HTTPError as exc:
        raise SystemExit(f"hub login failed: {exc.code}") from exc

    for repo in repos:
        try:
            patch_repo(token, repo, short, full)
            patch_categories(token, repo, categories)
        except urllib.error.HTTPError as exc:
            body = exc.read().decode(errors="replace")[:300]
            raise SystemExit(f"update {repo} failed: {exc.code} {body}") from exc


if __name__ == "__main__":
    main()
