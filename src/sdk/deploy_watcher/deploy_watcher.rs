use crate::SDK;
use chrono::{Duration, Utc};
use futures_util::StreamExt;
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

const DEFAULT_TIMEOUT_MS: u64 = 60000;

#[wasm_bindgen]
impl SDK {
    /// Creates a new DeployWatcher instance to watch deploys.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for deploy events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `DeployWatcher` instance.
    pub fn watch_deploy(&self, events_url: &str, timeout_duration: Option<u64>) -> DeployWatcher {
        DeployWatcher::new(events_url.to_string(), timeout_duration)
    }

    /// Creates a new DeployWatcher instance to watch deploys (JavaScript-friendly).
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for deploy events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `DeployWatcher` instance.
    #[wasm_bindgen(js_name = "watchDeploy")]
    pub fn watch_deploy_js_alias(
        &self,
        events_url: &str,
        timeout_duration: Option<u32>,
    ) -> DeployWatcher {
        self.watch_deploy(events_url, timeout_duration.map(Into::into))
    }

    /// Waits for a deploy event to be processed asynchronously.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for deploy events.
    /// * `deploy_hash` - The deploy hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in milliseconds.
    ///
    /// # Returns
    ///
    /// A `Result` containing either the processed `EventParseResult` or an error message.
    #[cfg(not(target_arch = "wasm32"))]
    pub async fn wait_deploy(
        &self,
        events_url: &str,
        deploy_hash: &str,
        timeout_duration: Option<u64>,
    ) -> Result<EventParseResult, String> {
        Self::wait_deploy_internal(
            events_url.to_string(),
            deploy_hash.to_string(),
            timeout_duration,
        )
        .await
    }

    /// Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for deploy events.
    /// * `deploy_hash` - The deploy hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "waitDeploy")]
    pub async fn wait_deploy_js_alias(
        &self,
        events_url: &str,
        deploy_hash: &str,
        timeout_duration: Option<u32>,
    ) -> Promise {
        let events_url = events_url.to_string();
        let deploy_hash = deploy_hash.to_string();
        let future = async move {
            let result = Self::wait_deploy_internal(
                events_url,
                deploy_hash,
                timeout_duration.map(Into::into),
            )
            .await;
            match result {
                Ok(event_parse_result) => JsValue::from_serde(&event_parse_result)
                    .map_err(|err| JsValue::from_str(&format!("{err}"))),
                Err(err) => Err(JsValue::from_str(&err)),
            }
        };

        future_to_promise(future)
    }

