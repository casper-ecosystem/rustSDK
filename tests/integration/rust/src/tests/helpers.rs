use self::intern::{create_test_sdk, install_cep78};
use crate::config::{CONTRACT_CEP78_KEY, PACKAGE_CEP78_KEY};
use crate::config::{
    DEFAULT_CHAIN_NAME, DEFAULT_EVENT_ADDRESS, DEFAULT_NODE_ADDRESS, DEFAULT_PRIVATE_KEY_NAME,
    DEFAULT_PRIVATE_KEY_NCTL_PATH, ENTRYPOINT_MINT, PAYMENT_AMOUNT,
};
use casper_rust_wasm_sdk::deploy_watcher::watcher::EventParseResult;
use casper_rust_wasm_sdk::rpcs::query_global_state::{KeyIdentifierInput, QueryGlobalStateParams};
use casper_rust_wasm_sdk::types::block_hash::BlockHash;
use casper_rust_wasm_sdk::types::deploy_hash::DeployHash;
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};
use lazy_static::lazy_static;
use serde_json::{to_string, Value};
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
        rpcs::{
            get_dictionary_item::DictionaryItemInput,
            query_global_state::{KeyIdentifierInput, QueryGlobalStateParams},
        },
        types::{
            deploy_hash::DeployHash,
            deploy_params::{
                deploy_str_params::DeployStrParams,
                dictionary_item_str_params::DictionaryItemStrParams,
                payment_str_params::PaymentStrParams, session_str_params::SessionStrParams,
            },
            uref::URef,
        },
        SDK,
    };
    use serde_json::{to_string, Value};

    pub fn create_test_sdk(config: Option<TestConfig>) -> SDK {
        match config {
            Some(config) => SDK::new(config.node_address, config.verbosity),
            None => SDK::new(None, None),
        }
    }

    pub async fn get_main_purse(account_identifier_as_string: &str, node_address: &str) -> String {
        let purse_uref = *(create_test_sdk(None)
            .get_account(
                None,
                Some(account_identifier_as_string.to_owned()),
                None,
                None,
                Some(node_address.to_string()),
            )
            .await
            .unwrap()
            .result
            .account
            .main_purse());
        let purse_uref: URef = purse_uref.into();
        purse_uref.to_formatted_string()
    }

    pub async fn get_dictionnary_key(
        contract_hash: &str,
        dictionary_name: &str,
        dictionary_item_key: &str,
        get_state_root_hash: Option<&str>,
        node_address: Option<String>,
    ) -> String {
        let mut params = DictionaryItemStrParams::new();
        params.set_contract_named_key(contract_hash, dictionary_name, dictionary_item_key);
        let dictionary_item = DictionaryItemInput::Params(params);
        let get_dictionary_item = create_test_sdk(None)
            .get_dictionary_item(
                get_state_root_hash.unwrap_or_default(),
                dictionary_item,
                None,
                node_address,
            )
            .await;
        let get_dictionary_item = get_dictionary_item.unwrap();
        assert!(!get_dictionary_item
            .result
            .api_version
            .to_string()
            .is_empty());

        // 1.6 does not have method as_cl_value()
        // let stored_value = get_dictionary_item.result.stored_value;
        // let cl_value = stored_value.as_cl_value().unwrap();
        // assert!(!cl_value.inner_bytes().is_empty());

        assert!(!get_dictionary_item
            .result
            .dictionary_key
            .to_string()
            .is_empty());
        let dictionary_key = get_dictionary_item.result.dictionary_key;
        dictionary_key.to_string()
    }

    pub async fn get_dictionnary_uref(
        contract_hash: &str,
        dictionary_name: &str,
        node_address: Option<String>,
    ) -> String {
        let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
            key: KeyIdentifierInput::String(contract_hash.to_string()),
            path: None,
            maybe_global_state_identifier: None,
            state_root_hash: None,
            maybe_block_id: None,
            node_address,
            verbosity: None,
        };
        let query_global_state = create_test_sdk(None).query_global_state(query_params).await;
        let query_global_state_result = query_global_state.unwrap();

        // Parse the JSON string in 1.6
        let json_string = to_string(&query_global_state_result.result.stored_value).unwrap();
        let parsed_json: Value = serde_json::from_str(&json_string).unwrap();
        let named_keys = &parsed_json["Contract"]["named_keys"];
        let dictionnary_uref = named_keys
            .as_array()
            .unwrap_or_else(|| panic!("named_keys is not an array"))
            .iter()
            .find(|obj| obj["name"] == Value::String(dictionary_name.to_string()))
            .and_then(|obj| obj["key"].as_str())
            .unwrap_or_else(|| panic!("Dictionary name not found in named_keys"))
            .to_string();
        dictionnary_uref.to_string()
    }

    pub async fn install_cep78(
        account: &str,
        private_key: &str,
        path: Option<&str>,
        network_constants: (&str, &str, &str),
    ) -> Result<String, Box<dyn std::error::Error>> {
        let mut cep78_reinstall_guard = CEP78_REINSTALL_GUARD.lock().await;
        if *cep78_reinstall_guard {
            return Err("CEP78 contract already installed".into());
        }
        *cep78_reinstall_guard = true;

        let (node_address, event_address, chain_name) = network_constants;

        let deploy_params = DeployStrParams::new(
            chain_name,
            account,
            Some(private_key.to_string()),
            None,
            None,
        );
        let session_params = SessionStrParams::default();
        session_params.set_session_args_json(ARGS_JSON);

        let payment_params = PaymentStrParams::default();
        payment_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);
        let path = match path {
            Some(path) => path,
            None => WASM_PATH,
        };
        let file_path = &format!("{path}{CEP78_CONTRACT}");
        let module_bytes = match read_wasm_file(file_path) {
            Ok(module_bytes) => module_bytes,
            Err(err) => {
                return Err(format!("Error reading file {}: {:?}", file_path, err).into());
            }
        };
        session_params.set_session_bytes(module_bytes.into());
        let sdk = create_test_sdk(None);
        let install = sdk
            .install(
                deploy_params,
                session_params,
                payment_params,
                Some(node_address.to_string()),
            )
            .await;
        assert!(!install
            .as_ref()
            .unwrap()
            .result
            .api_version
            .to_string()
            .is_empty());

        let deploy_hash = DeployHash::from(install.as_ref().unwrap().result.deploy_hash);
        let deploy_hash_as_string = deploy_hash.to_string();
        assert!(!deploy_hash_as_string.is_empty());

        let event_parse_result = sdk
            .wait_deploy(event_address, &deploy_hash_as_string, None)
            .await
            .unwrap();
        let deploy_processed = event_parse_result.body.unwrap().deploy_processed.unwrap();
        assert_eq!(deploy_processed.deploy_hash, deploy_hash_as_string);

        let get_deploy = sdk
            .get_deploy(
                deploy_hash,
                Some(true),
                None,
                Some(node_address.to_string()),
            )
            .await;
        let get_deploy = get_deploy.unwrap();
        assert!(!get_deploy.result.api_version.to_string().is_empty());
        assert!(!get_deploy.result.deploy.to_string().is_empty());
        Ok(deploy_hash_as_string)
    }
}

