use casper_types::AccessRights as _AccessRights;
#[cfg(feature = "js")]
use wasm_bindgen::prelude::*;

#[cfg_attr(feature = "js", wasm_bindgen)]
#[derive(Debug, Default)]
pub struct AccessRights(_AccessRights);

#[cfg_attr(feature = "js", wasm_bindgen)]
impl AccessRights {
    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "NONE"))]
    pub fn none() -> u8 {
        _AccessRights::NONE.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "READ"))]
    pub fn read() -> u8 {
        _AccessRights::READ.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "WRITE"))]
    pub fn write() -> u8 {
        _AccessRights::WRITE.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "ADD"))]
    pub fn add() -> u8 {
        _AccessRights::ADD.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "READ_ADD"))]
    pub fn read_add() -> u8 {
        _AccessRights::READ_ADD.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "READ_WRITE"))]
    pub fn read_write() -> u8 {
        _AccessRights::READ_WRITE.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "ADD_WRITE"))]
    pub fn add_write() -> u8 {
        _AccessRights::ADD_WRITE.bits()
    }

    #[cfg_attr(feature = "js", wasm_bindgen(js_name = "READ_ADD_WRITE"))]
    pub fn read_add_write() -> u8 {
        _AccessRights::READ_ADD_WRITE.bits()
    }

    /// Construct from bit flags; `None` if the bits are invalid.
    pub fn try_from_u8(access_rights: u8) -> Option<AccessRights> {
        _AccessRights::from_bits(access_rights).map(AccessRights)
    }

    #[cfg_attr(feature = "js", wasm_bindgen(constructor))]
    #[cfg(feature = "js")]
    pub fn new(access_rights: u8) -> Result<AccessRights, JsError> {
        Self::try_from_u8(access_rights).ok_or_else(|| JsError::new("Invalid URef access rights"))
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    pub fn from_bits(read: bool, write: bool, add: bool) -> Self {
        let mut access_rights = _AccessRights::NONE;
        if read {
            access_rights |= _AccessRights::READ;
        }
        if write {
            access_rights |= _AccessRights::WRITE;
        }
        if add {
            access_rights |= _AccessRights::ADD;
        }
        AccessRights(access_rights)
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    // Utility method to check if the READ flag is set.
    pub fn is_readable(&self) -> bool {
        self.0.is_readable()
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    // Utility method to check if the WRITE flag is set.
    pub fn is_writeable(&self) -> bool {
        self.0.is_writeable()
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    // Utility method to check if the ADD flag is set.
    pub fn is_addable(&self) -> bool {
        self.0.is_addable()
    }

    #[cfg_attr(feature = "js", wasm_bindgen)]
    // Utility method to check if no flags are set.
    pub fn is_none(&self) -> bool {
        self.0.is_none()
    }
}

impl From<AccessRights> for _AccessRights {
    fn from(access_rights: AccessRights) -> Self {
        access_rights.0
    }
}

impl From<_AccessRights> for AccessRights {
    fn from(access_rights: _AccessRights) -> Self {
        AccessRights(access_rights)
    }
}
