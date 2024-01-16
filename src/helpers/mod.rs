use crate::debug::error;
use crate::types::public_key::PublicKey;
use crate::types::sdk_error::SdkError;
use crate::types::verbosity::Verbosity;
use blake2::{
    digest::{Update, VariableOutput},
    VarBlake2b,
};
use casper_client::cli::JsonArg;
use casper_client::types::{Deploy, TimeDiff, Timestamp};
use casper_types::{
    bytesrepr::ToBytes, cl_value_to_json as cl_value_to_json_from_casper_types, CLTyped,
};
use casper_types::{CLValue, ErrorExt, PublicKey as CasperTypesPublicKey, SecretKey};
use casper_types::{NamedArg, RuntimeArgs};
use chrono::{DateTime, NaiveDateTime, SecondsFormat, Utc};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rust_decimal::prelude::*;
use serde::Serialize;
use serde_json::Value;
use std::str::FromStr;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::{JsCast, JsValue};

pub const BLAKE2B_DIGEST_LENGTH: usize = 32;

/// Converts a CLValue to a JSON Value.
///
/// # Arguments
///
/// * `cl_value` - The CLValue to convert.
///
/// # Returns
///
/// A JSON Value representing the CLValue data.
pub fn cl_value_to_json(cl_value: &CLValue) -> Option<Value> {
    cl_value_to_json_from_casper_types(cl_value)
}

/// Gets the current timestamp.
///
/// # Arguments
///
/// * `timestamp` - An optional timestamp value in milliseconds since the Unix epoch.
///
/// # Returns
///
/// A string containing the current timestamp in RFC3339 format.
pub fn get_current_timestamp(timestamp: Option<String>) -> String {
    let parsed_timestamp = timestamp.as_ref().and_then(|ts| ts.parse::<i64>().ok());
    let current_timestamp = parsed_timestamp
        .map(|parsed_time| {
            NaiveDateTime::from_timestamp_opt(parsed_time / 1000, 0)
                .map(|naive_time| DateTime::<Utc>::from_naive_utc_and_offset(naive_time, Utc))
                .unwrap_or_else(Utc::now)
        })
        .unwrap_or_else(Utc::now);
    current_timestamp.to_rfc3339_opts(SecondsFormat::Secs, true)
}

/// Computes the Blake2b hash of the provided metadata.
///
/// # Arguments
///
/// * `meta_data` - A reference to a string containing the metadata to be hashed.
///
/// # Returns
///
/// A hexadecimal string representing the Blake2b hash of the input metadata.

pub fn get_blake2b_hash(meta_data: &str) -> String {
    let mut result = [0; BLAKE2B_DIGEST_LENGTH];
    let mut hasher = VarBlake2b::new(BLAKE2B_DIGEST_LENGTH).expect("should create hasher");

    hasher.update(meta_data);
    hasher.finalize_variable(|slice| {
        result.copy_from_slice(slice);
    });
    base16::encode_lower(&result)
}

/// Creates a dictionary item key by concatenating the serialized bytes of the key and value.
///
/// # Arguments
///
/// * `key` - The key to be serialized.
/// * `value` - The value to be serialized.
///
/// # Returns
///
/// A hexadecimal-encoded string representing the dictionary item key.
///
/// # Panics
///
/// Panics if the hasher cannot be created.
///
/// # Example
///
/// ```rust
/// use casper_types::{U256, U512};
/// use contract::make_dictionary_item_key;
///
/// let key = U256::from(42);
/// let value = U512::from(1000);
/// let dictionary_item_key = make_dictionary_item_key(&key, &value);
/// println!("Dictionary Item Key: {}", dictionary_item_key);
/// ```
pub fn make_dictionary_item_key<T: CLTyped + ToBytes, V: CLTyped + ToBytes>(
    key: &T,
    value: &V,
) -> String {
    let mut bytes_a = key.to_bytes().unwrap_or_default();
    let mut bytes_b = value.to_bytes().unwrap_or_default();

    bytes_a.append(&mut bytes_b);

    let mut result = [0; BLAKE2B_DIGEST_LENGTH];
    let mut hasher = VarBlake2b::new(BLAKE2B_DIGEST_LENGTH).expect("should create hasher");

    hasher.update(bytes_a);
    hasher.finalize_variable(|slice| {
        result.copy_from_slice(slice);
    });
    hex::encode(&result)
}

