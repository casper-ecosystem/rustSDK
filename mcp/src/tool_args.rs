//! JSON-schema parameter structs for rmcp `Parameters<T>` tool handlers.

use schemars::JsonSchema;
use serde::Deserialize;

#[derive(Debug, Deserialize, JsonSchema)]
pub struct RpcOpts {
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct NodeOpts {
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct BlockIdOpts {
    #[serde(default)]
    pub maybe_block_identifier: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkCallEntrypointArgs {
    pub builder_params_json: String,
    pub transaction_params_json: String,
    #[serde(default)]
    pub rpc_address: Option<String>,
    #[serde(default)]
    pub runtime_v2: Option<bool>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkCallEntrypointDeployArgs {
    pub deploy_params_json: String,
    pub session_params_json: String,
    pub payment_params_json: String,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkCesParseExecutionResultArgs {
    pub schemas_metadata_json: String,
    pub execution_result_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkCesParseTransactionArgs {
    pub contract_hashes_json: String,
    pub transaction_hash: String,
    #[serde(default)]
    pub finalized_approvals: Option<bool>,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkCesParserCreateArgs {
    pub contract_hashes_json: String,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkClValueToJsonArgs {
    pub cl_value_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetAccountArgs {
    #[serde(default)]
    pub account_identifier: Option<String>,
    #[serde(default)]
    pub maybe_block_identifier: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBalanceArgs {
    pub purse_uref: String,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBase64KeyFromAccountHashArgs {
    pub account_hash: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBase64KeyFromKeyHashArgs {
    pub formatted_hash: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryBlockHeaderByHashArgs {
    pub block_hash: String,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryBlockHeaderByHeightArgs {
    pub height: u64,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryDelegatorRewardByBlockHashArgs {
    pub validator_key: String,
    pub delegator_key: String,
    pub block_hash: String,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryDelegatorRewardByBlockHeightArgs {
    pub validator_key: String,
    pub delegator_key: String,
    pub block_height: u64,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryDelegatorRewardByEraArgs {
    pub validator_key: String,
    pub delegator_key: String,
    pub era: u64,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryGlobalStateItemArgs {
    pub key: String,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryGlobalStateItemByBlockHashArgs {
    pub block_hash: String,
    pub key: String,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryGlobalStateItemByBlockHeightArgs {
    pub block_height: u64,
    pub key: String,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryGlobalStateItemByStateRootHashArgs {
    pub state_root_hash: String,
    pub key: String,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryReadRecordArgs {
    pub record_id: u16,
    pub key_hex: String,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryTransactionByHashArgs {
    pub hash: String,
    #[serde(default)]
    pub with_finalized_approvals: Option<bool>,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryTrySpeculativeExecutionArgs {
    pub transaction_json: String,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryValidatorRewardByBlockHashArgs {
    pub validator_key: String,
    pub block_hash: String,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryValidatorRewardByBlockHeightArgs {
    pub validator_key: String,
    pub block_height: u64,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBinaryValidatorRewardByEraArgs {
    pub validator_key: String,
    pub era: u64,
    #[serde(default)]
    pub node_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBlake2bHashArgs {
    pub meta_data: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetBlockTransactionsArgs {
    pub block_identifier: String,
    #[serde(default)]
    pub expand: Option<bool>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetCurrentTimestampArgs {
    #[serde(default)]
    pub timestamp: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetDeployArgs {
    pub deploy_hash: String,
    #[serde(default)]
    pub finalized_approvals: Option<bool>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetDictionaryItemArgs {
    pub kind: String,
    #[serde(default)]
    pub key: Option<String>,
    #[serde(default)]
    pub dictionary_name: Option<String>,
    #[serde(default)]
    pub dictionary_item_key: Option<String>,
    #[serde(default)]
    pub seed_uref: Option<String>,
    #[serde(default)]
    pub dictionary_value: Option<String>,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetEntityArgs {
    #[serde(default)]
    pub entity_identifier: Option<String>,
    #[serde(default)]
    pub maybe_block_identifier: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetGasPriceOrDefaultArgs {
    #[serde(default)]
    pub gas_price: Option<u64>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetLatestBlocksArgs {
    #[serde(default)]
    pub count: Option<u32>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetRewardArgs {
    pub validator: String,
    #[serde(default)]
    pub delegator: Option<String>,
    #[serde(default)]
    pub maybe_era_id: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetTransactionArgs {
    pub transaction_hash: String,
    #[serde(default)]
    pub finalized_approvals: Option<bool>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetTtlOrDefaultArgs {
    #[serde(default)]
    pub ttl: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkGetValidatorArgs {
    pub public_key: String,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkHexToUint8VecArgs {
    pub hex_string: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkInstallArgs {
    pub transaction_params_json: String,
    pub wasm_hex: String,
    #[serde(default)]
    pub rpc_address: Option<String>,
    #[serde(default)]
    pub runtime_v2: Option<bool>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkInstallDeployArgs {
    pub deploy_params_json: String,
    pub session_params_json: String,
    pub payment_amount: String,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkJsonPrettyPrintArgs {
    pub value: String,
    #[serde(default)]
    pub verbosity: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeDelegateTransactionArgs {
    pub delegator: String,
    pub validator: String,
    pub amount: String,
    pub transaction_params_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeDeployArgs {
    pub deploy_params_json: String,
    pub session_params_json: String,
    pub payment_params_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeDictionaryItemKeyArgs {
    pub key: String,
    #[serde(default)]
    pub value_key: Option<String>,
    #[serde(default)]
    pub value_u256: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeRedelegateTransactionArgs {
    pub delegator: String,
    pub validator: String,
    pub new_validator: String,
    pub amount: String,
    pub transaction_params_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeTransactionArgs {
    pub builder_params_json: String,
    pub transaction_params_json: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeTransferArgs {
    pub amount: String,
    pub target_account: String,
    pub deploy_params_json: String,
    pub payment_params_json: String,
    #[serde(default)]
    pub transfer_id: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMakeTransferTransactionArgs {
    pub target: String,
    pub amount: String,
    pub transaction_params_json: String,
    #[serde(default)]
    pub maybe_source: Option<String>,
    #[serde(default)]
    pub maybe_id: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkMotesToCsprArgs {
    pub motes: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkParseTimestampArgs {
    pub value: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkQueryBalanceArgs {
    pub purse_identifier: String,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub maybe_block_id: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkQueryContractDictArgs {
    pub kind: String,
    pub dictionary_item_json: String,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkQueryContractKeyArgs {
    pub entity_identifier: String,
    pub path: String,
    #[serde(default)]
    pub maybe_block_identifier: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkQueryGlobalStateArgs {
    pub key: String,
    #[serde(default)]
    pub path: Option<String>,
    #[serde(default)]
    pub state_root_hash: Option<String>,
    #[serde(default)]
    pub maybe_block_id: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSecretKeyFromPemArgs {
    pub secret_key: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSetEndpointsArgs {
    #[serde(default)]
    pub rpc_address: Option<String>,
    #[serde(default)]
    pub node_address: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSignDeployArgs {
    pub deploy_json: String,
    pub secret_key: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSignTransactionArgs {
    pub transaction_json: String,
    pub secret_key: String,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeDeployArgs {
    pub deploy_params_json: String,
    pub session_params_json: String,
    pub payment_params_json: String,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeExecArgs {
    pub transaction_json: String,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeExecDeployArgs {
    pub deploy_json: String,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeTransactionArgs {
    pub builder_params_json: String,
    pub transaction_params_json: String,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeTransferArgs {
    pub amount: String,
    pub target_account: String,
    pub deploy_params_json: String,
    pub payment_params_json: String,
    #[serde(default)]
    pub transfer_id: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSpeculativeTransferTransactionArgs {
    pub target_account: String,
    pub amount: String,
    pub transaction_params_json: String,
    #[serde(default)]
    pub maybe_source: Option<String>,
    #[serde(default)]
    pub maybe_id: Option<String>,
    #[serde(default)]
    pub verbosity: Option<String>,
    #[serde(default)]
    pub rpc_address: Option<String>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkSseCollectArgs {
    pub events_url: String,
    pub event_names: String,
    #[serde(default)]
    pub max_events: Option<u64>,
    #[serde(default)]
    pub timeout_ms: Option<u64>,
    #[serde(default)]
    pub start_from: Option<u64>,
}

#[derive(Debug, Deserialize, JsonSchema)]
pub struct SdkWaitTransactionArgs {
    pub events_url: String,
    pub transaction_hash: String,
    #[serde(default)]
    pub timeout_ms: Option<u64>,
}
