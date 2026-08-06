//! CES parser: load contract metadata and decode execution-result transforms.

use super::event::{CESEvent, CESParseResult, EVENT_PREFIX};
use super::schema::{parse_schemas_from_bytes, schemas_to_json, Schemas};
use crate::rpcs::query_global_state::{KeyIdentifierInput, QueryGlobalStateParams};
use crate::types::digest::Digest;
use crate::types::identifier::global_state_identifier::GlobalStateIdentifier;
use crate::SDK;
use casper_types::{
    bytesrepr::{Bytes, FromBytes, ToBytes},
    CLType, CLValue,
};
use serde_json::Value;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
use gloo_utils::format::JsValueSerdeExt;

pub const EVENTS_SCHEMA_NAMED_KEY: &str = "__events_schema";
pub const EVENTS_NAMED_KEY: &str = "__events";

/// Per-contract CES metadata keyed by events uref string.
#[derive(Debug, Clone)]
pub struct ContractMetadata {
    pub schemas: Schemas,
    pub contract_hash: String,
    pub contract_package_hash: Option<String>,
    pub events_schema_uref: String,
    pub events_uref: String,
    /// Raw schema value bytes (hex round-trip for MCP).
    pub schema_bytes: Vec<u8>,
}

/// CES consume parser (ces-js-parser `Parser` parity).
#[derive(Debug, Clone, Default)]
#[wasm_bindgen]
pub struct CESParser {
    contracts_metadata: HashMap<String, ContractMetadata>,
}

#[cfg_attr(target_arch = "wasm32", wasm_bindgen)]
impl CESParser {
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(constructor))]
    pub fn new() -> Self {
        Self {
            contracts_metadata: HashMap::new(),
        }
    }

    /// Number of contracts loaded into this parser.
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "contractCount"))]
    pub fn contract_count(&self) -> usize {
        self.contracts_metadata.len()
    }

    /// JSON schemas for all loaded contracts (keyed by events uref).
    #[cfg_attr(target_arch = "wasm32", wasm_bindgen(js_name = "schemasJson"))]
    pub fn schemas_json(&self) -> Result<String, String> {
        let mut root = serde_json::Map::new();
        for (uref, meta) in &self.contracts_metadata {
            root.insert(
                uref.clone(),
                serde_json::json!({
                    "contractHash": meta.contract_hash,
                    "contractPackageHash": meta.contract_package_hash,
                    "eventsSchemaUref": meta.events_schema_uref,
                    "eventsUref": meta.events_uref,
                    "schemaHex": hex::encode(&meta.schema_bytes),
                    "schemas": schemas_to_json(&meta.schemas),
                }),
            );
        }
        serde_json::to_string(&serde_json::Value::Object(root)).map_err(|e| e.to_string())
    }
}

impl CESParser {
    /// Register metadata built offline (tests / MCP with pre-fetched schema).
    pub fn insert_metadata(&mut self, meta: ContractMetadata) {
        self.contracts_metadata
            .insert(meta.events_uref.clone(), meta);
    }

    /// Fetch CES metadata for `contract_hashes` via `query_global_state`.
    pub async fn create(
        sdk: &SDK,
        contract_hashes: &[String],
        state_root_hash: Option<&str>,
        rpc_address: Option<String>,
    ) -> Result<Self, String> {
        let mut parser = Self::new();
        for hash in contract_hashes {
            let meta =
                Self::fetch_contract_metadata(sdk, hash, state_root_hash, rpc_address.clone())
                    .await?;
            parser.insert_metadata(meta);
        }
        Ok(parser)
    }

    async fn fetch_contract_metadata(
        sdk: &SDK,
        contract_hash: &str,
        state_root_hash: Option<&str>,
        rpc_address: Option<String>,
    ) -> Result<ContractMetadata, String> {
        // NCTL/account named keys often use entity-contract-…; query_global_state
        // expects hash-… (see helpers::contract_hash_key_for_global_state).
        let key = crate::helpers::contract_hash_key_for_global_state(contract_hash);

        let contract_json =
            query_stored_value_json(sdk, &key, &[], state_root_hash, rpc_address.clone()).await?;

        let (events_schema_uref, events_uref, package_hash) =
            extract_ces_named_keys(&contract_json)?;

        let schema_json =
            query_stored_value_json(sdk, &events_schema_uref, &[], state_root_hash, rpc_address)
                .await?;

        let schema_bytes = extract_clvalue_bytes(&schema_json)
            .ok_or_else(|| format!("no CLValue bytes for schema uref {events_schema_uref}"))?;
        let schemas = parse_schemas_from_bytes(&schema_bytes)?;

        let hash_hex = crate::helpers::strip_contract_key_prefix(contract_hash).to_string();

        Ok(ContractMetadata {
            schemas,
            contract_hash: hash_hex,
            contract_package_hash: package_hash,
            events_schema_uref,
            events_uref,
            schema_bytes,
        })
    }

