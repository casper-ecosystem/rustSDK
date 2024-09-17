use crate::types::transaction::Transaction;
use crate::SDK;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

/// Exposes the `sign_transaction` function to JavaScript with an alias.
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// JS function for `sign_transaction`.
    ///
    /// # Arguments
    ///
    /// * `transaction` - The transaction to sign.
    /// * `secret_key` - The secret key for signing.
    ///
    /// # Returns
    ///
    /// The signed `Transaction`.
    #[wasm_bindgen(js_name = "sign_transaction")]
    pub fn sign_transaction_js_alias(
        &self,
        transaction: Transaction,
        secret_key: &str,
    ) -> Transaction {
        sign_transaction(transaction, secret_key)
    }
}

impl SDK {
    /// Signs a transaction using the provided secret key.
    ///
    /// # Arguments
    ///
    /// * `transaction` - The transaction to sign.
    /// * `secret_key` - The secret key for signing.
    ///
    /// # Returns
    ///
    /// The signed `Transaction`.
    pub fn sign_transaction(&self, transaction: Transaction, secret_key: &str) -> Transaction {
        sign_transaction(transaction, secret_key)
    }
}

/// Internal function to sign a transaction.
pub(crate) fn sign_transaction(mut transaction: Transaction, secret_key: &str) -> Transaction {
    // log("sign_transaction!");
    transaction.sign(secret_key)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::{
            addr::entity_addr::EntityAddr,
            transaction_params::{
                transaction_builder_params::TransactionBuilderParams,
                transaction_str_params::TransactionStrParams,
            },
        },
    };
    use sdk_tests::{
        config::{ENTRYPOINT_MINT, PAYMENT_AMOUNT},
        tests::helpers::{get_network_constants, get_user_secret_key},
    };

    #[tokio::test]
    async fn test_sign_transaction_with_valid_params() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(
            "entity-contract-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();
        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let transaction = sdk
            .make_transaction(builder_params, transaction_params)
            .unwrap();

        let signed_transaction = sdk.sign_transaction(transaction, &secret_key);

        // Assert
        assert!(signed_transaction.verify());
        // assert!(signed_transaction.has_valid_hash());
        assert!(!signed_transaction
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_transaction.initiator_addr(), initiator_addr);
    }

    #[tokio::test]
    async fn test_sign_transaction_with_invalid_signature() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let (_, _, _, _, chain_name) = get_network_constants();

        let secret_key = get_user_secret_key(None).unwrap();
        let initiator_addr = public_key_from_secret_key(&secret_key).unwrap();

        let transaction_params = TransactionStrParams::default();
        transaction_params.set_secret_key(&secret_key);
        transaction_params.set_chain_name(&chain_name);
        transaction_params.set_payment_amount(PAYMENT_AMOUNT);

        let entity_addr = EntityAddr::from_formatted_str(
            "entity-contract-cfa781f5eb69c3eee952c2944ce9670a049f88c5e46b83fb5881ebe13fb98e6d",
        )
        .unwrap();
        let builder_params =
            TransactionBuilderParams::new_invocable_entity(entity_addr.into(), ENTRYPOINT_MINT);

        // Act
        let transaction = sdk
            .make_transaction(builder_params, transaction_params)
            .unwrap();

        let signed_transaction = sdk.sign_transaction(transaction, "test_wrong_signature");

        // Assert
        // assert!(signed_transaction.has_valid_hash());
        assert!(signed_transaction.verify());
        assert!(!signed_transaction
            .compute_approvals_hash()
            .unwrap()
            .to_string()
            .is_empty());
        assert_eq!(signed_transaction.initiator_addr(), initiator_addr);
    }
}
