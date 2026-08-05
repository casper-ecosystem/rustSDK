//! Full node SSE client (`SSEClient`) — JS SDK parity.

use super::event::{parse_raw_event, should_handle_event, EventName, RawEvent};
use super::framing::{extract_frames, url_with_start_from};
use crate::SDK;
use futures_util::StreamExt;
use std::sync::{Arc, Mutex};
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;

/// Native event handler.
#[cfg(not(target_arch = "wasm32"))]
pub type SSEHandlerFn = Arc<Mutex<dyn Fn(RawEvent) + Send + Sync>>;

#[cfg(not(target_arch = "wasm32"))]
fn call_handler(handler: &SSEHandlerFn, event: RawEvent) {
    let f = handler.lock().unwrap();
    f(event);
}

#[cfg(target_arch = "wasm32")]
fn call_handler(handler: &js_sys::Function, event: RawEvent) {
    let this = JsValue::null();
    let args = js_sys::Array::new();
    args.push(&JsValue::from_serde(&event).unwrap_or(JsValue::NULL));
    let _ = handler.apply(&this, &args);
}

struct Subscription {
    event_name: EventName,
    #[cfg(not(target_arch = "wasm32"))]
    handler: SSEHandlerFn,
    #[cfg(target_arch = "wasm32")]
    handler: js_sys::Function,
}

/// Node SSE client: subscribe by [`EventName`], start/stop stream.
#[derive(Clone)]
#[wasm_bindgen]
pub struct SSEClient {
    events_url: String,
    subscriptions: Arc<Mutex<Vec<Subscription>>>,
    active: Arc<Mutex<bool>>,
}

impl SDK {
    /// Build an [`SSEClient`] for `events_url` (e.g. `http://node:9999/events`).
    #[allow(non_snake_case)]
    pub fn SSE_client(&self, events_url: &str) -> SSEClient {
        SSEClient::new(events_url.to_string())
    }

    /// Fetch CES schemas for `contract_hashes` and return a ready [`super::CESParser`].
    #[allow(non_snake_case)]
    pub async fn CES_parser(
        &self,
        contract_hashes: &[String],
        state_root_hash: Option<&str>,
        rpc_address: Option<String>,
    ) -> Result<crate::sdk::SSE::CESParser, String> {
        crate::sdk::SSE::CESParser::create(self, contract_hashes, state_root_hash, rpc_address)
            .await
    }
}

#[wasm_bindgen]
impl SDK {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "SSE_client")]
    #[allow(non_snake_case)]
    pub fn SSE_client_js(&self, events_url: &str) -> SSEClient {
        self.SSE_client(events_url)
    }
}

#[wasm_bindgen]
impl SSEClient {
    #[wasm_bindgen(constructor)]
    pub fn new(events_url: String) -> Self {
        Self {
            events_url,
            subscriptions: Arc::new(Mutex::new(Vec::new())),
            active: Arc::new(Mutex::new(false)),
        }
    }

    /// Stop the running stream loop.
    #[wasm_bindgen]
    pub fn stop(&self) {
        if let Ok(mut active) = self.active.lock() {
            *active = false;
        }
    }

    /// Unsubscribe by event name string (wasm).
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "unsubscribe")]
    pub fn unsubscribe_js(&self, event_name: &str) -> Result<(), String> {
        let name =
            EventName::parse(event_name).ok_or_else(|| format!("unknown event: {event_name}"))?;
        self.unsubscribe(name)
    }

    /// Subscribe with a JS function handler (wasm).
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "subscribe")]
    pub fn subscribe_js(&self, event_name: &str, handler: js_sys::Function) -> Result<(), String> {
        let name =
            EventName::parse(event_name).ok_or_else(|| format!("unknown event: {event_name}"))?;
        let mut subs = self.subscriptions.lock().map_err(|e| e.to_string())?;
        if subs.iter().any(|s| s.event_name == name) {
            return Err("Already subscribed to this event".to_string());
        }
        subs.push(Subscription {
            event_name: name,
            handler,
        });
        Ok(())
    }

    /// Start streaming (wasm). Resolves when stopped, errored, or stream ends.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "start")]
    pub async fn start_js(&self, start_from: Option<u64>) -> Result<(), JsError> {
        self.start(start_from).await.map_err(|e| JsError::new(&e))
    }
}

impl SSEClient {
    /// Subscribe to one event name (native).
    #[cfg(not(target_arch = "wasm32"))]
    pub fn subscribe<F>(&self, event_name: EventName, handler: F) -> Result<(), String>
    where
        F: Fn(RawEvent) + Send + Sync + 'static,
    {
        let mut subs = self.subscriptions.lock().map_err(|e| e.to_string())?;
        if subs.iter().any(|s| s.event_name == event_name) {
            return Err("Already subscribed to this event".to_string());
        }
        subs.push(Subscription {
            event_name,
            handler: Arc::new(Mutex::new(handler)),
        });
        Ok(())
    }

