//! JSON-RPC tools domain logic (feature `rpc`).

#![allow(deprecated)]

use casper_rust_wasm_sdk::rpcs::get_balance::GetBalanceInput;
use casper_rust_wasm_sdk::rpcs::get_dictionary_item::DictionaryItemInput;
use casper_rust_wasm_sdk::rpcs::query_global_state::{
    KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams,
};
use casper_rust_wasm_sdk::types::deploy::Deploy;
use casper_rust_wasm_sdk::types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams;
use casper_rust_wasm_sdk::types::hash::deploy_hash::DeployHash;
use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
use casper_rust_wasm_sdk::types::identifier::block_identifier::BlockIdentifierInput;
use casper_rust_wasm_sdk::types::transaction::Transaction;
use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;

/// Registered RPC tool names for help text.
pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_get_account",
        "sdk_get_auction_info",
        "sdk_get_balance",
        "sdk_get_block",
        "sdk_get_block_transfers",
        "sdk_get_chainspec",
        "sdk_get_deploy",
        "sdk_get_dictionary_item",
        "sdk_get_entity",
        "sdk_get_era_info",
        "sdk_get_era_summary",
        "sdk_get_node_status",
        "sdk_get_peers",
        "sdk_get_state_root_hash",
        "sdk_get_transaction",
        "sdk_get_validator_changes",
        "sdk_list_rpcs",
        "sdk_query_balance",
        "sdk_query_balance_details",
        "sdk_query_global_state",
        "sdk_speculative_exec",
        "sdk_speculative_exec_deploy",
    ]
}

fn block_id(maybe: Option<String>) -> Option<BlockIdentifierInput> {
    maybe.map(BlockIdentifierInput::String)
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

macro_rules! rpc_ok {
    ($expr:expr) => {
        match $expr {
            Ok(resp) => format::serialize_ok(&resp.result),
            Err(err) => format::err(err),
        }
    };
}

pub async fn get_node_status(
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_node_status(verb(verbosity.as_deref()), rpc_address)
            .await
    )
}

pub async fn get_peers(verbosity: Option<String>, rpc_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(sdk.get_peers(verb(verbosity.as_deref()), rpc_address).await)
}

pub async fn get_chainspec(verbosity: Option<String>, rpc_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_chainspec(verb(verbosity.as_deref()), rpc_address)
            .await
    )
}

pub async fn get_validator_changes(
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_validator_changes(verb(verbosity.as_deref()), rpc_address)
            .await
    )
}

pub async fn list_rpcs(verbosity: Option<String>, rpc_address: Option<String>) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(sdk.list_rpcs(verb(verbosity.as_deref()), rpc_address).await)
}

pub async fn get_block(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_block(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_block_transfers(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_block_transfers(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_auction_info(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_auction_info(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_era_summary(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_era_summary(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_era_info(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_era_info(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_state_root_hash(
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_state_root_hash(
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_account(
    account_identifier: Option<String>,
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_account(
            None,
            account_identifier,
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_entity(
    entity_identifier: Option<String>,
    maybe_block_identifier: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_entity(
            None,
            entity_identifier,
            block_id(maybe_block_identifier),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_deploy(
    deploy_hash: String,
    finalized_approvals: Option<bool>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let hash = match DeployHash::new(&deploy_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_deploy(
            hash,
            finalized_approvals,
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_transaction(
    transaction_hash: String,
    finalized_approvals: Option<bool>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let hash = match TransactionHash::new(&transaction_hash) {
        Ok(h) => h,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_transaction(
            hash,
            finalized_approvals,
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_balance(
    purse_uref: String,
    state_root_hash: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_balance(
            GetBalanceInput::PurseUrefAsString(purse_uref),
            state_root_hash.as_deref(),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn query_balance(
    purse_identifier: String,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.query_balance(
            None,
            Some(purse_identifier),
            None,
            state_root_hash,
            maybe_block_id,
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn query_balance_details(
    purse_identifier: String,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.query_balance_details(
            None,
            Some(purse_identifier),
            None,
            state_root_hash,
            maybe_block_id,
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn get_dictionary_item(
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
    let mut params = DictionaryItemStrParams::new();
    match kind.as_str() {
        "uref" => {
            let seed = match seed_uref {
                Some(s) => s,
                None => return format::err("kind=uref requires seed_uref"),
            };
            let item_key = match dictionary_item_key {
                Some(s) => s,
                None => return format::err("kind=uref requires dictionary_item_key"),
            };
            params.set_uref(&seed, &item_key);
        }
        "dictionary" => {
            let value = match dictionary_value {
                Some(s) => s,
                None => return format::err("kind=dictionary requires dictionary_value"),
            };
            params.set_dictionary(&value);
        }
        "account_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return format::err(
                        "kind=account_named_key requires key, dictionary_name, dictionary_item_key",
                    )
                }
            };
            params.set_account_named_key(&k, &dn, &dik);
        }
        "contract_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return format::err(
                        "kind=contract_named_key requires key, dictionary_name, dictionary_item_key",
                    )
                }
            };
            params.set_contract_named_key(&k, &dn, &dik);
        }
        "entity_named_key" => {
            let (k, dn, dik) = match (key, dictionary_name, dictionary_item_key) {
                (Some(k), Some(dn), Some(dik)) => (k, dn, dik),
                _ => {
                    return format::err(
                        "kind=entity_named_key requires key, dictionary_name, dictionary_item_key",
                    )
                }
            };
            params.set_entity_named_key(&k, &dn, &dik);
        }
        other => {
            return format::err(format!(
                "unknown kind '{other}' (uref|dictionary|account_named_key|contract_named_key|entity_named_key)"
            ))
        }
    }

    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.get_dictionary_item(
            DictionaryItemInput::Params(Box::new(params)),
            state_root_hash.as_deref(),
            verb(verbosity.as_deref()),
            rpc_address
        )
        .await
    )
}

pub async fn query_global_state(
    key: String,
    path: Option<String>,
    state_root_hash: Option<String>,
    maybe_block_id: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    let params = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(key),
        path: path.map(PathIdentifierInput::String),
        maybe_global_state_identifier: None,
        state_root_hash,
        maybe_block_id,
        rpc_address,
        verbosity: verb(verbosity.as_deref()),
    };
    rpc_ok!(sdk.query_global_state(params).await)
}

pub async fn speculative_exec(
    transaction_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let transaction = match Transaction::from_json_string(&transaction_json) {
        Ok(t) => t,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.speculative_exec(transaction, verb(verbosity.as_deref()), rpc_address)
            .await
    )
}

pub async fn speculative_exec_deploy(
    deploy_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy = match Deploy::from_json_string(&deploy_json) {
        Ok(d) => d,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    rpc_ok!(
        sdk.speculative_exec_deploy(deploy, verb(verbosity.as_deref()), rpc_address)
            .await
    )
}
