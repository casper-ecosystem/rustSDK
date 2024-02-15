use crate::{debug::error, SDK};
use futures_util::StreamExt;
use gloo_events::EventListener;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use js_sys::Promise;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::{
    cell::RefCell,
    fmt,
    rc::Rc,
    sync::{Arc, Mutex},
};
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen_futures::future_to_promise;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "watchDeploy")]
    pub fn watch_deploy(&self, events_url: &str) -> DeployWatcher {
        DeployWatcher::new(events_url.to_string())
    }

    #[cfg(not(target_arch = "wasm32"))]
    pub async fn wait_deploy(
        &self,
        events_url: &str,
        deploy_hash: &str,
    ) -> Result<EventParseResult, String> {
        Self::wait_deploy_internal(events_url.to_string(), deploy_hash.to_string()).await
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "waitDeploy")]
    pub async fn wait_deploy_js_alias(&self, events_url: &str, deploy_hash: &str) -> Promise {
        let events_url = events_url.to_string();
        let deploy_hash = deploy_hash.to_string();
        let future = async move {
            let result = Self::wait_deploy_internal(events_url, deploy_hash).await;
            match result {
                Ok(event_parse_result) => JsValue::from_serde(&event_parse_result)
                    .map_err(|err| JsValue::from_str(&format!("{err}"))),
                Err(err) => Err(JsValue::from_str(&err)),
            }
        };

        future_to_promise(future)
    }

    async fn wait_deploy_internal(
        events_url: String,
        deploy_hash: String,
    ) -> Result<EventParseResult, String> {
        let watcher = DeployWatcher::new(events_url);
        let result = watcher.start_internal(Some(deploy_hash)).await;
        match result {
            Some(event_parse_results) => {
                if let Some(event_parse_result) = event_parse_results.first() {
                    return Ok(event_parse_result.clone());
                }
                Err("No first event result".to_string())
            }
            None => Err("No event result found".to_string()),
        }
    }
}

#[derive(Clone)]
#[wasm_bindgen]
pub struct DeployWatcher {
    events_url: String,
    event_listener: Rc<RefCell<Option<EventListener>>>,
    deploy_subscriptions: Vec<DeploySubscription>,
    active: Rc<RefCell<bool>>,
}

#[wasm_bindgen]
impl DeployWatcher {
    #[wasm_bindgen(constructor)]
    pub fn new(events_url: String) -> Self {
        DeployWatcher {
            events_url,
            event_listener: Rc::new(RefCell::new(None)),
            deploy_subscriptions: Vec::new(),
            active: Rc::new(RefCell::new(true)),
        }
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "subscribe")]
    pub fn subscribe_js_alias(
        &mut self,
        deploy_subscriptions: Vec<DeploySubscription>,
    ) -> Result<(), String> {
        self.subscribe(deploy_subscriptions)
    }

    #[wasm_bindgen]
    pub fn unsubscribe(&mut self, deploy_hash: String) {
        //  log("unsubscribe");
        self.deploy_subscriptions
            .retain(|s| s.deploy_hash != deploy_hash);
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "start")]
    pub async fn start_js_alias(&self) -> Result<JsValue, JsValue> {
        let result: Option<Vec<EventParseResult>> = self.start_internal(None).await;

        match result {
            Some(vec) => JsValue::from_serde(&vec).map_err(|err| {
                error(&err.to_string());
                JsValue::from_str(&format!("{:?}", err)).clone()
            }),
            None => Ok(JsValue::NULL),
        }
    }

    #[wasm_bindgen]
    pub fn stop(&self) {
        // log("stop");
        *self.active.borrow_mut() = false;
        // Stop the event listener if it exists
        if let Some(event_listener) = self.event_listener.borrow_mut().take() {
            event_listener.forget();
        }
    }
}

impl DeployWatcher {
    pub async fn start(&self) -> Option<Vec<EventParseResult>> {
        self.start_internal(None).await
    }

