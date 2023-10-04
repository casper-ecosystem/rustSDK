# Casper Rust/Wasm SDK

The Rust/Wasm SDK allows developers and users to interact with the Casper Blockchain using Rust or TypeScript. It provides a way to embed the [casper-client-rs](https://github.com/casper-ecosystem/casper-client-rs) into another application without the CLI interface. The SDK exposes a list of types and methods from a subset of the Casper client.

You can use the Casper Rust/Wasm SDK in two ways.

- In a <strong>Rust application</strong> by importing the SDK crate.
- In a <strong>Typescript application</strong> by importing the SDK Wasm file and the Typescript interfaces.

This page covers different examples of using the SDK.

## Install

<details>
  <summary><strong><code>Rust Project</code></strong></summary>

## Rust Project

Add the sdk as dependency of your project

> Cargo.toml

```toml
casper-rust-wasm-sdk = { version = "0.1.0", git = "https://github.com/casper-ecosystem/rustSDK.git" }
```

## Usage

> main.rs

```rust
use casper_rust_wasm_sdk::{SDK, Verbosity};

let sdk = SDK::new(
  Some("https://rpc.testnet.casperlabs.io".to_string()),
  Some(Verbosity.High)
);
```

</details>

<details>
  <summary><strong><code>Typescript Project</code></strong></summary>

## Typescript Project

You can directly use the content of the [pkg folder](pkg/) for a browser project or [pkg-nodejs](pkg-nodejs/) for a Node project.

Or you can use the [TODO][npm package](https://todo)

#### Build package with wasm pack

If you want to compile the wasm package from Rust you might need to install wasm-pack for ease of use.

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```shell
$ make prepare
$ make pack
```

will create a `pkg` and `pkg-nodejs` cointaining the typescript interfaces. You can find more details about building the sdk for javascript with wasm-pack in the [wasm-pack documention](https://rustwasm.github.io/docs/wasm-pack/commands/build.html).

This folders will contain a wasm binary, a JS wrapper file, typescript types definitions, and a package.json file that you can load in your proper project.

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
    "casper-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The React app needs to load the wasm file through a dedicated `init()` method as per this example

> App.tsx

```ts
import init, {
  SDK,
  Verbosity,
} from 'casper-sdk';

const node_address = 'https://rpc.testnet.casperlabs.io';
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

  const sdk = new SDK(node_address, verbosity);
  console.log(sdk);
  ...
}
```

#### Frontend React example

You can look at a very basic example of usage in the [React example app](examples/frontend/react/src/App.tsx)

```shell
$ cd ./examples/frontend/react
$ npm install
$ npm start
```

</details>
<details>
  <summary><strong><code>Angular</code></strong></summary>

## Web Angular

> package.json

```json
{
  "name": "my-angular-app",
  "dependencies": {
    // This path is relative
    "casper-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The Angular app needs to load the wasm file through a dedicated `init()` method as per this example. You can import it into a component through a service but it is advised to import it through a factory with the injection token [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER).

> wasm.factory.ts

```js
import init, { SDK, Verbosity } from "casper-sdk";

export const SDK_TOKEN = new InjectionToken<SDK>('SDK');
export const WASM_ASSET_PATH = new InjectionToken<string>('wasm_asset_path');
export const NODE_ADDRESS = new InjectionToken<string>('node_address');
export const VERBOSITY = new InjectionToken<Verbosity>('verbosity');

type Params = {
  wasm_asset_path: string,
  node_address: string;
  verbosity: Verbosity;
};

export const fetchWasmFactory = async (
  params: Params
): Promise<SDK> => {
    const wasm = await init(params.wasm_asset_path);
    return new SDK(params.node_address, params.verbosity);
  };
};
```

> wasm.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SDK_TOKEN, fetchWasmFactory, provideSafeAsync } from './wasm.factory';

const providers = provideSafeAsync(SDK_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers,
})
export class WasmModule {}
```

You can look at a basic example of factory usage in the [Angular example app](examples/frontend/angular/libs/util/services/wasm/src/lib/wasm.factory.ts)

Add the sdk wasm file to assets of your project with path parameter being ` wasm_asset_path:'assets/casper_rust_wasm_sdk_bg.wasm'`, Angular will then copy the file from `pkg` in `assets` on build making it available for the fetch wasm factory.

> project.json

```json
"assets": [
  ...,
  {
    "input": "pkg",
    "glob": "casper_rust_wasm_sdk_bg.wasm",
    "output": "assets"
  }
]
```

#### Frontend Angular example

You can look at a more advanced example of usage in the [Angular example app](examples/frontend/angular/src/app/app.component.ts)

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
    "casper-sdk": "file:pkg-nodejs", // [TODO] Npm package
    ...
}
```

The Node app loads the SDK with `require()`. You can find more details about building the sdk for [Node with wasm-pack](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs)
Note that this method requires a version of Node.js with WebAssembly support, which is currently Node 8 and above.

> index.ts

```ts
const casper_rust_wasm_sdk = require('casper-sdk');
const { SDK } = casper_rust_wasm_sdk;

const node_address = 'https://rpc.integration.casperlabs.io';
let sdk: typeof SDK = new SDK(node_address);
console.log(sdk);
```

#### Desktop Node example

You can look at a very basic example of usage in the [Node example app](examples/desktop/node/index.ts)

```shell
$ cd ./examples/desktop/node
$ npm install
$ npm start
```

</details>

</details>

## Usage

### RPC call examples

<details>
  <summary><strong><code>Rust</code></strong></summary>
<br>
You can find all rpc methods on the [RPC page](docs/API/.md). Here you can see a several of examples of using the rpc methods. All examples below are supposed to be ran against the Testnet.

#### Get deploy by deploy hash

```rust
use casper_rust_wasm_sdk::types::deploy_hash::DeployHash;

let finalized_approvals = true;
let get_deploy = sdk.get_deploy(
    DeployHash::new('fa815fc43c38da30f6ab4e5a6c8a1b31f09df2bf4b344019ffef60c1270d4e49').unwrap(),
    Some(finalized_approvals),
    None,
    None,
).await;

let deploy = get_deploy.unwrap().result.deploy;
let deploy_header = deploy.header();
let timestamp = deploy_header.timestamp();
```

#### Get auction state information

```rust
let get_auction_info = sdk.get_auction_info(None, None, None).await;

let auction_state = get_auction_info.unwrap().result.auction_state;
let state_root_hash = auction_state.state_root_hash();
let block_height = get_auction_info.result.auction_state.block_height();
```

#### Get peers from the network

```rust
let get_peers = sdk.get_peers(None, None).await;

let peers = get_peers.unwrap().result.peers;
for peer in &test {
    dbg!(peer);
}
```

#### Get the latest block information

```rust
let get_block = sdk.get_block(None, None, None).await;

let block = get_block.unwrap().result;
let block_hash = block.hash();
```

You can find more examples by reading [Rust integration tests](./tests/integration/rust/)

</details>

<details>
  <summary><strong><code>Typescript</code></strong></summary>
<br>
You can find all rpc methods on the [RPC page](docs/API/.md). Here you can see a several of examples of using the rpc methods. All examples below are supposed to be ran against the Testnet.

#### Get deploy by deploy hash

```ts
import { DeployHash } from 'casper-sdk';

const deploy_hash_as_string =
  'fa815fc43c38da30f6ab4e5a6c8a1b31f09df2bf4b344019ffef60c1270d4e49';
const finalized_approvals = true;

const get_deploy_options = this.sdk.get_deploy_options({
  deploy_hash_as_string,
  finalized_approvals,
});

const deploy_result = await this.sdk.get_deploy(get_deploy_options);

const deploy = deploy_result.deploy.
const timestamp = deploy.timestamp();
const header = deploy.toJson().header; // DeployHeader type not being exposed right now by the SDK you can convert every type to JSON
```

#### Get auction state information

```ts
const get_auction_info = await this.sdk.get_auction_info();

const auction_state = = get_auction_info.auction_state;
const state_root_hash = auction_state.state_root_hash.toString();
const block_height = auction_state.block_height.toString();
```

#### Get peers from the network

```ts
const get_peers = await this.sdk.get_peers();

const peers = get_peers.peers;
peers.forEach((peer) => {
  console.log(peer);
});
```

#### Get the latest block information

```ts
const get_block = await this.sdk.get_block();

let block = get_block.block;
let block_hash = block.hash;
```

You can find more examples in the [Angular example app](examples/frontend/angular/src/app/app.component.ts) or in the [React example app](examples/frontend/react/src/App.tsx) or by reading [Puppeteer e2e tests](./tests/e2e/)

</details>

### More examples [TODO]

<details>
  <summary><strong><code>Deploys and Transfers</code></strong></summary>

- [Making a deploy](docs/Example/MakingDeploy.md)
- [Sending a Transfer](docs/Example/SendingTransfer.md)
- CEP78
  - [Install](docs/Example/CEP78/Install.md)
  - [Mint](docs/Example/CEP78/Mint.md)

</details>

### Desktop Electron demo app

<details>
  <summary><strong><code>Example of usage of the SDK in a Desktop application</code></strong></summary>

<br>

![Casper Electron App](docs/images/get_status-electron.png)

The Electron based demo app loads the Angular example build. You can use this app on your computer to test every action the SDK can take.

```shell
$ cd ./examples/desktop/electron
$ npm install
$ npm start
$ npm build
```

You can download an alpha version of the app illustrating the sdk here :

- [Microsoft Windows](examples/desktop/electron/release/Casper%20Setup%201.0.0.exe)
- [GNU/Linux AppImage](examples/desktop/electron/release/Casper-1.0.0.AppImage)
- [GNU/Linux Snap](examples/desktop/electron/release/casper_1.0.0_amd64.snap)
- [Mac][TODO]

</details>

---

<br>

## Rust API

- [Full item list](docs/api-rust/all.html)

### SDK

- [SDK Struct and methods](docs/api-rust/struct.SDK.html)

### RPC

- [RPC List](docs/api-rust/rpcs/index.html)

### Deploy Params

- [Params and Args simple](docs/api-rust/types/deploy_params/index.html)

### Deploy

- [Deploy Type and static builder](docs/api-rust/types/deploy/struct.Deploy.html)

### Types

- [Current exposed types](docs/api-rust/types/index.html)

### Helpers functions

- [Rust helpers](docs/api-rust/helpers/index.html)

## Typescript API

- [Full item list](docs/api-wasm/index.html)

### SDK

- [SDK Struct and methods](docs/api-wasm/classes/SDK.html)

### RPC Methods

- [RPC List](docs/api-rust/rpcs/index.html)

### Deploy Params

- [Params and Args simple](docs/api-rust/types/deploy_params/index.html)

### Deploy

- [Deploy Type and static builder](docs/api-wasm/classes/Deploy.html)

### Types

- [Current exposed types](docs/api-wasm/modules.html)

### Helpers functions

- [TS helpers](docs/api-wasm/modules.html)

## Testing

Tests are run against NCTL by default or the network configured in corresponding configurations. Tests assume a `secret_key.pem` is either at root of tests of in
`./NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/` from the root (so levels higher than the test). This path can be changed in configuration.

- [Rust Integration tests](tests/integration/rust/) can be run with `cargo test -- --test-threads=1` [configured in config](tests/integration/rust/src/config.rs)

- [Jest/Puppeteer E2E tests](tests/e2e/) can be run with `npm test` [configured with .env](tests/e2e/.env) or [puppeteer config](tests/e2e/puppeteer/config.ts)

- Unit tests [TODO]

## Todo

- Expose more CL Types and Casper Client result Types
- EventStream
- Keygen
- Wallet connect
