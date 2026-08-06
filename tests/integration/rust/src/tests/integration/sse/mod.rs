pub mod test_module {
    use crate::{
        config::{get_config, TestConfig},
        tests::helpers::intern::create_test_sdk,
    };
    use casper_rust_wasm_sdk::SSE::EventName;

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
        let err = casper_rust_wasm_sdk::SSE::CESParser::create(
            &sdk,
            &[missing],
            None,
            config.rpc_address.clone(),
        )
        .await
        .expect_err("CESParser::create should fail for missing contract");
        assert!(!err.is_empty());
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
}
