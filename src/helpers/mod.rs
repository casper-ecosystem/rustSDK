use crate::types::account_hash::AccountHash;
use crate::types::{key::Key, public_key::PublicKey, sdk_error::SdkError, verbosity::Verbosity};
use base64::engine::general_purpose;
use base64::Engine;
use bigdecimal::BigDecimal;
use blake2::{
    digest::{Update, VariableOutput},
    VarBlake2b,
};
use casper_client::cli::JsonArg;
use casper_types::{
    bytesrepr::ToBytes, cl_value_to_json as cl_value_to_json_from_casper_types, CLValue,
    DeployBuilder, Key as CasperTypesKey, NamedArg, PublicKey as CasperTypesPublicKey, RuntimeArgs,
    SecretKey, TimeDiff, Timestamp,
};
use chrono::{DateTime, SecondsFormat, Utc};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
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
        .map(|parsed_time| DateTime::from_timestamp(parsed_time / 1000, 0).unwrap_or_else(Utc::now))
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
    hex::encode(result).to_lowercase()
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
/// use casper_rust_wasm_sdk::helpers::make_dictionary_item_key;
/// use casper_rust_wasm_sdk::types::key::Key;
/// // Key / Value as U256
/// let key = Key::from_formatted_str( "account-hash-e11bfffe63bf899ea07117af8a2bb43ef0078c0e38ebee6b6cb0b0e39c233538").unwrap();
/// let value = U256::from(1);
/// let dictionary_item_key = make_dictionary_item_key(key, &value);
/// println!("Dictionary Item Key (Key/Value as U256): {}", dictionary_item_key);
/// assert_eq!(dictionary_item_key,"145f6211a24c0a8af16b47e7aa58431ea25172eb402903b3c25ac92b9784c7a9".to_string());
/// // Key / Value as Key
/// let key = Key::from_formatted_str( "account-hash-813428ce1a9805f1087db07e6017c6c4f5af0ee78a05591bb6577763e89b4f1f").unwrap();
/// let value = Key::from_formatted_str("account-hash-e11bfffe63bf899ea07117af8a2bb43ef0078c0e38ebee6b6cb0b0e39c233538").unwrap();
/// let dictionary_item_key = make_dictionary_item_key(key, &value);
/// println!("Dictionary Item Key (Key/Value as Key): {}", dictionary_item_key);
/// assert_eq!(dictionary_item_key,"1e26dc82db208943c3785c0e11b9d78b9c408fee748c78dda5a5d016840dedca".to_string());
/// ```
pub fn make_dictionary_item_key<V: ToBytes>(key: Key, value: &V) -> String {
    let key: CasperTypesKey = CasperTypesKey::from(key);
    let mut bytes_a = key.to_bytes().unwrap_or_default();
    let mut bytes_b = value.to_bytes().unwrap_or_default();

    bytes_a.append(&mut bytes_b);

    let mut result = [0; BLAKE2B_DIGEST_LENGTH];
    let mut hasher = VarBlake2b::new(BLAKE2B_DIGEST_LENGTH).expect("should create hasher");

    hasher.update(bytes_a);
    hasher.finalize_variable(|slice| {
        result.copy_from_slice(slice);
    });
    hex::encode(result)
}

