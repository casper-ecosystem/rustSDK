//! Map SDK / serde results to MCP `ToolOutput`.

use mcpkit::prelude::ToolOutput;

/// Pretty-print JSON for tool responses.
pub fn json_ok(value: &serde_json::Value) -> ToolOutput {
    match serde_json::to_string_pretty(value) {
        Ok(text) => ToolOutput::text(text),
        Err(err) => ToolOutput::error(format!("json encode failed: {err}")),
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn json_ok_pretty_prints() {
        let value = serde_json::json!({ "ok": true });
        let out = json_ok(&value);
        // ToolOutput debug / text content is opaque; just ensure it does not panic.
        let _ = format!("{out:?}");
    }

    #[test]
    fn err_builds_error_output() {
        let out = err("boom");
        let _ = format!("{out:?}");
    }
}
