//! MCP server (`rmcp`) for `casper-rust-wasm-sdk-mcp` (stdio or Streamable HTTP).

#![allow(clippy::unused_async)]
#![allow(non_snake_case)] // sdk_SSE_* / sdk_CES_* tool names + rmcp-generated *_tool_attr

use std::sync::Arc;

use rmcp::{
    handler::server::wrapper::Parameters,
    model::{CallToolResult, ServerCapabilities, ServerInfo},
    tool, tool_handler, tool_router,
    transport::stdio,
    ErrorData as McpError, ServerHandler, ServiceExt,
};

use crate::tool_args::*;
use crate::{compose, format, sdk_handle, tools};

/// MCP server handle exposing Casper SDK tools.
#[derive(Clone, Default)]
pub struct CasperSdkMcp;

/// Default HTTP bind address for Streamable MCP.
pub const DEFAULT_HTTP_LISTEN: &str = "0.0.0.0:5790";

#[tool_router]
impl CasperSdkMcp {
    #[tool(description = "Help: feature matrix, env vars, endpoints, and available sdk_* tools")]
    async fn sdk_help(&self) -> Result<CallToolResult, McpError> {
        Ok(format::text_ok(help_text()))
    }

    #[tool(
        description = "Show current CASPER_RPC_URL / CASPER_NODE_URL / verbosity on the shared SDK"
    )]
    async fn sdk_get_endpoints(&self) -> Result<CallToolResult, McpError> {
        let snap = sdk_handle::endpoint_snapshot();
        Ok(format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
            "env": {
                "CASPER_RPC_URL": sdk_handle::ENV_RPC_URL,
                "CASPER_NODE_URL": sdk_handle::ENV_NODE_URL,
                "CASPER_VERBOSITY": sdk_handle::ENV_VERBOSITY,
            }
        })))
    }

    #[tool(
        description = "Update shared SDK endpoints for this process (optional rpc_address, node_address, verbosity)"
    )]
    async fn sdk_set_endpoints(
        &self,
        Parameters(SdkSetEndpointsArgs {
            rpc_address,
            node_address,
            verbosity,
        }): Parameters<SdkSetEndpointsArgs>,
    ) -> Result<CallToolResult, McpError> {
        let sdk = sdk_handle::shared();
        let mut guard = match sdk.lock() {
            Ok(g) => g,
            Err(err) => return Ok(format::err(format!("sdk mutex poisoned: {err}"))),
        };
        if let Some(rpc) = rpc_address {
            if let Err(err) = guard.set_rpc_address(Some(rpc)) {
                return Ok(format::err(err));
            }
        }
        if let Some(node) = node_address {
            if let Err(err) = guard.set_node_address(Some(node)) {
                return Ok(format::err(err));
            }
        }
        if let Some(raw) = verbosity {
            let v = sdk_handle::parse_verbosity(&raw);
            if let Err(err) = guard.set_verbosity(Some(v)) {
                return Ok(format::err(err));
            }
        }
        let snap = sdk_handle::EndpointSnapshot {
            rpc_address: guard.get_rpc_address(None),
            node_address: guard.get_node_address(None),
            verbosity: format!("{:?}", guard.get_verbosity(None)),
        };
        Ok(format::json_ok(&serde_json::json!({
            "rpc_address": snap.rpc_address,
            "node_address": snap.node_address,
            "verbosity": snap.verbosity,
        })))
    }

    #[tool(description = "Current RFC3339 timestamp (optional unix-ms timestamp override)")]
    async fn sdk_get_current_timestamp(
        &self,
        Parameters(SdkGetCurrentTimestampArgs { timestamp }): Parameters<
            SdkGetCurrentTimestampArgs,
        >,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_current_timestamp(timestamp))
    }

    #[tool(description = "Blake2b-256 hex digest of a UTF-8 string")]
    async fn sdk_get_blake2b_hash(
        &self,
        Parameters(SdkGetBlake2bHashArgs { meta_data }): Parameters<SdkGetBlake2bHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_blake2b_hash(meta_data))
    }

    #[tool(
        description = "Dictionary item key from formatted key + exactly one of value_key (formatted Key) or value_u256"
    )]
    async fn sdk_make_dictionary_item_key(
        &self,
        Parameters(SdkMakeDictionaryItemKeyArgs {
            key,
            value_key,
            value_u256,
        }): Parameters<SdkMakeDictionaryItemKeyArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::make_dictionary_item_key(
            key, value_key, value_u256,
        ))
    }

    #[tool(description = "CEP-18 base64 key from account-hash-… string")]
    async fn sdk_get_base64_key_from_account_hash(
        &self,
        Parameters(SdkGetBase64KeyFromAccountHashArgs { account_hash }): Parameters<
            SdkGetBase64KeyFromAccountHashArgs,
        >,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_base64_key_from_account_hash(
            account_hash,
        ))
    }

    #[tool(description = "CEP-18 base64 key from hash-… formatted key")]
    async fn sdk_get_base64_key_from_key_hash(
        &self,
        Parameters(SdkGetBase64KeyFromKeyHashArgs { formatted_hash }): Parameters<
            SdkGetBase64KeyFromKeyHashArgs,
        >,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_base64_key_from_key_hash(formatted_hash))
    }

    #[tool(description = "TTL string or SDK default")]
    async fn sdk_get_ttl_or_default(
        &self,
        Parameters(SdkGetTtlOrDefaultArgs { ttl }): Parameters<SdkGetTtlOrDefaultArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_ttl_or_default(ttl))
    }

    #[tool(description = "Parse a timestamp string")]
    async fn sdk_parse_timestamp(
        &self,
        Parameters(SdkParseTimestampArgs { value }): Parameters<SdkParseTimestampArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::parse_timestamp(value))
    }

    #[tool(description = "Parse a TTL / TimeDiff string")]
    async fn sdk_parse_ttl(
        &self,
        Parameters(SdkParseTimestampArgs { value }): Parameters<SdkParseTimestampArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::parse_ttl(value))
    }

    #[tool(description = "Gas price or SDK default")]
    async fn sdk_get_gas_price_or_default(
        &self,
        Parameters(SdkGetGasPriceOrDefaultArgs { gas_price }): Parameters<
            SdkGetGasPriceOrDefaultArgs,
        >,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::get_gas_price_or_default(gas_price))
    }

    #[tool(description = "Generate Ed25519 secret key PEM (local; treat as secret)")]
    async fn sdk_secret_key_generate(&self) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::secret_key_generate())
    }

    #[tool(description = "Generate secp256k1 secret key PEM (local; treat as secret)")]
    async fn sdk_secret_key_secp256k1_generate(&self) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::secret_key_secp256k1_generate())
    }

    #[tool(description = "Validate a secret key PEM (does not echo the secret)")]
    async fn sdk_secret_key_from_pem(
        &self,
        Parameters(SdkSecretKeyFromPemArgs { secret_key }): Parameters<SdkSecretKeyFromPemArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::secret_key_from_pem(secret_key))
    }

    #[tool(description = "Derive public key hex from secret key PEM")]
    async fn sdk_public_key_from_secret_key(
        &self,
        Parameters(SdkSecretKeyFromPemArgs { secret_key }): Parameters<SdkSecretKeyFromPemArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::public_key_from_secret_key(secret_key))
    }

    #[tool(description = "Decode hex string to byte array JSON")]
    async fn sdk_hex_to_uint8_vec(
        &self,
        Parameters(SdkHexToUint8VecArgs { hex_string }): Parameters<SdkHexToUint8VecArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::hex_to_uint8_vec(hex_string))
    }

    #[tool(description = "Decode hex string to UTF-8 (lossy) text")]
    async fn sdk_hex_to_string(
        &self,
        Parameters(SdkHexToUint8VecArgs { hex_string }): Parameters<SdkHexToUint8VecArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::hex_to_string(hex_string))
    }

    #[tool(description = "Convert motes string to CSPR")]
    async fn sdk_motes_to_cspr(
        &self,
        Parameters(SdkMotesToCsprArgs { motes }): Parameters<SdkMotesToCsprArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::motes_to_cspr(motes))
    }

    #[tool(description = "Pretty-print a JSON string at optional verbosity (low|medium|high)")]
    async fn sdk_json_pretty_print(
        &self,
        Parameters(SdkJsonPrettyPrintArgs { value, verbosity }): Parameters<SdkJsonPrettyPrintArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::json_pretty_print(value, verbosity))
    }

    #[tool(description = "Convert a CLValue JSON document to JSON Value")]
    async fn sdk_cl_value_to_json(
        &self,
        Parameters(SdkClValueToJsonArgs { cl_value_json }): Parameters<SdkClValueToJsonArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::helpers::cl_value_to_json(cl_value_json))
    }

    #[tool(description = "JSON-RPC info_get_status / get_node_status")]
    async fn sdk_get_node_status(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_node_status(verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC info_get_peers")]
    async fn sdk_get_peers(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_peers(verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC info_get_chainspec")]
    async fn sdk_get_chainspec(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_chainspec(verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC info_get_validator_changes")]
    async fn sdk_get_validator_changes(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_validator_changes(verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC list_rpcs")]
    async fn sdk_list_rpcs(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::list_rpcs(verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC chain_get_block (optional block height or hash string)")]
    async fn sdk_get_block(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_block(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC chain_get_block_transfers")]
    async fn sdk_get_block_transfers(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_block_transfers(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(
        description = "Compose: tip height then N latest blocks via get_block (default count=10, max 50)"
    )]
    async fn sdk_get_latest_blocks(
        &self,
        Parameters(SdkGetLatestBlocksArgs {
            count,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetLatestBlocksArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "rpc")]
        {
            Ok(compose::blocks::get_latest_blocks(count, verbosity, rpc_address).await)
        }
        #[cfg(not(feature = "rpc"))]
        Ok({
            let _ = (count, verbosity, rpc_address);
            tools::feature_disabled("rpc")
        })
    }

    #[tool(
        description = "Compose: transaction hashes in a block; optional expand fetches each get_transaction"
    )]
    async fn sdk_get_block_transactions(
        &self,
        Parameters(SdkGetBlockTransactionsArgs {
            block_identifier,
            expand,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetBlockTransactionsArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "rpc")]
        {
            Ok(compose::blocks::get_block_transactions(
                block_identifier,
                expand,
                verbosity,
                rpc_address,
            )
            .await)
        }
        #[cfg(not(feature = "rpc"))]
        Ok({
            let _ = (block_identifier, expand, verbosity, rpc_address);
            tools::feature_disabled("rpc")
        })
    }

    #[tool(
        description = "Compose: active validators from get_auction_info (inactive=false), sorted by total stake"
    )]
    async fn sdk_list_validators(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "rpc")]
        {
            Ok(compose::auction::list_validators(verbosity, rpc_address).await)
        }
        #[cfg(not(feature = "rpc"))]
        Ok({
            let _ = (verbosity, rpc_address);
            tools::feature_disabled("rpc")
        })
    }

    #[tool(
        description = "Compose: one validator bid + delegators from get_auction_info by public_key"
    )]
    async fn sdk_get_validator(
        &self,
        Parameters(SdkGetValidatorArgs {
            public_key,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetValidatorArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "rpc")]
        {
            Ok(compose::auction::get_validator(public_key, verbosity, rpc_address).await)
        }
        #[cfg(not(feature = "rpc"))]
        Ok({
            let _ = (public_key, verbosity, rpc_address);
            tools::feature_disabled("rpc")
        })
    }

    #[tool(
        description = "Compose: all auction bids (active + inactive) from get_auction_info, sorted by total stake"
    )]
    async fn sdk_list_bidders(
        &self,
        Parameters(RpcOpts {
            verbosity,
            rpc_address,
        }): Parameters<RpcOpts>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "rpc")]
        {
            Ok(compose::auction::list_bidders(verbosity, rpc_address).await)
        }
        #[cfg(not(feature = "rpc"))]
        Ok({
            let _ = (verbosity, rpc_address);
            tools::feature_disabled("rpc")
        })
    }

    #[tool(description = "Compose: build unsigned delegate transaction")]
    async fn sdk_make_delegate_transaction(
        &self,
        Parameters(SdkMakeDelegateTransactionArgs {
            delegator,
            validator,
            amount,
            transaction_params_json,
        }): Parameters<SdkMakeDelegateTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "transaction")]
        {
            Ok(compose::stake::make_delegate_transaction(
                delegator,
                validator,
                amount,
                transaction_params_json,
            ))
        }
        #[cfg(not(feature = "transaction"))]
        Ok({
            let _ = (delegator, validator, amount, transaction_params_json);
            tools::feature_disabled("transaction")
        })
    }

    #[tool(description = "Compose: build unsigned undelegate transaction")]
    async fn sdk_make_undelegate_transaction(
        &self,
        Parameters(SdkMakeDelegateTransactionArgs {
            delegator,
            validator,
            amount,
            transaction_params_json,
        }): Parameters<SdkMakeDelegateTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "transaction")]
        {
            Ok(compose::stake::make_undelegate_transaction(
                delegator,
                validator,
                amount,
                transaction_params_json,
            ))
        }
        #[cfg(not(feature = "transaction"))]
        Ok({
            let _ = (delegator, validator, amount, transaction_params_json);
            tools::feature_disabled("transaction")
        })
    }

    #[tool(description = "Compose: build unsigned redelegate transaction")]
    async fn sdk_make_redelegate_transaction(
        &self,
        Parameters(SdkMakeRedelegateTransactionArgs {
            delegator,
            validator,
            new_validator,
            amount,
            transaction_params_json,
        }): Parameters<SdkMakeRedelegateTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "transaction")]
        {
            Ok(compose::stake::make_redelegate_transaction(
                delegator,
                validator,
                new_validator,
                amount,
                transaction_params_json,
            ))
        }
        #[cfg(not(feature = "transaction"))]
        Ok({
            let _ = (
                delegator,
                validator,
                new_validator,
                amount,
                transaction_params_json,
            );
            tools::feature_disabled("transaction")
        })
    }

    #[tool(description = "JSON-RPC state_get_auction_info")]
    async fn sdk_get_auction_info(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_auction_info(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC chain_get_era_summary")]
    async fn sdk_get_era_summary(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_era_summary(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(
        description = "JSON-RPC info_get_reward (validator hex; optional delegator hex and era id)"
    )]
    async fn sdk_get_reward(
        &self,
        Parameters(SdkGetRewardArgs {
            validator,
            delegator,
            maybe_era_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetRewardArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::rpc::get_reward(validator, delegator, maybe_era_id, verbosity, rpc_address)
                .await,
        )
    }

    #[tool(
        description = "JSON-RPC chain_get_era_info_by_switch_block (deprecated; prefer era_summary)"
    )]
    async fn sdk_get_era_info(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_era_info(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC chain_get_state_root_hash")]
    async fn sdk_get_state_root_hash(
        &self,
        Parameters(BlockIdOpts {
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<BlockIdOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_state_root_hash(maybe_block_identifier, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC state_get_account_info (deprecated; prefer get_entity)")]
    async fn sdk_get_account(
        &self,
        Parameters(SdkGetAccountArgs {
            account_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetAccountArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_account(
            account_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "JSON-RPC state_get_entity / get_entity")]
    async fn sdk_get_entity(
        &self,
        Parameters(SdkGetEntityArgs {
            entity_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetEntityArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_entity(
            entity_identifier,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "JSON-RPC info_get_deploy")]
    async fn sdk_get_deploy(
        &self,
        Parameters(SdkGetDeployArgs {
            deploy_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_deploy(deploy_hash, finalized_approvals, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC info_get_transaction")]
    async fn sdk_get_transaction(
        &self,
        Parameters(SdkGetTransactionArgs {
            transaction_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_transaction(
            transaction_hash,
            finalized_approvals,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "JSON-RPC state_get_balance (purse uref string)")]
    async fn sdk_get_balance(
        &self,
        Parameters(SdkGetBalanceArgs {
            purse_uref,
            state_root_hash,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetBalanceArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_balance(purse_uref, state_root_hash, verbosity, rpc_address).await)
    }

    #[tool(
        description = "JSON-RPC query_balance (purse identifier string: pubkey / account-hash / uref)"
    )]
    async fn sdk_query_balance(
        &self,
        Parameters(SdkQueryBalanceArgs {
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkQueryBalanceArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::query_balance(
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "JSON-RPC query_balance_details")]
    async fn sdk_query_balance_details(
        &self,
        Parameters(SdkQueryBalanceArgs {
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkQueryBalanceArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::query_balance_details(
            purse_identifier,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(
        description = "JSON-RPC state_get_dictionary_item; kind=uref|dictionary|account_named_key|contract_named_key|entity_named_key"
    )]
    async fn sdk_get_dictionary_item(
        &self,
        Parameters(SdkGetDictionaryItemArgs {
            kind,
            key,
            dictionary_name,
            dictionary_item_key,
            seed_uref,
            dictionary_value,
            state_root_hash,
            verbosity,
            rpc_address,
        }): Parameters<SdkGetDictionaryItemArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::get_dictionary_item(
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
        .await)
    }

    #[tool(
        description = "JSON-RPC query_global_state (formatted key; optional path / state root / block)"
    )]
    async fn sdk_query_global_state(
        &self,
        Parameters(SdkQueryGlobalStateArgs {
            key,
            path,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkQueryGlobalStateArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::query_global_state(
            key,
            path,
            state_root_hash,
            maybe_block_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "JSON-RPC speculative_exec with full transaction JSON")]
    async fn sdk_speculative_exec(
        &self,
        Parameters(SdkSpeculativeExecArgs {
            transaction_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeExecArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::speculative_exec(transaction_json, verbosity, rpc_address).await)
    }

    #[tool(description = "JSON-RPC speculative_exec_deploy with full deploy JSON")]
    async fn sdk_speculative_exec_deploy(
        &self,
        Parameters(SdkSpeculativeExecDeployArgs {
            deploy_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeExecDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::rpc::speculative_exec_deploy(deploy_json, verbosity, rpc_address).await)
    }

    #[tool(description = "Binary port: latest switch block header (needs CASPER_NODE_URL)")]
    async fn sdk_get_binary_latest_switch_block_header(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_latest_switch_block_header(node_address).await)
    }

    #[tool(description = "Binary port: latest block header")]
    async fn sdk_get_binary_latest_block_header(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_latest_block_header(node_address).await)
    }

    #[tool(description = "Binary port: block header by height")]
    async fn sdk_get_binary_block_header_by_height(
        &self,
        Parameters(SdkGetBinaryBlockHeaderByHeightArgs {
            height,
            node_address,
        }): Parameters<SdkGetBinaryBlockHeaderByHeightArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_block_header_by_height(height, node_address).await)
    }

    #[tool(description = "Binary port: block header by hash hex")]
    async fn sdk_get_binary_block_header_by_hash(
        &self,
        Parameters(SdkGetBinaryBlockHeaderByHashArgs {
            block_hash,
            node_address,
        }): Parameters<SdkGetBinaryBlockHeaderByHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_block_header_by_hash(block_hash, node_address).await)
    }

    #[tool(description = "Binary port: latest block with signatures")]
    async fn sdk_get_binary_latest_block_with_signatures(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_latest_block_with_signatures(node_address).await)
    }

    #[tool(description = "Binary port: block with signatures by height")]
    async fn sdk_get_binary_block_with_signatures_by_height(
        &self,
        Parameters(SdkGetBinaryBlockHeaderByHeightArgs {
            height,
            node_address,
        }): Parameters<SdkGetBinaryBlockHeaderByHeightArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_block_with_signatures_by_height(height, node_address)
                .await,
        )
    }

    #[tool(description = "Binary port: block with signatures by hash hex")]
    async fn sdk_get_binary_block_with_signatures_by_hash(
        &self,
        Parameters(SdkGetBinaryBlockHeaderByHashArgs {
            block_hash,
            node_address,
        }): Parameters<SdkGetBinaryBlockHeaderByHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_block_with_signatures_by_hash(block_hash, node_address)
                .await,
        )
    }

    #[tool(description = "Binary port: transaction by hash hex")]
    async fn sdk_get_binary_transaction_by_hash(
        &self,
        Parameters(SdkGetBinaryTransactionByHashArgs {
            hash,
            with_finalized_approvals,
            node_address,
        }): Parameters<SdkGetBinaryTransactionByHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_transaction_by_hash(
            hash,
            with_finalized_approvals,
            node_address,
        )
        .await)
    }

    #[tool(description = "Binary port: peers")]
    async fn sdk_get_binary_peers(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_peers(node_address).await)
    }

    #[tool(description = "Binary port: node uptime")]
    async fn sdk_get_binary_uptime(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_uptime(node_address).await)
    }

    #[tool(description = "Binary port: last progress")]
    async fn sdk_get_binary_last_progress(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_last_progress(node_address).await)
    }

    #[tool(description = "Binary port: reactor state")]
    async fn sdk_get_binary_reactor_state(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_reactor_state(node_address).await)
    }

    #[tool(description = "Binary port: network name")]
    async fn sdk_get_binary_network_name(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_network_name(node_address).await)
    }

    #[tool(description = "Binary port: consensus validator changes")]
    async fn sdk_get_binary_consensus_validator_changes(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_consensus_validator_changes(node_address).await)
    }

    #[tool(description = "Binary port: block synchronizer status")]
    async fn sdk_get_binary_block_synchronizer_status(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_block_synchronizer_status(node_address).await)
    }

    #[tool(description = "Binary port: available block range")]
    async fn sdk_get_binary_available_block_range(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_available_block_range(node_address).await)
    }

    #[tool(description = "Binary port: next upgrade")]
    async fn sdk_get_binary_next_upgrade(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_next_upgrade(node_address).await)
    }

    #[tool(description = "Binary port: consensus status")]
    async fn sdk_get_binary_consensus_status(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_consensus_status(node_address).await)
    }

    #[tool(description = "Binary port: chainspec raw bytes")]
    async fn sdk_get_binary_chainspec_raw_bytes(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_chainspec_raw_bytes(node_address).await)
    }

    #[tool(description = "Binary port: node status")]
    async fn sdk_get_binary_node_status(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_node_status(node_address).await)
    }

    #[tool(description = "Binary port: validator reward by era")]
    async fn sdk_get_binary_validator_reward_by_era(
        &self,
        Parameters(SdkGetBinaryValidatorRewardByEraArgs {
            validator_key,
            era,
            node_address,
        }): Parameters<SdkGetBinaryValidatorRewardByEraArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_validator_reward_by_era(
                validator_key,
                era,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: validator reward by block height")]
    async fn sdk_get_binary_validator_reward_by_block_height(
        &self,
        Parameters(SdkGetBinaryValidatorRewardByBlockHeightArgs {
            validator_key,
            block_height,
            node_address,
        }): Parameters<SdkGetBinaryValidatorRewardByBlockHeightArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_validator_reward_by_block_height(
                validator_key,
                block_height,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: validator reward by block hash hex")]
    async fn sdk_get_binary_validator_reward_by_block_hash(
        &self,
        Parameters(SdkGetBinaryValidatorRewardByBlockHashArgs {
            validator_key,
            block_hash,
            node_address,
        }): Parameters<SdkGetBinaryValidatorRewardByBlockHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_validator_reward_by_block_hash(
                validator_key,
                block_hash,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: delegator reward by era")]
    async fn sdk_get_binary_delegator_reward_by_era(
        &self,
        Parameters(SdkGetBinaryDelegatorRewardByEraArgs {
            validator_key,
            delegator_key,
            era,
            node_address,
        }): Parameters<SdkGetBinaryDelegatorRewardByEraArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_delegator_reward_by_era(
            validator_key,
            delegator_key,
            era,
            node_address,
        )
        .await)
    }

    #[tool(description = "Binary port: delegator reward by block height")]
    async fn sdk_get_binary_delegator_reward_by_block_height(
        &self,
        Parameters(SdkGetBinaryDelegatorRewardByBlockHeightArgs {
            validator_key,
            delegator_key,
            block_height,
            node_address,
        }): Parameters<SdkGetBinaryDelegatorRewardByBlockHeightArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_delegator_reward_by_block_height(
                validator_key,
                delegator_key,
                block_height,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: delegator reward by block hash hex")]
    async fn sdk_get_binary_delegator_reward_by_block_hash(
        &self,
        Parameters(SdkGetBinaryDelegatorRewardByBlockHashArgs {
            validator_key,
            delegator_key,
            block_hash,
            node_address,
        }): Parameters<SdkGetBinaryDelegatorRewardByBlockHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_delegator_reward_by_block_hash(
                validator_key,
                delegator_key,
                block_hash,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: read record (record_id 0-7, key_hex)")]
    async fn sdk_get_binary_read_record(
        &self,
        Parameters(SdkGetBinaryReadRecordArgs {
            record_id,
            key_hex,
            node_address,
        }): Parameters<SdkGetBinaryReadRecordArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_read_record(record_id, key_hex, node_address).await)
    }

    #[tool(
        description = "Binary port: global state item (formatted key; path as a/b or JSON array)"
    )]
    async fn sdk_get_binary_global_state_item(
        &self,
        Parameters(SdkGetBinaryGlobalStateItemArgs {
            key,
            path,
            node_address,
        }): Parameters<SdkGetBinaryGlobalStateItemArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_global_state_item(key, path, node_address).await)
    }

    #[tool(description = "Binary port: global state item by state root hash")]
    async fn sdk_get_binary_global_state_item_by_state_root_hash(
        &self,
        Parameters(SdkGetBinaryGlobalStateItemByStateRootHashArgs {
            state_root_hash,
            key,
            path,
            node_address,
        }): Parameters<SdkGetBinaryGlobalStateItemByStateRootHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_global_state_item_by_state_root_hash(
                state_root_hash,
                key,
                path,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: global state item by block hash")]
    async fn sdk_get_binary_global_state_item_by_block_hash(
        &self,
        Parameters(SdkGetBinaryGlobalStateItemByBlockHashArgs {
            block_hash,
            key,
            path,
            node_address,
        }): Parameters<SdkGetBinaryGlobalStateItemByBlockHashArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_global_state_item_by_block_hash(
                block_hash,
                key,
                path,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: global state item by block height")]
    async fn sdk_get_binary_global_state_item_by_block_height(
        &self,
        Parameters(SdkGetBinaryGlobalStateItemByBlockHeightArgs {
            block_height,
            key,
            path,
            node_address,
        }): Parameters<SdkGetBinaryGlobalStateItemByBlockHeightArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_global_state_item_by_block_height(
                block_height,
                key,
                path,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: speculative execution of transaction JSON")]
    async fn sdk_get_binary_try_speculative_execution(
        &self,
        Parameters(SdkGetBinaryTrySpeculativeExecutionArgs {
            transaction_json,
            node_address,
        }): Parameters<SdkGetBinaryTrySpeculativeExecutionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(
            tools::binary_port::get_binary_try_speculative_execution(
                transaction_json,
                node_address,
            )
            .await,
        )
    }

    #[tool(description = "Binary port: protocol version")]
    async fn sdk_get_binary_protocol_version(
        &self,
        Parameters(NodeOpts { node_address }): Parameters<NodeOpts>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::binary_port::get_binary_protocol_version(node_address).await)
    }

    #[tool(
        description = "Build unsigned transaction from builder_params_json + transaction_params_json"
    )]
    async fn sdk_make_transaction(
        &self,
        Parameters(SdkMakeTransactionArgs {
            builder_params_json,
            transaction_params_json,
        }): Parameters<SdkMakeTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::transaction::make_transaction(
            builder_params_json,
            transaction_params_json,
        ))
    }

    #[tool(description = "Build unsigned transfer transaction")]
    async fn sdk_make_transfer_transaction(
        &self,
        Parameters(SdkMakeTransferTransactionArgs {
            target,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
        }): Parameters<SdkMakeTransferTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::transaction::make_transfer_transaction(
            target,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
        ))
    }

    #[tool(description = "Speculative exec of a built transaction (no submit)")]
    async fn sdk_speculative_transaction(
        &self,
        Parameters(SdkSpeculativeTransactionArgs {
            builder_params_json,
            transaction_params_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::transaction::speculative_transaction(
            builder_params_json,
            transaction_params_json,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Speculative transfer transaction (no submit)")]
    async fn sdk_speculative_transfer_transaction(
        &self,
        Parameters(SdkSpeculativeTransferTransactionArgs {
            target_account,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransferTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::transaction::speculative_transfer_transaction(
            target_account,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Build unsigned legacy deploy")]
    async fn sdk_make_deploy(
        &self,
        Parameters(SdkMakeDeployArgs {
            deploy_params_json,
            session_params_json,
            payment_params_json,
        }): Parameters<SdkMakeDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::deploy::make_deploy(
            deploy_params_json,
            session_params_json,
            payment_params_json,
        ))
    }

    #[tool(description = "Build unsigned legacy transfer deploy")]
    async fn sdk_make_transfer(
        &self,
        Parameters(SdkMakeTransferArgs {
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
        }): Parameters<SdkMakeTransferArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::deploy::make_transfer(
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
        ))
    }

    #[tool(description = "Speculative legacy deploy (no submit)")]
    async fn sdk_speculative_deploy(
        &self,
        Parameters(SdkSpeculativeDeployArgs {
            deploy_params_json,
            session_params_json,
            payment_params_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::deploy::speculative_deploy(
            deploy_params_json,
            session_params_json,
            payment_params_json,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Speculative legacy transfer (no submit)")]
    async fn sdk_speculative_transfer(
        &self,
        Parameters(SdkSpeculativeTransferArgs {
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransferArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::deploy::speculative_transfer(
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Query contract dictionary; kind + dictionary_item_json fields")]
    async fn sdk_query_contract_dict(
        &self,
        Parameters(SdkQueryContractDictArgs {
            kind,
            dictionary_item_json,
            state_root_hash,
            verbosity,
            rpc_address,
        }): Parameters<SdkQueryContractDictArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::contract::query_contract_dict(
            kind,
            dictionary_item_json,
            state_root_hash,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Query contract named key path under an entity")]
    async fn sdk_query_contract_key(
        &self,
        Parameters(SdkQueryContractKeyArgs {
            entity_identifier,
            path,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        }): Parameters<SdkQueryContractKeyArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::contract::query_contract_key(
            entity_identifier,
            path,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Sign transaction JSON with secret key PEM (mutates approvals)")]
    async fn sdk_sign_transaction(
        &self,
        Parameters(SdkSignTransactionArgs {
            transaction_json,
            secret_key,
        }): Parameters<SdkSignTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::sign_transaction(transaction_json, secret_key))
    }

    #[tool(description = "Submit signed transaction JSON via put_transaction")]
    async fn sdk_put_transaction(
        &self,
        Parameters(SdkSpeculativeExecArgs {
            transaction_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeExecArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::put_transaction(transaction_json, verbosity, rpc_address).await)
    }

    #[tool(description = "Build + submit transaction (make + put)")]
    async fn sdk_transaction(
        &self,
        Parameters(SdkSpeculativeTransactionArgs {
            builder_params_json,
            transaction_params_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::transaction(
            builder_params_json,
            transaction_params_json,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Build + submit transfer transaction")]
    async fn sdk_transfer_transaction(
        &self,
        Parameters(SdkSpeculativeTransferTransactionArgs {
            target_account,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransferTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::transfer_transaction(
            target_account,
            amount,
            transaction_params_json,
            maybe_source,
            maybe_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Sign deploy JSON with secret key PEM")]
    async fn sdk_sign_deploy(
        &self,
        Parameters(SdkSignDeployArgs {
            deploy_json,
            secret_key,
        }): Parameters<SdkSignDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::sign_deploy(deploy_json, secret_key))
    }

    #[tool(description = "Submit signed deploy JSON")]
    async fn sdk_put_deploy(
        &self,
        Parameters(SdkSpeculativeExecDeployArgs {
            deploy_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeExecDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::put_deploy(deploy_json, verbosity, rpc_address).await)
    }

    #[tool(description = "Build + submit legacy deploy")]
    async fn sdk_deploy(
        &self,
        Parameters(SdkSpeculativeDeployArgs {
            deploy_params_json,
            session_params_json,
            payment_params_json,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::deploy(
            deploy_params_json,
            session_params_json,
            payment_params_json,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Build + submit legacy transfer")]
    async fn sdk_transfer(
        &self,
        Parameters(SdkSpeculativeTransferArgs {
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
            verbosity,
            rpc_address,
        }): Parameters<SdkSpeculativeTransferArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::transfer(
            amount,
            target_account,
            deploy_params_json,
            payment_params_json,
            transfer_id,
            verbosity,
            rpc_address,
        )
        .await)
    }

    #[tool(
        description = "Install wasm (hex) as transaction session with is_install_upgrade. runtime_v2 omitted/true = VmCasperV2; false = VmCasperV1"
    )]
    async fn sdk_install(
        &self,
        Parameters(SdkInstallArgs {
            transaction_params_json,
            wasm_hex,
            rpc_address,
            runtime_v2,
        }): Parameters<SdkInstallArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::install(transaction_params_json, wasm_hex, rpc_address, runtime_v2).await)
    }

    #[tool(description = "Install via legacy deploy (deprecated; prefer sdk_install)")]
    async fn sdk_install_deploy(
        &self,
        Parameters(SdkInstallDeployArgs {
            deploy_params_json,
            session_params_json,
            payment_amount,
            rpc_address,
        }): Parameters<SdkInstallDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::install_deploy(
            deploy_params_json,
            session_params_json,
            payment_amount,
            rpc_address,
        )
        .await)
    }

    #[tool(
        description = "Call contract entrypoint via transaction submit. runtime_v2 omitted = keep builder default; true = V2; false = V1"
    )]
    async fn sdk_call_entrypoint(
        &self,
        Parameters(SdkCallEntrypointArgs {
            builder_params_json,
            transaction_params_json,
            rpc_address,
            runtime_v2,
        }): Parameters<SdkCallEntrypointArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::call_entrypoint(
            builder_params_json,
            transaction_params_json,
            rpc_address,
            runtime_v2,
        )
        .await)
    }

    #[tool(description = "Call entrypoint via legacy deploy (deprecated)")]
    async fn sdk_call_entrypoint_deploy(
        &self,
        Parameters(SdkCallEntrypointDeployArgs {
            deploy_params_json,
            session_params_json,
            payment_params_json,
            rpc_address,
        }): Parameters<SdkCallEntrypointDeployArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::call_entrypoint_deploy(
            deploy_params_json,
            session_params_json,
            payment_params_json,
            rpc_address,
        )
        .await)
    }

    #[tool(description = "Binary port: try_accept_transaction (submit via binary port)")]
    async fn sdk_get_binary_try_accept_transaction(
        &self,
        Parameters(SdkGetBinaryTrySpeculativeExecutionArgs {
            transaction_json,
            node_address,
        }): Parameters<SdkGetBinaryTrySpeculativeExecutionArgs>,
    ) -> Result<CallToolResult, McpError> {
        Ok(tools::write::get_binary_try_accept_transaction(transaction_json, node_address).await)
    }

    #[tool(description = "Wait for TransactionProcessed on node SSE for a transaction hash")]
    async fn sdk_wait_transaction(
        &self,
        Parameters(SdkWaitTransactionArgs {
            events_url,
            transaction_hash,
            timeout_ms,
        }): Parameters<SdkWaitTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "watcher")]
        {
            Ok(tools::watcher::wait_transaction(events_url, transaction_hash, timeout_ms).await)
        }
        #[cfg(not(feature = "watcher"))]
        Ok({
            let _ = (events_url, transaction_hash, timeout_ms);
            tools::feature_disabled("watcher")
        })
    }

    #[tool(
        description = "Collect up to max_events matching event_names from node SSE (JSON array or comma list)"
    )]
    #[allow(non_snake_case)]
    async fn sdk_SSE_collect(
        &self,
        Parameters(SdkSseCollectArgs {
            events_url,
            event_names,
            max_events,
            timeout_ms,
            start_from,
        }): Parameters<SdkSseCollectArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "SSE")]
        {
            Ok(
                tools::SSE::SSE_collect(
                    events_url,
                    event_names,
                    max_events,
                    timeout_ms,
                    start_from,
                )
                .await,
            )
        }
        #[cfg(not(feature = "SSE"))]
        Ok({
            let _ = (events_url, event_names, max_events, timeout_ms, start_from);
            tools::feature_disabled("SSE")
        })
    }

    #[tool(
        description = "Load CES schemas for contract hash hexes; returns metadata JSON (include schemaHex for parse tools)"
    )]
    #[allow(non_snake_case)]
    async fn sdk_CES_parser_create(
        &self,
        Parameters(SdkCesParserCreateArgs {
            contract_hashes_json,
            state_root_hash,
            rpc_address,
        }): Parameters<SdkCesParserCreateArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "SSE")]
        {
            Ok(
                tools::SSE::CES_parser_create(contract_hashes_json, state_root_hash, rpc_address)
                    .await,
            )
        }
        #[cfg(not(feature = "SSE"))]
        Ok({
            let _ = (contract_hashes_json, state_root_hash, rpc_address);
            tools::feature_disabled("SSE")
        })
    }

    #[tool(
        description = "Parse CES events from execution_result JSON using schemas_metadata_json from sdk_CES_parser_create"
    )]
    #[allow(non_snake_case)]
    async fn sdk_CES_parse_execution_result(
        &self,
        Parameters(SdkCesParseExecutionResultArgs {
            schemas_metadata_json,
            execution_result_json,
        }): Parameters<SdkCesParseExecutionResultArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "SSE")]
        {
            Ok(tools::SSE::CES_parse_execution_result(
                schemas_metadata_json,
                execution_result_json,
            ))
        }
        #[cfg(not(feature = "SSE"))]
        Ok({
            let _ = (schemas_metadata_json, execution_result_json);
            tools::feature_disabled("SSE")
        })
    }

    #[tool(
        description = "get_transaction then parse CES events for contract_hashes_json (JSON string array)"
    )]
    #[allow(non_snake_case)]
    async fn sdk_CES_parse_transaction(
        &self,
        Parameters(SdkCesParseTransactionArgs {
            contract_hashes_json,
            transaction_hash,
            finalized_approvals,
            state_root_hash,
            verbosity,
            rpc_address,
        }): Parameters<SdkCesParseTransactionArgs>,
    ) -> Result<CallToolResult, McpError> {
        #[cfg(feature = "SSE")]
        {
            Ok(tools::SSE::CES_parse_transaction(
                contract_hashes_json,
                transaction_hash,
                finalized_approvals,
                state_root_hash,
                verbosity,
                rpc_address,
            )
            .await)
        }
        #[cfg(not(feature = "SSE"))]
        Ok({
            let _ = (
                contract_hashes_json,
                transaction_hash,
                finalized_approvals,
                state_root_hash,
                verbosity,
                rpc_address,
            );
            tools::feature_disabled("SSE")
        })
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
  stdio (default)  |  --http / MCP_HTTP  listen CASPER_SDK_MCP_ADDR (default {listen})

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
pub async fn run() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let server = CasperSdkMcp;
    let service = server.serve(stdio()).await?;
    service.waiting().await?;
    Ok(())
}

/// Serves MCP over Streamable HTTP until the process is stopped.
pub async fn run_http(addr: &str) -> std::io::Result<()> {
    let config =
        rmcp::transport::streamable_http_server::tower::StreamableHttpServerConfig::default();
    let service = rmcp::transport::streamable_http_server::tower::StreamableHttpService::new(
        || Ok(CasperSdkMcp),
        Arc::new(
            rmcp::transport::streamable_http_server::session::local::LocalSessionManager::default(),
        ),
        config,
    );
    let method_router = axum::routing::any_service(service);
    let app = axum::Router::new()
        .route("/mcp", method_router.clone())
        .route("/mcp/", method_router);
    let listener = tokio::net::TcpListener::bind(addr).await?;
    tracing::info!(%addr, "casper-rust-wasm-sdk-mcp HTTP listening");
    axum::serve(listener, app).await?;
    Ok(())
}

#[tool_handler]
impl ServerHandler for CasperSdkMcp {
    fn get_info(&self) -> ServerInfo {
        ServerInfo::new(ServerCapabilities::builder().enable_tools().build())
            .with_server_info(rmcp::model::Implementation::new(
                "casper-rust-wasm-sdk",
                env!("CARGO_PKG_VERSION"),
            ))
            .with_instructions(help_text())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn mcp_server_version_matches_crate() {
        let info = CasperSdkMcp.get_info();
        assert_eq!(info.server_info.version, env!("CARGO_PKG_VERSION"));
        assert_eq!(info.server_info.name.as_str(), "casper-rust-wasm-sdk");
    }
}
