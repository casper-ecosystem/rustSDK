use crate::{
    helpers::get_str_or_default,
    types::{cl::bytes::Bytes, deploy_params::args_simple::ArgsSimple},
};
use casper_client::cli::SessionStrParams as _SessionStrParams;
use js_sys::Array;
use once_cell::sync::OnceCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Default, Debug, Clone)]
pub struct SessionStrParams {
    session_hash: OnceCell<String>,
    session_name: OnceCell<String>,
    session_package_hash: OnceCell<String>,
    session_package_name: OnceCell<String>,
    session_path: OnceCell<String>,
    session_bytes: OnceCell<Bytes>,
    session_args_simple: OnceCell<ArgsSimple>,
    session_args_json: OnceCell<String>,
    session_version: OnceCell<String>,
    session_entry_point: OnceCell<String>,
    is_session_transfer: OnceCell<bool>,
}

#[wasm_bindgen]
impl SessionStrParams {
    #[wasm_bindgen(constructor)]
    #[allow(clippy::too_many_arguments)]
    pub fn new(
        session_hash: Option<String>,
        session_name: Option<String>,
        session_package_hash: Option<String>,
        session_package_name: Option<String>,
        session_path: Option<String>,
        session_bytes: Option<Bytes>,
        session_args_simple: Option<Array>,
        session_args_json: Option<String>,
        session_version: Option<String>,
        session_entry_point: Option<String>,
        is_session_transfer: Option<bool>,
    ) -> Self {
        let mut session_params = SessionStrParams::default();
        if let Some(session_hash) = session_hash {
            session_params.set_session_hash(&session_hash);
        };
        if let Some(session_name) = session_name {
            session_params.set_session_name(&session_name);
        };
        if let Some(session_package_hash) = session_package_hash {
            session_params.set_session_package_hash(&session_package_hash);
        };
        if let Some(session_package_name) = session_package_name {
            session_params.set_session_package_name(&session_package_name);
        };
        if let Some(session_path) = session_path {
            session_params.set_session_path(&session_path);
        };
        if let Some(session_bytes) = session_bytes {
            session_params.set_session_bytes(session_bytes);
        };
        if let Some(session_args_simple) = session_args_simple {
            session_params.set_session_args_simple(session_args_simple);
        };
        if let Some(session_args_json) = session_args_json {
            session_params.set_session_args_json(&session_args_json);
        };
        if let Some(session_version) = session_version {
            session_params.set_session_version(&session_version);
        };
        if let Some(session_entry_point) = session_entry_point {
            session_params.set_session_entry_point(&session_entry_point);
        };
        if let Some(is_session_transfer) = is_session_transfer {
            session_params.set_is_session_transfer(is_session_transfer);
        };

        session_params
    }

