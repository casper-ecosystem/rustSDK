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
    /// * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
    ///   a default timeout of 60,000 milliseconds (1 minute) is used.
    ///
    /// # Returns
    ///
    /// A new `DeployWatcher` instance.
    #[wasm_bindgen(constructor)]
    pub fn new(events_url: String, timeout_duration: Option<u64>) -> Self {
        let timeout_duration = Duration::milliseconds(
            timeout_duration
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

#[cfg(test)]
mod tests {
    use super::*;
    use sdk_tests::config::DEFAULT_EVENT_ADDRESS;

    #[test]
    fn test_new() {
        // Arrange
        let events_url = DEFAULT_EVENT_ADDRESS.to_string();
        let timeout_duration = 5000;

        // Act
        let deploy_watcher = DeployWatcher::new(events_url.clone(), Some(timeout_duration));

        // Assert
        assert_eq!(deploy_watcher.events_url, events_url);
        assert_eq!(deploy_watcher.deploy_subscriptions.len(), 0);
        assert!(*deploy_watcher.active.borrow());
        assert_eq!(
            deploy_watcher.timeout_duration,
            Duration::milliseconds(timeout_duration.try_into().unwrap())
        );
    }

    #[test]
    fn test_new_default_timeout() {
        // Arrange
        let events_url = DEFAULT_EVENT_ADDRESS.to_string();

        // Act
        let deploy_watcher = DeployWatcher::new(events_url.clone(), None);

        // Assert
        assert_eq!(deploy_watcher.events_url, events_url);
        assert_eq!(deploy_watcher.deploy_subscriptions.len(), 0);
        assert!(*deploy_watcher.active.borrow());
        assert_eq!(
            deploy_watcher.timeout_duration,
            Duration::milliseconds(DEFAULT_TIMEOUT_MS.try_into().unwrap())
        );
    }

    #[tokio::test]
    async fn test_extract_data_stream() {
        // Arrange
        let json_data = r#"data:segment1id:data:segment2id:data:segment3id:"#;

        // Act
        let result = DeployWatcher::extract_data_stream(json_data);

        // Assert
        assert_eq!(result, vec!["segment1", "segment2", "segment3"]);
    }

    #[tokio::test]
    async fn test_process_events() {
        // Arrange
        let deploy_watcher = DeployWatcher::new(DEFAULT_EVENT_ADDRESS.to_string(), None);
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";

        let message = r#"
data:{"DeployProcessed":{"deploy_hash":"19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2","account":"0109016beb0dbac17f21f339375da8f0b0a5e29feb93562f9fd269cef97c0467e0","timestamp":"2024-02-16T00:51:04.000Z","ttl":"30m","dependencies":[],"block_hash":"4452fa7c019a19cb246d629330fa109f467dae5c39ca867cafb3f68b9e0177d4","execution_result":{"Success":{"effect":{"operations":[],"transforms":[{"key":"account-hash-6174cf2e6f8fed1715c9a3bace9c50bfe572eecb763b0ed3f644532616452008","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-5d0e804990367d4561fb770c045a0148af2bc52f3643e695bf78559910d4c77e","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"hash-1a6ac00b5ff7022b43b7bae35847f83a2a674318b01cbd34e17b003dd2b5552e","transform":"Identity"},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"balance-c378999daa8de52f9c7a7f856d2fdbe962f754376cfbe923e61ff787307a507e","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":"Identity"},{"key":"balance-c378999daa8de52f9c7a7f856d2fdbe962f754376cfbe923e61ff787307a507e","transform":{"WriteCLValue":{"cl_type":"U512","bytes":"0eed4705e8b536c138938d44c64d31","parsed":"999999999999999999960056401840109"}}},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":{"AddUInt512":"240000000000"}},{"key":"uref-9f720aabff7fbf1f6773d784d9a34c445124c2cfbde3a353320a5fe58df2ffdd-000","transform":{"WriteCLValue":{"cl_type":"String","bytes":"09000000746573747474747474","parsed":"testttttt"}}},{"key":"uref-15131ff4703037858947e88c6f25200cb63c2ee5f9efcf810680295397d46349-000","transform":{"WriteCLValue":{"cl_type":"String","bytes":"030000004f4f4f","parsed":"OOO"}}},{"key":"uref-cfac103ab95b563355a61bdee8ea97d8dcdf8d52fb14b0fdbc435b0ff929a824-000","transform":{"WriteCLValue":{"cl_type":"U8","bytes":"0a","parsed":10}}},{"key":"uref-f33efca0755b3cc1c6a87165bcd0a85b4cf1ee42b3cfd7acb55da4f71a00b61a-000","transform":{"WriteCLValue":{"cl_type":"U256","bytes":"02e803","parsed":"1000"}}},{"key":"uref-961e8aaa8303b061e55bc0e605935b2e8c438223b981feb0e546fef53b194838-000","transform":{"WriteCLValue":{"cl_type":"U8","bytes":"00","parsed":0}}},{"key":"uref-2a46ede77da07d2362dc9bd479bb9de8e5662c819ca3bb8116b021a979acc3ca-000","transform":{"WriteCLValue":{"cl_type":"U8","bytes":"00","parsed":0}}},{"key":"uref-ce33a5c81e6123cf6c199df2c824d174bc3dc498fea31a19548d71a32da030fa-000","transform":{"WriteCLValue":{"cl_type":"Unit","bytes":"","parsed":null}}},{"key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438","transform":"WriteContractPackage"},{"key":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","transform":{"AddKeys":[{"name":"cep18_contract_package_testttttt","key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438"}]}},{"key":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","transform":{"AddKeys":[{"name":"cep18_contract_package_access_testttttt","key":"uref-ce33a5c81e6123cf6c199df2c824d174bc3dc498fea31a19548d71a32da030fa-007"}]}},{"key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438","transform":"Identity"},{"key":"hash-f069d36f7c7d32427fe9ecf3a81a26aa357addba2180bc054d52077ea90ee8b8","transform":"WriteContractWasm"},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":"WriteContract"},{"key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438","transform":"WriteContractPackage"},{"key":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","transform":{"AddKeys":[{"name":"cep18_contract_hash_testttttt","key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088"}]}},{"key":"uref-dee665d61176329b217a81b2f80790811e2c53e6a22482cfcce2e2afd8b783ea-000","transform":{"WriteCLValue":{"cl_type":"U32","bytes":"01000000","parsed":1}}},{"key":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","transform":{"AddKeys":[{"name":"cep18_contract_version_testttttt","key":"uref-dee665d61176329b217a81b2f80790811e2c53e6a22482cfcce2e2afd8b783ea-007"}]}},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":"Identity"},{"key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438","transform":"Identity"},{"key":"hash-f069d36f7c7d32427fe9ecf3a81a26aa357addba2180bc054d52077ea90ee8b8","transform":"Identity"},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":{"AddKeys":[{"name":"package_hash","key":"hash-58c08d0f854383f761e92f873d75117b4c2f932c75da074c897c4b078f8c6438"}]}},{"key":"uref-29d772d4046a290ede279a28da43019a798b20d56028c37f858986590049fcf1-000","transform":{"WriteCLValue":{"cl_type":"Unit","bytes":"","parsed":null}}},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":{"AddKeys":[{"name":"allowances","key":"uref-29d772d4046a290ede279a28da43019a798b20d56028c37f858986590049fcf1-007"}]}},{"key":"uref-0925c002732af4e4bff8adb01aea1aba9bfecef734856a861efbbf26a167b624-000","transform":{"WriteCLValue":{"cl_type":"Unit","bytes":"","parsed":null}}},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":{"AddKeys":[{"name":"balances","key":"uref-0925c002732af4e4bff8adb01aea1aba9bfecef734856a861efbbf26a167b624-007"}]}},{"key":"dictionary-70c1aa192db636ed2952984cd8a5491549139f4dfe70703846323ae757e4ff86","transform":{"WriteCLValue":{"cl_type":"Any","bytes":"0300000002e80307200000000925c002732af4e4bff8adb01aea1aba9bfecef734856a861efbbf26a167b6242c000000414c53467748544f393879737a514d436c4a3067513674784d367662464d2b6f666f4f536c46774c32417066","parsed":null}}},{"key":"uref-40f02b835921a9e09cc262d5e74ef3fe9b4b4c725fe825447295837dcb9ed7d2-000","transform":{"WriteCLValue":{"cl_type":"Unit","bytes":"","parsed":null}}},{"key":"hash-66afcb5db2152f5d34ab3bef78d22f6bbcec49edd724cd568eb5a75909d0d088","transform":{"AddKeys":[{"name":"security_badges","key":"uref-40f02b835921a9e09cc262d5e74ef3fe9b4b4c725fe825447295837dcb9ed7d2-007"}]}},{"key":"dictionary-bf7a642a4f48d4f7c4b4b0185c06d7bd519d70bf0bee3e9b3ce1e0f934dd1e14","transform":{"WriteCLValue":{"cl_type":"Any","bytes":"0100000000032000000040f02b835921a9e09cc262d5e74ef3fe9b4b4c725fe825447295837dcb9ed7d22c000000414c53467748544f393879737a514d436c4a3067513674784d367662464d2b6f666f4f536c46774c32417066","parsed":null}}},{"key":"uref-961e8aaa8303b061e55bc0e605935b2e8c438223b981feb0e546fef53b194838-000","transform":"Identity"},{"key":"deploy-19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2","transform":{"WriteDeployInfo":{"deploy_hash":"19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2","transfers":[],"from":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","source":"uref-c378999daa8de52f9c7a7f856d2fdbe962f754376cfbe923e61ff787307a507e-007","gas":"238706167853"}}},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"hash-5d0e804990367d4561fb770c045a0148af2bc52f3643e695bf78559910d4c77e","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":"Identity"},{"key":"hash-adc9ed25a5a0afcb2b3d229b2d226dc3a5ff5d29e9dbd2acccf728c835152225","transform":"Identity"},{"key":"account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f","transform":"Identity"},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"hash-1a6ac00b5ff7022b43b7bae35847f83a2a674318b01cbd34e17b003dd2b5552e","transform":"Identity"},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":"Identity"},{"key":"balance-c378999daa8de52f9c7a7f856d2fdbe962f754376cfbe923e61ff787307a507e","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":{"WriteCLValue":{"cl_type":"U512","bytes":"057f7cc49437","parsed":"238719106175"}}},{"key":"balance-c378999daa8de52f9c7a7f856d2fdbe962f754376cfbe923e61ff787307a507e","transform":{"AddUInt512":"1280893825"}},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"hash-1a6ac00b5ff7022b43b7bae35847f83a2a674318b01cbd34e17b003dd2b5552e","transform":"Identity"},{"key":"hash-15020e0558e72304ddf7f3e2f57ac909fe11f871d5354ffb4c7050ecbbb5e9a0","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":"Identity"},{"key":"balance-f6b1f72830701f3f8d5138532cd050e6a2aeeec0f0a4ba4ef0a1f083fc9b0ec6","transform":"Identity"},{"key":"balance-8d23f7abd1cf4305ee60ef0ad383c2aa0ac7956ca7e55c59e87a7010b0699ee3","transform":{"WriteCLValue":{"cl_type":"U512","bytes":"00","parsed":"0"}}},{"key":"balance-f6b1f72830701f3f8d5138532cd050e6a2aeeec0f0a4ba4ef0a1f083fc9b0ec6","transform":{"AddUInt512":"238719106175"}}]},"transfers":[],"cost":"238706167853"}}}}
id:272545"#;

        let target_deploy_hash = Some(deploy_hash);

        // Act
        let result = deploy_watcher.process_events(message, target_deploy_hash);

        // Assert
        assert!(result.is_some());
        let results = result.unwrap();
        assert_eq!(results.len(), 1);

        let event_parse_result = &results[0];
        assert!(event_parse_result.err.is_none());

        let body = event_parse_result.body.as_ref().unwrap();
        let deploy_processed = body.deploy_processed.as_ref().unwrap();
        assert_eq!(deploy_processed.deploy_hash, deploy_hash);
    }

    #[tokio::test]
    async fn test_start_timeout() {
        // Arrange
        let deploy_watcher = DeployWatcher::new(DEFAULT_EVENT_ADDRESS.to_string(), Some(1));

        // Act
        let result = deploy_watcher.start().await;

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
        let deploy_watcher = DeployWatcher::new(DEFAULT_EVENT_ADDRESS.to_string(), None);
        assert!(*deploy_watcher.active.borrow());

        // Act
        deploy_watcher.stop();

        // Assert
        assert!(!(*deploy_watcher.active.borrow()));
    }

    #[test]
    fn test_subscribe() {
        // Arrange
        let mut deploy_watcher = DeployWatcher::new(DEFAULT_EVENT_ADDRESS.to_string(), None);
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";

        // Create a subscription
        let subscription =
            DeploySubscription::new(deploy_hash.to_string(), EventHandlerFn::default());

        // Act
        let result = deploy_watcher.subscribe(vec![subscription]);

        // Assert
        assert!(result.is_ok());

        // Try subscribing to the same deploy hash again
        let duplicate_subscription =
            DeploySubscription::new(deploy_hash.to_string(), EventHandlerFn::default());
        let result_duplicate = deploy_watcher.subscribe(vec![duplicate_subscription]);

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
        let mut deploy_watcher = DeployWatcher::new(DEFAULT_EVENT_ADDRESS.to_string(), None);
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";

        // Subscribe to a deploy hash
        let deploy_hash_to_subscribe = deploy_hash.to_string();
        let subscription =
            DeploySubscription::new(deploy_hash_to_subscribe.clone(), EventHandlerFn::default());
        let _ = deploy_watcher.subscribe(vec![subscription]);

        // Assert that the deploy hash is initially subscribed
        assert!(deploy_watcher
            .deploy_subscriptions
            .iter()
            .any(|s| s.deploy_hash == deploy_hash_to_subscribe));

        // Act
        deploy_watcher.unsubscribe(deploy_hash_to_subscribe.clone());

        // Assert that the deploy hash is unsubscribed after calling unsubscribe
        assert!(!deploy_watcher
            .deploy_subscriptions
            .iter()
            .any(|s| s.deploy_hash == deploy_hash_to_subscribe));
    }

    #[test]
    fn test_sdk_watch_deploy_retunrs_instance() {
        // Arrange
        let sdk = SDK::new(None, None);
        let events_url = DEFAULT_EVENT_ADDRESS;
        let timeout_duration = 5000;

        // Act
        let deploy_watcher = sdk.watch_deploy(events_url, Some(timeout_duration));

        // Assert
        assert_eq!(deploy_watcher.events_url, events_url);
        assert_eq!(deploy_watcher.deploy_subscriptions.len(), 0);
        assert!(*deploy_watcher.active.borrow());
        assert_eq!(
            deploy_watcher.timeout_duration,
            Duration::milliseconds(timeout_duration.try_into().unwrap())
        );
    }

    #[tokio::test]
    async fn test_wait_deploy_timeout() {
        // Arrange
        let sdk = SDK::new(None, None);
        let events_url = DEFAULT_EVENT_ADDRESS;
        let deploy_hash = "19dbf9bdcd821e55392393c74c86deede02d9434d62d0bc72ab381ce7ea1c4f2";
        let timeout_duration = Some(5000);

        // Act
        let result = sdk
            .wait_deploy(events_url, deploy_hash, timeout_duration)
            .await;

        // Assert
        assert!(result.is_ok());
        let event_parse_result = result.unwrap();
        assert!(event_parse_result.err.is_some());
        assert_eq!(event_parse_result.err, Some("Timeout expired".to_string()));
    }
}
