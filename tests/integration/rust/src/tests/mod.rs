pub mod helpers;
pub mod integration;
#[cfg(test)]
pub mod integration_tests;
use casper_rust_wasm_sdk::{
    deploy_watcher::deploy_watcher::EventParseResult, helpers::public_key_from_private_key,
    types::verbosity::Verbosity, SDK,
};
use std::{
    fs::File,
    io::{self, Read},
    path::Path,
};

pub async fn run_tests_or_examples() {
    // Run a specific test ?
    // integration::rpcs::test_module::test_get_peers().await;
    // Run an example ?
    let _ = _run_example_11().await;
}

// get_deploy
pub async fn _run_example_1() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );
    use casper_rust_wasm_sdk::types::deploy_hash::DeployHash;

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

// get_auction_info
pub async fn _run_example_2() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );

    let get_auction_info = sdk.get_auction_info(None, None, None).await;

    let auction_state = get_auction_info.unwrap().result.auction_state;
    let state_root_hash = auction_state.state_root_hash();
    println!("{:?}", state_root_hash);
    let block_height = auction_state.block_height();
    println!("{block_height}");
}

// get_peers
pub async fn _run_example_3() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );

    let get_peers = sdk.get_peers(None, None).await;

    let peers = get_peers.unwrap().result.peers;
    for peer in &peers {
        println!("{:?}", peer)
    }
}

// get_block
pub async fn _run_example_4() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );

    let get_block = sdk.get_block(None, None, None).await;

    let block = get_block.unwrap().result.block.unwrap();
    let block_hash = block.hash();
    println!("{:?}", block_hash);
}

// make_transfer
pub async fn _run_example_5() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    };

    pub const CHAIN_NAME: &str = "integration-test";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY,            // sender account
        None,                  // optional secret key to sign transfer deploy
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
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
pub async fn _run_example_6() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
    -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TTL: &str = "1h";
    pub const TARGET_ACCOUNT: &str =
        "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(PRIVATE_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
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
    println!("{:?}", transfer.as_ref().unwrap().result.deploy_hash);
}

// make_deploy
pub async fn _run_example_7() {
    let sdk = SDK::new(
        Some("https://rpc.integration.casperlabs.io".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
    pub const ENTRY_POINT: &str = "decimals";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY,            // sender account
        None,                  // optional secret key to sign deploy
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
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
pub async fn _run_example_8() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(PRIVATE_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRY_POINT);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let deploy = sdk
        .deploy(deploy_params, session_params, payment_params, None, None)
        .await;
    println!("{:?}", deploy.as_ref().unwrap().result.deploy_hash);
}

// put_deploy
pub async fn _run_example_9() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
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
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "5000000000";
    pub const CONTRACT_HASH: &str =
        "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
    pub const ENTRY_POINT: &str = "set_variables";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(PRIVATE_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
    );

    let session_params = SessionStrParams::default();
    session_params.set_session_hash(CONTRACT_HASH);
    session_params.set_session_entry_point(ENTRY_POINT);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);

    let deploy =
        Deploy::with_payment_and_session(deploy_params, session_params, payment_params).unwrap();

    let put_deploy = sdk.put_deploy(deploy, None, None).await;
    println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
}

// put_deploy transfer
pub async fn _run_example_10() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::{
        deploy::Deploy,
        deploy_params::{deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams},
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
        -----END PRIVATE KEY-----"#;
    pub const PAYMENT_AMOUNT: &str = "100000000";
    pub const TRANSFER_AMOUNT: &str = "2500000000";
    pub const TARGET_ACCOUNT: &str =
        "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";
    pub const TTL: &str = "1h";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY, // sender account
        Some(PRIVATE_KEY.to_string()),
        None,                  // optional timestamp
        Some(TTL.to_string()), // optional TTL
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
    println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
}

// install
pub async fn _run_example_11() -> Result<(), String> {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::{
        helpers::json_pretty_print,
        types::{
            deploy_hash::DeployHash,
            deploy_params::{
                deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
                session_str_params::SessionStrParams,
            },
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
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
    MC4CAQAwBQYDK2VwBCIEIMSwux1yM00NOvQ+Q6iR6iGbA7rHPqVTx1uE2Si89A3y
    -----END PRIVATE KEY-----"#;
    let public_key: &str = &public_key_from_private_key(PRIVATE_KEY).unwrap();
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
    pub const DEFAULT_EVENT_ADDRESS: &str = "http://127.0.0.1:18101/events/main";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        public_key,
        Some(PRIVATE_KEY.to_string()),
        None,
        None,
    );

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);

    let session_params = SessionStrParams::default();
    session_params.set_session_args_json(ARGS_JSON);

    let file_path = &format!("{WASM_PATH}{CEP78_CONTRACT}");
    let module_bytes = match read_wasm_file(file_path) {
        Ok(module_bytes) => module_bytes,
        Err(err) => {
            dbg!(format!("Error reading file {}: {:?}", file_path, err));
            return Err(format!("Error reading file {}: {:?}", file_path, err));
        }
    };
    session_params.set_session_bytes(module_bytes.into());
    let install = sdk
        .install(deploy_params, session_params, payment_params, None)
        .await;

    let deploy_hash_result = install.as_ref().unwrap().result.deploy_hash;
    // println!("{:?}", deploy_hash_result);
    let deploy_hash = DeployHash::from(deploy_hash_result);
    let deploy_hash_as_string = deploy_hash.to_string();
    println!("watch deploy_hash {}", deploy_hash_as_string);
    let event_parse_result: EventParseResult = sdk
        .wait_deploy(DEFAULT_EVENT_ADDRESS, &deploy_hash_as_string)
        .await
        .unwrap();
    println!("{:?}", event_parse_result);

    let finalized_approvals = true;
    let get_deploy = sdk
        .get_deploy(deploy_hash, Some(finalized_approvals), None, None)
        .await;
    let get_deploy = get_deploy.unwrap();
    // let result = &get_deploy.result.execution_results.first().unwrap().result;
    // println!(
    //     "{}",
    //     json_pretty_print(result Some(Verbosity::High))
    // );
    let result = json_pretty_print(&get_deploy.result.deploy.approvals, Some(Verbosity::Low));
    println!("approvals {result}");
    let result = DeployHash::from(get_deploy.result.deploy.hash).to_string();
    println!("processed deploy hash {result}");
    Ok(())
}

// call_entrypoint
pub async fn _run_example_12() {
    let sdk = SDK::new(
        Some("http://127.0.0.1:11101".to_string()),
        Some(Verbosity::High),
    );

    use casper_rust_wasm_sdk::types::deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    };

    pub const CHAIN_NAME: &str = "casper-net-1";
    pub const PUBLIC_KEY: &str =
        "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
    pub const PRIVATE_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
        -----END PRIVATE KEY-----"#;
    pub const CONTRACT_HASH: &str =
        "hash-c12808431d490e2c463c2f968d0a4eaa0f9d57842508d9041aa42e2bd21eb96c";
    pub const ENTRYPOINT_MINT: &str = "mint";
    pub const TOKEN_OWNER: &str =
        "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
    pub const PAYMENT_AMOUNT: &str = "5000000000";

    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        PUBLIC_KEY,
        Some(PRIVATE_KEY.to_string()),
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
    let call_entrypoint = sdk
        .call_entrypoint(deploy_params, session_params, payment_params, None)
        .await;
    let deploy_hash_result = call_entrypoint.as_ref().unwrap().result.deploy_hash;
    println!("{:?}", deploy_hash_result);
}
