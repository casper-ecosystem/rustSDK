//! Transaction builder / speculative tools (feature `transaction`).

use casper_rust_wasm_sdk::types::transaction::Transaction;
use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;
use crate::tools::params::{
    parse_optional_uref, parse_transaction_builder_params, parse_transaction_str_params,
};

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_make_transaction",
        "sdk_make_transfer_transaction",
        "sdk_speculative_transaction",
        "sdk_speculative_transfer_transaction",
    ]
}

pub fn serialize_transaction(tx: Transaction) -> ToolOutput {
    match tx.to_json_string() {
        Ok(s) => match serde_json::from_str::<serde_json::Value>(&s) {
            Ok(v) => format::json_ok(&v),
            Err(_) => format::text_ok(s),
        },
        Err(err) => format::err(err),
    }
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

pub fn make_transaction(
    builder_params_json: String,
    transaction_params_json: String,
) -> ToolOutput {
    let builder = match parse_transaction_builder_params(&builder_params_json) {
        Ok(b) => b,
        Err(err) => return format::err(err),
    };
    let params = match parse_transaction_str_params(&transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk.make_transaction(builder, params) {
        Ok(tx) => serialize_transaction(tx),
        Err(err) => format::err(err),
    }
}

pub fn make_transfer_transaction(
    target: String,
    amount: String,
    transaction_params_json: String,
    maybe_source: Option<String>,
    maybe_id: Option<String>,
) -> ToolOutput {
    let params = match parse_transaction_str_params(&transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let source = match parse_optional_uref(maybe_source.as_deref()) {
        Ok(s) => s,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk.make_transfer_transaction(source, &target, &amount, params, maybe_id) {
        Ok(tx) => serialize_transaction(tx),
        Err(err) => format::err(err),
    }
}

pub async fn speculative_transaction(
    builder_params_json: String,
    transaction_params_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let builder = match parse_transaction_builder_params(&builder_params_json) {
        Ok(b) => b,
        Err(err) => return format::err(err),
    };
    let params = match parse_transaction_str_params(&transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .speculative_transaction(builder, params, verb(verbosity.as_deref()), rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn speculative_transfer_transaction(
    target_account: String,
    amount: String,
    transaction_params_json: String,
    maybe_source: Option<String>,
    maybe_id: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let params = match parse_transaction_str_params(&transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let source = match parse_optional_uref(maybe_source.as_deref()) {
        Ok(s) => s,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .speculative_transfer_transaction(
            source,
            &target_account,
            &amount,
            params,
            maybe_id,
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}
