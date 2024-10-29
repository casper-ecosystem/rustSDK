use casper_binary_port::RecordId as _RecordId;
use wasm_bindgen::prelude::*;

use super::sdk_error::SdkError;

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]

pub struct RecordId(_RecordId);

#[wasm_bindgen]
impl RecordId {
    #[wasm_bindgen(constructor)]
    pub fn new_js_alias(value: u16) -> Result<RecordId, JsError> {
        Self::new(value).map_err(|err| JsError::new(&err.to_string()))
    }
}

impl RecordId {
    pub fn new(value: u16) -> Result<RecordId, SdkError> {
        match _RecordId::try_from(value) {
            Ok(record_id) => Ok(RecordId(record_id)),
            Err(err) => Err(SdkError::CustomError {
                context: "Invalid RecordId",
                error: format!("{:?}", err),
            }),
        }
    }

    pub fn value(&self) -> u16 {
        self.0.into()
    }
}

impl From<RecordId> for _RecordId {
    fn from(record_id: RecordId) -> Self {
        record_id.0
    }
}

impl From<_RecordId> for RecordId {
    fn from(record_id: _RecordId) -> Self {
        RecordId(record_id)
    }
}
