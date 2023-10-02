#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, COLLECTION_NAME, CONTRACT_CEP78_KEY, DICTIONARY_ITEM_KEY,
        DICTIONARY_NAME, TEST_HELLO_KEY, TEST_HELLO_MESSAGE, WAIT_TIME,
    };
    use crate::tests::helpers::create_test_sdk;
    use casper_rust_wasm_sdk::helpers::cl_value_to_json;
    use casper_rust_wasm_sdk::types::account_hash::AccountHash;
    use casper_rust_wasm_sdk::types::account_identifier::AccountIdentifier;
    use casper_rust_wasm_sdk::{
        rpcs::{
            get_balance::GetBalanceInput,
            get_dictionary_item::DictionaryItemInput,
            query_global_state::{KeyIdentifierInput, PathIdentifierInput, QueryGlobalStateParams},
        },
        types::{
            block_identifier::BlockIdentifierInput, deploy_hash::DeployHash,
            deploy_params::dictionary_item_str_params::DictionaryItemStrParams, digest::Digest,
            global_state_identifier::GlobalStateIdentifier, public_key::PublicKey,
        },
    };
    use serde_json::{to_string, Value};
    use std::thread;

    pub async fn test_get_peers() {
        let config: TestConfig = get_config().await;
        let peers = create_test_sdk(Some(config)).get_peers(None, None).await;
        let peers = peers.unwrap();
        assert!(!peers.result.api_version.to_string().is_empty());
        assert!(!peers.result.peers.is_empty());
    }

    pub async fn test_get_account(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let public_key = PublicKey::new(&config.account).unwrap();
        let account_identifier =
            AccountIdentifier::from_account_account_under_public_key(public_key);
        let get_account = create_test_sdk(Some(config))
            .get_account(
                Some(account_identifier),
                None,
                maybe_block_identifier,
                None,
                None,
            )
            .await;
        let get_account = get_account.unwrap();
        assert!(!get_account.result.api_version.to_string().is_empty());
        assert!(!get_account
            .result
            .account
            .account_hash()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_account_with_account_hash(
        maybe_block_identifier: Option<BlockIdentifierInput>,
    ) {
        let config: TestConfig = get_config().await;
        let account_hash = AccountHash::from_formatted_str(&config.account_hash).unwrap();
        let account_identifier = AccountIdentifier::from_account_under_account_hash(account_hash);
        let get_account = create_test_sdk(Some(config))
            .get_account(
                Some(account_identifier),
                None,
                maybe_block_identifier,
                None,
                None,
            )
            .await;
        let get_account = get_account.unwrap();
        assert!(!get_account.result.api_version.to_string().is_empty());
        assert!(!get_account
            .result
            .account
            .account_hash()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_auction_info(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let get_auction_info = create_test_sdk(Some(config))
            .get_auction_info(maybe_block_identifier, None, None)
            .await;
        let get_auction_info = get_auction_info.unwrap();
        assert!(!get_auction_info.result.api_version.to_string().is_empty());
        assert!(!get_auction_info
            .result
            .auction_state
            .block_height()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_balance() {
        let config: TestConfig = get_config().await;
        let get_state_root_hash = create_test_sdk(Some(config.clone()))
            .get_state_root_hash(None, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        let purse_uref = GetBalanceInput::PurseUrefAsString(config.to_owned().purse_uref);
        thread::sleep(WAIT_TIME);
        let get_balance = create_test_sdk(Some(config))
            .get_balance(state_root_hash, purse_uref, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_balance = get_balance.unwrap();
        assert!(!get_balance.result.api_version.to_string().is_empty());
        assert!(!get_balance.result.balance_value.to_string().is_empty());
    }

    pub async fn test_get_block_transfers(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let get_block_transfers = create_test_sdk(Some(config))
            .get_block_transfers(maybe_block_identifier, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_block_transfers = get_block_transfers.unwrap();
        assert!(!get_block_transfers
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!get_block_transfers
            .result
            .block_hash
            .unwrap()
            .to_string()
            .is_empty());

        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_block(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let get_block = create_test_sdk(Some(config))
            .get_block(maybe_block_identifier, None, None)
            .await;
        let get_block = get_block.unwrap();
        assert!(!get_block.result.api_version.to_string().is_empty());
        assert!(!get_block
            .result
            .block
            .unwrap()
            .hash()
            .to_string()
            .is_empty());
    }

    pub async fn test_get_chainspec() {
        let config: TestConfig = get_config().await;
        let get_chainspec = create_test_sdk(Some(config))
            .get_chainspec(None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_chainspec = get_chainspec.unwrap();
        assert!(!get_chainspec.result.api_version.to_string().is_empty());
        assert!(!get_chainspec.result.chainspec_bytes.to_string().is_empty());
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_deploy() {
        let config: TestConfig = get_config().await;
        let get_deploy = create_test_sdk(Some(config.clone()))
            .get_deploy(
                DeployHash::new(&config.deploy_hash).unwrap(),
                Some(true),
                None,
                None,
            )
            .await;
        let get_deploy = get_deploy.unwrap();
        assert!(!get_deploy.result.api_version.to_string().is_empty());
        assert!(!get_deploy.result.deploy.to_string().is_empty());
    }

    pub async fn test_get_dictionary_item() {
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
        params.set_contract_named_key(
            &config.contract_cep78_hash,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
        );
        let dictionary_item = DictionaryItemInput::Params(params);
        let get_dictionary_item = create_test_sdk(Some(config))
            .get_dictionary_item(state_root_hash, dictionary_item, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_dictionary_item = get_dictionary_item.unwrap();
        assert!(!get_dictionary_item
            .result
            .api_version
            .to_string()
            .is_empty());
        // assert!(!get_dictionary_item
        //     .result
        //     .stored_value
        //     .as_cl_value()
        //     .unwrap()
        //     .inner_bytes()
        //     .is_empty());
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_dictionary_item_without_state_root_hash() {
        let config: TestConfig = get_config().await;
        let mut params = DictionaryItemStrParams::new();
        params.set_contract_named_key(
            &config.contract_cep78_hash,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
        );
        let dictionary_item = DictionaryItemInput::Params(params);
        let get_dictionary_item = create_test_sdk(Some(config))
            .get_dictionary_item("", dictionary_item, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_dictionary_item = get_dictionary_item.unwrap();
        assert!(!get_dictionary_item
            .result
            .api_version
            .to_string()
            .is_empty());
        // assert!(!get_dictionary_item
        //     .result
        //     .stored_value
        //     .as_cl_value()
        //     .unwrap()
        //     .inner_bytes()
        //     .is_empty());
        thread::sleep(WAIT_TIME);
    }

    #[allow(deprecated)]
    pub async fn test_get_era_info(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let get_era_info = create_test_sdk(Some(config))
            .get_era_info(maybe_block_identifier, None, None)
            .await;
        let get_era_info = get_era_info.unwrap();
        assert!(!get_era_info.result.api_version.to_string().is_empty());
    }

    pub async fn test_get_era_summary(maybe_block_identifier: Option<BlockIdentifierInput>) {
        let config: TestConfig = get_config().await;
        let get_era_summary = create_test_sdk(Some(config))
            .get_era_summary(maybe_block_identifier, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let get_era_summary = get_era_summary.unwrap();
        assert!(!get_era_summary.result.api_version.to_string().is_empty());
        assert!(!get_era_summary
            .result
            .era_summary
            .block_hash
            .to_string()
            .is_empty());
        thread::sleep(WAIT_TIME);
    }

    pub async fn test_get_node_status() {
        let config: TestConfig = get_config().await;
        let get_node_status = create_test_sdk(Some(config))
            .get_node_status(None, None)
            .await;
        let get_node_status = get_node_status.unwrap();
        assert!(!get_node_status.result.api_version.to_string().is_empty());
        assert!(!get_node_status.result.chainspec_name.to_string().is_empty());
    }

    pub async fn test_get_state_root_hash() {
        let config: TestConfig = get_config().await;
        let get_state_root_hash = create_test_sdk(Some(config))
            .get_state_root_hash(None, None, None)
            .await;
        thread::sleep(WAIT_TIME);
        let state_root_hash: Digest = get_state_root_hash
            .unwrap()
            .result
            .state_root_hash
            .unwrap()
            .into();
        assert!(!state_root_hash.to_string().is_empty());
    }

    pub async fn test_get_validator_changes() {
        let config: TestConfig = get_config().await;
        let validator_changes = create_test_sdk(Some(config))
            .get_validator_changes(None, None)
            .await;
        let validator_changes = validator_changes.unwrap();
        assert!(!validator_changes.result.api_version.to_string().is_empty());
        // assert!(validator_changes.result.changes.is_empty());
    }

    pub async fn test_list_rpcs() {
        let config: TestConfig = get_config().await;
        let list_rpcs = create_test_sdk(Some(config)).list_rpcs(None, None).await;
        let list_rpcs = list_rpcs.unwrap();
        assert!(!list_rpcs.result.api_version.to_string().is_empty());
        assert!(!list_rpcs.result.name.is_empty());
    }

    pub async fn test_query_balance(maybe_global_state_identifier: Option<GlobalStateIdentifier>) {
        let config: TestConfig = get_config().await;
        let query_balance = create_test_sdk(Some(config.clone()))
            .query_balance(
                maybe_global_state_identifier,
                Some(config.purse_uref),
                None,
                None,
                None,
                None,
                None,
            )
            .await;
        let query_balance = query_balance.unwrap();
        assert!(!query_balance.result.api_version.to_string().is_empty());
        assert!(!query_balance.result.balance.to_string().is_empty());
    }

    pub async fn test_query_global_state(
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
    ) {
        let config: TestConfig = get_config().await;
        let path = format!("{CONTRACT_CEP78_KEY}/collection_name");
        thread::sleep(WAIT_TIME);
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            key: KeyIdentifierInput::String(config.to_owned().account_hash),
            path: Some(PathIdentifierInput::String(path)),
            maybe_global_state_identifier,
            state_root_hash: None,
            maybe_block_id: None,
            node_address: None,
            verbosity: None,
        };
        let query_global_state = create_test_sdk(Some(config.clone()))
            .query_global_state(query_params)
            .await;
        thread::sleep(WAIT_TIME);
        let query_global_state = query_global_state.unwrap();
        assert!(!query_global_state.result.api_version.to_string().is_empty());
        // assert!(!query_global_state
        //     .result
        //     .stored_value
        //     .as_cl_value()
        //     .unwrap()
        //     .inner_bytes()
        //     .is_empty());
        thread::sleep(WAIT_TIME);

        // Parse the JSON string in 1.6
        let json_string = to_string(&query_global_state.result.stored_value).unwrap();
        let parsed_json: Value = serde_json::from_str(&json_string).unwrap();
        let cl_value_as_value = &parsed_json["CLValue"]["parsed"];
        assert_eq!(
            *cl_value_as_value,
            Value::String(COLLECTION_NAME.to_string())
        );
    }

    pub async fn test_query_global_state_key_from_account_hash(
        maybe_global_state_identifier: Option<GlobalStateIdentifier>,
    ) {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            key: KeyIdentifierInput::String(config.to_owned().account_hash),
            path: Some(PathIdentifierInput::String(TEST_HELLO_KEY.to_string())),
            maybe_global_state_identifier,
            state_root_hash: None,
            maybe_block_id: None,
            node_address: config.node_address.to_owned(),
            verbosity: config.verbosity.to_owned(),
        };
        let query_global_state = create_test_sdk(Some(config.clone()))
            .query_global_state(query_params)
            .await;
        thread::sleep(WAIT_TIME);
        let query_global_state = query_global_state.unwrap();
        assert!(!query_global_state.result.api_version.to_string().is_empty());
        // assert!(!query_global_state
        //     .result
        //     .stored_value
        //     .as_cl_value()
        //     .unwrap()
        //     .inner_bytes()
        //     .is_empty());
        thread::sleep(WAIT_TIME);

        // Parse the JSON string in 1.6
        let json_string = to_string(&query_global_state.result.stored_value).unwrap();
        let parsed_json: Value = serde_json::from_str(&json_string).unwrap();
        let cl_value_as_value = &parsed_json["CLValue"]["parsed"];
        assert_eq!(
            *cl_value_as_value,
            Value::String(TEST_HELLO_MESSAGE.to_string())
        );
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use crate::config::{get_config, TestConfig, WAIT_TIME};
    use casper_rust_wasm_sdk::types::{
        block_hash::BlockHash, block_identifier::BlockIdentifierInput,
        global_state_identifier::GlobalStateIdentifier,
    };
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_get_peers_test() {
        thread::sleep(WAIT_TIME);
        test_get_peers().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_account_test() {
        test_get_account(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_account_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier = Some(BlockIdentifierInput::String(config.block_hash));
        test_get_account(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_account_with_account_hash_test() {
        test_get_account_with_account_hash(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_auction_info_test() {
        thread::sleep(WAIT_TIME);
        test_get_auction_info(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_auction_info_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier = Some(BlockIdentifierInput::String(config.block_hash));
        test_get_auction_info(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_balance_test() {
        thread::sleep(WAIT_TIME);
        test_get_balance().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_block_transfers_test() {
        thread::sleep(WAIT_TIME);
        test_get_block_transfers(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_block_transfers_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier = Some(BlockIdentifierInput::String(config.block_hash));
        test_get_block_transfers(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_chainspec_test() {
        thread::sleep(WAIT_TIME);
        test_get_chainspec().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_get_deploy().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_dictionary_item_test() {
        thread::sleep(WAIT_TIME);
        test_get_dictionary_item().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_dictionary_item_without_state_root_hash_test() {
        thread::sleep(WAIT_TIME);
        test_get_dictionary_item_without_state_root_hash().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_info_test() {
        thread::sleep(WAIT_TIME);
        test_get_era_info(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_info_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier = Some(BlockIdentifierInput::String(config.block_hash));
        test_get_era_info(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_summary_test() {
        thread::sleep(WAIT_TIME);
        test_get_era_summary(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_era_summary_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_block_identifier = Some(BlockIdentifierInput::String(config.block_hash));
        test_get_era_summary(maybe_block_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_node_status_test() {
        thread::sleep(WAIT_TIME);
        test_get_node_status().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_state_root_hash_test() {
        thread::sleep(WAIT_TIME);
        test_get_state_root_hash().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_get_validator_changes_test() {
        thread::sleep(WAIT_TIME);
        test_get_validator_changes().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_list_rpcs_test() {
        thread::sleep(WAIT_TIME);
        test_list_rpcs().await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_balance_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(&config.block_hash).unwrap(),
        ));
        test_query_balance(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_balance_test() {
        thread::sleep(WAIT_TIME);
        test_query_balance(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_global_state_key_from_account_hash_test() {
        thread::sleep(WAIT_TIME);
        test_query_global_state_key_from_account_hash(None).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_global_state_test_with_block_identifier() {
        let config: TestConfig = get_config().await;
        thread::sleep(WAIT_TIME);
        let maybe_global_state_identifier = Some(GlobalStateIdentifier::from_block_hash(
            BlockHash::new(&config.block_hash).unwrap(),
        ));
        test_query_global_state(maybe_global_state_identifier).await;
        thread::sleep(WAIT_TIME);
    }
    #[test]
    pub async fn test_query_global_state_test() {
        thread::sleep(WAIT_TIME);
        test_query_global_state(None).await;
        thread::sleep(WAIT_TIME);
    }
}
