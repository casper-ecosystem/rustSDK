#[allow(dead_code)]
pub mod test_module {
    use crate::{
        config::{get_config, TestConfig, DEFAULT_TTL, TTL},
        tests::helpers::intern::create_test_sdk,
    };
    use casper_rust_wasm_sdk::{
        helpers::{
            get_blake2b_hash, get_current_timestamp, get_gas_price_or_default, get_ttl_or_default,
            hex_to_string, hex_to_uint8_vec, json_pretty_print, make_dictionary_item_key,
            motes_to_cspr, parse_timestamp, parse_ttl, public_key_from_private_key,
            secret_key_from_pem,
        },
        types::{key::Key, verbosity::Verbosity},
    };
    use chrono::DateTime;

    pub async fn test_global_node_address_and_verbosity() {
        let sdk = create_test_sdk(None);
        assert_eq!(sdk.get_node_address(None), "".to_string());
        assert_eq!(sdk.get_verbosity(None), Verbosity::Low);
        let config: TestConfig = get_config(true).await;
        let mut sdk = create_test_sdk(Some(config.clone()));
        assert_eq!(sdk.get_node_address(None), config.node_address.unwrap());
        assert_eq!(sdk.get_verbosity(None), config.verbosity.unwrap());
        let _ = sdk.set_node_address(Some("test".to_string()));
        assert_eq!(sdk.get_node_address(None), "test".to_string());
        let _ = sdk.set_verbosity(Some(Verbosity::Medium));
        assert_eq!(sdk.get_verbosity(None), Verbosity::Medium);
    }

    pub async fn test_hex_to_uint8_vec() {
        let config: TestConfig = get_config(true).await;
        let test: Vec<u8> = hex_to_uint8_vec(&config.account);
        assert!(!test.is_empty());
        assert_eq!(test.len(), 33);
    }

    pub fn test_hex_to_string() {
        let test: String = hex_to_string(
            "5b70726f746f636f6c5d0a232050726f746f636f6c2076657273696f6e2e0a76657273696f6e",
        );
        let expected = "[protocol]\n# Protocol version.\nversion";
        assert!(!test.is_empty());
        assert_eq!(test, expected);
    }

    pub fn test_motes_to_cspr() {
        let cspr = motes_to_cspr("1000000000");
        assert_eq!(cspr, "1");
        let cspr = motes_to_cspr("2500000000");
        assert_eq!(cspr, "2.50");
        let cspr = motes_to_cspr("1111100000000");
        assert_eq!(cspr, "1111.10");
        let cspr = motes_to_cspr("2500000000000000000000000000");
        assert_eq!(cspr, "2500000000000000000");
        let cspr = motes_to_cspr("1000000000000250000000000000");
        assert_eq!(cspr, "1000000000000250000");
    }

    pub async fn test_public_key_from_private_key() {
        let config: TestConfig = get_config(true).await;
        let public_key = public_key_from_private_key(&config.private_key).unwrap();
        assert_eq!(public_key, config.account);
    }

    pub async fn test_secret_key_from_pem() {
        let config: TestConfig = get_config(true).await;
        let secret_key = secret_key_from_pem(&config.private_key).unwrap();
        assert_eq!(secret_key.to_string(), "SecretKey::Ed25519");
    }

    pub fn test_get_current_timestamp() {
        let current_timestamp = get_current_timestamp(None);
        let parsed_timestamp = DateTime::parse_from_rfc3339(&current_timestamp);
        assert!(parsed_timestamp.is_ok());
        let current_timestamp = get_current_timestamp(Some(current_timestamp));
        let parsed_timestamp = DateTime::parse_from_rfc3339(&current_timestamp);
        assert!(parsed_timestamp.is_ok());
    }

    pub fn test_parse_timestamp() {
        let current_timestamp = get_current_timestamp(None);
        let parsed_timestamp = DateTime::parse_from_rfc3339(&current_timestamp);
        assert!(parsed_timestamp.is_ok());
        let parsed_timestamp = parse_timestamp(&current_timestamp);
        assert!(parsed_timestamp.is_ok());
        assert!(!parsed_timestamp.unwrap().to_string().is_empty());
    }

