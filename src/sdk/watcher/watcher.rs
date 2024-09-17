use crate::SDK;
use chrono::{Duration, Utc};
use futures_util::StreamExt;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use js_sys::Promise;
use serde::{Deserialize, Deserializer, Serialize};
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

impl SDK {
    /// Creates a new Watcher instance to watch deploys.
    /// Legacy alias
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `Watcher` instance.
    #[deprecated(note = "prefer 'watch_transaction'")]
    pub fn watch_deploy(&self, events_url: &str, timeout_duration: Option<u64>) -> Watcher {
        Watcher::new(events_url.to_string(), timeout_duration)
    }

    /// Creates a new Watcher instance to watch deploys.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `Watcher` instance.
    pub fn watch_transaction(&self, events_url: &str, timeout_duration: Option<u64>) -> Watcher {
        Watcher::new(events_url.to_string(), timeout_duration)
    }

    /// Waits for a deploy event to be processed asynchronously.
    /// Legacy alias
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `deploy_hash` - The deploy hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in milliseconds.
    ///
    /// # Returns
    ///
    /// A `Result` containing either the processed `EventParseResult` or an error message.
    #[deprecated(note = "prefer 'wait_transaction' with transaction")]
    pub async fn wait_deploy(
        &self,
        events_url: &str,
        deploy_hash: &str,
        timeout_duration: Option<u64>,
    ) -> Result<EventParseResult, String> {
        Self::wait_transaction_internal(
            events_url.to_string(),
            deploy_hash.to_string(),
            timeout_duration,
        )
        .await
    }

    /// Alias for wait_deploy Waits for a deploy event to be processed asynchronously.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `target_hash` - The transaction hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in milliseconds.
    ///
    /// # Returns
    ///
    /// A `Result` containing either the processed `EventParseResult` or an error message
    pub async fn wait_transaction(
        &self,
        events_url: &str,
        target_hash: &str,
        timeout_duration: Option<u64>,
    ) -> Result<EventParseResult, String> {
        Self::wait_transaction_internal(
            events_url.to_string(),
            target_hash.to_string(),
            timeout_duration,
        )
        .await
    }

    /// Internal function to wait for a deploy event.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `target_hash` - The transaction hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in milliseconds.
    ///
    /// # Returns
    ///
    /// A `Result` containing either the processed `EventParseResult` or an error message.
    async fn wait_transaction_internal(
        events_url: String,
        target_hash: String,
        timeout_duration: Option<u64>,
    ) -> Result<EventParseResult, String> {
        let watcher = Watcher::new(events_url, timeout_duration);
        let result = watcher.start_internal(Some(target_hash)).await;
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

#[wasm_bindgen]
impl SDK {
    /// Creates a new Watcher instance to watch deploys (JavaScript-friendly).
    /// Legacy alias
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `Watcher` instance.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "watchDeploy")]
    #[deprecated(note = "prefer 'watchTransaction'")]
    #[allow(deprecated)]
    pub fn watch_deploy_js_alias(
        &self,
        events_url: &str,
        timeout_duration: Option<u32>,
    ) -> Watcher {
        self.watch_deploy(events_url, timeout_duration.map(Into::into))
    }

