//! CES schema decode (`__events_schema`).

use casper_types::{
    bytesrepr::{self, FromBytes, ToBytes},
    CLType, CLTyped,
};
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
#[cfg(all(feature = "js", target_arch = "wasm32"))]
use wasm_bindgen::prelude::*;

const CL_TYPE_TAG_BOOL: u8 = 0;
const CL_TYPE_TAG_I32: u8 = 1;
const CL_TYPE_TAG_I64: u8 = 2;
const CL_TYPE_TAG_U8: u8 = 3;
const CL_TYPE_TAG_U32: u8 = 4;
const CL_TYPE_TAG_U64: u8 = 5;
const CL_TYPE_TAG_U128: u8 = 6;
const CL_TYPE_TAG_U256: u8 = 7;
const CL_TYPE_TAG_U512: u8 = 8;
const CL_TYPE_TAG_UNIT: u8 = 9;
const CL_TYPE_TAG_STRING: u8 = 10;
const CL_TYPE_TAG_KEY: u8 = 11;
const CL_TYPE_TAG_UREF: u8 = 12;
const CL_TYPE_TAG_OPTION: u8 = 13;
const CL_TYPE_TAG_LIST: u8 = 14;
const CL_TYPE_TAG_BYTE_ARRAY: u8 = 15;
const CL_TYPE_TAG_RESULT: u8 = 16;
const CL_TYPE_TAG_MAP: u8 = 17;
const CL_TYPE_TAG_TUPLE1: u8 = 18;
const CL_TYPE_TAG_TUPLE2: u8 = 19;
const CL_TYPE_TAG_TUPLE3: u8 = 20;
const CL_TYPE_TAG_ANY: u8 = 21;
const CL_TYPE_TAG_PUBLIC_KEY: u8 = 22;

fn append_cl_type_bytes(cl_type: &CLType, stream: &mut Vec<u8>) -> Result<(), bytesrepr::Error> {
    match cl_type {
        CLType::Bool => stream.push(CL_TYPE_TAG_BOOL),
        CLType::I32 => stream.push(CL_TYPE_TAG_I32),
        CLType::I64 => stream.push(CL_TYPE_TAG_I64),
        CLType::U8 => stream.push(CL_TYPE_TAG_U8),
        CLType::U32 => stream.push(CL_TYPE_TAG_U32),
        CLType::U64 => stream.push(CL_TYPE_TAG_U64),
        CLType::U128 => stream.push(CL_TYPE_TAG_U128),
        CLType::U256 => stream.push(CL_TYPE_TAG_U256),
        CLType::U512 => stream.push(CL_TYPE_TAG_U512),
        CLType::Unit => stream.push(CL_TYPE_TAG_UNIT),
        CLType::String => stream.push(CL_TYPE_TAG_STRING),
        CLType::Key => stream.push(CL_TYPE_TAG_KEY),
        CLType::URef => stream.push(CL_TYPE_TAG_UREF),
        CLType::PublicKey => stream.push(CL_TYPE_TAG_PUBLIC_KEY),
        CLType::Option(inner) => {
            stream.push(CL_TYPE_TAG_OPTION);
            append_cl_type_bytes(inner, stream)?;
        }
        CLType::List(inner) => {
            stream.push(CL_TYPE_TAG_LIST);
            append_cl_type_bytes(inner, stream)?;
        }
        CLType::ByteArray(len) => {
            stream.push(CL_TYPE_TAG_BYTE_ARRAY);
            stream.append(&mut len.to_bytes()?);
        }
        CLType::Result { ok, err } => {
            stream.push(CL_TYPE_TAG_RESULT);
            append_cl_type_bytes(ok, stream)?;
            append_cl_type_bytes(err, stream)?;
        }
        CLType::Map { key, value } => {
            stream.push(CL_TYPE_TAG_MAP);
            append_cl_type_bytes(key, stream)?;
            append_cl_type_bytes(value, stream)?;
        }
        CLType::Tuple1(arr) => {
            stream.push(CL_TYPE_TAG_TUPLE1);
            append_cl_type_bytes(&arr[0], stream)?;
        }
        CLType::Tuple2(arr) => {
            stream.push(CL_TYPE_TAG_TUPLE2);
            append_cl_type_bytes(&arr[0], stream)?;
            append_cl_type_bytes(&arr[1], stream)?;
        }
        CLType::Tuple3(arr) => {
            stream.push(CL_TYPE_TAG_TUPLE3);
            append_cl_type_bytes(&arr[0], stream)?;
            append_cl_type_bytes(&arr[1], stream)?;
            append_cl_type_bytes(&arr[2], stream)?;
        }
        CLType::Any => stream.push(CL_TYPE_TAG_ANY),
    }
    Ok(())
}

