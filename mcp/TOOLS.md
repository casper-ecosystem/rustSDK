# Native Rust API → MCP tool checklist

**Status:** Implemented. Meta + feature groups below map to `sdk_*` tools; see `mcp/README.md`.

**Scope:** `casper-rust-wasm-sdk` native-callable methods under `src/sdk` and `src/helpers`.

**Include:** `impl SDK` + public helpers that compile on non-`wasm32`.
**Exclude:** `*_js_alias`, `*_options` taking `JsValue`, `CasperWallet`, `binary_port/wasm32.rs`, wasm-only RPC protocol aliases returning `JsError`. Endless SSE `start()` loops stay wasm/native; MCP exposes bounded wait/collect + CES.

**Features:** proposed MCP crate gates (`helpers` | `rpc` | `binary-port` | `transaction` | `deploy` | `contract` | `write` | `SSE`). Paths relative to `src/`.

**Legend:** `write` = submit on-chain, sign with secret, or binary accept. Local `make_*` builders are not write. Speculative exec is not write.

---

## Exclusions

| Category                | Examples                                                    |
| ----------------------- | ----------------------------------------------------------- |
| JS aliases              | `*_js_alias`, `transfer_transactionjs_alias`                |
| JsValue options         | `get_*_options`, `query_*_options`                          |
| Wallet                  | `src/js/wallet.rs` (`CasperWallet`)                         |
| Endless SSE streams     | `SSEClient::start` continuous loop (use `sdk_SSE_collect`)  |
| wasm32 binary bindings  | `sdk/binary_port/wasm32.rs`                                 |
| wasm32 RPC name aliases | `info_get_*`, `chain_get_*`, `state_get_*`, `account_put_*` |

---

## meta — always on

| Method             | Path         | MCP tool               | Args                                          | write? |
| ------------------ | ------------ | ---------------------- | --------------------------------------------- | ------ |
| `SDK::new`         | `sdk/mod.rs` | `sdk_new` / env init   | `{ rpc_address?, node_address?, verbosity? }` | no     |
| `get_rpc_address`  | `sdk/mod.rs` | `sdk_get_rpc_address`  | `{ rpc_address? }`                            | no     |
| `set_rpc_address`  | `sdk/mod.rs` | `sdk_set_rpc_address`  | `{ rpc_address? }`                            | config |
| `get_node_address` | `sdk/mod.rs` | `sdk_get_node_address` | `{ node_address? }`                           | no     |
| `set_node_address` | `sdk/mod.rs` | `sdk_set_node_address` | `{ node_address? }`                           | config |
| `get_verbosity`    | `sdk/mod.rs` | `sdk_get_verbosity`    | `{ verbosity? }`                              | no     |
| `set_verbosity`    | `sdk/mod.rs` | `sdk_set_verbosity`    | `{ verbosity? }`                              | config |
| —                  | —            | `sdk_help`             | `{}`                                          | no     |

Env defaults: `CASPER_RPC_URL`, `CASPER_NODE_URL`, `CASPER_VERBOSITY`.

---

## helpers — feature `helpers`

