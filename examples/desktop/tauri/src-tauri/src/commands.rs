//! Tauri invoke commands. Secrets stay in Rust (`Session` / PEM paths).

use crate::message::{sign_message, verify_message};
use crate::policy::WritePolicy;
use crate::presets::Preset;
use crate::state::Session;
use crate::tx::{
    approvals_summary, build_stake, build_transfer, extract_tx_hash, get_tx, load_pem_file,
    put_tx_json, sign_tx_json, verify_tx_json, wait_tx, StakeBuild, TransferBuild, WriteKind,
    DEFAULT_PAYMENT_MOTES, DEFAULT_TTL,
};
use casper_rust_wasm_sdk::helpers::{
    public_key_from_secret_key, secret_key_generate, secret_key_secp256k1_generate,
};
use serde::Deserialize;
use serde_json::Value;
use std::fs;
use std::path::{Path, PathBuf};
use tauri::State;
use tauri_plugin_dialog::{DialogExt, FilePath};
use tokio::sync::oneshot;

async fn pick_file_path(
    app: &tauri::AppHandle,
    title: &str,
    filter_name: &str,
    exts: &[&str],
    start_dir: Option<&PathBuf>,
) -> Result<PathBuf, String> {
    let (tx, rx) = oneshot::channel::<Option<FilePath>>();
    let mut dlg = app.dialog().file();
    dlg = dlg.add_filter(filter_name, exts).set_title(title);
    if let Some(dir) = start_dir {
        dlg = dlg.set_directory(dir);
    }
    dlg.pick_file(move |path| {
        let _ = tx.send(path);
    });
    let file = rx
        .await
        .map_err(|_| "dialog channel closed".to_string())?
        .ok_or_else(|| "cancelled".to_string())?;
    file.into_path().map_err(|e| format!("resolve path: {e}"))
}

async fn save_file_path(
    app: &tauri::AppHandle,
    title: &str,
    filter_name: &str,
    exts: &[&str],
    default_name: &str,
    start_dir: Option<&PathBuf>,
) -> Result<PathBuf, String> {
    let (tx, rx) = oneshot::channel::<Option<FilePath>>();
    let mut dlg = app.dialog().file();
    dlg = dlg
        .add_filter(filter_name, exts)
        .set_file_name(default_name)
        .set_title(title);
    if let Some(dir) = start_dir {
        dlg = dlg.set_directory(dir);
    }
    dlg.save_file(move |path| {
        let _ = tx.send(path);
    });
    let file = rx
        .await
        .map_err(|_| "dialog channel closed".to_string())?
        .ok_or_else(|| "cancelled".to_string())?;
    file.into_path().map_err(|e| format!("resolve path: {e}"))
}

fn resolve_rpc(preset: &str, rpc: Option<&str>) -> String {
    rpc.filter(|s| !s.trim().is_empty())
        .map(|s| s.to_string())
        .unwrap_or_else(|| Preset::from_label(preset).rpc().to_string())
}

fn resolve_events(preset: &str, events: Option<&str>) -> String {
    events
        .filter(|s| !s.trim().is_empty())
        .map(|s| s.to_string())
        .unwrap_or_else(|| Preset::from_label(preset).events().to_string())
}

fn resolve_chain(preset: &str, chain: Option<&str>) -> String {
    chain
        .filter(|s| !s.trim().is_empty())
        .map(|s| s.to_string())
        .unwrap_or_else(|| Preset::from_label(preset).chain_name().to_string())
}

fn default_policy_path() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../policy.sample.json")
}

fn user_home_dir() -> Option<PathBuf> {
    // Unix: $HOME; Windows: USERPROFILE (and other platform fallbacks).
    #[allow(deprecated)]
    {
        std::env::home_dir()
    }
}

fn default_keys_dir() -> Option<PathBuf> {
    let home = user_home_dir()?;
    let dir = home.join(".casper-signing-desk/keys");
    if let Err(e) = fs::create_dir_all(&dir) {
        eprintln!(
            "[signing-desk] keys dir create failed {}: {}",
            dir.display(),
            e
        );
        return None;
    }
    Some(dir)
}