    // Getter and setter for session_hash field
    #[wasm_bindgen(getter)]
    pub fn session_hash(&self) -> Option<String> {
        self.session_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_hash(&self, session_hash: &str) {
        self.session_hash.set(session_hash.to_string()).unwrap();
    }

    // Getter and setter for session_name field
    #[wasm_bindgen(getter)]
    pub fn session_name(&self) -> Option<String> {
        self.session_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_name(&self, session_name: &str) {
        self.session_name.set(session_name.to_string()).unwrap();
    }

    // Getter and setter for session_package_hash field
    #[wasm_bindgen(getter)]
    pub fn session_package_hash(&self) -> Option<String> {
        self.session_package_hash.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_package_hash(&self, session_package_hash: &str) {
        self.session_package_hash
            .set(session_package_hash.to_string())
            .unwrap();
    }

    // Getter and setter for session_package_name field
    #[wasm_bindgen(getter)]
    pub fn session_package_name(&self) -> Option<String> {
        self.session_package_name.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_package_name(&self, session_package_name: &str) {
        self.session_package_name
            .set(session_package_name.to_string())
            .unwrap();
    }

    // Getter and setter for session_path field
    #[wasm_bindgen(getter)]
    pub fn session_path(&self) -> Option<String> {
        self.session_path.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_path(&self, session_path: &str) {
        self.session_path.set(session_path.to_string()).unwrap();
    }

    // Getter and setter for session_bytes field
    #[wasm_bindgen(getter)]
    pub fn session_bytes(&self) -> Option<Bytes> {
        self.session_bytes.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_bytes(&self, session_bytes: Bytes) {
        self.session_bytes.set(session_bytes).unwrap();
    }

    // Getter and setter for session_args_simple field
    #[wasm_bindgen(getter)]
    pub fn session_args_simple(&self) -> Option<ArgsSimple> {
        self.session_args_simple.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_args_simple(&mut self, session_args_simple: Array) {
        let args: Vec<String> = session_args_simple
            .iter()
            .map(|value| value.as_string().unwrap_or_default())
            .collect();
        self.set_session_args(args);
    }

    // Getter and setter for session_args_json field
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

    // Getter and setter for session_version field
    #[wasm_bindgen(getter)]
    pub fn session_version(&self) -> Option<String> {
        self.session_version.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_version(&self, session_version: &str) {
        self.session_version
            .set(session_version.to_string())
            .unwrap();
    }

    // Getter and setter for session_entry_point field
    #[wasm_bindgen(getter)]
    pub fn session_entry_point(&self) -> Option<String> {
        self.session_entry_point.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_session_entry_point(&self, session_entry_point: &str) {
        self.session_entry_point
            .set(session_entry_point.to_string())
            .unwrap();
    }

    // Getter and setter for is_session_transfer field
    #[wasm_bindgen(getter)]
    pub fn is_session_transfer(&self) -> Option<bool> {
        self.is_session_transfer.get().cloned()
    }

    #[wasm_bindgen(setter)]
    pub fn set_is_session_transfer(&self, is_session_transfer: bool) {
        self.is_session_transfer.set(is_session_transfer).unwrap();
    }
}

impl SessionStrParams {
    pub fn set_session_args(&mut self, session_args_simple: Vec<String>) {
        let args_simple = ArgsSimple::from(session_args_simple);
        self.session_args_simple.set(args_simple).unwrap();
    }
}

// Convert SessionStrParams to casper_client::cli::SessionStrParam
pub fn session_str_params_to_casper_client(
    session_params: &SessionStrParams,
) -> _SessionStrParams<'_> {
    let session_args_simple: Vec<&str> = session_params
        .session_args_simple
        .get()
        .map_or_else(Vec::new, |args_simple| {
            args_simple.args().iter().map(String::as_str).collect()
        });

    if let Some(session_path) = session_params.session_path.get() {
        return _SessionStrParams::with_path(
            session_path,
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    if let Some(session_bytes) = session_params.session_bytes.get() {
        return _SessionStrParams::with_bytes(
            (*session_bytes).clone().into(),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    if let Some(session_hash) = session_params.session_hash.get() {
        return _SessionStrParams::with_hash(
            session_hash.as_str(),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    if let Some(session_name) = session_params.session_name.get() {
        return _SessionStrParams::with_name(
            session_name.as_str(),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    if let Some(session_package_hash) = session_params.session_package_hash.get() {
        return _SessionStrParams::with_package_hash(
            session_package_hash.as_str(),
            get_str_or_default(session_params.session_version.get()),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    if let Some(session_package_name) = session_params.session_package_name.get() {
        return _SessionStrParams::with_package_name(
            session_package_name.as_str(),
            get_str_or_default(session_params.session_version.get()),
            get_str_or_default(session_params.session_entry_point.get()),
            session_args_simple,
            get_str_or_default(session_params.session_args_json.get()),
        );
    }

    // Default to Transfer type of Deploy
    _SessionStrParams::with_transfer(
        session_args_simple,
        get_str_or_default(session_params.session_args_json.get()),
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_session_str_params_to_casper_client() {
        let session_params = SessionStrParams::default();
        session_params.set_session_path("path_value");
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_path: \"path_value\""));

        let session_params = SessionStrParams::default();
        session_params.set_session_bytes(Bytes::from(vec![0, 1, 2]));
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_bytes: Bytes([0, 1, 2])"));

        let session_params = SessionStrParams::default();
        session_params.set_session_name("name_value");
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_name: \"name_value\""));

        let session_params = SessionStrParams::default();
        session_params.set_session_hash("hash_value");
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_hash: \"hash_value\""));

        let session_params = SessionStrParams::default();
        session_params.set_session_package_name("package_name_value");
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_package_name: \"package_name_value\""));

        let session_params = SessionStrParams::default();
        session_params.set_session_package_hash("package_hash_value");
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("session_package_hash: \"package_hash_value\""));

        let session_params = SessionStrParams::default();
        let result = session_str_params_to_casper_client(&session_params);
        let result_debug_output = format!("{:?}", result);
        assert!(result_debug_output.contains("is_session_transfer: true"));
    }
}
