use js_sys::Promise;
use wasm_bindgen::prelude::*;

/// Logs a message, prefixing it with "log wasm" and sends it to the console in JavaScript when running in a WebAssembly environment.
/// When running outside WebAssembly, it prints the message to the standard output.
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_with_prefix(s: &str);
}

/// Logs a message, prefixing it with "log wasm" and sends it to the console in JavaScript when running in a WebAssembly environment.
/// When running outside WebAssembly, it prints the message to the standard output.
#[allow(dead_code)]
pub(crate) fn log(s: &str) {
    let prefixed_s = format!("log wasm {}", s);
    #[cfg(target_arch = "wasm32")]
    log_with_prefix(&prefixed_s);
    #[cfg(not(target_arch = "wasm32"))]
    println!("{}", prefixed_s);
}

/// Logs an error message, prefixing it with "error wasm" and sends it to the console in JavaScript when running in a WebAssembly environment.
/// When running outside WebAssembly, it prints the error message to the standard output.
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console, js_name = error)]
    fn error_with_prefix(s: &str);
}

/// Logs an error message, prefixing it with "error wasm" and sends it to the console in JavaScript when running in a WebAssembly environment.
/// When running outside WebAssembly, it prints the error message to the standard output.
#[allow(dead_code)]
pub(crate) fn error(s: &str) {
    let prefixed_s = format!("error wasm {}", s);
    #[cfg(target_arch = "wasm32")]
    error_with_prefix(&prefixed_s);
    #[cfg(not(target_arch = "wasm32"))]
    println!("{}", prefixed_s);
}

#[wasm_bindgen]
extern "C" {
    pub(crate) type CasperWalletProvider;

    #[wasm_bindgen(js_name = CasperWalletProvider)]
    pub(crate) fn casper_wallet_provider() -> CasperWalletProvider;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn requestConnection(this: &CasperWalletProvider) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn sign(
        this: &CasperWalletProvider,
        deploy: &str,
        signing_public_key_hex: &str,
    ) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn signMessage(
        this: &CasperWalletProvider,
        message: &str,
        signing_public_key_hex: &str,
    ) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn requestSwitchAccount(this: &CasperWalletProvider) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn disconnectFromSite(this: &CasperWalletProvider) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn isConnected(this: &CasperWalletProvider) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn getActivePublicKey(this: &CasperWalletProvider) -> Result<Promise, JsValue>;

    #[wasm_bindgen(method, catch, js_class = "CasperWalletProvider")]
    pub(crate) fn getVersion(this: &CasperWalletProvider) -> Result<Promise, JsValue>;
}
