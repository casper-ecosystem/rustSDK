pub mod call_entrypoint;
pub mod call_entrypoint_deploy;
pub mod install;
pub mod install_deploy;
pub mod query_contract_dict;
pub mod query_contract_key;

#[cfg(test)]
use crate::rpcs::get_dictionary_item::DictionaryItemInput;
#[cfg(test)]
use crate::{helpers::public_key_from_secret_key, types::public_key::PublicKey};
#[cfg(test)]
use sdk_tests::config::{DICTIONARY_ITEM_KEY, DICTIONARY_NAME};
#[cfg(test)]
use sdk_tests::tests::helpers::mint_nft;

#[cfg(test)]
pub async fn install_cep78() -> String {
    use sdk_tests::{
        config::WASM_PATH,
        tests::helpers::{
            get_contract_cep78_hash_keys, get_network_constants, get_user_secret_key,
            install_cep78_if_needed,
        },
    };

    let secret_key = get_user_secret_key(None).unwrap();
    let account = public_key_from_secret_key(&secret_key).unwrap();
    let public_key = PublicKey::new(&account).unwrap();
    let account_hash = public_key.to_account_hash().to_formatted_string();
    let (node_address, event_address, _, chain_name) = get_network_constants();
    install_cep78_if_needed(
        &account,
        &secret_key,
        Some(WASM_PATH),
        (&node_address, &event_address, &chain_name),
    )
    .await;
    let (contract_cep78_hash, _, _) =
        get_contract_cep78_hash_keys(&account_hash, &node_address).await;
    contract_cep78_hash
}

#[cfg(test)]
pub async fn get_dictionary_item(as_params: bool) -> DictionaryItemInput {
    use sdk_tests::tests::helpers::{get_network_constants, get_user_secret_key};

    static mut CONTRACT_CEP78_HASH: Option<String> = None;
    let (node_address, event_address, _, chain_name) = get_network_constants();

    unsafe {
        if CONTRACT_CEP78_HASH.is_none() {
            let contract_cep78_hash = install_cep78().await;
            let secret_key = get_user_secret_key(None).unwrap();
            let account = public_key_from_secret_key(&secret_key).unwrap();
            let public_key = PublicKey::new(&account).unwrap();
            let account_hash = public_key.to_account_hash().to_formatted_string();
            mint_nft(
                &contract_cep78_hash,
                &account,
                &account_hash,
                &secret_key,
                (&node_address, &event_address, &chain_name),
            )
            .await;
            CONTRACT_CEP78_HASH = Some(contract_cep78_hash);
        }
        if as_params {
            get_dictionary_item_params_input(CONTRACT_CEP78_HASH.as_ref().unwrap()).await
        } else {
            get_dictionary_item_input(CONTRACT_CEP78_HASH.as_ref().unwrap()).await
        }
    }
}

#[cfg(test)]
async fn get_dictionary_item_input(contract_addr: &str) -> DictionaryItemInput {
    use crate::types::dictionary_item_identifier::DictionaryItemIdentifier;

    DictionaryItemInput::Identifier(
        DictionaryItemIdentifier::new_from_contract_info(
            contract_addr,
            DICTIONARY_NAME,
            DICTIONARY_ITEM_KEY,
        )
        .unwrap(),
    )
}

#[cfg(test)]
async fn get_dictionary_item_params_input(account_hash: &str) -> DictionaryItemInput {
    use crate::types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams;

    let mut params = DictionaryItemStrParams::new();
    params.set_contract_named_key(account_hash, DICTIONARY_NAME, DICTIONARY_ITEM_KEY);
    DictionaryItemInput::Params(params)
}
