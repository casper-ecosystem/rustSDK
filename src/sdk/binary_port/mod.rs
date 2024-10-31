use crate::{types::sdk_error::SdkError, SDK};
use casper_binary_port::{
    ConsensusStatus, ConsensusValidatorChanges, GlobalStateQueryResult, LastProgress, NetworkName,
    NodeStatus, ReactorStateName, RecordId, RewardResponse, SpeculativeExecutionResult,
    TransactionWithExecutionInfo, Uptime,
};
use casper_binary_port_access::{
    available_block_range, block_header_by_hash, block_header_by_height, block_synchronizer_status,
    chainspec_raw_bytes, consensus_status, consensus_validator_changes,
    delegator_reward_by_block_hash, delegator_reward_by_block_height, delegator_reward_by_era,
    global_state_item, global_state_item_by_block_hash, global_state_item_by_block_height,
    global_state_item_by_state_root_hash, last_progress, latest_block_header, latest_signed_block,
    latest_switch_block_header, network_name, next_upgrade, node_status, peers, protocol_version,
    reactor_state, read_record, signed_block_by_hash, signed_block_by_height, transaction_by_hash,
    try_accept_transaction, try_speculative_execution, uptime, validator_reward_by_block_hash,
    validator_reward_by_block_height, validator_reward_by_era,
};
use casper_types::{
    AvailableBlockRange, BlockHash, BlockHeader, BlockSynchronizerStatus, ChainspecRawBytes,
    Digest, EraId, Key, NextUpgrade, Peers, ProtocolVersion, PublicKey, SignedBlock, Transaction,
    TransactionHash,
};

pub mod wasm32;