pub fn get_network_constants() -> (String, String, String) {
    let default_node_address =
        env::var("NODE_ADDRESS").unwrap_or_else(|_| DEFAULT_NODE_ADDRESS.to_string());
    let default_event_address =
        env::var("EVENT_ADDRESS").unwrap_or_else(|_| DEFAULT_EVENT_ADDRESS.to_string());
    let chain_name = env::var("CHAIN_NAME").unwrap_or_else(|_| DEFAULT_CHAIN_NAME.to_string());

    (default_node_address, default_event_address, chain_name)
}

pub fn get_user_private_key(user: Option<&str>) -> Result<String, std::io::Error> {
    let user = user.unwrap_or("user-1");
    let env_key = get_env_key(user);
    if !env_key.is_empty() {
        return Ok(env_key);
    }
    let (private_key_nctl_path, private_key_name) = get_private_key_constants();
    let user_key_path = match user {
        user if user.starts_with("user-") => {
            private_key_nctl_path.replace("user-1", user).to_string()
        }
        _ => format!("{private_key_nctl_path}{private_key_name}"),
    };
    read_pem_file(&user_key_path, &private_key_name)
}

fn get_private_key_constants() -> (String, String) {
    let private_key_name =
        env::var("PRIVATE_KEY_NAME").unwrap_or_else(|_| DEFAULT_PRIVATE_KEY_NAME.to_string());
    let private_key_nctl_path = env::var("PRIVATE_KEY_NCTL_PATH")
        .unwrap_or_else(|_| DEFAULT_PRIVATE_KEY_NCTL_PATH.to_string());

    (private_key_nctl_path, private_key_name)
}

fn get_env_key(user: &str) -> String {
    let private_key = match env::var(format!(
        "PRIVATE_KEY_{}",
        user.replace('-', "_").to_uppercase()
    )) {
        Ok(key) => key,
        Err(_) => return "".to_string(),
    };

    format!("-----BEGIN PRIVATE KEY----- {private_key} -----END PRIVATE KEY-----")
}

fn read_pem_file(file_path: &str, private_key_name: &str) -> Result<String, io::Error> {
    let path_buf = env::current_dir()?;

    let relative_path = path_buf
        .to_string_lossy()
        .replace("tests/integration/rust", "");
    let mut relative_path_buf = PathBuf::from(relative_path.clone());
    relative_path_buf.push(file_path);
    relative_path_buf.push(private_key_name);

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
    let mut file = File::open(relative_path_buf)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}

