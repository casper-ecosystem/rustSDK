use crate::helpers::get_current_timestamp;
use crate::helpers::get_str_or_default;
use crate::helpers::get_ttl_or_default;
use crate::types::deploy_params::args_simple::ArgsSimple;
use casper_client::cli::TransactionStrParams as _TransactionStrParams;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct TransactionStrParams {
    secret_key: OnceCell<String>,
    timestamp: OnceCell<String>,
    ttl: OnceCell<String>,
    chain_name: OnceCell<String>,
    initiator_addr: OnceCell<String>,
    session_args_simple: OnceCell<ArgsSimple>,
    session_args_json: OnceCell<String>,
    pricing_mode: OnceCell<String>,
    output_path: OnceCell<String>,
    payment_amount: OnceCell<String>,
    gas_price_tolerance: OnceCell<String>,
    receipt: OnceCell<String>,
    standard_payment: OnceCell<bool>,
}

impl Default for TransactionStrParams {
    fn default() -> Self {
        TransactionStrParams {
            secret_key: OnceCell::new(),
            timestamp: OnceCell::new(),
            ttl: OnceCell::new(),
            chain_name: OnceCell::new(),
            initiator_addr: OnceCell::new(),
            session_args_simple: OnceCell::new(),
            session_args_json: OnceCell::new(),
            pricing_mode: OnceCell::new(),
            output_path: OnceCell::new(),
            payment_amount: OnceCell::new(),
            gas_price_tolerance: OnceCell::new(),
            receipt: OnceCell::new(),
            standard_payment: OnceCell::new(),
        }
    }
}

#[allow(clippy::too_many_arguments)]
#[wasm_bindgen]
impl TransactionStrParams {
    #[wasm_bindgen(constructor)]
    pub fn new(
        secret_key: Option<String>,
        timestamp: Option<String>,
        ttl: Option<String>,
        chain_name: &str,
        initiator_addr: Option<String>,
        session_args_simple: Option<Vec<String>>,
        session_args_json: Option<String>,
        pricing_mode: Option<String>,
        output_path: Option<String>,
        payment_amount: Option<String>,
        gas_price_tolerance: Option<String>,
        receipt: Option<String>,
        standard_payment: Option<bool>,
    ) -> Self {
        let mut transaction_params = TransactionStrParams::default();
        if let Some(secret_key) = secret_key {
            transaction_params.set_secret_key(&secret_key);
        };
        transaction_params.set_timestamp(timestamp);
        transaction_params.set_ttl(ttl);
        transaction_params.set_chain_name(chain_name);
        if let Some(initiator_addr) = initiator_addr {
            transaction_params.set_initiator_addr(&initiator_addr);
        }
        if let Some(session_args_simple) = session_args_simple {
            transaction_params.set_session_args_simple(session_args_simple);
        }
        if let Some(session_args_json) = session_args_json {
            transaction_params.set_session_args_json(&session_args_json);
        }
        if let Some(pricing_mode) = pricing_mode {
            transaction_params.set_pricing_mode(&pricing_mode);
        }
        if let Some(output_path) = output_path {
            transaction_params.set_output_path(&output_path);
        }
        if let Some(payment_amount) = payment_amount {
            transaction_params.set_payment_amount(&payment_amount);
        }
        if let Some(gas_price_tolerance) = gas_price_tolerance {
            transaction_params.set_gas_price_tolerance(&gas_price_tolerance);
        };
        if let Some(receipt) = receipt {
            transaction_params.set_receipt(&receipt);
        }
        if let Some(standard_payment) = standard_payment {
            transaction_params.set_standard_payment(standard_payment);
        }
        transaction_params
    }

