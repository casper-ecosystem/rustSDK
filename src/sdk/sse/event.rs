//! SSE event names, raw envelope, and typed payload wrappers.

use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fmt;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use wasm_bindgen::prelude::*;

/// Node SSE event type names (JS `EventName` parity).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum EventName {
    ApiVersion,
    BlockAdded,
    DeployProcessed,
    DeployAccepted,
    DeployExpired,
    TransactionProcessed,
    TransactionAccepted,
    TransactionExpired,
    EventId,
    FinalitySignature,
    Step,
    Fault,
    Shutdown,
}

impl EventName {
    /// JSON top-level key / wire name.
    pub fn as_str(self) -> &'static str {
        match self {
            EventName::ApiVersion => "ApiVersion",
            EventName::BlockAdded => "BlockAdded",
            EventName::DeployProcessed => "DeployProcessed",
            EventName::DeployAccepted => "DeployAccepted",
            EventName::DeployExpired => "DeployExpired",
            EventName::TransactionProcessed => "TransactionProcessed",
            EventName::TransactionAccepted => "TransactionAccepted",
            EventName::TransactionExpired => "TransactionExpired",
            EventName::EventId => "EventID",
            EventName::FinalitySignature => "FinalitySignature",
            EventName::Step => "Step",
            EventName::Fault => "Fault",
            EventName::Shutdown => "Shutdown",
        }
    }

    /// Parse from wire / JS string.
    pub fn parse(name: &str) -> Option<Self> {
        match name {
            "ApiVersion" => Some(EventName::ApiVersion),
            "BlockAdded" => Some(EventName::BlockAdded),
            "DeployProcessed" => Some(EventName::DeployProcessed),
            "DeployAccepted" => Some(EventName::DeployAccepted),
            "DeployExpired" => Some(EventName::DeployExpired),
            "TransactionProcessed" => Some(EventName::TransactionProcessed),
            "TransactionAccepted" => Some(EventName::TransactionAccepted),
            "TransactionExpired" => Some(EventName::TransactionExpired),
            "EventID" | "EventId" => Some(EventName::EventId),
            "FinalitySignature" => Some(EventName::FinalitySignature),
            "Step" => Some(EventName::Step),
            "Fault" => Some(EventName::Fault),
            "Shutdown" => Some(EventName::Shutdown),
            _ => None,
        }
    }

    /// All payload / control event names.
    pub fn all() -> &'static [EventName] {
        &[
            EventName::ApiVersion,
            EventName::BlockAdded,
            EventName::DeployProcessed,
            EventName::DeployAccepted,
            EventName::DeployExpired,
            EventName::TransactionProcessed,
            EventName::TransactionAccepted,
            EventName::TransactionExpired,
            EventName::EventId,
            EventName::FinalitySignature,
            EventName::Step,
            EventName::Fault,
            EventName::Shutdown,
        ]
    }
}

impl fmt::Display for EventName {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.as_str())
    }
}

/// Raw SSE envelope before typed parse (JS `RawEvent` parity).
#[derive(Debug, Clone, Serialize, Deserialize)]
#[cfg_attr(
    all(feature = "js", target_arch = "wasm32"),
    wasm_bindgen(getter_with_clone)
)]
pub struct RawEvent {
    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "eventType")
    )]
    pub event_type: String,
    pub data: String,
    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "lastEventId")
    )]
    pub last_event_id: String,
}

impl RawEvent {
    pub fn new(
        event_type: impl Into<String>,
        data: impl Into<String>,
        last_event_id: impl Into<String>,
    ) -> Self {
        Self {
            event_type: event_type.into(),
            data: data.into(),
            last_event_id: last_event_id.into(),
        }
    }

    /// True when JSON top-level object has `event_name` as a key.
    pub fn matches_name(data: &str, event_name: EventName) -> bool {
        match serde_json::from_str::<Value>(data) {
            Ok(Value::Object(map)) => map.contains_key(event_name.as_str()),
            _ => false,
        }
    }

    /// Detect which known event name is present in the JSON (first match).
    pub fn detect_event_name(data: &str) -> Option<EventName> {
        let Value::Object(map) = serde_json::from_str::<Value>(data).ok()? else {
            return None;
        };
        EventName::all()
            .iter()
            .copied()
            .find(|n| map.contains_key(n.as_str()))
    }

    fn parse_payload_value(&self) -> Result<Value, String> {
        serde_json::from_str(&self.data).map_err(|e| format!("invalid event JSON: {e}"))
    }

    fn extract_named(&self, name: EventName) -> Result<Value, String> {
        let root = self.parse_payload_value()?;
        root.get(name.as_str())
            .cloned()
            .ok_or_else(|| format!("missing top-level key {}", name.as_str()))
    }
}

