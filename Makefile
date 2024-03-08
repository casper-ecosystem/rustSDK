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
	cd examples/frontend/angular/ && npm ci && npm run build-proxy-conf && npm start & \
	until [ $$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4200) -eq 200 ]; do sleep 1; done

run-e2e-tests:
	cd tests/e2e && npm ci && npm test

e2e-test: start-app run-e2e-tests

.PHONY: start-app run-tests stop-app e2e-test

doc:
	cargo doc --package casper-rust-wasm-sdk --no-deps
	cp -r target/doc/* docs/api-rust/
	npx typedoc --name api-wasm --out docs/api-wasm pkg/casper_rust_wasm_sdk.d.ts

build: pack doc
	cd examples/frontend/angular/ && npm ci && npm run build && cd .
	cd examples/frontend/react/ && npm ci && npm run build && cd .
	cd examples/desktop/node/ && npm ci && npx tsc index.ts && cd .
	cd examples/desktop/electron && npm ci && npm run build && cd .

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