    /// Parse CES events from an execution-result JSON value (effects / transforms).
    pub fn parse_execution_result(
        &self,
        execution_result: &Value,
    ) -> Result<Vec<CESParseResult>, String> {
        let effects = find_effects(execution_result)
            .ok_or_else(|| "execution result has no effects/transforms".to_string())?;

        let mut results = Vec::new();
        for (i, transform) in effects.iter().enumerate() {
            if let Some(parsed) = self.try_parse_transform(transform, i) {
                results.push(parsed);
            }
        }
        Ok(results)
    }

    /// Parse from a raw execution-result JSON string.
    pub fn parse_execution_result_json(
        &self,
        execution_result_json: &str,
    ) -> Result<Vec<CESParseResult>, String> {
        let v: Value = serde_json::from_str(execution_result_json)
            .map_err(|e| format!("invalid execution result JSON: {e}"))?;
        self.parse_execution_result(&v)
    }

    /// Parse CES events from a TransactionProcessed SSE payload JSON object/string.
    pub fn parse_transaction_processed_json(
        &self,
        transaction_processed_json: &str,
    ) -> Result<Vec<CESParseResult>, String> {
        let v: Value = serde_json::from_str(transaction_processed_json)
            .map_err(|e| format!("invalid TransactionProcessed JSON: {e}"))?;
        let er = v
            .get("execution_result")
            .or_else(|| v.get("ExecutionResult"))
            .cloned()
            .ok_or_else(|| "missing execution_result on TransactionProcessed".to_string())?;
        self.parse_execution_result(&er)
    }

    fn try_parse_transform(
        &self,
        transform: &Value,
        transform_idx: usize,
    ) -> Option<CESParseResult> {
        let key = transform.get("key")?.as_str()?;
        if !key.starts_with("dictionary-") {
            return None;
        }

        let write_bytes = extract_write_clvalue_bytes(transform)?;
        let dict = new_dictionary_from_bytes(&write_bytes).ok()?;
        let (event_name, remainder) = parse_event_name_with_remainder(&dict.value).ok()?;

        let mut event = CESEvent {
            name: event_name.clone(),
            contract_hash: None,
            contract_package_hash: None,
            event_id: dict.key.parse().unwrap_or(0),
            transform_idx,
            data_json: "{}".to_string(),
        };

        let Some(meta) = self.contracts_metadata.get(&dict.uref) else {
            return Some(CESParseResult {
                event,
                error: Some("invalid event uref".to_string()),
            });
        };

        event.contract_hash = Some(meta.contract_hash.clone());
        event.contract_package_hash = meta.contract_package_hash.clone();

        let Some(schema) = meta.schemas.get(&event_name) else {
            return Some(CESParseResult {
                event,
                error: Some("event name not in schema".to_string()),
            });
        };

        match parse_event_data_from_bytes(schema, remainder) {
            Ok(data) => {
                event.set_data(data);
                Some(CESParseResult { event, error: None })
            }
            Err(err) => Some(CESParseResult {
                event,
                error: Some(format!("failed to parse event data bytes: {err}")),
            }),
        }
    }
}

struct Dictionary {
    uref: String,
    key: String,
    value: Vec<u8>,
}

fn new_dictionary_from_bytes(data: &[u8]) -> Result<Dictionary, String> {
    // CLValue with type (List<U8> body) then length-prefixed uref bytes + dict key string.
    let (cl_value, rest) =
        CLValue::from_bytes(data).map_err(|e| format!("CLValue from_bytes: {e:?}"))?;

    // casper_types rejects Vec<u8> via into_t; use Bytes then own the payload.
    let list: Bytes = cl_value
        .into_t()
        .map_err(|e| format!("expected List<U8>/Bytes: {e:?}"))?;

    // After the typed CLValue, ces-js reads a u32 length then ByteArray(uref) then String(key).
    let (uref_len, rest) = u32::from_bytes(rest).map_err(|e| format!("uref len: {e:?}"))?;
    let uref_len = uref_len as usize;
    if rest.len() < uref_len {
        return Err("uref bytes truncated".to_string());
    }
    let (uref_bytes, rest) = rest.split_at(uref_len);
    let uref = format!("uref-{}-007", hex::encode(uref_bytes));

    let (dict_key, _rest) =
        String::from_bytes(rest).map_err(|e| format!("dict key string: {e:?}"))?;

    Ok(Dictionary {
        uref,
        key: dict_key,
        value: list.into(),
    })
}

