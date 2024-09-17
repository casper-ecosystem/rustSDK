use self::intern::{create_test_sdk, install_cep78};
use crate::config::{
    CONTRACT_CEP78_KEY, DEFAULT_NODE_ADDRESS, PACKAGE_CEP78_KEY, SPECULATIVE_ADDRESS,
};
use crate::config::{
    DEFAULT_CHAIN_NAME, DEFAULT_EVENT_ADDRESS, DEFAULT_RPC_ADDRESS, DEFAULT_SECRET_KEY_NAME,
    DEFAULT_SECRET_KEY_NCTL_PATH, ENTRYPOINT_MINT, PAYMENT_AMOUNT,
};
use casper_rust_wasm_sdk::types::addr::entity_addr::EntityAddr;
use casper_rust_wasm_sdk::{
    types::{
        block_hash::BlockHash,
        entity_identifier::EntityIdentifier,
        transaction_hash::TransactionHash,
        transaction_params::{
            transaction_builder_params::TransactionBuilderParams,
            transaction_str_params::TransactionStrParams,
        },
    },
    watcher::EventParseResult,
};
use lazy_static::lazy_static;
use std::{
    env,
    fs::File,
    io::{self, Read},
    path::PathBuf,
    process,
};
use tokio::sync::Mutex;

lazy_static! {
    pub static ref CEP78_INSTALLED_GUARD: Mutex<bool> = Mutex::new(false);
    pub static ref CEP78_REINSTALL_GUARD: Mutex<bool> = Mutex::new(false);
}

pub(crate) mod intern {
    use super::{read_wasm_file, CEP78_REINSTALL_GUARD};
    use crate::config::{
        TestConfig, ARGS_JSON, CEP78_CONTRACT, PAYMENT_AMOUNT_CONTRACT_CEP78, WASM_PATH,
    };
    use casper_rust_wasm_sdk::{
        rpcs::get_dictionary_item::DictionaryItemInput,
        types::{
            deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
            entity_identifier::EntityIdentifier, transaction_hash::TransactionHash,
            transaction_params::transaction_str_params::TransactionStrParams,
        },
        SDK,
    };
    pub fn create_test_sdk(config: Option<TestConfig>) -> SDK {
        match config {
            Some(config) => SDK::new(config.rpc_address, config.node_address, config.verbosity),
            None => SDK::new(None, None, None),
        }
    }

    pub async fn get_main_purse(account_identifier_as_string: &str, rpc_address: &str) -> String {
        let entity_result = create_test_sdk(None)
            .get_entity(
                None,
                Some(account_identifier_as_string.to_owned()),
                None,
                None,
                Some(rpc_address.to_string()),
            )
            .await
            .unwrap()
            .result
            .entity_result;

        let purse_uref = entity_result
            .addressable_entity()
            .unwrap()
            .entity
            .main_purse();
        purse_uref.to_formatted_string()
    }

    pub async fn get_dictionnary_key(
        contract_entity: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
        get_state_root_hash: Option<&str>,
        rpc_address: Option<String>,
    ) -> String {
        let mut params = DictionaryItemStrParams::new();
        params.set_entity_named_key(contract_entity, dictionary_name, dictionary_item_key);
        let dictionary_item = DictionaryItemInput::Params(params);

        let get_dictionary_item = create_test_sdk(None)
            .get_dictionary_item(
                get_state_root_hash.unwrap_or_default(),
                dictionary_item,
                None,
                rpc_address,
            )
            .await;
        let get_dictionary_item = get_dictionary_item.unwrap();
        assert!(!get_dictionary_item
            .result
            .api_version
            .to_string()
            .is_empty());

        let stored_value = get_dictionary_item.result.stored_value;
        let cl_value = stored_value.as_cl_value().unwrap();
        assert!(!cl_value.inner_bytes().is_empty());

        assert!(!get_dictionary_item
            .result
            .dictionary_key
            .to_string()
            .is_empty());
        let dictionary_key = get_dictionary_item.result.dictionary_key;
        dictionary_key.to_string()
    }

