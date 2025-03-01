pub mod test_module {
    use crate::{
        config::{get_config, TestConfig},
        tests::{
            helpers::{get_event_handler_fn, intern::create_test_sdk},
            integration::contract::test_module::{test_install_deploy, test_install_transaction},
        },
    };
    use casper_rust_wasm_sdk::watcher::{EventHandlerFn, Subscription};

    pub async fn test_wait_transaction() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let transaction_hash = test_install_transaction().await;

        assert!(!transaction_hash.is_empty());

        let event_parse_result = sdk
            .wait_transaction(&config.events_address, &transaction_hash, None)
            .await
            .unwrap();
        let transaction_processed = event_parse_result
            .body
            .unwrap()
            .get_transaction_processed()
            .unwrap();
        assert_eq!(transaction_processed.hash.to_string(), transaction_hash);
    }

    #[allow(deprecated)]
    pub async fn test_wait_deploy() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let deploy_hash = test_install_deploy().await;

        assert!(!deploy_hash.is_empty());

        let event_parse_result = sdk
            .wait_deploy(&config.events_address, &deploy_hash, None)
            .await
            .unwrap();
        let deploy_processed = event_parse_result
            .body
            .unwrap()
            .get_deploy_processed()
            .unwrap();
        assert_eq!(deploy_processed.hash.to_string(), deploy_hash);
    }

    pub async fn test_wait_transaction_timeout(timeout_duration: Option<u64>) {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        // random non existing transaction_hash
        let transaction_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

        let event_parse_result = sdk
            .wait_transaction(&config.events_address, transaction_hash, timeout_duration)
            .await
            .unwrap();
        assert_eq!(event_parse_result.err.unwrap(), "Timeout expired");
    }

    #[allow(deprecated)]
    pub async fn test_wait_deploy_timeout(timeout_duration: Option<u64>) {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        // random non existing deploy_hash
        let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

        let event_parse_result = sdk
            .wait_deploy(&config.events_address, deploy_hash, timeout_duration)
            .await
            .unwrap();
        assert_eq!(event_parse_result.err.unwrap(), "Timeout expired");
    }

    pub async fn test_watch_transaction() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let transaction_hash = test_install_transaction().await;

        assert!(!transaction_hash.is_empty());

        let mut watcher = sdk.watch_transaction(&config.events_address, None);

        let mut subscriptions: Vec<Subscription> = vec![];
        let transaction_hash_results = vec![transaction_hash.clone()];

        for transaction_hash in transaction_hash_results {
            let event_handler_fn = get_event_handler_fn(transaction_hash.clone());
            subscriptions.push(Subscription::new(
                transaction_hash,
                EventHandlerFn::new(event_handler_fn),
            ));
        }

        let _ = watcher.subscribe(subscriptions);
        let event_parse_results = watcher.start().await;
        watcher.stop();
        let event_parse_results = event_parse_results.as_ref().unwrap();

        let actual_transaction_hash = event_parse_results
            .first()
            .as_ref()
            .and_then(|result| result.body.as_ref())
            .and_then(|body| body.get_transaction_processed())
            .map(|transaction_processed| transaction_processed.hash.to_string())
            .expect("Expected transaction hash in the result");

        assert_eq!(actual_transaction_hash, transaction_hash);
    }

    #[allow(deprecated)]
    pub async fn test_watch_deploy() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let deploy_hash = test_install_deploy().await;

        assert!(!deploy_hash.is_empty());

        let mut watcher = sdk.watch_deploy(&config.events_address, None);

        let mut subscriptions: Vec<Subscription> = vec![];
        let deploy_hash_results = vec![deploy_hash.clone()];

        for deploy_hash in deploy_hash_results {
            let event_handler_fn = get_event_handler_fn(deploy_hash.clone());
            subscriptions.push(Subscription::new(
                deploy_hash,
                EventHandlerFn::new(event_handler_fn),
            ));
        }

        let _ = watcher.subscribe(subscriptions);
        let event_parse_results = watcher.start().await;
        watcher.stop();
        let event_parse_results = event_parse_results.as_ref().unwrap();

        let actual_deploy_hash = event_parse_results
            .first()
            .as_ref()
            .and_then(|result| result.body.as_ref())
            .and_then(|body| body.get_deploy_processed())
            .map(|deploy_processed| deploy_processed.hash.to_string())
            .expect("Expected deploy hash in the result");

        assert_eq!(actual_deploy_hash, deploy_hash);
    }

    pub async fn test_watch_transaction_timeout(timeout_duration: Option<u64>) {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let mut watcher = sdk.watch_transaction(&config.events_address, timeout_duration);

        let mut subscriptions: Vec<Subscription> = vec![];

        // random non existing transaction_hash
        let transaction_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";
        let transaction_hash_2 = "720a2fb78a0621562072d9786b2d540a15a4b1bf83bdcbb1ff3680a8e1e3a522";

        let transaction_hash_results = vec![transaction_hash, transaction_hash_2];

        for transaction_hash in transaction_hash_results {
            let event_handler_fn = get_event_handler_fn(transaction_hash.to_string());
            subscriptions.push(Subscription::new(
                transaction_hash.to_string(),
                EventHandlerFn::new(event_handler_fn),
            ));
        }

        let _ = watcher.subscribe(subscriptions);
        let event_parse_results = watcher.clone().start().await;
        watcher.clone().stop();
        let event_parse_results = event_parse_results.unwrap();
        let err = event_parse_results.first().unwrap().err.as_ref().unwrap();
        assert_eq!(err, "Timeout expired");
    }

    #[allow(deprecated)]
    pub async fn test_watch_deploy_timeout(timeout_duration: Option<u64>) {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let mut watcher = sdk.watch_deploy(&config.events_address, timeout_duration);

        let mut subscriptions: Vec<Subscription> = vec![];

        // random non existing deploy_hash
        let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";
        let deploy_hash_2 = "720a2fb78a0621562072d9786b2d540a15a4b1bf83bdcbb1ff3680a8e1e3a522";

        let deploy_hash_results = vec![deploy_hash, deploy_hash_2];

        for deploy_hash in deploy_hash_results {
            let event_handler_fn = get_event_handler_fn(deploy_hash.to_string());
            subscriptions.push(Subscription::new(
                deploy_hash.to_string(),
                EventHandlerFn::new(event_handler_fn),
            ));
        }

        let _ = watcher.subscribe(subscriptions);
        let event_parse_results = watcher.clone().start().await;
        watcher.clone().stop();
        let event_parse_results = event_parse_results.unwrap();
        let err = event_parse_results.first().unwrap().err.as_ref().unwrap();
        assert_eq!(err, "Timeout expired");
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use std::time::Duration;
    use tokio::test;
    use tokio::time::timeout;

    #[test]
    pub async fn test_wait_transaction_test() {
        // Wrap the test function with a timeout of 45 seconds
        let result = timeout(Duration::from_secs(45), test_wait_transaction()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 45 seconds");
    }

    #[test]
    pub async fn test_wait_deploy_test() {
        // Wrap the test function with a timeout of 45 seconds
        let result = timeout(Duration::from_secs(45), test_wait_deploy()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 45 seconds");
    }

    // Run this test if you want to check default timeout of 60 seconds
    // #[test]
    // pub async fn test_wait_transaction_default_timeout_test() {
    //     // Wrap the test function with a timeout of 70 seconds
    //     let result = timeout(Duration::from_secs(70), test_wait_transaction_timeout(None)).await;
    //     // Assert whether the test completed within the timeout period
    //     assert!(result.is_ok(), "Test timed out after 70 seconds");
    // }

    // Run this test if you want to check default timeout of 60 seconds
    // #[test]
    // pub async fn test_wait_deploy_default_timeout_test() {
    //     // Wrap the test function with a timeout of 70 seconds
    //     let result = timeout(Duration::from_secs(70), test_wait_deploy_timeout(None)).await;
    //     // Assert whether the test completed within the timeout period
    //     assert!(result.is_ok(), "Test timed out after 70 seconds");
    // }

    #[test]
    pub async fn test_wait_transaction_test_defined_timeout_test() {
        // Wrap the test function with a timeout of 10 seconds
        let result = timeout(
            Duration::from_secs(10),
            test_wait_transaction_timeout(Some(5000)),
        )
        .await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 10 seconds");
    }

    #[test]
    pub async fn test_wait_deploy_test_defined_timeout_test() {
        // Wrap the test function with a timeout of 10 seconds
        let result = timeout(
            Duration::from_secs(10),
            test_wait_deploy_timeout(Some(5000)),
        )
        .await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 10 seconds");
    }

    #[test]
    pub async fn test_watch_transaction_defined_timeout_test() {
        // Wrap the test function with a timeout of 10 seconds
        let result = timeout(
            Duration::from_secs(10),
            test_watch_transaction_timeout(Some(5000)), // should time out on 3s on the 5s available for the test
        )
        .await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 10 seconds");
    }

    #[test]
    pub async fn test_watch_deploy_defined_timeout_test() {
        // Wrap the test function with a timeout of 10 seconds
        let result = timeout(
            Duration::from_secs(10),
            test_watch_deploy_timeout(Some(5000)), // should time out on 3s on the 5s available for the test
        )
        .await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 10 seconds");
    }

    #[test]
    pub async fn test_watch_transaction_test() {
        // Wrap the test function with a timeout of 60 seconds
        let result = timeout(Duration::from_secs(60), test_watch_transaction()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 60 seconds");
    }

    #[test]
    pub async fn test_watch_deploy_test() {
        // Wrap the test function with a timeout of 60 seconds
        let result = timeout(Duration::from_secs(60), test_watch_deploy()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 60 seconds");
    }
}