/// Gets the time to live (TTL) value or returns the default value if not provided.
///
/// # Arguments
///
/// * `ttl` - An optional TTL value as a string.
///
/// # Returns
///
/// A string containing the TTL value or the default TTL if not provided.
pub fn get_ttl_or_default(ttl: Option<&str>) -> String {
    if let Some(ttl) = ttl {
        ttl.to_string()
    } else {
        Deploy::DEFAULT_TTL.to_string()
    }
}

/// Parses a timestamp string into a `Timestamp` object.
///
/// # Arguments
///
/// * `value` - The timestamp string to parse.
///
/// # Returns
///
/// A `Result` containing the parsed `Timestamp` or an error if parsing fails.
pub fn parse_timestamp(value: &str) -> Result<Timestamp, SdkError> {
    Timestamp::from_str(value).map_err(|error| SdkError::FailedToParseTimestamp {
        context: "timestamp",
        error,
    })
}

/// Parses a TTL (time to live) string into a `TimeDiff` object.
///
/// # Arguments
///
/// * `value` - The TTL string to parse.
///
/// # Returns
///
/// A `Result` containing the parsed `TimeDiff` or an error if parsing fails.
pub fn parse_ttl(value: &str) -> Result<TimeDiff, SdkError> {
    TimeDiff::from_str(value).map_err(|error| SdkError::FailedToParseTimeDiff {
        context: "ttl",
        error,
    })
}

/// Gets the gas price or returns the default value if not provided.
///
/// # Arguments
///
/// * `gas_price` - An optional gas price value.
///
/// # Returns
///
/// The gas price or the default gas price if not provided.
pub fn get_gas_price_or_default(gas_price: Option<u64>) -> u64 {
    gas_price.unwrap_or(Deploy::DEFAULT_GAS_PRICE)
}

/// Gets the value as a string or returns an empty string if not provided.
///
/// # Arguments
///
/// * `opt_str` - An optional string value.
///
/// # Returns
///
/// The string value or an empty string if not provided.
pub(crate) fn get_str_or_default(opt_str: Option<&String>) -> &str {
    opt_str.map(String::as_str).unwrap_or_default()
}

/// Parses a secret key in PEM format into a `SecretKey` object.
///
/// # Arguments
///
/// * `secret_key` - The secret key in PEM format.
///
/// # Returns
///
/// A `Result` containing the parsed `SecretKey` or an error if parsing fails.
pub fn secret_key_from_pem(secret_key: &str) -> Result<SecretKey, ErrorExt> {
    SecretKey::from_pem(secret_key)
}

/// Converts a secret key in PEM format to its corresponding public key as a string.
///
/// # Arguments
///
/// * `secret_key` - The secret key in PEM format.
///
/// # Returns
///
/// A `Result` containing the public key as a string or an error if the conversion fails.
pub fn public_key_from_private_key(secret_key: &str) -> Result<String, ErrorExt> {
    let secret_key_from_pem = secret_key_from_pem(secret_key);
    let public_key = match secret_key_from_pem {
        Ok(secret_key) => CasperTypesPublicKey::from(&secret_key),
        Err(err) => {
            error(&format!("Error in public_key_from_private_key: {:?}", err));
            return Err(err);
        }
    };
    let public_key_test: PublicKey = public_key.into();
    Ok(public_key_test.to_string())
}

