//! Composition helpers built on top of SDK RPC (not new node methods).

#[cfg(feature = "rpc")]
pub mod blocks;

#[cfg(feature = "transaction")]
pub mod stake;

/// Tool names for compose helpers enabled in this build.
pub fn tool_names() -> &'static [&'static str] {
    #[cfg(all(feature = "rpc", feature = "transaction"))]
    {
        const NAMES: &[&str] = &[
            "sdk_get_latest_blocks",
            "sdk_get_block_transactions",
            "sdk_make_delegate_transaction",
            "sdk_make_undelegate_transaction",
            "sdk_make_redelegate_transaction",
        ];
        NAMES
    }
    #[cfg(all(feature = "rpc", not(feature = "transaction")))]
    {
        blocks::tool_names()
    }
    #[cfg(all(not(feature = "rpc"), feature = "transaction"))]
    {
        stake::tool_names()
    }
    #[cfg(all(not(feature = "rpc"), not(feature = "transaction")))]
    {
        &[]
    }
}