/// Wrapper so [`CLType`] can be stored in CES schemas (emit-side `CLType2` parity).
#[derive(Debug, Clone, PartialEq)]
pub struct ClType2(pub CLType);

impl CLTyped for ClType2 {
    fn cl_type() -> CLType {
        CLType::Any
    }
}

impl ToBytes for ClType2 {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        let mut result = Vec::new();
        append_cl_type_bytes(&self.0, &mut result)?;
        Ok(result)
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }
}

impl FromBytes for ClType2 {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        CLType::from_bytes(bytes).map(|(t, rest)| (ClType2(t), rest))
    }
}

/// One event's field list: `(name, cl_type)`.
#[derive(Debug, Clone, PartialEq, Default)]
pub struct Schema(pub Vec<(String, ClType2)>);

impl Schema {
    pub fn fields(&self) -> &[(String, ClType2)] {
        &self.0
    }
}

impl CLTyped for Schema {
    fn cl_type() -> CLType {
        Vec::<(String, ClType2)>::cl_type()
    }
}

impl ToBytes for Schema {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }
}

impl FromBytes for Schema {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        Vec::<(String, ClType2)>::from_bytes(bytes).map(|(v, rest)| (Schema(v), rest))
    }
}

/// Map of event name → schema.
#[derive(Debug, Clone, PartialEq, Default)]
pub struct Schemas(pub BTreeMap<String, Schema>);

impl Schemas {
    pub fn get(&self, name: &str) -> Option<&Schema> {
        self.0.get(name)
    }

    pub fn event_names(&self) -> Vec<String> {
        self.0.keys().cloned().collect()
    }
}

impl CLTyped for Schemas {
    fn cl_type() -> CLType {
        BTreeMap::<String, Schema>::cl_type()
    }
}

impl ToBytes for Schemas {
    fn to_bytes(&self) -> Result<Vec<u8>, bytesrepr::Error> {
        self.0.to_bytes()
    }

    fn serialized_length(&self) -> usize {
        self.0.serialized_length()
    }
}

impl FromBytes for Schemas {
    fn from_bytes(bytes: &[u8]) -> Result<(Self, &[u8]), bytesrepr::Error> {
        BTreeMap::<String, Schema>::from_bytes(bytes).map(|(m, rest)| (Schemas(m), rest))
    }
}

/// Parse CES schemas from raw `__events_schema` CLValue bytes (value bytes only).
pub fn parse_schemas_from_bytes(raw: &[u8]) -> Result<Schemas, String> {
    let (schemas, _remainder) =
        Schemas::from_bytes(raw).map_err(|e| format!("CES schema decode failed: {e:?}"))?;
    Ok(schemas)
}

/// Parse schemas from hex-encoded bytes.
pub fn parse_schemas_from_hex(hex_str: &str) -> Result<Schemas, String> {
    let raw = hex::decode(hex_str.trim()).map_err(|e| format!("invalid schema hex: {e}"))?;
    parse_schemas_from_bytes(&raw)
}

/// JSON-friendly schema field for wasm / MCP.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[cfg_attr(
    all(feature = "js", target_arch = "wasm32"),
    wasm_bindgen(getter_with_clone)
)]
pub struct SchemaFieldJson {
    pub name: String,
    #[cfg_attr(
        all(feature = "js", target_arch = "wasm32"),
        wasm_bindgen(js_name = "clType")
    )]
    pub cl_type: String,
}

/// Serialize schemas to JSON map `event -> [{name, clType}]`.
pub fn schemas_to_json(schemas: &Schemas) -> serde_json::Value {
    let mut map = serde_json::Map::new();
    for (event, schema) in &schemas.0 {
        let fields: Vec<serde_json::Value> = schema
            .0
            .iter()
            .map(|(n, t)| {
                serde_json::json!({
                    "name": n,
                    "clType": format!("{}", t.0),
                })
            })
            .collect();
        map.insert(event.clone(), serde_json::Value::Array(fields));
    }
    serde_json::Value::Object(map)
}