    /// Creates a new Watcher instance to watch deploys (JavaScript-friendly).
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A `Watcher` instance.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "watchTransaction")]
    pub fn watch_transaction_js_alias(
        &self,
        events_url: &str,
        timeout_duration: Option<u32>,
    ) -> Watcher {
        self.watch_transaction(events_url, timeout_duration.map(Into::into))
    }

    /// Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
    /// Legacy alias
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `deploy_hash` - The deploy hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "waitDeploy")]
    #[deprecated(note = "prefer 'waitTransaction' with transaction")]
    #[allow(deprecated)]
    pub async fn wait_deploy_js_alias(
        &self,
        events_url: &str,
        deploy_hash: &str,
        timeout_duration: Option<u32>,
    ) -> Promise {
        self.wait_transaction_js_alias(events_url, deploy_hash, timeout_duration)
            .await
    }

    /// Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL to monitor for transaction events.
    /// * `target_hash` - The transaction hash to wait for.
    /// * `timeout_duration` - An optional timeout duration in seconds.
    ///
    /// # Returns
    ///
    /// A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "waitTransaction")]
    pub async fn wait_transaction_js_alias(
        &self,
        events_url: &str,
        target_hash: &str,
        timeout_duration: Option<u32>,
    ) -> Promise {
        let events_url = events_url.to_string();
        let target_hash = target_hash.to_string();
        let future = async move {
            let result = Self::wait_transaction_internal(
                events_url,
                target_hash,
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
}

/// Represents a deploy watcher responsible for monitoring transaction events.
///
/// This struct allows clients to subscribe to transaction events, start watching for events,
/// or wait for an event and handle the received deploy event data.
///
/// # Fields
///
/// * `events_url` - The URL for transaction events.
/// * `subscriptions` - Vector containing deploy subscriptions.
/// * `active` - Reference-counted cell indicating whether the deploy watcher is active.
/// * `timeout_duration` - Duration representing the optional timeout for watching events.
#[derive(Clone)]
#[wasm_bindgen]
pub struct Watcher {
    events_url: String,
    subscriptions: Vec<Subscription>,
    active: Rc<RefCell<bool>>,
    timeout_duration: Duration,
}

#[wasm_bindgen]
impl Watcher {
    /// Creates a new `Watcher` instance.
    ///
    /// # Arguments
    ///
    /// * `events_url` - The URL for transaction events.
    /// * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
    ///   a default timeout of 60,000 milliseconds (1 minute) is used.
    ///
    /// # Returns
    ///
    /// A new `Watcher` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(events_url: String, timeout_duration: Option<u64>) -> Self {
        let timeout_duration = Duration::try_milliseconds(
            timeout_duration
                .unwrap_or(DEFAULT_TIMEOUT_MS)
                .try_into()
                .unwrap(),
        )
        .unwrap_or_default();

        Watcher {
            events_url,
            subscriptions: Vec::new(),
            active: Rc::new(RefCell::new(true)),
            timeout_duration,
        }
    }

    /// Subscribes to transaction events.
    ///
    /// # Arguments
    ///
    /// * `subscriptions` - Vector of deploy subscriptions to be added.
    ///
    /// # Returns
    ///
    /// Result indicating success or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "subscribe")]
    pub fn subscribe_js_alias(&mut self, subscriptions: Vec<Subscription>) -> Result<(), String> {
        self.subscribe(subscriptions)
    }

    /// Unsubscribes from transaction events based on the provided transaction hash.
    ///
    /// # Arguments
    ///
    /// * `transaction_hash` - The transaction hash to unsubscribe.
    ///
    /// This method removes the deploy subscription associated with the provided transaction hash.
    #[wasm_bindgen]
    pub fn unsubscribe(&mut self, target_hash: String) {
        self.subscriptions.retain(|s| s.target_hash != target_hash);
    }

    /// Starts watching for transaction events (JavaScript-friendly).
    ///
    /// # Returns
    ///
    /// Result containing the serialized transaction events data or an error message.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "start")]
    pub async fn start_js_alias(&self) -> Result<JsValue, JsError> {
        let result = match self.start_internal(None).await {
            Some(res) => res,
            None => return Ok(JsValue::NULL),
        };

        let serialized = JsValue::from_serde(&result)
            .map_err(|err| JsError::new(&format!("Error serializing events: {:?}", err)))?;

        Ok(serialized)
    }

    /// Stops watching for transaction events.
    ///
    /// This method sets the deploy watcher as inactive and stops the event listener if it exists.
    #[wasm_bindgen]
    pub fn stop(&self) {
        *self.active.borrow_mut() = false;
    }
}

impl Watcher {
    /// Asynchronously starts watching for transaction events and execute callback handler functions from deploy subscriptions
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized deploy event data or `None` if no events are received.
    pub async fn start(&self) -> Option<Vec<EventParseResult>> {
        self.start_internal(None).await
    }

    /// Asynchronously starts watching for transaction events
    ///
    /// # Arguments
    ///
    /// * `transaction_hash` - Optional transaction hash to directly return processed event. If provided, it directly returns matched events without executing callback handler functions from deploy subscriptions. If `None`, it executes callback handler functions from deploy subscriptions.
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized deploy event data or `None` if no events are received.
    async fn start_internal(&self, target_hash: Option<String>) -> Option<Vec<EventParseResult>> {
        *self.active.borrow_mut() = true;

        let client = reqwest::Client::new();
        let url = self.events_url.clone();

        let watcher = Rc::new(RefCell::new(self.clone()));

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
                        let this_clone = Rc::clone(&watcher);
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
                                let watcher_clone = this_clone.borrow_mut().clone();
                                let result =
                                    watcher_clone.process_events(message, target_hash.as_deref());
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

    /// Subscribes to transaction events.
    ///
    /// # Arguments
    ///
    /// * `subscriptions` - Vector of subscriptions to be added.
    ///
    /// # Returns
    ///
    /// Result indicating success or an error message.
    pub fn subscribe(&mut self, subscriptions: Vec<Subscription>) -> Result<(), String> {
        for new_subscription in &subscriptions {
            if self
                .subscriptions
                .iter()
                .any(|s| s.target_hash == new_subscription.target_hash)
            {
                return Err(String::from("Already subscribed to this event"));
            }
        }
        self.subscriptions.extend(subscriptions);
        Ok(())
    }

    /// Processes events received from the stream and notifies subscribers.
    ///
    /// # Arguments
    ///
    /// * `message` - The raw message received from the event stream.
    /// * `target_transaction_hash` - Optional transaction hash to directly return. If provided, it directly returns matched events without executing callback handler functions from subscriptions. If `None`, it executes callback handler functions from subscriptions.
    ///
    /// # Returns
    ///
    /// An `Option` containing the serialized transaction/deploy event data or `None` if an error occurs.
    fn process_events(
        mut self,
        message: &str,
        target_hash: Option<&str>,
    ) -> Option<Vec<EventParseResult>> {
        let data_stream = Self::extract_data_stream(message);

        for data_item in data_stream {
            let trimmed_item = data_item.trim();
            let transaction_processed_str = EventName::TransactionProcessed.to_string();

            if !trimmed_item.contains(&transaction_processed_str) {
                continue;
            }

            if let Ok(parsed_json) = serde_json::from_str::<Value>(trimmed_item) {
                let transaction = parsed_json.get(transaction_processed_str);
                if let Some(transaction_processed) =
                    transaction.and_then(|transaction| transaction.as_object())
                {
                    if let Some(transaction_hash_processed) = transaction_processed
                        .get("transaction_hash")
                        .and_then(|transaction_hash| {
                            transaction_hash
                                .get("Version1")
                                .or_else(|| transaction_hash.get("Deploy"))
                                .and_then(|transaction_hash| transaction_hash.as_str())
                        })
                    {
                        let mut transaction_hash_found = target_hash.map_or(false, |target_hash| {
                            target_hash == transaction_hash_processed
                        });

                        let transaction_processed: Option<TransactionProcessed> =
                            serde_json::from_value(transaction.unwrap().clone()).ok();

                        let body = Some(Body {
                            transaction_processed,
                        });

                        let event_parse_result = EventParseResult { err: None, body };

                        if transaction_hash_found {
                            self.unsubscribe(target_hash.unwrap().to_string());
                            self.stop();
                            return Some([event_parse_result].to_vec());
                        }

                        let mut results: Vec<EventParseResult> = [].to_vec();
                        for subscription in self.subscriptions.clone().iter() {
                            if transaction_hash_processed == subscription.target_hash {
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

                                self.unsubscribe(transaction_hash_processed.to_string());
                                transaction_hash_found = true;
                                results.push(event_parse_result.clone())
                            }
                        }

                        if transaction_hash_found && self.subscriptions.is_empty() {
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

#[allow(dead_code)]
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

// Define Subscription struct with different configurations based on the target architecture.
#[cfg(not(target_arch = "wasm32"))]
/// Represents a subscription to transaction events for non-wasm32 target architecture.
#[derive(Debug, Clone, Default)]
pub struct Subscription {
    /// Transaction target hash to identify the subscription.
    pub target_hash: String,
    /// Handler function for transaction events.
    pub event_handler_fn: EventHandlerFn,
}

#[cfg(target_arch = "wasm32")]
/// Represents a subscription to transaction events for wasm32 target architecture.
#[derive(Debug, Clone, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct Subscription {
    /// Transaction target hash to identify the subscription.
    #[wasm_bindgen(js_name = "targetHash")]
    pub target_hash: String,
    /// Handler function for transaction events.
    #[wasm_bindgen(js_name = "eventHandlerFn")]
    pub event_handler_fn: js_sys::Function,
}

impl Subscription {
    /// Constructor for Subscription for non-wasm32 target architecture.
    ///
    /// # Arguments
    ///
    /// * `target_hash` - Transaction target hash to identify the subscription.
    /// * `event_handler_fn` - Handler function for transaction events.
    #[cfg(not(target_arch = "wasm32"))]
    pub fn new(target_hash: String, event_handler_fn: EventHandlerFn) -> Self {
        Self {
            target_hash,
            event_handler_fn,
        }
    }
}

#[wasm_bindgen]
impl Subscription {
    /// Constructor for Subscription for wasm32 target architecture.
    ///
    /// # Arguments
    ///
    /// * `transaction_hash` - Transaction hash to identify the subscription.
    /// * `event_handler_fn` - Handler function for transaction events.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(constructor)]
    pub fn new(target_hash: String, event_handler_fn: js_sys::Function) -> Self {
        Self {
            target_hash,
            event_handler_fn,
        }
    }
}

/// Represents a failure response containing an error message.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Failure {
    pub cost: String,
    pub error_message: String,
}

/// Represents a success response containing a cost value.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Version2 {
    pub initiator: PublicKeyString,
    pub error_message: Option<String>,
    pub limit: String,
    pub consumed: String,
    pub cost: String,
    // pub payment: Vec<Payment>,
}

#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Payment {
    pub source: String,
}

/// Represents the result of an execution, either Success or Failure.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct ExecutionResult {
    /// Optional Success information.
    #[serde(rename = "Version2")]
    #[wasm_bindgen(js_name = "Success")]
    pub success: Option<Version2>,
    /// Optional Failure information.
    #[serde(rename = "Failure")]
    #[wasm_bindgen(js_name = "Failure")]
    pub failure: Option<Failure>,
}

#[derive(Debug, Clone, Serialize, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct HashString {
    pub hash: String,
}

impl HashString {
    fn from_hash(hash: String) -> Self {
        HashString { hash }
    }
}

impl<'de> Deserialize<'de> for HashString {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let map: std::collections::HashMap<String, String> =
            Deserialize::deserialize(deserializer)?;

        if let Some(hash) = map.get("Version1").or_else(|| map.get("Deploy")) {
            Ok(HashString::from_hash(hash.clone()))
        } else {
            Err(serde::de::Error::missing_field("Deploy or Version1"))
        }
    }
}

#[wasm_bindgen]
impl HashString {
    #[wasm_bindgen(getter, js_name = "Deploy")]
    pub fn deploy(&self) -> String {
        self.hash.clone()
    }

    #[wasm_bindgen(getter, js_name = "Version1")]
    pub fn version1(&self) -> String {
        self.hash.clone()
    }

    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for HashString {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.hash)
    }
}

#[derive(Debug, Deserialize, Clone, Serialize, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct PublicKeyString {
    #[serde(rename = "PublicKey")]
    #[wasm_bindgen(js_name = "PublicKey")]
    pub public_key: String,
}