impl SDK {
    /// Returns the latest switch block header.
    pub async fn get_binary_latest_switch_block_header(
        &self,
        node_address: Option<String>,
    ) -> Result<Option<BlockHeader>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match latest_switch_block_header(&node_address).await {
            Ok(block_header) => Ok(block_header),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve latest switch block header",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the latest block header.
    pub async fn get_binary_latest_block_header(
        &self,
        node_address: Option<String>,
    ) -> Result<Option<BlockHeader>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match latest_block_header(&node_address).await {
            Ok(block_header) => Ok(block_header),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve latest block header",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the block header at the given height.
    pub async fn get_binary_block_header_by_height(
        &self,
        node_address: Option<String>,
        height: u64,
    ) -> Result<Option<BlockHeader>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match block_header_by_height(&node_address, height).await {
            Ok(block_header) => Ok(block_header),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve block header by height",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the block header with the given hash.
    pub async fn get_binary_block_header_by_hash(
        &self,
        node_address: Option<String>,
        block_hash: BlockHash,
    ) -> Result<Option<BlockHeader>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match block_header_by_hash(&node_address, block_hash).await {
            Ok(block_header) => Ok(block_header),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve block header by block_hash",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the latest signed block along with signatures.
    pub async fn get_binary_latest_signed_block(
        &self,
        node_address: Option<String>,
    ) -> Result<Option<SignedBlock>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match latest_signed_block(&node_address).await {
            Ok(signed_block) => Ok(signed_block),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve latest signed block",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the signed block at the given height.
    pub async fn get_binary_signed_block_by_height(
        &self,
        node_address: Option<String>,
        height: u64,
    ) -> Result<Option<SignedBlock>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match signed_block_by_height(&node_address, height).await {
            Ok(signed_block) => Ok(signed_block),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve signed block by height",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the signed block with the given hash.
    pub async fn get_binary_signed_block_by_hash(
        &self,
        node_address: Option<String>,
        block_hash: BlockHash,
    ) -> Result<Option<SignedBlock>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match signed_block_by_hash(&node_address, block_hash).await {
            Ok(signed_block) => Ok(signed_block),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve signed block by block_hash",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the transaction by its hash.
    pub async fn get_binary_transaction_by_hash(
        &self,
        node_address: Option<String>,
        hash: TransactionHash,
        with_finalized_approvals: bool,
    ) -> Result<Option<TransactionWithExecutionInfo>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match transaction_by_hash(&node_address, hash, with_finalized_approvals).await {
            Ok(transaction) => Ok(transaction),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve transaction by hash",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the peer list.
    pub async fn get_binary_peers(&self, node_address: Option<String>) -> Result<Peers, SdkError> {
        let node_address = self.get_node_address(node_address);
        match peers(&node_address).await {
            Ok(peers) => Ok(peers),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve peer list",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the node uptime.
    pub async fn get_binary_uptime(
        &self,
        node_address: Option<String>,
    ) -> Result<Uptime, SdkError> {
        let node_address = self.get_node_address(node_address);
        match uptime(&node_address).await {
            Ok(uptime) => Ok(uptime),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve node uptime",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the last progress recorded by the node.
    pub async fn get_binary_last_progress(
        &self,
        node_address: Option<String>,
    ) -> Result<LastProgress, SdkError> {
        let node_address = self.get_node_address(node_address);
        match last_progress(&node_address).await {
            Ok(progress) => Ok(progress),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve last progress",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the current reactor state.
    pub async fn get_binary_reactor_state(
        &self,
        node_address: Option<String>,
    ) -> Result<ReactorStateName, SdkError> {
        let node_address = self.get_node_address(node_address);
        match reactor_state(&node_address).await {
            Ok(state) => Ok(state),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve reactor state",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the network name.
    pub async fn get_binary_network_name(
        &self,
        node_address: Option<String>,
    ) -> Result<NetworkName, SdkError> {
        let node_address = self.get_node_address(node_address);
        match network_name(&node_address).await {
            Ok(network_name) => Ok(network_name),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve network name",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the last consensus validator changes.
    pub async fn get_binary_consensus_validator_changes(
        &self,
        node_address: Option<String>,
    ) -> Result<ConsensusValidatorChanges, SdkError> {
        let node_address = self.get_node_address(node_address);
        match consensus_validator_changes(&node_address).await {
            Ok(changes) => Ok(changes),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve consensus validator changes",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the block synchronizer status.
    pub async fn get_binary_block_synchronizer_status(
        &self,
        node_address: Option<String>,
    ) -> Result<BlockSynchronizerStatus, SdkError> {
        let node_address = self.get_node_address(node_address);
        match block_synchronizer_status(&node_address).await {
            Ok(status) => Ok(status),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve block synchronizer status",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the available block range.
    pub async fn get_binary_available_block_range(
        &self,
        node_address: Option<String>,
    ) -> Result<AvailableBlockRange, SdkError> {
        let node_address = self.get_node_address(node_address);
        match available_block_range(&node_address).await {
            Ok(block_range) => Ok(block_range),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve available block range",
                error: err.to_string(),
            }),
        }
    }

    /// Returns information about the next upgrade point.
    pub async fn get_binary_next_upgrade(
        &self,
        node_address: Option<String>,
    ) -> Result<Option<NextUpgrade>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match next_upgrade(&node_address).await {
            Ok(upgrade) => Ok(upgrade),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve next upgrade",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the consensus status.
    pub async fn get_binary_consensus_status(
        &self,
        node_address: Option<String>,
    ) -> Result<ConsensusStatus, SdkError> {
        let node_address = self.get_node_address(node_address);
        match consensus_status(&node_address).await {
            Ok(status) => Ok(status),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve consensus status",
                error: err.to_string(),
            }),
        }
    }

    /// Returns the raw chainspec bytes and additional configuration.
    pub async fn get_binary_chainspec_raw_bytes(
        &self,
        node_address: Option<String>,
    ) -> Result<ChainspecRawBytes, SdkError> {
        let node_address = self.get_node_address(node_address);
        match chainspec_raw_bytes(&node_address).await {
            Ok(bytes) => Ok(bytes),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve chainspec raw bytes",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the node status.
    pub async fn get_binary_node_status(
        &self,
        node_address: Option<String>,
    ) -> Result<NodeStatus, SdkError> {
        // Get the node address, falling back to self's default if not provided
        let node_address = self.get_node_address(node_address);

        match node_status(&node_address).await {
            Ok(status) => Ok(status),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve node status",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given validator at the given era.
    pub async fn get_binary_validator_reward_by_era(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        era: EraId,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match validator_reward_by_era(&node_address, validator_key, era).await {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve validator reward by era",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given validator at the era containing the block at given height.
    pub async fn get_binary_validator_reward_by_block_height(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        block_height: u64,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match validator_reward_by_block_height(&node_address, validator_key, block_height).await {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve validator reward by block height",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given validator at the era containing the block with given hash.
    pub async fn get_binary_validator_reward_by_block_hash(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        block_hash: BlockHash,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match validator_reward_by_block_hash(&node_address, validator_key, block_hash).await {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve validator reward by block hash",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given delegator at the given era.
    pub async fn get_binary_delegator_reward_by_era(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        era: EraId,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match delegator_reward_by_era(&node_address, validator_key, delegator_key, era).await {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve delegator reward by era",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given delegator at the era containing the block at given height.
    pub async fn get_binary_delegator_reward_by_block_height(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        block_height: u64,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match delegator_reward_by_block_height(
            &node_address,
            validator_key,
            delegator_key,
            block_height,
        )
        .await
        {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve delegator reward by block height",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the reward for the given delegator at the era containing the block with given hash.
    pub async fn get_binary_delegator_reward_by_block_hash(
        &self,
        node_address: Option<String>,
        validator_key: PublicKey,
        delegator_key: PublicKey,
        block_hash: BlockHash,
    ) -> Result<Option<RewardResponse>, SdkError> {
        let node_address = self.get_node_address(node_address);

        match delegator_reward_by_block_hash(
            &node_address,
            validator_key,
            delegator_key,
            block_hash,
        )
        .await
        {
            Ok(reward) => Ok(reward),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve delegator reward by block hash",
                error: err.to_string(),
            }),
        }
    }

    /// Reads a record from the node.
    pub async fn get_binary_read_record(
        &self,
        node_address: Option<String>,
        record_id: RecordId,
        key: &[u8],
    ) -> Result<Vec<u8>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match read_record(&node_address, record_id, key).await {
            Ok(record) => Ok(record),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to read record",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves an item from the global state using the most recent state root hash.
    pub async fn get_binary_global_state_item(
        &self,
        node_address: Option<String>,
        key: Key,
        path: Vec<String>,
    ) -> Result<Option<GlobalStateQueryResult>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match global_state_item(&node_address, key, path).await {
            Ok(item) => Ok(item),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve global state item",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves an item from the global state using a specific state root hash.
    pub async fn get_binary_global_state_item_by_state_root_hash(
        &self,
        node_address: Option<String>,
        state_root_hash: Digest,
        key: Key,
        path: Vec<String>,
    ) -> Result<Option<GlobalStateQueryResult>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match global_state_item_by_state_root_hash(&node_address, state_root_hash, key, path).await
        {
            Ok(item) => Ok(item),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve global state item by state root hash",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves an item from the global state using a block hash.
    pub async fn get_binary_global_state_item_by_block_hash(
        &self,
        node_address: Option<String>,
        block_hash: BlockHash,
        key: Key,
        path: Vec<String>,
    ) -> Result<Option<GlobalStateQueryResult>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match global_state_item_by_block_hash(&node_address, block_hash, key, path).await {
            Ok(item) => Ok(item),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve global state item by block hash",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves an item from the global state using a block height.
    pub async fn get_binary_global_state_item_by_block_height(
        &self,
        node_address: Option<String>,
        block_height: u64,
        key: Key,
        path: Vec<String>,
    ) -> Result<Option<GlobalStateQueryResult>, SdkError> {
        let node_address = self.get_node_address(node_address);
        match global_state_item_by_block_height(&node_address, block_height, key, path).await {
            Ok(item) => Ok(item),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve global state item by block height",
                error: err.to_string(),
            }),
        }
    }

    /// Attempts to send a transaction to the node for inclusion.
    pub async fn get_binary_try_accept_transaction(
        &self,
        node_address: Option<String>,
        transaction: Transaction,
    ) -> Result<(), SdkError> {
        let node_address = self.get_node_address(node_address);
        match try_accept_transaction(&node_address, transaction).await {
            Ok(_) => Ok(()),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to accept transaction",
                error: err.to_string(),
            }),
        }
    }

    /// Attempts to send a transaction to the node for speculative execution.
    pub async fn get_binary_try_speculative_execution(
        &self,
        node_address: Option<String>,
        transaction: Transaction,
    ) -> Result<SpeculativeExecutionResult, SdkError> {
        let node_address = self.get_node_address(node_address);
        match try_speculative_execution(&node_address, transaction).await {
            Ok(result) => Ok(result),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to perform speculative execution",
                error: err.to_string(),
            }),
        }
    }

    /// Retrieves the protocol version from the node.
    pub async fn get_binary_protocol_version(
        &self,
        node_address: Option<String>,
    ) -> Result<ProtocolVersion, SdkError> {
        let node_address = self.get_node_address(node_address);
        match protocol_version(&node_address).await {
            Ok(version) => Ok(version),
            Err(err) => Err(SdkError::CustomError {
                context: "Failed to retrieve protocol version",
                error: err.to_string(),
            }),
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        helpers::{public_key_from_secret_key, secret_key_from_pem},
        types::transaction_params::transaction_str_params::TransactionStrParams,
    };

    use super::*;
    use casper_types::bytesrepr::ToBytes;
    use sdk_tests::{
        config::TRANSFER_AMOUNT,
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    async fn test_get_binary_latest_switch_block_header_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk
            .get_binary_latest_switch_block_header(Some(node_address))
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();

        assert!(!block_header.body_hash().to_string().is_empty());
        assert!(block_header.height() > 0);
    }

    #[tokio::test]
    async fn test_get_binary_latest_block_header_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_latest_block_header(Some(node_address)).await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();

        assert!(!block_header.body_hash().to_string().is_empty());
        assert!(block_header.height() > 0);
    }

    #[tokio::test]
    async fn test_get_binary_block_header_by_height_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let block_height = 1; // Sample block height

        let result = sdk
            .get_binary_block_header_by_height(Some(node_address), block_height)
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();

        assert!(!block_header.body_hash().to_string().is_empty());
        assert_eq!(block_header.height(), block_height);
    }

    #[tokio::test]
    async fn test_get_binary_block_header_by_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let block_height = 1; // Sample block height

        let result = sdk
            .get_binary_block_header_by_height(Some(node_address.clone()), block_height)
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();
        let block_hash = block_header.block_hash();

        assert!(!block_hash.to_string().is_empty());

        let result = sdk
            .get_binary_block_header_by_hash(Some(node_address), block_hash)
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();

        assert_eq!(
            block_header.block_hash().to_hex_string(),
            block_hash.to_hex_string()
        );
    }

    #[tokio::test]
    async fn test_get_binary_latest_signed_block_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_latest_signed_block(Some(node_address)).await;
        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert!(!signed_block.block().hash().to_string().is_empty());
        assert!(signed_block.block().height() > 0);
    }

    #[tokio::test]
    async fn test_get_binary_signed_block_by_height_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let block_height = 1;

        let result = sdk
            .get_binary_signed_block_by_height(Some(node_address), block_height)
            .await;
        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert_eq!(signed_block.block().height(), block_height);
        assert!(!signed_block.block().hash().to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_signed_block_by_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let block_height = 1;

        let result = sdk
            .get_binary_signed_block_by_height(Some(node_address.clone()), block_height)
            .await;
        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert_eq!(signed_block.block().height(), block_height);
        let block_hash = signed_block.block().hash();
        assert!(!block_hash.to_string().is_empty());

        let result = sdk
            .get_binary_signed_block_by_hash(Some(node_address), *block_hash)
            .await;

        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert_eq!(
            signed_block.block().hash().to_hex_string(),
            block_hash.to_hex_string()
        );
    }

    #[tokio::test]
    async fn test_get_binary_transaction_by_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (rpc_address, _, _, node_address, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        let transfer = sdk
            .transfer_transaction(
                None,
                &initiator_addr, // self transfer
                TRANSFER_AMOUNT,
                transaction_params,
                None,
                None,
                Some(rpc_address.clone()),
            )
            .await
            .unwrap();
        let transaction_hash = transfer.result.transaction_hash;
        assert!(!transaction_hash.to_string().is_empty());

        let result = sdk
            .get_binary_transaction_by_hash(Some(node_address), transaction_hash, false)
            .await;

        let transaction = result.unwrap();
        assert!(transaction.is_some());
        let transaction = transaction.unwrap();
        assert_eq!(
            transaction.into_inner().0.hash().to_hex_string(),
            transaction_hash.to_hex_string()
        );
    }

    #[tokio::test]
    async fn test_get_binary_peers_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_peers(Some(node_address)).await;
        let peers = result.unwrap();
        assert!(!peers.into_inner().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_uptime_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_uptime(Some(node_address)).await;
        let uptime = result.unwrap();
        assert!(!uptime.into_inner().to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_last_progress_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_last_progress(Some(node_address)).await;
        let progress = result.unwrap();
        assert!(!progress.into_inner().to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_reactor_state_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_reactor_state(Some(node_address)).await;
        let state = result.unwrap();
        assert!(!state.into_inner().to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_network_name_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_network_name(Some(node_address)).await;
        let network_name = result.unwrap();
        assert!(!network_name.into_inner().to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_consensus_validator_changes_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk
            .get_binary_consensus_validator_changes(Some(node_address))
            .await;
        let changes = result.unwrap();
        // Todo check empty
        assert!(changes.into_inner().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_block_synchronizer_status_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk
            .get_binary_block_synchronizer_status(Some(node_address))
            .await;
        let status = result.unwrap();
        assert!(!status.to_bytes().unwrap().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_available_block_range_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk
            .get_binary_available_block_range(Some(node_address))
            .await;
        let block_range = result.unwrap();
        assert!(block_range.low() <= block_range.high());
    }

    #[tokio::test]
    async fn test_get_binary_next_upgrade_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_next_upgrade(Some(node_address)).await;
        let upgrade = result.unwrap();
        // TODO check
        assert!(upgrade.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_consensus_status_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_consensus_status(Some(node_address)).await;
        let status = result.unwrap();
        assert!(!status.validator_public_key().to_string().is_empty());
        assert!(status.round_length().is_some())
    }

    #[tokio::test]
    async fn test_get_binary_chainspec_raw_bytes_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_chainspec_raw_bytes(Some(node_address)).await;
        let chainspec = result.unwrap();
        assert!(!chainspec.chainspec_bytes().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_node_status_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let get_binary_node_status = sdk.get_binary_node_status(Some(node_address)).await;

        let get_binary_node_status = get_binary_node_status.unwrap();
        assert!(!get_binary_node_status
            .protocol_version
            .to_string()
            .is_empty());
        assert!(!get_binary_node_status.chainspec_name.to_string().is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_validator_reward_by_era_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get validator key
        let secret_key = get_user_secret_key(None).unwrap();
        let secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&secret_key_from_pem);
        let era = EraId::new(1);

        let result = sdk
            .get_binary_validator_reward_by_era(Some(node_address), validator_key, era)
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_validator_reward_by_block_height_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get validator key
        let secret_key = get_user_secret_key(None).unwrap();
        let secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&secret_key_from_pem);
        let block_height = 1;

        let result = sdk
            .get_binary_validator_reward_by_block_height(
                Some(node_address),
                validator_key,
                block_height,
            )
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_validator_reward_by_block_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get validator key
        let secret_key = get_user_secret_key(None).unwrap();
        let secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&secret_key_from_pem);

        let block_height = 1;

        let result = sdk
            .get_binary_signed_block_by_height(Some(node_address.clone()), block_height)
            .await;
        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert_eq!(signed_block.block().height(), block_height);
        let block_hash = signed_block.block().hash();
        assert!(!block_hash.to_string().is_empty());

        let result = sdk
            .get_binary_validator_reward_by_block_hash(
                Some(node_address),
                validator_key,
                *block_hash,
            )
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_delegator_reward_by_era_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get delegator key
        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        // TODO Get Delegator key
        let secret_key = get_user_secret_key(Some("user-2")).unwrap();
        let delegator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let delegator_key = PublicKey::from(&delegator_secret_key_from_pem);

        let era = EraId::new(1);

        let result = sdk
            .get_binary_delegator_reward_by_era(
                Some(node_address),
                validator_key,
                delegator_key,
                era,
            )
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_delegator_reward_by_block_height_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get delegator key
        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        // TODO Get Delegator key
        let secret_key = get_user_secret_key(Some("user-2")).unwrap();
        let delegator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let delegator_key = PublicKey::from(&delegator_secret_key_from_pem);
        let block_height = 1;

        let result = sdk
            .get_binary_delegator_reward_by_block_height(
                Some(node_address),
                validator_key,
                delegator_key,
                block_height,
            )
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_delegator_reward_by_block_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        // TODO Get delegator key
        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        // TODO Get Delegator key
        let secret_key = get_user_secret_key(Some("user-2")).unwrap();
        let delegator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let delegator_key = PublicKey::from(&delegator_secret_key_from_pem);

        let block_height = 1;

        let result = sdk
            .get_binary_signed_block_by_height(Some(node_address.clone()), block_height)
            .await;
        let signed_block = result.unwrap();
        assert!(signed_block.is_some());
        let signed_block = signed_block.unwrap();
        assert_eq!(signed_block.block().height(), block_height);
        let block_hash = signed_block.block().hash();
        assert!(!block_hash.to_string().is_empty());

        let result = sdk
            .get_binary_delegator_reward_by_block_hash(
                Some(node_address),
                validator_key,
                delegator_key,
                *block_hash,
            )
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_none());
    }

    #[tokio::test]
    async fn test_get_binary_read_record_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let record_id = RecordId::BlockHeader;
        let key = b"record_key";

        let result = sdk
            .get_binary_read_record(Some(node_address), record_id, key)
            .await;

        // TODO
        let reward = result.unwrap();
        assert!(reward.is_empty());
    }

    #[tokio::test]
    async fn test_get_binary_global_state_item_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        let key = Key::Account(validator_key.to_account_hash());

        let path = vec![];

        let result = sdk
            .get_binary_global_state_item(Some(node_address), key, path)
            .await;
        let item = result.unwrap();
        assert!(item.is_some());
    }

    #[tokio::test]
    async fn test_get_binary_global_state_item_by_state_root_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        let key = Key::Account(validator_key.to_account_hash());
        let path = vec![];
        let height = 1;

        let result = sdk
            .get_binary_block_header_by_height(Some(node_address.clone()), height)
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();
        let state_root_hash = block_header.state_root_hash();

        assert!(!state_root_hash.to_string().is_empty());

        let result = sdk
            .get_binary_global_state_item_by_state_root_hash(
                Some(node_address),
                *state_root_hash,
                key,
                path,
            )
            .await;
        let item = result.unwrap();
        assert!(item.is_some());
    }

    #[tokio::test]
    async fn test_get_binary_global_state_item_by_block_hash_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        let key = Key::Account(validator_key.to_account_hash());
        let path = vec![];

        let block_height = 1;

        let result = sdk
            .get_binary_block_header_by_height(Some(node_address.clone()), block_height)
            .await;

        let block_header = result.unwrap();
        assert!(block_header.is_some());
        let block_header = block_header.unwrap();
        let block_hash = block_header.block_hash();

        assert!(!block_hash.to_string().is_empty());

        let result = sdk
            .get_binary_global_state_item_by_block_hash(Some(node_address), block_hash, key, path)
            .await;
        let item = result.unwrap();
        assert!(item.is_some());
    }

    #[tokio::test]
    async fn test_get_binary_global_state_item_by_block_height_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();
        let secret_key = get_user_secret_key(None).unwrap();
        let validator_secret_key_from_pem = secret_key_from_pem(&secret_key).unwrap();
        let validator_key = PublicKey::from(&validator_secret_key_from_pem);

        let key = Key::Account(validator_key.to_account_hash());
        let path = vec![];

        let block_height = 1;

        let result = sdk
            .get_binary_global_state_item_by_block_height(
                Some(node_address),
                block_height,
                key,
                path,
            )
            .await;
        let item = result.unwrap();
        assert!(item.is_some());
    }

    #[tokio::test]
    async fn test_get_binary_try_accept_transaction_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        let make_transfer_transaction = sdk
            .make_transfer_transaction(
                None,
                &initiator_addr, // self transfer
                TRANSFER_AMOUNT,
                transaction_params,
                None,
            )
            .unwrap();
        assert!(!make_transfer_transaction.hash().to_string().is_empty());

        let result = sdk
            .get_binary_try_accept_transaction(Some(node_address), make_transfer_transaction.into())
            .await;

        assert!(result.is_ok());
    }

    #[tokio::test]
    #[ignore]
    async fn _test_get_binary_try_speculative_execution_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(TRANSFER_AMOUNT);

        let make_transfer_transaction = sdk
            .make_transfer_transaction(
                None,
                &initiator_addr, // self transfer
                TRANSFER_AMOUNT,
                transaction_params,
                None,
            )
            .unwrap();
        assert!(!make_transfer_transaction.hash().to_string().is_empty());

        let result = sdk
            .get_binary_try_speculative_execution(
                Some(node_address),
                make_transfer_transaction.into(),
            )
            .await;

        // TODO check transaction V1 in speculative exec
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_binary_protocol_version_success() {
        let sdk = SDK::new(None, None, None);
        let (_, _, _, node_address, _) = get_network_constants();

        let result = sdk.get_binary_protocol_version(Some(node_address)).await;
        let protocol_version = result.unwrap();
        assert!(!protocol_version.value().to_string().is_empty());
    }
}
