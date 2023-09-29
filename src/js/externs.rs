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
