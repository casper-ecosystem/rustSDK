#[cfg(target_arch = "wasm32")]
use crate::types::identifier::block_identifier::BlockIdentifier;
use crate::{
    types::{
        identifier::{block_identifier::BlockIdentifierInput, entity_identifier::EntityIdentifier},
        sdk_error::SdkError,
        verbosity::Verbosity,
    },
    SDK,
};
use casper_client::{
    cli::{get_entity as get_entity_cli, parse::entity_identifier as parse_entity_identifier},
    get_entity as get_entity_lib,
    rpcs::results::GetAddressableEntityResult as _GetAddressableEntityResult,
    JsonRpcId, SuccessResponse,
};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use rand::Rng;
#[cfg(target_arch = "wasm32")]
use serde::{Deserialize, Serialize};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;

// Define the GetAddressableEntityResult struct to wrap the result from Casper Client RPC call
#[cfg(target_arch = "wasm32")]
#[derive(Debug, Deserialize, Clone, Serialize)]
#[wasm_bindgen]
pub struct GetAddressableEntityResult(_GetAddressableEntityResult);

// Implement conversions between GetAddressableEntityResult and _GetAddressableEntityResult
#[cfg(target_arch = "wasm32")]
impl From<GetAddressableEntityResult> for _GetAddressableEntityResult {
    fn from(result: GetAddressableEntityResult) -> Self {
        result.0
    }
}