    /// Remove subscription for `event_name`.
    pub fn unsubscribe(&self, event_name: EventName) -> Result<(), String> {
        let mut subs = self.subscriptions.lock().map_err(|e| e.to_string())?;
        let before = subs.len();
        subs.retain(|s| s.event_name != event_name);
        if subs.len() == before {
            return Err("Cannot find provided subscription".to_string());
        }
        Ok(())
    }

    /// Run the SSE loop until [`Self::stop`], connection end, or error.
    pub async fn start(&self, start_from: Option<u64>) -> Result<(), String> {
        {
            let mut active = self.active.lock().map_err(|e| e.to_string())?;
            *active = true;
        }

        let url = url_with_start_from(&self.events_url, start_from);
        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .send()
            .await
            .map_err(|e| format!("SSE connect failed: {e}"))?;

        if !response.status().is_success() {
            return Err(format!("SSE HTTP {}", response.status()));
        }

        let mut buffer: Vec<u8> = Vec::new();
        let mut last_event_id = String::new();
        let mut bytes_stream = response.bytes_stream();

        while let Some(chunk) = bytes_stream.next().await {
            if !*self.active.lock().map_err(|e| e.to_string())? {
                break;
            }
            let bytes = chunk.map_err(|e| format!("SSE read error: {e}"))?;
            buffer.extend_from_slice(&bytes);

            while let Some(index) = buffer.iter().position(|&b| b == b'\n') {
                let line_bytes: Vec<u8> = buffer.drain(..=index).collect();
                let message = std::str::from_utf8(&line_bytes)
                    .map_err(|_| "SSE UTF-8 decode error".to_string())?;

                for frame in extract_frames(message) {
                    if let Some(id) = &frame.id {
                        last_event_id = id.clone();
                    }
                    self.dispatch_frame(&frame.data, &last_event_id)?;
                }

                // Also handle multi-line buffered event blocks that arrive as complete chunks
                // without relying solely on per-line splits: if the line itself was a full
                // `data:…` payload, extract_frames already handled it.
            }

            // Flush complete frames that may sit without trailing newline yet when buffer
            // contains `data:` payloads (some proxies). Prefer newline-delimited; if buffer
            // grows large with complete id-terminated frames, try extract.
            if buffer.len() > 16 {
                if let Ok(s) = std::str::from_utf8(&buffer) {
                    if s.contains("id:") && s.contains("data:") {
                        let frames = extract_frames(s);
                        if !frames.is_empty() {
                            buffer.clear();
                            for frame in frames {
                                if let Some(id) = &frame.id {
                                    last_event_id = id.clone();
                                }
                                self.dispatch_frame(&frame.data, &last_event_id)?;
                            }
                        }
                    }
                }
            }
        }

        Ok(())
    }

    fn dispatch_frame(&self, data: &str, last_event_id: &str) -> Result<(), String> {
        let trimmed = data.trim();
        if trimmed.is_empty() {
            return Ok(());
        }
        let raw = parse_raw_event(trimmed, last_event_id);
        let subs = self.subscriptions.lock().map_err(|e| e.to_string())?;
        for sub in subs.iter() {
            if should_handle_event(trimmed, sub.event_name) {
                call_handler(&sub.handler, raw.clone());
            }
        }
        Ok(())
    }

    /// Collect up to `max_events` matching any of `event_names` within `timeout_ms`.
    ///
    /// MCP / native helper: bounded stream read (does not require prior subscribe).
    pub async fn collect(
        &self,
        event_names: &[EventName],
        max_events: usize,
        timeout_ms: u64,
        start_from: Option<u64>,
    ) -> Result<Vec<RawEvent>, String> {
        use chrono::{Duration, Utc};

        let url = url_with_start_from(&self.events_url, start_from);
        let client = reqwest::Client::new();
        let response = client
            .get(&url)
            .send()
            .await
            .map_err(|e| format!("SSE connect failed: {e}"))?;
        if !response.status().is_success() {
            return Err(format!("SSE HTTP {}", response.status()));
        }

        let start_time = Utc::now();
        let timeout = Duration::try_milliseconds(timeout_ms as i64).unwrap_or_default();
        let mut buffer: Vec<u8> = Vec::new();
        let mut last_event_id = String::new();
        let mut out = Vec::new();
        let mut bytes_stream = response.bytes_stream();

        while let Some(chunk) = bytes_stream.next().await {
            if Utc::now() - start_time >= timeout {
                break;
            }
            if out.len() >= max_events {
                break;
            }
            let bytes = chunk.map_err(|e| format!("SSE read error: {e}"))?;
            buffer.extend_from_slice(&bytes);
            while let Some(index) = buffer.iter().position(|&b| b == b'\n') {
                let line_bytes: Vec<u8> = buffer.drain(..=index).collect();
                let Ok(message) = std::str::from_utf8(&line_bytes) else {
                    continue;
                };
                for frame in extract_frames(message) {
                    if let Some(id) = &frame.id {
                        last_event_id = id.clone();
                    }
                    let trimmed = frame.data.trim();
                    if event_names.iter().any(|n| should_handle_event(trimmed, *n)) {
                        out.push(parse_raw_event(trimmed, &last_event_id));
                        if out.len() >= max_events {
                            return Ok(out);
                        }
                    }
                }
            }
        }
        Ok(out)
    }
}
