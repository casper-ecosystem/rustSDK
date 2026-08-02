//! MCP server (`mcpkit`) for `casper-rust-wasm-sdk-mcp` (stdio or Streamable HTTP).

#![allow(clippy::unused_async)]

use mcpkit::prelude::*;
use mcpkit::transport::stdio::StdioTransport;
use mcpkit_axum::McpRouter;

use crate::{format, sdk_handle, tools};

/// MCP server handle exposing Casper SDK tools.
pub struct CasperSdkMcp;

/// Default HTTP bind address for Streamable MCP.
pub const DEFAULT_HTTP_LISTEN: &str = "0.0.0.0:8790";

// Keep in sync with Cargo.toml `version` (enforced by unit test below).
#[mcp_server(name = "casper-rust-wasm-sdk", version = "2.2.2")]
impl CasperSdkMcp {
    #[tool(description = "Help: feature matrix, env vars, endpoints, and available sdk_* tools")]
    async fn sdk_help(&self) -> ToolOutput {
        format::text_ok(help_text())
    }

    #[tool(
        description = "Show current CASPER_RPC_URL / CASPER_NODE_URL / verbosity on the shared SDK"
    )]
    async fn sdk_get_endpoints(&self) -> ToolOutput {
        let snap = sdk_handle::endpoint_snapshot();
        format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
            "env": {
                "CASPER_RPC_URL": sdk_handle::ENV_RPC_URL,
                "CASPER_NODE_URL": sdk_handle::ENV_NODE_URL,
                "CASPER_VERBOSITY": sdk_handle::ENV_VERBOSITY,
            }
        }))
    }

    #[tool(
        description = "Update shared SDK endpoints for this process (optional rpc_address, node_address, verbosity)"
    )]
    async fn sdk_set_endpoints(
        &self,
        rpc_address: Option<String>,
        node_address: Option<String>,
        verbosity: Option<String>,
    ) -> ToolOutput {
        let sdk = sdk_handle::shared();
        let mut guard = match sdk.lock() {
            Ok(g) => g,
            Err(err) => return format::err(format!("sdk mutex poisoned: {err}")),
        };
        if let Some(rpc) = rpc_address {
            if let Err(err) = guard.set_rpc_address(Some(rpc)) {
                return format::err(err);
            }
        }
        if let Some(node) = node_address {
            if let Err(err) = guard.set_node_address(Some(node)) {
                return format::err(err);
            }
        }
        if let Some(raw) = verbosity {
            let v = sdk_handle::parse_verbosity(&raw);
            if let Err(err) = guard.set_verbosity(Some(v)) {
                return format::err(err);
            }
        }
        let snap = sdk_handle::EndpointSnapshot {
            rpc_address: guard.get_rpc_address(None),
            node_address: guard.get_node_address(None),
            verbosity: format!("{:?}", guard.get_verbosity(None)),
        };
        format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
        }))
    }

    // --- helpers (feature = "helpers") ---

    #[tool(description = "Current RFC3339 timestamp (optional unix-ms timestamp override)")]
    async fn sdk_get_current_timestamp(&self, timestamp: Option<String>) -> ToolOutput {
        tools::helpers::get_current_timestamp(timestamp)
    }

    #[tool(description = "Blake2b-256 hex digest of a UTF-8 string")]
    async fn sdk_get_blake2b_hash(&self, meta_data: String) -> ToolOutput {
        tools::helpers::get_blake2b_hash(meta_data)
    }

    #[tool(
        description = "Dictionary item key from formatted key + exactly one of value_key (formatted Key) or value_u256"
    )]
    async fn sdk_make_dictionary_item_key(
        &self,
        key: String,
        value_key: Option<String>,
        value_u256: Option<String>,
    ) -> ToolOutput {
        tools::helpers::make_dictionary_item_key(key, value_key, value_u256)
    }

    #[tool(description = "CEP-18 base64 key from account-hash-… string")]
    async fn sdk_get_base64_key_from_account_hash(&self, account_hash: String) -> ToolOutput {
        tools::helpers::get_base64_key_from_account_hash(account_hash)
    }

    #[tool(description = "CEP-18 base64 key from hash-… formatted key")]
    async fn sdk_get_base64_key_from_key_hash(&self, formatted_hash: String) -> ToolOutput {
        tools::helpers::get_base64_key_from_key_hash(formatted_hash)
    }

    #[tool(description = "TTL string or SDK default")]
    async fn sdk_get_ttl_or_default(&self, ttl: Option<String>) -> ToolOutput {
        tools::helpers::get_ttl_or_default(ttl)
    }

    #[tool(description = "Parse a timestamp string")]
    async fn sdk_parse_timestamp(&self, value: String) -> ToolOutput {
        tools::helpers::parse_timestamp(value)
    }

    #[tool(description = "Parse a TTL / TimeDiff string")]
    async fn sdk_parse_ttl(&self, value: String) -> ToolOutput {
        tools::helpers::parse_ttl(value)
    }

    #[tool(description = "Gas price or SDK default")]
    async fn sdk_get_gas_price_or_default(&self, gas_price: Option<u64>) -> ToolOutput {
        tools::helpers::get_gas_price_or_default(gas_price)
    }

    #[tool(description = "Generate Ed25519 secret key PEM (local; treat as secret)")]
    async fn sdk_secret_key_generate(&self) -> ToolOutput {
        tools::helpers::secret_key_generate()
    }

    #[tool(description = "Generate secp256k1 secret key PEM (local; treat as secret)")]
    async fn sdk_secret_key_secp256k1_generate(&self) -> ToolOutput {
        tools::helpers::secret_key_secp256k1_generate()
    }

    #[tool(description = "Validate a secret key PEM (does not echo the secret)")]
    async fn sdk_secret_key_from_pem(&self, secret_key: String) -> ToolOutput {
        tools::helpers::secret_key_from_pem(secret_key)
    }

    #[tool(description = "Derive public key hex from secret key PEM")]
    async fn sdk_public_key_from_secret_key(&self, secret_key: String) -> ToolOutput {
        tools::helpers::public_key_from_secret_key(secret_key)
    }

    #[tool(description = "Decode hex string to byte array JSON")]
    async fn sdk_hex_to_uint8_vec(&self, hex_string: String) -> ToolOutput {
        tools::helpers::hex_to_uint8_vec(hex_string)
    }

    #[tool(description = "Decode hex string to UTF-8 (lossy) text")]
    async fn sdk_hex_to_string(&self, hex_string: String) -> ToolOutput {
        tools::helpers::hex_to_string(hex_string)
    }

    #[tool(description = "Convert motes string to CSPR")]
    async fn sdk_motes_to_cspr(&self, motes: String) -> ToolOutput {
        tools::helpers::motes_to_cspr(motes)
    }

    #[tool(description = "Pretty-print a JSON string at optional verbosity (low|medium|high)")]
    async fn sdk_json_pretty_print(&self, value: String, verbosity: Option<String>) -> ToolOutput {
        tools::helpers::json_pretty_print(value, verbosity)
    }

    #[tool(description = "Convert a CLValue JSON document to JSON Value")]
    async fn sdk_cl_value_to_json(&self, cl_value_json: String) -> ToolOutput {
        tools::helpers::cl_value_to_json(cl_value_json)
    }

    // --- rpc (feature = "rpc") ---

    #[tool(description = "JSON-RPC info_get_status / get_node_status")]
    async fn sdk_get_node_status(
        &self,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_node_status(verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC info_get_peers")]
    async fn sdk_get_peers(
        &self,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_peers(verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC info_get_chainspec")]
    async fn sdk_get_chainspec(
        &self,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_chainspec(verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC info_get_validator_changes")]
    async fn sdk_get_validator_changes(
        &self,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_validator_changes(verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC list_rpcs")]
    async fn sdk_list_rpcs(
        &self,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::list_rpcs(verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC chain_get_block (optional block height or hash string)")]
    async fn sdk_get_block(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_block(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC chain_get_block_transfers")]
    async fn sdk_get_block_transfers(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_block_transfers(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC state_get_auction_info")]
    async fn sdk_get_auction_info(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_auction_info(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC chain_get_era_summary")]
    async fn sdk_get_era_summary(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_era_summary(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(
        description = "JSON-RPC chain_get_era_info_by_switch_block (deprecated; prefer era_summary)"
    )]
    async fn sdk_get_era_info(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_era_info(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC chain_get_state_root_hash")]
    async fn sdk_get_state_root_hash(
        &self,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_state_root_hash(maybe_block_identifier, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC state_get_account_info (deprecated; prefer get_entity)")]
    async fn sdk_get_account(
        &self,
        account_identifier: Option<String>,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_account(
            account_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(description = "JSON-RPC state_get_entity / get_entity")]
    async fn sdk_get_entity(
        &self,
        entity_identifier: Option<String>,
        maybe_block_identifier: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_entity(
            entity_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(description = "JSON-RPC info_get_deploy")]
    async fn sdk_get_deploy(
        &self,
        deploy_hash: String,
        finalized_approvals: Option<bool>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_deploy(deploy_hash, finalized_approvals, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC info_get_transaction")]
    async fn sdk_get_transaction(
        &self,
        transaction_hash: String,
        finalized_approvals: Option<bool>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_transaction(
            transaction_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(description = "JSON-RPC state_get_balance (purse uref string)")]
    async fn sdk_get_balance(
        &self,
        purse_uref: String,
        state_root_hash: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_balance(purse_uref, state_root_hash, verbosity, rpc_address).await
    }

    #[tool(
        description = "JSON-RPC query_balance (purse identifier string: pubkey / account-hash / uref)"
    )]
    async fn sdk_query_balance(
        &self,
        purse_identifier: String,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::query_balance(
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(description = "JSON-RPC query_balance_details")]
    async fn sdk_query_balance_details(
        &self,
        purse_identifier: String,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::query_balance_details(
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(
        description = "JSON-RPC state_get_dictionary_item; kind=uref|dictionary|account_named_key|contract_named_key|entity_named_key"
    )]
    async fn sdk_get_dictionary_item(
        &self,
        kind: String,
        key: Option<String>,
        dictionary_name: Option<String>,
        dictionary_item_key: Option<String>,
        seed_uref: Option<String>,
        dictionary_value: Option<String>,
        state_root_hash: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::get_dictionary_item(
            kind,
            key,
            dictionary_name,
            dictionary_item_key,
            seed_uref,
            dictionary_value,
            state_root_hash,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(
        description = "JSON-RPC query_global_state (formatted key; optional path / state root / block)"
    )]
    async fn sdk_query_global_state(
        &self,
        key: String,
        path: Option<String>,
        state_root_hash: Option<String>,
        maybe_block_id: Option<String>,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::query_global_state(
            key,
            path,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await
    }

    #[tool(description = "JSON-RPC speculative_exec with full transaction JSON")]
    async fn sdk_speculative_exec(
        &self,
        transaction_json: String,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::speculative_exec(transaction_json, verbosity, rpc_address).await
    }

    #[tool(description = "JSON-RPC speculative_exec_deploy with full deploy JSON")]
    async fn sdk_speculative_exec_deploy(
        &self,
        deploy_json: String,
        verbosity: Option<String>,
        rpc_address: Option<String>,
    ) -> ToolOutput {
        tools::rpc::speculative_exec_deploy(deploy_json, verbosity, rpc_address).await
    }

    // --- binary-port (feature = "binary-port") ---

    #[tool(description = "Binary port: latest switch block header (needs CASPER_NODE_URL)")]
    async fn sdk_get_binary_latest_switch_block_header(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_latest_switch_block_header(node_address).await
    }

    #[tool(description = "Binary port: latest block header")]
    async fn sdk_get_binary_latest_block_header(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_latest_block_header(node_address).await
    }

    #[tool(description = "Binary port: block header by height")]
    async fn sdk_get_binary_block_header_by_height(
        &self,
        height: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_block_header_by_height(height, node_address).await
    }

    #[tool(description = "Binary port: block header by hash hex")]
    async fn sdk_get_binary_block_header_by_hash(
        &self,
        block_hash: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_block_header_by_hash(block_hash, node_address).await
    }

    #[tool(description = "Binary port: latest block with signatures")]
    async fn sdk_get_binary_latest_block_with_signatures(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_latest_block_with_signatures(node_address).await
    }

    #[tool(description = "Binary port: block with signatures by height")]
    async fn sdk_get_binary_block_with_signatures_by_height(
        &self,
        height: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_block_with_signatures_by_height(height, node_address).await
    }

    #[tool(description = "Binary port: block with signatures by hash hex")]
    async fn sdk_get_binary_block_with_signatures_by_hash(
        &self,
        block_hash: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_block_with_signatures_by_hash(block_hash, node_address).await
    }

    #[tool(description = "Binary port: transaction by hash hex")]
    async fn sdk_get_binary_transaction_by_hash(
        &self,
        hash: String,
        with_finalized_approvals: Option<bool>,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_transaction_by_hash(
            hash,
            with_finalized_approvals,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: peers")]
    async fn sdk_get_binary_peers(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_peers(node_address).await
    }

    #[tool(description = "Binary port: node uptime")]
    async fn sdk_get_binary_uptime(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_uptime(node_address).await
    }

    #[tool(description = "Binary port: last progress")]
    async fn sdk_get_binary_last_progress(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_last_progress(node_address).await
    }

    #[tool(description = "Binary port: reactor state")]
    async fn sdk_get_binary_reactor_state(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_reactor_state(node_address).await
    }

    #[tool(description = "Binary port: network name")]
    async fn sdk_get_binary_network_name(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_network_name(node_address).await
    }

    #[tool(description = "Binary port: consensus validator changes")]
    async fn sdk_get_binary_consensus_validator_changes(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_consensus_validator_changes(node_address).await
    }

    #[tool(description = "Binary port: block synchronizer status")]
    async fn sdk_get_binary_block_synchronizer_status(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_block_synchronizer_status(node_address).await
    }

    #[tool(description = "Binary port: available block range")]
    async fn sdk_get_binary_available_block_range(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_available_block_range(node_address).await
    }

    #[tool(description = "Binary port: next upgrade")]
    async fn sdk_get_binary_next_upgrade(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_next_upgrade(node_address).await
    }

    #[tool(description = "Binary port: consensus status")]
    async fn sdk_get_binary_consensus_status(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_consensus_status(node_address).await
    }

    #[tool(description = "Binary port: chainspec raw bytes")]
    async fn sdk_get_binary_chainspec_raw_bytes(
        &self,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_chainspec_raw_bytes(node_address).await
    }

    #[tool(description = "Binary port: node status")]
    async fn sdk_get_binary_node_status(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_node_status(node_address).await
    }

    #[tool(description = "Binary port: validator reward by era")]
    async fn sdk_get_binary_validator_reward_by_era(
        &self,
        validator_key: String,
        era: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_validator_reward_by_era(validator_key, era, node_address)
            .await
    }

    #[tool(description = "Binary port: validator reward by block height")]
    async fn sdk_get_binary_validator_reward_by_block_height(
        &self,
        validator_key: String,
        block_height: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_validator_reward_by_block_height(
            validator_key,
            block_height,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: validator reward by block hash hex")]
    async fn sdk_get_binary_validator_reward_by_block_hash(
        &self,
        validator_key: String,
        block_hash: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_validator_reward_by_block_hash(
            validator_key,
            block_hash,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: delegator reward by era")]
    async fn sdk_get_binary_delegator_reward_by_era(
        &self,
        validator_key: String,
        delegator_key: String,
        era: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_delegator_reward_by_era(
            validator_key,
            delegator_key,
            era,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: delegator reward by block height")]
    async fn sdk_get_binary_delegator_reward_by_block_height(
        &self,
        validator_key: String,
        delegator_key: String,
        block_height: u64,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_delegator_reward_by_block_height(
            validator_key,
            delegator_key,
            block_height,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: delegator reward by block hash hex")]
    async fn sdk_get_binary_delegator_reward_by_block_hash(
        &self,
        validator_key: String,
        delegator_key: String,
        block_hash: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_delegator_reward_by_block_hash(
            validator_key,
            delegator_key,
            block_hash,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: read record (record_id 0-7, key_hex)")]
    async fn sdk_get_binary_read_record(
        &self,
        record_id: u16,
        key_hex: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_read_record(record_id, key_hex, node_address).await
    }

    #[tool(description = "Binary port: global state item (formatted key; path as a/b or JSON array)")]
    async fn sdk_get_binary_global_state_item(
        &self,
        key: String,
        path: Option<String>,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_global_state_item(key, path, node_address).await
    }

    #[tool(description = "Binary port: global state item by state root hash")]
    async fn sdk_get_binary_global_state_item_by_state_root_hash(
        &self,
        state_root_hash: String,
        key: String,
        path: Option<String>,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_global_state_item_by_state_root_hash(
            state_root_hash,
            key,
            path,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: global state item by block hash")]
    async fn sdk_get_binary_global_state_item_by_block_hash(
        &self,
        block_hash: String,
        key: String,
        path: Option<String>,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_global_state_item_by_block_hash(
            block_hash,
            key,
            path,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: global state item by block height")]
    async fn sdk_get_binary_global_state_item_by_block_height(
        &self,
        block_height: u64,
        key: String,
        path: Option<String>,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_global_state_item_by_block_height(
            block_height,
            key,
            path,
            node_address,
        )
        .await
    }

    #[tool(description = "Binary port: speculative execution of transaction JSON")]
    async fn sdk_get_binary_try_speculative_execution(
        &self,
        transaction_json: String,
        node_address: Option<String>,
    ) -> ToolOutput {
        tools::binary_port::get_binary_try_speculative_execution(transaction_json, node_address)
            .await
    }

    #[tool(description = "Binary port: protocol version")]
    async fn sdk_get_binary_protocol_version(&self, node_address: Option<String>) -> ToolOutput {
        tools::binary_port::get_binary_protocol_version(node_address).await
    }
}

fn help_text() -> String {
    let snap = sdk_handle::endpoint_snapshot();
    let groups = tools::enabled_tool_groups().join(", ");
    let pending = tools::pending_tool_placeholders();
    let pending_block = if pending.is_empty() {
        "  (none)".to_string()
    } else {
        format!("  - {}", pending.join("\n  - "))
    };
    let registered = tools::registered_tool_names()
        .into_iter()
        .map(|n| format!("  - {n}"))
        .collect::<Vec<_>>()
        .join("\n");
    format!(
        r#"casper-rust-wasm-sdk-mcp {version}

Transports
  stdio (default)  |  --http / CASPER_SDK_MCP_HTTP  listen CASPER_SDK_MCP_ADDR (default {listen})

Env (SDK)
  {rpc_env}   JSON-RPC URL   (default {rpc_default})
  {node_env}  binary port    (default {node_default})
  {verb_env}  low|medium|high|0|1|2 (default low)

Current endpoints
  rpc_address  = {rpc}
  node_address = {node}
  verbosity    = {verbosity}

Enabled feature groups
  {groups}

Registered tools
{registered}

Pending tool groups
{pending_block}

Compose with sibling MCPs: casper-nctl-2-docker (:8788), kms-secp256k1-api (:8789).
"#,
        version = env!("CARGO_PKG_VERSION"),
        listen = DEFAULT_HTTP_LISTEN,
        rpc_env = sdk_handle::ENV_RPC_URL,
        node_env = sdk_handle::ENV_NODE_URL,
        verb_env = sdk_handle::ENV_VERBOSITY,
        rpc_default = sdk_handle::DEFAULT_RPC_URL,
        node_default = sdk_handle::DEFAULT_NODE_URL,
        rpc = snap.rpc_address,
        node = snap.node_address,
        verbosity = snap.verbosity,
        groups = groups,
        registered = registered,
        pending_block = pending_block,
    )
}

/// Serves MCP over stdio until the client disconnects.
pub async fn run() -> Result<(), McpError> {
    let transport = StdioTransport::new();
    let server = ServerBuilder::new(CasperSdkMcp)
        .with_tools(CasperSdkMcp)
        .build();
    server.serve(transport).await
}

/// Serves MCP over Streamable HTTP until the process is stopped.
pub async fn run_http(addr: &str) -> std::io::Result<()> {
    McpRouter::new(CasperSdkMcp).serve(addr).await
}

impl ResourceHandler for CasperSdkMcp {
    async fn list_resources(&self, _ctx: &Context<'_>) -> Result<Vec<Resource>, McpError> {
        Ok(Vec::new())
    }

    async fn read_resource(
        &self,
        uri: &str,
        _ctx: &Context<'_>,
    ) -> Result<Vec<ResourceContents>, McpError> {
        Err(McpError::invalid_params(
            "resources/read",
            format!("unknown resource: {uri}"),
        ))
    }
}

impl PromptHandler for CasperSdkMcp {
    async fn list_prompts(&self, _ctx: &Context<'_>) -> Result<Vec<Prompt>, McpError> {
        Ok(Vec::new())
    }

    async fn get_prompt(
        &self,
        name: &str,
        _args: Option<serde_json::Map<String, serde_json::Value>>,
        _ctx: &Context<'_>,
    ) -> Result<GetPromptResult, McpError> {
        Err(McpError::invalid_params(
            "prompts/get",
            format!("unknown prompt: {name}"),
        ))
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn mcp_server_version_matches_crate() {
        let src = include_str!("server.rs");
        let needle = format!(
            r#"#[mcp_server(name = "casper-rust-wasm-sdk", version = "{}")]"#,
            env!("CARGO_PKG_VERSION")
        );
        assert!(
            src.contains(&needle),
            "bump #[mcp_server(version = …)] to {} when changing Cargo.toml version",
            env!("CARGO_PKG_VERSION")
        );
    }
}
