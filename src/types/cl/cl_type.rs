use std::fmt;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
pub enum CLTypeEnum {
    Bool,
    I32,
    I64,
    U8,
    U32,
    U64,
    U128,
    U256,
    U512,
    Unit,
    String,
    Key,
    URef,
    PublicKey,
    Option,
    List,
    ByteArray,
    Result,
    Map,
    Tuple1,
    Tuple2,
    Tuple3,
    Any,
}

#[derive(Clone, Debug)]
#[wasm_bindgen]
#[allow(dead_code)]
pub struct CLType(CLTypeEnum);

#[wasm_bindgen]
#[allow(non_snake_case)]
impl CLType {
    #[wasm_bindgen(js_name = "Bool")]
    pub fn Bool() -> Self {
        CLType(CLTypeEnum::Bool)
    }

    #[wasm_bindgen(js_name = "I32")]
    pub fn I32() -> Self {
        CLType(CLTypeEnum::I32)
    }

    #[wasm_bindgen(js_name = "I64")]
    pub fn I64() -> Self {
        CLType(CLTypeEnum::I64)
    }

    #[wasm_bindgen(js_name = "U8")]
    pub fn U8() -> Self {
        CLType(CLTypeEnum::U8)
    }

    #[wasm_bindgen(js_name = "U32")]
    pub fn U32() -> Self {
        CLType(CLTypeEnum::U32)
    }

    #[wasm_bindgen(js_name = "U64")]
    pub fn U64() -> Self {
        CLType(CLTypeEnum::U64)
    }

    #[wasm_bindgen(js_name = "U128")]
    pub fn U128() -> Self {
        CLType(CLTypeEnum::U128)
    }

    #[wasm_bindgen(js_name = "U256")]
    pub fn U256() -> Self {
        CLType(CLTypeEnum::U256)
    }

    #[wasm_bindgen(js_name = "U512")]
    pub fn U512() -> Self {
        CLType(CLTypeEnum::U512)
    }

    #[wasm_bindgen(js_name = "Unit")]
    pub fn unit() -> Self {
        CLType(CLTypeEnum::Unit)
    }

    #[wasm_bindgen(js_name = "String")]
    pub fn string() -> Self {
        CLType(CLTypeEnum::String)
    }

    #[wasm_bindgen(js_name = "Key")]
    pub fn key() -> Self {
        CLType(CLTypeEnum::Key)
    }

    #[wasm_bindgen(js_name = "URef")]
    pub fn uref() -> Self {
        CLType(CLTypeEnum::URef)
    }

    #[wasm_bindgen(js_name = "PublicKey")]
    pub fn public_key() -> Self {
        CLType(CLTypeEnum::PublicKey)
    }

    #[wasm_bindgen(js_name = "Option")]
    pub fn option(_inner_type: CLType) -> Self {
        CLType(CLTypeEnum::Option)
    }

    #[wasm_bindgen(js_name = "List")]
    pub fn list(_inner_type: CLType) -> Self {
        CLType(CLTypeEnum::List)
    }

    #[wasm_bindgen(js_name = "ByteArray")]
    pub fn byte_array() -> Self {
        CLType(CLTypeEnum::ByteArray)
    }

    #[wasm_bindgen(js_name = "Result")]
    pub fn result(_inner_type: CLType, _error_type: CLType) -> Self {
        CLType(CLTypeEnum::Result)
    }

    #[wasm_bindgen(js_name = "Map")]
    pub fn map(_key_type: CLType, _value_type: CLType) -> Self {
        CLType(CLTypeEnum::Map)
    }

    #[wasm_bindgen(js_name = "Tuple1")]
    pub fn tuple1(_value_type: CLType) -> Self {
        CLType(CLTypeEnum::Tuple1)
    }

    #[wasm_bindgen(js_name = "Tuple2")]
    pub fn tuple2(_value_type: CLType, _value_type2: CLType) -> Self {
        CLType(CLTypeEnum::Tuple2)
    }

    #[wasm_bindgen(js_name = "Tuple3")]
    pub fn tuple3(_value_type: CLType, _value_type2: CLType, _value_type3: CLType) -> Self {
        CLType(CLTypeEnum::Tuple3)
    }

    #[wasm_bindgen(js_name = "Any")]
    pub fn any() -> Self {
        CLType(CLTypeEnum::Any)
    }

    #[wasm_bindgen(constructor)]
    pub fn new(cl_type: CLTypeEnum) -> Self {
        CLType(cl_type)
    }

    #[cfg(target_arch = "wasm32")]
    #[wasm_bindgen(js_name = "toString")]
    pub fn to_string_js_alias(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for CLType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self.0)
    }
}
