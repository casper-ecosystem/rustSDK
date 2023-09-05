#[allow(dead_code)]
pub mod test_module {
    use std::thread;

    use crate::tests::{
        helpers::{
            create_test_sdk, CHAIN_NAME, CONFIG, DEFAULT_CONTRACT_HASH, DEFAULT_SESSION_ACCOUNT,
            DEFAULT_TEST_PRIVATE_KEY, TTL,
        },
        integration_tests::test_module::WAIT_TIME,
    };
    use casper_wasm_sdk::{
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

    pub async fn test_call_entrypoint() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            Some(DEFAULT_TEST_PRIVATE_KEY.to_string()),
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(amount);
        let test_call_entrypoint = create_test_sdk()
            .call_entrypoint(
                &CONFIG.node_address,
                deploy_params,
                session_params,
                payment_params,
            )
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
        let get_state_root_hash = create_test_sdk()
            .get_state_root_hash(&CONFIG.node_address, None, None)
            .await;
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        thread::sleep(WAIT_TIME);

        let dictionary_name = "events";
        let dictionary_item_key = "0";
        let mut params = DictionaryItemStrParams::new();
        params.set_contract_named_key(DEFAULT_CONTRACT_HASH, dictionary_name, dictionary_item_key);
        let dictionary_item = DictionaryItemInput::Params(params);
        let query_contract_dict = create_test_sdk()
            .query_contract_dict(
                &CONFIG.node_address,
                state_root_hash,
                dictionary_item,
                CONFIG.verbosity,
            )
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
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            node_address: CONFIG.node_address.clone(),
            key: KeyIdentifierInput::String(DEFAULT_CONTRACT_HASH.to_string()),
            path: Some(PathIdentifierInput::String("installer".to_string())),
            maybe_global_state_identifier,
            state_root_hash: None,
            maybe_block_id: None,
            verbosity: CONFIG.verbosity,
        };
        let query_contract_key = create_test_sdk().query_contract_key(query_params).await;

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
}

#[cfg(test)]
mod tests {
    use crate::tests::{helpers::DEFAULT_BLOCK_HASH, integration_tests::test_module::WAIT_TIME};

    use super::test_module::*;
    use casper_wasm_sdk::types::{
        block_hash::BlockHash, global_state_identifier::GlobalStateIdentifier,
    };
    use std::thread;
    use tokio::test;

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
    pub async fn test_query_contract_key_test() {
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(DEFAULT_BLOCK_HASH).unwrap(),
        ));
        query_contract_key(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
}