/// Converts a hexadecimal string to a vector of unsigned 8-bit integers (Uint8Array).
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A vector of unsigned 8-bit integers (Uint8Array) containing the converted value.
pub fn hex_to_uint8_vec(hex_string: &str) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(hex_string.len() / 2);
    let mut hex_chars = hex_string.chars();
    while let (Some(a), Some(b)) = (hex_chars.next(), hex_chars.next()) {
        if let Ok(byte) = u8::from_str_radix(&format!("{}{}", a, b), 16) {
            bytes.push(byte);
        } else {
            // If an invalid hex pair is encountered, return an empty vector.
            return Vec::new();
        }
    }
    bytes
}

/// Converts a hexadecimal string to a regular string.
///
/// # Arguments
///
/// * `hex_string` - The hexadecimal string to convert.
///
/// # Returns
///
/// A regular string containing the converted value.
pub fn hex_to_string(hex_string: &str) -> String {
    match hex::decode(hex_string) {
        Ok(bytes) => String::from_utf8_lossy(&bytes).to_string(),
        Err(_) => hex_string.to_string(),
    }
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
pub fn motes_to_cspr(motes: &str) -> String {
    match Decimal::from_str(motes) {
        Ok(motes_decimal) => {
            let cspr_decimal = motes_decimal / Decimal::new(1_000_000_000, 0);
            let formatted_cspr = cspr_decimal.to_string();
            if formatted_cspr.ends_with(".00") {
                formatted_cspr.replace(".00", "")
            } else {
                formatted_cspr
            }
        }
        Err(err) => {
            error(&format!("Failed to parse input as Decimal: {:?}", err));
            "Invalid input".to_string()
        }
    }
}

/// Pretty prints a serializable value as a JSON string.
///
/// # Arguments
///
/// * `value` - The serializable value to pretty print.
/// * `verbosity` - An optional verbosity level for pretty printing.
///
/// # Returns
///
/// A JSON string representing the pretty printed value.
pub fn json_pretty_print<T>(value: T, verbosity: Option<Verbosity>) -> String
where
    T: Serialize,
{
    if let Ok(deserialized) = serde_json::to_value(&value) {
        let result = match verbosity {
            Some(Verbosity::Low) | None => Ok(deserialized.to_string()),
            Some(Verbosity::Medium) => casper_types::json_pretty_print(&deserialized),
            Some(Verbosity::High) => serde_json::to_string_pretty(&deserialized),
        }
        .map_err(|err| error(&format!("Error in json_pretty_print: {}", err)));

        match result {
            Ok(result) => result,
            Err(err) => {
                error(&format!("Error in json_pretty_print: {:?}", err));
                String::from("")
            }
        }
    } else {
        error("Deserialization error into_serde of json_pretty_print");
        String::from("")
    }
}

/// Inserts a JavaScript value argument into a RuntimeArgs map.
///
/// # Arguments
///
/// * `args` - The RuntimeArgs map to insert the argument into.
/// * `js_value_arg` - The JavaScript value argument to insert.
///
/// # Returns
///
/// The modified `RuntimeArgs` map.
#[cfg(target_arch = "wasm32")]
pub fn insert_js_value_arg(args: &mut RuntimeArgs, js_value_arg: JsValue) -> &RuntimeArgs {
    if js_sys::Object::instanceof(&js_value_arg) {
        let json_arg: Result<JsonArg, serde_json::Error> = js_value_arg.into_serde();
        let json_arg: Option<JsonArg> = match json_arg {
            Ok(arg) => Some(arg),
            Err(err) => {
                error(&format!("Error converting to JsonArg: {:?}", err));
                None
            }
        };
        if let Some(json_arg) = json_arg {
            let named_arg = NamedArg::try_from(json_arg);
            let named_arg: Option<NamedArg> = match named_arg {
                Ok(arg) => Some(arg),
                Err(err) => {
                    error(&format!("Error converting to NamedArg: {:?}", err));
                    None
                }
            };
            if let Some(named_arg) = named_arg {
                args.insert_cl_value(named_arg.name(), named_arg.cl_value().clone());
            }
        }
    } else if let Some(string_arg) = js_value_arg.as_string() {
        let simple_arg = string_arg;
        let _ = casper_client::cli::insert_arg(&simple_arg, args);
    } else {
        error("Error converting to JsonArg or Simple Arg");
    }
    args
}

/// Inserts an argument into a RuntimeArgs map.
///
/// # Arguments
///
/// * `args` - The RuntimeArgs map to insert the argument into.
/// * `new_arg` - The argument as a string.
///
/// # Returns
///
/// The modified `RuntimeArgs` map.
pub(crate) fn insert_arg(args: &mut RuntimeArgs, new_arg: String) -> &RuntimeArgs {
    match serde_json::from_str::<JsonArg>(&new_arg) {
        Ok(json_arg) => {
            if let Ok(named_arg) = NamedArg::try_from(json_arg.clone()) {
                // JSON args
                args.insert_cl_value(named_arg.name(), named_arg.cl_value().clone());
            }
        }
        Err(_) => {
            // Simple args
            let _ = casper_client::cli::insert_arg(&new_arg, args);
        }
    }
    args
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cl_value_to_json() {
        let cl_value = CLValue::from_t((1, 2, 3)).unwrap();
        let json_value = cl_value_to_json(&cl_value).unwrap();
        assert_eq!(
            json_value,
            Value::Array(vec![
                Value::Number(1.into()),
                Value::Number(2.into()),
                Value::Number(3.into())
            ])
        );
    }

    #[test]
    fn test_get_current_timestamp() {
        let timestamp = Some("1234567890".to_string());
        let current_timestamp = get_current_timestamp(timestamp);
        assert_eq!(&current_timestamp, "1970-01-15T06:56:07Z");
    }

    #[test]
    fn test_get_blake2b_hash() {
        let metadata = "some metadata";
        let hash = get_blake2b_hash(metadata);
        assert_eq!(
            &hash,
            "767de9efccc76bc0eef85ea81fcaa56dc7047e660c74b3dc39f84ab8c4931c0d"
        );
    }

    #[test]
    fn test_get_ttl_or_default() {
        let ttl = Some("1h".to_string());
        let ttl_value = get_ttl_or_default(ttl.as_deref());
        assert_eq!(ttl_value, "1h".to_string());

        let default_ttl = get_ttl_or_default(None);
        assert_eq!(default_ttl, Deploy::DEFAULT_TTL.to_string());
    }

    #[test]
    fn test_parse_timestamp() {
        let valid_timestamp = "2023-11-06T12:00:00Z";
        let parsed_timestamp = parse_timestamp(valid_timestamp);
        assert!(parsed_timestamp.is_ok());

        let invalid_timestamp = "invalid_timestamp";
        let parsed_timestamp = parse_timestamp(invalid_timestamp);
        assert!(parsed_timestamp.is_err());
    }

    #[test]
    fn test_parse_ttl() {
        let valid_ttl = "1h";
        let parsed_ttl = parse_ttl(valid_ttl);
        assert!(parsed_ttl.is_ok());

        let invalid_ttl = "invalid_ttl";
        let parsed_ttl = parse_ttl(invalid_ttl);
        assert!(parsed_ttl.is_err());
    }

    #[test]
    fn test_get_gas_price_or_default() {
        let gas_price = Some(100);
        let price = get_gas_price_or_default(gas_price);
        assert_eq!(price, 100);

        let default_price = get_gas_price_or_default(None);
        assert_eq!(default_price, Deploy::DEFAULT_GAS_PRICE);
    }

    #[test]
    fn test_get_str_or_default() {
        let input_str = Some("test_string".to_string());
        let result = get_str_or_default(input_str.as_ref());
        assert_eq!(result, "test_string");

        let default_str: Option<String> = None;
        let result = get_str_or_default(default_str.as_ref());
        assert_eq!(result, "");
    }

    #[test]
    fn test_secret_key_from_pem() {
        let pem_key = "-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----";
        let result = secret_key_from_pem(pem_key);
        assert!(result.is_err());
        let pem_key =
        "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIKR3ayaSpNtpZmu9Tv3kUXi+Xq+V7bQHn+9tT0ZjH5id\n-----END PRIVATE KEY-----";
        let result = secret_key_from_pem(pem_key);
        assert!(result.is_ok());
        assert_eq!(&result.unwrap().to_string(), "SecretKey::Ed25519");
    }

    #[test]
    fn test_public_key_from_private_key() {
        let pem_key = "-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----";
        let result = public_key_from_private_key(pem_key);
        assert!(result.is_err());
        let pem_key =
        "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEIKR3ayaSpNtpZmu9Tv3kUXi+Xq+V7bQHn+9tT0ZjH5id\n-----END PRIVATE KEY-----";
        let result = public_key_from_private_key(pem_key);
        assert!(result.is_ok());
        assert_eq!(
            result.unwrap(),
            "0161e40005434ba3cd9a791a2827f5fa3ee514d1475fe72b2823cbaac9c3c71483"
        );
    }

    #[test]
    fn test_hex_to_uint8_vec() {
        let hex_string = "0161e40005434ba3cd9a791a2827f5fa3ee514d1475fe72b2823cbaac9c3c71483";
        let result = hex_to_uint8_vec(hex_string);
        assert_eq!(
            result,
            vec![
                1, 97, 228, 0, 5, 67, 75, 163, 205, 154, 121, 26, 40, 39, 245, 250, 62, 229, 20,
                209, 71, 95, 231, 43, 40, 35, 203, 170, 201, 195, 199, 20, 131
            ]
        );
    }

    #[test]
    fn test_hex_to_string() {
        let hex_string = "48656c6c6f20436173706572";
        let result = hex_to_string(hex_string);
        assert_eq!(result, "Hello Casper");
    }

    #[test]
    fn test_motes_to_cspr() {
        let motes = "1000000000";
        let result = motes_to_cspr(motes);
        assert_eq!(result, "1");
    }

    #[test]
    fn test_json_pretty_print() {
        #[derive(Serialize, Clone)]
        struct TestData {
            age: i32,
            name: String,
        }

        let data = TestData {
            age: 42,
            name: "Joe".to_string(),
        };

        let result = json_pretty_print(data.clone(), None);
        assert_eq!(result, "{\"age\":42,\"name\":\"Joe\"}");

        let result = json_pretty_print(data.clone(), Some(Verbosity::Low));
        assert_eq!(result, "{\"age\":42,\"name\":\"Joe\"}");

        let result = json_pretty_print(data.clone(), Some(Verbosity::Medium));
        assert_eq!(result, "{\n  \"age\": 42,\n  \"name\": \"Joe\"\n}");

        let result = json_pretty_print(data, Some(Verbosity::High));
        assert_eq!(result, "{\n  \"age\": 42,\n  \"name\": \"Joe\"\n}");
    }

    #[test]
    fn test_insert_arg_simple() {
        let mut args = RuntimeArgs::new();
        let new_arg = "message:String='Hello Casper";
        let result_args = insert_arg(&mut args, new_arg.to_string());
        assert_eq!(result_args.len(), 1);
        let cl_value = result_args.get("message").unwrap();
        let json = cl_value_to_json(cl_value).unwrap();
        let expexted_json = Value::String("Hello Casper".to_string());
        assert_eq!(json, expexted_json);
    }

    #[test]
    fn test_insert_arg_json() {
        let mut args = RuntimeArgs::new();
        let arg_json = r#"{"name": "bar", "type": "U256", "value": 1}"#; // No brackets only one arg
        let result_args = insert_arg(&mut args, arg_json.to_string());
        assert_eq!(result_args.len(), 1);
        let cl_value = result_args.get("bar").unwrap();
        let json = cl_value_to_json(cl_value).unwrap();
        let expexted_json = Value::String("1".to_string());
        assert_eq!(json, expexted_json);
    }
}
