#[allow(dead_code)]
pub mod test_module {
    use crate::config::{get_config, TestConfig};
    use crate::tests::helpers::intern::create_test_sdk;

    pub async fn test_get_binary_node_status() {
        let config: TestConfig = get_config(true).await;
        let get_binary_node_status = create_test_sdk(Some(config))
            .get_binary_node_status(None)
            .await;
        let get_binary_node_status = get_binary_node_status.unwrap();
        assert!(!get_binary_node_status
            .protocol_version
            .to_string()
            .is_empty());
        assert!(!get_binary_node_status.chainspec_name.to_string().is_empty());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
    use tokio::test;

    #[test]
    pub async fn test_get_binary_node_status_test() {
        test_get_binary_node_status().await;
    }
}
