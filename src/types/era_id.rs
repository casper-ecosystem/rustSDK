use casper_types::EraId as _EraId;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Default, Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord)]

pub struct EraId(_EraId);

#[wasm_bindgen]
impl EraId {
    #[wasm_bindgen(constructor)]
    pub fn new(value: u64) -> EraId {
        EraId(value.into())
    }

    pub fn value(&self) -> u64 {
        self.0.into()
    }
}

impl From<EraId> for _EraId {
    fn from(era_id: EraId) -> Self {
        era_id.0
    }
}

impl From<_EraId> for EraId {
    fn from(era_id: _EraId) -> Self {
        EraId(era_id)
    }
}