| Method                             | MCP tool                               | Args                    | write?       |
| ---------------------------------- | -------------------------------------- | ----------------------- | ------------ |
| `cl_value_to_json`                 | `sdk_cl_value_to_json`                 | `{ cl_value }`          | no           |
| `get_current_timestamp`            | `sdk_get_current_timestamp`            | `{ timestamp? }`        | no           |
| `get_blake2b_hash`                 | `sdk_get_blake2b_hash`                 | `{ meta_data }`         | no           |
| `make_dictionary_item_key`         | `sdk_make_dictionary_item_key`         | `{ key, value }`        | no           |
| `get_base64_key_from_account_hash` | `sdk_get_base64_key_from_account_hash` | `{ account_hash }`      | no           |
| `get_base64_key_from_key_hash`     | `sdk_get_base64_key_from_key_hash`     | `{ formatted_hash }`    | no           |
| `get_ttl_or_default`               | `sdk_get_ttl_or_default`               | `{ ttl? }`              | no           |
| `parse_timestamp`                  | `sdk_parse_timestamp`                  | `{ value }`             | no           |
| `parse_ttl`                        | `sdk_parse_ttl`                        | `{ value }`             | no           |
| `get_gas_price_or_default`         | `sdk_get_gas_price_or_default`         | `{ gas_price? }`        | no           |
| `secret_key_generate`              | `sdk_secret_key_generate`              | `{}`                    | local keygen |
| `secret_key_secp256k1_generate`    | `sdk_secret_key_secp256k1_generate`    | `{}`                    | local keygen |
| `secret_key_from_pem`              | `sdk_secret_key_from_pem`              | `{ secret_key }`        | secret in    |
| `public_key_from_secret_key`       | `sdk_public_key_from_secret_key`       | `{ secret_key }`        | secret in    |
| `hex_to_uint8_vec`                 | `sdk_hex_to_uint8_vec`                 | `{ hex_string }`        | no           |
| `hex_to_string`                    | `sdk_hex_to_string`                    | `{ hex_string }`        | no           |
| `motes_to_cspr`                    | `sdk_motes_to_cspr`                    | `{ motes }`             | no           |
| `json_pretty_print`                | `sdk_json_pretty_print`                | `{ value, verbosity? }` | no           |

---

## rpc — feature `rpc` (reads + speculative)

| Method                                          | Path                                  | MCP tool                      | write? |
| ----------------------------------------------- | ------------------------------------- | ----------------------------- | ------ |
| `get_account` (deprecated → `get_entity`)       | `sdk/rpcs/get_account.rs`             | `sdk_get_account`             | no     |
| `get_auction_info`                              | `sdk/rpcs/get_auction_info.rs`        | `sdk_get_auction_info`        | no     |
| `get_balance`                                   | `sdk/rpcs/get_balance.rs`             | `sdk_get_balance`             | no     |
| `get_block`                                     | `sdk/rpcs/get_block.rs`               | `sdk_get_block`               | no     |
| `get_block_transfers`                           | `sdk/rpcs/get_block_transfers.rs`     | `sdk_get_block_transfers`     | no     |
| `get_chainspec`                                 | `sdk/rpcs/get_chainspec.rs`           | `sdk_get_chainspec`           | no     |
| `get_deploy`                                    | `sdk/rpcs/get_deploy.rs`              | `sdk_get_deploy`              | no     |
| `get_dictionary_item`                           | `sdk/rpcs/get_dictionary_item.rs`     | `sdk_get_dictionary_item`     | no     |
| `get_entity`                                    | `sdk/rpcs/get_entity.rs`              | `sdk_get_entity`              | no     |
| `get_era_info` (deprecated → `get_era_summary`) | `sdk/rpcs/get_era_info.rs`            | `sdk_get_era_info`            | no     |
| `get_era_summary`                               | `sdk/rpcs/get_era_summary.rs`         | `sdk_get_era_summary`         | no     |
| `get_reward`                                    | `sdk/rpcs/get_reward.rs`              | `sdk_get_reward`              | no     |
| `get_node_status`                               | `sdk/rpcs/get_node_status.rs`         | `sdk_get_node_status`         | no     |
| `get_peers`                                     | `sdk/rpcs/get_peers.rs`               | `sdk_get_peers`               | no     |
| `get_state_root_hash`                           | `sdk/rpcs/get_state_root_hash.rs`     | `sdk_get_state_root_hash`     | no     |
| `get_transaction`                               | `sdk/rpcs/get_transaction.rs`         | `sdk_get_transaction`         | no     |
| `get_validator_changes`                         | `sdk/rpcs/get_validator_changes.rs`   | `sdk_get_validator_changes`   | no     |
| `list_rpcs`                                     | `sdk/rpcs/list_rpcs.rs`               | `sdk_list_rpcs`               | no     |
| `query_balance`                                 | `sdk/rpcs/query_balance.rs`           | `sdk_query_balance`           | no     |
| `query_balance_details`                         | `sdk/rpcs/query_balance_details.rs`   | `sdk_query_balance_details`   | no     |
| `query_global_state`                            | `sdk/rpcs/query_global_state.rs`      | `sdk_query_global_state`      | no     |
| `speculative_exec`                              | `sdk/rpcs/speculative_exec.rs`        | `sdk_speculative_exec`        | no     |
| `speculative_exec_deploy`                       | `sdk/rpcs/speculative_exec_deploy.rs` | `sdk_speculative_exec_deploy` | no     |

