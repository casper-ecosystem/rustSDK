# Casperatatui coverage map

Screen to SDK / MCP symbols used by Casperatatui today.

| Screen       | Keys                           | SDK / helpers                                                                                                                 | MCP compose (related)                                                                                 |
| ------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Network      | `1`, `r`                       | `get_node_status`, `get_peers`, `get_era_summary`, `get_state_root_hash`, `get_auction_info`                                  | -                                                                                                     |
| Blocks       | `2`, `l`, `/`                  | `get_block`, `get_block_transfers`                                                                                            | `sdk_get_latest_blocks`, `sdk_get_block_transactions`                                                 |
| Transactions | `3`, `/`                       | `get_transaction`                                                                                                             | (via expand on block txs)                                                                             |
| Accounts     | `4`, `/`, `w`                  | `get_entity` (fallback `get_account` when AE off), `query_balance`, `query_balance_details`, `get_auction_info`, `get_reward` | -                                                                                                     |
| Validators   | `5`, `r`, `/`, `w`, Tab, Enter | `get_auction_info`, `get_reward`; `auction_view::{list_validators,list_bidders,get_validator}`                                | `sdk_list_validators`, `sdk_get_validator`, `sdk_list_bidders`                                        |
| Contracts    | `6`, `/`                       | `query_global_state`, `query_contract_key`, `query_contract_dict`                                                             | -                                                                                                     |
| Actions      | `7`                            | Catalog of RPC + helpers; write subset when `--enable-writes` + PEM                                                           | -                                                                                                     |
| Writes       | `8`, `o`/`x`, `b`/`s`/`p`/`t`  | `make_transfer_transaction`, `make_transaction` (stake), `sign_transaction`, `put_transaction`, `transfer_transaction`        | `sdk_make_delegate_transaction`, `sdk_make_undelegate_transaction`, `sdk_make_redelegate_transaction` |
| Wait         | `9`, `/`, `w`, Space           | `wait_transaction`, `SSEClient::collect`                                                                                      | `sdk_wait_transaction`, `sdk_SSE_collect`                                                             |
| Help         | `h`                            | -                                                                                                                             | -                                                                                                     |

## Writes policy

- Gate: `--enable-writes` (no PEM UI / Sign / Put when off)
- Session PEM: `--secret-key` and/or in-app `o`; unload with `x`
- Put fail-closed via `policy.rs` + `--policy-path` (sample: `policy.sample.json`)

## Smoke

```bash
cargo run -p casperatatui --example smoke_status
# optional write+wait (needs PEM path in env, never commit keys):
# CASPER_SECRET_KEY=/path/to/secret_key.pem cargo run -p casperatatui --example smoke_write_wait
```