    async fn start_internal(&self, deploy_hash: Option<String>) -> Option<Vec<EventParseResult>> {
        // log("start");
        *self.active.borrow_mut() = true;

        let client = reqwest::Client::new();
        let url = self.events_url.clone();

        let deploy_watcher = Rc::new(RefCell::new(self.clone()));

        let response = match client.get(&url).send().await {
            Ok(res) => res,
            Err(err) => {
                let err = err.to_string();
                error(&err);
                let event_parse_result = EventParseResult {
                    err: Some(err.to_string()),
                    body: None,
                };
                return Some([event_parse_result].to_vec());
            }
        };
        // log("after response"); // Use println for logging in the console

        if response.status().is_success() {
            let buffer_size = 1;
            let mut buffer = Vec::with_capacity(buffer_size);

            let mut bytes_stream = response.bytes_stream();
            while let Some(chunk) = bytes_stream.next().await {
                match chunk {
                    Ok(bytes) => {
                        // Process the chunk of data
                        // log(&format!("Chunk received: {:?}", bytes));

                        let this_clone = Rc::clone(&deploy_watcher);
                        if !*this_clone.borrow_mut().active.borrow() {
                            // Check if the deploy watcher is no longer active
                            return None;
                        }

                        buffer.extend_from_slice(&bytes);

                        // Check if the buffer contains a complete message
                        while let Some(index) = buffer.iter().position(|&b| b == b'\n') {
                            let message = buffer.drain(..=index).collect::<Vec<_>>();
                            // Process the message here
                            if let Ok(message) = std::str::from_utf8(&message) {
                                // log(message);
                                let deploy_watcher_clone = this_clone.borrow_mut().clone();

                                let result = deploy_watcher_clone
                                    .process_events(message, deploy_hash.as_deref());
                                match result {
                                    Some(event_parse_result) => return Some(event_parse_result),
                                    None => {
                                        continue; // Handle of error not needed here, None case is not bubbled
                                    }
                                };
                            } else {
                                let event_parse_result = EventParseResult {
                                    err: Some("Error decoding UTF-8 data".to_string()),
                                    body: None,
                                };
                                return Some([event_parse_result].to_vec());
                            }
                        }
                    }
                    Err(err) => {
                        let event_parse_result = EventParseResult {
                            err: Some(format!("Error reading chunk: {}", err)),
                            body: None,
                        };
                        return Some([event_parse_result].to_vec());
                    }
                }
            }
        } else {
            let event_parse_result = EventParseResult {
                err: Some("Failed to fetch stream".to_string()),
                body: None,
            };
            return Some([event_parse_result].to_vec());
        }
        None
    }

    pub fn subscribe(
        &mut self,
        deploy_subscriptions: Vec<DeploySubscription>,
    ) -> Result<(), String> {
        for new_subscription in &deploy_subscriptions {
            if self
                .deploy_subscriptions
                .iter()
                .any(|s| s.deploy_hash == new_subscription.deploy_hash)
            {
                // Check if the deploy hash is already present
                return Err(String::from("Already subscribed to this event"));
            }
        }
        // If no duplicate deploy hashes found, add the new subscriptions
        self.deploy_subscriptions.extend(deploy_subscriptions);
        Ok(())
    }

    fn process_events(
        mut self,
        message: &str,
        target_deploy_hash: Option<&str>,
    ) -> Option<Vec<EventParseResult>> {
        // log("process_events");

        let data_stream = Self::extract_data_stream(message);

        for data_item in data_stream {
            // log("data item");
            let trimmed_item = data_item.trim();
            let deploy_processed_str = EventName::DeployProcessed.to_string();

            // Check if trimmed_item contains "DeployProcessed"
            if !trimmed_item.contains(&deploy_processed_str) {
                continue; // Skip to the next iteration if "DeployProcessed" is not found
            }
            // log(trimmed_item);

            if let Ok(parsed_json) = serde_json::from_str::<Value>(trimmed_item) {
                // log("Parsed JSON");
                let deploy = parsed_json.get(deploy_processed_str);
                if let Some(deploy_processed) = deploy.and_then(|deploy| deploy.as_object()) {
                    // log("DeployProcessed");
                    if let Some(deploy_hash_processed) = deploy_processed
                        .get("deploy_hash")
                        .and_then(|deploy_hash| deploy_hash.as_str())
                    {
                        // log("deploy_hash");
                        let mut deploy_hash_found = target_deploy_hash
                            .map_or(false, |target_hash| target_hash == deploy_hash_processed);

                        let deploy_processed: Option<DeployProcessed> =
                            serde_json::from_value(deploy.unwrap().clone()).ok();

                        // Create the Body struct with deploy_processed
                        let body = Some(Body { deploy_processed });

                        // Create the EventParseResult with body and no error
                        let event_parse_result = EventParseResult { err: None, body };

                        if deploy_hash_found {
                            // If target_deploy_hash is found, unsubscribe and stop processing
                            self.unsubscribe(target_deploy_hash.unwrap().to_string());
                            self.stop();
                            return Some([event_parse_result].to_vec());
                        }

                        let mut results: Vec<EventParseResult> = [].to_vec();
                        for subscription in self.deploy_subscriptions.clone().iter() {
                            if deploy_hash_processed == subscription.deploy_hash {
                                // log(&subscription.deploy_hash);

                                let event_handler = &subscription.event_handler_fn;

                                #[cfg(not(target_arch = "wasm32"))]
                                {
                                    event_handler.call(event_parse_result.clone());
                                }
                                #[cfg(target_arch = "wasm32")]
                                {
                                    let this = JsValue::null();
                                    let args = js_sys::Array::new();
                                    args.push(
                                        &JsValue::from_serde(&event_parse_result.clone()).unwrap(),
                                    );
                                    event_handler.apply(&this, &args).unwrap();
                                }
                                self.unsubscribe(deploy_hash_processed.to_string());
                                deploy_hash_found = true;
                                results.push(event_parse_result.clone())
                            }
                        }

                        if deploy_hash_found && self.deploy_subscriptions.is_empty() {
                            self.stop();
                            return Some(results);
                        }
                    }
                }
            } else {
                let event_parse_result = EventParseResult {
                    err: Some("Failed to parse JSON data.".to_string()),
                    body: None,
                };
                return Some([event_parse_result].to_vec());
            }
        }
        None
    }