    pub async fn get_dictionnary_uref(
        contract_entity: &str,
        dictionary_name: &str,
        rpc_address: Option<String>,
    ) -> String {
        let entity_identifier = EntityIdentifier::from_formatted_str(contract_entity).ok();
        let get_entity = create_test_sdk(None)
            .get_entity(entity_identifier, None, None, None, rpc_address)
            .await
            .unwrap();

        let entity = get_entity
            .result
            .entity_result
            .addressable_entity()
            .unwrap();

        let named_keys = entity.named_keys.clone();

        let (_, dictionnary_uref) = named_keys
            .iter()
            .find(|(key, _)| key == &dictionary_name)
            .unwrap();
        dictionnary_uref.to_formatted_string()
    }

    pub async fn install_cep78(
        initiator_addr: &str,
        secret_key: &str,
        path: Option<&str>,
        network_constants: (&str, &str, &str),
    ) -> Result<String, Box<dyn std::error::Error>> {
        let mut cep78_reinstall_guard = CEP78_REINSTALL_GUARD.lock().await;
        if *cep78_reinstall_guard {
            return Err("CEP78 contract already installed".into());
        }
        *cep78_reinstall_guard = true;

        let (rpc_address, event_address, chain_name) = network_constants;

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_chain_name(chain_name);
        transaction_params.set_initiator_addr(initiator_addr);
        transaction_params.set_secret_key(secret_key);
        transaction_params.set_session_args_json(ARGS_JSON);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);

        let path = match path {
            Some(path) => path,
            None => WASM_PATH,
        };
        let file_path = &format!("{path}{CEP78_CONTRACT}");
        let transaction_bytes = match read_wasm_file(file_path) {
            Ok(transaction_bytes) => transaction_bytes,
            Err(err) => {
                return Err(format!("Error reading file {}: {:?}", file_path, err).into());
            }
        };

        let sdk = create_test_sdk(None);
        let install = sdk
            .install(
                transaction_params,
                transaction_bytes.into(),
                Some(rpc_address.to_string()),
            )
            .await;
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());

        let transaction_hash =
            TransactionHash::from(install.as_ref().unwrap().result.transaction_hash);
        let transaction_hash_as_string = transaction_hash.to_string();
        assert!(!transaction_hash_as_string.is_empty());

        let event_parse_result = sdk
            .wait_transaction(event_address, &transaction_hash_as_string, None)
            .await
            .unwrap();
        let transaction = event_parse_result
            .body
            .unwrap()
            .get_transaction_processed()
            .unwrap();
        assert_eq!(transaction.hash.to_string(), transaction_hash_as_string);

        let get_transaction = sdk
            .get_transaction(
                transaction_hash,
                Some(true),
                None,
                Some(rpc_address.to_string()),
            )
            .await;
        let get_transaction = get_transaction.unwrap();
        assert!(!get_transaction.result.api_version.to_string().is_empty());
        assert!(!get_transaction
            .result
            .transaction
            .hash()
            .to_string()
            .is_empty());
        Ok(transaction_hash_as_string)
    }
}

pub fn get_network_constants() -> (String, String, String, String, String) {
    let default_rpc_address =
        env::var("RPC_ADDRESS").unwrap_or_else(|_| DEFAULT_RPC_ADDRESS.to_string());
    let default_event_address =
        env::var("EVENT_ADDRESS").unwrap_or_else(|_| DEFAULT_EVENT_ADDRESS.to_string());
    let default_speculative_address =
        env::var("SPECULATIVE_ADDRESS").unwrap_or_else(|_| SPECULATIVE_ADDRESS.to_string());
    let default_node_address =
        env::var("DEFAULT_NODE_ADDRESS").unwrap_or_else(|_| DEFAULT_NODE_ADDRESS.to_string());
    let chain_name = env::var("CHAIN_NAME").unwrap_or_else(|_| DEFAULT_CHAIN_NAME.to_string());

    (
        default_rpc_address,
        default_event_address,
        default_speculative_address,
        default_node_address,
        chain_name,
    )
}

