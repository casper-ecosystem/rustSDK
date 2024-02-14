#[allow(dead_code)]
pub mod test_module {
    use crate::{
        config::{get_config, TestConfig, DEFAULT_EVENT_ADDRESS},
        tests::{
            helpers::{get_event_handler_fn, intern::create_test_sdk},
            integration::contract::test_module::test_install,
        },
    };
    use casper_rust_wasm_sdk::deploy_watcher::deploy_watcher::{
        DeploySubscription, EventHandlerFn,
    };

    pub async fn test_wait_deploy() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let deploy_hash = test_install().await;

        assert!(!deploy_hash.is_empty());

        let event_parse_result = sdk
            .wait_deploy(DEFAULT_EVENT_ADDRESS, &deploy_hash)
            .await
            .unwrap();
        let deploy_processed = event_parse_result.body.deploy_processed.unwrap();
        assert_eq!(deploy_processed.deploy_hash, deploy_hash);
    }

    pub async fn test_wait_deploy_timeout() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

        let event_parse_result = sdk
            .wait_deploy(DEFAULT_EVENT_ADDRESS, deploy_hash)
            .await
            .unwrap();
        dbg!(event_parse_result);
    }

    pub async fn test_watch_deploy() {
        let config: TestConfig = get_config(true).await;
        let sdk = create_test_sdk(Some(config.clone()));

        let deploy_hash = test_install().await;

        assert!(!deploy_hash.is_empty());

        let mut watcher = sdk.watch_deploy(DEFAULT_EVENT_ADDRESS);

        let mut deploy_subscriptions: Vec<DeploySubscription> = vec![];
        let deploy_hash_results = vec![deploy_hash.clone()];

        for deploy_hash in deploy_hash_results {
            let event_handler_fn = get_event_handler_fn(deploy_hash.clone());
            deploy_subscriptions.push(DeploySubscription::new(
                deploy_hash.clone(),
                EventHandlerFn::new(event_handler_fn),
            ));
        }

        let _ = watcher.subscribe(deploy_subscriptions);
        let _results = watcher.clone().start().await;
        watcher.clone().stop();
        // dbg!(_results);
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use std::time::Duration;
    use tokio::test;
    use tokio::time::timeout;

    #[test]
    pub async fn test_wait_deploy_test() {
        // Wrap the test function with a timeout of 45 seconds
        let result = timeout(Duration::from_secs(45), test_wait_deploy()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 45 seconds");
    }

    #[test]
    pub async fn test_wait_deploy_timeout_test() {
        // Wrap the test function with a timeout of 5 seconds
        let result = timeout(Duration::from_secs(10), test_wait_deploy_timeout()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 5 seconds");
    }

    #[test]
    pub async fn test_watch_deploy_test() {
        // Wrap the test function with a timeout of 45 seconds
        let result = timeout(Duration::from_secs(45), test_watch_deploy()).await;
        // Assert whether the test completed within the timeout period
        assert!(result.is_ok(), "Test timed out after 45 seconds");
    }
}
