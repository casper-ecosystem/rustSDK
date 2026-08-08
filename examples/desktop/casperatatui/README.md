# Casperatatui

Casper TUI over [`casper-rust-wasm-sdk`](../../..) using [ratatui](https://ratatui.rs/).

Desktop example beside Electron / Node under `examples/desktop/`. JSON-RPC only (no binary-port). See [COVERAGE.md](./COVERAGE.md) for screen → SDK map.

## Run

From the repo root (clears Cursor sandbox `CARGO_TARGET_DIR` if set):

```bash
make run-casperatatui
# alias:
make run-tui
# or
env -u CARGO_TARGET_DIR cargo run -p casperatatui -- --preset nctl
```

Extra args: `CASPERATATUI_ARGS` or `TUI_ARGS` (e.g. `make run-tui TUI_ARGS='--preset testnet'`).

Presets: `nctl` (default), `testnet`, `mainnet`.

| Flag / env                             | Default (nctl)                                     |
| -------------------------------------- | -------------------------------------------------- |
| `--rpc-url` / `CASPER_RPC_URL`         | `http://127.0.0.1:11101`                           |
| `--events-url` / `CASPER_EVENTS_URL`   | `http://127.0.0.1:18101/events`                    |
| `--verbosity` / `CASPER_VERBOSITY`     | `low`                                              |
| `--enable-writes`                      | off                                                |
| `--secret-key` / `CASPER_SECRET_KEY`   | unset (PEM path, memory only)                      |
| `--policy-path` / `CASPER_POLICY_PATH` | `examples/desktop/casperatatui/policy.sample.json` |

Needs a reachable node for `r` / auto-refresh (local NCTL is ideal).

Non-interactive smoke:

```bash
cargo run -p casperatatui --example smoke_status
# SSE collect always; put+wait when CASPER_SECRET_KEY is set:
cargo run -p casperatatui --example smoke_write_wait
```

## Release binary

Not part of the default SDK / Hub image build. Linux `x86_64` binaries ship on GitHub Releases:

- Pre-release tip: `casperatatui-dev-preview-linux-x86_64`
- Stable: `casperatatui-<version>-linux-x86_64`

Local release build: `make build-casperatatui-release` (alias `make build-tui-release`) → `target/release/casperatatui`.

CI: path-filtered [ci-casperatatui](../../../.github/workflows/ci-casperatatui.yml) runs lint, tests, and NCTL smokes when `examples/desktop/casperatatui/**` changes. Lint locally: `make check-lint-casperatatui` (alias `make check-lint-tui`).

## Keys

| Key              | Action                                            |
| ---------------- | ------------------------------------------------- |
| `q`              | Quit and **restore the terminal**                 |
| Esc              | Back (detail / form); never quits                 |
| Ctrl+Esc         | Quit (same as `q`)                                |
| `r`              | Network seance; on Validators reloads auction     |
| `e`              | Edit RPC URL (Enter applies + refreshes)          |
| `1`–`9` / `h`    | Network…Wait / Help                               |
| `l`              | (Blocks) load latest N blocks                     |
| `/`              | Focus lookup / filter / Wait form                 |
| `w`              | (Accounts/Validators) reward; (Wait) wait/collect |
| `o` / `x`        | Load / unload session PEM (`--enable-writes`)     |
| `b` / `s` / `p`  | (Writes) build / sign / put                       |
| `t`              | (Writes) one-shot transfer                        |
| Space            | (Wait SSE) toggle event name                      |
| Tab / Left/Right | Cycle views (Left/Right always leave Actions; Tab cycles Actions panes / in-screen sections) |
| `j` `k` / arrows | Scroll body / move lists                          |
| Enter            | Open / fetch / start form action                  |
| `:`              | Command palette                                   |
| mouse select     | Works: mouse capture is **off**                   |
| Ctrl-C           | Same as quit (signal handler restores TTY)        |

## Writes (key `8`)

Requires `--enable-writes`. Load a PEM with `--secret-key` or `o`. Flow: Tab kind (Transfer / Delegate / …) → Enter form → `b` build → `s` sign → `p` put. Policy JSON fail-closes Put (`policy.sample.json`). Session PEM never written back to disk.

## Wait / SSE (key `9`)

- **Wait tx:** paste hash (auto-filled after a Writes put) + events URL → `w` runs `wait_transaction`
- **SSE collect:** Tab pane, Space toggles event names, `w` runs bounded `SSEClient::collect`

## Blocks (key `2`)

- `l` stacks the latest 10 blocks
- `/` lookup by height or hash
- Enter opens detail (tx hashes + transfers panel)

## Accounts (key `4`)

- `/` public key, `account-hash-…`, or entity id
- Parallel entity + balances + auction; Tab sections; `w` era reward form

## Validators (key `5`)

- `r` loads `get_auction_info`; Tab: Validators | Bidders | Detail | Rewards
- `/` filter by pubkey substring; Enter opens detail (self stake + delegators)
- `w` era reward form (`get_reward`)

## Contracts (key `6`)

- `/` hash / package / shortcuts `auction` / `mint`
- Named keys + entry points; query key / dict subforms

## Actions (key `7`)

RPC + helpers catalog; write methods appear when writes enabled and PEM loaded.

## Command palette (`:`)

| Input                  | Meaning              |
| ---------------------- | -------------------- |
| `refresh` / `r`        | Network seance       |
| `rpc`                  | Edit RPC URL         |
| `help` / `goto <view>` | Help / jump          |
| `quit`                 | Exit                 |
| Up / Down / Tab        | History / completion |

On exit Casperatatui always leaves raw mode / alternate screen.
