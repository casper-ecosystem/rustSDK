use crate::{helpers::get_str_or_default, types::deploy_params::args_simple::ArgsSimple};
use casper_client::cli::PaymentStrParams as _PaymentStrParams;
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
    payment_version: OnceCell<String>,
    payment_entry_point: OnceCell<String>,
}

#[wasm_bindgen]
impl PaymentStrParams {
    #[allow(clippy::too_many_arguments)]
    #[wasm_bindgen(constructor)]
    pub fn new(
        payment_amount: Option<String>,
        payment_hash: Option<String>,
        payment_name: Option<String>,
        payment_package_hash: Option<String>,
        payment_package_name: Option<String>,
        payment_path: Option<String>,
        payment_args_simple: Option<Array>,
        payment_args_json: Option<String>,
        payment_version: Option<String>,
        payment_entry_point: Option<String>,
    ) -> Self {
        let payment_params = PaymentStrParams::default();
        if let Some(payment_amount) = payment_amount {
            payment_params.set_payment_amount(&payment_amount);
        };
        if let Some(payment_hash) = payment_hash {
            payment_params.set_payment_hash(&payment_hash);
        };
        if let Some(payment_name) = payment_name {
            payment_params.set_payment_name(&payment_name);
        };
        if let Some(payment_package_hash) = payment_package_hash {
            payment_params.set_payment_package_hash(&payment_package_hash);
        };
        if let Some(payment_package_name) = payment_package_name {
            payment_params.set_payment_package_name(&payment_package_name);
        };
        if let Some(payment_path) = payment_path {
            payment_params.set_payment_path(&payment_path);
        };
        if let Some(payment_args_simple) = payment_args_simple {
            payment_params.set_payment_args_simple(payment_args_simple);
        };
        if let Some(payment_args_json) = payment_args_json {
            payment_params.set_payment_args_json(&payment_args_json);
        };
        if let Some(payment_version) = payment_version {
            payment_params.set_payment_version(&payment_version);
        };
        if let Some(payment_entry_point) = payment_entry_point {
            payment_params.set_payment_entry_point(&payment_entry_point);
        };

        payment_params
    }

    #[wasm_bindgen(getter)]
    pub fn payment_amount(&self) -> Option<String> {
        self.payment_amount.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_amount(&self, payment_amount: &str) {
        self.payment_amount.set(payment_amount.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_hash(&self) -> Option<String> {
        self.payment_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_hash(&self, payment_hash: &str) {
        self.payment_hash.set(payment_hash.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_name(&self) -> Option<String> {
        self.payment_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_name(&self, payment_name: &str) {
        self.payment_name.set(payment_name.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_package_hash(&self) -> Option<String> {
        self.payment_package_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_package_hash(&self, payment_package_hash: &str) {
        self.payment_package_hash
            .set(payment_package_hash.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_package_name(&self) -> Option<String> {
        self.payment_package_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_package_name(&self, payment_package_name: &str) {
        self.payment_package_name
            .set(payment_package_name.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_path(&self) -> Option<String> {
        self.payment_path.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_path(&self, payment_path: &str) {
        self.payment_path.set(payment_path.to_string()).unwrap();
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
    pub fn set_payment_args_json(&self, payment_args_json: &str) {
        self.payment_args_json
            .set(payment_args_json.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_version(&self) -> Option<String> {
        self.payment_version.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_version(&self, payment_version: &str) {
        self.payment_version
            .set(payment_version.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_entry_point(&self) -> Option<String> {
        self.payment_entry_point.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_entry_point(&self, payment_entry_point: &str) {
        self.payment_entry_point
            .set(payment_entry_point.to_string())
            .unwrap();
    }
}

// Convert PaymentStrParams to casper_client::cli::PaymentStrParams
pub fn payment_str_params_to_casper_client(
    payment_params: &PaymentStrParams,
) -> _PaymentStrParams<'_> {
    let payment_args_simple: Vec<&str> = payment_params
        .payment_args_simple
        .get()
        .map_or_else(Vec::new, |args_simple| {
            args_simple.args().iter().map(String::as_str).collect()
        });

    if let Some(payment_hash) = payment_params.payment_hash.get() {
        return _PaymentStrParams::with_hash(
            payment_hash.as_str(),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    if let Some(payment_path) = payment_params.payment_path.get() {
        return _PaymentStrParams::with_path(
            payment_path.as_str(),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    if let Some(payment_name) = payment_params.payment_name.get() {
        return _PaymentStrParams::with_name(
            payment_name.as_str(),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    if let Some(payment_package_hash) = payment_params.payment_package_hash.get() {
        return _PaymentStrParams::with_package_hash(
            payment_package_hash.as_str(),
            get_str_or_default(payment_params.payment_version.get()),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    if let Some(payment_package_name) = payment_params.payment_package_name.get() {
        return _PaymentStrParams::with_package_name(
            payment_package_name.as_str(),
            get_str_or_default(payment_params.payment_version.get()),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    if let Some(payment_package_name) = payment_params.payment_entry_point.get() {
        return _PaymentStrParams::with_package_name(
            payment_package_name.as_str(),
            get_str_or_default(payment_params.payment_version.get()),
            get_str_or_default(payment_params.payment_entry_point.get()),
            payment_args_simple,
            get_str_or_default(payment_params.payment_args_json.get()),
        );
    }

    // Default to the Payment amount
    _PaymentStrParams::with_amount(get_str_or_default(payment_params.payment_amount.get()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_payment_str_params_to_casper_client() {
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("100");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_amount: \"100\""));

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_hash("hash_value");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_hash: \"hash_value\""));

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_name("name_value");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_name: \"name_value\""));

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_package_hash("package_hash_value");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_package_hash: \"package_hash_value\""));

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_package_name("package_name_value");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_package_name: \"package_name_value\""));

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_path("path_value");
        let result = payment_str_params_to_casper_client(&payment_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("payment_path: \"path_value\""));

        // TODO Find alternative as no setter in client
    }
}
