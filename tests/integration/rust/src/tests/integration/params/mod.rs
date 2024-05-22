#[allow(dead_code)]
pub mod test_module {

    use crate::config::{
        get_config, TestConfig, DEFAULT_TTL, DICTIONARY_ITEM_KEY, DICTIONARY_NAME, ENTRYPOINT_MINT,
        PAYMENT_AMOUNT, TTL,
    };
    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, dictionary_item_str_params::DictionaryItemStrParams,
        payment_str_params::PaymentStrParams, session_str_params::SessionStrParams,
    };

    pub async fn test_deploy_params() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
            None,
        );
        assert_eq!(deploy_params.chain_name().unwrap(), config.chain_name);
        assert_eq!(deploy_params.ttl().unwrap(), TTL);
        assert_eq!(deploy_params.session_account().unwrap(), config.account);
        assert_eq!(deploy_params.secret_key(), None);
        assert!(deploy_params.timestamp().is_some());
    }

    pub async fn test_deploy_params_defaults() {
        let config: TestConfig = get_config(true).await;
        let deploy_params = DeployStrParams::default();
        deploy_params.set_chain_name(&config.chain_name);
        deploy_params.set_session_account(&config.account);

        assert_eq!(deploy_params.chain_name().unwrap(), config.chain_name);
        assert_eq!(deploy_params.session_account().unwrap(), config.account);
        assert!(deploy_params.timestamp().is_none());
        assert!(deploy_params.ttl().is_none());

        deploy_params.set_default_ttl();
        deploy_params.set_default_timestamp();
        assert!(deploy_params.timestamp().is_some());
        assert_eq!(deploy_params.ttl().unwrap(), DEFAULT_TTL);
    }

    pub async fn test_session_params() {
        let config: TestConfig = get_config(true).await;
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(&config.contract_cep78_hash);
        session_params.set_session_entry_point(ENTRYPOINT_MINT);
        assert_eq!(
            session_params.session_hash().unwrap(),
            config.contract_cep78_hash
        );
        assert_eq!(
            session_params.session_entry_point().unwrap(),
            ENTRYPOINT_MINT
        );
    }

    pub fn test_payment_params() {
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        assert_eq!(payment_params.payment_amount().unwrap(), PAYMENT_AMOUNT);
    }

    pub async fn test_dictionary_item_params() {
        let config: TestConfig = get_config(false).await;
        let mut dictionary_item_params = DictionaryItemStrParams::default();
        //  dictionary_item_params.
        assert!(dictionary_item_params.account_named_key().is_none());
        assert!(dictionary_item_params.contract_named_key().is_none());
        assert!(dictionary_item_params.uref().is_none());
        assert!(dictionary_item_params.dictionary().is_none());

        dictionary_item_params.set_account_named_key(
            &config.account_hash,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
        );
        assert!(dictionary_item_params.account_named_key().is_some());
        dictionary_item_params.set_contract_named_key(
            &config.contract_cep78_hash,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
        );
        assert!(dictionary_item_params.contract_named_key().is_some());
        dictionary_item_params.set_uref(&config.dictionary_uref, DICTIONARY_ITEM_KEY);
        assert!(dictionary_item_params.uref().is_some());
        dictionary_item_params.set_dictionary(&config.dictionary_key);
        assert!(dictionary_item_params.dictionary().is_some());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;

    #[test]
    pub fn test_payment_params_test() {
        test_payment_params();
    }
}

#[cfg(test)]
mod tests_async {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_session_params_test() {
        test_session_params().await;
    }
    #[test]
    pub async fn test_deploy_params_test() {
        test_deploy_params().await;
    }
    #[test]
    pub async fn test_deploy_params_defaults_test() {
        test_deploy_params_defaults().await;
    }

    #[test]
    pub async fn test_dictionary_item_params_test() {
        test_dictionary_item_params().await;
    }
}
