use crate::tests::helpers::{
    get_block, get_network_constants, get_user_secret_key,
    intern::{get_dictionnary_key, get_dictionnary_uref, get_main_purse},
};
use casper_rust_wasm_sdk::types::verbosity::Verbosity;
use casper_rust_wasm_sdk::{helpers::public_key_from_secret_key, types::public_key::PublicKey};
use lazy_static::lazy_static;
use std::time::{self, Duration};
use tokio::sync::{Mutex, RwLock};

pub const DEFAULT_RPC_ADDRESS: &str = "http://localhost:11101";
pub const DEFAULT_EVENT_ADDRESS: &str = "http://127.0.0.1:18101/events";
pub const SPECULATIVE_ADDRESS: &str = "http://127.0.0.1:25101";
pub const DEFAULT_NODE_ADDRESS: &str = "127.0.0.1:28101";
pub const DEFAULT_CHAIN_NAME: &str = "casper-net-1";
pub const DEFAULT_SECRET_KEY_NAME: &str = "secret_key.pem";
// TODO fix mutex bug https://github.com/hyperium/hyper/issues/2112 lazy_static erroring with runtime dropped the dispatch task
// https://github.com/seanmonstar/reqwest/issues/1148#issuecomment-910868788
pub const TIMESTAMP_WAIT_TIME: Duration = time::Duration::from_millis(1000);
pub const DEPLOY_TIME: Duration = time::Duration::from_millis(45000);
// read_pem_file will look SECRET_KEY_NAME to root directory if relative path is not found (relative to root)
pub const DEFAULT_SECRET_KEY_NCTL_PATH: &str =
    "../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/";
pub const WASM_PATH: &str = "./tests/wasm/";
pub const DEFAULT_TTL: &str = "30m";
pub const TTL: &str = "1h";
pub const HELLO_CONTRACT: &str = "hello.wasm";
pub const CEP78_CONTRACT: &str = "cep78.wasm";
pub const PAYMENT_AMOUNT: &str = "5500000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const PAYMENT_TRANSFER_AMOUNT: &str = "100000000";
pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
pub const CONTRACT_CEP78_KEY: &str = "cep78_contract_hash_enhanced-nft-1";
pub const PACKAGE_CEP78_KEY: &str = "cep78_contract_package_enhanced-nft-1";
pub const ENTRYPOINT_MINT: &str = "mint";
pub const ENTRYPOINT_DECIMALS: &str = "decimals";
pub const COLLECTION_NAME: &str = "enhanced-nft-1";
pub const DICTIONARY_NAME: &str = "events";
pub const DICTIONARY_ITEM_KEY: &str = "0";
pub const ARGS_SIMPLE: [&str; 2] = [
    "key-name:String='test_hello_key'",
    "message:String='Hello Casper'",
];
pub const TEST_HELLO_KEY: &str = "test_hello_key";
pub const TEST_HELLO_MESSAGE: &str = "Hello Casper";

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

pub const DEFAULT_ENABLE_ADDRESSABLE_ENTITY: bool = false;

#[derive(Clone, Debug)]
pub struct TestConfig {
    pub rpc_address: Option<String>,
    pub node_address: Option<String>,
    pub event_address: String,
    pub verbosity: Option<Verbosity>,
    pub speculative_address: String,
    pub chain_name: String,
    pub secret_key: String,
    pub account: String,
    pub purse_uref: String,
    pub account_hash: String,
    pub target_account: String,
    pub block_height: u64,
    pub block_hash: String,
    pub transaction_hash: String,
    pub dictionary_key: String,
    pub dictionary_uref: String,
    pub contract_cep78_key: String,
    pub contract_cep78_package_hash: String,
}

#[derive(PartialEq, Eq)]
pub(crate) enum InitializationState {
    NotInitialized,
    PartiallyInitialized, // dummy config
    InstallComplete,      // install cep_78 has occured
}

lazy_static! {
    pub(crate) static ref CONFIG: Mutex<Option<TestConfig>> = Mutex::new(None);
    pub(crate) static ref INITIALIZATION_STATE: RwLock<InitializationState> =
        RwLock::new(InitializationState::NotInitialized);
}

