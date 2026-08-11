# Recipes use bash (pipefail, etc.). Ubuntu CI /bin/sh is dash and rejects -o pipefail.
SHELL := /bin/bash

prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

# Specify the output directories for web and Node.js targets.
WEB_OUT_DIR = pkg
NODEJS_OUT_DIR = pkg-nodejs

# web-full / nodejs-full: default features (includes `js`) plus SSE.
# Cargo `full` stays domain-only (no `js`) for Rust consumers; packs keep `js` on.
WASM_FEATURES_FULL = --features SSE
WASM_FEATURES_READ_ONLY = --no-default-features --features js
WASM_FEATURES_TRANSACTION = --no-default-features --features transaction,helpers,watcher,js

# Pin Binaryen so wasm-pack does not fall back to its vendored 117 download.
BINARYEN_VERSION := 130
BINARYEN_DIR := $(CURDIR)/.tools/binaryen-version_$(BINARYEN_VERSION)
BINARYEN_BIN := $(BINARYEN_DIR)/bin
BINARYEN_PATH_FILE := $(CURDIR)/.tools/wasm-opt-bin

.PHONY: all web nodejs clean build doc web-full web-read-only web-transaction nodejs-full nodejs-read-only ensure-binaryen

ensure-binaryen:
	@set -euo pipefail; \
	mkdir -p "$(CURDIR)/.tools"; \
	is_pin() { "$$1" --version 2>/dev/null | grep -qE 'version[_ ]$(BINARYEN_VERSION)([^0-9]|$$)'; }; \
	if command -v wasm-opt >/dev/null 2>&1 && is_pin wasm-opt; then \
		dirname "$$(command -v wasm-opt)" > "$(BINARYEN_PATH_FILE)"; \
		echo "ensure-binaryen: $$(wasm-opt --version) (PATH)"; \
		exit 0; \
	fi; \
	if [ -x "$(BINARYEN_BIN)/wasm-opt" ] && is_pin "$(BINARYEN_BIN)/wasm-opt"; then \
		echo "$(BINARYEN_BIN)" > "$(BINARYEN_PATH_FILE)"; \
		echo "ensure-binaryen: $$($(BINARYEN_BIN)/wasm-opt --version) ($(BINARYEN_BIN))"; \
		exit 0; \
	fi; \
	case "$$(uname -m)" in \
		x86_64|amd64) arch=x86_64 ;; \
		aarch64|arm64) arch=aarch64 ;; \
		*) echo "ensure-binaryen: unsupported arch $$(uname -m)" >&2; exit 1 ;; \
	esac; \
	case "$$(uname -s)" in \
		Linux) plat=linux ;; \
		Darwin) plat=macos ;; \
		*) echo "ensure-binaryen: unsupported OS $$(uname -s)" >&2; exit 1 ;; \
	esac; \
	url="https://github.com/WebAssembly/binaryen/releases/download/version_$(BINARYEN_VERSION)/binaryen-version_$(BINARYEN_VERSION)-$${arch}-$${plat}.tar.gz"; \
	echo "ensure-binaryen: downloading $$url"; \
	rm -rf "$(BINARYEN_DIR)"; \
	curl -fsSL "$$url" | tar -xz -C "$(CURDIR)/.tools"; \
	test -x "$(BINARYEN_BIN)/wasm-opt"; \
	is_pin "$(BINARYEN_BIN)/wasm-opt" || { echo "ensure-binaryen: expected version $(BINARYEN_VERSION)" >&2; exit 1; }; \
	echo "$(BINARYEN_BIN)" > "$(BINARYEN_PATH_FILE)"; \
	echo "ensure-binaryen: $$($(BINARYEN_BIN)/wasm-opt --version)"

pack: web nodejs

web: web-full

nodejs: nodejs-full

web-full: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_FULL)

web-read-only: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_READ_ONLY)

web-transaction: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_TRANSACTION)

nodejs-full: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" wasm-pack build --target nodejs --release --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_FULL)

nodejs-read-only: ensure-binaryen
	PATH="$$(cat "$(BINARYEN_PATH_FILE)"):$$PATH" wasm-pack build --target nodejs --release --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_READ_ONLY)

