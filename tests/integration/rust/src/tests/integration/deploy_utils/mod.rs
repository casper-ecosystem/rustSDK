#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, ENTRYPOINT_DECIMALS, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT,
        TRANSFER_AMOUNT, TTL,
    };
    use crate::tests::helpers::create_test_sdk;
    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub async fn test_make_deploy() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(&config.contract_cep78_hash);
        session_params.set_session_entry_point(ENTRYPOINT_DECIMALS);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let make_deploy = create_test_sdk(Some(config))
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();
        assert!(!make_deploy.hash.to_string().is_empty());
        // assert_eq!(
        //     make_deploy.session().entry_point_name(),
        //     ENTRYPOINT_DECIMALS
        // );
    }

    pub async fn test_make_transfer() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let make_transfer = create_test_sdk(Some(config.clone()))
            .make_transfer(
                TRANSFER_AMOUNT,
                &config.target_account,
                None,
                deploy_params,
                payment_params,
            )
            .unwrap();
        assert!(!make_transfer.hash.to_string().is_empty());
        // assert!(make_transfer.session().is_transfer());
    }

    pub async fn test_sign_deploy() {
        let config: TestConfig = get_config().await;
        let deploy_params = DeployStrParams::new(
            &config.chain_name,
            &config.account,
            None,
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(&config.contract_cep78_hash);
        session_params.set_session_entry_point(ENTRYPOINT_DECIMALS);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT);
        let make_deploy = create_test_sdk(Some(config.clone()))
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();
        let signed_deploy = create_test_sdk(Some(config.clone()))
            .sign_deploy(make_deploy, &config.to_owned().private_key);
        // assert!(signed_deploy.is_valid());
    }
}

#[cfg(test)]
mod tests {
    use crate::config::WAIT_TIME;

    use super::test_module::*;
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_make_deploy_test() {
        test_make_deploy().await;
    }

    #[test]
    pub async fn test_make_transfer_test() {
        test_make_transfer().await;
    }

    #[test]
    pub async fn test_sign_deploy_test() {
        test_sign_deploy().await;
    }
}
