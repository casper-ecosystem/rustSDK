#[allow(dead_code)]
pub mod test_module_transaction {
    use crate::{
        config::{
            get_config, TestConfig, ARGS_JSON, CONTRACT_CEP78_KEY, DEFAULT_TTL, ENTRYPOINT_MINT,
            HELLO_CONTRACT, PAYMENT_AMOUNT, PAYMENT_TRANSFER_AMOUNT, TIMESTAMP_WAIT_TIME,
            TRANSFER_AMOUNT, TTL, WASM_PATH,
        },
        tests::helpers::read_wasm_file,
    };
    use casper_rust_wasm_sdk::{
        helpers::get_current_timestamp,
        types::{
            addr::entity_addr::EntityAddr,
            addressable_entity_hash::AddressableEntityHash,
            cl::bytes::Bytes,
            package_hash::PackageHash,
            public_key::PublicKey,
            transaction::Transaction,
            transaction_params::{
                transaction_builder_params::TransactionBuilderParams,
                transaction_str_params::TransactionStrParams,
            },
            uref::URef,
        },
    };
    use std::thread;

    pub async fn test_transaction_type() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_hash_string =
            "entity-contract-fd5b4bee73d43371afbbd8556d3e289c87affd5691bc1e6ef7472cd066963cf7";
        let entity_addr = EntityAddr::from_formatted_str(entity_hash_string).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());

        assert!(!transaction
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
    }

    pub async fn test_transaction_type_transfer() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.to_string()),
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_TRANSFER_AMOUNT);
        let transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(transaction.verify());
        assert!(transaction.is_standard_payment());
    }

    pub async fn test_transaction_type_with_ttl() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.to_string()),
            Some(TTL.to_string()),
        );

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert_eq!(transaction.ttl(), TTL.to_string());
        transaction = transaction.with_ttl(DEFAULT_TTL, Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert_eq!(transaction.ttl(), DEFAULT_TTL.to_string());
    }

    pub async fn test_transaction_type_with_timestamp() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(transaction.verify());
        assert!(!transaction.timestamp().is_empty());
        let transaction_timestamp = &transaction.timestamp()[..19];
        // Do not remove this intentional sleep
        thread::sleep(TIMESTAMP_WAIT_TIME);

        let current_timestamp = &get_current_timestamp(None)[..19];
        assert_ne!(transaction_timestamp, current_timestamp);
        transaction =
            transaction.with_timestamp(current_timestamp, Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert_eq!(&transaction.timestamp()[..19], current_timestamp);
    }

    pub async fn test_transaction_type_with_chain_name() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(transaction.verify());
        assert_eq!(transaction.chain_name(), config.chain_name);
        transaction = transaction.with_chain_name("test", Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert_eq!(&transaction.chain_name(), "test");
    }

    pub async fn test_transaction_type_with_account() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account.clone()),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(transaction.verify());
        assert_eq!(transaction.initiator_addr(), config.account);
        transaction =
            transaction.with_public_key(PublicKey::new(&config.target_account).unwrap(), None);
        assert!(!transaction.verify());
        assert_eq!(&transaction.initiator_addr(), &config.target_account);
    }

    pub async fn test_transaction_type_with_entry_point_name() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert!(transaction.entry_point().contains(ENTRYPOINT_MINT));
        transaction = transaction.with_entry_point("name", Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert!(transaction.entry_point().contains("name"));
    }

    pub async fn test_transaction_type_with_hash() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();

        assert!(transaction.verify());
        //assert!(transaction.is_stored_contract());

        let new_entity_hash_string =
            "7b9f86fd244c604012002cde5961464bfd371539c5e6df4b42ada6108090421c";
        let new_entity_hash: AddressableEntityHash =
            AddressableEntityHash::new(new_entity_hash_string).unwrap();

        transaction =
            transaction.with_entity_hash(new_entity_hash, Some(config.secret_key.clone()));
        assert!(transaction.verify());
        //assert!(transaction.is_stored_contract());
        assert!(!transaction
            .to_json_string()
            .unwrap()
            .contains(&config.contract_cep78_key));
        assert!(transaction
            .to_json_string()
            .unwrap()
            .contains(new_entity_hash_string));
    }

    pub async fn test_transaction_type_by_name() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        let builder_params = TransactionBuilderParams::new_invocable_entity_alias(
            CONTRACT_CEP78_KEY,
            ENTRYPOINT_MINT,
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        // TODO
        //assert!(transaction.is_stored_contract());
        // assert_eq!(
        //     transaction.by_name().unwrap().to_string(),
        //     CONTRACT_CEP78_KEY
        // );
    }

    pub async fn test_transaction_type_with_package_hash() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        let package_hash =
            PackageHash::from_formatted_str(&config.contract_cep78_package_hash).unwrap();

        let builder_params =
            TransactionBuilderParams::new_package(package_hash, ENTRYPOINT_MINT, None);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        //assert!(transaction.is_stored_contract_package());

        let new_session_package_hash_string =
            "10fed076cff22b4dc61f08d514cc89084a86fd8c4488cd280c1ca86641010937";
        let new_session_package_hash = PackageHash::new(new_session_package_hash_string).unwrap();
        transaction = transaction
            .with_package_hash(new_session_package_hash, Some(config.secret_key.clone()));
        assert!(transaction.verify());
        // assert!(transaction.is_stored_contract_package());
        assert!(!transaction
            .to_json_string()
            .unwrap()
            .contains(&config.contract_cep78_package_hash));
        assert!(transaction
            .to_json_string()
            .unwrap()
            .contains(new_session_package_hash_string));
    }

    pub async fn test_transaction_type_with_transaction_bytes() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let transaction_bytes: Bytes = Vec::from([0]).into();
        let builder_params = TransactionBuilderParams::new_session(Some(transaction_bytes), None);

        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());

        assert!(transaction
            .target()
            .unwrap()
            .to_string()
            .contains("1 module bytes"));

        let file_path = &format!("{WASM_PATH}{HELLO_CONTRACT}");
        let transaction_bytes = match read_wasm_file(file_path) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                eprintln!("Error reading file: {:?}", err);
                return;
            }
        };
        let is_install_upgrade = Some(true);
        transaction = transaction.with_transaction_bytes(
            transaction_bytes.into(),
            is_install_upgrade,
            Some(config.secret_key.clone()),
        );
        assert!(transaction.verify());

        assert!(!transaction
            .target()
            .unwrap()
            .to_string()
            .contains("1 module bytes"));
    }

    pub async fn test_transaction_type_with_secret_key() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account.clone()),
            None,
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(!transaction.verify());
        assert_eq!(transaction.initiator_addr(), config.account);
        transaction = transaction.with_secret_key(Some(config.secret_key.clone()));
        assert!(transaction.verify());
    }

    // TODO
    // pub async fn test_transaction_type_with_standard_payment() {
    //     let config: TestConfig = get_config(true).await;
    //     let transaction_params = TransactionStrParams::new_with_defaults(
    //         &config.chain_name,
    //         Some(config.account),
    //         Some(config.secret_key.clone()),
    //         Some(TTL.to_string()),
    //     );

    //     let builder_params =
    //     TransactionBuilderParams::new_invocable_entity(&config.contract_cep78_key, ENTRYPOINT_MINT);

    //     transaction_params.set_payment_amount(PAYMENT_AMOUNT);
    //     let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
    //     assert!(transaction.verify());
    //     assert_eq!(transaction.payment_amount(1_u8).to_string(), PAYMENT_AMOUNT);
    //     let new_payment_amount = "1111111111";
    //     transaction = transaction.with_standard_payment(new_payment_amount, None);
    //     assert!(!transaction.verify());
    //     assert_eq!(
    //         transaction.payment_amount(1_u8).to_string(),
    //         new_payment_amount
    //     );
    // }

    pub async fn test_transaction_type_is_expired() {
        let config: TestConfig = get_config(true).await;
        let old_timestamp = "2023-09-05T16:53:46";
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );
        transaction_params.set_timestamp(Some(old_timestamp.to_string()));
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            Some(URef::from_formatted_str(&config.purse_uref).unwrap()),
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();
        assert!(transaction.verify());
        assert!(!transaction.timestamp().is_empty());
        assert!(transaction.expired());
        let transaction_timestamp = &transaction.timestamp()[..19];
        assert_eq!(transaction_timestamp, old_timestamp);

        let current_timestamp = &get_current_timestamp(None)[..19];
        assert_ne!(transaction_timestamp, current_timestamp);
        transaction =
            transaction.with_timestamp(current_timestamp, Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert!(!transaction.timestamp().is_empty());
        assert!(!transaction.expired());
        assert_eq!(&transaction.timestamp()[..19], current_timestamp);
    }

    pub async fn test_transaction_type_sign() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account.clone()),
            None,
            Some(TTL.to_string()),
        );

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_transfer(
            None,
            &config.target_account,
            TRANSFER_AMOUNT,
            transaction_params,
            None,
        )
        .unwrap();

        assert!(transaction.is_standard_payment());

        let compute_approvals_hash = transaction.compute_approvals_hash();
        assert_eq!(transaction.initiator_addr(), config.account);
        transaction = transaction.sign(&config.secret_key);
        assert!(transaction.verify());
        let new_compute_approvals_hash = transaction.compute_approvals_hash();
        assert_ne!(compute_approvals_hash, new_compute_approvals_hash);
    }

    pub async fn test_transaction_type_empty_args() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert!(transaction.session_args().is_empty());
    }

    pub async fn test_transaction_type_args() {
        let config: TestConfig = get_config(true).await;
        let mut transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );
        let args = Vec::from([
            "foo:Bool='true'".to_string(),
            "bar:String='value'".to_string(),
        ]);
        transaction_params.set_session_args_simple(args.clone());
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert!(!transaction.session_args().is_empty());
        assert_eq!(transaction.session_args().len(), args.len());
    }

    pub async fn test_transaction_type_args_json() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        transaction_params.set_session_args_json(ARGS_JSON);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert!(!transaction.session_args().is_empty());
        assert_eq!(transaction.session_args().len(), 11);
    }

    pub async fn test_transaction_type_add_arg() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account),
            Some(config.secret_key.clone()),
            Some(TTL.to_string()),
        );

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let mut transaction = Transaction::new_session(builder_params, transaction_params).unwrap();
        assert!(transaction.verify());
        assert!(transaction.session_args().is_empty());
        transaction =
            transaction.add_arg("foo:bool='false".into(), Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert_eq!(transaction.session_args().len(), 1);
        let arg_json = r#"{"name": "bar", "type": "U256", "value": 1}"#; // No brackets only one arg
        transaction = transaction.add_arg(arg_json.into(), Some(config.secret_key.clone()));
        assert!(transaction.verify());
        assert_eq!(transaction.session_args().len(), 2);
    }

    pub async fn test_transaction_type_add_signature() {
        let config: TestConfig = get_config(true).await;
        let transaction_params = TransactionStrParams::new_with_defaults(
            &config.chain_name,
            Some(config.account.clone()),
            None,
            Some(TTL.to_string()),
        );

        let entity_addr = EntityAddr::from_formatted_str(&config.contract_cep78_key).unwrap();

        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        transaction_params.set_payment_amount(PAYMENT_AMOUNT);
        let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();

        assert!(!transaction.hash().to_string().is_empty());

        assert!(!transaction
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());

        let signature = "02ae4a8f1cd2c7480c3f7d70ba9aa74263703d404334981eec5f940545ebe3ad998996ba8819156086105109eb9bedeba4985d7c36c0beb66bf7ff8505548f3fed";
        let transaction_signed = transaction.add_signature(&config.account, signature);

        assert!(!transaction.verify());

        let approvals = transaction_signed.approvals();
        let first_approval = &approvals[0];
        assert_eq!(first_approval.signer().to_hex_string(), config.account);
        assert_eq!(
            first_approval.signature().to_hex_string(),
            signature.to_string()
        );

        let signers = transaction_signed.signers();
        let first_signer = &signers[0];
        assert_eq!(first_signer.to_formatted_string(), config.account_hash);
    }
}

