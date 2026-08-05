//! Wait/watch tools (feature `watcher`).

use mcpkit::prelude::ToolOutput;

use crate::format;
use crate::sdk_handle;

pub fn tool_names() -> &'static [&'static str] {
    &["sdk_wait_transaction"]
}

pub async fn wait_transaction(
    events_url: String,
    transaction_hash: String,
    timeout_ms: Option<u64>,
) -> ToolOutput {
    let sdk = sdk_handle::sdk_snapshot();
    match sdk
        .wait_transaction(&events_url, &transaction_hash, timeout_ms)
        .await
    {
        Ok(result) => format::serialize_ok(&result),
        Err(err) => format::err(err),
    }
}
