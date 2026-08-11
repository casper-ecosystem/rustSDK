//! CEP-85 action handlers.

use super::{
    call_result_json, ceps_err, ceps_verbosity, chain_opt, csv_list, endpoints_json, events_mode,
    load_wasm, optional, optional_or, package_opt, parse_bool, payment, require_pem, required,
    sse_opt, transaction_params, CepsCtx,
};
use ceps_client::cep85::{ChangeSecurityArgs, InstallArgs, UpgradeArgs};
use ceps_client::{CEP85Client, EventsMode};
use serde_json::{json, Value};
use std::collections::HashMap;

pub async fn run_cep85(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "cep85_info" => {
            let c = client(ctx)?;
            Ok(endpoints_json(
                "cep85",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep85_get_account_named_key" => {
            let c = client(ctx)?;
            let account = required(args, "account")?;
            let named_key = required(args, "named_key")?;
            Ok(json!({
                "value": c.get_account_named_key(&account, &named_key).await.map_err(ceps_err)?,
            }))
        }
        "cep85_collection_name" => ok_dbg(bound(ctx, args)?.collection_name().await),
        "cep85_collection_uri" => ok_dbg(bound(ctx, args)?.collection_uri().await),
        "cep85_balance_of" => {
            let account = required(args, "account")?;
            let id = required(args, "id")?;
            ok_dbg(bound(ctx, args)?.balance_of(&account, &id).await)
        }
        "cep85_balance_of_batch" => {
            let accounts = csv_list(&required(args, "accounts")?);
            let ids = csv_list(&required(args, "ids")?);
            let a: Vec<&str> = accounts.iter().map(String::as_str).collect();
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            ok_dbg(bound(ctx, args)?.balance_of_batch(&a, &i).await)
        }
        "cep85_is_approved_for_all" => {
            let account = required(args, "account")?;
            let operator = required(args, "operator")?;
            ok_dbg(
                bound(ctx, args)?
                    .is_approved_for_all(&account, &operator)
                    .await,
            )
        }
        "cep85_supply_of" => ok_dbg(bound(ctx, args)?.supply_of(&required(args, "id")?).await),
        "cep85_supply_of_batch" => {
            let ids = csv_list(&required(args, "ids")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            ok_dbg(bound(ctx, args)?.supply_of_batch(&i).await)
        }
        "cep85_total_supply_of" => ok_dbg(
            bound(ctx, args)?
                .total_supply_of(&required(args, "id")?)
                .await,
        ),
        "cep85_total_supply_of_batch" => {
            let ids = csv_list(&required(args, "ids")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            ok_dbg(bound(ctx, args)?.total_supply_of_batch(&i).await)
        }
        "cep85_total_fungible_supply" => ok_dbg(
            bound(ctx, args)?
                .total_fungible_supply(&required(args, "id")?)
                .await,
        ),
        "cep85_uri" => ok_dbg(bound(ctx, args)?.uri(optional(args, "id").as_deref()).await),
        "cep85_is_non_fungible" => ok_dbg(
            bound(ctx, args)?
                .is_non_fungible(&required(args, "id")?)
                .await,
        ),
        "cep85_enable_burn" => ok_dbg(bound(ctx, args)?.enable_burn().await),
        "cep85_events_mode" => ok_dbg(bound(ctx, args)?.events_mode().await),
        "cep85_number_of_minted_tokens" => {
            ok_dbg(bound(ctx, args)?.number_of_minted_tokens().await)
        }
        "cep85_transfer_filter_contract" => {
            ok_dbg(bound(ctx, args)?.transfer_filter_contract().await)
        }
        "cep85_transfer_filter_method" => ok_dbg(bound(ctx, args)?.transfer_filter_method().await),
        "cep85_security_badge" => {
            let badge = bound(ctx, args)?
                .security_badge(&required(args, "account")?)
                .await
                .map_err(ceps_err)?;
            Ok(json!({ "value": badge.map(|b| format!("{b:?}")) }))
        }
        "cep85_install" => install(args, ctx).await,
        "cep85_upgrade" => {
            ctx.policy.check_put_generic("cep85_upgrade")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let name = required(args, "name")?;
            let wasm = load_wasm(args, "cep85")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            let upgrade = UpgradeArgs::new(name);
            Ok(call_result_json(
                &c.upgrade(&upgrade, &wasm, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep85_mint" => {
            ctx.policy.check_put_generic("cep85_mint")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let recipient = required(args, "recipient")?;
            let id = required(args, "id")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.mint(&recipient, &id, &amount, None, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_batch_mint" => {
            ctx.policy.check_put_generic("cep85_batch_mint")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let recipient = required(args, "recipient")?;
            let ids = csv_list(&required(args, "ids")?);
            let amounts = csv_list(&required(args, "amounts")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            let a: Vec<&str> = amounts.iter().map(String::as_str).collect();
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.batch_mint(&recipient, &i, &a, None, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_burn" => {
            ctx.policy.check_put_generic("cep85_burn")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let id = required(args, "id")?;
            let amount = required(args, "amount")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.burn(&owner, &id, &amount, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep85_batch_burn" => {
            ctx.policy.check_put_generic("cep85_batch_burn")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "owner")?;
            let ids = csv_list(&required(args, "ids")?);
            let amounts = csv_list(&required(args, "amounts")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            let a: Vec<&str> = amounts.iter().map(String::as_str).collect();
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.batch_burn(&owner, &i, &a, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep85_transfer" => {
            ctx.policy.check_put_generic("cep85_transfer")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let from = required(args, "from")?;
            let to = optional(args, "to")
                .or_else(|| optional(args, "recipient"))
                .ok_or_else(|| "missing required arg `to` (or `recipient`)".to_string())?;
            let id = required(args, "id")?;
            let amount = required(args, "amount")?;
            let data = optional_bytes(args, "data")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer(&from, &to, &id, &amount, data.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_batch_transfer" => {
            ctx.policy.check_put_generic("cep85_batch_transfer")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let from = required(args, "from")?;
            let to = optional(args, "to")
                .or_else(|| optional(args, "recipient"))
                .ok_or_else(|| "missing required arg `to` (or `recipient`)".to_string())?;
            let ids = csv_list(&required(args, "ids")?);
            let amounts = csv_list(&required(args, "amounts")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            let a: Vec<&str> = amounts.iter().map(String::as_str).collect();
            let data = optional_bytes(args, "data")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.batch_transfer(&from, &to, &i, &a, data.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_set_approval_for_all" => {
            ctx.policy.check_put_generic("cep85_set_approval_for_all")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let operator = required(args, "operator")?;
            let approved = parse_bool(&required(args, "approved")?)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_approval_for_all(&operator, approved, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_set_uri" => {
            ctx.policy.check_put_generic("cep85_set_uri")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let uri = required(args, "uri")?;
            let id = optional(args, "id");
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_uri(&uri, id.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_set_total_supply_of" => {
            ctx.policy.check_put_generic("cep85_set_total_supply_of")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let id = required(args, "id")?;
            let total = required(args, "total_supply")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_total_supply_of(&id, &total, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_set_total_supply_of_batch" => {
            ctx.policy
                .check_put_generic("cep85_set_total_supply_of_batch")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let ids = csv_list(&required(args, "ids")?);
            let totals = csv_list(&required(args, "total_supplies")?);
            let i: Vec<&str> = ids.iter().map(String::as_str).collect();
            let t: Vec<&str> = totals.iter().map(String::as_str).collect();
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_total_supply_of_batch(&i, &t, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep85_change_security" => {
            ctx.policy.check_put_generic("cep85_change_security")?;
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
        "cep85_set_modalities" => {
            ctx.policy.check_put_generic("cep85_set_modalities")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let enable = optional(args, "enable_burn")
                .map(|s| parse_bool(&s))
                .transpose()?;
            let mode = optional(args, "events_mode")
                .map(|s| events_mode(&s))
                .transpose()?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_modalities(enable, mode, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        other => Err(format!("unknown cep85 action `{other}`")),
    }
}

fn ok_dbg<T: std::fmt::Debug>(r: Result<T, impl std::fmt::Display>) -> Result<Value, String> {
    Ok(json!({ "value": format!("{:?}", r.map_err(ceps_err)?) }))
}

fn optional_bytes(args: &HashMap<String, String>, name: &str) -> Result<Option<Vec<u8>>, String> {
    let Some(raw) = optional(args, name) else {
        return Ok(None);
    };
    Ok(Some(raw.into_bytes()))
}

fn client(ctx: &CepsCtx<'_>) -> Result<CEP85Client, String> {
    CEP85Client::new(
        ctx.rpc,
        sse_opt(ctx),
        chain_opt(ctx),
        Some(ceps_verbosity(ctx.verbosity)),
    )
    .map_err(ceps_err)
}

fn bound(ctx: &CepsCtx<'_>, args: &HashMap<String, String>) -> Result<CEP85Client, String> {
    let mut c = client(ctx)?;
    let hash = required(args, "contract_hash")?;
    c.set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)?;
    Ok(c)
}

async fn install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep85_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "name")?;
    let uri = optional_or(args, "uri", "https://example.com/metadata/{id}.json");
    let wasm = load_wasm(args, "cep85")?;
    let client = client(ctx)?;
    let install_args = InstallArgs::new(&name, &uri)
        .with_events_mode(EventsMode::CES)
        .with_enable_burn(true);
    let tx = transaction_params(pem, &payment(args), ctx);
    let put = client
        .install(&install_args, &wasm, &tx)
        .await
        .map_err(ceps_err)?;
    let mut out = call_result_json(&put);
    if let Ok(pk) = casper_rust_wasm_sdk::helpers::public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .get_account_named_key(&pk, &format!("cep85_contract_hash_{name}"))
            .await
        {
            let package = client
                .get_account_named_key(&pk, &format!("cep85_contract_package_{name}"))
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