fn parse_event_name_with_remainder(raw: &[u8]) -> Result<(String, &[u8]), String> {
    let (name_with_prefix, remainder) =
        String::from_bytes(raw).map_err(|e| format!("event name: {e:?}"))?;
    if !name_with_prefix.starts_with(EVENT_PREFIX) {
        return Err("no event_ prefix for event".to_string());
    }
    let name = name_with_prefix
        .strip_prefix(EVENT_PREFIX)
        .unwrap_or(&name_with_prefix)
        .to_string();
    Ok((name, remainder))
}

fn parse_event_data_from_bytes(
    schema: &super::schema::Schema,
    mut remainder: &[u8],
) -> Result<Value, String> {
    let mut map = serde_json::Map::new();
    for (field_name, cl_type2) in schema.fields() {
        let (cl_value, rest) = decode_clvalue_by_type(cl_type2.0.clone(), remainder)
            .map_err(|e| format!("field {field_name}: {e}"))?;
        remainder = rest;
        map.insert(field_name.clone(), clvalue_to_json(&cl_value));
    }
    Ok(Value::Object(map))
}

/// Decode a CLValue from typed payload bytes (no type header), returning remainder.
fn decode_clvalue_by_type(cl_type: CLType, bytes: &[u8]) -> Result<(CLValue, &[u8]), String> {
    match cl_type {
        CLType::Bool => {
            let (v, rest) = bool::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::I32 => {
            let (v, rest) = i32::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::I64 => {
            let (v, rest) = i64::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U8 => {
            let (v, rest) = u8::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U32 => {
            let (v, rest) = u32::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U64 => {
            let (v, rest) = u64::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U128 => {
            let (v, rest) = casper_types::U128::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U256 => {
            let (v, rest) = casper_types::U256::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::U512 => {
            let (v, rest) = casper_types::U512::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::String => {
            let (v, rest) = String::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::Unit => {
            let (v, rest) = <()>::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::Key => {
            let (v, rest) = casper_types::Key::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::URef => {
            let (v, rest) = casper_types::URef::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::PublicKey => {
            let (v, rest) =
                casper_types::PublicKey::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        CLType::List(inner) if *inner == CLType::U8 => {
            let (v, rest) = Bytes::from_bytes(bytes).map_err(|e| format!("{e:?}"))?;
            Ok((CLValue::from_t(v).map_err(|e| format!("{e:?}"))?, rest))
        }
        other => {
            if let Ok((v, rest)) = CLValue::from_bytes(bytes) {
                if v.cl_type() == &other || matches!(other, CLType::Any) {
                    return Ok((v, rest));
                }
            }
            Err(format!("unsupported CLType for CES field decode: {other}"))
        }
    }
}

fn clvalue_to_json(v: &CLValue) -> Value {
    serde_json::json!({
        "cl_type": format!("{:?}", v.cl_type()),
        "bytes": hex::encode(v.to_bytes().unwrap_or_default()),
    })
}

fn find_effects(execution_result: &Value) -> Option<&Vec<Value>> {
    // Shapes: { effects: [...] }, { ExecutionResult: { ... } }, Success.effect.transforms, Version2.effects
    if let Some(Value::Array(a)) = execution_result.get("effects") {
        return Some(a);
    }
    if let Some(Value::Array(a)) = execution_result.pointer("/Success/effect/transforms") {
        return Some(a);
    }
    if let Some(Value::Array(a)) = execution_result.pointer("/result/Success/effect/transforms") {
        return Some(a);
    }
    if let Some(Value::Array(a)) = execution_result.pointer("/Version2/effects") {
        return Some(a);
    }
    if let Some(Value::Array(a)) = execution_result.pointer("/execution_result/effects") {
        return Some(a);
    }
    // TransactionProcessed body may nest execution_result
    if let Some(er) = execution_result.get("execution_result") {
        return find_effects(er);
    }
    None
}

fn extract_write_clvalue_bytes(transform: &Value) -> Option<Vec<u8>> {
    // Modern: { transform: { WriteCLValue: { bytes: "…" } } } or kind Write
    let t = transform
        .get("transform")
        .or_else(|| transform.get("kind"))?;
    if let Some(bytes_hex) = t
        .pointer("/WriteCLValue/bytes")
        .or_else(|| t.pointer("/Write/CLValue/bytes"))
        .and_then(|v| v.as_str())
    {
        return hex::decode(bytes_hex).ok();
    }
    // Parsed Any bytes sometimes under WriteCLValue as object with bytes
    if let Some(w) = t.get("WriteCLValue") {
        if let Some(bytes_hex) = w.get("bytes").and_then(|v| v.as_str()) {
            return hex::decode(bytes_hex).ok();
        }
    }
    None
}

fn extract_ces_named_keys(
    contract_json: &Value,
) -> Result<(String, String, Option<String>), String> {
    let named_keys = contract_json
        .pointer("/Contract/named_keys")
        .or_else(|| contract_json.pointer("/contract/named_keys"))
        .or_else(|| contract_json.pointer("/AddressableEntity/named_keys"))
        .or_else(|| contract_json.pointer("/addressable_entity/named_keys"))
        .or_else(|| contract_json.get("named_keys"))
        .and_then(|v| v.as_array())
        .ok_or_else(|| "contract named_keys not found".to_string())?;

    let mut schema_uref = None;
    let mut events_uref = None;
    for nk in named_keys {
        let name = nk.get("name").and_then(|v| v.as_str()).unwrap_or("");
        let key = nk
            .get("key")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "named key missing key".to_string())?;
        if name == EVENTS_SCHEMA_NAMED_KEY {
            schema_uref = Some(key.to_string());
        } else if name == EVENTS_NAMED_KEY {
            events_uref = Some(key.to_string());
        }
    }

    let package = contract_json
        .pointer("/Contract/contract_package_hash")
        .or_else(|| contract_json.pointer("/contract/contract_package_hash"))
        .and_then(|v| v.as_str())
        .map(|s| s.trim_start_matches("hash-").to_string());

    Ok((
        schema_uref.ok_or_else(|| format!("no '{EVENTS_SCHEMA_NAMED_KEY}' uref found"))?,
        events_uref.ok_or_else(|| format!("no '{EVENTS_NAMED_KEY}' uref found"))?,
        package,
    ))
}

fn extract_clvalue_bytes(stored: &Value) -> Option<Vec<u8>> {
    let hex = stored
        .pointer("/CLValue/bytes")
        .or_else(|| stored.pointer("/cl_value/bytes"))
        .or_else(|| stored.get("bytes"))
        .and_then(|v| v.as_str())?;
    hex::decode(hex).ok()
}

async fn query_stored_value_json(
    sdk: &SDK,
    key: &str,
    _path: &[&str],
    state_root_hash: Option<&str>,
    rpc_address: Option<String>,
) -> Result<Value, String> {
    let maybe_gsi = match state_root_hash {
        Some(h) => {
            let digest = Digest::new(h).map_err(|e| format!("invalid state_root_hash: {e}"))?;
            Some(GlobalStateIdentifier::from_state_root_hash(digest))
        }
        None => None,
    };

    let params = QueryGlobalStateParams {
        key: KeyIdentifierInput::String(key.to_string()),
        path: None,
        maybe_global_state_identifier: maybe_gsi,
        state_root_hash: state_root_hash.map(|s| s.to_string()),
        maybe_block_id: None,
        verbosity: None,
        rpc_address,
    };

    let resp = sdk
        .query_global_state(params)
        .await
        .map_err(|e| format!("query_global_state failed: {e}"))?;

    let stored = serde_json::to_value(&resp.result.stored_value)
        .map_err(|e| format!("serialize stored_value: {e}"))?;
    Ok(stored)
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl CESParser {
    #[wasm_bindgen(js_name = "parseExecutionResultJson")]
    pub fn parse_execution_result_json_js(
        &self,
        execution_result_json: &str,
    ) -> Result<JsValue, JsError> {
        let results = self
            .parse_execution_result_json(execution_result_json)
            .map_err(|e| JsError::new(&e))?;
        JsValue::from_serde(&results).map_err(|e| JsError::new(&e.to_string()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::sdk::sse::ces::schema::{Schema, Schemas};
    use casper_types::CLType;
    use std::collections::BTreeMap;

    #[test]
    fn parse_event_name() {
        let mut bytes = Vec::new();
        "event_Transfer"
            .to_string()
            .to_bytes()
            .unwrap()
            .into_iter()
            .for_each(|b| bytes.push(b));
        let (name, _) = parse_event_name_with_remainder(&bytes).unwrap();
        assert_eq!(name, "Transfer");
    }

    #[test]
    fn parse_event_name_rejects_missing_prefix() {
        let bytes = "Transfer".to_string().to_bytes().unwrap();
        let err = parse_event_name_with_remainder(&bytes).unwrap_err();
        assert!(err.contains("event_"));
    }

    #[test]
    fn schemas_roundtrip_empty() {
        let schemas = Schemas(BTreeMap::new());
        let bytes = schemas.to_bytes().unwrap();
        let (decoded, _) = Schemas::from_bytes(&bytes).unwrap();
        assert!(decoded.0.is_empty());
    }

    #[test]
    fn schemas_with_simple_event() {
        let mut map = BTreeMap::new();
        map.insert(
            "Transfer".to_string(),
            Schema(vec![
                ("from".into(), super::super::schema::ClType2(CLType::String)),
                ("amount".into(), super::super::schema::ClType2(CLType::U64)),
            ]),
        );
        let schemas = Schemas(map);
        let bytes = schemas.to_bytes().unwrap();
        let (decoded, _) = Schemas::from_bytes(&bytes).unwrap();
        assert!(decoded.get("Transfer").is_some());
        assert_eq!(decoded.get("Transfer").unwrap().fields().len(), 2);
    }

    #[test]
    fn parser_new_is_empty() {
        let parser = CESParser::new();
        assert_eq!(parser.contract_count(), 0);
    }

    #[test]
    fn parse_execution_result_json_rejects_invalid_json() {
        let parser = CESParser::new();
        assert!(parser.parse_execution_result_json("not-json").is_err());
    }

    #[test]
    fn parse_execution_result_requires_effects() {
        let parser = CESParser::new();
        let err = parser
            .parse_execution_result_json(r#"{"Success":{"cost":"1"}}"#)
            .unwrap_err();
        assert!(err.contains("effects") || err.contains("transforms"));
    }

    #[test]
    fn parse_transaction_processed_requires_execution_result() {
        let parser = CESParser::new();
        let err = parser
            .parse_transaction_processed_json(r#"{"hash":"abc"}"#)
            .unwrap_err();
        assert!(err.contains("execution_result"));
    }

    #[test]
    fn parse_execution_result_skips_non_dictionary_transforms() {
        let parser = CESParser::new();
        let json = r#"{
            "effects": [
                {"key": "account-hash-00", "transform": "Identity"}
            ]
        }"#;
        let events = parser.parse_execution_result_json(json).unwrap();
        assert!(events.is_empty());
    }

    /// Regression: `into_t::<Vec<u8>>` / `Vec::<u8>::from_bytes` hits
    /// `debug_assert` in casper_types (`ensure_efficient_serialization`); use `Bytes`.
    #[test]
    fn dictionary_list_u8_decodes_via_bytes() {
        let payload = b"event_Mint\x01\x02\x03".to_vec();
        let cl = CLValue::from_t(Bytes::from(payload.clone())).unwrap();
        let uref_addr = [0xab_u8; 32];
        let dict_key = "42".to_string();

        let mut wire = cl.to_bytes().unwrap();
        wire.extend((uref_addr.len() as u32).to_bytes().unwrap());
        wire.extend_from_slice(&uref_addr);
        wire.extend(dict_key.to_bytes().unwrap());

        let dict = new_dictionary_from_bytes(&wire).expect("Bytes path must not panic/fail");
        assert_eq!(dict.value, payload);
        assert_eq!(dict.key, dict_key);
        assert!(dict.uref.starts_with("uref-"));
    }

    #[test]
    fn list_u8_field_decodes_via_bytes() {
        let raw = Bytes::from(vec![9_u8, 8, 7]);
        let encoded = raw.to_bytes().unwrap();
        let (cl, rest) =
            decode_clvalue_by_type(CLType::List(Box::new(CLType::U8)), &encoded).unwrap();
        assert!(rest.is_empty());
        let roundtrip: Bytes = cl.into_t().unwrap();
        assert_eq!(roundtrip.as_ref(), raw.as_ref());
    }
}