Common optional args: `verbosity?`, `rpc_address?`.

---

## compose — feature `rpc` (Casperatatui / desktop helpers)

Compositions over existing RPC (no new node methods). Path: `mcp/src/compose/`.

| MCP tool                          | Args                                                                       | Behavior                                      | write? |
| --------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------- | ------ |
| `sdk_get_latest_blocks`           | `{ count?, verbosity?, rpc_address? }`                                     | tip height then N× `get_block` (default 10)   | no     |
| `sdk_get_block_transactions`      | `{ block_identifier, expand?, … }`                                         | hashes from block body; `expand` fetches each | no     |
| `sdk_make_delegate_transaction`   | `{ delegator, validator, amount, transaction_params_json }`                | unsigned delegate tx JSON                     | no\*   |
| `sdk_make_undelegate_transaction` | `{ delegator, validator, amount, transaction_params_json }`                | unsigned undelegate tx JSON                   | no\*   |
| `sdk_make_redelegate_transaction` | `{ delegator, validator, new_validator, amount, transaction_params_json }` | unsigned redelegate tx JSON                   | no\*   |

\*Builders only (no put). Sign/put stay on existing write tools (`sdk_sign_transaction`, `sdk_put_transaction`, …).

---

## binary-port — feature `binary-port` (reads + speculative)

Common optional: `node_address?`. Path: `sdk/binary_port/mod.rs`.

| Method                                            | MCP tool                                              | Extra args                                       | write? |
| ------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ | ------ |
| `get_binary_latest_switch_block_header`           | `sdk_get_binary_latest_switch_block_header`           | —                                                | no     |
| `get_binary_latest_block_header`                  | `sdk_get_binary_latest_block_header`                  | —                                                | no     |
| `get_binary_block_header_by_height`               | `sdk_get_binary_block_header_by_height`               | `{ height }`                                     | no     |
| `get_binary_block_header_by_hash`                 | `sdk_get_binary_block_header_by_hash`                 | `{ block_hash }`                                 | no     |
| `get_binary_latest_block_with_signatures`         | `sdk_get_binary_latest_block_with_signatures`         | —                                                | no     |
| `get_binary_block_with_signatures_by_height`      | `sdk_get_binary_block_with_signatures_by_height`      | `{ height }`                                     | no     |
| `get_binary_block_with_signatures_by_hash`        | `sdk_get_binary_block_with_signatures_by_hash`        | `{ block_hash }`                                 | no     |
| `get_binary_transaction_by_hash`                  | `sdk_get_binary_transaction_by_hash`                  | `{ hash, with_finalized_approvals }`             | no     |
| `get_binary_peers`                                | `sdk_get_binary_peers`                                | —                                                | no     |
| `get_binary_uptime`                               | `sdk_get_binary_uptime`                               | —                                                | no     |
| `get_binary_last_progress`                        | `sdk_get_binary_last_progress`                        | —                                                | no     |
| `get_binary_reactor_state`                        | `sdk_get_binary_reactor_state`                        | —                                                | no     |
| `get_binary_network_name`                         | `sdk_get_binary_network_name`                         | —                                                | no     |
| `get_binary_consensus_validator_changes`          | `sdk_get_binary_consensus_validator_changes`          | —                                                | no     |
| `get_binary_block_synchronizer_status`            | `sdk_get_binary_block_synchronizer_status`            | —                                                | no     |
| `get_binary_available_block_range`                | `sdk_get_binary_available_block_range`                | —                                                | no     |
| `get_binary_next_upgrade`                         | `sdk_get_binary_next_upgrade`                         | —                                                | no     |
| `get_binary_consensus_status`                     | `sdk_get_binary_consensus_status`                     | —                                                | no     |
| `get_binary_chainspec_raw_bytes`                  | `sdk_get_binary_chainspec_raw_bytes`                  | —                                                | no     |
| `get_binary_node_status`                          | `sdk_get_binary_node_status`                          | —                                                | no     |
| `get_binary_validator_reward_by_era`              | `sdk_get_binary_validator_reward_by_era`              | `{ validator_key, era }`                         | no     |
| `get_binary_validator_reward_by_block_height`     | `sdk_get_binary_validator_reward_by_block_height`     | `{ validator_key, block_height }`                | no     |
| `get_binary_validator_reward_by_block_hash`       | `sdk_get_binary_validator_reward_by_block_hash`       | `{ validator_key, block_hash }`                  | no     |
| `get_binary_delegator_reward_by_era`              | `sdk_get_binary_delegator_reward_by_era`              | `{ validator_key, delegator_key, era }`          | no     |
| `get_binary_delegator_reward_by_block_height`     | `sdk_get_binary_delegator_reward_by_block_height`     | `{ validator_key, delegator_key, block_height }` | no     |
| `get_binary_delegator_reward_by_block_hash`       | `sdk_get_binary_delegator_reward_by_block_hash`       | `{ validator_key, delegator_key, block_hash }`   | no     |
| `get_binary_read_record`                          | `sdk_get_binary_read_record`                          | `{ record_id, key }`                             | no     |
| `get_binary_global_state_item`                    | `sdk_get_binary_global_state_item`                    | `{ key, path }`                                  | no     |
| `get_binary_global_state_item_by_state_root_hash` | `sdk_get_binary_global_state_item_by_state_root_hash` | `{ state_root_hash, key, path }`                 | no     |
| `get_binary_global_state_item_by_block_hash`      | `sdk_get_binary_global_state_item_by_block_hash`      | `{ block_hash, key, path }`                      | no     |
| `get_binary_global_state_item_by_block_height`    | `sdk_get_binary_global_state_item_by_block_height`    | `{ block_height, key, path }`                    | no     |
| `get_binary_try_speculative_execution`            | `sdk_get_binary_try_speculative_execution`            | `{ transaction }`                                | no     |
| `get_binary_protocol_version`                     | `sdk_get_binary_protocol_version`                     | —                                                | no     |

