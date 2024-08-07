#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, ENTRYPOINT_MINT, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT,
        TRANSFER_AMOUNT, TTL,
    };
    use crate::tests::helpers::intern::create_test_sdk;
    use casper_rust_wasm_sdk::types::addr::entity_addr::EntityAddr;
    use casper_rust_wasm_sdk::types::transaction_params::{
        transaction_builder_params::TransactionBuilderParams,
        transaction_str_params::TransactionStrParams,
    };

    pub async fn test_transaction() {
        let config: TestConfig = get_config(false).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key.clone());
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let transaction = create_test_sdk(Some(config))
            .transaction(builder_params, transaction_params, None, None)
            .await;

        assert!(!transaction
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transaction
            .as_ref()
            .unwrap()
            .result
            .transaction_hash
            .to_hex_string()
            .is_empty());
    }

    pub async fn test_transfer_transaction() {
        let config: TestConfig = get_config(true).await;

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key.clone());
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        let transfer = create_test_sdk(Some(config.clone()))
            .transfer_transaction(
                None,
                &config.target_account,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                None,
                None,
            )
            .await;
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .transaction_hash
            .to_hex_string()
            .is_empty());
    }

    pub async fn test_speculative_transaction() {
        let config: TestConfig = get_config(false).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key.clone());
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let transaction = create_test_sdk(Some(config.clone()))
            .speculative_transaction(
                builder_params,
                transaction_params,
                None,
                Some(config.speculative_address),
            )
            .await;
        assert!(!transaction
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transaction
            .as_ref()
            .unwrap()
            .result
            .execution_result
            .block_hash
            .to_hex_string()
            .is_empty());
    }

    pub async fn test_speculative_transfer_transaction() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(&config.chain_name);
        transaction_params.set_initiator_addr(&config.account);
        transaction_params.set_secret_key(&config.secret_key.clone());
        transaction_params.set_ttl(Some(TTL.to_string()));
        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);

        let transfer = create_test_sdk(Some(config.clone()))
            .speculative_transfer_transaction(
                None,
                &config.target_account,
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                None,
                Some(config.speculative_address),
            )
            .await;
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());
        assert!(!transfer
            .as_ref()
            .unwrap()
            .result
            .execution_result
            .block_hash
            .to_hex_string()
            .is_empty());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_transaction_test() {
        test_transaction().await;
    }

    #[test]
    pub async fn test_transfer_transaction_test() {
        test_transfer_transaction().await;
    }

    #[test]
    pub async fn test_speculative_transaction_test() {
        test_speculative_transaction().await;
    }

    #[test]
    pub async fn test_speculative_transfer_transaction_test() {
        test_speculative_transfer_transaction().await;
    }
}
