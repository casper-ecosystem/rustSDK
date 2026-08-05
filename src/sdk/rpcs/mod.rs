pub mod get_account;
pub mod get_auction_info;
pub mod get_balance;
pub mod get_block;
pub mod get_block_transfers;
pub mod get_chainspec;
pub mod get_deploy;
pub mod get_dictionary_item;
pub mod get_entity;
pub mod get_era_info;
pub mod get_era_summary;
pub mod get_node_status;
pub mod get_peers;
pub mod get_reward;
pub mod get_state_root_hash;
pub mod get_transaction;
pub mod get_validator_changes;
pub mod list_rpcs;
#[cfg(feature = "deploy")]
pub mod put_deploy;
#[cfg(feature = "transaction")]
pub mod put_transaction;
pub mod query_balance;
pub mod query_balance_details;
pub mod query_global_state;
#[cfg(feature = "transaction")]
pub mod speculative_exec;
#[cfg(feature = "deploy")]
pub mod speculative_exec_deploy;

#[cfg(test)]
use dotenvy::dotenv;

#[cfg(test)]
mod setup {
    use super::*;
    #[ctor::ctor(unsafe)]
    fn setup() {
        dotenv().ok();
    }
}
