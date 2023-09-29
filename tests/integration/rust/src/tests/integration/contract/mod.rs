#[allow(dead_code)]
pub mod test_module {
    use crate::{
        config::{
            get_config, TestConfig, ARGS_JSON, ARGS_SIMPLE, DICTIONARY_ITEM_KEY, DICTIONARY_NAME,
            ENTRYPOINT_MINT, HELLO_CONTRACT, PAYMENT_AMOUNT, TTL, WAIT_TIME,
        },
        tests::helpers::{create_test_sdk, get_dictionnary_key, read_wasm_file},
    };
    use casper_rust_wasm_sdk::{
        rpcs::{
            get_dictionary_item::DictionaryItemInput,
            query_global_state::{KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams},
        },
        types::{
            deploy_params::{
                deploy_str_params::DeployStrParams,
                dictionary_item_str_params::DictionaryItemStrParams,
                payment_str_params::PaymentStrParams, session_str_params::SessionStrParams,
            },
            digest::Digest,
            global_state_identifier::GlobalStateIdentifier,
        },
    };
    use std::thread;

    pub async fn test_call_entrypoint() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(&config.contract_cep78_hash);
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        session_params.set_session_args_json(ARGS_JSON);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let test_call_entrypoint = create_test_sdk(Some(config))
            .call_entrypoint(deploy_params, session_params, payment_params, None)
            .await;
        assert!(!test_call_entrypoint
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!test_call_entrypoint
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_string()
            .is_empty());
    }

    pub async fn test_query_contract_dict() {
        let config: TestConfig = get_config().await;
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
        thread::sleep(WAIT_TIME);
        let dictionnary_key = get_dictionnary_key(
            &config.contract_cep78_hash,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
            Some(state_root_hash),
        )
        .await;
        assert_eq!(config.dictionary_key, dictionnary_key);
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_query_contract_dict_with_dictionary_key() {
        let config: TestConfig = get_config().await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        thread::sleep(WAIT_TIME);

        let mut params = DictionaryItemStrParams::new();
        params.set_dictionary(&config.dictionary_key);
        let dictionary_item = DictionaryItemInput::Params(params);
        let query_contract_dict = create_test_sdk(Some(config))
            .query_contract_dict(state_root_hash, dictionary_item, None, None)
            .await;
        thread::sleep(WAIT_TIME);
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
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_query_contract_dict_with_dictionary_uref() {
        let config: TestConfig = get_config().await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        thread::sleep(WAIT_TIME);

        let mut params = DictionaryItemStrParams::new();
        params.set_uref(&config.dictionary_uref, DICTIONARY_ITEM_KEY);
        let dictionary_item = DictionaryItemInput::Params(params);
        let query_contract_dict = create_test_sdk(Some(config))
            .query_contract_dict(state_root_hash, dictionary_item, None, None)
            .await;
        thread::sleep(WAIT_TIME);
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
        thread::sleep(WAIT_TIME);
    }

    pub async fn query_contract_key(maybe_global_state_identifier: Option<GlobalStateIdentifier>) {
        let config: TestConfig = get_config().await;
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            key: KeyIdentifierInput::String(config.to_owned().contract_cep78_hash),
            path: Some(PathIdentifierInput::String("installer".to_string())),
            maybe_global_state_identifier,
            state_root_hash: None,
            maybe_block_id: None,
            node_address: config.to_owned().node_address,
            verbosity: config.to_owned().verbosity,
        };
        let query_contract_key = create_test_sdk(Some(config))
            .query_contract_key(query_params)
            .await;

        let query_contract_key = query_contract_key.unwrap();
        assert!(!query_contract_key.result.api_version.to_string().is_empty());
        assert!(!query_contract_key
            .result
            .stored_value
            .as_account()
            .unwrap()
            .account_hash()
            .to_string()
            .is_empty());
    }

    pub async fn test_install() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            Some(config.private_key.clone()),
            None,
            Some(TTL.to_string()),
        );
        let mut session_params = SessionStrParams::default();
        let payment_params = PaymentStrParams::default();
        let file_path = HELLO_CONTRACT;
        let module_bytes = match read_wasm_file(file_path) {
            Ok(module_bytes) => module_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };
        session_params.set_session_bytes(module_bytes.into());
        let args_simple: Vec<String> = ARGS_SIMPLE.iter().map(|s| s.to_string()).collect();
        session_params.set_session_args(args_simple);
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let install = create_test_sdk(Some(config))
            .install(deploy_params, session_params, payment_params, None)
            .await;
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_string()
            .is_empty());
    }
}

#[cfg(test)]
mod tests {
    use crate::config::{get_config, TestConfig, WAIT_TIME};

    use super::test_module::*;
    use casper_rust_wasm_sdk::types::{
        block_hash::BlockHash, global_state_identifier::GlobalStateIdentifier,
    };
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_install_test() {
        thread::sleep(WAIT_TIME);
        test_install().await;
        thread::sleep(WAIT_TIME);
    }

    #[test]
    pub async fn test_call_entrypoint_test() {
        thread::sleep(WAIT_TIME);
        test_call_entrypoint().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_contract_dict_test() {
        thread::sleep(WAIT_TIME);
        test_query_contract_dict().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_contract_dict_with_dictionary_key_test() {
        thread::sleep(WAIT_TIME);
        test_query_contract_dict_with_dictionary_key().await;
        thread::sleep(WAIT_TIME);
    }
    // TODO Remove
    #[should_panic]
    #[test]
    pub async fn test_query_contract_dict_with_dictionary_uref_test() {
        thread::sleep(WAIT_TIME);
        test_query_contract_dict_with_dictionary_uref().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_contract_key_test() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(&config.block_hash).unwrap(),
        ));
        query_contract_key(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
}