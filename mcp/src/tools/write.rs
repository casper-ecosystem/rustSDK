//! Mutating / signing / submit tools (feature `write`).

#![allow(deprecated)]

use casper_rust_wasm_sdk::helpers;
use casper_rust_wasm_sdk::types::cl::bytes::Bytes;
use casper_rust_wasm_sdk::types::deploy::Deploy;
use casper_rust_wasm_sdk::types::transaction::Transaction;
use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;
use crate::tools::deploy;
use crate::tools::params::{
    parse_deploy_str_params, parse_optional_uref, parse_payment_str_params,
    parse_session_str_params, parse_transaction_builder_params, parse_transaction_str_params,
};
use crate::tools::transaction;

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_sign_transaction",
        "sdk_put_transaction",
        "sdk_transaction",
        "sdk_transfer_transaction",
        "sdk_sign_deploy",
        "sdk_put_deploy",
        "sdk_deploy",
        "sdk_transfer",
        "sdk_install",
        "sdk_install_deploy",
        "sdk_call_entrypoint",
        "sdk_call_entrypoint_deploy",
        "sdk_get_binary_try_accept_transaction",
    ]
}

fn verb(verbosity: Option<&str>) -> Option<casper_rust_wasm_sdk::types::verbosity::Verbosity> {
    sdk_handle::verbosity_override(verbosity)
}

pub fn sign_transaction(transaction_json: String, secret_key: String) -> ToolOutput {
    let tx = match Transaction::from_json_string(&transaction_json) {
        Ok(t) => t,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    transaction::serialize_transaction(sdk.sign_transaction(tx, &secret_key))
}

pub async fn put_transaction(
    transaction_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let tx = match Transaction::from_json_string(&transaction_json) {
        Ok(t) => t,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .put_transaction(tx, verb(verbosity.as_deref()), rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn transaction(
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
        .transaction(builder, params, verb(verbosity.as_deref()), rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn transfer_transaction(
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
        .transfer_transaction(
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

pub fn sign_deploy(deploy_json: String, secret_key: String) -> ToolOutput {
    let deploy = match Deploy::from_json_string(&deploy_json) {
        Ok(d) => d,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    deploy::serialize_deploy(sdk.sign_deploy(deploy, &secret_key))
}

pub async fn put_deploy(
    deploy_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy = match Deploy::from_json_string(&deploy_json) {
        Ok(d) => d,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .put_deploy(deploy, verb(verbosity.as_deref()), rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn deploy(
    deploy_params_json: String,
    session_params_json: String,
    payment_params_json: String,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy_params = match parse_deploy_str_params(&deploy_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let session_params = match parse_session_str_params(&session_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let payment_params = match parse_payment_str_params(&payment_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .deploy(
            deploy_params,
            session_params,
            payment_params,
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn transfer(
    amount: String,
    target_account: String,
    deploy_params_json: String,
    payment_params_json: String,
    transfer_id: Option<String>,
    verbosity: Option<String>,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy_params = match parse_deploy_str_params(&deploy_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let payment_params = match parse_payment_str_params(&payment_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .transfer(
            &amount,
            &target_account,
            transfer_id,
            deploy_params,
            payment_params,
            verb(verbosity.as_deref()),
            rpc_address,
        )
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn install(
    transaction_params_json: String,
    wasm_hex: String,
    rpc_address: Option<String>,
    runtime_v2: Option<bool>,
) -> ToolOutput {
    let params = match parse_transaction_str_params(&transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let bytes = helpers::hex_to_uint8_vec(&wasm_hex);
    if bytes.is_empty() {
        return format::err("wasm_hex decoded empty");
    }
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .install(params, Bytes::from(bytes), rpc_address, runtime_v2)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn install_deploy(
    deploy_params_json: String,
    session_params_json: String,
    payment_amount: String,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy_params = match parse_deploy_str_params(&deploy_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let session_params = match parse_session_str_params(&session_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .install_deploy(deploy_params, session_params, &payment_amount, rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn call_entrypoint(
    builder_params_json: String,
    transaction_params_json: String,
    rpc_address: Option<String>,
    runtime_v2: Option<bool>,
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
        .call_entrypoint(builder, params, rpc_address, runtime_v2)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn call_entrypoint_deploy(
    deploy_params_json: String,
    session_params_json: String,
    payment_params_json: String,
    rpc_address: Option<String>,
) -> ToolOutput {
    let deploy_params = match parse_deploy_str_params(&deploy_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let session_params = match parse_session_str_params(&session_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let payment_params = match parse_payment_str_params(&payment_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .call_entrypoint_deploy(deploy_params, session_params, payment_params, rpc_address)
        .await
    {
        Ok(resp) => format::serialize_ok(&resp.result),
        Err(err) => format::err(err),
    }
}

pub async fn get_binary_try_accept_transaction(
    transaction_json: String,
    node_address: Option<String>,
) -> ToolOutput {
    let transaction = match Transaction::from_json_string(&transaction_json) {
        Ok(t) => t,
        Err(err) => return format::err(err),
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .get_binary_try_accept_transaction(node_address, transaction.into())
        .await
    {
        Ok(()) => format::json_ok(&serde_json::json!({ "ok": true })),
        Err(err) => format::err(err),
    }
}
