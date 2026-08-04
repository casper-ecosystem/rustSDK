pub mod call_entrypoint;
pub mod install;
pub mod query_contract_dict;
pub mod query_contract_key;

#[cfg(test)]
use crate::rpcs::get_dictionary_item::DictionaryItemInput;
#[cfg(test)]
use crate::{helpers::public_key_from_secret_key, types::public_key::PublicKey};
#[cfg(test)]
use once_cell::sync::Lazy;
#[cfg(test)]
use sdk_tests::config::{DICTIONARY_ITEM_KEY, DICTIONARY_NAME};
#[cfg(test)]
use sdk_tests::tests::helpers::mint_nft;
#[cfg(test)]
use tokio::sync::Mutex as TokioMutex;

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
    let (node_address, events_address, chain_name) = get_network_constants();
    install_cep78_if_needed(
        &account,
        &secret_key,
        Some(WASM_PATH),
        (&node_address, &events_address, &chain_name),
    )
    .await;
    let (contract_cep78_hash, _) = get_contract_cep78_hash_keys(&account_hash, &node_address).await;
    contract_cep78_hash
}

#[cfg(test)]
static CONTRACT_CEP78_HASH: Lazy<TokioMutex<Option<String>>> = Lazy::new(|| TokioMutex::new(None));

#[cfg(test)]
pub async fn get_dictionary_item(as_params: bool) -> DictionaryItemInput {
    use sdk_tests::tests::helpers::{get_network_constants, get_user_secret_key};

    let (node_address, events_address, chain_name) = get_network_constants();

    let mut contract_cep78_hash = CONTRACT_CEP78_HASH.lock().await;

    if contract_cep78_hash.is_none() {
        let new_contract_cep78_hash = install_cep78().await;
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let public_key = PublicKey::new(&account).unwrap();
        let account_hash = public_key.to_account_hash().to_formatted_string();

        // Release the lock here before awaiting
        drop(contract_cep78_hash);

        mint_nft(
            &new_contract_cep78_hash,
            &account,
            &account_hash,
            &secret_key,
            (&node_address, &events_address, &chain_name),
        )
        .await;
        contract_cep78_hash = CONTRACT_CEP78_HASH.lock().await;
        *contract_cep78_hash = Some(new_contract_cep78_hash);
    }

    if as_params {
        get_dictionary_item_params_input(contract_cep78_hash.as_ref().unwrap()).await
    } else {
        get_dictionary_item_input(contract_cep78_hash.as_ref().unwrap()).await
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
async fn get_dictionary_item_params_input(key: &str) -> DictionaryItemInput {
    use crate::types::deploy_params::dictionary_item_str_params::DictionaryItemStrParams;

    let mut params = DictionaryItemStrParams::new();
    params.set_contract_named_key(key, DICTIONARY_NAME, DICTIONARY_ITEM_KEY);
    DictionaryItemInput::Params(Box::new(params))
}
