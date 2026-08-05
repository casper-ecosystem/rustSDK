use crate::types::{cl::cl_value::CLValue, sdk_error::SdkError};
use casper_types::{bytesrepr::ToBytes, CLValue as _CLValue, RuntimeArgs as _RuntimeArgs};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use serde_json::json;
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::RuntimeArgs`].
///
/// Use with `TransactionStrParams::set_session_args` /
/// `SessionStrParams::set_session_args` (#43). String / JSON setters remain.
#[wasm_bindgen]
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct RuntimeArgs(_RuntimeArgs);

impl RuntimeArgs {
    pub fn inner(&self) -> &_RuntimeArgs {
        &self.0
    }

    pub fn inner_mut(&mut self) -> &mut _RuntimeArgs {
        &mut self.0
    }

    /// Converts typed runtime args into the JSON array shape expected by
    /// `casper_client` session/payment `*_args_json` (ByteArray encoding).
    pub fn to_session_args_json_array(&self) -> Vec<serde_json::Value> {
        runtime_args_to_json_array(&self.0)
    }

    pub fn to_session_args_json_string(&self) -> Result<String, Box<SdkError>> {
        serde_json::to_string(&self.to_session_args_json_array())
            .map_err(|err| Box::new(SdkError::from(err)))
    }

    pub fn insert_cl_value(&mut self, name: &str, value: CLValue) {
        self.0.insert_cl_value(name, _CLValue::from(value));
    }

    pub fn insert_simple(&mut self, arg: &str) -> Result<(), Box<SdkError>> {
        casper_client::cli::insert_arg(arg, &mut self.0).map_err(|err| {
            Box::new(SdkError::CustomError {
                context: "RuntimeArgs::insert_simple",
                error: format!("{err:?}"),
            })
        })?;
        Ok(())
    }
}

/// Shared bridge used by transaction rebuild and StrParams setters.
pub fn runtime_args_to_json_array(args: &_RuntimeArgs) -> Vec<serde_json::Value> {
    args.named_args()
        .map(|named_arg| {
            let name = named_arg.name().to_string();
            let cl_value = named_arg.cl_value();
            let bytes = cl_value.to_bytes().unwrap_or_default();
            let size = bytes.len();
            json!({
                "name": name,
                "type": json!({ "ByteArray": size }),
                "value": bytes,
            })
        })
        .collect()
}

#[wasm_bindgen]
impl RuntimeArgs {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        RuntimeArgs(_RuntimeArgs::new())
    }

    /// Insert a named [`CLValue`].
    #[cfg(target_arch = "wasm32")]
    pub fn insert(&mut self, name: &str, value: &CLValue) {
        self.insert_cl_value(name, value.clone());
    }

    /// Insert a CLI-style simple arg (`name:Type='value'`).
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "insertSimple")]
    pub fn insert_simple_js(&mut self, arg: &str) -> Result<(), JsError> {
        self.insert_simple(arg)
            .map_err(|err| JsError::new(&err.to_string()))
    }

    /// Insert from a JS object `{name,type,value}` or a simple arg string.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "insertJsValue")]
    pub fn insert_js_value(&mut self, js_value_arg: JsValue) -> Result<(), JsError> {
        crate::helpers::insert_js_value_arg(&mut self.0, js_value_arg)
            .map(|_| ())
            .map_err(|err| JsError::new(&err.to_string()))
    }

    /// JSON array suitable for `set_session_args_json` / payment args JSON.
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toSessionArgsJson")]
    pub fn to_session_args_json_js(&self) -> Result<String, JsError> {
        self.to_session_args_json_string()
            .map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.to_session_args_json_array()).unwrap_or(JsValue::null())
    }
}

impl From<RuntimeArgs> for _RuntimeArgs {
    fn from(value: RuntimeArgs) -> Self {
        value.0
    }
}

impl From<_RuntimeArgs> for RuntimeArgs {
    fn from(value: _RuntimeArgs) -> Self {
        RuntimeArgs(value)
    }
}

impl AsRef<_RuntimeArgs> for RuntimeArgs {
    fn as_ref(&self) -> &_RuntimeArgs {
        &self.0
    }
}

impl AsMut<_RuntimeArgs> for RuntimeArgs {
    fn as_mut(&mut self) -> &mut _RuntimeArgs {
        &mut self.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn to_session_args_json_matches_bytearray_shape() {
        let mut args = RuntimeArgs::new();
        args.insert_cl_value("message", CLValue::from_t("hi".to_string()).unwrap());
        args.insert_cl_value("flag", CLValue::from_t(true).unwrap());

        let json = args.to_session_args_json_string().unwrap();
        let parsed: Vec<serde_json::Value> = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed.len(), 2);
        assert_eq!(parsed[0]["name"], "message");
        assert!(parsed[0]["type"].get("ByteArray").is_some());
        assert!(parsed[0]["value"].is_array());
        assert_eq!(parsed[1]["name"], "flag");
    }

    #[test]
    fn insert_simple_parses_cli_string() {
        let mut args = RuntimeArgs::new();
        args.insert_simple("message:String='Hello Casper'").unwrap();
        assert_eq!(args.inner().len(), 1);
    }
}