clean:
	rm -rf $(WEB_OUT_DIR) $(NODEJS_OUT_DIR)
	cargo clean

test:
	cargo test --features SSE -- --test-threads=1 --nocapture

integration-test:
	cd tests/integration/rust && cargo test -- --test-threads=1 --nocapture

start-app:
	(cd examples/frontend/angular/ && npm install && npm run build-proxy-conf && npm start &) && \
	until curl -s -o /dev/null http://localhost:4200; do sleep 5; done

run-e2e-tests:
	cd tests/e2e && npm install && npm test

e2e-test: start-app run-e2e-tests

.PHONY: start-app run-tests stop-app e2e-test

doc:
	cargo doc --package casper-rust-wasm-sdk --no-deps
	cp -r target/doc/* docs/api-rust/
	npx typedoc --options typedoc.json && rm -rf docs/api-wasm/media

build: pack
	cd examples/frontend/angular/ && npm install && npm run build && cd .
	cd examples/frontend/react/ && npm install && npm run build && cd .
	cd examples/desktop/node/ && npm install && npx tsc && cd .
	cd examples/desktop/electron && npm install && npm run build && cd .

format:
	cargo fmt

lint: format clippy

clippy:
	cargo clippy --target wasm32-unknown-unknown --bins --fix --allow-dirty --allow-staged -- -D warnings
	cargo clippy --lib -- -D warnings
	cargo clippy --target wasm32-unknown-unknown --lib -- -D warnings
	cargo clippy --no-default-features --lib -- -D warnings
	cargo clippy --target wasm32-unknown-unknown --no-default-features --lib -- -D warnings
	cargo clippy --target wasm32-unknown-unknown --no-default-features --features transaction,helpers,watcher,SSE --lib -- -D warnings
	cargo clippy --target wasm32-unknown-unknown --no-default-features --features js --lib -- -D warnings
	cargo clippy --no-default-features --features transaction,helpers --lib -- -D warnings
	cargo clippy --target wasm32-unknown-unknown --no-default-features --features transaction,helpers,watcher,js --lib -- -D warnings

check-lint: clippy
	cargo fmt -- --check

.PHONY: format lint check clippy

DEV_DC = docker compose -f $(CURRENT_DIR)/docker/docker-compose.dev.yml

CICD_DC = docker compose -f $(CURRENT_DIR)/docker/docker-compose.cicd.yml

docker-build:
	$(DEV_DC) build

docker-up:
	$(DEV_DC) up

docker-start:
	$(DEV_DC) up --build --remove-orphans -d

docker-stop:
	$(DEV_DC) stop

docker-build-prod:
	$(CICD_DC) build

docker-up-prod:
	$(CICD_DC) up --build --remove-orphans -d

docker-start-prod:
	$(CICD_DC) up --remove-orphans

docker-stop-prod:
	$(CICD_DC) stop

docker-deploy-prod:
	rm webclient.tar
	$(CICD_DC) build --build-arg BUILD_CONFIGURATION=production
	docker save -o webclient.tar casper-webclient:latest
	scp webclient.tar ubuntu@casper-box:/home/ubuntu/webclient/webclient.tar
	ssh ubuntu@casper-box "sudo docker tag casper-webclient:latest casper-webclient:old"
	ssh ubuntu@casper-box "sudo docker image rm -f casper-webclient:latest"
	ssh ubuntu@casper-box "sudo docker load -i /home/ubuntu/webclient/webclient.tar"
	ssh ubuntu@casper-box "sudo docker image rm -f casper-webclient:old"
	ssh ubuntu@casper-box "sudo docker compose -f /home/ubuntu/webclient/docker-compose.yml up -d --force-recreate"

.PHONY: docker-build docker-start docker-stop docker-start-prod docker-stop-prod

# --- MCP (mcp/ crate) ---
# Cursor/agents: interchouette/casper-rust-wasm-sdk-mcp:{dev,latest,$APP_VERSION} (stdio / HTTP :5790)
# SPA demo:      interchouette/casper-webclient embeds the same binary (ENABLE_MCP, /mcp on :8080)

CASPER_SDK_MCP_IMAGE ?= interchouette/casper-rust-wasm-sdk-mcp:dev
COMPOSE_MCP ?= docker/docker-compose.mcp.yml

mcp-build:
	cargo build -p casper-rust-wasm-sdk-mcp --release

# Local HTTP via slim MCP image (:5790).
mcp-http:
	-docker pull $(CASPER_SDK_MCP_IMAGE)
	CASPER_SDK_MCP_IMAGE=$(CASPER_SDK_MCP_IMAGE) \
		docker compose -f $(COMPOSE_MCP) up -d --force-recreate

mcp-http-stop:
	-docker compose -f $(COMPOSE_MCP) down --remove-orphans
	-docker stop casper-rust-wasm-sdk-mcp 2>/dev/null
	-docker rm casper-rust-wasm-sdk-mcp 2>/dev/null

run-mcp:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet --

# Host cargo HTTP on this product's MCP port.
run-mcp-http:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet -- --http --listen 127.0.0.1:5790

mcp-test:
	cargo test -p casper-rust-wasm-sdk-mcp

mcp-test-live:
	CASPER_RPC_URL=$${CASPER_RPC_URL:-http://127.0.0.1:11101} \
	CASPER_NODE_URL=$${CASPER_NODE_URL:-127.0.0.1:28101} \
		cargo test -p casper-rust-wasm-sdk-mcp --lib -- --ignored --nocapture

.PHONY: mcp-build mcp-http mcp-http-stop \
	run-mcp run-mcp-http mcp-test mcp-test-live

# --- Casperatatui (examples/desktop/casperatatui) ---

run-casperatatui:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo run -p casperatatui -- --preset nctl $(CASPERATATUI_ARGS) $(TUI_ARGS)

# Needs sibling checkout ../../ceps-rust-ts-client (from repo root).
run-casperatatui-ceps:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo run -p casperatatui --features ceps -- --preset nctl $(CASPERATATUI_ARGS) $(TUI_ARGS)

build-casperatatui-release:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo build -p casperatatui --release

# Not part of root wasm clippy matrix.
check-lint-casperatatui:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo clippy -p casperatatui --all-targets --no-deps -- -D warnings
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo fmt -p casperatatui -- --check

# Short aliases (same recipes).
run-tui: run-casperatatui
run-tui-ceps: run-casperatatui-ceps
build-tui-release: build-casperatatui-release
check-lint-tui: check-lint-casperatatui

.PHONY: run-casperatatui run-casperatatui-ceps build-casperatatui-release check-lint-casperatatui \
	run-tui run-tui-ceps build-tui-release check-lint-tui

# --- Signing desk (examples/desktop/tauri) ---

run-tauri:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		$(MAKE) -C examples/desktop/tauri run

build-tauri:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		$(MAKE) -C examples/desktop/tauri build

check-lint-tauri:
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo clippy -p casper-signing-desk --all-targets --no-deps -- -D warnings
	env -u CARGO_TARGET_DIR -u PLAYWRIGHT_BROWSERS_PATH \
		cargo fmt -p casper-signing-desk -- --check

.PHONY: run-tauri build-tauri check-lint-tauri

# --- Python bindings (python/ — maturin) ---

python-develop:
	cd python && \
		(test -d .venv || uv venv .venv) && \
		. .venv/bin/activate && \
		uv pip install 'maturin>=1.7,<2.0' 'pytest>=8,<9' && \
		maturin develop

# Offline unit: Rust params tests + pytest (no node).
python-test: python-develop
	cd python && . .venv/bin/activate && \
		cargo test --manifest-path Cargo.toml --lib && \
		pytest tests/test_unit_offline.py -q

# Live node integration. Needs SECRET_KEY_USER_1 (ci-test/e2e) or CASPER_SECRET_KEY_PEM_FILE.
python-test-nctl: python-develop
	cd python && . .venv/bin/activate && \
		CASPER_RPC_URL=$${CASPER_RPC_URL:-http://127.0.0.1:11101/rpc} \
		pytest tests/test_nctl_integration.py -m nctl -v --tb=short

.PHONY: python-develop python-test python-test-nctl