#[derive(Debug, Deserialize, Clone, Serialize, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct Message {
    #[serde(rename = "String")]
    #[wasm_bindgen(js_name = "String")]
    pub string: String,
}

#[derive(Debug, Deserialize, Clone, Serialize, Default)]
#[wasm_bindgen(getter_with_clone)]
pub struct Messages {
    pub entity_hash: String,
    pub message: Message,
    pub topic_name: String,
    pub topic_name_hash: String,
    pub topic_index: u32,
    pub block_index: u64,
}

/// Represents processed deploy information.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct TransactionProcessed {
    #[serde(alias = "transaction_hash")]
    pub hash: HashString,
    pub initiator_addr: PublicKeyString,
    pub timestamp: String,
    pub ttl: String,
    pub block_hash: String,
    /// Result of the execution, either Success or Failure.
    pub execution_result: ExecutionResult,
    pub messages: Vec<Messages>,
}

/// Represents the body of an event, containing processed deploy information.
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Body {
    #[serde(rename = "TransactionProcessed")]
    pub transaction_processed: Option<TransactionProcessed>,
}

// Implementing methods to get the field using different aliases
#[wasm_bindgen]
impl Body {
    #[wasm_bindgen(getter, js_name = "get_deploy_processed")]
    #[deprecated(note = "prefer 'get_transaction_processed'")]
    #[allow(deprecated)]
    pub fn get_deploy_processed(&self) -> Option<TransactionProcessed> {
        self.transaction_processed.clone()
    }