#[cfg(test)]
mod tests_transaction {
    use super::test_module_transaction::*;
    use tokio::test;

    #[test]
    pub async fn test_transaction_type_test() {
        test_transaction_type().await;
    }
    #[test]
    pub async fn test_transaction_type_transfer_test() {
        test_transaction_type_transfer().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_ttl_test() {
        test_transaction_type_with_ttl().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_timestamp_test() {
        test_transaction_type_with_timestamp().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_chain_name_test() {
        test_transaction_type_with_chain_name().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_account_test() {
        test_transaction_type_with_account().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_entry_point_name_test() {
        test_transaction_type_with_entry_point_name().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_hash_test() {
        test_transaction_type_with_hash().await;
    }
    #[test]
    pub async fn test_transaction_type_test_by_name_test() {
        test_transaction_type_by_name().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_package_hash_test() {
        test_transaction_type_with_package_hash().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_transaction_bytes_test() {
        test_transaction_type_with_transaction_bytes().await;
    }
    #[test]
    pub async fn test_transaction_type_test_with_secret_key_test() {
        test_transaction_type_with_secret_key().await;
    }
    // TODO
    // #[test]
    // pub async fn test_transaction_type_with_standard_payment_test() {
    //     test_transaction_type_with_standard_payment().await;
    // }
    #[test]
    pub async fn test_transaction_type_is_expired_test() {
        test_transaction_type_is_expired().await;
    }
    #[test]
    pub async fn test_transaction_type_sign_test() {
        test_transaction_type_sign().await;
    }
    #[test]
    pub async fn test_transaction_type_empty_args_test() {
        test_transaction_type_empty_args().await;
    }
    #[test]
    pub async fn test_transaction_type_args_test() {
        test_transaction_type_args().await;
    }
    #[test]
    pub async fn test_transaction_type_args_json_test() {
        test_transaction_type_args_json().await;
    }
    #[test]
    pub async fn test_transaction_type_add_arg_test() {
        test_transaction_type_add_arg().await;
    }
    #[test]
    pub async fn test_transaction_type_add_signature_test() {
        test_transaction_type_add_signature().await;
    }
}
