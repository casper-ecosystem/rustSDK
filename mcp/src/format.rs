//! Map SDK / serde results to MCP `ToolOutput`.

use mcpkit::prelude::ToolOutput;
use serde::Serialize;

/// Pretty-print JSON for tool responses.
pub fn json_ok(value: &serde_json::Value) -> ToolOutput {
    match serde_json::to_string_pretty(value) {
        Ok(text) => ToolOutput::text(text),
        Err(err) => ToolOutput::error(format!("json encode failed: {err}")),
    }
}

/// Serialize any `Serialize` value as pretty JSON text.
pub fn serialize_ok<T: Serialize>(value: &T) -> ToolOutput {
    match serde_json::to_value(value) {
        Ok(v) => json_ok(&v),
        Err(e) => err(e),
    }
}

/// Wrap an arbitrary displayable error.
pub fn err(err: impl std::fmt::Display) -> ToolOutput {
    ToolOutput::error(err.to_string())
}

/// Success path for plain text.
pub fn text_ok(text: impl Into<String>) -> ToolOutput {
    ToolOutput::text(text.into())
}

/// Map `Result` → `ToolOutput` using `serialize_ok` / `err`.
pub fn from_result<T: Serialize, E: std::fmt::Display>(result: Result<T, E>) -> ToolOutput {
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
        let _ = format!("{out:?}");
    }

    #[test]
    fn err_builds_error_output() {
        let out = err("boom");
        let _ = format!("{out:?}");
    }

    #[test]
    fn from_result_ok_and_err() {
        let ok: Result<i32, &str> = Ok(7);
        let _ = from_result(ok);
        let bad: Result<i32, &str> = Err("nope");
        let _ = from_result(bad);
    }
}
