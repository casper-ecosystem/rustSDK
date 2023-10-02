use crate::config::{
    TestConfig, ARGS_JSON, CEP78_CONTRACT, CHAIN_NAME, CONTRACT_CEP78_KEY, DEFAULT_NODE_ADDRESS,
    DEPLOY_TIME, ENTRYPOINT_MINT, PACKAGE_CEP78_KEY, PAYMENT_AMOUNT, PAYMENT_AMOUNT_CONTRACT_CEP78,
    PRIVATE_KEY_NAME,
};
use casper_rust_wasm_sdk::{
    rpcs::query_global_state::QueryGlobalStateParams,
    types::{
        block_hash::BlockHash,
        deploy_hash::DeployHash,
        deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
        uref::URef,
    },
};
use casper_rust_wasm_sdk::{
    rpcs::{get_dictionary_item::DictionaryItemInput, query_global_state::KeyIdentifierInput},
    types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams,
    SDK,
};
use lazy_static::lazy_static;
use std::io::{self, Read};
use std::path::{Path, PathBuf};
use std::process;
use std::{fs::File, thread};
use tokio::sync::Mutex;

pub fn create_test_sdk(config: Option<TestConfig>) -> SDK {
    match config {
        Some(config) => SDK::new(config.node_address, config.verbosity),
        None => SDK::new(None, None),
    }
}

pub fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let root_path = Path::new("../../wasm/");
    let path = root_path.join(file_path);
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}

pub fn read_pem_file(file_path: &str) -> Result<String, io::Error> {
    let mut path_buf = PathBuf::new();
    path_buf.push(file_path);
    if file_path.is_empty() || !path_buf.exists() {
        path_buf.clear();
        path_buf.push(PRIVATE_KEY_NAME);
    }
    let mut file = match File::open(&path_buf) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("{}", err);
            panic!();
        }
    };
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

pub async fn get_block() -> (String, String) {
    let get_block = create_test_sdk(None)
        .get_block(None, None, Some(DEFAULT_NODE_ADDRESS.to_string()))
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
            (block_hash.to_string(), block_height.to_string())
        }
    }
}

pub async fn get_main_purse(account_identifier_as_string: &str) -> String {
    let purse_uref = *(create_test_sdk(None)
        .get_account(
            None,
            Some(account_identifier_as_string.to_owned()),
            None,
            None,
            Some(DEFAULT_NODE_ADDRESS.to_string()),
        )
        .await
        .unwrap()
        .result
        .account
        .main_purse());
    let purse_uref: URef = purse_uref.into();
    purse_uref.to_formatted_string()
}

pub async fn get_contract_cep78_hash_keys(account_hash: &str) -> (String, String) {
    let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(account_hash.to_string()),
        path: None,
        maybe_global_state_identifier: None,
        state_root_hash: None,
        maybe_block_id: None,
        node_address: Some(DEFAULT_NODE_ADDRESS.to_string()),
        verbosity: None,
    };
    let query_global_state = create_test_sdk(None).query_global_state(query_params).await;
    let query_global_state_result = query_global_state.unwrap();
    let account = query_global_state_result
        .result
        .stored_value
        .as_account()
        .unwrap();
    let named_keys = account.named_keys();
    let (_, contract_cep78_hash) = named_keys
        .iter()
        .find(|(key, _)| key == &CONTRACT_CEP78_KEY)
        .unwrap();
    let (_, contract_cep78_package_hash) = named_keys
        .iter()
        .find(|(key, _)| key == &PACKAGE_CEP78_KEY)
        .unwrap();
    (
        contract_cep78_hash.to_formatted_string(),
        contract_cep78_package_hash.to_formatted_string(),
    )
}

pub async fn mint_nft(
    contract_cep78_hash: &str,
    account: &str,
    account_hash: &str,
    private_key: &str,
) {
    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
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
    let test_call_entrypoint = create_test_sdk(None)
        .call_entrypoint(
            deploy_params,
            session_params,
            payment_params,
            Some(DEFAULT_NODE_ADDRESS.to_string()),
        )
        .await;
    assert!(!test_call_entrypoint
        .as_ref()
        .unwrap()
        .result
        .api_version
        .to_string()
        .is_empty());
    let deploy_hash = DeployHash::from(test_call_entrypoint.as_ref().unwrap().result.deploy_hash);
    let deploy_hash_as_string = deploy_hash.to_string();
    assert!(!deploy_hash_as_string.is_empty());

    thread::sleep(DEPLOY_TIME); // Let's wait for deployment on nctl
}

pub async fn get_dictionnary_key(
    contract_hash: &str,
    dictionary_name: &str,
    dictionary_item_key: &str,
    get_state_root_hash: Option<&str>,
) -> String {
    let mut params = DictionaryItemStrParams::new();
    params.set_contract_named_key(contract_hash, dictionary_name, dictionary_item_key);
    let dictionary_item = DictionaryItemInput::Params(params);
    let get_dictionary_item = create_test_sdk(None)
        .get_dictionary_item(
            get_state_root_hash.unwrap_or_default(),
            dictionary_item,
            None,
            Some(DEFAULT_NODE_ADDRESS.to_string()),
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

pub async fn get_dictionnary_uref(contract_hash: &str, dictionary_name: &str) -> String {
    let query_params: QueryGlobalStateParams = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(contract_hash.to_string()),
        path: None,
        maybe_global_state_identifier: None,
        state_root_hash: None,
        maybe_block_id: None,
        node_address: Some(DEFAULT_NODE_ADDRESS.to_string()),
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

lazy_static! {
    pub static ref CEP78_INSTALLED_GUARD: Mutex<bool> = Mutex::new(false);
    pub static ref CEP78_REINSTALL_GUARD: Mutex<bool> = Mutex::new(false);
}

pub async fn install_cep78(
    account: &str,
    private_key: &str,
) -> Result<String, Box<dyn std::error::Error>> {
    let mut cep78_reinstall_guard = CEP78_REINSTALL_GUARD.lock().await;
    if *cep78_reinstall_guard {
        return Err("CEP78 contract already installed".into());
    }
    *cep78_reinstall_guard = true;
    let deploy_params = DeployStrParams::new(
        CHAIN_NAME,
        account,
        Some(private_key.to_string()),
        None,
        None,
    );
    let session_params = SessionStrParams::default();
    session_params.set_session_args_json(ARGS_JSON);

    let payment_params = PaymentStrParams::default();
    payment_params.set_payment_amount(PAYMENT_AMOUNT_CONTRACT_CEP78);
    let file_path = CEP78_CONTRACT;
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
            Some(DEFAULT_NODE_ADDRESS.to_string()),
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

    thread::sleep(DEPLOY_TIME); // Let's wait for deployment on nctl

    //dbg!(deploy_hash_as_string.clone());
    // let get_deploy = sdk
    //     .get_deploy(deploy_hash, Some(true), None, Some(DEFAULT_NODE_ADDRESS.to_string()))
    //     .await;
    // let get_deploy = get_deploy.unwrap();
    // assert!(!get_deploy.result.api_version.to_string().is_empty());
    // assert!(!get_deploy.result.deploy.to_string().is_empty());
    //dbg!(get_deploy.result.deploy);
    //dbg!(deploy_hash_as_string);
    Ok(deploy_hash_as_string)
}

pub async fn install_cep78_if_needed(account: &str, private_key: &str) -> Option<String> {
    let mut install_guard = CEP78_INSTALLED_GUARD.lock().await;
    if !(*install_guard) {
        let deploy_hash = install_cep78(account, private_key).await.unwrap();
        *install_guard = true;
        return Some(deploy_hash);
    }
    None
}