pub fn get_user_secret_key(user: Option<&str>) -> Result<String, std::io::Error> {
    let user = user.unwrap_or("user-1");
    let env_key = get_env_key(user);
    if !env_key.is_empty() {
        return Ok(env_key);
    }
    let (secret_key_nctl_path, secret_key_name) = get_secret_key_constants();
    let user_key_path = match user {
        user if user.starts_with("user-") => {
            secret_key_nctl_path.replace("user-1", user).to_string()
        }
        _ => format!("{secret_key_nctl_path}{secret_key_name}"),
    };
    read_pem_file(&user_key_path, &secret_key_name)
}

fn get_secret_key_constants() -> (String, String) {
    let secret_key_name =
        env::var("SECRET_KEY_NAME").unwrap_or_else(|_| DEFAULT_SECRET_KEY_NAME.to_string());
    let secret_key_nctl_path = env::var("SECRET_KEY_NCTL_PATH")
        .unwrap_or_else(|_| DEFAULT_SECRET_KEY_NCTL_PATH.to_string());

    (secret_key_nctl_path, secret_key_name)
}

fn get_env_key(user: &str) -> String {
    let secret_key = match env::var(format!(
        "SECRET_KEY_{}",
        user.replace('-', "_").to_uppercase()
    )) {
        Ok(key) => key,
        Err(_) => return "".to_string(),
    };

    format!("-----BEGIN PRIVATE KEY----- {secret_key} -----END PRIVATE KEY-----")
}

fn read_pem_file(file_path: &str, secret_key_name: &str) -> Result<String, io::Error> {
    let path_buf = env::current_dir()?;

    let relative_path = path_buf
        .to_string_lossy()
        .replace("tests/integration/rust", "");
    let mut relative_path_buf = PathBuf::from(relative_path.clone());
    relative_path_buf.push(file_path);
    relative_path_buf.push(secret_key_name);

    let mut file = match File::open(&relative_path_buf) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("{err} {file_path}");
            panic!();
        }
    };
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

pub fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let path_buf = env::current_dir()?;
    let relative_path = path_buf
        .to_string_lossy()
        .replace("tests/integration/rust", "");
    let mut relative_path_buf = PathBuf::from(relative_path.clone());
    relative_path_buf.push(file_path);
    let mut file = match File::open(&relative_path_buf) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("{err} {file_path}");
            panic!();
        }
    };
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}

pub async fn install_cep78_if_needed(
    account: &str,
    secret_key: &str,
    path: Option<&str>,
    network_constants: (&str, &str, &str),
) -> Option<String> {
    let mut install_guard = CEP78_INSTALLED_GUARD.lock().await;
    if !(*install_guard) {
        let deploy_hash = install_cep78(account, secret_key, path, network_constants)
            .await
            .unwrap();
        *install_guard = true;
        return Some(deploy_hash);
    }
    None
}

pub async fn get_contract_cep78_hash_keys(
    account_hash: &str,
    rpc_address: &str,
) -> (String, String) {
    let entity_identifier = EntityIdentifier::from_formatted_str(account_hash).ok();
    let get_entity = create_test_sdk(None)
        .get_entity(
            entity_identifier,
            None,
            None,
            None,
            Some(rpc_address.to_string()),
        )
        .await
        .unwrap();

    let account = get_entity
        .result
        .entity_result
        .addressable_entity()
        .unwrap();

    let named_keys = account.named_keys.clone();

    let (_, contract_cep78_key) = named_keys
        .iter()
        .find(|(key, _)| key == &CONTRACT_CEP78_KEY)
        .unwrap();
    let (_, contract_cep78_package_hash) = named_keys
        .iter()
        .find(|(key, _)| key == &PACKAGE_CEP78_KEY)
        .unwrap();

    (
        contract_cep78_key.to_formatted_string(),
        contract_cep78_package_hash.to_formatted_string(),
    )
}