---

## transaction — feature `transaction` (builders + speculative)

| Method                             | Path                                                  | MCP tool                               | write? |
| ---------------------------------- | ----------------------------------------------------- | -------------------------------------- | ------ |
| `make_transaction`                 | `sdk/transaction_utils/make_transaction.rs`           | `sdk_make_transaction`                 | no     |
| `make_transfer_transaction`        | `sdk/transaction_utils/make_transfer_transaction.rs`  | `sdk_make_transfer_transaction`        | no     |
| `speculative_transaction`          | `sdk/transaction/speculative_transaction.rs`          | `sdk_speculative_transaction`          | no     |
| `speculative_transfer_transaction` | `sdk/transaction/speculative_transfer_transaction.rs` | `sdk_speculative_transfer_transaction` | no     |

---

## deploy — feature `deploy` (builders + speculative)

| Method                 | Path                                 | MCP tool                   | write? |
| ---------------------- | ------------------------------------ | -------------------------- | ------ |
| `make_deploy`          | `sdk/deploy_utils/make_deploy.rs`    | `sdk_make_deploy`          | no     |
| `make_transfer`        | `sdk/deploy_utils/make_transfer.rs`  | `sdk_make_transfer`        | no     |
| `speculative_deploy`   | `sdk/deploy/speculative_deploy.rs`   | `sdk_speculative_deploy`   | no     |
| `speculative_transfer` | `sdk/deploy/speculative_transfer.rs` | `sdk_speculative_transfer` | no     |

---

## contract — feature `contract` (queries)

| Method                | Path                                  | MCP tool                  | write? |
| --------------------- | ------------------------------------- | ------------------------- | ------ |
| `query_contract_dict` | `sdk/contract/query_contract_dict.rs` | `sdk_query_contract_dict` | no     |
| `query_contract_key`  | `sdk/contract/query_contract_key.rs`  | `sdk_query_contract_key`  | no     |

---

## write — feature `write` (submit / sign / accept)

Prefer dual-gate with domain feature where applicable (e.g. `transaction` + `write`).

