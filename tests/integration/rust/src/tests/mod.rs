pub mod helpers;
pub mod integration;
#[cfg(test)]
pub mod integration_tests;
use crate::{config::DEFAULT_EVENT_ADDRESS, tests::helpers::get_event_handler_fn};
use casper_rust_wasm_sdk::{
    helpers::public_key_from_secret_key,
    types::verbosity::Verbosity,
    watcher::{EventHandlerFn, EventParseResult, Subscription},
    SDK,
};
use std::{
    fs::File,
    io::{self, Read},
    path::Path,
};

pub async fn run_tests_or_examples() {
    // Run a specific test ?
    //  integration::rpcs::test_module::test_get_peers().await;
    // Run an example ?
    let _ = _run_example_4().await;
}

// get_transaction
pub async fn _run_example_1() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );
    use casper_rust_wasm_sdk::types::hash::transaction_hash::TransactionHash;

    let transaction_hash =
        TransactionHash::new("27d81df41801602f47cdb4618a814407daf38d0c39be32c7f6c109d7e39a3f4b")
            .unwrap();

    let finalized_approvals = true;
    let get_transaction = sdk
        .get_transaction(transaction_hash, Some(finalized_approvals), None, None)
        .await;

    let transaction = get_transaction.unwrap().result.transaction;
    let timestamp = transaction.timestamp();
    let hash = transaction.hash().to_hex_string();
    println!("{timestamp} {hash}");
}

// get_auction_info
pub async fn _run_example_2() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    let get_auction_info = sdk.get_auction_info(None, None, None).await;
    let auction_state = get_auction_info.unwrap().result.auction_state;
    let state_root_hash = auction_state.state_root_hash();
    println!("{state_root_hash}");
    let block_height = auction_state.block_height();
    println!("{block_height}");
}

// get_peers
pub async fn _run_example_3() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    let get_peers = sdk.get_peers(None, None).await;

    let peers = get_peers.unwrap().result.peers;
    for peer in &peers {
        println!("{:?}", peer);
    }
}

// get_peers binary port
pub async fn _run_example_3_binary() {
    let sdk = SDK::new(None, Some("localhost:28101".to_string()), None);

    let get_binary_peers = sdk.get_binary_peers(None).await;

    let peers = get_binary_peers.unwrap().into_inner();
    for peer in &peers {
        println!("{:?}", peer);
    }
}

// get_block
pub async fn _run_example_4() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    let get_block = sdk.get_block(None, None, None).await;

    let block = get_block
        .unwrap()
        .result
        .block_with_signatures
        .unwrap()
        .block;
    let block_hash = block.hash().to_hex_string();
    println!("{block_hash}");
}

// make_transfer_transaction
pub async fn _run_example_5() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;

    pub const CHAIN_NAME: &str = "integration-test";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(PUBLIC_KEY);
    transaction_params.set_ttl(Some(TTL.to_string()));
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let make_transfer_transaction = sdk
        .make_transfer_transaction(
            None, // optional maybe_source
            TARGET_ACCOUNT,
            TRANSFER_AMOUNT,
            transaction_params,
            None, // optional transfer_id
        )
        .unwrap();
    println!("{:?}", make_transfer_transaction.timestamp());
}

// transfer transaction
pub async fn _run_example_6() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::transaction_params::transaction_str_params::TransactionStrParams;

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
    -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_ttl(Some(TTL.to_string()));
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let transfer = sdk
        .transfer_transaction(
            None, // optional maybe_source
            TARGET_ACCOUNT,
            TRANSFER_AMOUNT,
            transaction_params,
            None, // optional transfer_id
            None,
            None,
        )
        .await;
    println!(
        "{:?}",
        transfer
            .as_ref()
            .unwrap()
            .result
            .transaction_hash
            .to_hex_string()
    );
}

// make_transaction
pub async fn _run_example_7() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "decimals";
    pub const TTL: &str = "1h";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(PUBLIC_KEY);
    transaction_params.set_ttl(Some(TTL.to_string()));
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

    let transaction = sdk
        .make_transaction(builder_params, transaction_params)
        .unwrap();
    println!("{:?}", transaction.timestamp());
}

// transaction
pub async fn _run_example_8() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_ttl(Some(TTL.to_string()));
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

    let transaction = sdk
        .transaction(builder_params, transaction_params, None, None)
        .await;
    println!(
        "{:?}",
        transaction.as_ref().unwrap().result.transaction_hash
    );
}