pub async fn mint_nft(
    contract_cep78_key: &str,
    initiator_addr: &str,
    target_account_hash: &str,
    secret_key: &str,
    network_constants: (&str, &str, &str),
) {
    let (rpc_address, event_address, chain_name) = network_constants;

    let mut transaction_params = TransactionStrParams::default();
    transaction_params.set_chain_name(chain_name);
    transaction_params.set_initiator_addr(initiator_addr);
    transaction_params.set_secret_key(secret_key);
    transaction_params.set_payment_amount(PAYMENT_AMOUNT);
    // Two ways to build args, either simple or json
    // let args_json_vec: Vec<String> = vec![
    //     r#"{"name": "token_meta_data", "type": "String", "value": "test_meta_data"}"#.to_string(),
    //     format!(r#"{{"name": "token_owner", "type": "Key", "value": "{target_account_hash}"}}"#),
    // ];
    // let args_json: String = format!("[{}]", args_json_vec.join(", "));
    let args = Vec::from([
        "token_meta_data:String='test_meta_data'".to_string(),
        format!("token_owner:Key='{target_account_hash}'").to_string(),
    ]);
    transaction_params.set_session_args_simple(args);

    let entity_addr = EntityAddr::from_formatted_str(contract_cep78_key.into()).unwrap();

    let builder_params =
        TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

    let sdk = create_test_sdk(None);
    let test_call_entrypoint = sdk
        .call_entrypoint(
            builder_params,
            transaction_params,
            Some(rpc_address.to_string()),
        )
        .await;
    let result = &test_call_entrypoint.as_ref().unwrap().result;
    assert!(!result.clone().api_version.to_string().is_empty());

    let transaction_hash = TransactionHash::from(result.transaction_hash);
    let transaction_hash_as_string = transaction_hash.to_string();
    assert!(!transaction_hash_as_string.is_empty());

    let event_parse_result = sdk
        .wait_transaction(event_address, &transaction_hash_as_string, None)
        .await
        .unwrap();
    let transaction_processed = event_parse_result
        .body
        .unwrap()
        .get_transaction_processed()
        .unwrap();
    assert_eq!(
        transaction_processed.hash.to_string(),
        transaction_hash_as_string
    );
}

pub async fn get_block(rpc_address: &str) -> (String, u64) {
    let get_block = create_test_sdk(None)
        .get_block(None, None, Some(rpc_address.to_string()))
        .await;
    match get_block {
        Err(err) => {
            eprintln!("Block hash unreachable! {}", err);
            process::exit(1);
        }
        Ok(get_block) => {
            let block = get_block.result.block_with_signatures.unwrap().block;
            let block_hash: BlockHash = (*block.hash()).into();
            let block_height = block.height();
            (block_hash.to_string(), block_height)
        }
    }
}

pub fn get_event_handler_fn(transaction_hash: String) -> impl Fn(EventParseResult) {
    move |event_parse_result: EventParseResult| {
        // println!("get_event_handler_fn {}", transaction_hash);
        if let Some(err) = &event_parse_result.err {
            println!("{} {}", transaction_hash, err);
        } else if let Some(transaction_processed) =
            &event_parse_result.body.unwrap().get_transaction_processed()
        {
            if let Some(success) = &transaction_processed.execution_result.success {
                println!(
                    "Hash: {}\nBlock: {:?}\nCost: {} motes",
                    transaction_hash, transaction_processed.block_hash, success.cost
                );
                return;
            } else if let Some(failure) = &transaction_processed.execution_result.failure {
                println!(
                    "Hash: {}\nBlock: {:?}\nError: \"{}\"",
                    transaction_hash, transaction_processed.block_hash, failure.error_message
                );
                return;
            }
        }
        println!("No information available for {}", transaction_hash);
    }
}