#[cfg_attr(all(feature = "js", target_arch = "wasm32"), wasm_bindgen)]
impl RawEvent {
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    pub fn new_js(event_type: String, data: String, last_event_id: String) -> Self {
        Self::new(event_type, data, last_event_id)
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsApiVersion")
    )]
    pub fn parse_as_api_version(&self) -> Result<ApiVersionEvent, String> {
        let v = self.extract_named(EventName::ApiVersion)?;
        match v {
            Value::String(s) => Ok(ApiVersionEvent { api_version: s }),
            other => Ok(ApiVersionEvent {
                api_version: other.to_string(),
            }),
        }
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsBlockAdded")
    )]
    pub fn parse_as_block_added(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::BlockAdded,
            self.extract_named(EventName::BlockAdded)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsDeployProcessed")
    )]
    pub fn parse_as_deploy_processed(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::DeployProcessed,
            self.extract_named(EventName::DeployProcessed)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsDeployAccepted")
    )]
    pub fn parse_as_deploy_accepted(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::DeployAccepted,
            self.extract_named(EventName::DeployAccepted)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsDeployExpired")
    )]
    pub fn parse_as_deploy_expired(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::DeployExpired,
            self.extract_named(EventName::DeployExpired)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsTransactionProcessed")
    )]
    pub fn parse_as_transaction_processed(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::TransactionProcessed,
            self.extract_named(EventName::TransactionProcessed)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsTransactionAccepted")
    )]
    pub fn parse_as_transaction_accepted(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::TransactionAccepted,
            self.extract_named(EventName::TransactionAccepted)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsTransactionExpired")
    )]
    pub fn parse_as_transaction_expired(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::TransactionExpired,
            self.extract_named(EventName::TransactionExpired)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsFinalitySignature")
    )]
    pub fn parse_as_finality_signature(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(
            EventName::FinalitySignature,
            self.extract_named(EventName::FinalitySignature)?,
        )
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsStep")
    )]
    pub fn parse_as_step(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(EventName::Step, self.extract_named(EventName::Step)?)
    }

    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "parseAsFault")
    )]
    pub fn parse_as_fault(&self) -> Result<SSEPayload, String> {
        SSEPayload::from_named(EventName::Fault, self.extract_named(EventName::Fault)?)
    }

    /// JSON string of the named payload body (wasm-friendly).
    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "payloadJson"))]
    pub fn payload_json_js(&self, event_name: &str) -> Result<String, String> {
        let name =
            EventName::parse(event_name).ok_or_else(|| format!("unknown event: {event_name}"))?;
        let body = self.extract_named(name)?;
        serde_json::to_string(&body).map_err(|e| e.to_string())
    }
}

/// Typed wrapper with event name and JSON payload body.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[cfg_attr(
    all(feature = "js", target_arch = "wasm32"),
    wasm_bindgen(getter_with_clone)
)]
pub struct SSEPayload {
    pub name: String,
    /// JSON string of the named payload body.
    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "bodyJson")
    )]
    pub body_json: String,
}

impl SSEPayload {
    fn from_named(name: EventName, body: Value) -> Result<Self, String> {
        Ok(Self {
            name: name.as_str().to_string(),
            body_json: serde_json::to_string(&body).map_err(|e| e.to_string())?,
        })
    }

    pub fn body(&self) -> Result<Value, String> {
        serde_json::from_str(&self.body_json).map_err(|e| e.to_string())
    }
}

#[cfg(all(feature = "js", target_arch = "wasm32"))]
#[cfg_attr(feature = "js", wasm_bindgen)]
impl SSEPayload {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "body"))]
    pub fn body_js(&self) -> Result<String, String> {
        Ok(self.body_json.clone())
    }
}

/// `ApiVersion` handshake payload.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[cfg_attr(
    all(feature = "js", target_arch = "wasm32"),
    wasm_bindgen(getter_with_clone)
)]
pub struct ApiVersionEvent {
    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "apiVersion")
    )]
    pub api_version: String,
}

/// Whether `data` JSON should be dispatched to a subscription for `event_name`.
pub fn should_handle_event(data: &str, event_name: EventName) -> bool {
    RawEvent::matches_name(data, event_name)
}

/// Build a `RawEvent` from SSE frame data.
pub fn parse_raw_event(data: &str, last_event_id: &str) -> RawEvent {
    let event_type = RawEvent::detect_event_name(data)
        .map(|n| n.as_str().to_string())
        .unwrap_or_else(|| "message".to_string());
    RawEvent::new(event_type, data.to_string(), last_event_id.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn match_and_parse_api_version() {
        let data = r#"{"ApiVersion":"2.0.0"}"#;
        assert!(should_handle_event(data, EventName::ApiVersion));
        let raw = parse_raw_event(data, "1");
        let v = raw.parse_as_api_version().unwrap();
        assert_eq!(v.api_version, "2.0.0");
    }

    #[test]
    fn parse_transaction_processed() {
        let data =
            r#"{"TransactionProcessed":{"transaction_hash":{"Version1":"abc"},"block_hash":"b"}}"#;
        let raw = parse_raw_event(data, "2");
        let p = raw.parse_as_transaction_processed().unwrap();
        assert_eq!(p.name, "TransactionProcessed");
        assert!(p.body().unwrap().get("block_hash").is_some());
    }

    #[test]
    fn parse_all_payload_event_names() {
        let fixtures = [
            (
                EventName::BlockAdded,
                r#"{"BlockAdded":{"block_hash":"a"}}"#,
            ),
            (
                EventName::DeployProcessed,
                r#"{"DeployProcessed":{"deploy_hash":"d"}}"#,
            ),
            (
                EventName::DeployAccepted,
                r#"{"DeployAccepted":{"deploy":{}}}"#,
            ),
            (
                EventName::DeployExpired,
                r#"{"DeployExpired":{"deploy_hash":"d"}}"#,
            ),
            (
                EventName::TransactionAccepted,
                r#"{"TransactionAccepted":{"transaction":{}}}"#,
            ),
            (
                EventName::TransactionExpired,
                r#"{"TransactionExpired":{"transaction_hash":{"Version1":"t"}}}"#,
            ),
            (
                EventName::FinalitySignature,
                r#"{"FinalitySignature":{"block_hash":"b"}}"#,
            ),
            (EventName::Step, r#"{"Step":{"era_id":1}}"#),
            (EventName::Fault, r#"{"Fault":{"era_id":1}}"#),
            (EventName::Shutdown, r#"{"Shutdown":null}"#),
            (EventName::EventId, r#"{"EventID":42}"#),
        ];
        for (name, data) in fixtures {
            assert!(should_handle_event(data, name), "{name}");
            let raw = parse_raw_event(data, "9");
            assert_eq!(raw.event_type, name.as_str());
        }
    }
}