// put_transaction
pub async fn _run_example_9() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction::Transaction,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_ttl(Some(TTL.to_string()));
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

    let transaction = Transaction::new_session(builder_params, transaction_params).unwrap();

    let put_transaction = sdk.put_transaction(transaction, None, None).await;
    println!(
        "{:?}",
        put_transaction.as_ref().unwrap().result.transaction_hash
    );
}

// put_transaction transfer
pub async fn _run_example_10() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        transaction::Transaction, transaction_params::transaction_str_params::TransactionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TARGET_ACCOUNT: &str =
        "012698ce9e8d34c1c0988e4e7dc413405c04a5c81bd5a242958020e49153cfae57";
    pub const TTL: &str = "1h";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);
    transaction_params.set_ttl(Some(TTL.to_string()));

    let transfer_transaction = Transaction::new_transfer(
        None,
        TARGET_ACCOUNT,
        TRANSFER_AMOUNT,
        transaction_params,
        None,
    )
    .unwrap();

    let put_transaction = sdk.put_transaction(transfer_transaction, None, None).await;
    println!(
        "{:?}",
        put_transaction.as_ref().unwrap().result.transaction_hash
    );
}

// install
pub async fn _run_example_11() -> Result<(), String> {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::{
        helpers::json_pretty_print,
        types::transaction_params::transaction_str_params::TransactionStrParams,
    };

    fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
        let root_path = Path::new(".");
        let path = root_path.join(file_path);
        let mut file = File::open(path)?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        Ok(buffer)
    }

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
    -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const ARGS_JSON: &str = r#"[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 1}
]"#;
    pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
    pub const WASM_PATH: &str = "../../wasm/";
    pub const CEP78_CONTRACT: &str = "cep78.wasm";
    pub const DEFAULT_EVENT_ADDRESS: &str = "http://127.0.0.1:18101/events";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_session_args_json(ARGS_JSON);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);

    let file_path = &format!("{WASM_PATH}{CEP78_CONTRACT}");
    let transaction_bytes = match read_wasm_file(file_path) {
        Ok(transaction_bytes) => transaction_bytes,
        Err(err) => {
            return Err(format!("Error reading file {}: {:?}", file_path, err));
        }
    };

    let install = sdk
        .install(transaction_params, transaction_bytes.into(), None)
        .await;

    let transaction_hash = install.as_ref().unwrap().result.transaction_hash;
    // println!("{:?}", transaction_hash_result);
    let transaction_hash_as_string = transaction_hash.to_hex_string();
    println!("wait transaction_hash {transaction_hash_as_string}");
    let event_parse_result: EventParseResult = sdk
        .wait_transaction(DEFAULT_EVENT_ADDRESS, &transaction_hash_as_string, None)
        .await
        .unwrap();
    println!("{:?}", event_parse_result);

    let finalized_approvals = true;
    let get_transaction = sdk
        .get_transaction(
            transaction_hash.into(),
            Some(finalized_approvals),
            None,
            None,
        )
        .await
        .unwrap();
    let result = json_pretty_print(
        get_transaction.result.transaction.approvals(),
        Some(Verbosity::Low),
    )
    .unwrap();
    println!("approvals {result}");

    let transaction_hash = get_transaction.result.transaction.hash();
    let result = transaction_hash.to_hex_string();
    println!("processed transaction hash {result}");
    Ok(())
}

// call_entrypoint
pub async fn _run_example_12() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRYPOINT_MINT: &str = "mint";
    pub const TOKEN_OWNER: &str =
        "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
    pub const PAYMENT_AMOUNT: &str = "5000000000";

    let mut transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(SECRET_KEY);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);
    let args = Vec::from([
        "token_meta_data:String='test_meta_data'".to_string(),
        format!("token_owner:Key='{TOKEN_OWNER}'").to_string(),
    ]);
    transaction_params.set_session_args_simple(args);

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

    let call_entrypoint_deploy = sdk
        .call_entrypoint(builder_params, transaction_params, None)
        .await;
    let transaction_hash_result = call_entrypoint_deploy
        .as_ref()
        .unwrap()
        .result
        .transaction_hash;
    let transaction_hash = transaction_hash_result.to_hex_string();
    println!("watch transaction_hash {transaction_hash}");
    let mut watcher = sdk.watch_transaction(DEFAULT_EVENT_ADDRESS, None);

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
    let _ = watcher.start().await;
    watcher.stop()
}

// sign transaction
pub async fn _run_example_13() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let initiator_addr: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "decimals";
    pub const TTL: &str = "1h";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);
    transaction_params.set_ttl(Some(TTL.to_string()));

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

    let mut transaction = sdk
        .make_transaction(builder_params, transaction_params)
        .unwrap();
    let transaction_signed = transaction.sign(SECRET_KEY);
    println!("{:?}", transaction_signed.approvals());
}