    pub fn test_get_blake2b_hash() {
        let hash = get_blake2b_hash("test_meta_data");
        assert_eq!(
            hash,
            "21ba862c03d43fedded8c1c5a30397f567c1adab5b2a75debc58966c021e3b64"
        );
    }

    pub fn test_get_ttl_or_default() {
        let ttl = get_ttl_or_default(None);
        assert_eq!(ttl, DEFAULT_TTL);
        let ttl = get_ttl_or_default(Some(TTL));
        assert_eq!(ttl, TTL);
    }

    pub fn test_parse_ttl() {
        let ttl = parse_ttl(DEFAULT_TTL).unwrap();
        assert_eq!(ttl.to_string(), DEFAULT_TTL);
        let ttl = parse_ttl(TTL).unwrap();
        assert_eq!(ttl.to_string(), TTL);
    }

    pub fn test_get_gas_price_or_default() {
        let gas_price = get_gas_price_or_default(None);
        assert_eq!(gas_price.to_string(), "1");
        let gas_price = get_gas_price_or_default(Some(2));
        assert_eq!(gas_price.to_string(), "2");
    }

    pub async fn test_get_json_pretty_print() {
        let config: TestConfig = get_config(true).await;
        let get_node_status = create_test_sdk(Some(config))
            .get_node_status(None, None)
            .await;
        let get_node_status = get_node_status.unwrap();
        assert!(!get_node_status.result.api_version.to_string().is_empty());

        // to_string
        let print = json_pretty_print(
            get_node_status.clone().result.block_sync,
            Some(Verbosity::Low),
        );
        let expected = r#"{"historical":null,"forward":null}"#;
        assert_eq!(print, expected);

        // casper_types::json_pretty_print
        let print = json_pretty_print(
            get_node_status.clone().result.block_sync,
            Some(Verbosity::Medium),
        );
        let expected = "{\n  \"historical\": null,\n  \"forward\": null\n}";
        assert_eq!(print, expected);

        // serde_json::to_string_pretty
        let print = json_pretty_print(
            get_node_status.clone().result.block_sync,
            Some(Verbosity::High),
        );
        let expected = "{\n  \"historical\": null,\n  \"forward\": null\n}";
        assert_eq!(print, expected);
    }

    pub fn test_make_dictionary_item_key() {
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
}

#[cfg(test)]
mod tests {
    use super::test_module::*;

    #[test]
    pub fn test_hex_to_string_test() {
        test_hex_to_string();
    }
    #[test]
    pub fn test_motes_to_cspr_test() {
        test_motes_to_cspr();
    }
    #[test]
    pub fn test_parse_timestamp_test() {
        test_parse_timestamp();
    }
    #[test]
    pub fn test_get_blake2b_hash_test() {
        test_get_blake2b_hash();
    }
    #[test]
    pub fn test_get_ttl_or_default_test() {
        test_get_ttl_or_default();
    }
    #[test]
    pub fn test_get_gas_price_or_default_test() {
        test_get_gas_price_or_default();
    }
}

#[cfg(test)]
mod tests_async {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_global_node_address_and_verbosity_test() {
        test_global_node_address_and_verbosity().await;
    }
    #[test]
    pub async fn test_hex_to_uint8_vec_test() {
        test_hex_to_uint8_vec().await;
    }
    #[test]
    pub async fn test_public_key_from_private_key_test() {
        test_public_key_from_private_key().await;
    }
    #[test]
    pub async fn test_secret_key_from_pem_test() {
        test_secret_key_from_pem().await;
    }
    #[test]
    pub async fn test_get_json_pretty_print_test() {
        test_get_json_pretty_print().await;
    }
    #[test]
    pub async fn make_dictionary_item_key_test() {
        test_make_dictionary_item_key();
    }
}
