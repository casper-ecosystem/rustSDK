//! CEP-18 action handlers.

use super::{
    call_result_json, ceps_err, ceps_verbosity, chain_opt, csv_list, endpoints_json, events_mode,
    load_wasm, optional, optional_or, package_opt, parse_u8, payment, require_pem, required,
    sse_opt, transaction_params, CepsCtx,
};
use ceps_client::cep18::{ChangeSecurityArgs, InstallArgs, UpgradeArgs};
use ceps_client::{CEP18Client, EventsMode};
use serde_json::{json, Value};
use std::collections::HashMap;

pub async fn run_cep18(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "cep18_info" => {
            let c = client(ctx)?;
            Ok(endpoints_json(
                "cep18",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep18_name" => {
            let c = bound(ctx, args)?;
            Ok(json!({ "name": c.name().await.map_err(ceps_err)? }))
        }
        "cep18_symbol" => {
            let c = bound(ctx, args)?;
            Ok(json!({ "symbol": c.symbol().await.map_err(ceps_err)? }))
        }
        "cep18_decimals" => {
            let c = bound(ctx, args)?;
            Ok(json!({ "decimals": c.decimals().await.map_err(ceps_err)? }))
        }
        "cep18_total_supply" => {
            let c = bound(ctx, args)?;
            Ok(json!({ "total_supply": c.total_supply().await.map_err(ceps_err)? }))
        }
        "cep18_events_mode" => {
            let c = bound(ctx, args)?;
            Ok(json!({ "events_mode": c.events_mode().await.map_err(ceps_err)? }))
        }
        "cep18_is_mint_and_burn_enabled" => {
            let c = bound(ctx, args)?;
            Ok(json!({
                "is_mint_and_burn_enabled": c.is_mint_and_burn_enabled().await.map_err(ceps_err)?
            }))
        }
        "cep18_balance_of" => {
            let c = bound(ctx, args)?;
            let account = required(args, "account")?;
            Ok(json!({
                "account": account,
                "balance": c.balance_of(&account).await.map_err(ceps_err)?,
            }))
        }
        "cep18_allowances" => {
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let spender = required(args, "spender")?;
            Ok(json!({
                "owner": owner,
                "spender": spender,
                "allowance": c.allowances(&owner, &spender).await.map_err(ceps_err)?,
            }))
        }
        "cep18_security_badge" => {
            let c = bound(ctx, args)?;
            let account = required(args, "account")?;
            let badge = c.security_badge(&account).await.map_err(ceps_err)?;
            Ok(json!({
                "account": account,
                "security_badge": badge.map(|b| format!("{b:?}")),
            }))
        }
        "cep18_get_account_named_key" => {
            let c = client(ctx)?;
            let account = required(args, "account")?;
            let named_key = required(args, "named_key")?;
            Ok(json!({
                "named_key": named_key,
                "value": c.get_account_named_key(&account, &named_key).await.map_err(ceps_err)?,
            }))
        }
        "cep18_install" => install(args, ctx).await,
        "cep18_upgrade" => upgrade(args, ctx).await,
        "cep18_transfer" => {
            ctx.policy.check_put_generic("cep18_transfer")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let recipient = required(args, "recipient")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer(&recipient, &amount, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep18_transfer_from" => {
            ctx.policy.check_put_generic("cep18_transfer_from")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let recipient = required(args, "recipient")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer_from(&owner, &recipient, &amount, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep18_approve" => {
            ctx.policy.check_put_generic("cep18_approve")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let spender = required(args, "spender")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.approve(&spender, &amount, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep18_increase_allowance" => {
            ctx.policy.check_put_generic("cep18_increase_allowance")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let spender = required(args, "spender")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.increase_allowance(&spender, &amount, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep18_decrease_allowance" => {
            ctx.policy.check_put_generic("cep18_decrease_allowance")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let spender = required(args, "spender")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.decrease_allowance(&spender, &amount, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep18_mint" => {
            ctx.policy.check_put_generic("cep18_mint")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.mint(&owner, &amount, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep18_burn" => {
            ctx.policy.check_put_generic("cep18_burn")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.burn(&owner, &amount, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep18_change_security" => {
            ctx.policy.check_put_generic("cep18_change_security")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let mut sec = ChangeSecurityArgs::default();
            if let Some(a) = optional(args, "admin_list") {
                sec.admin_list = Some(csv_list(&a));
            }
            if let Some(m) = optional(args, "minter_list") {
                sec.minter_list = Some(csv_list(&m));
            }
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.change_security(&sec, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep18_change_events_mode" => {
            ctx.policy.check_put_generic("cep18_change_events_mode")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let mode = events_mode(&required(args, "events_mode")?)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.change_events_mode(mode, &tx).await.map_err(ceps_err)?,
            ))
        }
        other => Err(format!("unknown cep18 action `{other}`")),
    }
}

fn client(ctx: &CepsCtx<'_>) -> Result<CEP18Client, String> {
    CEP18Client::new(
        ctx.rpc,
        sse_opt(ctx),
        chain_opt(ctx),
        Some(ceps_verbosity(ctx.verbosity)),
    )
    .map_err(ceps_err)
}

fn bound(ctx: &CepsCtx<'_>, args: &HashMap<String, String>) -> Result<CEP18Client, String> {
    let mut c = client(ctx)?;
    let hash = required(args, "contract_hash")?;
    c.set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)?;
    Ok(c)
}

async fn install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep18_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let symbol = optional_or(args, "symbol", "TUI");
    let decimals = parse_u8(&optional_or(args, "decimals", "9"))?;
    let total_supply = optional_or(args, "total_supply", "1000");
    let wasm = load_wasm(args, "cep18")?;
    let client = client(ctx)?;
    let install_args = InstallArgs::new(&name, &symbol, decimals, &total_supply)
        .with_events_mode(EventsMode::CES)
        .with_mint_and_burn(true);
    let tx = transaction_params(pem, &payment(args), ctx);
    let put = client
        .install(&install_args, &wasm, &tx)
        .await
        .map_err(ceps_err)?;
    let mut out = call_result_json(&put);
    if let Ok(pk) = casper_rust_wasm_sdk::helpers::public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .get_account_named_key(&pk, &format!("cep18_contract_hash_{name}"))
            .await
        {
            let package = client
                .get_account_named_key(&pk, &format!("cep18_contract_package_{name}"))
                .await
                .ok();
            let _ = client.set_contract_hash(&contract, package.as_deref());
            out["contract_hash"] = json!(contract);
            if let Some(p) = package {
                out["package_hash"] = json!(p);
            }
        }
        out["installer"] = json!(pk);
    }
    Ok(out)
}

async fn upgrade(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep18_upgrade")?;
    let pem = require_pem(ctx)?;
    let c = bound(ctx, args)?;
    let name = required(args, "name")?;
    let wasm = load_wasm(args, "cep18")?;
    let mut upgrade_args = UpgradeArgs::new(name);
    if let Some(mode) = optional(args, "events_mode") {
        upgrade_args.events_mode = Some(events_mode(&mode)?);
    }
    let tx = transaction_params(pem, &payment(args), ctx);
    Ok(call_result_json(
        &c.upgrade(&upgrade_args, &wasm, &tx)
            .await
            .map_err(ceps_err)?,
    ))
}
