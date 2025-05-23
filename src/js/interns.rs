use crate::helpers::{
    get_base64_key_from_account_hash, get_base64_key_from_key_hash, get_blake2b_hash,
    get_current_timestamp, hex_to_uint8_vec,
    make_dictionary_item_key as make_dictionary_item_key_helper, public_key_from_secret_key,
    secret_key_generate, secret_key_secp256k1_generate,
};
use crate::types::{cl::bytes::Bytes, key::Key};
use crate::{
    helpers::{hex_to_string, motes_to_cspr},
    types::verbosity::Verbosity,
};
use casper_types::U256;
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

/// Converts a hexadecimal string to a regular string.
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A regular string containing the converted value.
#[wasm_bindgen(js_name = "hexToString")]
pub fn hex_to_string_js_alias(hex_string: &str) -> String {
    hex_to_string(hex_string)
}

/// Converts a hexadecimal string to a Uint8Array.
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A Uint8Array containing the converted value.
#[wasm_bindgen(js_name = "hexToUint8Array")]
pub fn hex_to_uint8_vec_js_alias(hex_string: &str) -> Vec<u8> {
    hex_to_uint8_vec(hex_string)
}

/// Converts a Uint8Array to a `Bytes` object.
///
/// # Arguments
///
/// * `uint8_array` - The Uint8Array to convert.
///
/// # Returns
///
/// A `Bytes` object containing the converted value.
#[wasm_bindgen(js_name = "uint8ArrayToBytes")]
pub fn uint8_array_to_bytes(uint8_array: js_sys::Uint8Array) -> Bytes {
    Bytes::from_uint8_array(uint8_array)
}

/// Converts motes to CSPR (Casper tokens).
///
/// # Arguments
///
/// * `motes` - The motes value to convert.
///
/// # Returns
///
/// A string representing the CSPR amount.
#[wasm_bindgen(js_name = "motesToCSPR")]
pub fn motes_to_cspr_js_alias(motes: &str) -> Result<String, JsError> {
    match motes_to_cspr(motes) {
        Ok(result) => Ok(result),
        Err(err) => {
            let error_message = format!("motes_to_cspr error: {err}");
            Err(JsError::new(&error_message))
        }
    }
}

/// Pretty prints a JSON value.
///
/// # Arguments
///
/// * `value` - The JSON value to pretty print.
/// * `verbosity` - An optional verbosity level for pretty printing.
///
/// # Returns
///
/// A pretty printed JSON value as a JsValue.
#[wasm_bindgen(js_name = "jsonPrettyPrint")]
pub fn json_pretty_print_js_alias(
    value: JsValue,
    verbosity: Option<Verbosity>,
) -> Result<JsValue, JsError> {
    use crate::helpers::json_pretty_print;

    // Deserialize JsValue into serde_json::Value
    let deserialized: serde_json::Value = match value.into_serde() {
        Ok(value) => value,
        Err(err) => {
            let error_text = format!("Error deserializing JSON value: {err:?}");
            return Err(JsError::new(&error_text));
        }
    };

    // Pretty print JSON
    let pretty_printed = json_pretty_print(deserialized, verbosity)?;

    // Convert pretty printed JSON to JsValue
    let pretty_printed_value: JsValue = JsValue::from_str(&pretty_printed);

    Ok(pretty_printed_value)
}

/// Converts a secret key to a corresponding public key.
///
/// # Arguments
///
/// * `secret_key` - The secret key in PEM format.
///
/// # Returns
///
/// A JsValue containing the corresponding public key.
/// If an error occurs during the conversion, JavaScript error is returned.
#[wasm_bindgen(js_name = "publicKeyFromSecretKey")]
pub fn public_key_from_secret_key_js_alias(secret_key: &str) -> Result<JsValue, JsError> {
    let public_key = public_key_from_secret_key(secret_key);
    if let Err(err) = public_key {
        let error_text = format!("Error loading secret key: {err:?}");
        return Err(JsError::new(&error_text)); // Return a JavaScript error using JsError
    }
    Ok(
        JsValue::from_serde(&public_key.unwrap()).unwrap_or_else(|err| {
            let error_text = format!("Error serializing public key: {err:?}");
            JsValue::from_str(&error_text) // Return an Ok variant containing JsValue
        }),
    )
}

/// Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
///
/// # Returns
///
/// A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
///
/// # Errors
///
/// Returns an error if the secret key generation or serialization fails.
#[wasm_bindgen(js_name = "generateSecretKey")]
pub fn generate_ed25519_js_alias() -> Result<JsValue, JsError> {
    let secret_key = secret_key_generate()
        .map_err(|err| JsError::new(&format!("Error in secret_key_generate: {err:?}")))
        .and_then(|secret_key| {
            secret_key
                .to_pem()
                .map_err(|err| JsError::new(&format!("Error in secret_key.to_pem: {err:?}")))
        })?;

    JsValue::from_serde(&secret_key).map_err(|err| {
        let error_text = format!("Error serializing secret key: {err:?}");
        JsError::new(&error_text)
    })
}

/// Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
///
/// # Returns
///
/// A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
///
/// # Errors
///
/// Returns an error if the secret key generation or serialization fails.
#[wasm_bindgen(js_name = "generateSecretKey_secp256k1")]
pub fn generate_secp256k1_js_alias() -> Result<JsValue, JsError> {
    let secret_key = secret_key_secp256k1_generate()
        .map_err(|err| JsError::new(&format!("Error in secret_key_secp256k1_generate: {err:?}")))
        .and_then(|secret_key| {
            secret_key
                .to_pem()
                .map_err(|err| JsError::new(&format!("Error in secret_key.to_pem: {err:?}")))
        })?;

    JsValue::from_serde(&secret_key).map_err(|err| {
        let error_text = format!("Error serializing secret key: {err:?}");
        JsError::new(&error_text)
    })
}

/// Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
///
///
/// # Arguments
///
/// * `formatted_account_hash` - A hex-formatted string representing the account hash.
/// Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
///
/// # Returns
///
/// Returns the base64-encoded string.
/// Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
#[wasm_bindgen(js_name = "accountHashToBase64Key")]
pub fn get_base64_key_from_account_hash_js_alias(
    formatted_account_hash: &str,
) -> Result<String, JsError> {
    get_base64_key_from_account_hash(formatted_account_hash).map_err(|err| {
        let error_text = format!("Error serializing account hash: {err:?}");
        JsError::new(&error_text)
    })
}

/// Converts a formatted key hash to a base64-encoded string (CEP-18 key encoding) for use in JavaScript.
///
/// This function acts as a wrapper around `get_base64_key_from_key_hash` and maps errors to JavaScript-compatible errors.
///
/// # Arguments
///
/// * `formatted_key_hash` - A hex-formatted string representing the key hash.
/// Example: "hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
///
/// # Returns
///
/// Returns a `Result` containing the base64-encoded string on success.
/// Example: "AbSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
///
/// # Errors
///
/// This function returns a `JsError` if:
/// - The input string is not a valid formatted key hash.
/// - The conversion to bytes or base64 encoding fails.
///
/// The error message is formatted as a JavaScript-compatible string.
#[wasm_bindgen(js_name = "keyHashToBase64Key")]
pub fn get_base64_key_from_key_hash_js_alias(formatted_key_hash: &str) -> Result<String, JsError> {
    get_base64_key_from_key_hash(formatted_key_hash).map_err(|err| {
        let error_text = format!("Error serializing package hash: {err:?}");
        JsError::new(&error_text)
    })
}

/// Gets the current timestamp.
///
/// # Returns
///
/// A JsValue containing the current timestamp.
#[wasm_bindgen(js_name = "getTimestamp")]
pub fn get_timestamp() -> JsValue {
    get_current_timestamp(None).into()
}

/// Encodes the given metadata using the lower-level Blake2b hashing algorithm.
///
/// # Arguments
///
/// * `meta_data` - A string containing the metadata to be hashed.
///
/// # Returns
///
/// A JsValue containing the hash generated using the Blake2b algorithm.
#[wasm_bindgen(js_name = "encodeLowerBlake2b")]
pub fn encode_lower_blake2b(meta_data: &str) -> JsValue {
    get_blake2b_hash(meta_data).into()
}

/// Converts a key and value into a formatted dictionary item key for ditionaries queries.
///
/// # Arguments
///
/// * `key` - A string representation of a account/contract hash as a Key.
/// * `value` - A string representation of the value, for now restricted to parse as U256 or Key
///
/// # Returns
///
/// A string representing the formatted dictionary item key.
///
#[wasm_bindgen(js_name = "makeDictionaryItemKey")]
pub fn make_dictionary_item_key(key: &Key, value: &str) -> Result<String, JsError> {
    // Try to parse value as U256, default to zero if unsuccessful
    let value_as_u256 = U256::from_dec_str(value).unwrap_or_default();

    // If value_as_u256 is zero, attempt to parse it as a key and return the result
    if value_as_u256 == U256::zero() {
        match Key::from_formatted_str(value) {
            Ok(value_as_key) => Ok(make_dictionary_item_key_helper(key, &value_as_key)),
            Err(err) => {
                let error_text = format!("Error serializing key: {err:?}");
                Err(JsError::new(&error_text))
            }
        }
    } else {
        // Otherwise, proceed with the original key and parsed value_as_u256
        Ok(make_dictionary_item_key_helper(key, &value_as_u256))
    }
}
