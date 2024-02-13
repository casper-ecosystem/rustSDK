#[allow(dead_code)]
pub mod test_module {
    use crate::{
        config::{get_config, TestConfig, DEFAULT_EVENT_ADDRESS},
        tests::{
            helpers::intern::create_test_sdk, integration::contract::test_module::test_install,
        },
    };
    use casper_rust_wasm_sdk::deploy_watcher::deploy_watcher::{
        DeploySubscription, EventHandlerFn, EventParseResult,
    };

    fn get_event_handler_fn(deploy_hash: String) -> impl Fn(EventParseResult) {
        move |event_parse_result: EventParseResult| {
            println!("get_event_handler_fn {}", deploy_hash);
            if let Some(err) = &event_parse_result.err {
                println!("{} {}", deploy_hash, err);
            } else if let Some(deploy_processed) = &event_parse_result.body.deploy_processed {
                if let Some(success) = &deploy_processed.execution_result.success {
                    println!(
                        "Hash: {}\nBlock: {:?}\nCost: {} motes",
                        deploy_hash, deploy_processed.block_hash, success.cost
                    );
                    return;
                } else if let Some(failure) = &deploy_processed.execution_result.failure {
                    println!(
                        "Hash: {}\nBlock: {:?}\nError: \"{}\"",
                        deploy_hash, deploy_processed.block_hash, failure.error_message
                    );
                    return;
                }
            }
            println!("No information available for {}", deploy_hash);
        }
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
        let _ = watcher.clone().start().await;
        watcher.clone().stop();
    }

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
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_watch_deploy_test() {
        test_watch_deploy().await;
    }

    #[test]
    pub async fn test_wait_deploy_test() {
        test_wait_deploy().await;
    }
}
