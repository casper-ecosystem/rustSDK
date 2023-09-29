#[cfg(target_arch = "wasm32")]
use crate::types::deploy::Deploy;
use crate::types::deploy_hash::DeployHash;
#[cfg(target_arch = "wasm32")]
use crate::{debug::error, types::digest::Digest};
use crate::{types::verbosity::Verbosity, SDK};
use casper_client::{
    get_deploy, rpcs::results::GetDeployResult as _GetDeployResult, Error, JsonRpcId,
    SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define a struct to wrap the GetDeployResult
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetDeployResult(_GetDeployResult);

#[cfg(target_arch = "wasm32")]
impl From<GetDeployResult> for _GetDeployResult {
    fn from(result: GetDeployResult) -> Self {
        result.0
    }
}
#[cfg(target_arch = "wasm32")]
impl From<_GetDeployResult> for GetDeployResult {
    fn from(result: _GetDeployResult) -> Self {
        GetDeployResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetDeployResult {
    #[wasm_bindgen(getter)]
    /// Gets the API version as a JavaScript value.
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    /// Gets the deploy information.
    pub fn deploy(&self) -> Deploy {
        self.0.deploy.clone().into()
    }

    // #[wasm_bindgen(getter)]
    // /// Gets the execution info as a JavaScript value.
    // pub fn execution_info(&self) -> JsValue {
    //     JsValue::from_serde(&self.0.execution_info).unwrap()
    // }

    #[wasm_bindgen(js_name = "toJson")]
    /// Converts the result to a JSON JavaScript value.
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

/// Options for the `get_deploy` method.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getDeployOptions", getter_with_clone)]
pub struct GetDeployOptions {
    pub deploy_hash_as_string: Option<String>,
    pub deploy_hash: Option<DeployHash>,
    pub finalized_approvals: Option<bool>,
    pub node_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    /// Parses deploy options from a JsValue.
    ///
    /// # Arguments
    ///
    /// * `options` - A JsValue containing deploy options to be parsed.
    ///
    /// # Returns
    ///
    /// Parsed deploy options as a `GetDeployOptions` struct.
    #[wasm_bindgen(js_name = "get_deploy_options")]
    pub fn get_deploy_options(&self, options: JsValue) -> GetDeployOptions {
        let options_result = options.into_serde::<GetDeployOptions>();
        match options_result {
            Ok(mut options) => {
                if let Some(finalized_approvals) = options.finalized_approvals {
                    options.finalized_approvals =
                        Some(JsValue::from_bool(finalized_approvals) == JsValue::TRUE);
                }
                options
            }
            Err(err) => {
                error(&format!("Error deserializing options: {:?}", err));
                GetDeployOptions::default()
            }
        }
    }

    /// Retrieves deploy information using the provided options.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetDeployOptions` struct containing retrieval options.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetDeployResult` or an error.
    #[wasm_bindgen(js_name = "get_deploy")]
    pub async fn get_deploy_js_alias(
        &self,
        options: Option<GetDeployOptions>,
    ) -> Result<GetDeployResult, JsError> {
        let GetDeployOptions {
            deploy_hash_as_string,
            deploy_hash,
            finalized_approvals,
            verbosity,
            node_address,
        } = options.unwrap_or_default();

        let err_msg = "Error: Missing deploy hash as string or deploy hash".to_string();
        let deploy_hash = if let Some(deploy_hash_as_string) = deploy_hash_as_string {
            let hash = Digest::new(&deploy_hash_as_string);
            if let Err(err) = hash {
                let err_msg = format!("Failed to parse AccountHash from formatted string: {}", err);
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            let deploy_hash = DeployHash::from_digest(hash.unwrap());
            if deploy_hash.is_err() {
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            deploy_hash.unwrap()
        } else {
            if deploy_hash.is_none() {
                error(&err_msg);
                return Err(JsError::new(&err_msg));
            }
            deploy_hash.unwrap()
        };

        let result = self
            .get_deploy(deploy_hash, finalized_approvals, verbosity, node_address)
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                error(err);
                Err(JsError::new(err))
            }
        }
    }

    /// Retrieves deploy information using the provided options, alias for `get_deploy_js_alias`.
    #[wasm_bindgen(js_name = "info_get_deploy")]
    pub async fn info_get_deploy_js_alias(
        &self,
        options: Option<GetDeployOptions>,
    ) -> Result<GetDeployResult, JsError> {
        self.get_deploy_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves deploy information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `deploy_hash` - The deploy hash.
    /// * `finalized_approvals` - An optional boolean indicating finalized approvals.
    /// * `verbosity` - An optional verbosity level.
    /// * `node_address` - An optional node address.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetDeployResult` or an error.
    pub async fn get_deploy(
        &self,
        deploy_hash: DeployHash,
        finalized_approvals: Option<bool>,
        verbosity: Option<Verbosity>,
        node_address: Option<String>,
    ) -> Result<SuccessResponse<_GetDeployResult>, Error> {
        //log("get_deploy!");
        get_deploy(
            JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
            &self.get_node_address(node_address),
            self.get_verbosity(verbosity).into(),
            deploy_hash.into(),
            finalized_approvals.unwrap_or_default(),
        )
        .await
    }
}
