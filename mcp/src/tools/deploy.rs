//! Legacy deploy builder / speculative tools (feature `deploy`).

#![allow(deprecated)]

use casper_rust_wasm_sdk::types::deploy::Deploy;
use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;
use crate::tools::params::{
    parse_deploy_str_params, parse_payment_str_params, parse_session_str_params,
};

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_make_deploy",
        "sdk_make_transfer",
        "sdk_speculative_deploy",
        "sdk_speculative_transfer",
    ]
}

pub fn serialize_deploy(deploy: Deploy) -> ToolOutput {
    match deploy.to_json_string() {
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

pub fn make_deploy(
    deploy_params_json: String,
    session_params_json: String,
    payment_params_json: String,
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
    match sdk.make_deploy(deploy_params, session_params, payment_params) {
        Ok(d) => serialize_deploy(d),
        Err(err) => format::err(err),
    }
}

pub fn make_transfer(
    amount: String,
    target_account: String,
    deploy_params_json: String,
    payment_params_json: String,
    transfer_id: Option<String>,
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
    match sdk.make_transfer(
        &amount,
        &target_account,
        transfer_id,
        deploy_params,
        payment_params,
    ) {
        Ok(d) => serialize_deploy(d),
        Err(err) => format::err(err),
    }
}

pub async fn speculative_deploy(
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
        .speculative_deploy(
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

pub async fn speculative_transfer(
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
        .speculative_transfer(
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