| Method                                | Path                                        | Domain      | MCP tool                                |
| ------------------------------------- | ------------------------------------------- | ----------- | --------------------------------------- |
| `put_transaction`                     | `sdk/rpcs/put_transaction.rs`               | rpc         | `sdk_put_transaction`                   |
| `put_deploy`                          | `sdk/rpcs/put_deploy.rs`                    | rpc         | `sdk_put_deploy`                        |
| `transaction`                         | `sdk/transaction/transaction.rs`            | transaction | `sdk_transaction`                       |
| `transfer_transaction`                | `sdk/transaction/transfer_transaction.rs`   | transaction | `sdk_transfer_transaction`              |
| `sign_transaction`                    | `sdk/transaction_utils/sign_transaction.rs` | transaction | `sdk_sign_transaction`                  |
| `deploy`                              | `sdk/deploy/deploy.rs`                      | deploy      | `sdk_deploy`                            |
| `transfer`                            | `sdk/deploy/transfer.rs`                    | deploy      | `sdk_transfer`                          |
| `sign_deploy`                         | `sdk/deploy_utils/sign_deploy.rs`           | deploy      | `sdk_sign_deploy`                       |
| `install`                             | `sdk/contract/install.rs`                   | contract    | `sdk_install`                           |
| `install_deploy` (deprecated)         | `sdk/contract/install_deploy.rs`            | contract    | `sdk_install_deploy`                    |
| `call_entrypoint`                     | `sdk/contract/call_entrypoint.rs`           | contract    | `sdk_call_entrypoint`                   |
| `call_entrypoint_deploy` (deprecated) | `sdk/contract/call_entrypoint_deploy.rs`    | contract    | `sdk_call_entrypoint_deploy`            |
| `get_binary_try_accept_transaction`   | `sdk/binary_port/mod.rs`                    | binary-port | `sdk_get_binary_try_accept_transaction` |

---

## watcher — feature `watcher` (wait/watch; in default `full`)

| Method / helper    | Path               | MCP tool               | Args                                            |
| ------------------ | ------------------ | ---------------------- | ----------------------------------------------- |
| `wait_transaction` | `sdk/sse/watcher/` | `sdk_wait_transaction` | `events_url`, `transaction_hash`, `timeout_ms?` |

## SSE — feature `SSE` (node SSE client + CES; enables `watcher`)

| Method / helper         | Path                 | MCP tool                         | Args                                                                     |
| ----------------------- | -------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `SSEClient::collect`    | `sdk/sse/client.rs`  | `sdk_SSE_collect`                | `events_url`, `event_names`, `max_events?`, `timeout_ms?`, `start_from?` |
| `CESParser::create`     | `sdk/sse/ces/`       | `sdk_CES_parser_create`          | `contract_hashes_json`, `state_root_hash?`, `rpc_address?`               |
| `CESParser::parse_*`    | `sdk/sse/ces/`       | `sdk_CES_parse_execution_result` | `schemas_metadata_json`, `execution_result_json`                         |
| `get_transaction` + CES | `sdk/sse/ces/` + rpc | `sdk_CES_parse_transaction`      | `contract_hashes_json`, `transaction_hash`, …                            |

---

## Counts

| Group                    | Methods  |
| ------------------------ | -------- |
| meta (+ `sdk_help`)      | 8        |
| helpers                  | 18       |
| rpc                      | 22       |
| binary-port              | 33       |
| transaction              | 4        |
| deploy                   | 4        |
| contract                 | 2        |
| write                    | 13       |
| watcher                  | 1        |
| SSE                      | 4        |
| **Total tools (approx)** | **~109** |

---

## Implementation notes

1. Prefer transaction-path tools over deprecated deploy/contract aliases.
2. Gate `write` and secret-key tools behind explicit approval UX.
3. Complex structs (`TransactionStrParams`, `DeployStrParams`, `QueryGlobalStateParams`, …) accept JSON strings.
4. Responses: pretty JSON via `format.rs`; map `SdkError` → `ToolOutput::error`.
5. Binary-port tools need `CASPER_NODE_URL`, not only RPC.
