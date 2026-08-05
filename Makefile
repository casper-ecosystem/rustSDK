prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

# Specify the output directories for web and Node.js targets.
WEB_OUT_DIR = pkg
NODEJS_OUT_DIR = pkg-nodejs

WASM_FEATURES_FULL =
WASM_FEATURES_READ_ONLY = --no-default-features
WASM_FEATURES_TRANSACTION = --no-default-features --features transaction,helpers,watcher

.PHONY: all web nodejs clean build doc web-full web-read-only web-transaction nodejs-full nodejs-read-only

pack: web nodejs

web: web-full

nodejs: nodejs-full

web-full:
	wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_FULL)

web-read-only:
	wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_READ_ONLY)

web-transaction:
	wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_TRANSACTION)

nodejs-full:
	wasm-pack build --target nodejs --release --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_FULL)

nodejs-read-only:
	wasm-pack build --target nodejs --release --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR) $(WASM_FEATURES_READ_ONLY)

clean:
	rm -rf $(WEB_OUT_DIR) $(NODEJS_OUT_DIR)
	cargo clean

test:
	cargo test -- --test-threads=1 --nocapture

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
	cargo clippy --no-default-features --lib -- -D warnings
	cargo clippy --no-default-features --features transaction,helpers --lib -- -D warnings

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

# --- MCP (mcp/ crate; runtime via casper-webclient image) ---
# Hub: interchouette/casper-webclient:{dev,latest,$APP_VERSION}. Slim casper-rust-wasm-sdk-mcp Hub image is deprecated.

WEBCLIENT_HUB_IMAGE ?= interchouette/casper-webclient
CASPER_SDK_MCP_IMAGE ?= $(WEBCLIENT_HUB_IMAGE):dev
COMPOSE_MCP ?= docker/docker-compose.mcp.yml

mcp-build:
	cargo build -p casper-rust-wasm-sdk-mcp --release

# Local HTTP via webclient (SPA :8080 + /mcp). Never binds host :8790 (NCTL).
mcp-http:
	-docker pull $(CASPER_SDK_MCP_IMAGE)
	CASPER_SDK_MCP_IMAGE=$(CASPER_SDK_MCP_IMAGE) \
		docker compose -f $(COMPOSE_MCP) up -d --force-recreate

mcp-http-stop:
	-docker compose -f $(COMPOSE_MCP) down --remove-orphans
	-docker stop casper-webclient-mcp 2>/dev/null
	-docker rm casper-webclient-mcp 2>/dev/null

run-mcp:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet --

# Host cargo HTTP — use :8081 so we do not steal NCTL :8790.
run-mcp-http:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet -- --http --listen 127.0.0.1:8081

mcp-test:
	cargo test -p casper-rust-wasm-sdk-mcp

mcp-test-live:
	CASPER_RPC_URL=$${CASPER_RPC_URL:-http://127.0.0.1:11101} \
	CASPER_NODE_URL=$${CASPER_NODE_URL:-127.0.0.1:28101} \
		cargo test -p casper-rust-wasm-sdk-mcp --lib -- --ignored --nocapture

.PHONY: mcp-build mcp-http mcp-http-stop \
	run-mcp run-mcp-http mcp-test mcp-test-live