    /// Internal function to wait for a deploy event.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for deploy events.
    /// * `deploy_hash` - The deploy hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in milliseconds.
    ///
    /// # Returns
    ///
    /// A `Result` containing either the processed `EventParseResult` or an error message.
    async fn wait_deploy_internal(
        events_url: String,
        deploy_hash: String,
        timeout_duration: Option<u64>,
    ) -> Result<EventParseResult, String> {
        let watcher = DeployWatcher::new(events_url, timeout_duration);
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

/// Represents a deploy watcher responsible for monitoring deploy events.
///
/// This struct allows clients to subscribe to deploy events, start watching for events,
/// or wait for an event and handle the received deploy event data.
///
/// # Fields
///
/// * `events_url` - The URL for deploy events.
/// * `deploy_subscriptions` - Vector containing deploy subscriptions.
/// * `active` - Reference-counted cell indicating whether the deploy watcher is active.
/// * `timeout_duration` - Duration representing the optional timeout for watching events.
#[derive(Clone)]
#[wasm_bindgen]
pub struct DeployWatcher {
    events_url: String,
    deploy_subscriptions: Vec<DeploySubscription>,
    active: Rc<RefCell<bool>>,
    timeout_duration: Duration,
}

#[wasm_bindgen]
impl DeployWatcher {
    /// Creates a new `DeployWatcher` instance.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL for deploy events.
    /// * `timeout_duration_ms` - Optional duration in milliseconds for watching events. If not provided,
    ///   a default timeout of 60,000 milliseconds (1 minute) is used.
    ///
    /// # Returns
    ///
    /// A new `DeployWatcher` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(events_url: String, timeout_duration_ms: Option<u64>) -> Self {
        let timeout_duration = Duration::milliseconds(
            timeout_duration_ms
                .unwrap_or(DEFAULT_TIMEOUT_MS)
                .try_into()
                .unwrap(),
        );

        DeployWatcher {
            events_url,
            deploy_subscriptions: Vec::new(),
            active: Rc::new(RefCell::new(true)),
            timeout_duration,
        }
    }

    /// Subscribes to deploy events.
    ///
    /// # Arguments
    ///
    /// * `deploy_subscriptions` - Vector of deploy subscriptions to be added.
    ///
    /// # Returns
    ///
    /// Result indicating success or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "subscribe")]
    pub fn subscribe_js_alias(
        &mut self,
        deploy_subscriptions: Vec<DeploySubscription>,
    ) -> Result<(), String> {
        self.subscribe(deploy_subscriptions)
    }

    /// Unsubscribes from deploy events based on the provided deploy hash.
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - The deploy hash to unsubscribe.
    ///
    /// This method removes the deploy subscription associated with the provided deploy hash.
    #[wasm_bindgen]
    pub fn unsubscribe(&mut self, deploy_hash: String) {
        self.deploy_subscriptions
            .retain(|s| s.deploy_hash != deploy_hash);
    }

    /// Starts watching for deploy events (JavaScript-friendly).
    ///
    /// # Returns
    ///
    /// Result containing the serialized deploy event data or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "start")]
    pub async fn start_js_alias(&self) -> Result<JsValue, JsValue> {
        let result: Option<Vec<EventParseResult>> = self.start_internal(None).await;

        match result {
            Some(vec) => JsValue::from_serde(&vec)
                .map_err(|err| JsValue::from_str(&format!("{:?}", err)).clone()),
            None => Ok(JsValue::NULL),
        }
    }

    /// Stops watching for deploy events.
    ///
    /// This method sets the deploy watcher as inactive and stops the event listener if it exists.
    #[wasm_bindgen]
    pub fn stop(&self) {
        *self.active.borrow_mut() = false;
    }
}

impl DeployWatcher {
    /// Asynchronously starts watching for deploy events and execute callback handler functions from deploy subscriptions
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized deploy event data or `None` if no events are received.
    pub async fn start(&self) -> Option<Vec<EventParseResult>> {
        self.start_internal(None).await
    }