// add signature to transaction
pub async fn _run_example_14() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        addr::entity_addr::EntityAddr,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY_KMS: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const ENTITY_ADDR: &str =
        "entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "decimals";

    let transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(CHAIN_NAME);
    transaction_params.set_initiator_addr(PUBLIC_KEY_KMS);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);

    let entity_addr = EntityAddr::from_formatted_str(ENTITY_ADDR).unwrap();
    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRY_POINT);

    let transaction = sdk
        .make_transaction(builder_params, transaction_params)
        .unwrap();
    pub const SIGNATURE_KMS: &str = "012dbd52d47f982e870476ab6c123f3f29848199b08f5997f757f63986ef656480e27f8e12698c39f14281d2a62c1e8896cc9f272ae3312a68228c5863f849980b";
    let transaction_signed = transaction.add_signature(PUBLIC_KEY_KMS, SIGNATURE_KMS);
    println!("{:?}", transaction_signed.approvals());
}

// get_deploy
#[allow(deprecated)]
pub async fn _run_example_1_legacy() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );
    use casper_rust_wasm_sdk::types::hash::deploy_hash::DeployHash;

    let deploy_hash =
        DeployHash::new("a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9")
            .unwrap();

    let finalized_approvals = true;
    let get_deploy = sdk
        .get_deploy(deploy_hash, Some(finalized_approvals), None, None)
        .await;

    let deploy = get_deploy.unwrap().result.deploy;
    let deploy_header = deploy.header();
    let timestamp = deploy_header.timestamp();
    println!("{timestamp}");
}

// make_transfer
#[allow(deprecated)]
pub async fn _run_example_5_legacy() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    };

    pub const CHAIN_NAME: &str = "integration-test";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY,            // sender account
        None,                  // optional secret key to sign transfer deploy
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let make_transfer = sdk
        .make_transfer(
            TRANSFER_AMOUNT,
            TARGET_ACCOUNT, // target account
            None,           // optional transfer_id
            deploy_params,
            payment_params,
        )
        .unwrap();
    println!("{:?}", make_transfer.timestamp());
}

// transfer
#[allow(deprecated)]
pub async fn _run_example_6_legacy() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
    -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(SECRET_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let transfer = sdk
        .transfer(
            TRANSFER_AMOUNT,
            TARGET_ACCOUNT,
            None, // optional transfer_id
            deploy_params,
            payment_params,
            None,
            None,
        )
        .await;
    println!(
        "{:?}",
        transfer
            .as_ref()
            .unwrap()
            .result
            .deploy_hash
            .to_hex_string()
    );
}

// make_deploy
#[allow(deprecated)]
pub async fn _run_example_7_legacy() {
    let sdk = SDK::new(
        Some("http://localhost:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-entity-contract-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "decimals";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY,            // sender account
        None,                  // optional secret key to sign deploy
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRY_POINT);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let deploy = sdk
        .make_deploy(deploy_params, session_params, payment_params)
        .unwrap();
    println!("{:?}", deploy.timestamp());
}

// deploy
#[allow(deprecated)]
pub async fn _run_example_8_legacy() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(SECRET_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRY_POINT);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let deploy = sdk
        .deploy(deploy_params, session_params, payment_params, None, None)
        .await;
    println!("{}", deploy.as_ref().unwrap().result.deploy_hash);
}

// put_deploy
#[allow(deprecated)]
pub async fn _run_example_9_legacy() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        deploy::Deploy,
        deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(SECRET_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRY_POINT);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let deploy =
        Deploy::with_payment_and_session(deploy_params, session_params, payment_params).unwrap();

    let put_deploy = sdk.put_deploy(deploy, None, None).await;
    println!("{}", put_deploy.as_ref().unwrap().result.deploy_hash);
}

// put_deploy transfer
#[allow(deprecated)]
pub async fn _run_example_10_legacy() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        deploy::Deploy,
        deploy_params::{deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams},
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TARGET_ACCOUNT: &str =
        "01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(SECRET_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
        None,                  // optional Gas price tolerance
    );

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let transfer_deploy = Deploy::with_transfer(
        TRANSFER_AMOUNT,
        TARGET_ACCOUNT,
        None,
        deploy_params,
        payment_params,
    )
    .unwrap();

    let put_deploy = sdk.put_deploy(transfer_deploy, None, None).await;
    println!("{}", put_deploy.as_ref().unwrap().result.deploy_hash);
}

