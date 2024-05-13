prepare:
	rustup target add wasm32-unknown-unknown

CURRENT_DIR = .

# Specify the output directories for web and Node.js targets.
WEB_OUT_DIR = pkg
NODEJS_OUT_DIR = pkg-nodejs

.PHONY: all web nodejs clean build doc

pack: web nodejs

web:
	wasm-pack build --target web --release --out-dir $(WEB_OUT_DIR) $(CURRENT_DIR)

nodejs:
	wasm-pack build --target nodejs --release --out-dir $(NODEJS_OUT_DIR) $(CURRENT_DIR)

clean:
	rm -rf $(WEB_OUT_DIR) $(NODEJS_OUT_DIR)
	cargo clean

test:
	cargo test -- --test-threads=1 --nocapture

integration-test:
	cd tests/integration/rust && cargo test -- --test-threads=1 --nocapture

start-app:
	(cd examples/frontend/angular/ && npm ci && npm run build-proxy-conf && npm start &) && \
	until curl -s -o /dev/null http://localhost:4200; do sleep 5; done

run-e2e-tests:
	cd tests/e2e && npm ci && npm test

e2e-test: start-app run-e2e-tests

.PHONY: start-app run-tests stop-app e2e-test

doc:
	cargo doc --package casper-rust-wasm-sdk --no-deps
	cp -r target/doc/* docs/api-rust/
	npx typedoc --name api-wasm --out docs/api-wasm pkg/casper_rust_wasm_sdk.d.ts

build: pack
	cd examples/frontend/angular/ && npm install && npm run build && cd .
	cd examples/frontend/react/ && npm install && npm run build && cd .
	cd examples/desktop/node/ && npm install && npx tsc index.ts && cd .
	cd examples/desktop/electron && npm install && npm run build && cd .

format:
	cargo fmt

lint: format clippy

clippy:
	cargo clippy --target wasm32-unknown-unknown --bins -- -D warnings
	cargo clippy --lib -- -D warnings
	cargo clippy --no-default-features --lib -- -D warnings

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

docker-start-prod:
	$(CICD_DC) build --build-arg BUILD_CONFIGURATION=docker
	$(CICD_DC) up --remove-orphans -d

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