    #[wasm_bindgen(getter, js_name = "get_transaction_processed")]
    pub fn get_transaction_processed(&self) -> Option<TransactionProcessed> {
        self.transaction_processed.clone()
    }
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
enum EventName {
    BlockAdded,
    TransactionAccepted,
    TransactionExpired,
    TransactionProcessed,
    Step,
    FinalitySignature,
    Fault,
}

impl fmt::Display for EventName {
    /// Implements the `fmt::Display` trait for converting the enum variant to its string representation.
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EventName::BlockAdded => write!(f, "BlockAdded"),
            EventName::TransactionAccepted => write!(f, "TransactionAccepted"),
            EventName::TransactionExpired => write!(f, "TransactionExpired"),
            EventName::TransactionProcessed => write!(f, "TransactionProcessed"),
            EventName::Step => write!(f, "Step"),
            EventName::FinalitySignature => write!(f, "FinalitySignature"),
            EventName::Fault => write!(f, "Fault"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::watcher::{deploy_mock::DEPLOY_MOCK, transaction_mock::TRANSACTION_MOCK};
    use sdk_tests::tests::helpers::get_network_constants;
    use tokio;

    #[test]
    fn test_new() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let timeout_duration = 5000;

        // Act
        let watcher = Watcher::new(events_url.clone(), Some(timeout_duration));

        // Assert
        assert_eq!(watcher.events_url, events_url);
        assert_eq!(watcher.subscriptions.len(), 0);
        assert!(*watcher.active.borrow());
        assert_eq!(
            watcher.timeout_duration,
            Duration::try_milliseconds(timeout_duration.try_into().unwrap()).unwrap()
        );
    }

