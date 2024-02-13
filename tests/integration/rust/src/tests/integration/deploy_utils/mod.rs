#[allow(dead_code)]
pub mod test_module {
    use crate::config::{
        get_config, TestConfig, ENTRYPOINT_DECIMALS, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT,
        TRANSFER_AMOUNT, TTL,
    };
    use crate::tests::helpers::intern::create_test_sdk;
    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };
    use serde_json::Value;

    pub async fn test_make_deploy() {
        let config: TestConfig = get_config(false).await;
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
        assert!(!make_deploy.hash().to_string().is_empty());
        // assert_eq!(
        //     make_deploy.session().entry_point_name(),
        //     ENTRYPOINT_DECIMALS
        // );

        // Parse the JSON string in 1.6
        let json_string = &make_deploy.to_json_string().unwrap();
        let parsed_json: Value = serde_json::from_str(json_string).unwrap();
        let cl_value_as_value = &parsed_json["session"]["StoredContractByHash"]["entry_point"];
        assert_eq!(
            *cl_value_as_value,
            Value::String(ENTRYPOINT_DECIMALS.to_string())
        );
    }

    pub async fn test_make_transfer() {
        let config: TestConfig = get_config(true).await;
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
        assert!(!make_transfer.hash().to_string().is_empty());

        // assert!(make_transfer.session().is_transfer());

        // Parse the JSON string in 1.6
        let json_string = make_transfer.to_json_string().unwrap();
        let parsed_json: Value = serde_json::from_str(&json_string).unwrap();
        let cl_value_as_value = &parsed_json["session"]["Transfer"]["args"];
        assert!(cl_value_as_value.is_array());
    }

    pub async fn test_sign_deploy() {
        let config: TestConfig = get_config(false).await;
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
        // Parse the JSON string in 1.6
        let parsed_json: Value =
            serde_json::from_str(&signed_deploy.to_json_string().unwrap()).unwrap();
        let cl_value_as_value = &parsed_json["approvals"][0]["signer"];
        assert_eq!(
            *cl_value_as_value,
            Value::String(config.account.to_string())
        );
        let cl_value_as_value = &parsed_json["approvals"][0]["signature"];
        assert!(cl_value_as_value.is_string());
    }
}

#[cfg(test)]
mod tests {
    use super::test_module::*;
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