fn workspace_root_guess() -> Option<PathBuf> {
    let p = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../../../../");
    fs::canonicalize(p).ok()
}

/// `Some(true)` if `path` is under `base`, `Some(false)` if definitely outside,
/// `None` if the check could not be performed (caller should refuse).
fn path_is_inside(base: &Path, path: &Path) -> Option<bool> {
    let base = fs::canonicalize(base).ok()?;
    let parent = path.parent().unwrap_or(path);
    let resolved_parent = fs::canonicalize(parent).ok()?;
    Some(resolved_parent.starts_with(&base))
}

#[derive(Debug, Deserialize)]
pub struct KeygenArgs {
    /// `ed25519` or `secp256k1`
    pub algo: String,
}

#[derive(Debug, Deserialize)]
pub struct MessageSignArgs {
    pub message: String,
}

#[derive(Debug, Deserialize)]
pub struct MessageVerifyArgs {
    pub message: String,
    pub signature_hex: String,
    pub public_key_hex: String,
}

#[derive(Debug, Deserialize)]
pub struct ComposeTransferArgs {
    pub preset: String,
    pub rpc: Option<String>,
    pub chain_name: Option<String>,
    pub initiator: String,
    pub target: String,
    pub amount: String,
    pub payment: Option<String>,
    pub ttl: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ComposeStakeArgs {
    pub kind: WriteKind,
    pub preset: String,
    pub rpc: Option<String>,
    pub chain_name: Option<String>,
    pub initiator: String,
    pub validator: String,
    pub new_validator: Option<String>,
    pub amount: String,
    pub payment: Option<String>,
    pub ttl: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct TxJsonArgs {
    pub transaction_json: Value,
    pub rpc: Option<String>,
    pub preset: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct TxPutArgs {
    pub transaction_json: Value,
    pub rpc: Option<String>,
    pub preset: Option<String>,
    pub policy_path: Option<String>,
    pub op: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct TxWaitArgs {
    pub events_url: Option<String>,
    pub preset: Option<String>,
    pub hash: String,
    pub timeout_ms: Option<u64>,
}

#[derive(Debug, Deserialize)]
pub struct TxGetArgs {
    pub rpc: Option<String>,
    pub preset: Option<String>,
    pub hash: String,
}

#[derive(Debug, Deserialize)]
pub struct SaveJsonArgs {
    pub contents: String,
    pub default_name: Option<String>,
}

#[tauri::command]
pub fn session_status(session: State<'_, Session>) -> Option<String> {
    session.public_key()
}

#[tauri::command]
pub fn session_unload(session: State<'_, Session>) -> Result<(), String> {
    session.unload();
    Ok(())
}

#[tauri::command]
pub async fn session_unlock(
    app: tauri::AppHandle,
    session: State<'_, Session>,
) -> Result<String, String> {
    eprintln!("[signing-desk] unlock: opening PEM dialog");
    let start_dir = default_keys_dir();
    let path = pick_file_path(
        &app,
        "Unlock secret key PEM",
        "PEM",
        &["pem"],
        start_dir.as_ref(),
    )
    .await?;
    eprintln!("[signing-desk] unlock: loading {}", path.display());
    let (pem, public_key) = load_pem_file(&path.display().to_string())?;
    session.unlock(pem, public_key.clone());
    eprintln!("[signing-desk] unlock: ok");
    Ok(public_key)
}

#[tauri::command]
pub async fn keygen_and_save(
    app: tauri::AppHandle,
    args: KeygenArgs,
) -> Result<serde_json::Value, String> {
    let algo = args.algo.trim().to_ascii_lowercase();
    let sk = match algo.as_str() {
        "secp256k1" => secret_key_secp256k1_generate().map_err(|e| e.to_string())?,
        "ed25519" | "" => secret_key_generate().map_err(|e| e.to_string())?,
        other => return Err(format!("unknown algo `{other}` (ed25519|secp256k1)")),
    };
    let pem = sk.to_pem().map_err(|e| format!("to_pem: {e:?}"))?;
    let public_key = public_key_from_secret_key(&pem).map_err(|e| e.to_string())?;
    let start_dir = default_keys_dir();
    let path = save_file_path(
        &app,
        "Save new secret key PEM",
        "PEM",
        &["pem"],
        "secret_key.pem",
        start_dir.as_ref(),
    )
    .await?;
    if let Some(root) = workspace_root_guess() {
        match path_is_inside(&root, &path) {
            Some(true) => {
                return Err(format!(
                    "refusing to save PEM inside workspace ({}); choose a path outside the repo to avoid dev auto-restart",
                    root.display()
                ));
            }
            Some(false) => {}
            None => {
                eprintln!(
                    "[signing-desk] warn: cannot verify PEM save path {} is outside workspace {}",
                    path.display(),
                    root.display()
                );
                return Err(format!(
                    "cannot verify save path is outside the workspace ({}); choose a different location",
                    path.display()
                ));
            }
        }
    }
    fs::write(&path, &pem).map_err(|e| format!("write PEM: {e}"))?;
    Ok(serde_json::json!({
        "algorithm": if algo == "secp256k1" { "secp256k1" } else { "ed25519" },
        "public_key": public_key,
        "path": path.display().to_string(),
    }))
}

#[tauri::command]
pub fn message_sign(
    session: State<'_, Session>,
    args: MessageSignArgs,
) -> Result<serde_json::Value, String> {
    session.with_pem(|pem, _pk| {
        let (public_key_hex, signature_hex) = sign_message(pem, &args.message)?;
        Ok(serde_json::json!({
            "public_key": public_key_hex,
            "message": args.message,
            "signature": signature_hex,
        }))
    })
}

#[tauri::command]
pub fn message_verify(args: MessageVerifyArgs) -> Result<serde_json::Value, String> {
    let ok = verify_message(&args.message, &args.signature_hex, &args.public_key_hex)?;
    Ok(serde_json::json!({
        "verified": ok,
        "public_key": args.public_key_hex,
        "message": args.message,
        "signature": args.signature_hex,
    }))
}

#[tauri::command]
pub fn tx_make_transfer(args: ComposeTransferArgs) -> Result<Value, String> {
    let rpc = resolve_rpc(&args.preset, args.rpc.as_deref());
    let chain = resolve_chain(&args.preset, args.chain_name.as_deref());
    let payment = args
        .payment
        .unwrap_or_else(|| DEFAULT_PAYMENT_MOTES.to_string());
    let ttl = args.ttl.unwrap_or_else(|| DEFAULT_TTL.to_string());
    build_transfer(TransferBuild {
        rpc: &rpc,
        chain_name: &chain,
        initiator: &args.initiator,
        target: &args.target,
        amount: &args.amount,
        payment: &payment,
        ttl: &ttl,
    })
}

#[tauri::command]
pub fn tx_make_stake(args: ComposeStakeArgs) -> Result<Value, String> {
    if matches!(args.kind, WriteKind::Transfer) {
        return Err("use tx_make_transfer for transfer".into());
    }
    let rpc = resolve_rpc(&args.preset, args.rpc.as_deref());
    let chain = resolve_chain(&args.preset, args.chain_name.as_deref());
    let payment = args
        .payment
        .unwrap_or_else(|| DEFAULT_PAYMENT_MOTES.to_string());
    let ttl = args.ttl.unwrap_or_else(|| DEFAULT_TTL.to_string());
    build_stake(StakeBuild {
        rpc: &rpc,
        kind: args.kind,
        chain_name: &chain,
        initiator: &args.initiator,
        validator: &args.validator,
        new_validator: args.new_validator.as_deref(),
        amount: &args.amount,
        payment: &payment,
        ttl: &ttl,
    })
}

#[tauri::command]
pub fn tx_sign_add_approval(
    session: State<'_, Session>,
    args: TxJsonArgs,
) -> Result<Value, String> {
    let preset = args.preset.unwrap_or_else(|| "nctl".into());
    let rpc = resolve_rpc(&preset, args.rpc.as_deref());
    session.with_pem(|pem, _pk| sign_tx_json(&rpc, &args.transaction_json, pem))
}

#[tauri::command]
pub fn tx_verify(args: TxJsonArgs) -> Result<serde_json::Value, String> {
    let ok = verify_tx_json(&args.transaction_json)?;
    let approvals = approvals_summary(&args.transaction_json)?;
    Ok(serde_json::json!({
        "verified": ok,
        "approvals": approvals,
    }))
}

#[tauri::command]
pub fn tx_approvals(args: TxJsonArgs) -> Result<Value, String> {
    approvals_summary(&args.transaction_json)
}

#[tauri::command]
pub async fn tx_put(args: TxPutArgs) -> Result<serde_json::Value, String> {
    let preset = args.preset.unwrap_or_else(|| "nctl".into());
    let rpc = resolve_rpc(&preset, args.rpc.as_deref());
    let policy_path = args
        .policy_path
        .map(PathBuf::from)
        .unwrap_or_else(default_policy_path);
    let policy = WritePolicy::load(&policy_path)?;
    let op = args.op.unwrap_or_else(|| "put_transaction".into());
    policy.check_put(&op)?;
    let result = put_tx_json(&rpc, &args.transaction_json).await?;
    let hash = extract_tx_hash(&result);
    Ok(serde_json::json!({
        "result": result,
        "transaction_hash": hash,
    }))
}

#[tauri::command]
pub async fn tx_wait(args: TxWaitArgs) -> Result<Value, String> {
    let preset = args.preset.unwrap_or_else(|| "nctl".into());
    let events = resolve_events(&preset, args.events_url.as_deref());
    wait_tx(&events, &args.hash, args.timeout_ms).await
}

#[tauri::command]
pub async fn tx_get(args: TxGetArgs) -> Result<Value, String> {
    let preset = args.preset.unwrap_or_else(|| "nctl".into());
    let rpc = resolve_rpc(&preset, args.rpc.as_deref());
    get_tx(&rpc, &args.hash).await
}

#[tauri::command]
pub fn presets() -> serde_json::Value {
    serde_json::json!([
        {
            "id": "nctl",
            "rpc": Preset::Nctl.rpc(),
            "events": Preset::Nctl.events(),
            "chain_name": Preset::Nctl.chain_name(),
        },
        {
            "id": "testnet",
            "rpc": Preset::Testnet.rpc(),
            "events": Preset::Testnet.events(),
            "chain_name": Preset::Testnet.chain_name(),
        },
        {
            "id": "mainnet",
            "rpc": Preset::Mainnet.rpc(),
            "events": Preset::Mainnet.events(),
            "chain_name": Preset::Mainnet.chain_name(),
        },
    ])
}

#[tauri::command]
pub async fn tx_open_json(app: tauri::AppHandle) -> Result<String, String> {
    let path = pick_file_path(&app, "Open transaction JSON", "JSON", &["json"], None).await?;
    fs::read_to_string(&path).map_err(|e| format!("read {}: {e}", path.display()))
}

#[tauri::command]
pub async fn tx_save_json(app: tauri::AppHandle, args: SaveJsonArgs) -> Result<String, String> {
    let name = args
        .default_name
        .unwrap_or_else(|| "transaction.json".into());
    let path = save_file_path(
        &app,
        "Save transaction JSON",
        "JSON",
        &["json"],
        &name,
        None,
    )
    .await?;
    fs::write(&path, args.contents.as_bytes()).map_err(|e| format!("write: {e}"))?;
    Ok(path.display().to_string())
}

#[tauri::command]
pub async fn pick_policy_path(app: tauri::AppHandle) -> Result<String, String> {
    let path = pick_file_path(&app, "Choose write policy JSON", "JSON", &["json"], None).await?;
    let _ = WritePolicy::load(&path)?;
    Ok(path.display().to_string())
}

#[tauri::command]
pub fn default_policy() -> String {
    default_policy_path().display().to_string()
}