// install_deploy
#[allow(deprecated)]
pub async fn _run_example_11_legacy() -> Result<(), String> {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::{
        helpers::json_pretty_print,
        types::deploy_params::{
            deploy_str_params::DeployStrParams, session_str_params::SessionStrParams,
        },
    };

    fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
        let root_path = Path::new(".");
        let path = root_path.join(file_path);
        let mut file = File::open(path)?;
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer)?;
        Ok(buffer)
    }

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
    -----END PRIVATE KEY-----"#;
    let public_key: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const ARGS_JSON: &str = r#"[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 1}
]"#;
    pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
    pub const WASM_PATH: &str = "../../wasm/";
    pub const CEP78_CONTRACT: &str = "cep78.wasm";
    pub const DEFAULT_EVENT_ADDRESS: &str = "http://127.0.0.1:18101/events";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        public_key,
        Some(SECRET_KEY.to_string()),
        None,
        None,
        None,
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_args_json(ARGS_JSON);

    let file_path = &format!("{WASM_PATH}{CEP78_CONTRACT}");
    let module_bytes = match read_wasm_file(file_path) {
        Ok(module_bytes) => module_bytes,
        Err(err) => {
            return Err(format!("Error reading file {}: {:?}", file_path, err));
        }
    };
    session_params.set_session_bytes(module_bytes.into());
    let install = sdk
        .install_deploy(
            deploy_params,
            session_params,
            PAYMENT_AMOUNT_CONTRACT_CEP78,
            None,
        )
        .await;

    let deploy_hash = install.as_ref().unwrap().result.deploy_hash;
    // println!("{:?}", deploy_hash_result);
    let deploy_hash_as_string = deploy_hash.to_hex_string();
    println!("wait deploy_hash {deploy_hash_as_string}");
    let event_parse_result: EventParseResult = sdk
        .wait_deploy(DEFAULT_EVENT_ADDRESS, &deploy_hash_as_string, None)
        .await
        .unwrap();
    println!("{:?}", event_parse_result);

    let finalized_approvals = true;
    let get_deploy = sdk
        .get_deploy(deploy_hash.into(), Some(finalized_approvals), None, None)
        .await;
    let get_deploy = get_deploy.unwrap();
    let result =
        json_pretty_print(get_deploy.result.deploy.approvals(), Some(Verbosity::Low)).unwrap();
    println!("approvals {result}");

    let deploy_hash = get_deploy.result.deploy.hash().to_hex_string();
    println!("processed deploy hash {deploy_hash}");
    Ok(())
}

// call_entrypoint_deploy
#[allow(deprecated)]
pub async fn _run_example_12_legacy() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        None,
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
        -----END PRIVATE KEY-----"#;
    let public_key: &str = &public_key_from_secret_key(SECRET_KEY).unwrap();
    pub const CONTRACT_HASH: &str =
        "hash-508ec6d085766e8abf5c2ff8a6c60ca9e1712fe6228656d5fae3e281b0218ca0";
    pub const ENTRYPOINT_MINT: &str = "mint";
    pub const TOKEN_OWNER: &str =
        "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
    pub const PAYMENT_AMOUNT: &str = "5000000000";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        public_key,
        Some(SECRET_KEY.to_string()),
        None,
        None,
        None,
    );
    let mut session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRYPOINT_MINT);

    let args = Vec::from([
        "token_meta_data:String='test_meta_data'".to_string(),
        format!("token_owner:Key='{TOKEN_OWNER}'").to_string(),
    ]);
    session_params.set_session_args(args);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);
    let call_entrypoint_deploy = sdk
        .call_entrypoint_deploy(deploy_params, session_params, payment_params, None)
        .await;
    let deploy_hash = call_entrypoint_deploy.as_ref().unwrap().result.deploy_hash;
    let deploy_hash_string = deploy_hash.to_hex_string();
    println!("watch deploy_hash {deploy_hash_string}");
    let mut watcher = sdk.watch_deploy(DEFAULT_EVENT_ADDRESS, None);

    let mut subscriptions: Vec<Subscription> = vec![];
    let deploy_hash_results = vec![deploy_hash_string.clone()];

    for deploy_hash in deploy_hash_results {
        let event_handler_fn = get_event_handler_fn(deploy_hash.clone());
        subscriptions.push(Subscription::new(
            deploy_hash,
            EventHandlerFn::new(event_handler_fn),
        ));
    }

    let _ = watcher.subscribe(subscriptions);
    let _ = watcher.start().await;
    watcher.stop()
}
