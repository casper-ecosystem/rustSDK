pub mod test_module {
    use crate::{
        config::{get_config, TestConfig},
        tests::helpers::{intern::create_test_sdk, mint_nft},
    };
    use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;
    use casper_rust_wasm_sdk::SSE::{CESParser, EventName};
    use serde_json::Value;

    /// Live SSEClient::collect with start_from=0 (ApiVersion / BlockAdded).
    pub async fn test_sse_collect_start_from_zero() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));
        let client = sdk.SSE_client(&config.events_address);

        let events = client
            .collect(
                &[EventName::ApiVersion, EventName::BlockAdded],
                1,
                15_000,
                Some(0),
            )
            .await
            .expect("SSE collect");

        assert!(
            !events.is_empty(),
            "expected at least one ApiVersion or BlockAdded with start_from=0"
        );
        assert!(!events[0].data.is_empty());
    }

    /// CESParser::create against a non-contract hash must fail (RPC/schema path).
    pub async fn test_ces_parser_create_rejects_missing_contract() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));
        let missing =
            "0000000000000000000000000000000000000000000000000000000000000001".to_string();
        let err = CESParser::create(&sdk, &[missing], None, config.rpc_address.clone())
            .await
            .expect_err("CESParser::create should fail for missing contract");
        assert!(!err.is_empty());
    }

    fn cep78_contract_key(config: &TestConfig) -> String {
        config.contract_cep78_key.clone()
    }

    fn execution_result_from_get_transaction(result_json: &Value) -> Option<Value> {
        result_json
            .pointer("/execution_info/execution_result")
            .or_else(|| result_json.pointer("/execution_result"))
            .cloned()
    }

    fn assert_ces_events(parser: &CESParser, execution: &Value) {
        let results = parser
            .parse_execution_result(execution)
            .expect("parse_execution_result");
        let ok = results
            .iter()
            .find(|r| r.error.is_none() && !r.event.name.is_empty());
        assert!(
            ok.is_some(),
            "expected at least one CES event without error, got {results:?}"
        );
    }

    /// Recycle get_config CEP78 install; parse CES from install tx or one mint.
    pub async fn test_ces_parser_cep78_happy_path() {
        let config: TestConfig = get_config(false).await;
        let sdk = create_test_sdk(Some(config.clone()));
        let contract_key = cep78_contract_key(&config);
        assert!(
            !contract_key.is_empty(),
            "missing cep78 contract key from config"
        );

        let parser = CESParser::create(&sdk, &[contract_key], None, config.rpc_address.clone())
            .await
            .expect("CESParser::create for cep78");
        assert!(parser.contract_count() >= 1);

        // Prefer install transaction already recorded by get_config (no extra mint).
        if !config.transaction_hash.is_empty() {
            let get_tx = sdk
                .get_transaction(
                    TransactionHash::new(&config.transaction_hash).unwrap(),
                    Some(true),
                    None,
                    config.rpc_address.clone(),
                )
                .await
                .expect("get_transaction install hash");
            let tx_json = serde_json::to_value(&get_tx.result).expect("serialize get_transaction");
            if let Some(execution) = execution_result_from_get_transaction(&tx_json) {
                let results = parser.parse_execution_result(&execution);
                if let Ok(results) = results {
                    if results
                        .iter()
                        .any(|r| r.error.is_none() && !r.event.name.is_empty())
                    {
                        return;
                    }
                }
            }
        }

        // Install had no usable CES transforms; one mint (config mint result was not retained).
        let mint_hash = mint_nft(
            &config.contract_cep78_key,
            &config.account,
            &config.account_hash,
            &config.secret_key,
            (
                config.rpc_address.as_deref().unwrap(),
                &config.events_address,
                &config.chain_name,
            ),
        )
        .await;

        let get_tx = sdk
            .get_transaction(
                TransactionHash::new(&mint_hash).unwrap(),
                Some(true),
                None,
                config.rpc_address.clone(),
            )
            .await
            .expect("get_transaction mint hash");
        let tx_json = serde_json::to_value(&get_tx.result).expect("serialize get_transaction");
        let execution = execution_result_from_get_transaction(&tx_json)
            .expect("mint transaction has execution_result");
        assert_ces_events(&parser, &execution);
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use std::time::Duration;
    use tokio::test;
    use tokio::time::timeout;

    #[test]
    pub async fn test_sse_collect_start_from_zero_test() {
        let result = timeout(Duration::from_secs(30), test_sse_collect_start_from_zero()).await;
        assert!(result.is_ok(), "Test timed out after 30 seconds");
    }

    #[test]
    pub async fn test_ces_parser_create_rejects_missing_contract_test() {
        let result = timeout(
            Duration::from_secs(30),
            test_ces_parser_create_rejects_missing_contract(),
        )
        .await;
        assert!(result.is_ok(), "Test timed out after 30 seconds");
    }

    #[test]
    pub async fn test_ces_parser_cep78_happy_path_test() {
        let result = timeout(Duration::from_secs(90), test_ces_parser_cep78_happy_path()).await;
        assert!(result.is_ok(), "Test timed out after 90 seconds");
    }
}