    /// Asynchronously starts watching for deploy events
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - Optional deploy hash to directly return processed event. If provided, it directly returns matched events without executing callback handler functions from deploy subscriptions. If `None`, it executes callback handler functions from deploy subscriptions.
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized deploy event data or `None` if no events are received.
    async fn start_internal(&self, deploy_hash: Option<String>) -> Option<Vec<EventParseResult>> {
        *self.active.borrow_mut() = true;

        let client = reqwest::Client::new();
        let url = self.events_url.clone();

        let deploy_watcher = Rc::new(RefCell::new(self.clone()));

        let start_time = Utc::now();
        let timeout_duration = self.timeout_duration;

        let response = match client.get(&url).send().await {
            Ok(res) => res,
            Err(err) => {
                let err = err.to_string();
                let event_parse_result = EventParseResult {
                    err: Some(err.to_string()),
                    body: None,
                };
                return Some([event_parse_result].to_vec());
            }
        };

        if response.status().is_success() {
            let buffer_size = 1;
            let mut buffer = Vec::with_capacity(buffer_size);

            let mut bytes_stream = response.bytes_stream();
            while let Some(chunk) = bytes_stream.next().await {
                match chunk {
                    Ok(bytes) => {
                        let this_clone = Rc::clone(&deploy_watcher);
                        if !*this_clone.borrow_mut().active.borrow() {
                            return None;
                        }

                        if Utc::now() - start_time >= timeout_duration {
                            let event_parse_result = EventParseResult {
                                err: Some("Timeout expired".to_string()),
                                body: None,
                            };
                            return Some([event_parse_result].to_vec());
                        }

                        buffer.extend_from_slice(&bytes);

                        while let Some(index) = buffer.iter().position(|&b| b == b'\n') {
                            let message = buffer.drain(..=index).collect::<Vec<_>>();

                            if let Ok(message) = std::str::from_utf8(&message) {
                                let deploy_watcher_clone = this_clone.borrow_mut().clone();
                                let result = deploy_watcher_clone
                                    .process_events(message, deploy_hash.as_deref());
                                match result {
                                    Some(event_parse_result) => return Some(event_parse_result),
                                    None => {
                                        continue;
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

    /// Subscribes to deploy events.
    ///
    /// # Arguments
    ///
    /// * `deploy_subscriptions` - Vector of deploy subscriptions to be added.
    ///
    /// # Returns
    ///
    /// Result indicating success or an error message.
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
                return Err(String::from("Already subscribed to this event"));
            }
        }
        self.deploy_subscriptions.extend(deploy_subscriptions);
        Ok(())
    }

    /// Processes events received from the stream and notifies subscribers.
    ///
    /// # Arguments
    ///
    /// * `message` - The raw message received from the event stream.
    /// * `target_deploy_hash` - Optional deploy hash to directly return. If provided, it directly returns matched events without executing callback handler functions from deploy subscriptions. If `None`, it executes callback handler functions from deploy subscriptions.
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized deploy event data or `None` if an error occurs.
    fn process_events(
        mut self,
        message: &str,
        target_deploy_hash: Option<&str>,
    ) -> Option<Vec<EventParseResult>> {
        let data_stream = Self::extract_data_stream(message);

        for data_item in data_stream {
            let trimmed_item = data_item.trim();
            let deploy_processed_str = EventName::DeployProcessed.to_string();

            if !trimmed_item.contains(&deploy_processed_str) {
                continue;
            }

            if let Ok(parsed_json) = serde_json::from_str::<Value>(trimmed_item) {
                let deploy = parsed_json.get(deploy_processed_str);
                if let Some(deploy_processed) = deploy.and_then(|deploy| deploy.as_object()) {
                    if let Some(deploy_hash_processed) = deploy_processed
                        .get("deploy_hash")
                        .and_then(|deploy_hash| deploy_hash.as_str())
                    {
                        let mut deploy_hash_found = target_deploy_hash
                            .map_or(false, |target_hash| target_hash == deploy_hash_processed);

                        let deploy_processed: Option<DeployProcessed> =
                            serde_json::from_value(deploy.unwrap().clone()).ok();

                        let body = Some(Body { deploy_processed });

                        let event_parse_result = EventParseResult { err: None, body };

                        if deploy_hash_found {
                            self.unsubscribe(target_deploy_hash.unwrap().to_string());
                            self.stop();
                            return Some([event_parse_result].to_vec());
                        }

                        let mut results: Vec<EventParseResult> = [].to_vec();
                        for subscription in self.deploy_subscriptions.clone().iter() {
                            if deploy_hash_processed == subscription.deploy_hash {
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

    /// Extracts the data stream from the raw JSON data.
    ///
    /// # Arguments
    ///
    /// * `json_data` - The raw JSON data containing the data stream.
    ///
    /// # Returns
    ///
    /// A vector of data items within the data stream.
    fn extract_data_stream(json_data: &str) -> Vec<&str> {
        let data_stream: Vec<&str> = json_data
            .split("data:")
            .filter(|s| !s.is_empty())
            .map(|s| s.split("id:").next().unwrap_or(""))
            .collect();
        data_stream
    }
}

/// A wrapper for an event handler function, providing synchronization and cloning capabilities.
pub struct EventHandlerFn(Arc<Mutex<dyn Fn(EventParseResult) + Send + Sync>>);

impl EventHandlerFn {
    /// Creates a new `EventHandlerFn` with the specified event handling function.
    ///
    /// # Arguments
    ///
    /// * `func` - A function that takes an `EventParseResult` as an argument.
    ///
    /// # Returns
    ///
    /// A new `EventHandlerFn` instance.
    pub fn new<F>(func: F) -> Self
    where
        F: Fn(EventParseResult) + Send + Sync + 'static,
    {
        EventHandlerFn(Arc::new(Mutex::new(func)))
    }

    /// Calls the stored event handling function with the provided `EventParseResult`.
    ///
    /// # Arguments
    ///
    /// * `event_result` - The result of an event to be passed to the stored event handling function.
    pub fn call(&self, event_result: EventParseResult) {
        let func = self.0.lock().unwrap();
        (*func)(event_result); // Call the stored function with arguments
    }
}

impl fmt::Debug for EventHandlerFn {
    /// Implements the `Debug` trait for better debugging support.
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "EventHandlerFn")
    }
}

impl Clone for EventHandlerFn {
    /// Implements the `Clone` trait for creating a cloned instance with shared underlying data.
    fn clone(&self) -> Self {
        EventHandlerFn(self.0.clone())
    }
}

impl Default for EventHandlerFn {
    /// Implements the `Default` trait, creating a default instance with a no-op event handling function.
    fn default() -> Self {
        EventHandlerFn(Arc::new(Mutex::new(|_event_result| {})))
    }
}

// Define DeploySubscription struct with different configurations based on the target architecture.
#[cfg(not(target_arch = "wasm32"))]
/// Represents a subscription to deploy events for non-wasm32 target architecture.
#[derive(Debug, Clone, Default)]
pub struct DeploySubscription {
    /// Deploy hash to identify the subscription.
    pub deploy_hash: String,
    /// Handler function for deploy events.
    pub event_handler_fn: EventHandlerFn,
}

#[cfg(target_arch = "wasm32")]
/// Represents a subscription to deploy events for wasm32 target architecture.
#[derive(Debug, Clone, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct DeploySubscription {
    /// Deploy hash to identify the subscription.
    #[wasm_bindgen(js_name = "deployHash")]
    pub deploy_hash: String,
    /// Handler function for deploy events.
    #[wasm_bindgen(js_name = "eventHandlerFn")]
    pub event_handler_fn: js_sys::Function,
}

impl DeploySubscription {
    /// Constructor for DeploySubscription for non-wasm32 target architecture.
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - Deploy hash to identify the subscription.
    /// * `event_handler_fn` - Handler function for deploy events.
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
    /// Constructor for DeploySubscription for wasm32 target architecture.
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - Deploy hash to identify the subscription.
    /// * `event_handler_fn` - Handler function for deploy events.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(deploy_hash: String, event_handler_fn: js_sys::Function) -> Self {
        Self {
            deploy_hash,
            event_handler_fn,
        }
    }
}

/// Represents a failure response containing an error message.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Failure {
    pub error_message: String,
}

/// Represents a success response containing a cost value.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Success {
    pub cost: String,
}

/// Represents the result of an execution, either Success or Failure.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct ExecutionResult {
    /// Optional Success information.
    #[serde(rename = "Success")]
    #[wasm_bindgen(js_name = "Success")]
    pub success: Option<Success>,
    /// Optional Failure information.
    #[serde(rename = "Failure")]
    #[wasm_bindgen(js_name = "Failure")]
    pub failure: Option<Failure>,
}

/// Represents processed deploy information.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct DeployProcessed {
    pub deploy_hash: String,
    pub account: String,
    pub timestamp: String,
    pub ttl: String,
    pub dependencies: Vec<String>,
    pub block_hash: String,
    /// Result of the execution, either Success or Failure.
    pub execution_result: ExecutionResult,
}

/// Represents the body of an event, containing processed deploy information.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Body {
    #[serde(rename = "DeployProcessed")]
    #[wasm_bindgen(js_name = "DeployProcessed")]
    pub deploy_processed: Option<DeployProcessed>,
}

/// Represents the result of parsing an event, containing error information and the event body.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct EventParseResult {
    pub err: Option<String>,
    pub body: Option<Body>,
}

/// Enum representing different event names.
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
    /// Implements the `fmt::Display` trait for converting the enum variant to its string representation.
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
