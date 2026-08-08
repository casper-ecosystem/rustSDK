# Casper Signing Desk

Native Tauri desktop example over [`casper-rust-wasm-sdk`](../../..): message sign/verify, keygen, transfer / stake compose, multisig approvals on transaction JSON, and `wait_transaction`.

Specialized signing desk for validators and cosigners. Not the Angular WebClient catalog.

## Security model

- Secret keys never enter the webview
- PEM unlock / keygen save use OS dialogs; Rust holds session PEM until Unload (zeroized on drop)
- Put is fail-closed via [`policy.sample.json`](./policy.sample.json) (or a policy you pick)
- No Casper Wallet (browser extensions do not run in packaged Tauri)
- Transaction path only (no deploy)
- Not a custody wallet

## Prerequisites (Linux)

Same WebKit stack as other Tauri 2 apps (see also OpenTrading’s desktop Tauri notes):

```bash
sudo apt install \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  librsvg2-dev \
  libdbus-1-dev \
  pkg-config \
  patchelf
```

https://v2.tauri.app/start/prerequisites/

## Run

From the repo root (clears Cursor sandbox `CARGO_TARGET_DIR` if set):

```bash
make run-tauri
# or
cd examples/desktop/tauri
npm install
env -u CARGO_TARGET_DIR npm run tauri -- dev
```

Presets: `nctl` (default), `testnet`, `mainnet`. Override RPC / events in the forms when needed.

## Screens

| Screen | What it does |
|--------|----------------|
| Keys | Generate Ed25519 / Secp256k1, save PEM; unlock / unload session |
| Message | Sign / verify free-form messages (casper-sign-verify parity) |
| Compose | Build unsigned transfer / delegate / undelegate / redelegate JSON |
| Approvals | Open/save JSON, add approval, verify, put (policy) |
| Watch | `wait_transaction` + `get_transaction` |

Native menu: File (Open/Save JSON, Unlock/Unload), Edit, View (reload/zoom/devtools), Help.

## Build

```bash
make build-tauri
```

## Honest scope

This is a focused SDK example, not a product shell like OpenTrading’s Tauri (no splash, no sidecars, no updater). Craft borrowed: native menus, single-instance focus, CSP, file dialogs, busy UI, apt prerequisites in the README.
