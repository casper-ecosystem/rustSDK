# Casper Rust/Wasm SDK 2.2.2

The Rust/Wasm SDK allows developers and users to interact with the Casper Blockchain using Rust, TypeScript, or Python. It provides a way to embed the [casper-client-rs](https://github.com/casper-ecosystem/casper-client-rs) into another application without the CLI interface. The SDK exposes a list of types and methods from a subset of the Casper client.

You can use the Casper Rust/Wasm SDK in these ways:

- In a <strong>Rust application</strong> by importing the SDK crate.
- In a <strong>Typescript application</strong> by importing the SDK Wasm file and the Typescript interfaces.
- In a <strong>Python application</strong> via the PyO3 / maturin package [`python/`](../python/) (`casper-rust-wasm-sdk-py`).

This page covers different examples of using the SDK.

⚠ WARNING: This application is for testing and development purposes. Do NOT use private keys or perform real transactions on mainnet unless you fully understand the security risks.

## Try the Wasm webclient

A hosted build of the Angular **frontend** example — **[Casper WebClient](https://casper-webclient.interchouette.net/)** — lets you exercise the Wasm SDK in the browser against public networks (testnet / mainnet).

- Live demo: https://casper-webclient.interchouette.net/
- Source: [`examples/frontend/angular`](../examples/frontend/angular) (see also React under [Usage](#usage))
- Optional desktop shell for that same UI: [Electron](#electron-desktop-shell) under [Desktop examples](#desktop-examples)

Demo / development only — same warning as above.

## MCP

The workspace package [`mcp/`](../mcp/) (`casper-rust-wasm-sdk-mcp`) exposes the native Rust SDK as [MCP](https://modelcontextprotocol.io/) tools for Cursor and other agents.

- **Cursor/agents (slim Hub):** `interchouette/casper-rust-wasm-sdk-mcp` — `:dev` (tip) / `:latest` = `:2.2.2` (stable)
- **Hosted SPA:** https://casper-webclient.interchouette.net/mcp (`casper-webclient` embeds the same binary, `ENABLE_MCP=1`)
- **Local Docker:** `make mcp-http` → http://127.0.0.1:5790/mcp
- **Host HTTP:** `make run-mcp-http` → http://127.0.0.1:5790/mcp
- **stdio:** `interchouette/casper-rust-wasm-sdk-mcp:dev` (see [`mcp/mcp.json.example`](../mcp/mcp.json.example))
- **GitHub Releases:** Latest = node-aligned semver (`v2.2.2`); tip desktop cut = Pre-release [`dev-preview`](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/releases) (overwritten after green nightly)

```bash
make run-mcp      # stdio (host cargo)
make run-mcp-http # HTTP on 127.0.0.1:5790
make mcp-http     # slim image → http://127.0.0.1:5790/mcp
make mcp-test
make mcp-test-live  # against a live local node
```

See [`mcp/README.md`](../mcp/README.md), tool inventory [`mcp/TOOLS.md`](../mcp/TOOLS.md), and Cursor sample [`mcp/mcp.json.example`](../mcp/mcp.json.example).

## Install

<details>
  <summary><strong><code>Rust Project</code></strong></summary>

## Rust Project

Add the SDK as a dependency of your project:

> Cargo.toml

```toml
casper-rust-wasm-sdk = { version = "2.2.2", git = "https://github.com/casper-ecosystem/casper-rust-wasm-sdk.git", branch = "dev" }
```

## Usage

> main.rs

```rust
use casper_rust_wasm_sdk::{types::verbosity::Verbosity, SDK};

let sdk = SDK::new(
  Some("https://node.testnet.casper.network".to_string()),
  Some(Verbosity::High)
);
```

</details>

<details>
  <summary><strong><code>Typescript Project</code></strong></summary>

## Typescript Project

You can directly use the content of the [pkg folder](pkg/) for a browser project or [pkg-nodejs](pkg-nodejs/) for a Node project.

Or you can use the [TODO][npm package](https://todo)

#### Build package with Wasm pack

If you want to compile the Wasm package from Rust you may need to install `wasm-pack` for ease of use.

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```shell
$ make prepare
$ make pack
```

`make pack` ensures Binaryen **version_130** on `PATH` (host or `.tools/`) so `wasm-pack` does not fall back to its vendored Binaryen 117. Do not use `apt install binaryen` (often 120).

This will create a `pkg` and `pkg-nodejs` containing the Typescript interfaces. You can find more details about building the SDK for Javascript with `wasm-pack` in the [wasm-pack documention](https://rustwasm.github.io/docs/wasm-pack/commands/build.html).

### Cargo features

Default is `full` + `js` (today's JS/wasm API) for both the wasm package and the Rust `rlib`. Slim builds drop optional surfaces. Omit `js` for Rust-only consumers so wasm-bindgen exports are not linked into a foreign pack.

| Profile                 | Make target                | Cargo flags                                                              |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------ |
| full + SSE (wasm packs) | `make web` / `make nodejs` | default features + `--features SSE` (SSEClient + CESParser; `js` on)     |
| read-only               | `make web-read-only`       | `--no-default-features --features js`                                    |
| transaction (no deploy) | `make web-transaction`     | `--no-default-features --features transaction,helpers,watcher,js`        |

Optional features: `js` (wasm-bindgen / js-sys surface; default on), `transaction`, `deploy`, `contract`, `binary-port`, `watcher` (wait/watch), `SSE` (node SSE client + CES; enables `watcher`), `helpers`. Core JSON-RPC reads stay available without them. `binary-port` pulls optional `casper-binary-port*` crates. Domain feature `full` does not include `js`.

Cargo crate `default` includes `full` and `js`. Browser `pkg` and Node `pkg-nodejs` packs from `make web` / `make nodejs` also enable `SSE` so demos and e2e harnesses get the full SDK surface. A dependent crate's own wasm-pack must not enable this SDK's `js` feature if it wants a private export surface (no SDK `SDK` / `Key` / `Transaction` classes in its `.d.ts`).

This folder contains a Wasm binary, a JS wrapper file, Typescript types definitions, and a package.json file that you can load in your project.

```shell
$ tree pkg
pkg
├── casper_rust_wasm_sdk_bg.wasm
├── casper_rust_wasm_sdk_bg.wasm.d.ts
├── casper_rust_wasm_sdk.d.ts
├── casper_rust_wasm_sdk.js
├── LICENSE
├── package.json
└── README.md
```

## Usage

<details>
  <summary><strong><code>React</code></strong></summary>

## Web React

> package.json

```json
{
  "name": "my-react-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The React app needs to load the Wasm file through a dedicated `init()` method as per this example:

> App.tsx

```ts
import init, {
  SDK,
  Verbosity,
} from 'casper-rust-wasm-sdk';

const rpc_address = 'https://node.testnet.casper.networko';
const verbosity = Verbosity.High;

function App() {
  const [wasm, setWasm] = useState(false);
  const fetchWasm = async () => {
    await init();
    setWasm(true);
  };

  useEffect(() => {
    initApp(); // take care here to initiate app only once and not on every effect
  }, []);

  const initApp = async () => {
  if (!wasm) {
    await fetchWasm();
  };

  const sdk = new SDK(rpc_address, verbosity);
  console.log(sdk);
  ...
}
```

#### Frontend React example

You can look at a very basic example of usage in the [React example app](examples/frontend/react/src/App.tsx).

```shell
$ cd ./examples/frontend/react
$ npm install
$ npm start
```

</details>
<details>
  <summary><strong><code>Angular</code></strong></summary>

## Web Angular

The full in-repo Angular example is the **Casper WebClient**. Try the hosted build at **[https://casper-webclient.interchouette.net/](https://casper-webclient.interchouette.net/)**, or run it locally from [`examples/frontend/angular`](../examples/frontend/angular).

> package.json

```json
{
  "name": "my-angular-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The Angular app needs to load the Wasm file through a dedicated `init()` method as per this example. You can import it into a component through a service but it is advised to import it through a factory with the injection token [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER).

> wasm.factory.ts

```js
import init, { SDK, Verbosity } from 'casper-rust-wasm-sdk';

export const SDK_TOKEN = new InjectionToken() < SDK > 'SDK';
export const WASM_ASSET_PATH =
  new InjectionToken() < string > 'wasm_asset_path';
export const RPC_ADDRESS = new InjectionToken() < string > 'rpc_address';
export const VERBOSITY = new InjectionToken() < Verbosity > 'verbosity';

type Params = {
  wasm_asset_path: string,
  rpc_address: string,
  verbosity: Verbosity,
};

export const fetchWasmFactory = async (params: Params): Promise<SDK> => {
  const wasm = await init(params.wasm_asset_path);
  return new SDK(params.rpc_address, params.verbosity);
};
```

> wasm.module.ts

```ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SDK_TOKEN, fetchWasmFactory, provideSafeAsync } from "./wasm.factory";

const providers = provideSafeAsync(SDK_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers,
})
export class WasmModule {}
```

You can look at a basic example of factory usage in the [Angular example app](examples/frontend/angular/libs/util/services/wasm/src/lib/wasm.factory.ts).

Add the SDK Wasm file to the assets of your project with the path parameter being ` wasm_asset_path:'assets/casper_rust_wasm_sdk_bg.wasm'`. Angular copies it into `assets` on build for the fetch Wasm factory. From Angular 21.2 the asset `input` must stay inside the workspace root, so point at the installed package (for example `file:../../../pkg` → `node_modules/casper-rust-wasm-sdk`), not at `../../../pkg` directly.

> project.json

```json
"assets": [
  ...,
  {
    "input": "node_modules/casper-rust-wasm-sdk",
    "glob": "casper_rust_wasm_sdk_bg.wasm",
    "output": "assets"
  }
]
```

#### Frontend Angular example

Try the hosted **[Casper WebClient](https://casper-webclient.interchouette.net/)**, or look at a more advanced example of usage in the [Angular example app](examples/frontend/angular/src/app/app.component.ts).

```shell
$ cd ./examples/frontend/angular
$ npm install
$ npm start
$ npm build
```

</details>

<details>
  <summary><strong><code>Node</code></strong></summary>

## Desktop Node

> package.json

```json
{
  "name": "my-node-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg-nodejs", // [TODO] Npm package
    ...
}
```

The Node app loads the SDK with `require()`. You can find more details about building the SDK for [Node with wasm-pack](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs).
Note that this method requires a version of Node.js with WebAssembly support, which is currently Node 8 and above.

> index.ts

```ts
// with require
const casper_sdk = require("casper-rust-wasm-sdk");
const { SDK } = casper_sdk;

// or with import
import { SDK } from "casper-rust-wasm-sdk";

const rpc_address = "https://node.testnet.casper.network";
const sdk = new SDK(rpc_address);
console.log(sdk);
```

#### Desktop Node example

You can look at a very basic example of usage in the [Node example app](examples/desktop/node/index.ts).

```shell
$ cd ./examples/desktop/node
$ npm install
$ npm start
```

</details>

</details>

<details>
  <summary><strong><code>Python Project</code></strong></summary>

## Python Project

The workspace package [`python/`](../python/) (`casper-rust-wasm-sdk-py`) is a PyO3 / maturin extension over the same native Rust `rlib` (not a Python port). Full surface and helpers: [`python/README.md`](../python/README.md).

Requires CPython 3.10+ and a Rust toolchain.

```bash
cd python
uv venv .venv
source .venv/bin/activate
uv pip install maturin
maturin develop
```

From the repo root you can also run `make python-test` (offline unit) or `make python-test-nctl` (live node). The `python-bindings` workflow runs both against Hub NCTL `:dev`.

## Usage

```python
import casper_rust_wasm_sdk_py as casper

RPC = "https://node.testnet.casper.network/rpc"

status = casper.get_node_status(RPC)
print(status["chainspec_name"], status["build_version"])

# Optional session wrapper for addresses / verbosity
sdk = casper.Sdk(RPC, verbosity="low")
print(sdk.get_rpc_address(), sdk.get_verbosity())
```

Deploy APIs and binary-port are not wrapped. Transaction V1 and Runtime V1 / V2 are supported on the transaction / contract helpers.

</details>

## Usage

### RPC call examples

<details>
  <summary><strong><code>Rust</code></strong></summary>
<br>

You can find all RPC methods on the [RPC doc](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/rpcs/). Below are several examples of RPC methods intended for use on Testnet.

#### Get transaction by transaction hash

```rust
use casper_rust_wasm_sdk::types::{
    transaction::Transaction, hash::transaction_hash::TransactionHash,
};

let transaction_hash =
    TransactionHash::new("a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9")
        .unwrap();

let finalized_approvals = true;
let get_transaction = sdk
    .get_transaction(transaction_hash, Some(finalized_approvals), None, None)
    .await;

let transaction: Transaction = get_transaction.unwrap().result.transaction.into();
let timestamp = transaction.timestamp();
let hash = transaction.hash();
println!("{timestamp} {hash}");
```

#### Get deploy by deploy hash (legacy)

```rust
use casper_rust_wasm_sdk::types::hash::deploy_hash::DeployHash;

let deploy_hash =
    DeployHash::new("a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9")
        .unwrap();

let finalized_approvals = true;
let get_deploy = sdk
    .get_deploy(deploy_hash, Some(finalized_approvals), None, None)
    .await;

let deploy = get_deploy.unwrap().result.deploy;
let deploy_header = deploy.header();
let timestamp = deploy_header.timestamp();
println!("{timestamp}");
```

#### Get auction state information

```rust
let get_auction_info = sdk.get_auction_info(None, None, None).await;

let auction_state = get_auction_info.unwrap().result.auction_state;
let state_root_hash = auction_state.state_root_hash();
println!("{:?}", state_root_hash);
let block_height = auction_state.block_height();
println!("{block_height}");
```

#### Get peers from the network

```rust
let get_peers = sdk.get_peers(None, None).await;

let peers = get_peers.unwrap().result.peers;
for peer in &peers {
    println!("{:?}", peer)
}
```

#### Get the latest block information

```rust
let get_block = sdk.get_block(None, None, None).await;

let get_block = sdk.get_block(None, None, None).await;

let block = get_block
    .unwrap()
    .result
    .block_with_signatures
    .unwrap()
    .block;
let block_hash = block.hash();
println!("{:?}", block_hash);
println!("{:?}", block_hash);
```

You can find more examples by reading [Rust integration tests](../tests/integration/rust/src/tests/mod.rs).

</details>

<details>
  <summary><strong><code>Typescript</code></strong></summary>
<br>

You can find all RPC methods on the [RPC doc](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/SDK.html). Below are several examples of RPC methods intended for use on Testnet.

#### Get transaction by transaction hash

```ts
import { Transaction } from "casper-rust-wasm-sdk";

const transaction_hash_as_string =
  "94b3e6253a4448138fb8b637bd0ca0604270d2f5664f7c221d67eae568fcd668";
const finalized_approvals = true;

const get_transaction_options = sdk.get_transaction_options({
  transaction_hash_as_string,
  finalized_approvals,
});

const transaction_result = await sdk.get_transaction(get_transaction_options);

const transaction: Transaction = transaction_result.transaction;
const timestamp = transaction.timestamp;
const hash = transaction.hash.toString();
console.log(timestamp, hash);
```

#### Get deploy by deploy hash (legacy)

```ts
const deploy_hash_as_string =
  "a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9";
const finalized_approvals = true;

const get_deploy_options = sdk.get_deploy_options({
  deploy_hash_as_string,
  finalized_approvals,
});

const deploy_result = await sdk.get_deploy(get_deploy_options);

const deploy = deploy_result.deploy;
const timestamp = deploy.timestamp();
const header = deploy.toJson().header; // DeployHeader type not being exposed right now by the SDK you can convert every type to JSON
const hash = deploy.hash.toString();
console.log(timestamp, header, hash);
```

#### Get auction state information

```ts
const get_auction_info = await sdk.get_auction_info();

const auction_state = get_auction_info.auction_state;
const state_root_hash = auction_state.state_root_hash.toString();
const block_height = auction_state.block_height.toString();
console.log(state_root_hash, block_height);
```

#### Get peers from the network

```ts
const get_peers = await sdk.get_peers();

const peers = get_peers.peers;
peers.forEach((peer) => {
  console.log(peer);
});
```

#### Get the latest block information

```ts
const get_block = await sdk.get_block();

let block = get_block.block;
let block_hash = block.hash;
console.log(block_hash);
```

You can find more examples in [NodeJs examples](../examples/desktop/node/index.ts), the [Angular example app](../examples/frontend/angular/src/app/app.component.ts) (live at [casper-webclient.interchouette.net](https://casper-webclient.interchouette.net/)), the [React example app](../examples/frontend/react/src/App.tsx), or by reading [Puppeteer e2e tests](../tests/e2e/puppeteer/tests.spec.ts).

</details>

<details>
  <summary><strong><code>Python</code></strong></summary>
<br>

Python bindings return JSON strings for most RPC results (parse with `json.loads`). Full list: [`python/README.md`](../python/README.md). Examples below use Testnet-style URLs; swap in your node as needed.

```python
import json
import casper_rust_wasm_sdk_py as casper

RPC = "https://node.testnet.casper.network/rpc"
```

#### Get transaction by transaction hash

```python
raw = casper.get_transaction(
    "94b3e6253a4448138fb8b637bd0ca0604270d2f5664f7c221d67eae568fcd668",
    True,
    RPC,
)
result = json.loads(raw)
print(list(result.keys()))
```

#### Get auction state information

```python
auction = json.loads(casper.get_auction_info(None, RPC))
print(list(auction.keys()))
```

#### Get peers from the network

```python
peers = json.loads(casper.get_peers(RPC))
print(len(peers.get("peers") or []))
```

#### Get the latest block information

```python
block = json.loads(casper.get_block(None, RPC))
print(list(block.keys()))
```

#### Get node status

```python
status = casper.get_node_status(RPC)
print(status["chainspec_name"], status["build_version"])
```

`get_deploy` / `get_account` / `get_era_info` are not wrapped (prefer `get_transaction`, `get_entity`, `get_era_summary`). More examples: [`python/README.md`](../python/README.md), `make python-test`, `make python-test-nctl`.

</details>

### More examples

<details>
  <summary><strong><code>Transactions and Transfers</code></strong></summary>
<br>

<details>
    <summary>Making a <strong>Transfer</strong> transaction</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(PUBLIC_KEY);
transaction_params.set_ttl(Some(TTL.to_string()));
transaction_params.set_payment_amount(PAYMENT_AMOUNT);

let make_transfer_transaction = sdk
    .make_transfer_transaction(
        None, // optional maybe_source
        TARGET_ACCOUNT,
        TRANSFER_AMOUNT,
        transaction_params,
        None, // optional transfer_id
    )
    .unwrap();
println!("{:?}", make_transfer_transaction.timestamp());
```

#### Typescript

```ts
import { TransactionStrParams } from "casper-rust-wasm-sdk";

const chain_name = "integration-test";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = undefined;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = "1h"; // or undefined
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const transaction_params = new TransactionStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl,
);

transaction_params.payment_amount = payment_amount;

const make_transfer_transaction = sdk.make_transfer_transaction(
  undefined, // Optional maybe_source
  target_account,
  transfer_amount,
  transaction_params,
);
const make_transfer_transaction_as_json = make_transfer_transaction.toJson();
console.log(make_transfer_transaction_as_json);
```

#### Python

```python
import json
import casper_rust_wasm_sdk_py as casper

chain_name = "integration-test"
payment_amount = "100000000"
transfer_amount = "2500000000"
target_account = (
    "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54"
)
pem = casper.secret_key_generate()  # treat as secret

params = json.dumps(
    {
        "chain_name": chain_name,
        "payment_amount": payment_amount,
        "secret_key": pem,
    }
)
unsigned = casper.make_transfer_transaction(target_account, transfer_amount, params)
signed = casper.sign_transaction(unsigned, pem)
print(signed[:120], "...")
```

</details>

<details>
    <summary>Sending a <strong>Transfer</strong> transaction (alias for: make + put)</summary>
<br>

Sends a [`Transfer Transaction`] to the network for execution. (Alias for make_transfer_transaction + put_transaction)

#### Rust

```rust
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_ttl(Some(TTL.to_string()));
transaction_params.set_payment_amount(PAYMENT_AMOUNT);

let transfer = sdk
    .transfer_transaction(
        None, // optional maybe_source
        TARGET_ACCOUNT,
        TRANSFER_AMOUNT,
        transaction_params,
        None, // optional transfer_id
        None,
        None,
    )
    .await;
println!("{:?}", transfer.as_ref().unwrap().result.transaction_hash.to_hex_string());
```

#### Typescript

```ts
import { TransactionStrParams, getTimestamp } from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = "1h"; // or undefined
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const transaction_params = new TransactionStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl,
);

transaction_params.payment_amount = payment_amount;

const transfer_transaction_result = await sdk.transfer_transaction(
  undefined, // Optional maybe_source
  target_account,
  transfer_amount,
  transaction_params,
);
const transfer_transaction_result_as_json =
  transfer_transaction_result.toJson();
console.log(transfer_transaction_result_as_json);
const transaction_hash =
  transfer_transaction_result.transaction_hash.toString();
console.log(transaction_hash);
```

#### Python

```python
import json
import casper_rust_wasm_sdk_py as casper

RPC = "http://127.0.0.1:11101/rpc"
chain_name = "casper-net-1"
payment_amount = "100000000"
transfer_amount = "2500000000"
target_account = (
    "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54"
)
# Load a funded secret key PEM (do not commit real secrets)
pem = open("secret_key.pem", encoding="utf-8").read()

params = json.dumps(
    {
        "chain_name": chain_name,
        "payment_amount": payment_amount,
        "secret_key": pem,
    }
)
put = json.loads(
    casper.transfer_transaction(
        target_account,
        transfer_amount,
        params,
        None,
        None,
        RPC,
    )
)
print(put.get("transaction_hash") or put)
```

</details>

<details>
    <summary>Making a <strong>Session</strong> transaction</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::{
    addr::entity_addr::EntityAddr,
    hash::addressable_entity_hash::AddressableEntityHash,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const ENTITY_ADDR: &str =
    "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(PUBLIC_KEY);
transaction_params.set_ttl(Some(TTL.to_string()));
transaction_params.set_payment_amount(PAYMENT_AMOUNT);

let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
let builder_params = TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

let transaction = sdk
    .make_transaction(builder_params, transaction_params)
    .unwrap();
println!("{:?}", transaction.timestamp());
```

#### Typescript

```ts
import {
  TransactionStrParams,
  TransactionBuilderParams,
  AddressableEntityHash,
} from "casper-rust-wasm-sdk";

const chain_name = "integration-test";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const payment_amount = "5000000000";
const entity_hash_hex_string =
  "5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
const entry_point = "set_variables";

const transaction_params = new TransactionStrParams(chain_name, public_key);
transaction_params.payment_amount = payment_amount;

let entity_hash = new AddressableEntityHash(entity_hash_formatted_string);
let builder_params = TransactionBuilderParams.newInvocableEntity(
  entity_hash,
  entry_point,
);

const transaction = sdk.make_transaction(builder_params, transaction_params);
const transaction_as_json = transaction.toJson();
console.log(transaction_as_json);
```

</details>

<details>
    <summary>Sending a <strong>Session</strong> transaction (alias for: make + put)</summary>
<br>

Sends a [`Transaction`] to the network for execution. (Alias for make_transaction + put_transaction)

#### Rust

```rust
let sdk = SDK::new(
    Some("http://127.0.0.1:11101".to_string()),
    Some(Verbosity::High),
);

use casper_rust_wasm_sdk::types::{
    hash::addressable_entity_hash::AddressableEntityHash,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const ENTITY_ADDR: &str =
    "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(PUBLIC_KEY);
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_ttl(Some(TTL.to_string()));
transaction_params.set_payment_amount(PAYMENT_AMOUNT);

let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
let builder_params = TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

let transaction = sdk.transaction(builder_params, transaction_params, None, None).await;
println!(
    "{:?}",
    transaction.as_ref().unwrap().result.transaction_hash
);
```

#### Typescript

```ts
import {
  TransactionStrParams,
  TransactionBuilderParams,
  AddressableEntityHash,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "5000000000";
const entity_hash_hex_string =
  "5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
const entry_point = "set_variables";

const transaction_params = new TransactionStrParams(
  chain_name,
  public_key,
  secret_key,
);
transaction_params.payment_amount = payment_amount;

let entity_hash = new AddressableEntityHash(entity_hash_hex_string);
let builder_params = TransactionBuilderParams.newInvocableEntity(
  entity_hash,
  entry_point,
);

const transaction_result = await sdk.transaction(
  builder_params,
  transaction_params,
);
const transaction_result_as_json = transaction_result.toJson();
console.log(transaction_result_as_json);
```

</details>

<details>
    <summary><strong>Put</strong> Transaction</summary>

#### Rust

Puts a [`Transaction`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::{
    hash::addressable_entity_hash::AddressableEntityHash,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const ENTITY_ADDR: &str =
    "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(initiator_addr); // sender account
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_ttl(Some(TTL.to_string())); // optional TTL
transaction_params.set_payment_amount(PAYMENT_AMOUNT);

let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
let builder_params = TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();

let put_transaction = sdk.put_transaction(transaction, None, None).await;
println!(
    "{:?}",
    put_transaction.as_ref().unwrap().result.transaction_hash
);
```

Puts a [`Transfer Transaction`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;

pub const CHAIN_NAME: &str = "casper-net-1";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";
pub const TTL: &str = "1h";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(initiator_addr);
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_payment_amount(PAYMENT_AMOUNT);
transaction_params.set_ttl(Some(TTL.to_string()));

let transfer_transaction = Transaction::new_transfer(
    None,
    TARGET_ACCOUNT,
    TRANSFER_AMOUNT,
    transaction_params,
    None,
)
.unwrap();

let put_transaction = sdk.put_transaction(transfer_transaction, None, None).await;
println!(
    "{:?}",
    put_transaction.as_ref().unwrap().result.transaction_hash
);
```

#### Typescript

Puts a [`Transaction`] to the network for execution.

```ts
import {
  TransactionStrParams,
  TransactionBuilderParams,
  AddressableEntityHash,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "5000000000";
const entity_hash_formatted_string =
  "addressable-entity-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
const entry_point = "set_variables";

const transaction_params = new TransactionStrParams(
  chain_name,
  public_key,
  secret_key,
);
transaction_params.payment_amount = payment_amount;

let entity_hash = AddressableEntityHash.fromFormattedStr(
  entity_hash_formatted_string,
);
let builder_params = TransactionBuilderParams.newInvocableEntity(
  entity_hash,
  entry_point,
);

const transaction = Transaction.newSession(builder_params, transaction_params);
const put_transaction_result = await sdk.put_transaction(transaction);
const put_transaction_result_as_json = put_transaction_result.toJson();
console.log(put_transaction_result_as_json);
```

Puts a [`Transfer Transaction`] to the network for execution.

```ts
import { Transaction, TransactionStrParams } from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const transfer_params = new TransactionStrParams(
  chain_name,
  public_key,
  secret_key,
);

transfer_params.payment_amount = payment_amount;

const transfer_transaction = Transaction.newTransfer(
  undefined, // optional maybe_source
  target_account,
  transfer_amount,
  transfer_params,
);

const put_transaction_result = await sdk.put_transaction(transfer_transaction);
const put_transaction_result_as_json = put_transaction_result.toJson();
console.log(put_transaction_result_as_json);
```

</details>

<details>
    <summary><strong>Sign</strong> Transaction</summary>

#### Rust

```rust
pub const SECRET_KEY: &str = "MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI";
... //  same code as 'Making a Session/Transfer Transaction' example
let unsigned_transaction = sdk.make_transaction(builder_params, transaction_params).unwrap();
let signed_transaction = unsigned_transaction.sign(SECRET_KEY);
```

#### Typescript

```ts
const secret_key = 'MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI';
... //  same code as 'Making a Session/Transfer Transaction' example
const unsigned_transaction = sdk.make_transaction(builder_params, transaction_params);
const signed_transaction = unsigned_transaction.sign(secret_key);
```

</details>

<details>
    <summary><strong>SSEClient</strong> (full event stream) and <strong>CESParser</strong></summary>

Feature `SSE` (enables `watcher`) adds a JS-SDK-style node SSE client and a CES contract-event decoder. Cargo `default` / `full` includes `watcher` only (`wait_transaction` / `watch_transaction`). Enable `SSE` in Rust dependencies when you need `SSEClient` or `CESParser`. Wasm packs from `make web` / `make nodejs` already include `SSE`, so browser `pkg` and Node `pkg-nodejs` expose the full surface.

How the pieces relate:

- **Watcher** (`feature = "watcher"`): wait or watch until a given transaction or deploy is processed. Included in Cargo `full`.
- **SSEClient** (`feature = "SSE"`): subscribe to or collect the node event stream (`ApiVersion`, `BlockAdded`, `TransactionProcessed`, …). Prefer this for continuous streams or bounded collects.
- **CESParser** (`feature = "SSE"`): decode Casper Event Standard payloads from an execution result (`__events` / `__events_schema`). It does not replace the watcher; it consumes execution results you already obtained (for example from `wait_transaction` or `get_transaction`).

CES only applies to contracts that publish CES schema named keys. For CEP-78 that means install-time `events_mode = 2` (CES). Mode `0` is no events; mode `1` is CEP47 (`events` dictionary) and is not readable by `CESParser`.

#### Rust — SSEClient

Developers using Rust can open an SSE client against a node events URL, subscribe by event name, and either run until `stop()` or collect a bounded batch (useful for scripts and MCP).

```rust
use casper_rust_wasm_sdk::SSE::{EventName, SSEClient};

let client = sdk.SSE_client("http://127.0.0.1:18101/events");
client
    .subscribe(EventName::BlockAdded, |raw| {
        println!("{} {}", raw.event_type, raw.last_event_id);
    })
    .unwrap();
client
    .subscribe(EventName::TransactionProcessed, |raw| {
        let payload = raw.parse_as_transaction_processed().unwrap();
        println!("{}", payload.name);
    })
    .unwrap();
// client.start(None).await.unwrap(); // runs until client.stop()
```

Bounded collect:

```rust
let events = client
    .collect(&[EventName::ApiVersion, EventName::BlockAdded], 5, 15_000, None)
    .await
    .unwrap();
```

`start_from` / collect `Some(0)` requests the stream from the beginning of the node's retained buffer (same framing as the watcher).

#### TypeScript — SSEClient

```ts
import init, { SDK, EventName } from "casper-rust-wasm-sdk";

await init();
const sdk = new SDK("http://127.0.0.1:11101/rpc");
const client = sdk.SSE_client("http://127.0.0.1:18101/events");

client.subscribe("BlockAdded", (raw) => {
  console.log(raw.eventType, raw.lastEventId, raw.data);
});
client.subscribe("TransactionProcessed", (raw) => {
  const body = JSON.parse(raw.data).TransactionProcessed;
  console.log(body);
});
// await client.start(); // until client.stop()
```

#### Rust — CESParser

Load contract metadata (including `__events_schema`) via `query_global_state`, then parse transforms from an execution-result JSON string. Pass a `hash-…`, bare hex, or `entity-contract-…` named key: `CESParser::create` remaps via `helpers::contract_hash_key_for_global_state` when addressable entities are disabled and global state expects `hash-…` → `StoredValue::Contract`.

```rust
use casper_rust_wasm_sdk::SSE::CESParser;

let parser = CESParser::create(&sdk, &["<contract-hash-hex>".into()], None, None)
    .await
    .unwrap();
let results = parser
    .parse_execution_result_json(&execution_result_json)
    .unwrap();
for r in results {
    println!("{} {:?}", r.event.name, r.error);
}
```

Typical flow with the watcher: `wait_transaction` → take `execution_result` from the processed payload or from `get_transaction` → `parse_execution_result_json`. Prefer a mint (or other state-changing entry point) execution over a bare install when you need a CES event such as `Mint`.

#### TypeScript — CESParser

```ts
import init, { SDK } from "casper-rust-wasm-sdk";

await init();
const sdk = new SDK("http://127.0.0.1:11101/rpc");

const parser = await sdk.CES_parser(
  ["hash-<contract-hash-hex>"],
  null,
  "http://127.0.0.1:11101/rpc",
);
console.log(parser.contractCount());

const events = parser.parseExecutionResultJson(JSON.stringify(executionResult));
for (const row of events) {
  if (!row.error && row.event?.name) {
    console.log(row.event.name, row.event);
  }
}
```

See also [`examples/desktop/node/sse-ces.ts`](../examples/desktop/node/sse-ces.ts).

</details>

<details>
    <summary><strong>Wait</strong> Transaction</summary>

#### Rust

Developers using Rust can utilize the wait_transaction function to wait for a specific transaction event. This is achieved by providing the desired event URL, transaction hash, and an optional timeout duration. Once the transaction is processed, the resulting data, such as the transaction's cost, can be easily accessed and utilized in subsequent logic.

```rust
pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events";

let transaction_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Wait for transaction
let event_parse_result = sdk
    .wait_transaction(DEFAULT_EVENTS_ADDRESS, &transaction_hash, timeout_duration)
    .await
    .unwrap();
let transaction_processed = event_parse_result.body.unwrap().get_transaction_processed();
println!("{:?}", transaction_processed);
```

#### Typescript

In TypeScript, the waitTransaction function provides a similar capability to wait for a specific transaction event. Developers can leverage this function by specifying the event address, transaction hash, and an optional timeout duration. The received EventParseResult object can then be processed to extract valuable information, such as the cost of the transaction.

```ts
const events_address = "http://127.0.0.1:18101/events";

const transaction_hash =
  "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

const timeout_duration = undefined; // 30000 for 30s instead of default timeout duration of 60s

// Wait for transaction
const eventParseResult: EventParseResult = await sdk.waitTransaction(
  events_address,
  transaction_hash,
  timeout_duration,
);
console.log(eventParseResult.body.transaction_processed);
const cost =
  eventParseResult.body?.transaction_processed?.execution_result.Success?.cost;
console.log(`transaction cost ${cost}`);
```

#### Python

```python
import json
import casper_rust_wasm_sdk_py as casper

events_url = "http://127.0.0.1:18101/events"
transaction_hash = (
    "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4"
)
timeout_ms = None  # or 30_000 for 30s; default is 60s when omitted

waited = casper.wait_transaction(events_url, transaction_hash, timeout_ms)
body = json.loads(waited)
print(body.get("body"))
```

</details>

<details>
    <summary><strong>Watch</strong> Transaction</summary>

#### Rust

The watch_transaction functionality facilitates actively monitoring transaction events. By creating a transaction watcher, developers can subscribe to specific transaction hashes and define custom callback functions to handle these events. The watcher is then started, and as transaction events occur, the specified callback functions are executed. This mechanism enables real-time responsiveness to transaction events within Rust applications.

```rust
use casper_rust_wasm_sdk::watcher::{
    Subscription, EventHandlerFn,
};

pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events";

let transaction_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Creates a watcher instance
let mut watcher = sdk.watch_transaction(DEFAULT_EVENTS_ADDRESS, timeout_duration);

// Create a callback function handler of your design
let event_handler_fn = get_event_handler_fn(transaction_hash.to_string());

let mut subscriptions: Vec<Subscription> = vec![];
subscriptions.push(Subscription::new(
    transaction_hash.to_string(),
    EventHandlerFn::new(event_handler_fn),
));

// Subscribe and start watching
let _ = watcher.subscribe(subscriptions);
let results = watcher.start().await;
watcher.stop();
println!("{:?}", results);
```

#### Typescript

Similarly, TypeScript developers can utilize the watchTransaction function to actively watch for transaction events on the Casper blockchain. By creating a transaction watcher and defining callback functions, developers can subscribe to specific transaction hashes and respond dynamically as events unfold.

```ts
import { EventParseResult, Subscription } from "casper-rust-wasm-sdk";

const events_address = "http://127.0.0.1:18101/events";

const transaction_hash =
  "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

// Creates a watcher instance
const watcher = sdk.watchTransaction(events_address);

// Create a callback function handler of your design
const getEventHandlerFn = (transactionHash: string) => {
  const eventHandlerFn = (eventParseResult: EventParseResult) => {
    console.log(`callback for ${transactionHash}`);
    if (eventParseResult.err) {
      return false;
    } else if (
      eventParseResult.body?.transaction_processed?.execution_result.Success
    ) {
      console.log(
        eventParseResult.body?.transaction_processed?.execution_result.Success,
      );
      return true;
    } else {
      console.error(
        eventParseResult.body?.transaction_processed?.execution_result.Failure,
      );
      return false;
    }
  };
  return eventHandlerFn;
};

const eventHandlerFn = getEventHandlerFn(transaction_hash);

const subscription: Subscription = new Subscription(
  transaction_hash,
  eventHandlerFn,
);
const subscriptions: Subscription[] = [subscription];

// Subscribe and start watching
watcher.subscribe(subscriptions);
const results = await watcher.start();
watcher.stop();
console.log(results);
```

</details>

</details>

<details>
    <summary><strong><code>CEP-78</code></strong></summary>

CEP-78 `events_mode` (u8): `0` NoEvents, `1` CEP47 (`events` dictionary), `2` CES (`__events` / `__events_schema`). Use `2` when you intend to decode events with `CESParser` (feature `SSE`).

#### Install

- <strong>Rust</strong>

```rust
use casper_rust_wasm_sdk::{
    helpers::json_pretty_print,
    types::{
        hash::transaction_hash::TransactionHash,
        transaction_params::transaction_str_params::TransactionStrParams,
    },
};

use std::{time, time::Duration};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const ARGS_JSON: &str = r#"[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 2}
]"#;
pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
pub const CEP78_CONTRACT: &str = "cep78.wasm";
pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events";

let transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(PUBLIC_KEY);
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_session_args_json(ARGS_JSON);
transaction_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);

let file_path = CEP78_CONTRACT;
let transaction_bytes = match read_wasm_file(file_path) {
    Ok(transaction_bytes) => transaction_bytes,
    Err(err) => {
        vec![]
        // return Err(format!("Error reading file {}: {:?}", file_path, err));
    }
};

let install = sdk
    .install(transaction_params, transaction_bytes.into(), None)
    .await;

let transaction_hash = install.as_ref().unwrap().result.transaction_hash;
println!("{:?}", transaction_hash);

let transaction_hash_as_string = transaction_hash.to_hex_string();
println!("wait transaction_hash {}", transaction_hash_as_string);
let event_parse_result: EventParseResult = sdk
    .wait_transaction(DEFAULT_EVENTS_ADDRESS, &transaction_hash_as_string, None)
    .await
    .unwrap();
println!("{:?}", event_parse_result);

let finalized_approvals = true;

let get_transaction = sdk
    .get_transaction(
        transaction_hash.into(),
        Some(finalized_approvals),
        None,
        None,
    )
    .await
    .unwrap();
let result = json_pretty_print(
    get_transaction.result.transaction.approvals(),
    Some(Verbosity::Low),
).unwrap();
println!("approvals {result}");

let result = transaction_hash.to_hex_string();
println!("processed transaction hash {result}");
```

with

```rust
fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let root_path = Path::new("./wasm/");
    let path = root_path.join(file_path);
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}
```

- <strong>Typescript</strong>

```ts
import {
  ...
  TransactionStrParams,
  publicKeyFromSecretKey,
  Bytes,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const initiator_addr = publicKeyFromSecretKey(secret_key);
const transaction_params = new TransactionStrParams(chain_name, initiator_addr, secret_key);
transaction_params.session_args_json = JSON.stringify([
  {"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
  {"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
  {"name": "total_token_supply", "type": "U64", "value": 10},
  {"name": "ownership_mode", "type": "U8", "value": 0},
  {"name": "nft_kind", "type": "U8", "value": 1},
  {"name": "allow_minting", "type": "Bool", "value": true},
  {"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
  {"name": "nft_metadata_kind", "type": "U8", "value": 2},
  {"name": "identifier_mode", "type": "U8", "value": 0},
  {"name": "metadata_mutability", "type": "U8", "value": 0},
  {"name": "events_mode", "type": "U8", "value": 2}
]);
transaction_params.payment_amount = '500000000000';

const buffer = await loadFile();
const wasm = buffer && new Uint8Array(buffer);
const wasmBuffer = wasm?.buffer;
if (!wasmBuffer) {
  console.error('Failed to read wasm file.');
  return;
}

const install_result = await sdk.install(
  transaction_params,
  Bytes.fromUint8Array(wasm)
);
const install_result_as_json = install_result.toJson();
console.log(install_result_as_json);
const transaction_hash = install_result.transaction_hash.toString();
console.log(transaction_hash);
```

with

```ts
async function loadFile() {
  try {
    const fileBuffer = await fs.readFile("cep78.wasm");
    return fileBuffer.buffer; // Returns an ArrayBuffer
  } catch (error) {
    throw new Error("Error reading file: " + error.message);
  }
}
```

#### Mint

- <strong>Rust</strong>

```rust
use casper_rust_wasm_sdk::types::{
    hash::addressable_entity_hash::AddressableEntityHash,
    transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
    -----END PRIVATE KEY-----"#;
pub const ENTITY_ADDR: &str =
    "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRYPOINT_MINT: &str = "mint";
pub const TOKEN_OWNER: &str =
    "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
pub const PAYMENT_AMOUNT: &str = "5000000000";

let mut transaction_params = TransactionStrParams::default();
transaction_params.set_chain_name(CHAIN_NAME);
transaction_params.set_initiator_addr(PUBLIC_KEY);
transaction_params.set_secret_key(SECRET_KEY);
transaction_params.set_payment_amount(PAYMENT_AMOUNT);
let args = Vec::from([
    "token_meta_data:String='test_meta_data'".to_string(),
    format!("token_owner:Key='{TOKEN_OWNER}'").to_string(),
]);
transaction_params.set_session_args_simple(args);

let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
let builder_params =
    TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

let call_entrypoint = sdk
    .call_entrypoint(builder_params, transaction_params, None)
    .await;
let transaction_hash_result = call_entrypoint
    .as_ref()
    .unwrap()
    .result
    .transaction_hash;
let transaction_hash = transaction_hash_result.to_hex_string();
println!("watch transaction_hash {transaction_hash}");
```

- <strong>Typescript</strong>

```ts
import {
  ...
  TransactionStrParams,
  publicKeyFromSecretKey,
  Bytes,
  AddressableEntityHash,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const secret_key = '';
const initiator_addr = publicKeyFromSecretKey(secret_key);
const entity_hash_formatted_string =
  'addressable-entity-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
const entry_point = 'mint';
const payment_amount = '5000000000';
const token_owner = 'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';

const transaction_params = new TransactionStrParams(chain_name, initiator_addr, secret_key);
transaction_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];
transaction_params.payment_amount = payment_amount;

let entity_hash = AddressableEntityHash.fromFormattedStr(entity_hash_formatted_string);
let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);

const call_entrypoint_result = await sdk.call_entrypoint(
  builder_params,
  transaction_params
);
const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
console.log(call_entrypoint_result_as_json);
const transaction_hash = call_entrypoint_result.transaction_hash.toString();
console.log(transaction_hash);
```

</details>

### More examples (Legacy)

<details>
  <summary><strong><code>Deploys and Transfers (Legacy)</code></strong></summary>
<br>

<details>
    <summary>Making a Transfer</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,            // sender account
    None,                  // optional secret key to sign transfer deploy
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let make_transfer = sdk
    .make_transfer(
        TRANSFER_AMOUNT,
        TARGET_ACCOUNT, // target account
        None,           // optional transfer_id
        deploy_params,
        payment_params,
    )
    .unwrap();
println!("{:?}", make_transfer.header().timestamp());
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  getTimestamp,
} from "casper-rust-wasm-sdk";

const chain_name = "integration-test";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = undefined;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = "1h"; // or undefined
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const deploy_params = new DeployStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl,
);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_deploy = sdk.make_transfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params,
);
const transfer_deploy_as_json = transfer_deploy.toJson();
console.log(transfer_deploy_as_json);
```

</details>

<details>
    <summary>Transfer</summary>
<br>

Sends a [`Transfer Deploy`] to the network for execution. (Alias for make_transfer + put_deploy)

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let transfer = sdk
    .transfer(
        TRANSFER_AMOUNT,
        TARGET_ACCOUNT,
        None, // optional transfer_id
        deploy_params,
        payment_params,
        None,
        None,
    )
    .await;
println!("{:?}", transfer.as_ref().unwrap().result.deploy_hash.to_hex_string());
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  getTimestamp,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = "1h"; // or undefined
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const deploy_params = new DeployStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl,
);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_result = await sdk.transfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params,
);
const transfer_result_as_json = transfer_result.toJson();
console.log(transfer_result_as_json);
console.log(transfer_result.deploy_hash.toString());
```

</details>

<details>
    <summary>Making a Deploy</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,            // sender account
    None,                  // optional secret key to sign deploy
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy = awaitsdk
    .make_deploy(deploy_params, session_params, payment_params)
    .unwrap();
println!("{:?}", deploy.header().timestamp());
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
} from "casper-rust-wasm-sdk";

const chain_name = "integration-test";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const payment_amount = "5000000000";
const contract_hash =
  "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";

const deploy_params = new DeployStrParams(chain_name, public_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = "set_variables";

const payment_params = new PaymentStrParams(payment_amount);

const deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
const deploy_as_json = deploy.toJson();
console.log(deploy_as_json);
```

</details>

<details>
    <summary>Deploy</summary>
<br>

Sends a [`Deploy`] to the network for execution. (Alias for make_deploy + put_deploy)

#### Rust

```rust
let sdk = SDK::new(
    Some("http://127.0.0.1:11101".to_string()),
    Some(Verbosity::High),
);

use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy = sdk
    .deploy(deploy_params, session_params, payment_params, None, None)
    .await;
println!("{:?}", deploy.as_ref().unwrap().result.deploy_hash);
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "5000000000";
const contract_hash =
  "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = "set_variables";

const payment_params = new PaymentStrParams(payment_amount);

const deploy_result = await sdk.deploy(
  deploy_params,
  session_params,
  payment_params,
);
const deploy_result_as_json = deploy_result.toJson();
console.log(deploy_result_as_json);
```

</details>

<details>
    <summary>Put Deploy</summary>

#### Rust

Puts a [`Deploy`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::{
    deploy::Deploy,
    deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy =
    Deploy::with_payment_and_session(deploy_params, session_params, payment_params).unwrap();

let put_deploy = sdk.put_deploy(deploy, None, None).await;
println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
```

Puts a [`Transfer Deploy`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::{
    deploy::Deploy,
    deploy_params::{deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams},
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TARGET_ACCOUNT: &str =
    "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let transfer_deploy = Deploy::with_transfer(
    TRANSFER_AMOUNT,
    TARGET_ACCOUNT,
    None,
    deploy_params,
    payment_params,
)
.unwrap();

let put_deploy = sdk.put_deploy(transfer_deploy, None, None).await;
println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
```

#### Typescript

Puts a [`Deploy`] to the network for execution.

```ts
import {
  Deploy,
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "5000000000";
const contract_hash =
  "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
const entry_point = "set_variables";

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = entry_point;

const payment_params = new PaymentStrParams(payment_amount);

const deploy = Deploy.withPaymentAndSession(
  deploy_params,
  session_params,
  payment_params,
);

const put_deploy_result = await sdk.put_deploy(deploy);
const put_deploy_result_as_json = put_deploy_result.toJson();
console.log(put_deploy_result_as_json);
```

Puts a [`Transfer Deploy`] to the network for execution.

```ts
import {
  Deploy,
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
} from "casper-rust-wasm-sdk";

const chain_name = "casper-net-1";
const public_key =
  "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = "100000000";
const transfer_amount = "2500000000";
const target_account =
  "0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54";

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_deploy = Deploy.withTransfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params,
);

const put_deploy_result = await sdk.put_deploy(transfer_deploy);
const put_deploy_result_as_json = put_deploy_result.toJson();
console.log(put_deploy_result_as_json);
```

</details>

<details>
    <summary>Sign Deploy</summary>

#### Rust

```rust
pub const SECRET_KEY: &str = "MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI";
... //  same code as 'Making a Deploy' example
let unsigned_deploy = sdk.make_deploy(deploy_params, session_params, payment_params).unwrap();
let signed_deploy = sdk.sign_deploy(unsigned_deploy, SECRET_KEY);
```

#### Typescript

```ts
const secret_key = 'MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI';
... //  same code as 'Making a Deploy' example
const unsigned_deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
const signed_deploy = unsigned_deploy.sign(secret_key);
```

</details>

<details>
    <summary>Wait Deploy</summary>

#### Rust

Developers using Rust can utilize the wait_deploy function to wait for a specific deploy event. This is achieved by providing the desired event URL, deploy hash, and an optional timeout duration. Once the deploy is processed, the resulting data, such as the deploy's cost, can be easily accessed and utilized in subsequent logic.

```rust
pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events/main";

let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Wait for deploy
let event_parse_result = sdk
    .wait_deploy(DEFAULT_EVENTS_ADDRESS, &deploy_hash, timeout_duration)
    .await
    .unwrap();
let deploy_processed = event_parse_result.body.unwrap().deploy_processed.unwrap();
println!("{:?}", deploy_processed);
```

#### Typescript

In TypeScript, the waitDeploy function provides a similar capability to wait for a specific deploy event. Developers can leverage this function by specifying the event address, deploy hash, and an optional timeout duration. The received EventParseResult object can then be processed to extract valuable information, such as the cost of the deploy.

```ts
const events_address = "http://127.0.0.1:18101/events/main";

const deploy_hash =
  "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

const timeout_duration = undefined; // 30000 for 30s instead of default timeout duration of 60s

// Wait for deploy
const eventParseResult: EventParseResult = await sdk.waitDeploy(
  events_address,
  install_result_as_json.deploy_hash,
  timeout_duration,
);
console.log(eventParseResult.body.DeployProcessed);
const cost =
  eventParseResult.body?.DeployProcessed?.execution_result.Success?.cost;
console.log(`deploy cost ${cost}`);
```

</details>

<details>
    <summary>Watch Deploy</summary>

#### Rust

The watch_deploy functionality facilitates actively monitoring deploy events. By creating a deploy watcher, developers can subscribe to specific deploy hashes and define custom callback functions to handle these events. The watcher is then started, and as deploy events occur, the specified callback functions are executed. This mechanism enables real-time responsiveness to deploy events within Rust applications.

```rust
use casper_rust_wasm_sdk::deploy_watcher::watcher::{
    Subscription, EventHandlerFn,
};

pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events/main";

let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Creates a watcher instance
let mut watcher = sdk.watch_deploy(DEFAULT_EVENTS_ADDRESS, timeout_duration);

// Create a callback function handler of your design
let event_handler_fn = get_event_handler_fn(deploy_hash.to_string());

let mut subscriptions: Vec<Subscription> = vec![];
subscriptions.push(Subscription::new(
    deploy_hash.to_string(),
    EventHandlerFn::new(event_handler_fn),
));

// Subscribe and start watching
let _ = watcher.subscribe(subscriptions);
let results = watcher.start().await;
watcher.stop();
println!("{:?}", results);
```

#### Typescript

Similarly, TypeScript developers can utilize the watchDeploy function to actively watch for deploy events on the Casper blockchain. By creating a deploy watcher and defining callback functions, developers can subscribe to specific deploy hashes and respond dynamically as events unfold.

```ts
import { EventParseResult, Subscription } from "casper-rust-wasm-sdk";

const events_address = "http://127.0.0.1:18101/events/main";

const deploy_hash =
  "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

// Creates a watcher instance
const watcher = sdk.watchDeploy(events_address);

// Create a callback function handler of your design
const getEventHandlerFn = (deployHash: string) => {
  const eventHandlerFn = (eventParseResult: EventParseResult) => {
    console.log(`callback for ${deployHash}`);
    if (eventParseResult.err) {
      return false;
    } else if (
      eventParseResult.body?.DeployProcessed?.execution_result.Success
    ) {
      console.log(
        eventParseResult.body?.DeployProcessed?.execution_result.Success,
      );
      return true;
    } else {
      console.error(
        eventParseResult.body?.DeployProcessed?.execution_result.Failure,
      );
      return false;
    }
  };
  return eventHandlerFn;
};

const eventHandlerFn = getEventHandlerFn(deploy_hash);

const subscription: Subscription = new Subscription(
  deploy_hash,
  eventHandlerFn,
);
const subscriptions: Subscription[] = [subscription];

// Subscribe and start watching
watcher.subscribe(subscriptions);
const results = await watcher.start();
watcher.stop();
console.log(results);
```

</details>

</details>

<details>
    <summary><strong><code>CEP-78 (Legacy)</code></strong></summary>

#### Install

- <strong>Rust</strong>

```rust
use casper_rust_wasm_sdk::{
    helpers::json_pretty_print,
    types::{
        hash::deploy_hash::DeployHash,
        deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    },
};

use std::{time, time::Duration};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const ARGS_JSON: &str = r#"[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 2}
]"#;
pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
pub const CEP78_CONTRACT: &str = "cep78.wasm";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,
    Some(SECRET_KEY.to_string()),
    None,
    None,
);

let session_params = SessionStrParams::default();
session_params.set_session_args_json(ARGS_JSON);

let file_path = CEP78_CONTRACT;
let module_bytes = match read_wasm_file(file_path) {
    Ok(module_bytes) => module_bytes,
    Err(err) => {
        return Err(format!("Error reading file {}: {:?}", file_path, err));
    }
};

session_params.set_session_bytes(module_bytes.into());

let install = sdk
    .install_deploy(deploy_params, session_params, PAYMENT_AMOUNT_CONTRACT_CEP78, None)
    .await;

let deploy_hash = install.as_ref().unwrap().result.deploy_hash;
let deploy_hash_string = deploy_hash.to_hex_string();
println!("{:?}", deploy_hash_string);

let event_parse_result = sdk
    .wait_deploy(DEFAULT_EVENTS_ADDRESS, &deploy_hash_string)
    .await
    .unwrap();
let deploy_processed = event_parse_result.body.unwrap().deploy_processed.unwrap();
println!("{:?}", deploy_processed);

let finalized_approvals = true;
let get_deploy = sdk
    .get_deploy(deploy_hash.into(), Some(finalized_approvals), None, None)
    .await;
let get_deploy = get_deploy.unwrap();
let result = &get_deploy.result.execution_results.get(0).unwrap().result;
println!("{}", json_pretty_print(result, Some(Verbosity::High)).unwrap());
```

with

```rust
fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let root_path = Path::new("./wasm/");
    let path = root_path.join(file_path);
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}
```

- <strong>Typescript</strong>

```ts
import {
  ...
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  publicKeyFromSecretKey,
  Bytes,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const public_key = publicKeyFromSecretKey(secret_key);
const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_args_json = JSON.stringify([
  {"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
  {"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
  {"name": "total_token_supply", "type": "U64", "value": 10},
  {"name": "ownership_mode", "type": "U8", "value": 0},
  {"name": "nft_kind", "type": "U8", "value": 1},
  {"name": "allow_minting", "type": "Bool", "value": true},
  {"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
  {"name": "nft_metadata_kind", "type": "U8", "value": 2},
  {"name": "identifier_mode", "type": "U8", "value": 0},
  {"name": "metadata_mutability", "type": "U8", "value": 0},
  {"name": "events_mode", "type": "U8", "value": 2}
]);
const payment_amount = '500000000000';

const buffer = await loadFile();
const wasm = buffer && new Uint8Array(buffer);
const wasmBuffer = wasm?.buffer;
if (!wasmBuffer) {
  console.error('Failed to read wasm file.');
  return;
}

session_params.session_bytes = Bytes.fromUint8Array(wasm);

const install_result = await sdk.install_deploy(
  deploy_params,
  session_params,
  payment_amount
);
const install_result_as_json = install_result.toJson();
console.log(install_result_as_json);
const deploy_hash = install_result.deploy_hash.toString();
console.log(deploy_hash);
```

with

```ts
async function loadFile() {
  try {
    const fileBuffer = await fs.readFile("cep78.wasm");
    return fileBuffer.buffer; // Returns an ArrayBuffer
  } catch (error) {
    throw new Error("Error reading file: " + error.message);
  }
}
```

#### Mint

- <strong>Rust</strong>

```rust
use casper_rust_wasm_sdk::types::{
    hash::deploy_hash::DeployHash,
    deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
    -----END PRIVATE KEY-----"#;
pub const CONTRACT_HASH: &str =
    "hash-c12808431d490e2c463c2f968d0a4eaa0f9d57842508d9041aa42e2bd21eb96c";
pub const ENTRYPOINT_MINT: &str = "mint";
pub const TOKEN_OWNER: &str =
    "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
pub const PAYMENT_AMOUNT: &str = "5000000000";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,
    Some(SECRET_KEY.to_string()),
    None,
    None,
);
let mut session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRYPOINT_MINT);

let args = Vec::from([
    "token_meta_data:String='test_meta_data'".to_string(),
    format!("token_owner:Key='{TOKEN_OWNER}'").to_string(),
]);
session_params.set_session_args(args);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);
let call_entrypoint = sdk
    .call_entrypoint_deploy(deploy_params, session_params, payment_params, None)
    .await;
let deploy_hash_result = call_entrypoint.as_ref().unwrap().result.deploy_hash;
println!("{:?}", deploy_hash_result);
```

- <strong>Typescript</strong>

```ts
import {
  ...
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  publicKeyFromSecretKey,
  Bytes,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const secret_key = '';
const public_key = publicKeyFromSecretKey(secret_key);
const contract_hash =
  'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
const entry_point = 'mint';
const token_owner = 'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = entry_point;
session_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];

const call_entrypoint_result = await sdk.call_entrypoint_deploy(
  deploy_params,
  session_params,
  payment_amount
);
const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
console.log(call_entrypoint_result_as_json);
const deploy_hash = call_entrypoint_result.deploy_hash.toString();
console.log(deploy_hash);
```

</details>

### Desktop examples

Under [`examples/desktop/`](../examples/desktop/): native or packaged desktop apps. **Casper WebClient** itself lives under [`examples/frontend/`](../examples/frontend/) (Angular / React); Electron below is only a desktop shell for that Angular UI.

<details open>
  <summary><strong>Electron</strong> (desktop shell for Casper WebClient)</summary>

<br>

![Electron shell running Casper WebClient](images/get_status-electron.png)

**Electron** loads the Angular **Casper WebClient** Wasm build in a desktop window (same UI as the [hosted WebClient](https://casper-webclient.interchouette.net/)). It is not a separate product: frontend = WebClient; this package wraps it for local desktop installs.

```shell
$ cd ./examples/desktop/electron
$ npm install
$ npm start
$ npm build
```

- Source: [`examples/desktop/electron`](../examples/desktop/electron)
- Frontend source: [`examples/frontend/angular`](../examples/frontend/angular)
- Pre-built demos: **[GitHub Releases](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/releases)** (Windows portable, Linux AppImage, Snap). Mac build is TODO.

</details>

<details open>
  <summary><strong>Casper Signing Desk</strong> (Tauri)</summary>

<br>

![Casper Signing Desk](images/signing-desk.jpg)

**Casper Signing Desk** is a Tauri desktop example over the native Rust SDK: message sign/verify, keygen, transfer / stake compose, multisig approvals, and `wait_transaction`. Transaction path only (no deploy). Specialized signing desk; not the WebClient catalog.

**Native PEM unlock:** pick a secret-key `.pem` with the OS file dialog; Rust holds it in a session for signing. The webview only sees the public key. Unload (or quit) clears the session. Compose can build unsigned JSON without unlocking; sign / add approval need an unlocked PEM. Details: [Native PEM unlock](../examples/desktop/tauri/README.md#native-pem-unlock) in the example README.

- Source: [`examples/desktop/tauri`](../examples/desktop/tauri)
- Make: `make run-tauri`, `make build-tauri`, `make check-lint-tauri`
- Example README: [`examples/desktop/tauri/README.md`](../examples/desktop/tauri/README.md)

</details>

<details open>
  <summary><strong>Casperatatui</strong> (TUI)</summary>

<br>

![Casperatatui Actions](images/casperatatui-actions.jpg)

**Casperatatui** is a Casper TUI (terminal UI) based on [ratatui](https://ratatui.rs/), over the native Rust SDK. JSON-RPC and SSE only (no binary port).

- Source: [`examples/desktop/casperatatui`](../examples/desktop/casperatatui)
- GitHub Releases / Pre-release [`dev-preview`](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/releases): linux binary `casperatatui-<label>-linux-x86_64`

```bash
make run-casperatatui
# alias
make run-tui

make run-tui TUI_ARGS='--preset testnet'
make run-tui TUI_ARGS='--preset mainnet'
```

Writes stay off unless you pass `--enable-writes` and a secret key. Not part of the default SDK crate build or Hub images (unlike MCP).

See [`examples/desktop/casperatatui/README.md`](../examples/desktop/casperatatui/README.md).

</details>

## Python

The workspace package [`python/`](../python/) (`casper-rust-wasm-sdk-py`) is a PyO3 / maturin extension over the same native Rust `rlib` (not a Python port).

- Install / develop: see [Python Project](#python-project) under Install above, or [`python/README.md`](../python/README.md)
- CI: path-filtered `python-bindings` (offline unit + Hub NCTL `:dev`)
- Make: `make python-test`, `make python-test-nctl`

Initial face: [#117](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/pull/117). Parity waves 1–4: [#121](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/pull/121) (closes [#120](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/120)). Epic [#9](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/9) is **closed**. Deploy APIs, binary-port, and PyPI publish remain out of that epic.

## Rust API

Published rustdoc: [crate root](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/) · [all items](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/all.html)

Cargo features (see `Cargo.toml`): `transaction`, `deploy`, `contract`, `binary-port`, `watcher`, `SSE` (includes `watcher` + `SSEClient` / `CESParser`), `helpers`. Default bundle is `full` (not the same as enabling `SSE`).

### SDK and RPC

- [SDK](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/struct.SDK.html) — construct with RPC URL / verbosity; all `get_*` / `put_*` / builders hang here
- [RPC module](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/rpcs/index.html)

### Transactions (Casper 2.x)

- [TransactionStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/transaction_params/transaction_str_params/index.html) — chain name, signing, TTL, payment, session args
- [TransactionBuilderParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/transaction_params/transaction_builder_params/index.html) — session / entity / package / transfer targets; **runtime** `VmCasperV1` or `VmCasperV2` (session/entity/package default to V2; set V1 for classic wasm such as CEP-78)
- [Transaction](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/transaction/struct.Transaction.html) — sign / put / rebuild; session args are either **named** (`session_args`) or **Bytesrepr** (`session_args_bytes`, `is_bytesrepr` / `is_named`)

### Deploys (legacy 1.x path)

- [Deploy params](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/deploy_params/index.html) — `DeployStrParams`, `SessionStrParams`, `PaymentStrParams`, dictionary params
- [Deploy](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/deploy/struct.Deploy.html)

### Contracts (feature `contract`)

High-level install / entrypoint / dictionary / key query helpers on `SDK` (see rustdoc methods and the [Install / Mint examples](#more-examples) above). When addressable entities are **off**, named keys may still look like `entity-contract-…` while `query_global_state` expects `hash-…` — use [`contract_hash_key_for_global_state`](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/helpers/fn.contract_hash_key_for_global_state.html) (or pass `entity-contract-…` into `CESParser::create`, which remaps). Background for node core: [#96](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/96).

### Watcher and SSE

- [watcher](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/watcher/index.html) — wait / watch for a transaction (or legacy deploy) to finalize (`Subscription`, `EventParseResult`)
- Feature **`SSE`**: [`SSEClient`](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/SSE/index.html) for the node event stream (`BlockAdded`, `TransactionProcessed`, …) and [`CESParser`](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/SSE/index.html) for Casper Event Standard transforms (`events_mode: 2`). Examples: [SSEClient / CESParser](#rust--sseclient)

### Types and helpers

- [types](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/types/index.html) — keys, hashes, CL values, verbosity, …
- [helpers](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/helpers/index.html) — hashing, TTL/timestamp parse, dictionary item key, motes, **AE-off contract key remap**, …

### Binary Port (feature `binary-port`)

- [binary_port](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-rust/casper_rust_wasm_sdk/binary_port/index.html) — native binary-port reads (block headers, global state, rewards, speculative exec, …) when talking to a node that exposes the port

### MCP (agents)

Not part of the Rust crate root: sibling package [`mcp/`](../mcp/) wraps the same SDK as MCP tools. See [MCP](#mcp) above and [`mcp/TOOLS.md`](../mcp/TOOLS.md).

### Python

Not part of the Rust crate root: sibling package [`python/`](../python/) wraps the same SDK as a PyO3 extension. See [Python](#python) above and [`python/README.md`](../python/README.md).

## Typescript API

Published typedoc: [index](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/index.html)

Same surface as Rust, via the Wasm pack (`pkg` / `pkg-nodejs`). Notable entry points:

### SDK and RPC

- [SDK](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/SDK.html)

### Transactions

- [TransactionStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/TransactionStrParams.html)
- [TransactionBuilderParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/TransactionBuilderParams.html) — `setRuntimeV1` / `setRuntimeV2`
- [Transaction](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/Transaction.html) — named vs Bytesrepr session args (`session_args` / `session_args_bytes` / `is_bytesrepr`)

### Deploys (legacy)

- [DeployStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/DeployStrParams.html), [SessionStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/SessionStrParams.html), [PaymentStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/PaymentStrParams.html), [DictionaryItemStrParams](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/DictionaryItemStrParams.html)
- [Deploy](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/Deploy.html)

### Watcher and SSE / CES

- [Watcher](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/Watcher.html), [Subscription](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/Subscription.html), [EventParseResult](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/EventParseResult.html)
- `SDK.SSE_client` / `SDK.CES_parser` (Wasm build with `SSE`) — see [TypeScript SSE / CES examples](#typescript--sseclient)

### Types and helpers

- [modules](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/modules.html) — types + free functions (`contractHashKeyForGlobalState`, `makeDictionaryItemKey`, …)

### Binary Port

- Methods on [SDK](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/api-wasm/classes/SDK.html#Methods) (binary-port feature)

## Casper Wallet

In Typescript the `window.CasperWalletProvider` is wrapped into `CasperWallet` Class.
Two ways to sign a transaction, either signTransaction

```ts
transaction = await wallet.signTransaction(transaction, public_key); // public_key can be undefined for current active address in the wallet
```

or signTransactionHash and adding signature to the transaction

```ts
const public_key = await wallet.getActivePublicKey();
const signature = await wallet.signTransactionHash(
  transaction.hash.toString(),
  public_key,
);
signature && (transaction = transaction.addSignature(public_key, signature));
```

## Testing

Tests are run against NCTL by default. Alternately, you may configure another network in corresponding configuration. Tests assume a `secret_key.pem` will be located in the root `tests` directory, or one level higher at `../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/`. This path can be changed in the configuration or .env file.
(Rust tests must be run with `--test-threads=1`)

- Unit tests can be run at root folder with

```shell
make test
```

[configured with .env](.env) or [configured in module](src/sdk/rpcs/mod.rs)

- [Rust Integration tests](tests/integration/rust/) can be run with

```shell
make integration-test
```

[configured in config](tests/integration/rust/src/config.rs)

- [Jest/Puppeteer E2E tests](tests/e2e/) can be run with

```shell
cd tests/e2e/puppeteer
npm install
```

then

```shell
make e2e-test
```

[configured with .env](.env) or [puppeteer config](tests/e2e/puppeteer/config.ts)

`SECRET_KEY_NCTL_PATH` (alternative is direct keys `SECRET_KEY_USER_1` and `SECRET_KEY_USER_2` from [casper-node-launcher-js](https://github.com/casper-network/casper-node-launcher-js/tree/main) )

Example of .env

```
SECRET_KEY_NCTL_PATH=/casper/casper-nctl-2-docker/assets/users/user-1/
# SECRET_KEY_USER_1 = MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
# SECRET_KEY_USER_2 = MC4CAQAwBQYDK2VwBCIEIJTD9IlUYzuMHbvAiFel/uqd6V7vUtUD19IEQlo6SAFC
# RPC_ADDRESS=http://localhost:7777
# EVENTS_ADDRESS=http://localhost:9999/events/main
# SPECULATIVE_ADDRESS=http://localhost:7778
# CHAIN_NAME=casper-net-1
# SECRET_KEY_NAME=secret_key.pem
```

## Todo

Open tracking (not a full roadmap):

- [#36](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/36) — first crates.io publish
- [#96](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/96) — explainer for node core: AE-off `entity-contract-…` vs `hash-…` on `query_global_state` (SDK remaps; permanent fix is upstream)
- [#118](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/118) — C bindings (cdylib / cbindgen)
- [#119](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/119) — Go bindings (cgo / native)

Mac desktop Electron build is still TODO (Windows / Linux demos ship on releases).

⚠ **Reminder**: Do not use private keys or perform real transactions on mainnet unless you are fully aware of the security risks.
