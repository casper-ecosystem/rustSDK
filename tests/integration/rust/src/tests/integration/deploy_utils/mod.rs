#[allow(dead_code)]
pub mod test_module {
    use crate::tests::helpers::{
        create_test_sdk, CHAIN_NAME, DEFAULT_SESSION_ACCOUNT, DEFAULT_TARGET_ACCOUNT,
        DEFAULT_TEST_PRIVATE_KEY, TTL,
    };
    use casper_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub async fn test_make_deploy() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(amount);
        let make_deploy = create_test_sdk()
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();
        assert!(!make_deploy.hash().to_string().is_empty());
        assert_eq!(make_deploy.session().entry_point_name(), entrypoint);
    }

    pub async fn test_make_transfer() {
        let transfer_amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount("10000");
        let make_transfer = create_test_sdk()
            .make_transfer(
                transfer_amount,
                DEFAULT_TARGET_ACCOUNT,
                None,
                deploy_params,
                payment_params,
            )
            .unwrap();
        assert!(!make_transfer.hash().to_string().is_empty());
        assert!(make_transfer.session().is_transfer());
    }

    pub async fn test_sign_deploy() {
        let session_hash = "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477";
        let entrypoint = "decimals";
        let amount = "5500000000";
        let deploy_params = DeployStrParams::new(
            CHAIN_NAME,
            DEFAULT_SESSION_ACCOUNT,
            None,
            None,
            Some(TTL.to_string()),
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_hash(session_hash);
        session_params.set_session_entry_point(entrypoint);
        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(amount);
        let make_deploy = create_test_sdk()
            .make_deploy(deploy_params, session_params, payment_params)
            .unwrap();
        let signed_deploy = create_test_sdk().sign_deploy(make_deploy, DEFAULT_TEST_PRIVATE_KEY);
        assert!(signed_deploy.is_valid());
    }
}

#[cfg(test)]
mod tests {
    use crate::tests::integration_tests::test_module::WAIT_TIME;

    use super::test_module::*;
    use std::thread;
    use tokio::test;

    #[test]
    pub async fn test_make_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_make_deploy().await;
        thread::sleep(WAIT_TIME);
    }

    #[test]
    pub async fn test_make_transfer_test() {
        thread::sleep(WAIT_TIME);
        test_make_transfer().await;
        thread::sleep(WAIT_TIME);
    }

    #[test]
    pub async fn test_sign_deploy_test() {
        thread::sleep(WAIT_TIME);
        test_sign_deploy().await;
        thread::sleep(WAIT_TIME);
    }
}
