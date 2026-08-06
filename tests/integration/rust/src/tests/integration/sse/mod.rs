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
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use std::time::Duration;
    use tokio::test;
    use tokio::time::timeout;

    #[test]
    pub async fn test_sse_collect_start_from_zero_test() {
        let result = timeout(
            Duration::from_secs(30),
            test_sse_collect_start_from_zero(),
        )
        .await;
        assert!(result.is_ok(), "Test timed out after 30 seconds");
    }
}
