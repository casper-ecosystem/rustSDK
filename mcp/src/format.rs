//! Map SDK / serde results to MCP `CallToolResult`.

use rmcp::model::{CallToolResult, ContentBlock};
use serde::Serialize;

/// Pretty-print JSON for tool responses.
pub fn json_ok(value: &serde_json::Value) -> CallToolResult {
    match serde_json::to_string_pretty(value) {
        Ok(text) => CallToolResult::success(vec![ContentBlock::text(text)]),
        Err(err) => CallToolResult::error(vec![ContentBlock::text(format!(
            "json encode failed: {err}"
        ))]),
    }
}

/// Serialize any `Serialize` value as pretty JSON text.
pub fn serialize_ok<T: Serialize>(value: &T) -> CallToolResult {
    match serde_json::to_value(value) {
        Ok(v) => json_ok(&v),
        Err(e) => err(e),
    }
}

/// Wrap an arbitrary displayable error (tool-level `isError`).
pub fn err(err: impl std::fmt::Display) -> CallToolResult {
    CallToolResult::error(vec![ContentBlock::text(err.to_string())])
}

/// Success path for plain text.
pub fn text_ok(text: impl Into<String>) -> CallToolResult {
    CallToolResult::success(vec![ContentBlock::text(text.into())])
}

/// Map `Result` → `CallToolResult` using `serialize_ok` / `err`.
pub fn from_result<T: Serialize, E: std::fmt::Display>(result: Result<T, E>) -> CallToolResult {
    match result {
        Ok(value) => serialize_ok(&value),
        Err(error) => err(error),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn json_ok_pretty_prints() {
        let value = serde_json::json!({ "ok": true });
        let out = json_ok(&value);
        assert_eq!(out.is_error, Some(false));
    }

    #[test]
    fn err_builds_error_output() {
        let out = err("boom");
        assert_eq!(out.is_error, Some(true));
    }

    #[test]
    fn from_result_ok_and_err() {
        let ok: Result<i32, &str> = Ok(7);
        assert_eq!(from_result(ok).is_error, Some(false));
        let bad: Result<i32, &str> = Err("nope");
        assert_eq!(from_result(bad).is_error, Some(true));
    }
}
