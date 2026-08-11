//! CES parse / collect handlers.

use super::{
    ceps_err, core_client, csv_list, json_display, optional_or, package_opt, parse_u64, required,
    CepsCtx,
};
use serde_json::Value;
use std::collections::HashMap;

pub async fn run_ces(
    method: &str,
    args: &HashMap<String, String>,
    ctx: &CepsCtx<'_>,
) -> Result<Value, String> {
    match method {
        "ces_parse_execution" => {
            let core = core_client(ctx)?;
            let hashes = csv_list(&required(args, "contract_hashes")?);
            let exec: Value = serde_json::from_str(&required(args, "execution_json")?)
                .map_err(|e| format!("execution_json: {e}"))?;
            let rows = core
                .parse_ces_execution(&hashes, &exec)
                .await
                .map_err(ceps_err)?;
            json_display(rows)
        }
        "ces_parse_transaction" => {
            let core = core_client(ctx)?;
            let hashes = csv_list(&required(args, "contract_hashes")?);
            let txh = required(args, "transaction_hash")?;
            let rows = core
                .parse_ces_transaction(&hashes, &txh)
                .await
                .map_err(ceps_err)?;
            json_display(rows)
        }
        "ces_collect" => {
            let mut core = core_client(ctx)?;
            let hash = required(args, "contract_hash")?;
            core.set_contract_hash(&hash, package_opt(args).as_deref())
                .map_err(ceps_err)?;
            let names = csv_list(&required(args, "ces_event_names")?);
            let name_refs: Vec<&str> = names.iter().map(String::as_str).collect();
            let max_tx = parse_u64(&optional_or(args, "max_transactions", "5"))? as usize;
            let timeout = parse_u64(&optional_or(args, "timeout_ms", "30000"))?;
            let events = core
                .collect_ces_events(&name_refs, max_tx, timeout)
                .await
                .map_err(ceps_err)?;
            json_display(events)
        }
        other => Err(format!("unknown ces action `{other}`")),
    }
}
