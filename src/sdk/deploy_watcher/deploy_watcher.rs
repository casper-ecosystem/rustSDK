use crate::{debug::error, SDK};
#[cfg(not(target_arch = "wasm32"))]
use futures_util::StreamExt;
use gloo_events::EventListener;
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use serde_json::Value;
use std::{
    cell::RefCell,
    fmt,
    rc::Rc,
    sync::{Arc, Mutex},
};
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen_futures::{future_to_promise, JsFuture};
#[cfg(target_arch = "wasm32")]
use web_sys::{ReadableStream, Request, RequestInit, Response};

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "watchDeploy")]
    pub fn watch_deploy_js_alias(&self, events_url: String) -> DeployWatcher {
        self.watch_deploy(events_url)
    }
}

#[wasm_bindgen]
impl SDK {
    pub fn watch_deploy(&self, events_url: String) -> DeployWatcher {
        DeployWatcher::new(events_url)
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

impl DeployWatcher {
    #[cfg(target_arch = "wasm32")]
    fn decode_ascii_to_string(data: &serde_json::Value) -> Option<String> {
        if let Some(obj) = data.as_object() {
            let mut decoded_str = String::new();
            for i in 0.. {
                if let Some(code) = obj.get(&i.to_string()) {
                    if let Some(num) = code.as_u64() {
                        decoded_str.push(num as u8 as char);
                    } else {
                        // Return None if encountered non-numeric value
                        return None;
                    }
                } else {
                    // Break if key not found
                    break;
                }
            }
            Some(decoded_str)
        } else {
            None
        }
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

    #[wasm_bindgen]
    pub fn unsubscribe(&mut self, deploy_hash: String) {
        //  log("unsubscribe");
        self.deploy_subscriptions
            .retain(|s| s.deploy_hash != deploy_hash);
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

#[wasm_bindgen]
impl DeployWatcher {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen]
    pub fn start(self) {
        *self.active.borrow_mut() = true;
        // log("start wasm32");
        // log(&self.events_url);
        let request = Request::new_with_str(&self.events_url).unwrap();
        let mut init = RequestInit::new();
        init.method("GET");
        // log("before response");

        let deploy_subscriptions = Rc::new(self.deploy_subscriptions.clone());
        let deploy_watcher = Rc::new(RefCell::new(self.clone()));

        let future = async move {
            let response = JsFuture::from(
                web_sys::window()
                    .unwrap()
                    .fetch_with_request_and_init(&request, &init),
            )
            .await?;

            // log("after response");

            let response: Response = response.dyn_into().unwrap();
            if response.ok() {
                // log("response ok");
                let stream: ReadableStream = response.body().unwrap();
                let reader = web_sys::ReadableStreamDefaultReader::new(&stream).unwrap();
                loop {
                    // log("chunk received");
                    let chunk = JsFuture::from(reader.read()).await?;
                    let json_data: Value = JsValue::into_serde(&chunk).unwrap();
                    // log("json_data");
                    let this_clone = Rc::clone(&deploy_watcher);
                    let deploy_watcher_clone = this_clone.borrow_mut().clone();
                    if !*deploy_watcher_clone.active.borrow() {
                        // Check if the deploy watcher is no longer active
                        break Ok(JsValue::undefined()); // Exit the loop if not active
                    }
                    deploy_watcher_clone
                        .process_events(Rc::clone(&deploy_subscriptions), json_data.clone());
                }
            } else {
                error("Failed to fetch stream");
                Err(JsValue::undefined())
            }
        };

        let _ = future_to_promise(future);
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen]
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

    #[cfg(target_arch = "wasm32")]
    fn process_events(mut self, subscriptions: Rc<Vec<DeploySubscription>>, json_data: Value) {
        // log("process_events");
        if let Value::Object(ref obj) = json_data {
            // log("obj");
            if let Some(value) = obj.get("value") {
                // log("value");
                // log(&value.to_string());
                let decoded_str = if let Some(decoded_str) = Self::decode_ascii_to_string(value) {
                    decoded_str.to_string()
                } else {
                    error("Failed to decode ASCII to string.");
                    return;
                };

                let data_stream = Self::extract_data_stream(&decoded_str);
                // log(&data_stream.len().to_string());

                for data_item in data_stream {
                    // log("data item");
                    let trimmed_item = data_item.trim();
                    // Check if trimmed_item contains "DeployProcessed"
                    if !trimmed_item.contains("DeployProcessed") {
                        continue; // Skip to the next iteration if "DeployProcessed" is not found
                    }
                    //  log(trimmed_item);

                    if let Ok(parsed_json) = serde_json::from_str::<serde_json::Value>(trimmed_item)
                    {
                        // log("Parsed JSON");
                        let deploy = &parsed_json["DeployProcessed"];
                        if let Some(deploy_processed) = deploy.as_object() {
                            // log("DeployProcessed");
                            if let Some(deploy_hash) = deploy_processed["deploy_hash"].as_str() {
                                // log("deploy_hash");
                                for subscription in subscriptions.iter() {
                                    if deploy_hash == subscription.deploy_hash {
                                        // log(&subscription.deploy_hash);

                                        let this = JsValue::null();
                                        let args = js_sys::Array::new();

                                        let deploy_processed: Option<DeployProcessed> =
                                            serde_json::from_value(deploy.clone()).ok();

                                        // Create the Body struct with deploy_processed
                                        let body = Body { deploy_processed };

                                        // Create the EventParseResult with body and no error
                                        let event_parse_result =
                                            EventParseResult { err: None, body };

                                        args.push(
                                            &JsValue::from_serde(&event_parse_result).unwrap(),
                                        );
                                        let event_handler = &subscription.event_handler_fn;
                                        event_handler.apply(&this, &args).unwrap();
                                        self.unsubscribe(deploy_hash.to_string());
                                    }
                                }
                                self.stop();
                            }
                        }
                    } else {
                        error("Failed to parse JSON data.");
                    }
                }
            }
        }
    }
}

impl DeployWatcher {
    #[cfg(not(target_arch = "wasm32"))]
    pub async fn start(self) -> Result<(), String> {
        *self.active.borrow_mut() = true;
        // log("start non wasm32");

        let client = reqwest::Client::new();
        let url = self.events_url.clone();

        let deploy_subscriptions = Rc::new(self.deploy_subscriptions.clone());
        let deploy_watcher = Rc::new(RefCell::new(self.clone()));

        let response = match client.get(&url).send().await {
            Ok(res) => res,
            Err(err) => {
                let err = err.to_string();
                error(&err);
                return Err(err);
            }
        };
        // log("after response"); // Use println for logging in the console

        if response.status().is_success() {
            let mut bytes_stream = response.bytes_stream();
            while let Some(chunk) = bytes_stream.next().await {
                match chunk {
                    Ok(bytes) => {
                        // Process the chunk of data
                        // log(&format!("Chunk received: {:?}", bytes));
                        let this_clone = Rc::clone(&deploy_watcher);
                        let deploy_watcher_clone = this_clone.borrow_mut().clone();
                        if !*deploy_watcher_clone.active.borrow() {
                            // Check if the deploy watcher is no longer active
                            return Ok(());
                        }
                        if let Ok(chunk_str) = std::str::from_utf8(&bytes) {
                            deploy_watcher_clone
                                .process_events(Rc::clone(&deploy_subscriptions), chunk_str);
                        } else {
                            error("Error decoding UTF-8 data");
                        }
                    }
                    Err(err) => {
                        error(&format!("Error reading chunk: {}", err));
                        continue;
                    }
                }
            }
        } else {
            error("Failed to fetch stream");
            return Err("Failed to fetch stream".to_string());
        }
        Ok(())
    }

    #[cfg(not(target_arch = "wasm32"))]
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

    #[cfg(not(target_arch = "wasm32"))]
    fn process_events(mut self, subscriptions: Rc<Vec<DeploySubscription>>, decoded_str: &str) {
        // log("process_events");

        let data_stream = Self::extract_data_stream(decoded_str);

        for data_item in data_stream {
            // log("data item");
            let trimmed_item = data_item.trim();
            // Check if trimmed_item contains "DeployProcessed"
            if !trimmed_item.contains("DeployProcessed") {
                continue; // Skip to the next iteration if "DeployProcessed" is not found
            }
            // log(trimmed_item);

            if let Ok(parsed_json) = serde_json::from_str::<serde_json::Value>(trimmed_item) {
                // log("Parsed JSON");
                let deploy = &parsed_json["DeployProcessed"];
                if let Some(deploy_processed) = deploy.as_object() {
                    // log("DeployProcessed");
                    if let Some(deploy_hash) = deploy_processed["deploy_hash"].as_str() {
                        // log("deploy_hash");
                        for subscription in subscriptions.iter() {
                            if deploy_hash == subscription.deploy_hash {
                                // log(&subscription.deploy_hash);

                                let deploy_processed: Option<DeployProcessed> =
                                    serde_json::from_value(deploy.clone()).ok();

                                // Create the Body struct with deploy_processed
                                let body = Body { deploy_processed };

                                // Create the EventParseResult with body and no error
                                let event_parse_result = EventParseResult { err: None, body };
                                let event_handler = &subscription.event_handler_fn;
                                event_handler.call(event_parse_result);
                                self.unsubscribe(deploy_hash.to_string());
                            }
                        }
                        self.stop();
                    }
                }
            } else {
                error("Failed to parse JSON data.");
            }
        }
    }
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

impl DeploySubscription {
    #[cfg(not(target_arch = "wasm32"))]
    pub fn new(deploy_hash: String, event_handler_fn: EventHandlerFn) -> Self {
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
    pub err: Option<String>,
    pub body: Body,
}
