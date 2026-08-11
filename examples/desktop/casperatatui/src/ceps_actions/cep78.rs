//! CEP-78 action handlers.

use super::{
    call_result_json, ceps_err, ceps_verbosity, chain_opt, endpoints_json, load_wasm, optional,
    optional_or, package_opt, parse_bool, parse_u64, payment, require_pem, required, sse_opt,
    transaction_params, CepsCtx,
};
use ceps_client::cep78::{
    InstallArgs, NftMetadataKind, SetVariablesArgs, TokenIdentifier, UpgradeArgs,
};
use ceps_client::{CEP78Client, EventsMode78};
use serde_json::{json, Value};
use std::collections::HashMap;

pub async fn run_cep78(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "cep78_info" => {
            let c = client(ctx)?;
            Ok(endpoints_json(
                "cep78",
                c.rpc_url(),
                c.sse_url(),
                c.chain_name(),
            ))
        }
        "cep78_get_account_named_key" => {
            let c = client(ctx)?;
            let account = required(args, "account")?;
            let named_key = required(args, "named_key")?;
            Ok(json!({
                "value": c.get_account_named_key(&account, &named_key).await.map_err(ceps_err)?,
            }))
        }
        "cep78_collection_name" => ok_str(bound(ctx, args)?.collection_name().await),
        "cep78_collection_symbol" => ok_str(bound(ctx, args)?.collection_symbol().await),
        "cep78_total_token_supply" => ok_dbg(bound(ctx, args)?.total_token_supply().await),
        "cep78_number_of_minted_tokens" => {
            ok_dbg(bound(ctx, args)?.number_of_minted_tokens().await)
        }
        "cep78_events_mode" => ok_dbg(bound(ctx, args)?.events_mode().await),
        "cep78_allow_minting" => ok_dbg(bound(ctx, args)?.allow_minting().await),
        "cep78_minting_mode" => ok_dbg(bound(ctx, args)?.minting_mode().await),
        "cep78_whitelist_mode" => ok_dbg(bound(ctx, args)?.whitelist_mode().await),
        "cep78_reporting_mode" => ok_dbg(bound(ctx, args)?.reporting_mode().await),
        "cep78_burn_mode" => ok_dbg(bound(ctx, args)?.burn_mode().await),
        "cep78_operator_burn_mode" => ok_dbg(bound(ctx, args)?.operator_burn_mode().await),
        "cep78_holder_mode" => ok_dbg(bound(ctx, args)?.holder_mode().await),
        "cep78_identifier_mode" => ok_dbg(bound(ctx, args)?.identifier_mode().await),
        "cep78_metadata_mutability" => ok_dbg(bound(ctx, args)?.metadata_mutability().await),
        "cep78_nft_kind" => ok_dbg(bound(ctx, args)?.nft_kind().await),
        "cep78_nft_metadata_kind" => ok_dbg(bound(ctx, args)?.nft_metadata_kind().await),
        "cep78_ownership_mode" => ok_dbg(bound(ctx, args)?.ownership_mode().await),
        "cep78_package_operator_mode" => ok_dbg(bound(ctx, args)?.package_operator_mode().await),
        "cep78_acl_package_mode" => ok_dbg(bound(ctx, args)?.acl_package_mode().await),
        "cep78_json_schema" => ok_str(bound(ctx, args)?.json_schema().await),
        "cep78_is_acl_whitelisted" => {
            let account = required(args, "account")?;
            ok_dbg(bound(ctx, args)?.is_acl_whitelisted(&account).await)
        }
        "cep78_owner_of" => {
            let id = token_id(args)?;
            ok_str(bound(ctx, args)?.owner_of(&id).await)
        }
        "cep78_balance_of" => {
            let account = required(args, "account")?;
            ok_str(bound(ctx, args)?.balance_of(&account).await)
        }
        "cep78_get_approved" => {
            let id = token_id(args)?;
            ok_dbg(bound(ctx, args)?.get_approved(&id).await)
        }
        "cep78_is_approved_for_all" => {
            let owner = required(args, "owner")?;
            let operator = required(args, "operator")?;
            ok_dbg(
                bound(ctx, args)?
                    .is_approved_for_all(&owner, &operator)
                    .await,
            )
        }
        "cep78_metadata" => {
            let c = bound(ctx, args)?;
            let id = token_id(args)?;
            let kind = if let Some(s) = optional(args, "nft_metadata_kind") {
                nft_metadata_kind(&s)?
            } else {
                c.nft_metadata_kind().await.map_err(ceps_err)?
            };
            ok_str(c.metadata(&id, kind).await)
        }
        "cep78_install" => install(args, ctx).await,
        "cep78_upgrade" => {
            ctx.policy.check_put_generic("cep78_upgrade")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let name = optional_or(args, "collection_name", "upgrade");
            let wasm = load_wasm(args, "cep78")?;
            let ua = UpgradeArgs::new(name);
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.upgrade(&ua, &wasm, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_mint" => {
            ctx.policy.check_put_generic("cep78_mint")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "token_owner")?;
            let meta = optional_or(args, "token_meta_data", "{}");
            let th = optional(args, "token_hash");
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.mint(&owner, &meta, th.as_deref(), &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_mint_session" => {
            ctx.policy.check_put_generic("cep78_mint_session")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "token_owner")?;
            let meta = optional_or(args, "token_meta_data", "{}");
            let th = optional(args, "token_hash");
            let wasm = load_wasm(args, "cep78/mint_session")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.mint_session(&owner, &meta, th.as_deref(), &wasm, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_burn" => {
            ctx.policy.check_put_generic("cep78_burn")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let id = token_id(args)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(&c.burn(&id, &tx).await.map_err(ceps_err)?))
        }
        "cep78_transfer" => {
            ctx.policy.check_put_generic("cep78_transfer")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let src = required(args, "source_key")?;
            let tgt = required(args, "target_key")?;
            let id = token_id(args)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer(&src, &tgt, &id, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_transfer_session" => {
            ctx.policy.check_put_generic("cep78_transfer_session")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let src = required(args, "source_key")?;
            let tgt = required(args, "target_key")?;
            let id = token_id(args)?;
            let wasm = load_wasm(args, "cep78/transfer_session")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.transfer_session(&src, &tgt, &id, &wasm, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_register_owner" => {
            ctx.policy.check_put_generic("cep78_register_owner")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "token_owner")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.register_owner(&owner, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_approve" => {
            ctx.policy.check_put_generic("cep78_approve")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let op = required(args, "operator")?;
            let id = token_id(args)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.approve(&op, &id, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_revoke" => {
            ctx.policy.check_put_generic("cep78_revoke")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let op = required(args, "operator")?;
            let id = token_id(args)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.revoke(&op, &id, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_set_approval_for_all" => {
            ctx.policy.check_put_generic("cep78_set_approval_for_all")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let op = required(args, "operator")?;
            let approve_all = parse_bool(&required(args, "approve_all")?)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_approval_for_all(&op, approve_all, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_set_token_metadata" => {
            ctx.policy.check_put_generic("cep78_set_token_metadata")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let meta = required(args, "token_meta_data")?;
            let id = token_id(args)?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_token_metadata(&meta, &id, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_set_variables" => {
            ctx.policy.check_put_generic("cep78_set_variables")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let mut vars = SetVariablesArgs::default();
            if let Some(s) = optional(args, "allow_minting") {
                vars.allow_minting = Some(parse_bool(&s)?);
            }
            if let Some(s) = optional(args, "acl_whitelist") {
                vars.acl_whitelist = Some(super::csv_list(&s));
            }
            if let Some(s) = optional(args, "acl_package_mode") {
                vars.acl_package_mode = Some(parse_bool(&s)?);
            }
            if let Some(s) = optional(args, "package_operator_mode") {
                vars.package_operator_mode = Some(parse_bool(&s)?);
            }
            if let Some(s) = optional(args, "operator_burn_mode") {
                vars.operator_burn_mode = Some(parse_bool(&s)?);
            }
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.set_variables(&vars, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_updated_receipts" => {
            ctx.policy.check_put_generic("cep78_updated_receipts")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let wasm = load_wasm(args, "cep78/updated_receipts")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.updated_receipts(&wasm, &tx).await.map_err(ceps_err)?,
            ))
        }
        "cep78_owner_of_session" => {
            session_query(args, ctx, "owner_of_session", "cep78/owner_of_session").await
        }
        "cep78_balance_of_session" => {
            ctx.policy.check_put_generic("cep78_balance_of_session")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "token_owner")?;
            let key_name = optional_or(args, "key_name", "balance_of");
            let wasm = load_wasm(args, "cep78/balance_of_session")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.balance_of_session(&owner, &key_name, &wasm, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        "cep78_get_approved_session" => {
            session_query(
                args,
                ctx,
                "get_approved_session",
                "cep78/get_approved_session",
            )
            .await
        }
        "cep78_is_approved_for_all_session" => {
            ctx.policy
                .check_put_generic("cep78_is_approved_for_all_session")?;
            let pem = require_pem(ctx)?;
            let c = bound(ctx, args)?;
            let owner = required(args, "token_owner")?;
            let op = required(args, "operator")?;
            let key_name = optional_or(args, "key_name", "is_approved_for_all");
            let wasm = load_wasm(args, "cep78/is_approved_for_all_session")?;
            let tx = transaction_params(pem, &payment(args), ctx);
            Ok(call_result_json(
                &c.is_approved_for_all_session(&owner, &op, &key_name, &wasm, &tx)
                    .await
                    .map_err(ceps_err)?,
            ))
        }
        other => Err(format!("unknown cep78 action `{other}`")),
    }
}

async fn session_query(
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
    policy: &str,
    wasm_alias: &str,
) -> Result<Value, String> {
    ctx.policy.check_put_generic(policy)?;
    let pem = require_pem(ctx)?;
    let c = bound(ctx, args)?;
    let id = token_id(args)?;
    let key_name = optional_or(
        args,
        "key_name",
        if policy == "owner_of_session" {
            "owner_of"
        } else {
            "get_approved"
        },
    );
    let wasm = load_wasm(args, wasm_alias)?;
    let tx = transaction_params(pem, &payment(args), ctx);
    let put = match policy {
        "owner_of_session" => c.owner_of_session(&id, &key_name, &wasm, &tx).await,
        "get_approved_session" => c.get_approved_session(&id, &key_name, &wasm, &tx).await,
        _ => return Err(format!("bad session policy `{policy}`")),
    }
    .map_err(ceps_err)?;
    Ok(call_result_json(&put))
}

fn ok_str(r: Result<String, impl std::fmt::Display>) -> Result<Value, String> {
    Ok(json!({ "value": r.map_err(ceps_err)? }))
}

fn ok_dbg<T: std::fmt::Debug>(r: Result<T, impl std::fmt::Display>) -> Result<Value, String> {
    Ok(json!({ "value": format!("{:?}", r.map_err(ceps_err)?) }))
}

fn nft_metadata_kind(s: &str) -> Result<NftMetadataKind, String> {
    let t = s.trim().to_ascii_lowercase();
    if let Ok(n) = t.parse::<u8>() {
        return NftMetadataKind::from_u8(n)
            .ok_or_else(|| format!("unknown nft_metadata_kind u8 `{n}`"));
    }
    match t.as_str() {
        "cep78" => Ok(NftMetadataKind::CEP78),
        "nft721" | "721" => Ok(NftMetadataKind::Nft721),
        "raw" => Ok(NftMetadataKind::Raw),
        "custom" | "custom_validated" => Ok(NftMetadataKind::CustomValidated),
        other => Err(format!("unknown nft_metadata_kind `{other}`")),
    }
}

fn client(ctx: &CepsCtx<'_>) -> Result<CEP78Client, String> {
    CEP78Client::new(
        ctx.rpc,
        sse_opt(ctx),
        chain_opt(ctx),
        Some(ceps_verbosity(ctx.verbosity)),
    )
    .map_err(ceps_err)
}

fn bound(ctx: &CepsCtx<'_>, args: &HashMap<String, String>) -> Result<CEP78Client, String> {
    let mut c = client(ctx)?;
    let hash = required(args, "contract_hash")?;
    c.set_contract_hash(&hash, package_opt(args).as_deref())
        .map_err(ceps_err)?;
    Ok(c)
}

fn token_id(args: &HashMap<String, String>) -> Result<TokenIdentifier, String> {
    if let Some(h) = optional(args, "token_hash") {
        return Ok(TokenIdentifier::hash(h));
    }
    if let Some(id) = optional(args, "token_id") {
        return Ok(TokenIdentifier::id(parse_u64(&id)?));
    }
    Err("provide token_id or token_hash".into())
}

async fn install(args: &HashMap<String, String>, ctx: &CepsCtx<'_>) -> Result<Value, String> {
    ctx.policy.check_put_generic("cep78_install")?;
    let pem = require_pem(ctx)?;
    let name = required(args, "collection_name")?;
    let symbol = optional_or(args, "collection_symbol", "T78");
    let supply = parse_u64(&optional_or(args, "total_token_supply", "50"))?;
    let wasm = load_wasm(args, "cep78")?;
    let client = client(ctx)?;
    let install_args = InstallArgs::new(&name, &symbol, supply).with_events_mode(EventsMode78::CES);
    let tx = transaction_params(pem, &payment(args), ctx);
    let put = client
        .install(&install_args, &wasm, &tx)
        .await
        .map_err(ceps_err)?;
    let mut out = call_result_json(&put);
    if let Ok(pk) = casper_rust_wasm_sdk::helpers::public_key_from_secret_key(pem) {
        let mut client = client;
        if let Ok(contract) = client
            .get_account_named_key(&pk, &format!("cep78_contract_hash_{name}"))
            .await
        {
            let package = client
                .get_account_named_key(&pk, &format!("cep78_contract_package_{name}"))
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