    #[test]
    fn test_new_default_timeout() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();

        // Act
        let watcher = Watcher::new(events_url.clone(), None);

        // Assert
        assert_eq!(watcher.events_url, events_url);
        assert_eq!(watcher.subscriptions.len(), 0);
        assert!(*watcher.active.borrow());
        assert_eq!(
            watcher.timeout_duration,
            Duration::try_milliseconds(DEFAULT_TIMEOUT_MS.try_into().unwrap()).unwrap()
        );
    }

    #[tokio::test]
    async fn test_extract_data_stream() {
        // Arrange
        let json_data = r#"data:segment1id:data:segment2id:data:segment3id:"#;

        // Act
        let result = Watcher::extract_data_stream(json_data);

        // Assert
        assert_eq!(result, vec!["segment1", "segment2", "segment3"]);
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_process_events_legacy() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let watcher = Watcher::new(events_url, None);
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";

        let target_deploy_hash = Some(deploy_hash);

        // Act
        let result = watcher.process_events(DEPLOY_MOCK, target_deploy_hash);

        // Assert
        assert!(result.is_some());
        let results = result.unwrap();
        assert_eq!(results.len(), 1);

        let event_parse_result = &results[0];
        assert!(event_parse_result.err.is_none());

        let body = event_parse_result.body.as_ref().unwrap();
        let get_deploy_processed = body.get_deploy_processed().unwrap();
        assert_eq!(get_deploy_processed.hash.to_string(), deploy_hash);
    }

    #[tokio::test]
    async fn test_process_events() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let watcher = Watcher::new(events_url, None);
        let transaction_hash = "8c6823d9480eee9fe0cfb5ed1fbf77f928cc6af21121298c05b4e3d87a328271";

        let target_transaction_hash = Some(transaction_hash);

        // Act
        let result = watcher.process_events(TRANSACTION_MOCK, target_transaction_hash);

        // Assert
        assert!(result.is_some());
        let results = result.unwrap();
        assert_eq!(results.len(), 1);

        let event_parse_result = &results[0];
        assert!(event_parse_result.err.is_none());

