//! Stake transaction builders (delegate / undelegate / redelegate).

use casper_rust_wasm_sdk::types::public_key::PublicKey;
use casper_rust_wasm_sdk::types::transaction_params::transaction_builder_params::TransactionBuilderParams;
use rmcp::model::CallToolResult;

use crate::format;
use crate::sdk_handle;
use crate::tools::params::parse_transaction_str_params;
use crate::tools::transaction::serialize_transaction;

pub fn tool_names() -> &'static [&'static str] {
    &[
        "sdk_make_delegate_transaction",
        "sdk_make_undelegate_transaction",
        "sdk_make_redelegate_transaction",
    ]
}

/// Build unsigned delegate transaction.
pub fn make_delegate_transaction(
    delegator: String,
    validator: String,
    amount: String,
    transaction_params_json: String,
) -> CallToolResult {
    make_stake(
        StakeKind::Delegate,
        &delegator,
        &validator,
        None,
        &amount,
        &transaction_params_json,
    )
}

/// Build unsigned undelegate transaction.
pub fn make_undelegate_transaction(
    delegator: String,
    validator: String,
    amount: String,
    transaction_params_json: String,
) -> CallToolResult {
    make_stake(
        StakeKind::Undelegate,
        &delegator,
        &validator,
        None,
        &amount,
        &transaction_params_json,
    )
}

/// Build unsigned redelegate transaction.
pub fn make_redelegate_transaction(
    delegator: String,
    validator: String,
    new_validator: String,
    amount: String,
    transaction_params_json: String,
) -> CallToolResult {
    make_stake(
        StakeKind::Redelegate,
        &delegator,
        &validator,
        Some(&new_validator),
        &amount,
        &transaction_params_json,
    )
}

enum StakeKind {
    Delegate,
    Undelegate,
    Redelegate,
}

fn make_stake(
    kind: StakeKind,
    delegator: &str,
    validator: &str,
    new_validator: Option<&str>,
    amount: &str,
    transaction_params_json: &str,
) -> CallToolResult {
    let params = match parse_transaction_str_params(transaction_params_json) {
        Ok(p) => p,
        Err(err) => return format::err(err),
    };
    let delegator_pk = match PublicKey::new(delegator) {
        Ok(pk) => pk,
        Err(err) => return format::err(err),
    };
    let validator_pk = match PublicKey::new(validator) {
        Ok(pk) => pk,
        Err(err) => return format::err(err),
    };
    let builder = match kind {
        StakeKind::Delegate => {
            TransactionBuilderParams::new_delegate(delegator_pk, validator_pk, amount)
        }
        StakeKind::Undelegate => {
            TransactionBuilderParams::new_undelegate(delegator_pk, validator_pk, amount)
        }
        StakeKind::Redelegate => {
            let new_v = match new_validator {
                Some(s) => s,
                None => return format::err("new_validator required for redelegate"),
            };
            let new_pk = match PublicKey::new(new_v) {
                Ok(pk) => pk,
                Err(err) => return format::err(err),
            };
            TransactionBuilderParams::new_redelegate(delegator_pk, validator_pk, new_pk, amount)
        }
    };
    let sdk = sdk_handle::sdk_snapshot();
    match sdk.make_transaction(builder, params) {
        Ok(tx) => serialize_transaction(tx),
        Err(err) => format::err(err),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn builds_unsigned_delegate() {
        let delegator = "0107514b42acc9be064bca097321530af97d4bb7f9b965b45efbf73e474df2690f";
        let validator = delegator;
        let params = r#"{"chain_name":"casper-net-1","initiator_addr":"0107514b42acc9be064bca097321530af97d4bb7f9b965b45efbf73e474df2690f","payment_amount":"100000000"}"#;
        let out = make_delegate_transaction(
            delegator.into(),
            validator.into(),
            "1000000000".into(),
            params.into(),
        );
        let text = format!("{out:?}");
        assert_eq!(out.is_error, Some(false), "unexpected tool error: {text}");
        assert!(text.contains("Delegate"), "unexpected tool output: {text}");
    }
}
