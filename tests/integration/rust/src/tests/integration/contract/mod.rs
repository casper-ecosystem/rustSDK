#[allow(dead_code)]
pub mod test_module {
    use crate::{
        config::{
            get_config, TestConfig, ARGS_JSON, ARGS_SIMPLE, DICTIONARY_ITEM_KEY, DICTIONARY_NAME,
            ENTRYPOINT_MINT, HELLO_CONTRACT, PAYMENT_AMOUNT, TTL, WASM_PATH,
        },
        tests::helpers::{
            intern::{create_test_sdk, get_dictionnary_key},
            read_wasm_file,
        },
    };
    use casper_rust_wasm_sdk::{
        rpcs::{get_dictionary_item::DictionaryItemInput, query_global_state::PathIdentifierInput},
        types::{
            addr::entity_addr::EntityAddr,
            deploy_params::{
                deploy_str_params::DeployStrParams,
                dictionary_item_str_params::DictionaryItemStrParams,
                payment_str_params::PaymentStrParams, session_str_params::SessionStrParams,
            },
            digest::Digest,
            transaction_params::{
                transaction_builder_params::TransactionBuilderParams,
                transaction_str_params::TransactionStrParams,
            },
        },
    };

    #[allow(deprecated)]
    pub async fn test_install_deploy() -> String {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let mut session_params = SessionStrParams::default();

        let module_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(module_bytes) => module_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return String::from("");
            }
        };
        session_params.set_session_bytes(module_bytes.into());
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);

        let install = create_test_sdk(Some(config))
            .install_deploy(deploy_params, session_params, PAYMENT_AMOUNT, None)
            .await;
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());

        let deploy_hash_as_hex_string =
            install.as_ref().unwrap().result.deploy_hash.to_hex_string();
        assert!(!deploy_hash_as_hex_string.is_empty());
        deploy_hash_as_hex_string
    }

    pub async fn test_install_transaction() -> String {
        let config: TestConfig = get_config(true).await;
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        let mut transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key);
        transaction_params.set_session_args_simple(args_simple);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_ttl(Some(TTL.to_string()));

        let transaction_bytes = match read_wasm_file(&format!("{WASM_PATH}{HELLO_CONTRACT}")) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return String::from("");
            }
        };

        let install = create_test_sdk(Some(config))
            .install(transaction_params, transaction_bytes.into(), None)
            .await;
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());

        let transaction_hash_as_hex_string = install
            .as_ref()
            .unwrap()
            .result
            .transaction_hash
            .to_hex_string();
        assert!(!transaction_hash_as_hex_string.is_empty());
        transaction_hash_as_hex_string
    }

    #[allow(deprecated)]
    pub async fn test_call_entrypoint_deploy() {
        let config: TestConfig = get_config(false).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.secret_key.clone()),
            None,
            Some(TTL.to_string()),
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(
            &config
                .contract_cep78_key
                .replace("entity-contract-", "hash-"),
        );
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        session_params.set_session_args_json(ARGS_JSON);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);

        let test_call_entrypoint_deploy = create_test_sdk(Some(config))
            .call_entrypoint_deploy(deploy_params, session_params, payment_params, None)
            .await;
        assert!(!test_call_entrypoint_deploy
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!test_call_entrypoint_deploy
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_string()
            .is_empty());
    }

    pub async fn test_query_contract_dict() {
        let config: TestConfig = get_config(false).await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        let state_root_hash_digest: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        let state_root_hash = &state_root_hash_digest.to_string();

        let dictionnary_key = get_dictionnary_key(
            &config.contract_cep78_key,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
            Some(state_root_hash),
            config.rpc_address,
        )
        .await;
        assert_eq!(config.dictionary_key, dictionnary_key);
    }

    pub async fn test_query_contract_dict_with_dictionary_key() {
        let config: TestConfig = get_config(false).await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        let mut params = DictionaryItemStrParams::new();
        params.set_dictionary(&config.dictionary_key);
        let dictionary_item = DictionaryItemInput::Params(params);
        let query_contract_dict = create_test_sdk(Some(config))
            .query_contract_dict(state_root_hash, dictionary_item, None, None)
            .await;

        let query_contract_dict = query_contract_dict.unwrap();
        assert!(!query_contract_dict
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!query_contract_dict
            .result
            .stored_value
            .as_cl_value()
            .unwrap()
            .inner_bytes()
            .is_empty());
    }

    pub async fn test_query_contract_dict_with_dictionary_uref() {
        let config: TestConfig = get_config(false).await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();

        let mut params = DictionaryItemStrParams::new();
        params.set_uref(&config.dictionary_uref, DICTIONARY_ITEM_KEY);
        let dictionary_item = DictionaryItemInput::Params(params);
        let query_contract_dict = create_test_sdk(Some(config))
            .query_contract_dict(state_root_hash, dictionary_item, None, None)
            .await;

        let query_contract_dict = query_contract_dict.unwrap();
        assert!(!query_contract_dict
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!query_contract_dict
            .result
            .stored_value
            .as_cl_value()
            .unwrap()
            .inner_bytes()
            .is_empty());
    }

    pub async fn test_query_contract_key() {
        let config: TestConfig = get_config(false).await;

        let entity_identifier = None;
        let entity_identifier_as_string = Some(config.contract_cep78_key.clone());
        let path = PathIdentifierInput::String("installer".to_string());
        let maybe_block_identifier = None;

        // Query the contract key using the parameters
        let query_result = create_test_sdk(Some(config))
            .query_contract_key(
                entity_identifier,
                entity_identifier_as_string,
                path,
                maybe_block_identifier,
                None,
                None,
            )
            .await;
        let result = query_result.unwrap().result;

        assert!(!result.api_version.to_string().is_empty());
        // TODO Check as_addressable_entity
        // assert!(result
        //     .stored_value
        //     .as_addressable_entity()
        //     .unwrap()
        //     .is_account_kind());
    }

    pub async fn test_call_entrypoint_transaction() {
        let config: TestConfig = get_config(false).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key);
        transaction_params.set_session_args_json(ARGS_JSON);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        transaction_params.set_ttl(Some(TTL.to_string()));

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let test_call_entrypoint_transaction = create_test_sdk(Some(config))
            .call_entrypoint(builder_params, transaction_params, None)
            .await;
        assert!(!test_call_entrypoint_transaction
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!test_call_entrypoint_transaction
            .as_ref()
            .unwrap()
            .result
            .transaction_hash
            .to_string()
            .is_empty());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_install_deploy_test() {
        test_install_deploy().await;
    }
    #[test]
    pub async fn test_install_transaction_test() {
        test_install_transaction().await;
    }
    #[test]
    pub async fn test_call_entrypoint_deploy_test() {
        test_call_entrypoint_deploy().await;
    }
    #[test]
    pub async fn test_call_entrypoint_transaction_test() {
        test_call_entrypoint_transaction().await;
    }
    #[test]
    pub async fn test_query_contract_dict_test() {
        test_query_contract_dict().await;
    }
    #[test]
    pub async fn test_query_contract_dict_with_dictionary_key_test() {
        test_query_contract_dict_with_dictionary_key().await;
    }
    #[test]
    pub async fn test_query_contract_dict_with_dictionary_uref_test() {
        test_query_contract_dict_with_dictionary_uref().await;
    }
    #[test]
    pub async fn test_query_contract_key_test() {
        test_query_contract_key().await;
    }
}