pub async fn initialize_test_config(
    skip_install: bool,
) -> Result<TestConfig, Box<dyn std::error::Error>> {
    use crate::tests::helpers::{get_contract_cep78_hash_keys, install_cep78_if_needed, mint_nft};
    use dotenvy::dotenv;

    let mut initialization_state = INITIALIZATION_STATE.write().await;

    if *initialization_state == InitializationState::InstallComplete {
        // If already fully initialized, skip initialization
        return Ok(CONFIG.lock().await.clone().unwrap());
    }

    dotenv().ok();

    let (
        default_rpc_address,
        default_event_address,
        default_speculative_address,
        default_node_address,
        chain_name,
    ) = get_network_constants();

    let secret_key = get_user_secret_key(None).unwrap();
    let secret_key_target_account = get_user_secret_key(Some("user-2"))?;
    let account = public_key_from_secret_key(&secret_key).unwrap();
    let target_account = public_key_from_secret_key(&secret_key_target_account).unwrap();
    let public_key = PublicKey::new(&account).unwrap();
    let account_hash = public_key.to_account_hash().to_formatted_string();

    let purse_uref = get_main_purse(&account, &default_rpc_address).await;

    let mut transaction_hash = String::from("");
    let mut contract_cep78_key = String::from(
        "entity-contract-015b4bee73d43371afbbd8556d3e289c87affd5691bc1e6ef7472cd066963cf7",
    );
    let mut contract_cep78_package_hash =
        String::from("package-02418948cabaf6a700773f724e690338945167eac4ee67b6f11abd72562b1a44");
    let mut dictionary_key =
        String::from("dictionary-035b4bee73d43371afbbd8556d3e289c87affd5691bc1e6ef7472cd066963cf7");
    let mut dictionary_uref =
        String::from("uref-045b4bee73d43371afbbd8556d3e289c87affd5691bc1e6ef7472cd066963cf7-001");

    *initialization_state = InitializationState::PartiallyInitialized;

    if !skip_install {
        println!("install_cep78");
        transaction_hash = install_cep78_if_needed(
            &account,
            &secret_key,
            None,
            (&default_rpc_address, &default_event_address, &chain_name),
        )
        .await
        .unwrap();

        let (_contract_cep78_key, _contract_cep78_package_hash) =
            get_contract_cep78_hash_keys(&account_hash, &default_rpc_address).await;

        contract_cep78_key = _contract_cep78_key;
        contract_cep78_package_hash = _contract_cep78_package_hash;

        println!("mint_nft");
        // install has been running for over 60 seconds
        mint_nft(
            &contract_cep78_key,
            &account,
            &account_hash,
            &secret_key,
            (&default_rpc_address, &default_event_address, &chain_name),
        )
        .await;

        dictionary_key = get_dictionnary_key(
            &contract_cep78_key,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
            None,
            Some(default_rpc_address.clone()),
        )
        .await;

        dictionary_uref = get_dictionnary_uref(
            &contract_cep78_key,
            DICTIONARY_NAME,
            Some(default_rpc_address.clone()),
        )
        .await;
        *initialization_state = InitializationState::InstallComplete;
    }

    let (block_hash, block_height) = get_block(&default_rpc_address).await;

    let config = TestConfig {
        rpc_address: Some(default_rpc_address.to_string()),
        node_address: Some(default_node_address.to_string()),
        verbosity: Some(Verbosity::High),
        event_address: default_event_address,
        speculative_address: default_speculative_address,
        account,
        secret_key,
        chain_name,
        block_height,
        block_hash,
        purse_uref,
        account_hash,
        target_account,
        transaction_hash,
        contract_cep78_key,
        contract_cep78_package_hash,
        dictionary_key,
        dictionary_uref,
    };
    Ok(config)
}

pub async fn get_config(skip_install: bool) -> TestConfig {
    let mut config_guard = CONFIG.lock().await;
    // Acquire the initialization state
    let initialization_state = INITIALIZATION_STATE.read().await;

    // If the initialization state is NotInitialized, initialize based on `skip_install`
    if *initialization_state == InitializationState::NotInitialized {
        drop(initialization_state);
        let config = initialize_test_config(skip_install).await.unwrap();
        *config_guard = Some(config.clone());
        return config;
    }
    // Else if the initialization state is PartiallyInitialized and `skip_install` is false,
    // reinitialize with installation
    else if *initialization_state == InitializationState::PartiallyInitialized && !skip_install {
        drop(initialization_state);
        let config = initialize_test_config(false).await.unwrap();
        *config_guard = Some(config.clone());
        return config;
    }

    // If the state is InstallComplete or no action is needed, return the existing config
    config_guard.clone().unwrap()
}
