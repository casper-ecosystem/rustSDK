#[cfg(target_arch = "wasm32")]
use crate::{
    types::{
        digest::Digest,
        era_id::EraId,
        hash::{block_hash::BlockHash, transaction_hash::TransactionHash},
        key::Key,
        public_key::PublicKey,
        record_id::RecordId,
        sdk_error::SdkError,
        transaction::Transaction,
    },
    SDK,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen(js_name = "get_binary_latest_switch_block_header")]
    pub async fn get_binary_latest_switch_block_header_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_latest_switch_block_header(node_address)
            .await;

        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_latest_block_header")]
    pub async fn get_binary_latest_block_header_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_latest_block_header(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_block_header_by_height")]
    pub async fn get_binary_block_header_by_height_js_alias(
        &self,
        height: u64,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_block_header_by_height(node_address, height)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_block_header_by_hash")]
    pub async fn get_binary_block_header_by_hash_js_alias(
        &self,
        block_hash: BlockHash,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_block_header_by_hash(node_address, block_hash.into())
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_latest_signed_block")]
    pub async fn get_binary_latest_signed_block_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_latest_signed_block(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_signed_block_by_height")]
    pub async fn get_binary_signed_block_by_height_js_alias(
        &self,
        height: u64,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_signed_block_by_height(node_address, height)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_signed_block_by_hash")]
    pub async fn get_binary_signed_block_by_hash_js_alias(
        &self,
        block_hash: BlockHash,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_signed_block_by_hash(node_address, block_hash.into())
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_transaction_by_hash")]
    pub async fn get_binary_transaction_by_hash_js_alias(
        &self,
        hash: TransactionHash,
        with_finalized_approvals: bool,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_transaction_by_hash(node_address, hash.into(), with_finalized_approvals)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_peers")]
    pub async fn get_binary_peers_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_peers(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_uptime")]
    pub async fn get_binary_uptime_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_uptime(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_last_progress")]
    pub async fn get_binary_last_progress_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_last_progress(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_reactor_state")]
    pub async fn get_binary_reactor_state_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_reactor_state(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_network_name")]
    pub async fn get_binary_network_name_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_network_name(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_consensus_validator_changes")]
    pub async fn get_binary_consensus_validator_changes_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_consensus_validator_changes(node_address)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_block_synchronizer_status")]
    pub async fn get_binary_block_synchronizer_status_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_block_synchronizer_status(node_address)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_available_block_range")]
    pub async fn get_binary_available_block_range_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_available_block_range(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_next_upgrade")]
    pub async fn get_binary_next_upgrade_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_next_upgrade(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_consensus_status")]
    pub async fn get_binary_consensus_status_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_consensus_status(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_chainspec_raw_bytes")]
    pub async fn get_binary_chainspec_raw_bytes_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_chainspec_raw_bytes(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_node_status")]
    pub async fn get_binary_node_status_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_node_status(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_validator_reward_by_era")]
    pub async fn get_binary_validator_reward_by_era_js_alias(
        &self,
        validator_key: PublicKey,
        era: EraId,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_validator_reward_by_era(node_address, validator_key.into(), era.into())
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_validator_reward_by_block_height")]
    pub async fn get_binary_validator_reward_by_block_height_js_alias(
        &self,
        validator_key: PublicKey,
        block_height: u64,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_validator_reward_by_block_height(
                node_address,
                validator_key.into(),
                block_height,
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_validator_reward_by_block_hash")]
    pub async fn get_binary_validator_reward_by_block_hash_js_alias(
        &self,
        validator_key: PublicKey,
        block_hash: BlockHash,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_validator_reward_by_block_hash(
                node_address,
                validator_key.into(),
                block_hash.into(),
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_delegator_reward_by_era")]
    pub async fn get_binary_delegator_reward_by_era_js_alias(
        &self,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        era: EraId,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_delegator_reward_by_era(
                node_address,
                validator_key.into(),
                delegator_key.into(),
                era.into(),
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_delegator_reward_by_block_height")]
    pub async fn get_binary_delegator_reward_by_block_height_js_alias(
        &self,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        block_height: u64,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_delegator_reward_by_block_height(
                node_address,
                validator_key.into(),
                delegator_key.into(),
                block_height,
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_delegator_reward_by_block_hash")]
    pub async fn get_binary_delegator_reward_by_block_hash_js_alias(
        &self,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        block_hash: BlockHash,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_delegator_reward_by_block_hash(
                node_address,
                validator_key.into(),
                delegator_key.into(),
                block_hash.into(),
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_read_record")]
    pub async fn get_binary_read_record_js_alias(
        &self,
        record_id: RecordId,
        key: Vec<u8>,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_read_record(node_address, record_id.into(), &key)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_global_state_item")]
    pub async fn get_binary_global_state_item_js_alias(
        &self,
        key: Key,
        path: Vec<String>,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_global_state_item(node_address, key.into(), path)
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_global_state_item_by_state_root_hash")]
    pub async fn get_binary_global_state_item_by_state_root_hash_js_alias(
        &self,
        state_root_hash: Digest,
        key: Key,
        path: Vec<String>,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_global_state_item_by_state_root_hash(
                node_address,
                state_root_hash.into(),
                key.into(),
                path,
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_global_state_item_by_block_hash")]
    pub async fn get_binary_global_state_item_by_block_hash_js_alias(
        &self,
        block_hash: BlockHash,
        key: Key,
        path: Vec<String>,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_global_state_item_by_block_hash(
                node_address,
                block_hash.into(),
                key.into(),
                path,
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_global_state_item_by_block_height")]
    pub async fn get_binary_global_state_item_by_block_height_js_alias(
        &self,
        block_height: u64,
        key: Key,
        path: Vec<String>,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_global_state_item_by_block_height(
                node_address,
                block_height,
                key.into(),
                path,
            )
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_try_accept_transaction")]
    pub async fn get_binary_try_accept_transaction_js_alias(
        &self,
        transaction: Transaction,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_try_accept_transaction(node_address, transaction.into())
            .await;

        match result {
            Ok(_) => Ok(JsValue::undefined()), // Return an appropriate JsValue for success
            Err(err) => Err(JsError::new(&format!("Error occurred: {:?}", err))),
        }
    }

    #[wasm_bindgen(js_name = "get_binary_try_speculative_execution")]
    pub async fn get_binary_try_speculative_execution_js_alias(
        &self,
        transaction: Transaction,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self
            .get_binary_try_speculative_execution(node_address, transaction.into())
            .await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }

    #[wasm_bindgen(js_name = "get_binary_protocol_version")]
    pub async fn get_binary_protocol_version_js_alias(
        &self,
        node_address: Option<String>,
    ) -> Result<JsValue, JsError> {
        let result = self.get_binary_protocol_version(node_address).await;
        result
            .and_then(|data| JsValue::from_serde(&data).map_err(SdkError::SerializationError))
            .map_err(|err| JsError::new(&format!("Error occurred: {:?}", err)))
    }
}