    // Getter and setter for secret_key field
    #[wasm_bindgen(getter)]
    pub fn secret_key(&self) -> Option<String> {
        self.secret_key.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_secret_key(&self, secret_key: &str) {
        self.secret_key.set(secret_key.to_string()).unwrap();
    }

    // Getter and setter for timestamp field
    #[wasm_bindgen(getter)]
    pub fn timestamp(&self) -> Option<String> {
        self.timestamp.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_timestamp(&self, timestamp: Option<String>) {
        if let Some(mut timestamp) = timestamp {
            if timestamp.is_empty() {
                timestamp = get_current_timestamp(None);
            }
            self.timestamp.set(timestamp.to_string()).unwrap();
        } else {
            let timestamp = get_current_timestamp(timestamp);
            self.timestamp.set(timestamp).unwrap();
        };
    }

    #[wasm_bindgen(js_name = "setDefaultTimestamp")]
    pub fn set_default_timestamp(&self) {
        let current_timestamp = get_current_timestamp(None);
        self.timestamp.set(current_timestamp).unwrap();
    }

    // Getter and setter for ttl field
    #[wasm_bindgen(getter)]
    pub fn ttl(&self) -> Option<String> {
        self.ttl.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_ttl(&self, ttl: Option<String>) {
        if let Some(mut ttl) = ttl {
            if ttl.is_empty() {
                ttl = get_ttl_or_default(None);
            }
            self.ttl.set(ttl.to_string()).unwrap();
        } else {
            let ttl = get_ttl_or_default(ttl.as_deref());
            self.ttl.set(ttl).unwrap();
        };
    }

    #[wasm_bindgen(js_name = "setDefaultTTL")]
    pub fn set_default_ttl(&self) {
        let ttl = get_ttl_or_default(None);
        self.ttl.set(ttl).unwrap();
    }

    // Getter and setter for chain_name field
    #[wasm_bindgen(getter)]
    pub fn chain_name(&self) -> Option<String> {
        self.chain_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_chain_name(&self, chain_name: &str) {
        self.chain_name.set(chain_name.to_string()).unwrap();
    }

    // Getter and setter for initiator_addr field
    #[wasm_bindgen(getter)]
    pub fn initiator_addr(&self) -> Option<String> {
        self.initiator_addr.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_initiator_addr(&self, initiator_addr: &str) {
        self.initiator_addr.set(initiator_addr.to_string()).unwrap();
    }

    // Getter and setter for session_args_simple field
    #[wasm_bindgen(getter)]
    pub fn session_args_simple(&self) -> Option<ArgsSimple> {
        self.session_args_simple.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_simple(&mut self, session_args_simple: Vec<String>) {
        let args_simple = ArgsSimple::from(session_args_simple);
        self.session_args_simple.set(args_simple).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn session_args_json(&self) -> Option<String> {
        self.session_args_json.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_json(&self, session_args_json: &str) {
        self.session_args_json
            .set(session_args_json.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn pricing_mode(&self) -> Option<String> {
        self.pricing_mode.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_pricing_mode(&self, pricing_mode: &str) {
        self.pricing_mode.set(pricing_mode.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn output_path(&self) -> Option<String> {
        self.output_path.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_output_path(&self, output_path: &str) {
        self.output_path.set(output_path.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn payment_amount(&self) -> Option<String> {
        self.payment_amount.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_payment_amount(&self, payment_amount: &str) {
        self.payment_amount.set(payment_amount.to_string()).unwrap();
    }

    // Getter and setter for gas_price_tolerance field
    #[wasm_bindgen(getter)]
    pub fn gas_price_tolerance(&self) -> Option<String> {
        self.gas_price_tolerance.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_gas_price_tolerance(&self, gas_price_tolerance: &str) {
        self.gas_price_tolerance
            .set(gas_price_tolerance.to_string())
            .unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn receipt(&self) -> Option<String> {
        self.receipt.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_receipt(&self, receipt: &str) {
        self.receipt.set(receipt.to_string()).unwrap();
    }

    #[wasm_bindgen(getter)]
    pub fn standard_payment(&self) -> Option<bool> {
        self.standard_payment.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_standard_payment(&self, standard_payment: bool) {
        self.standard_payment.set(standard_payment).unwrap();
    }
}

// impl TransactionStrParams {
//     pub fn set_session_args(&mut self, session_args_simple: Vec<String>) {
//         let args_simple = ArgsSimple::from(session_args_simple);
//         self.session_args_simple.set(args_simple).unwrap();
//     }
// }

// Convert TransactionStrParams to casper_client::cli::TransactionStrParams
pub fn transaction_str_params_to_casper_client(
    transaction_params: &TransactionStrParams,
) -> _TransactionStrParams<'_> {
    let session_args_simple: Vec<&str> = transaction_params
        .session_args_simple
        .get()
        .map_or_else(Vec::new, |args_simple| {
            args_simple.args().iter().map(String::as_str).collect()
        });

    let standard_payment_str = match transaction_params.standard_payment.get() {
        Some(true) => "true",
        _ => "false",
    };

    if transaction_params.timestamp.get().is_none() {
        transaction_params.set_default_timestamp();
    }
    if transaction_params.ttl.get().is_none() {
        transaction_params.set_default_ttl();
    }
    if transaction_params.pricing_mode.get().is_none() {
        transaction_params.set_pricing_mode("classic");
    }
    if transaction_params.gas_price_tolerance.get().is_none() {
        transaction_params.set_gas_price_tolerance("1");
    }
    if transaction_params.standard_payment.get().is_none() {
        transaction_params.set_standard_payment(false);
    }

    _TransactionStrParams {
        secret_key: get_str_or_default(transaction_params.secret_key.get()),
        timestamp: get_str_or_default(transaction_params.timestamp.get()),
        ttl: get_str_or_default(transaction_params.ttl.get()),
        chain_name: get_str_or_default(transaction_params.chain_name.get()),
        initiator_addr: get_str_or_default(transaction_params.initiator_addr.get()).to_string(),
        session_args_simple,
        session_args_json: get_str_or_default(transaction_params.session_args_json.get()),
        pricing_mode: get_str_or_default(transaction_params.pricing_mode.get()),
        output_path: get_str_or_default(transaction_params.output_path.get()),
        payment_amount: get_str_or_default(transaction_params.payment_amount.get()),
        gas_price_tolerance: get_str_or_default(transaction_params.gas_price_tolerance.get()),
        receipt: get_str_or_default(transaction_params.receipt.get()),
        standard_payment: standard_payment_str,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_transaction_str_params_to_casper_client() {
        let secret_key = OnceCell::new();
        secret_key.set("secret_key".to_string()).unwrap();

        let timestamp = OnceCell::new();
        timestamp.set("1234567890".to_string()).unwrap();

        let ttl = OnceCell::new();
        ttl.set("30m".to_string()).unwrap();

        let chain_name = OnceCell::new();
        chain_name.set("test_chain".to_string()).unwrap();

        let initiator_addr = OnceCell::new();
        initiator_addr.set("account_id".to_string()).unwrap();

        let session_args_simple = OnceCell::new();
        let args = ArgsSimple::from(vec!["simple".to_string()]);
        session_args_simple.set(args).unwrap();

        let session_args_json = OnceCell::new();
        session_args_json.set("json".to_string()).unwrap();

        let pricing_mode = OnceCell::new();
        pricing_mode.set("mode".to_string()).unwrap();

        let output_path = OnceCell::new();
        output_path.set("path".to_string()).unwrap();

        let payment_amount = OnceCell::new();
        payment_amount.set("amount".to_string()).unwrap();

        let gas_price_tolerance = OnceCell::new();
        gas_price_tolerance.set("1".to_string()).unwrap();

        let receipt = OnceCell::new();
        receipt.set("receipt".to_string()).unwrap();

        let standard_payment = OnceCell::new();
        standard_payment.set(true).unwrap();

        let transaction_params = TransactionStrParams {
            secret_key,
            timestamp,
            ttl,
            chain_name,
            initiator_addr,
            session_args_simple,
            session_args_json,
            pricing_mode,
            output_path,
            payment_amount,
            gas_price_tolerance,
            receipt,
            standard_payment,
        };

        let result = transaction_str_params_to_casper_client(&transaction_params);

        assert_eq!(result.secret_key, "secret_key");
        assert_eq!(result.timestamp, "1234567890");
        assert_eq!(result.ttl, "30m");
        assert_eq!(result.chain_name, "test_chain");
        assert_eq!(result.initiator_addr, "account_id");
        assert_eq!(result.session_args_simple, ["simple"]);
        assert_eq!(result.session_args_json, "json");
        assert_eq!(result.pricing_mode, "mode");
        assert_eq!(result.output_path, "path");
        assert_eq!(result.payment_amount, "amount");
        assert_eq!(result.gas_price_tolerance, "1");
        assert_eq!(result.receipt, "receipt");
        assert_eq!(result.standard_payment, "true");
    }
}