/// Convert a formatted account hash to a base64-encoded Key as string (cep-18 key encoding).
///
/// # Arguments
///
/// * `formatted_account_hash` - A hex-formatted string representing the account hash.
///
/// Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
///
/// # Returns
///
/// Returns a `Result` with the base64-encoded string on success, or a `SdkError` on failure.
/// Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
pub fn get_base64_key_from_account_hash(account_hash: &str) -> Result<String, SdkError> {
    let account_hash = AccountHash::from_formatted_str(account_hash)?;
    let key = Key::from_account(account_hash).to_bytes().unwrap();
    Ok(general_purpose::STANDARD.encode(key)) // base64.encode
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
        DeployBuilder::DEFAULT_TTL.to_string()
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
    gas_price.unwrap_or(DeployBuilder::DEFAULT_GAS_PRICE)
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

/// Generates a secret key using the Ed25519 algorithm.
///
/// # Returns
///
/// A `Result` containing the generated secret key or an error if the generation fails.
///
/// # Errors
///
/// Returns an `SdkError` if the secret key generation fails.
pub fn secret_key_generate() -> Result<SecretKey, SdkError> {
    SecretKey::generate_ed25519().map_err(|err| SdkError::FailedToGenerateSecretKey {
        context: "secret_key_from_pem".to_string(),
        error: err,
    })
}

/// Generates a secret key using the secp256k1 algorithm.
///
/// # Returns
///
/// A `Result` containing the generated secret key or an error if the generation fails.
///
/// # Errors
///
/// Returns an `SdkError` if the secret key generation fails.
pub fn secret_key_secp256k1_generate() -> Result<SecretKey, SdkError> {
    SecretKey::generate_secp256k1().map_err(|err| SdkError::FailedToGenerateSecretKey {
        context: "secret_key_from_pem".to_string(),
        error: err,
    })
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
pub fn secret_key_from_pem(secret_key: &str) -> Result<SecretKey, SdkError> {
    SecretKey::from_pem(secret_key).map_err(|err| SdkError::FailedToParseSecretKey {
        context: "secret_key_from_pem".to_string(),
        error: err,
    })
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
pub fn public_key_from_secret_key(secret_key: &str) -> Result<String, SdkError> {
    // Handle the secret key parsing and map the error
    let secret_key_from_pem = secret_key_from_pem(secret_key)?;

    // Convert the secret key to public key and handle potential errors
    let public_key = CasperTypesPublicKey::from(&secret_key_from_pem);

    // Convert to desired public key format
    let public_key_test: PublicKey = public_key.into();

    // Return the public key as a string
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
pub fn motes_to_cspr(motes: &str) -> Result<String, SdkError> {
    match BigDecimal::from_str(motes) {
        Ok(motes_decimal) => {
            let divisor = BigDecimal::from(1_000_000_000);
            let cspr_decimal = &motes_decimal / divisor;
            let formatted_cspr = format!("{:.2}", cspr_decimal);

            if formatted_cspr.ends_with(".00") {
                Ok(formatted_cspr.replace(".00", ""))
            } else {
                Ok(formatted_cspr)
            }
        }
        Err(err) => Err(SdkError::CustomError {
            context: "Failed to parse input as BigDecimal",
            error: format!("{:?}", err),
        }),
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
pub fn json_pretty_print<T>(value: T, verbosity: Option<Verbosity>) -> Result<String, SdkError>
where
    T: Serialize,
{
    let deserialized = serde_json::to_value(&value).map_err(SdkError::from)?;

    match verbosity {
        Some(Verbosity::Low) | None => Ok(deserialized.to_string()),
        Some(Verbosity::Medium) => {
            casper_types::json_pretty_print(&deserialized).map_err(|err| SdkError::CustomError {
                context: "Error in json_pretty_print",
                error: format!("{}", err),
            })
        }
        Some(Verbosity::High) => {
            serde_json::to_string_pretty(&deserialized).map_err(SdkError::from)
        }
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
pub fn insert_js_value_arg(
    args: &mut RuntimeArgs,
    js_value_arg: JsValue,
) -> Result<&RuntimeArgs, SdkError> {
    if js_sys::Object::instanceof(&js_value_arg) {
        let json_arg: JsonArg = js_value_arg
            .into_serde()
            .map_err(|err| SdkError::CustomError {
                context: "Error converting to JsonArg",
                error: format!("{:?}", err),
            })?;

        let named_arg = NamedArg::try_from(json_arg).map_err(|err| SdkError::CustomError {
            context: "Error converting to NamedArg",
            error: format!("{:?}", err),
        })?;

        args.insert_cl_value(named_arg.name(), named_arg.cl_value().clone());
    } else if let Some(string_arg) = js_value_arg.as_string() {
        let simple_arg = string_arg;
        casper_client::cli::insert_arg(&simple_arg, args).map_err(|err| SdkError::CustomError {
            context: "Error inserting simple arg",
            error: format!("{:?}", err),
        })?;
    } else {
        return Err(SdkError::CustomError {
            context: "Error converting to JsonArg or Simple Arg",
            error: String::from("Conversion failed"),
        });
    }

    Ok(args)
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
    use casper_types::U256;

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
        assert_eq!(default_ttl, DeployBuilder::DEFAULT_TTL.to_string());
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
        assert_eq!(default_price, DeployBuilder::DEFAULT_GAS_PRICE);
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
    fn test_secret_key_generate() {
        // Act
        let result = secret_key_generate();

        // Assert
        assert!(result.is_ok());
        let secret_key = result.unwrap();
        assert_eq!(&secret_key.to_string(), "SecretKey::Ed25519");
    }

    #[test]
    fn test_secret_key_secp256k1_generate() {
        // Act
        let result = secret_key_secp256k1_generate();

        // Assert
        assert!(result.is_ok());
        let secret_key = result.unwrap();
        assert_eq!(&secret_key.to_string(), "SecretKey::Secp256k1");
    }

    #[test]
    fn test_secret_key_from_pem() {
        let pem_key = "-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----";
        let result = secret_key_from_pem(pem_key);
        assert!(result.is_err());
        let pem_key =
        "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI\n-----END PRIVATE KEY-----";
        let result = secret_key_from_pem(pem_key);
        assert!(result.is_ok());
        assert_eq!(&result.unwrap().to_string(), "SecretKey::Ed25519");
    }

    #[test]
    fn test_public_key_from_secret_key() {
        let pem_key = "-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----";
        let result = public_key_from_secret_key(pem_key);
        assert!(result.is_err());
        let pem_key =
        "-----BEGIN PRIVATE KEY-----\nMC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI-----END PRIVATE KEY-----";
        let result = public_key_from_secret_key(pem_key);
        assert!(result.is_ok());
        assert_eq!(
            result.unwrap(),
            "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6"
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
        let result = motes_to_cspr(motes).unwrap();
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

        let result = json_pretty_print(data.clone(), None).unwrap();
        assert_eq!(result, "{\"age\":42,\"name\":\"Joe\"}");

        let result = json_pretty_print(data.clone(), Some(Verbosity::Low)).unwrap();
        assert_eq!(result, "{\"age\":42,\"name\":\"Joe\"}");

        let result = json_pretty_print(data.clone(), Some(Verbosity::Medium)).unwrap();
        assert_eq!(result, "{\n  \"age\": 42,\n  \"name\": \"Joe\"\n}");

        let result = json_pretty_print(data, Some(Verbosity::High)).unwrap();
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

    #[test]
    pub fn test_make_dictionary_item_key() {
        let key = Key::from_formatted_str(
            "account-hash-e11bfffe63bf899ea07117af8a2bb43ef0078c0e38ebee6b6cb0b0e39c233538",
        )
        .unwrap();
        let value = U256::from(1);
        let dictionary_item_key = make_dictionary_item_key(key, &value);
        assert_eq!(
            dictionary_item_key,
            "145f6211a24c0a8af16b47e7aa58431ea25172eb402903b3c25ac92b9784c7a9".to_string()
        );
        let key = Key::from_formatted_str(
            "account-hash-813428ce1a9805f1087db07e6017c6c4f5af0ee78a05591bb6577763e89b4f1f",
        )
        .unwrap();
        let value = Key::from_formatted_str(
            "account-hash-e11bfffe63bf899ea07117af8a2bb43ef0078c0e38ebee6b6cb0b0e39c233538",
        )
        .unwrap();
        let dictionary_item_key = make_dictionary_item_key(key, &value);
        assert_eq!(
            dictionary_item_key,
            "1e26dc82db208943c3785c0e11b9d78b9c408fee748c78dda5a5d016840dedca".to_string()
        );
    }

    #[test]
    fn test_get_base64_key_from_account_hash() {
        // Test with a known input and expected output
        let input_hash =
            "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f";
        let expected_output = "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf";

        // Call the function under test
        let result = get_base64_key_from_account_hash(input_hash).unwrap();

        // Check the result against the expected output
        assert_eq!(result, expected_output.to_string());
    }
}
