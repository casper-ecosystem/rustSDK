prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

# Specify the output directories for web and Node.js targets.
WEB_OUT_DIR = pkg
NODEJS_OUT_DIR = pkg-nodejs

# Cargo feature profiles for wasm-pack (default crate features = full).
# read-only / slim: core RPC only (--no-default-features)
# transaction: builders + put/speculative transaction, no deploy
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

# --- MCP sidecar (mcp/ — path-depends on casper-rust-wasm-sdk) ---

MCP_NAME ?= casper-rust-wasm-sdk-mcp
MCP_VERSION ?= 2.2.2-mcp
MCP_IMAGE ?= $(MCP_NAME):$(MCP_VERSION)
MCP_HUB_IMAGE ?= interchouette/$(MCP_NAME)
MCP_GHCR_PERSONAL_IMAGE ?= ghcr.io/groussac/$(MCP_NAME)
MCP_GHCR_ORG_IMAGE ?= ghcr.io/interchouette-itc/$(MCP_NAME)
COMPOSE_MCP ?= docker/docker-compose.mcp.yml
DOCKER_BUILDKIT ?= 1

mcp-build:
	cargo build -p casper-rust-wasm-sdk-mcp --release

mcp-docker-build:
	DOCKER_BUILDKIT=$(DOCKER_BUILDKIT) docker build --network=host \
		-t $(MCP_IMAGE) \
		-t $(MCP_NAME):latest \
		-t $(MCP_HUB_IMAGE):$(MCP_VERSION) \
		-t $(MCP_HUB_IMAGE):latest \
		-f mcp/Dockerfile \
		.

mcp-docker-push-hub:
	docker push $(MCP_HUB_IMAGE):$(MCP_VERSION)
	docker push $(MCP_HUB_IMAGE):latest

mcp-docker-push-ghcr-personal:
	docker tag $(MCP_HUB_IMAGE):$(MCP_VERSION) $(MCP_GHCR_PERSONAL_IMAGE):$(MCP_VERSION)
	docker tag $(MCP_HUB_IMAGE):latest $(MCP_GHCR_PERSONAL_IMAGE):latest
	docker push $(MCP_GHCR_PERSONAL_IMAGE):$(MCP_VERSION)
	docker push $(MCP_GHCR_PERSONAL_IMAGE):latest

mcp-docker-push-ghcr-itc:
	docker tag $(MCP_HUB_IMAGE):$(MCP_VERSION) $(MCP_GHCR_ORG_IMAGE):$(MCP_VERSION)
	docker tag $(MCP_HUB_IMAGE):latest $(MCP_GHCR_ORG_IMAGE):latest
	docker push $(MCP_GHCR_ORG_IMAGE):$(MCP_VERSION)
	docker push $(MCP_GHCR_ORG_IMAGE):latest

mcp-docker-push: mcp-docker-push-hub mcp-docker-push-ghcr-personal mcp-docker-push-ghcr-itc

# Prefer local/Hub image; build if missing.
mcp-http:
	-docker pull $(MCP_HUB_IMAGE):$(MCP_VERSION)
	@if ! docker image inspect $(MCP_HUB_IMAGE):$(MCP_VERSION) >/dev/null 2>&1 \
		&& ! docker image inspect $(MCP_IMAGE) >/dev/null 2>&1; then \
		echo "MCP image missing; building locally…"; \
		$(MAKE) mcp-docker-build; \
	fi
	CASPER_SDK_MCP_IMAGE=$$(docker image inspect $(MCP_HUB_IMAGE):$(MCP_VERSION) >/dev/null 2>&1 \
		&& echo $(MCP_HUB_IMAGE):$(MCP_VERSION) \
		|| echo $(MCP_IMAGE)) \
		docker compose -f $(COMPOSE_MCP) up -d --force-recreate

mcp-http-stop:
	-docker compose -f $(COMPOSE_MCP) down --remove-orphans
	-docker stop casper-rust-wasm-sdk-mcp 2>/dev/null
	-docker rm casper-rust-wasm-sdk-mcp 2>/dev/null

run-mcp:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet --

run-mcp-http:
	cargo run -p casper-rust-wasm-sdk-mcp --quiet -- --http --listen 127.0.0.1:8790

mcp-test:
	cargo test -p casper-rust-wasm-sdk-mcp

mcp-test-live:
	CASPER_RPC_URL=$${CASPER_RPC_URL:-http://127.0.0.1:11101} \
	CASPER_NODE_URL=$${CASPER_NODE_URL:-127.0.0.1:28101} \
		cargo test -p casper-rust-wasm-sdk-mcp --lib -- --ignored --nocapture

# HTTP (compose) + Docker stdio against live NCTL. Requires: make mcp-http, NCTL up.
mcp-smoke:
	bash mcp/scripts/smoke_transports.sh

.PHONY: mcp-build mcp-docker-build mcp-docker-push-hub mcp-docker-push-ghcr-personal \
	mcp-docker-push-ghcr-itc mcp-docker-push mcp-http mcp-http-stop \
	run-mcp run-mcp-http mcp-test mcp-test-live mcp-smoke