pub async fn install_cep78_if_needed(
    account: &str,
    private_key: &str,
    path: Option<&str>,
    network_constants: (&str, &str, &str),
) -> Option<String> {
    let mut install_guard = CEP78_INSTALLED_GUARD.lock().await;
    if !(*install_guard) {
        let deploy_hash = install_cep78(account, private_key, path, network_constants)
            .await
            .unwrap();
        *install_guard = true;
        return Some(deploy_hash);
    }
    None
}

pub async fn get_contract_cep78_hash_keys(
    account_hash: &str,
    node_address: &str,
) -> (String, String) {
    let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(account_hash.to_string()),
        path: None,
        maybe_global_state_identifier: None,
        state_root_hash: None,
        maybe_block_id: None,
        node_address: Some(node_address.to_string()),
        verbosity: None,
    };
    let query_global_state = create_test_sdk(None).query_global_state(query_params).await;
    let query_global_state_result = query_global_state.unwrap();

    let json_string = to_string(&query_global_state_result.result.stored_value).unwrap();

    // Parse the JSON string in 1.6
    let parsed_json: Value = serde_json::from_str(&json_string).unwrap();
    let named_keys = &parsed_json["Account"]["named_keys"];
    let named_keys_array = named_keys
        .as_array()
        .unwrap_or_else(|| panic!("named_keys is not an array"));

    let contract_cep78_hash = named_keys_array
        .iter()
        .find(|obj| obj["name"] == Value::String(CONTRACT_CEP78_KEY.to_string()))
        .and_then(|obj| obj["key"].as_str())
        .unwrap_or_else(|| panic!("Contract CEP78 key not found in named_keys"));

    let contract_cep78_package_hash = named_keys_array
        .iter()
        .find(|obj| obj["name"] == Value::String(PACKAGE_CEP78_KEY.to_string()))
        .and_then(|obj| obj["key"].as_str())
        .unwrap_or_else(|| panic!("Package CEP78 key not found in named_keys"));

    (
        contract_cep78_hash.to_string(),
        contract_cep78_package_hash.to_string(),
    )
}

pub async fn mint_nft(
    contract_cep78_hash: &str,
    account: &str,
    account_hash: &str,
    private_key: &str,
    network_constants: (&str, &str, &str),
) {
    let (node_address, event_address, chain_name) = network_constants;
    let deploy_params = DeployStrParams::new(
        chain_name,
        account,
        Some(private_key.to_string()),
        None,
        None,
    );
    let mut session_params = SessionStrParams::default();
    session_params.set_session_hash(contract_cep78_hash);
    session_params.set_session_entry_point(ENTRYPOINT_MINT);
    // Two ways to build args, either simple or json
    // let args_json_vec: Vec<String> = vec![
    //     r#"{"name": "token_meta_data", "type": "String", "value": "test_meta_data"}"#.to_string(),
    //     format!(r#"{{"name": "token_owner", "type": "Key", "value": "{account_hash}"}}"#),
    // ];
    // let args_json: String = format!("[{}]", args_json_vec.join(", "));
    let args = Vec::from([
        "token_meta_data:String='test_meta_data'".to_string(),
        format!("token_owner:Key='{account_hash}'").to_string(),
    ]);
    session_params.set_session_args(args);
    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT);
    let sdk = create_test_sdk(None);
    let test_call_entrypoint = sdk
        .call_entrypoint(
            deploy_params,
            session_params,
            payment_params,
            Some(node_address.to_string()),
        )
        .await;
    let result = &test_call_entrypoint.as_ref().unwrap().result;
    assert!(!result.clone().api_version.to_string().is_empty());

    let deploy_hash = DeployHash::from(result.deploy_hash);
    let deploy_hash_as_string = deploy_hash.to_string();
    assert!(!deploy_hash_as_string.is_empty());

    let event_parse_result = sdk
        .wait_deploy(event_address, &deploy_hash_as_string, None)
        .await
        .unwrap();
    let deploy_processed = event_parse_result.body.unwrap().deploy_processed.unwrap();
    assert_eq!(deploy_processed.deploy_hash, deploy_hash_as_string);
}

pub async fn get_block(node_address: &str) -> (String, u64) {
    let get_block = create_test_sdk(None)
        .get_block(None, None, Some(node_address.to_string()))
        .await;
    match get_block {
        Err(err) => {
            eprintln!("Block hash unreachable! {}", err);
            process::exit(1);
        }
        Ok(get_block) => {
            let block = get_block.result.block.unwrap();
            let block_hash: BlockHash = (*block.hash()).into();
            let block_height = block.header().height();
            (block_hash.to_string(), block_height)
        }
    }
}

pub fn get_event_handler_fn(deploy_hash: String) -> impl Fn(EventParseResult) {
    move |event_parse_result: EventParseResult| {
        // println!("get_event_handler_fn {}", deploy_hash);
        if let Some(err) = &event_parse_result.err {
            println!("{} {}", deploy_hash, err);
        } else if let Some(deploy_processed) = &event_parse_result.body.unwrap().deploy_processed {
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