        let body = event_parse_result.body.as_ref().unwrap();
        let transaction_processed = body.get_transaction_processed().unwrap();
        assert_eq!(transaction_processed.hash.to_string(), transaction_hash);
    }

    #[tokio::test]
    async fn test_start_timeout() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let watcher = Watcher::new(events_url, Some(1));

        // Act
        let result = watcher.start().await;

        // Assert
        assert!(result.is_some());
        let results = result.unwrap();
        assert_eq!(results.len(), 1);
        assert_eq!(results[0].err, Some("Timeout expired".to_string()));
        assert!(results[0].body.is_none());
    }

    #[test]
    fn test_stop() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let watcher = Watcher::new(events_url, None);
        assert!(*watcher.active.borrow());

        // Act
        watcher.stop();

        // Assert
        assert!(!(*watcher.active.borrow()));
    }

    #[test]
    fn test_subscribe() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let mut watcher = Watcher::new(events_url, None);
        let transaction_hash = "8c6823d9480eee9fe0cfb5ed1fbf77f928cc6af21121298c05b4e3d87a328271";

        // Create a subscription
        let subscription =
            Subscription::new(transaction_hash.to_string(), EventHandlerFn::default());

        // Act
        let result = watcher.subscribe(vec![subscription]);

        // Assert
        assert!(result.is_ok());

        // Try subscribing to the same deploy hash again
        let duplicate_subscription =
            Subscription::new(transaction_hash.to_string(), EventHandlerFn::default());
        let result_duplicate = watcher.subscribe(vec![duplicate_subscription]);

        // Assert
        assert!(result_duplicate.is_err());
        assert_eq!(
            result_duplicate.err().unwrap(),
            "Already subscribed to this event"
        );
    }

    #[test]
    fn test_unsubscribe() {
        // Arrange
        let (_, events_url, _, _, _) = get_network_constants();
        let mut watcher = Watcher::new(events_url, None);
        let transaction_hash = "8c6823d9480eee9fe0cfb5ed1fbf77f928cc6af21121298c05b4e3d87a328271";

        // Subscribe to a transaction hash
        let transaction_hash_to_subscribe = transaction_hash.to_string();
        let subscription = Subscription::new(
            transaction_hash_to_subscribe.clone(),
            EventHandlerFn::default(),
        );
        let _ = watcher.subscribe(vec![subscription]);

        // Assert that the deploy hash is initially subscribed
        assert!(watcher
            .subscriptions
            .iter()
            .any(|s| s.target_hash == transaction_hash_to_subscribe));

        // Act
        watcher.unsubscribe(transaction_hash_to_subscribe.clone());

        // Assert that the deploy hash is unsubscribed after calling unsubscribe
        assert!(!watcher
            .subscriptions
            .iter()
            .any(|s| s.target_hash == transaction_hash_to_subscribe));
    }

    #[test]
    #[allow(deprecated)]
    fn test_sdk_watch_deploy_retunrs_instance() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, events_url, _, _, _) = get_network_constants();
        let timeout_duration = 5000;

        // Act
        let watcher = sdk.watch_deploy(&events_url, Some(timeout_duration));

        // Assert
        assert_eq!(watcher.events_url, events_url);
        assert_eq!(watcher.subscriptions.len(), 0);
        assert!(*watcher.active.borrow());
        assert_eq!(
            watcher.timeout_duration,
            Duration::try_milliseconds(timeout_duration.try_into().unwrap()).unwrap()
        );
    }

    #[test]
    fn test_sdk_watch_transaction_retunrs_instance() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, events_url, _, _, _) = get_network_constants();
        let timeout_duration = 5000;

        // Act
        let watcher = sdk.watch_transaction(&events_url, Some(timeout_duration));

        // Assert
        assert_eq!(watcher.events_url, events_url);
        assert_eq!(watcher.subscriptions.len(), 0);
        assert!(*watcher.active.borrow());
        assert_eq!(
            watcher.timeout_duration,
            Duration::try_milliseconds(timeout_duration.try_into().unwrap()).unwrap()
        );
    }

    #[tokio::test]
    #[allow(deprecated)]
    async fn test_wait_deploy_timeout() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, events_url, _, _, _) = get_network_constants();
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";
        let timeout_duration = Some(5000);

        // Act
        let result = sdk
            .wait_deploy(&events_url, deploy_hash, timeout_duration)
            .await;

        // Assert
        assert!(result.is_ok());
        let event_parse_result = result.unwrap();
        assert!(event_parse_result.err.is_some());
        assert_eq!(event_parse_result.err, Some("Timeout expired".to_string()));
    }

    #[tokio::test]
    async fn test_wait_transaction_timeout() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, events_url, _, _, _) = get_network_constants();
        let transaction_hash = "8c6823d9480eee9fe0cfb5ed1fbf77f928cc6af21121298c05b4e3d87a328271";
        let timeout_duration = Some(5000);

        // Act
        let result = sdk
            .wait_transaction(&events_url, transaction_hash, timeout_duration)
            .await;

        // Assert
        assert!(result.is_ok());
        let event_parse_result = result.unwrap();
        assert!(event_parse_result.err.is_some());
        assert_eq!(event_parse_result.err, Some("Timeout expired".to_string()));
    }
}
