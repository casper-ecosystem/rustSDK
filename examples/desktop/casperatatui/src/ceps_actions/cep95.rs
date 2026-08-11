//! CEP-95 action handlers.

use super::{
    call_result_json, ceps_err, ceps_verbosity, chain_opt, endpoints_json, load_wasm, optional,
    optional_or, package_opt, payment, require_pem, required, sse_opt, transaction_params, CepsCtx,
};
use ceps_client::cep95::InstallArgs;
use ceps_client::CEP95Client;
use serde_json::{json, Value};
use std::collections::HashMap;

pub async fn run_cep95(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "cep95_info" => {
            let c = client(ctx)?;
            Ok(endpoints_json(
                "cep95",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep95_get_account_named_key" => {
            let c = client(ctx)?;
            let account = required(args, "account")?;
            let named_key = required(args, "named_key")?;
            Ok(json!({
                "value": c.get_account_named_key(&account, &named_key).await.map_err(ceps_err)?,
            }))
        }
        "cep95_name" => ok(bound(ctx, args)?.name().await),
        "cep95_symbol" => ok(bound(ctx, args)?.symbol().await),
        "cep95_total_supply" => ok(bound(ctx, args)?.total_supply().await),
        "cep95_get_owner" => ok(bound(ctx, args)?.get_owner().await),
        "cep95_balance_of" => ok(bound(ctx, args)?
            .balance_of(&required(args, "account")?)
            .await),
        "cep95_owner_of" => ok(bound(ctx, args)?
            .owner_of(&required(args, "token_id")?)
            .await),
        "cep95_get_approved" => ok(bound(ctx, args)?
            .get_approved(&required(args, "token_id")?)
            .await),
        "cep95_is_approved_for_all" => {
            let owner = required(args, "owner")?;
            let operator = required(args, "operator")?;
            ok(bound(ctx, args)?
                .is_approved_for_all(&owner, &operator)
                .await)
        }
        "cep95_token_metadata" => ok(bound(ctx, args)?
            .token_metadata(&required(args, "token_id")?)
            .await),
        "cep95_install" => install(args, ctx).await,
        "cep95_bind_odra_install" => {
            let mut c = client(ctx)?;
            let installer = required(args, "installer")?;
            let package_key = required(args, "package_key_name")?;
            let (contract, package) = c
                .bind_odra_install(&installer, &package_key)
                .await
                .map_err(ceps_err)?;
            Ok(json!({ "contract_hash": contract, "package_hash": package }))
        }
        "cep95_mint" => {
            ctx.policy.check_put_generic("cep95_mint")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let to = required(args, "to")?;
            let token_id = optional_or(args, "token_id", "0");
            let meta = parse_meta(optional(args, "token_meta_data").as_deref())?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.mint(&to, &token_id, meta.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep95_burn" => {
            ctx.policy.check_put_generic("cep95_burn")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let token_id = required(args, "token_id")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.burn(&token_id, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep95_transfer_from" => {
            ctx.policy.check_put_generic("cep95_transfer_from")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let from = required(args, "from")?;
            let to = required(args, "to")?;
            let token_id = required(args, "token_id")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer_from(&from, &to, &token_id, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep95_safe_transfer_from" => {
            ctx.policy.check_put_generic("cep95_safe_transfer_from")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let from = required(args, "from")?;
            let to = required(args, "to")?;
            let token_id = required(args, "token_id")?;
            let data = optional(args, "data").map(|s| s.into_bytes());
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.safe_transfer_from(&from, &to, &token_id, data.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep95_approve" => {
            ctx.policy.check_put_generic("cep95_approve")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let spender = required(args, "spender")?;
            let token_id = required(args, "token_id")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.approve(&spender, &token_id, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep95_revoke_approval" => {
            ctx.policy.check_put_generic("cep95_revoke_approval")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let token_id = required(args, "token_id")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.revoke_approval(&token_id, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep95_approve_for_all" => {
            ctx.policy.check_put_generic("cep95_approve_for_all")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let operator = required(args, "operator")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.approve_for_all(&operator, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep95_revoke_approval_for_all" => {
            ctx.policy
                .check_put_generic("cep95_revoke_approval_for_all")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let operator = required(args, "operator")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.revoke_approval_for_all(&operator, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep95_transfer_ownership" => {
            ctx.policy.check_put_generic("cep95_transfer_ownership")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let new_owner = required(args, "new_owner")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer_ownership(&new_owner, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        other => Err(format!("unknown cep95 action `{other}`")),
    }
}

fn ok<T: serde::Serialize>(r: Result<T, impl std::fmt::Display>) -> Result<Value, String> {
    Ok(json!({ "value": r.map_err(ceps_err)? }))
}

fn parse_meta(raw: Option<&str>) -> Result<Option<Vec<(String, String)>>, String> {
    let Some(raw) = raw.map(str::trim).filter(|s| !s.is_empty()) else {
        return Ok(None);
    };
    let v: Value = serde_json::from_str(raw).map_err(|e| format!("token_meta_data JSON: {e}"))?;
    if let Some(obj) = v.as_object() {
        let pairs = obj
            .iter()
            .map(|(k, val)| {
                Ok((
                    k.clone(),
                    val.as_str()
                        .map(str::to_string)
                        .unwrap_or_else(|| val.to_string()),
                ))
            })
            .collect::<Result<Vec<_>, String>>()?;
        return Ok(Some(pairs));
    }
    Err("token_meta_data must be a JSON object".into())
}

fn client(ctx: &CepsCtx<'_>) -> Result<CEP95Client, String> {
    CEP95Client::new(
        ctx.rpc,
        sse_opt(ctx),
        chain_opt(ctx),
        Some(ceps_verbosity(ctx.verbosity)),
    )
    .map_err(ceps_err)
}

fn bound(ctx: &CepsCtx<'_>, args: &HashMap<String, String>) -> Result<CEP95Client, String> {
    let mut c = client(ctx)?;
    let hash = required(args, "contract_hash")?;
    c.set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)?;
    Ok(c)
}

async fn install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep95_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let symbol = optional_or(args, "symbol", "T95");
    let package_key = required(args, "package_key_name")?;
    let wasm = load_wasm(args, "cep95")?;
    let mut client = client(ctx)?;
    let install_args = InstallArgs::new(&name, &symbol, &package_key);
    let tx = transaction_params(pem, &payment(args), ctx);
    let put = client
        .install(&install_args, &wasm, &tx)
        .await
        .map_err(ceps_err)?;
    let mut out = call_result_json(&put);
    let pk = casper_rust_wasm_sdk::helpers::public_key_from_secret_key(pem)
        .map_err(|e| e.to_string())?;
    let (contract, package) = client
        .bind_odra_install(&pk, &package_key)
        .await
        .map_err(ceps_err)?;
    out["contract_hash"] = json!(contract);
    out["package_hash"] = json!(package);
    out["installer"] = json!(pk);
    Ok(out)
}
