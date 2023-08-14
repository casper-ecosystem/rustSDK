use crate::{
    js::externs::{error, log},
    sdk::SDK,
    types::{
        deploy_params::{
            deploy_str_params::{deploy_str_params_to_casper_client, DeployStrParams},
            payment_str_params::{payment_str_params_to_casper_client, PaymentStrParams},
            session_str_params::{session_str_params_to_casper_client, SessionStrParams},
        },
        verbosity::Verbosity,
    },
};
use casper_client::cli::make_deploy;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
impl SDK {
    #[wasm_bindgen]
    pub async fn speculative_deploy(
        &mut self,
        maybe_block_id: Option<BlockIdentifier>,
        node_address: &str,
        verbosity: Verbosity,
        deploy_params: DeployStrParams,
        session_params: SessionStrParams,
        payment_params: PaymentStrParams,
    ) -> JsValue {
        log("speculative_deploy!");
        match make_deploy(
            "",
            deploy_str_params_to_casper_client(&deploy_params),
            session_str_params_to_casper_client(&session_params),
            payment_str_params_to_casper_client(&payment_params),
            false,
        ) {
            Ok(deploy) => {
                self.speculative_exec(node_address, maybe_block_id, verbosity, deploy.into())
                    .await
            }
            Err(err) => {
                // Handle the error, log it, and return an error JsValue if desired
                error(&format!("Error during speculative_deploy: {}", err));
                // For example, return an error JsValue:
                JsValue::from_str(&format!("Error: {}", err))
            }
        }
    }
}