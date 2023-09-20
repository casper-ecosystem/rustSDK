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

doc:
	cargo doc --package casper-rust-wasm-sdk
	cp -r target/doc/static.files/ docs/static.files/
	cp -r target/doc/casper_rust_wasm_sdk/* docs/api-rust/
	typedoc --out docs/api-wasm pkg/casper_rust_wasm_sdk.d.ts

build:
	cd examples/frontend/angular/ && npm run build && cd .
	cd examples/frontend/react/ && npm run build && cd .
	cd examples/desktop/node/ && npx tsc index.ts && cd .
	cd examples/desktop/electron && npm run build && cd .
