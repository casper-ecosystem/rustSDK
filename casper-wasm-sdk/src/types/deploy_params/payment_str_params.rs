use super::args_simple::ArgsSimple;
use crate::helpers::get_str_or_default;
use js_sys::Array;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Default, Debug, Clone)]
pub struct PaymentStrParams {
    payment_amount: OnceCell<String>,
    payment_hash: OnceCell<String>,
    payment_name: OnceCell<String>,
    payment_package_hash: OnceCell<String>,
    payment_package_name: OnceCell<String>,
    payment_path: OnceCell<String>,
    payment_args_simple: OnceCell<ArgsSimple>,
    payment_args_json: OnceCell<String>,
    payment_args_complex: OnceCell<String>,
    payment_version: OnceCell<String>,
    payment_entry_point: OnceCell<String>,
}

#[wasm_bindgen]
impl PaymentStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new() -> PaymentStrParams {
        PaymentStrParams::default()
    }

    #[wasm_bindgen(getter)]
    pub fn payment_amount(&self) -> Option<String> {
        self.payment_amount.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_amount(&self, payment_amount: String) {
        self.payment_amount.set(payment_amount).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_hash(&self) -> Option<String> {
        self.payment_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_hash(&self, payment_hash: String) {
        self.payment_hash.set(payment_hash).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_name(&self) -> Option<String> {
        self.payment_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_name(&self, payment_name: String) {
        self.payment_name.set(payment_name).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_package_hash(&self) -> Option<String> {
        self.payment_package_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_package_hash(&self, payment_package_hash: String) {
        self.payment_package_hash.set(payment_package_hash).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_package_name(&self) -> Option<String> {
        self.payment_package_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_package_name(&self, payment_package_name: String) {
        self.payment_package_name.set(payment_package_name).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_path(&self) -> Option<String> {
        self.payment_path.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_path(&self, payment_path: String) {
        self.payment_path.set(payment_path).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_args_simple(&self) -> Option<Array> {
        let args_simple = self.payment_args_simple.get()?;
        let array: Array = args_simple.args().iter().map(JsValue::from).collect();
        Some(array)
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_args_simple(&self, payment_args_simple: Array) {
        let args_simple: ArgsSimple = payment_args_simple.into_iter().collect();
        self.payment_args_simple.set(args_simple).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_args_json(&self) -> Option<String> {
        self.payment_args_json.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_args_json(&self, payment_args_json: String) {
        self.payment_args_json.set(payment_args_json).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_args_complex(&self) -> Option<String> {
        self.payment_args_complex.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_args_complex(&self, payment_args_complex: String) {
        self.payment_args_complex.set(payment_args_complex).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_version(&self) -> Option<String> {
        self.payment_version.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_version(&self, payment_version: String) {
        self.payment_version.set(payment_version).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_entry_point(&self) -> Option<String> {
        self.payment_entry_point.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_entry_point(&self, payment_entry_point: String) {
        self.payment_entry_point.set(payment_entry_point).unwrap();
    }
}

// Convert PaymentStrParams to casper_client::cli::PaymentStrParams
pub fn payment_str_params_to_casper_client(
    payment_params: &PaymentStrParams,
) -> casper_client::cli::PaymentStrParams<'_> {
    let payment_args_simple: Vec<&str> = payment_params
        .payment_args_simple
        .get()
        .map_or_else(Vec::new, |args_simple| {
            args_simple.args().iter().map(String::as_str).collect()
        });

    // Use the appropriate `with_` method based on available fields as PaymentStrParams is private
    if let Some(payment_hash) = payment_params.payment_hash.get() {
        return casper_client::cli::PaymentStrParams::with_hash(
            payment_hash.as_str(),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
            get_str_or_default(payment_params.payment_args_complex.get()),
        );
    }

    if let Some(payment_name) = payment_params.payment_name.get() {
        return casper_client::cli::PaymentStrParams::with_name(
            payment_name.as_str(),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
            get_str_or_default(payment_params.payment_args_complex.get()),
        );
    }

    if let Some(payment_package_hash) = payment_params.payment_package_hash.get() {
        return casper_client::cli::PaymentStrParams::with_package_hash(
            payment_package_hash.as_str(),
            get_str_or_default(payment_params.payment_version.get()),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
            get_str_or_default(payment_params.payment_args_complex.get()),
        );
    }

    if let Some(payment_package_name) = payment_params.payment_package_name.get() {
        return casper_client::cli::PaymentStrParams::with_package_name(
            payment_package_name.as_str(),
            get_str_or_default(payment_params.payment_version.get()),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
            get_str_or_default(payment_params.payment_args_complex.get()),
        );
    }

    // Default to the Payment amount
    casper_client::cli::PaymentStrParams::with_amount(get_str_or_default(
        payment_params.payment_amount.get(),
    ))
}