# Casper Signing Desk

Native Tauri desktop example over [`casper-rust-wasm-sdk`](../../..): message sign/verify, keygen, transfer / stake compose, multisig approvals on transaction JSON, and `wait_transaction`.

Specialized signing desk for validators and cosigners. Not the Angular WebClient catalog.

## Native PEM unlock

**Unlock** means: load a Casper secret-key `.pem` into an in-memory signing session in the **Rust/Tauri backend**. It is not a password prompt, hardware-wallet unlock, or browser extension.

| Step       | What happens                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Unlock PEM | OS file dialog (native). You pick an existing secret key PEM.                                                        |
| Session    | Rust reads the file, derives the public key hex, keeps PEM + public key in process memory.                           |
| UI         | Webview receives only the **public key** (and locked / unlocked status). The PEM string is never sent to JavaScript. |
| Sign       | Message sign and Approvals “Add approval” use the session PEM inside Rust (`with_pem`).                              |
| Unload     | Clears the session. Closing the app also drops the session; PEM bytes are zeroized on drop.                          |

Also available from the **File** menu: Unlock PEM… / Unload.

**Optional keygen** (Keys screen): generate Ed25519 or Secp256k1, then save via an OS save dialog. Nothing is created on app start; Unlock is only needed when you want to sign.

**Compose** does not require unlock: it builds unsigned JSON from public keys and amounts. Unlock is required to **sign** that JSON under Approvals.

Typical PEM shape (Casper / NCTL):

```text
-----BEGIN PRIVATE KEY-----
…
-----END PRIVATE KEY-----
```

(or `BEGIN SECRET KEY` / algorithm-specific variants the SDK’s PEM helpers accept).

## Security model

- Secret keys never enter the webview (footer copy matches this invariant)
- PEM unlock and keygen save use OS dialogs; Rust holds the session PEM until Unload (zeroized on drop)
- Put is fail-closed via [`policy.sample.json`](./policy.sample.json) (or a policy you pick)
- Transaction path only (no deploy)
- Not a substitute for HSM / air-gapped cosigning; treat the unlocked session like any hot signing process

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

Closing the window exits the process (no orphan `casper-signing-desk` after `make`/Vite stops).

## Screens

| Screen    | What it does                                                                  |
| --------- | ----------------------------------------------------------------------------- |
| Keys      | Unlock existing PEM into the Rust session (optional generate); unload         |
| Message   | Sign (needs unlock) / verify free-form messages (casper-sign-verify parity)   |
| Compose   | Build unsigned transfer / delegate / undelegate / redelegate JSON (no unlock) |
| Approvals | Open/save JSON, add approval (needs unlock), verify, put (policy)             |
| Watch     | `wait_transaction` + `get_transaction`                                        |

Native menu: File (Open/Save JSON, Unlock/Unload), Edit, View (reload/zoom/devtools), Help.

## Build

```bash
make build-tauri
```

## Honest scope

This is a focused SDK example, not a product shell like OpenTrading’s Tauri (no splash, no sidecars, no updater). Craft borrowed: native menus, CSP, file dialogs, busy UI, apt prerequisites in the README.