#[cfg(target_arch = "wasm32")]
impl From<_GetAddressableEntityResult> for GetAddressableEntityResult {
    fn from(result: _GetAddressableEntityResult) -> Self {
        GetAddressableEntityResult(result)
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl GetAddressableEntityResult {
    // Define getters for various fields of GetAddressableEntityResult
    #[wasm_bindgen(getter)]
    pub fn api_version(&self) -> JsValue {
        JsValue::from_serde(&self.0.api_version).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn entity_result(&self) -> JsValue {
        JsValue::from_serde(&self.0.entity_result).unwrap()
    }

    #[wasm_bindgen(getter)]
    pub fn merkle_proof(&self) -> String {
        self.0.merkle_proof.clone()
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

// Define options for the `get_entity` function
#[derive(Debug, Deserialize, Clone, Default, Serialize)]
#[cfg(target_arch = "wasm32")]
#[wasm_bindgen(js_name = "getEntityOptions", getter_with_clone)]
pub struct GetEntityOptions {
    pub entity_identifier: Option<EntityIdentifier>,
    pub entity_identifier_as_string: Option<String>,
    pub maybe_block_id_as_string: Option<String>,
    pub maybe_block_identifier: Option<BlockIdentifier>,
    pub rpc_address: Option<String>,
    pub verbosity: Option<Verbosity>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl SDK {
    // Deserialize options for `get_entity` from a JavaScript object
    pub fn get_entity_options(&self, options: JsValue) -> Result<GetEntityOptions, JsError> {
        options
            .into_serde::<GetEntityOptions>()
            .map_err(|err| JsError::new(&format!("Error deserializing options: {:?}", err)))
    }

    /// Retrieves entity information using the provided options.
    ///
    /// This function is an asynchronous JavaScript binding for the Rust `get_entity` method.
    ///
    /// # Arguments
    ///
    /// * `options` - An optional `GetEntityOptions` struct containing retrieval options, such as:
    ///   - `entity_identifier`: Identifier for the entity.
    ///   - `entity_identifier_as_string`: String representation of the entity identifier.
    ///   - `maybe_block_id_as_string`: Optional string representation of the block ID.
    ///   - `maybe_block_identifier`: Optional `BlockIdentifierInput` for specifying the block.
    ///   - `verbosity`: Verbosity level for the output.
    ///   - `rpc_address`: Address of the node to query.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `GetAddressableEntityResult` on success or a `JsError` on failure.
    ///
    /// # Errors
    ///
    /// Returns a `JsError` if there is an error during the retrieval process, such as issues with the provided options or network errors.
    /// ```
    #[wasm_bindgen(js_name = "get_entity")]
    pub async fn get_entity_js_alias(
        &self,
        options: Option<GetEntityOptions>,
    ) -> Result<GetAddressableEntityResult, JsError> {
        let GetEntityOptions {
            entity_identifier,
            entity_identifier_as_string,
            maybe_block_id_as_string,
            maybe_block_identifier,
            verbosity,
            rpc_address,
        } = options.unwrap_or_default();

        let maybe_block_identifier = if let Some(maybe_block_identifier) = maybe_block_identifier {
            Some(BlockIdentifierInput::BlockIdentifier(
                maybe_block_identifier,
            ))
        } else {
            maybe_block_id_as_string.map(BlockIdentifierInput::String)
        };

        let result = self
            .get_entity(
                entity_identifier,
                entity_identifier_as_string,
                maybe_block_identifier,
                verbosity,
                rpc_address,
            )
            .await;
        match result {
            Ok(data) => Ok(data.result.into()),
            Err(err) => {
                let err = &format!("Error occurred with {:?}", err);
                Err(JsError::new(err))
            }
        }
    }

    // JavaScript alias for `get_entity`
    #[wasm_bindgen(js_name = "state_get_entity")]
    pub async fn state_get_entity(
        &self,
        options: Option<GetEntityOptions>,
    ) -> Result<GetAddressableEntityResult, JsError> {
        self.get_entity_js_alias(options).await
    }
}

impl SDK {
    /// Retrieves account information based on the provided options.
    ///
    /// # Arguments
    ///
    /// * `entity_identifier` - An optional `EntityIdentifier` for specifying the entity identifier.
    /// * `entity_identifier_as_string` - An optional string representing the entity identifier.
    /// * `maybe_block_identifier` - An optional `BlockIdentifierInput` for specifying a block identifier.
    /// * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
    /// * `rpc_address` - An optional string specifying the rpc address to use for the request.
    ///
    /// # Returns
    ///
    /// A `Result` containing either a `SuccessResponse<_GetAddressableEntityResult>` or a `SdkError` in case of an error.
    ///
    /// # Errors
    ///
    /// Returns a `SdkError` if there is an error during the retrieval process.
    pub async fn get_entity(
        &self,
        entity_identifier: Option<EntityIdentifier>,
        entity_identifier_as_string: Option<String>,
        maybe_block_identifier: Option<BlockIdentifierInput>,
        verbosity: Option<Verbosity>,
        rpc_address: Option<String>,
    ) -> Result<SuccessResponse<_GetAddressableEntityResult>, SdkError> {
        let entity_identifier = if let Some(entity_identifier) = entity_identifier {
            entity_identifier
        } else if let Some(entity_identifier_as_string) = entity_identifier_as_string.clone() {
            match parse_entity_identifier(&entity_identifier_as_string) {
                Ok(parsed) => parsed.into(),
                Err(err) => {
                    return Err(err.into());
                }
            }
        } else {
            let err = "Error: Missing entity identifier".to_string();
            return Err(SdkError::InvalidArgument {
                context: "get_entity",
                error: err,
            });
        };
        if let Some(BlockIdentifierInput::String(maybe_block_id)) = maybe_block_identifier {
            get_entity_cli(
                &rand::thread_rng().gen::<i64>().to_string(),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                &maybe_block_id,
                &entity_identifier.to_string(),
            )
            .await
            .map_err(SdkError::from)
        } else {
            let maybe_block_identifier =
                if let Some(BlockIdentifierInput::BlockIdentifier(maybe_block_identifier)) =
                    maybe_block_identifier
                {
                    Some(maybe_block_identifier)
                } else {
                    None
                };
            get_entity_lib(
                JsonRpcId::from(rand::thread_rng().gen::<i64>().to_string()),
                &self.get_rpc_address(rpc_address),
                self.get_verbosity(verbosity).into(),
                maybe_block_identifier.map(Into::into),
                entity_identifier.into(),
            )
            .await
            .map_err(SdkError::from)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{
        helpers::public_key_from_secret_key,
        types::{identifier::block_identifier::BlockIdentifier, public_key::PublicKey},
    };
    use sdk_tests::tests::helpers::{
        get_enable_addressable_entity, get_network_constants, get_user_secret_key,
    };

    fn get_entity_identifier() -> EntityIdentifier {
        let secret_key = get_user_secret_key(None).unwrap();
        let account = public_key_from_secret_key(&secret_key).unwrap();
        let public_key = PublicKey::new(&account).unwrap();

        EntityIdentifier::from_entity_under_public_key(public_key)
    }

    #[tokio::test]
    async fn test_get_entity_with_none_values() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "builder error";
        let entity_identifier = get_entity_identifier();

        // Act
        let result = sdk
            .get_entity(Some(entity_identifier), None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_entity_with_missing_entity() {
        // Arrange
        let sdk = SDK::new(None, None, None);
        let error_message = "Error: Missing entity identifier";

        // Act
        let result = sdk.get_entity(None, None, None, None, None).await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }

    #[tokio::test]
    async fn test_get_entity_with_entity_identifier() {
        if !get_enable_addressable_entity() {
            return;
        }
        // Arrange
        let sdk = SDK::new(None, None, None);
        let entity_identifier = get_entity_identifier();
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_entity(
                Some(entity_identifier),
                None,
                None,
                verbosity,
                Some(rpc_address),
            )
            .await;
        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_entity_with_entity_identifier_as_string() {
        if !get_enable_addressable_entity() {
            return;
        }
        // Arrange
        let sdk = SDK::new(None, None, None);
        let entity_identifier_as_string = get_entity_identifier().to_string();
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_entity(
                None,
                Some(entity_identifier_as_string),
                None,
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_entity_with_block_identifier() {
        if !get_enable_addressable_entity() {
            return;
        }
        // Arrange
        let sdk = SDK::new(None, None, None);
        let block_identifier =
            BlockIdentifierInput::BlockIdentifier(BlockIdentifier::from_height(1));
        let entity_identifier = get_entity_identifier();
        let verbosity = Some(Verbosity::High);
        let (rpc_address, _, _, _, _) = get_network_constants();

        // Act
        let result = sdk
            .get_entity(
                Some(entity_identifier),
                None,
                Some(block_identifier),
                verbosity,
                Some(rpc_address),
            )
            .await;

        // Assert
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_get_entity_with_error() {
        // Arrange
        let sdk = SDK::new(Some("http://localhost".to_string()), None, None);
        let entity_identifier = get_entity_identifier();
        let error_message = "error sending request for url (http://localhost/rpc)";

        // Act
        let result = sdk
            .get_entity(Some(entity_identifier), None, None, None, None)
            .await;

        // Assert
        assert!(result.is_err());
        let err_string = result.err().unwrap().to_string();
        assert!(err_string.contains(error_message));
    }
}
