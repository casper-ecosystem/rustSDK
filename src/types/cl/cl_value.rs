use crate::types::sdk_error::SdkError;
#[cfg(target_arch = "wasm32")]
use crate::types::{cl::bytes::Bytes, key::Key, public_key::PublicKey, uref::URef};
use casper_types::{
    bytesrepr::{FromBytes, ToBytes},
    CLTyped, CLValue as _CLValue,
};
#[cfg(target_arch = "wasm32")]
use casper_types::{U128, U256, U512};
#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::CLValue`].
///
/// Minimal surface for building [`crate::types::runtime_args::RuntimeArgs`] (#43).
/// Full CLValue / StoredValue graph remains [#27](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/issues/27).
#[wasm_bindgen]
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CLValue(_CLValue);

impl CLValue {
    pub fn from_t<T: CLTyped + ToBytes>(value: T) -> Result<Self, Box<SdkError>> {
        _CLValue::from_t(value)
            .map(CLValue)
            .map_err(|err| Box::new(SdkError::from(err)))
    }

    pub fn inner(&self) -> &_CLValue {
        &self.0
    }
}

#[wasm_bindgen]
impl CLValue {
    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromBool")]
    pub fn from_bool_js(value: bool) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromI32")]
    pub fn from_i32_js(value: i32) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromI64")]
    pub fn from_i64_js(value: i64) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU8")]
    pub fn from_u8_js(value: u8) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU32")]
    pub fn from_u32_js(value: u32) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU64")]
    pub fn from_u64_js(value: u64) -> Result<CLValue, JsError> {
        Self::from_t(value).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU128")]
    pub fn from_u128_js(value: &str) -> Result<CLValue, JsError> {
        let parsed = U128::from_dec_str(value)
            .map_err(|err| JsError::new(&format!("Invalid U128: {err:?}")))?;
        Self::from_t(parsed).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU256")]
    pub fn from_u256_js(value: &str) -> Result<CLValue, JsError> {
        let parsed = U256::from_dec_str(value)
            .map_err(|err| JsError::new(&format!("Invalid U256: {err:?}")))?;
        Self::from_t(parsed).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromU512")]
    pub fn from_u512_js(value: &str) -> Result<CLValue, JsError> {
        let parsed = U512::from_dec_str(value)
            .map_err(|err| JsError::new(&format!("Invalid U512: {err:?}")))?;
        Self::from_t(parsed).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromString")]
    pub fn from_string_js(value: &str) -> Result<CLValue, JsError> {
        Self::from_t(value.to_string()).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromUnit")]
    pub fn from_unit_js() -> Result<CLValue, JsError> {
        Self::from_t(()).map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromKey")]
    pub fn from_key_js(key: &Key) -> Result<CLValue, JsError> {
        Self::from_t(casper_types::Key::from(key.clone()))
            .map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromURef")]
    pub fn from_uref_js(uref: &URef) -> Result<CLValue, JsError> {
        Self::from_t(casper_types::URef::from(uref.clone()))
            .map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromPublicKey")]
    pub fn from_public_key_js(public_key: &PublicKey) -> Result<CLValue, JsError> {
        Self::from_t(casper_types::PublicKey::from(public_key.clone()))
            .map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "fromBytes")]
    pub fn from_bytes_js(bytes: &Bytes) -> Result<CLValue, JsError> {
        Self::from_t(casper_types::bytesrepr::Bytes::from(bytes.clone()))
            .map_err(|err| JsError::new(&err.to_string()))
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<CLValue> for _CLValue {
    fn from(value: CLValue) -> Self {
        value.0
    }
}

impl From<_CLValue> for CLValue {
    fn from(value: _CLValue) -> Self {
        CLValue(value)
    }
}

impl AsRef<_CLValue> for CLValue {
    fn as_ref(&self) -> &_CLValue {
        &self.0
    }
}

impl ToBytes for CLValue {
    fn to_bytes(&self) -> Result<Vec<u8>, casper_types::bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }

    fn write_bytes(&self, writer: &mut Vec<u8>) -> Result<(), casper_types::bytesrepr::Error> {
        self.0.write_bytes(writer)
    }
}

impl FromBytes for CLValue {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), casper_types::bytesrepr::Error> {
        let (value, remainder) = _CLValue::from_bytes(bytes)?;
        Ok((CLValue(value), remainder))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn from_t_round_trips_common_scalars() {
        let value = CLValue::from_t("hello".to_string()).unwrap();
        assert_eq!(value.inner().clone().into_t::<String>().unwrap(), "hello");

        let flag = CLValue::from_t(true).unwrap();
        assert!(flag.inner().clone().into_t::<bool>().unwrap());
    }
}
