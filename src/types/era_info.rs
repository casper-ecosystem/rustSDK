use casper_types::system::auction::EraInfo as _EraInfo;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use gloo_utils::format::JsValueSerdeExt;
use serde::{Deserialize, Serialize};
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

/// Wasm/native wrapper around [`casper_types::EraInfo`].
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[cfg_attr(feature = "js", wasm_bindgen)]
pub struct EraInfo(_EraInfo);

impl EraInfo {
    pub fn inner(&self) -> &_EraInfo {
        &self.0
    }

    pub fn seigniorage_allocation_count(&self) -> usize {
        self.0.seigniorage_allocations().len()
    }
}

#[cfg_attr(feature = "js", wasm_bindgen)]
impl EraInfo {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "seigniorageAllocationCount"))]
    pub fn seigniorage_allocation_count_js(&self) -> usize {
        self.seigniorage_allocation_count()
    }

    #[cfg(all(feature = "js", target_arch = "wasm32"))]
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "toJson"))]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.0).unwrap_or(JsValue::null())
    }
}

impl From<EraInfo> for _EraInfo {
    fn from(value: EraInfo) -> Self {
        value.0
    }
}

impl From<_EraInfo> for EraInfo {
    fn from(value: _EraInfo) -> Self {
        EraInfo(value)
    }
}

impl AsRef<_EraInfo> for EraInfo {
    fn as_ref(&self) -> &_EraInfo {
        &self.0
    }
}
