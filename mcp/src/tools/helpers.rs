//! Helper tools domain logic (feature `helpers`).

use casper_rust_wasm_sdk::helpers;
use casper_rust_wasm_sdk::types::key::Key;
use casper_types::U256;
use mcpkit::prelude::ToolOutput;
use std::str::FromStr;

use crate::format;
use crate::sdk_handle;

/// Registered helper tool names for help text.
pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_get_current_timestamp",
        "sdk_get_blake2b_hash",
        "sdk_make_dictionary_item_key",
        "sdk_get_base64_key_from_account_hash",
        "sdk_get_base64_key_from_key_hash",
        "sdk_get_ttl_or_default",
        "sdk_parse_timestamp",
        "sdk_parse_ttl",
        "sdk_get_gas_price_or_default",
        "sdk_secret_key_generate",
        "sdk_secret_key_secp256k1_generate",
        "sdk_secret_key_from_pem",
        "sdk_public_key_from_secret_key",
        "sdk_hex_to_uint8_vec",
        "sdk_hex_to_string",
        "sdk_motes_to_cspr",
        "sdk_json_pretty_print",
        "sdk_cl_value_to_json",
    ]
}

pub fn get_current_timestamp(timestamp: Option<String>) -> ToolOutput {
    format::text_ok(helpers::get_current_timestamp(timestamp))
}

pub fn get_blake2b_hash(meta_data: String) -> ToolOutput {
    format::text_ok(helpers::get_blake2b_hash(&meta_data))
}

pub fn make_dictionary_item_key(
    key: String,
    value_key: Option<String>,
    value_u256: Option<String>,
) -> ToolOutput {
    let key = match Key::from_formatted_str(&key) {
        Ok(k) => k,
        Err(err) => return format::err(format!("invalid key: {err}")),
    };
    match (value_key, value_u256) {
        (Some(vk), None) => match Key::from_formatted_str(&vk) {
            Ok(value) => format::text_ok(helpers::make_dictionary_item_key(&key, &value)),
            Err(err) => format::err(format!("invalid value_key: {err}")),
        },
        (None, Some(vu)) => match U256::from_str(&vu) {
            Ok(value) => format::text_ok(helpers::make_dictionary_item_key(&key, &value)),
            Err(err) => format::err(format!("invalid value_u256: {err}")),
        },
        _ => format::err("provide exactly one of value_key or value_u256"),
    }
}

pub fn get_base64_key_from_account_hash(account_hash: String) -> ToolOutput {
    match helpers::get_base64_key_from_account_hash(&account_hash) {
        Ok(v) => format::text_ok(v),
        Err(err) => format::err(err),
    }
}

pub fn get_base64_key_from_key_hash(formatted_hash: String) -> ToolOutput {
    match helpers::get_base64_key_from_key_hash(&formatted_hash) {
        Ok(v) => format::text_ok(v),
        Err(err) => format::err(err),
    }
}

pub fn get_ttl_or_default(ttl: Option<String>) -> ToolOutput {
    format::text_ok(helpers::get_ttl_or_default(ttl.as_deref()))
}

pub fn parse_timestamp(value: String) -> ToolOutput {
    match helpers::parse_timestamp(&value) {
        Ok(ts) => format::text_ok(ts.to_string()),
        Err(err) => format::err(err),
    }
}

pub fn parse_ttl(value: String) -> ToolOutput {
    match helpers::parse_ttl(&value) {
        Ok(ttl) => format::text_ok(ttl.to_string()),
        Err(err) => format::err(err),
    }
}

pub fn get_gas_price_or_default(gas_price: Option<u64>) -> ToolOutput {
    format::json_ok(&serde_json::json!({
        "gas_price": helpers::get_gas_price_or_default(gas_price)
    }))
}

pub fn secret_key_generate() -> ToolOutput {
    match helpers::secret_key_generate() {
        Ok(sk) => match sk.to_pem() {
            Ok(pem) => format::json_ok(&serde_json::json!({
                "algorithm": "ed25519",
                "secret_key_pem": pem,
            })),
            Err(err) => format::err(err),
        },
        Err(err) => format::err(err),
    }
}

pub fn secret_key_secp256k1_generate() -> ToolOutput {
    match helpers::secret_key_secp256k1_generate() {
        Ok(sk) => match sk.to_pem() {
            Ok(pem) => format::json_ok(&serde_json::json!({
                "algorithm": "secp256k1",
                "secret_key_pem": pem,
            })),
            Err(err) => format::err(err),
        },
        Err(err) => format::err(err),
    }
}

pub fn secret_key_from_pem(secret_key: String) -> ToolOutput {
    match helpers::secret_key_from_pem(&secret_key) {
        Ok(sk) => format::json_ok(&serde_json::json!({
            "ok": true,
            "algorithm": format!("{sk:?}").split('(').next().unwrap_or("unknown"),
        })),
        Err(err) => format::err(err),
    }
}

pub fn public_key_from_secret_key(secret_key: String) -> ToolOutput {
    match helpers::public_key_from_secret_key(&secret_key) {
        Ok(pk) => format::text_ok(pk),
        Err(err) => format::err(err),
    }
}

pub fn hex_to_uint8_vec(hex_string: String) -> ToolOutput {
    let bytes = helpers::hex_to_uint8_vec(&hex_string);
    format::json_ok(&serde_json::json!({ "bytes": bytes }))
}

pub fn hex_to_string(hex_string: String) -> ToolOutput {
    format::text_ok(helpers::hex_to_string(&hex_string))
}

pub fn motes_to_cspr(motes: String) -> ToolOutput {
    match helpers::motes_to_cspr(&motes) {
        Ok(cspr) => format::json_ok(&serde_json::json!({ "motes": motes, "cspr": cspr })),
        Err(err) => format::err(err),
    }
}

pub fn json_pretty_print(value: String, verbosity: Option<String>) -> ToolOutput {
    let parsed: serde_json::Value = match serde_json::from_str(&value) {
        Ok(v) => v,
        Err(err) => return format::err(format!("value must be JSON: {err}")),
    };
    let verbosity = sdk_handle::verbosity_override(verbosity.as_deref());
    match helpers::json_pretty_print(parsed, verbosity) {
        Ok(text) => format::text_ok(text),
        Err(err) => format::err(err),
    }
}

pub fn cl_value_to_json(cl_value_json: String) -> ToolOutput {
    let cl_value: casper_types::CLValue = match serde_json::from_str(&cl_value_json) {
        Ok(v) => v,
        Err(err) => {
            return format::err(format!("cl_value_json must deserialize as CLValue: {err}"))
        }
    };
    match helpers::cl_value_to_json(&cl_value) {
        Some(v) => format::json_ok(&v),
        None => format::err("cl_value_to_json returned None"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn motes_to_cspr_basic() {
        let out = motes_to_cspr("1000000000".into());
        let _ = format!("{out:?}");
    }

    #[test]
    fn blake2b_deterministic() {
        let a = get_blake2b_hash("hello".into());
        let b = get_blake2b_hash("hello".into());
        let _ = (a, b);
    }
}