    fn extract_data_stream(json_data: &str) -> Vec<&str> {
        let data_stream: Vec<&str> = json_data
            .split("data:")
            .filter(|s| !s.is_empty())
            .map(|s| s.split("id:").next().unwrap_or(""))
            .collect();
        data_stream
    }
}

pub struct EventHandlerFn(Arc<Mutex<dyn Fn(EventParseResult) + Send + Sync>>);

impl EventHandlerFn {
    pub fn new<F>(func: F) -> Self
    where
        F: Fn(EventParseResult) + Send + Sync + 'static,
    {
        EventHandlerFn(Arc::new(Mutex::new(func)))
    }

    pub fn call(&self, event_result: EventParseResult) {
        let func = self.0.lock().unwrap();
        (*func)(event_result); // Call the stored function with arguments
    }
}

impl fmt::Debug for EventHandlerFn {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "EventHandlerFn")
    }
}

impl Clone for EventHandlerFn {
    fn clone(&self) -> Self {
        EventHandlerFn(self.0.clone())
    }
}

impl Default for EventHandlerFn {
    fn default() -> Self {
        EventHandlerFn(Arc::new(Mutex::new(|_event_result| {})))
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[derive(Debug, Clone, Default)]
pub struct DeploySubscription {
    pub deploy_hash: String,
    pub event_handler_fn: EventHandlerFn,
}
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Clone, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct DeploySubscription {
    #[wasm_bindgen(js_name = "deployHash")]
    pub deploy_hash: String,
    #[wasm_bindgen(js_name = "eventHandlerFn")]
    pub event_handler_fn: js_sys::Function,
}

impl DeploySubscription {
    #[cfg(not(target_arch = "wasm32"))]
    pub fn new(deploy_hash: String, event_handler_fn: EventHandlerFn) -> Self {
        Self {
            deploy_hash,
            event_handler_fn,
        }
    }
}

#[wasm_bindgen]
impl DeploySubscription {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(deploy_hash: String, event_handler_fn: js_sys::Function) -> Self {
        Self {
            deploy_hash,
            event_handler_fn,
        }
    }
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Failure {
    pub error_message: String,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Success {
    pub cost: String,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct ExecutionResult {
    #[serde(rename = "Success")]
    #[wasm_bindgen(js_name = "Success")]
    pub success: Option<Success>,
    #[serde(rename = "Failure")]
    #[wasm_bindgen(js_name = "Failure")]
    pub failure: Option<Failure>,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct DeployProcessed {
    pub deploy_hash: String,
    pub account: String,
    pub timestamp: String,
    pub ttl: String,
    pub dependencies: Vec<String>,
    pub block_hash: String,
    pub execution_result: ExecutionResult,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Body {
    #[serde(rename = "DeployProcessed")]
    #[wasm_bindgen(js_name = "DeployProcessed")]
    pub deploy_processed: Option<DeployProcessed>,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct EventParseResult {
    pub err: Option<String>, // Deprecated, do not use
    pub body: Option<Body>,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub enum EventName {
    BlockAdded,
    DeployProcessed,
    DeployAccepted,
    BlockFinalized,
    FinalitySignature,
    Fault,
}

impl fmt::Display for EventName {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EventName::BlockAdded => write!(f, "BlockAdded"),
            EventName::DeployProcessed => write!(f, "DeployProcessed"),
            EventName::DeployAccepted => write!(f, "DeployAccepted"),
            EventName::BlockFinalized => write!(f, "BlockFinalized"),
            EventName::FinalitySignature => write!(f, "FinalitySignature"),
            EventName::Fault => write!(f, "Fault"),
        }
    }
}
