import "./styles.css";
import { listen } from "@tauri-apps/api/event";
import { api, type PresetInfo } from "./api";
import logoUrl from "./assets/logo.svg";

type Tab = "keys" | "message" | "compose" | "approvals" | "watch";
type Theme = "dark" | "light";

const THEME_KEY = "casper-signing-desk-theme";
let root: HTMLElement | null = document.querySelector("#app");

/** Start on Message: no keygen prompt on launch. Unlock only when you need to sign. */
let tab: Tab = "message";
let publicKey: string | null = null;
let lastTxJson = "";
/** True when #a-json was edited in the DOM; avoids stale textarea overwriting signed JSON on render. */
let txJsonDirty = false;
let lastHash = "";
let policyPath = "";
let statusText = "";
let statusKind: "ok" | "err" | "" = "";
let busy = false;
let presets: PresetInfo[] = [];
let theme: Theme = "light";

/** Ephemeral form fields — captured before each render so busy UI can re-render safely. */
let msgBody = "";
let msgPk = "";
let msgSig = "";
/** When false, msgPk/msgSig came from Sign and must not be overwritten by stale DOM on render. */
let msgPkSigDirty = false;
let composePreset = "nctl";
let composeKind = "transfer";
let composeRpc = "";
let composeInit = "";
let composeTarget = "";
let composeNewval = "";
let composeAmount = "2500000000";
let composePayment = "100000000";
let composeTtl = "30m";
let approvalsPreset = "nctl";
let approvalsRpc = "";
let approvalsOp = "put_transaction";
let watchPreset = "nctl";
let watchEvents = "";
let watchTimeout = "90000";
let watchRpc = "";

const FALLBACK_PRESETS: PresetInfo[] = [
  {
    id: "nctl",
    rpc: "http://127.0.0.1:11101",
    events: "http://127.0.0.1:18101/events",
    chain_name: "casper-net-1",
  },
];

function readStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(THEME_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return "light";
}

function applyTheme(next: Theme): void {
  theme = next;
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    /* ignore */
  }
}

function toggleTheme(): void {
  applyTheme(theme === "dark" ? "light" : "dark");
  render();
}

function truncate(s: string, n = 22): string {
  if (s.length <= n * 2 + 1) return s;
  return `${s.slice(0, n)}…${s.slice(-n)}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setStatus(text: string, kind: "ok" | "err" | "" = ""): void {
  statusText = text;
  statusKind = kind;
  updateStatusDom();
}

function fieldValue(id: string): string | null {
  const el = document.getElementById(id);
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    return el.value;
  }
  return null;
}

function flushActiveField(): void {
  const el = document.activeElement;
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    if (el.id) syncFormField(el.id, el.value);
  }
}

function setLastTxJson(text: string): void {
  lastTxJson = text;
  txJsonDirty = false;
}

function setMsgSignResult(pk: string, sig: string): void {
  msgPk = pk;
  msgSig = sig;
  msgPkSigDirty = false;
}

/** Read live DOM inputs into module state so render() does not wipe user edits. */
function captureForm(): void {
  flushActiveField();
  const body = fieldValue("msg-body");
  if (body !== null) msgBody = body;
  const pk = fieldValue("msg-pk");
  if (pk !== null && msgPkSigDirty) msgPk = pk;
  const sig = fieldValue("msg-sig");
  if (sig !== null && msgPkSigDirty) msgSig = sig;

  const cPreset = fieldValue("c-preset");
  if (cPreset !== null) composePreset = cPreset;
  const cKind = fieldValue("c-kind");
  if (cKind !== null) composeKind = cKind;
  const cRpc = fieldValue("c-rpc");
  if (cRpc !== null) composeRpc = cRpc;
  const cInit = fieldValue("c-init");
  if (cInit !== null) composeInit = cInit;
  const cTarget = fieldValue("c-target");
  if (cTarget !== null) composeTarget = cTarget;
  const cNewval = fieldValue("c-newval");
  if (cNewval !== null) composeNewval = cNewval;
  const cAmount = fieldValue("c-amount");
  if (cAmount !== null) composeAmount = cAmount;
  const cPayment = fieldValue("c-payment");
  if (cPayment !== null) composePayment = cPayment;
  const cTtl = fieldValue("c-ttl");
  if (cTtl !== null) composeTtl = cTtl;

  const aJson = fieldValue("a-json");
  if (aJson !== null && txJsonDirty) lastTxJson = aJson;
  const aPreset = fieldValue("a-preset");
  if (aPreset !== null) approvalsPreset = aPreset;
  const aRpc = fieldValue("a-rpc");
  if (aRpc !== null) approvalsRpc = aRpc;
  const aOp = fieldValue("a-op");
  if (aOp !== null) approvalsOp = aOp;
  const aPolicy = fieldValue("a-policy");
  if (aPolicy !== null) policyPath = aPolicy;

  const wPreset = fieldValue("w-preset");
  if (wPreset !== null) watchPreset = wPreset;
  const wEvents = fieldValue("w-events");
  if (wEvents !== null) watchEvents = wEvents;
  const wHash = fieldValue("w-hash");
  if (wHash !== null) lastHash = wHash;
  const wTimeout = fieldValue("w-timeout");
  if (wTimeout !== null) watchTimeout = wTimeout;
  const wRpc = fieldValue("w-rpc");
  if (wRpc !== null) watchRpc = wRpc;
}

/** Keep module state aligned with the DOM on every edit (not only on render). */
function syncFormField(id: string, value: string): void {
  switch (id) {
    case "msg-body":
      msgBody = value;
      break;
    case "msg-pk":
      msgPk = value;
      msgPkSigDirty = true;
      break;
    case "msg-sig":
      msgSig = value;
      msgPkSigDirty = true;
      break;
    case "c-preset":
      composePreset = value;
      break;
    case "c-kind":
      composeKind = value;
      break;
    case "c-rpc":
      composeRpc = value;
      break;
    case "c-init":
      composeInit = value;
      break;
    case "c-target":
      composeTarget = value;
      break;
    case "c-newval":
      composeNewval = value;
      break;
    case "c-amount":
      composeAmount = value;
      break;
    case "c-payment":
      composePayment = value;
      break;
    case "c-ttl":
      composeTtl = value;
      break;
    case "a-json":
      lastTxJson = value;
      txJsonDirty = true;
      break;
    case "a-preset":
      approvalsPreset = value;
      break;
    case "a-rpc":
      approvalsRpc = value;
      break;
    case "a-op":
      approvalsOp = value;
      break;
    case "a-policy":
      policyPath = value;
      break;
    case "w-preset":
      watchPreset = value;
      break;
    case "w-events":
      watchEvents = value;
      break;
    case "w-hash":
      lastHash = value;
      break;
    case "w-timeout":
      watchTimeout = value;
      break;
    case "w-rpc":
      watchRpc = value;
      break;
    default:
      break;
  }
}

function onFormEdit(ev: Event): void {
  const el = ev.target;
  if (
    !(el instanceof HTMLInputElement) &&
    !(el instanceof HTMLTextAreaElement) &&
    !(el instanceof HTMLSelectElement)
  ) {
    return;
  }
  if (!el.id) return;
  syncFormField(el.id, el.value);
}

function bindFormEditors(): void {
  document.addEventListener("input", onFormEdit, true);
  document.addEventListener("change", onFormEdit, true);
}

/** Toggle busy/disabled chrome without replacing form fields. */
function applyBusyUi(): void {
  if (!root) return;
  root.querySelector("main")?.classList.toggle("busy", busy);
  const unlocked = Boolean(publicKey);
  root.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((btn) => {
    const action = btn.dataset.action!;
    if (action === "toggle-theme") return;
    if (action === "unload") {
      btn.disabled = !unlocked || busy;
      return;
    }
    if (action === "compose-to-approvals" || action === "save-tx") {
      btn.disabled = !lastTxJson || busy;
      return;
    }
    btn.disabled = busy;
  });
  root.querySelectorAll<HTMLButtonElement>('[data-action="unlock"]').forEach((btn) => {
    btn.disabled = busy;
  });
}

function updateStatusDom(): void {
  if (!root) return;
  let el = root.querySelector<HTMLElement>("#status-out");
  if (!statusText) {
    el?.remove();
    return;
  }
  if (!el) {
    const footer = root.querySelector("footer.note");
    el = document.createElement("div");
    el.id = "status-out";
    el.style.margin = "0 1.25rem 1rem";
    footer?.before(el);
  }
  el.className = `out ${statusKind}`;
  el.textContent = statusText;
}

async function withBusy(fn: () => Promise<void>): Promise<void> {
  if (busy) return;
  captureForm();
  busy = true;
  applyBusyUi();
  try {
    await fn();
  } catch (e) {
    const msg =
      typeof e === "string" ? e : e instanceof Error ? e.message : String(e);
    setStatus(msg, "err");
  } finally {
    busy = false;
    render();
  }
}

/** File dialogs must not freeze the UI: no busy overlay / full re-render before invoke. */
async function withDialog(fn: () => Promise<void>): Promise<void> {
  if (busy) return;
  captureForm();
  busy = true;
  applyBusyUi();
  try {
    await fn();
  } catch (e) {
    const msg =
      typeof e === "string" ? e : e instanceof Error ? e.message : String(e);
    if (msg === "cancelled" || msg.includes("cancelled")) {
      setStatus("Cancelled", "");
    } else {
      setStatus(msg, "err");
    }
  } finally {
    busy = false;
    render();
  }
}

const DIALOG_ACTIONS = new Set([
  "unlock",
  "keygen-ed25519",
  "keygen-secp",
  "open-tx",
  "save-tx",
  "pick-policy",
]);

function presetOptions(selected = "nctl"): string {
  return presets
    .map(
      (p) =>
        `<option value="${p.id}" ${p.id === selected ? "selected" : ""}>${p.id} (${p.chain_name})</option>`,
    )
    .join("");
}

function shell(body: string): string {
  const unlocked = Boolean(publicKey);
  const themeLabel = theme === "dark" ? "Light" : "Dark";
  return `
    <header class="top">
      <div class="brand">
        <img class="brand-logo" src="${logoUrl}" alt="Casper" width="123" height="40" />
        <div class="brand-text">
          <h1>Casper Signing Desk</h1>
          <p>Sign messages and transactions with a local PEM. Compose transfers and stake ops, collect cosigner approvals, then wait for finality.</p>
        </div>
      </div>
      <div class="session">
        <button type="button" class="btn ghost" data-action="toggle-theme" title="Switch theme">${themeLabel}</button>
        <span class="badge ${unlocked ? "on" : ""}"><span class="dot"></span>${unlocked ? "unlocked" : "locked"}</span>
        <code class="pk ${unlocked ? "unlocked" : ""}">${unlocked ? truncate(publicKey!) : "no key in session"}</code>
        <button type="button" class="btn primary" data-action="unlock" ${busy ? "disabled" : ""}>Unlock PEM</button>
        <button type="button" class="btn ghost" data-action="unload" ${unlocked && !busy ? "" : "disabled"}>Unload</button>
      </div>
    </header>
    <nav class="tabs">
      ${(["message", "compose", "approvals", "watch", "keys"] as Tab[])
        .map(
          (id) =>
            `<button type="button" data-tab="${id}" class="${tab === id ? "active" : ""}">${id[0]!.toUpperCase()}${id.slice(1)}</button>`,
        )
        .join("")}
    </nav>
    <main class="${busy ? "busy" : ""}">${body}</main>
    ${statusText ? `<div id="status-out" class="out ${statusKind}" style="margin:0 1.25rem 1rem">${escapeHtml(statusText)}</div>` : ""}
    <footer class="note">Secrets never enter the webview. Put uses fail-closed policy. File menu: Open/Save JSON · Unlock. Transaction path only.</footer>
  `;
}

function viewKeys(): string {
  return shell(`
    <section class="panel">
      <h2>Keys</h2>
      <p class="hint">Optional. Unlock an existing validator or account PEM to sign. Generate only when you need a new key; nothing is created on app start.</p>
      <div class="row">
        <button type="button" class="btn primary" data-action="unlock" ${busy ? "disabled" : ""}>Unlock existing PEM</button>
        <button type="button" class="btn" data-action="keygen-ed25519" ${busy ? "disabled" : ""}>Generate Ed25519…</button>
        <button type="button" class="btn" data-action="keygen-secp" ${busy ? "disabled" : ""}>Generate Secp256k1…</button>
      </div>
    </section>
  `);
}

function viewMessage(): string {
  return shell(`
    <section class="panel">
      <h2>Message sign / verify</h2>
      <p class="hint">casper-sign-verify parity: sign with an unlocked PEM, or verify against a public key hex (01 / 02 prefix). Unlock only when you want to sign.</p>
      <div class="grid two">
        <div class="grid">
          <label class="field"><span>Message</span>
            <textarea id="msg-body" placeholder="email@example.com">${escapeHtml(msgBody)}</textarea>
          </label>
          <div class="row">
            <button type="button" class="btn primary" data-action="msg-sign" ${busy ? "disabled" : ""}>Sign</button>
          </div>
        </div>
        <div class="grid">
          <label class="field"><span>Public key hex</span>
            <input id="msg-pk" placeholder="01…" value="${escapeHtml(msgPk)}" />
          </label>
          <label class="field"><span>Signature hex</span>
            <input id="msg-sig" placeholder="…" value="${escapeHtml(msgSig)}" />
          </label>
          <div class="row">
            <button type="button" class="btn" data-action="msg-verify" ${busy ? "disabled" : ""}>Verify</button>
          </div>
        </div>
      </div>
    </section>
  `);
}

function viewCompose(): string {
  return shell(`
    <section class="panel">
      <h2>Compose transaction</h2>
      <p class="hint">Build unsigned transfer or stake JSON. Sign under Approvals. Transfer target must be a full public key hex (01…/02…, ~66 chars), <code>account-hash-&lt;64 hex&gt;</code>, or <code>uref-…</code> — not a truncated placeholder.</p>
      <div class="grid two">
        <label class="field"><span>Preset</span>
          <select id="c-preset">${presetOptions(composePreset)}</select>
        </label>
        <label class="field"><span>Kind</span>
          <select id="c-kind">
            <option value="transfer" ${composeKind === "transfer" ? "selected" : ""}>Transfer</option>
            <option value="delegate" ${composeKind === "delegate" ? "selected" : ""}>Delegate</option>
            <option value="undelegate" ${composeKind === "undelegate" ? "selected" : ""}>Undelegate</option>
            <option value="redelegate" ${composeKind === "redelegate" ? "selected" : ""}>Redelegate</option>
          </select>
        </label>
        <label class="field"><span>RPC override</span>
          <input id="c-rpc" placeholder="leave empty for preset" value="${escapeHtml(composeRpc)}" />
        </label>
        <label class="field"><span>Initiator public key</span>
          <input id="c-init" value="${escapeHtml(composeInit)}" placeholder="01… (66 hex chars)" />
        </label>
        <label class="field"><span>Target / validator</span>
          <input id="c-target" placeholder="recipient 01… or account-hash-…" value="${escapeHtml(composeTarget)}" />
        </label>
        <label class="field"><span>New validator (redelegate)</span>
          <input id="c-newval" placeholder="01…" value="${escapeHtml(composeNewval)}" />
        </label>
        <label class="field"><span>Amount (motes)</span>
          <input id="c-amount" value="${escapeHtml(composeAmount)}" />
        </label>
        <label class="field"><span>Payment (motes)</span>
          <input id="c-payment" value="${escapeHtml(composePayment)}" />
        </label>
        <label class="field"><span>TTL</span>
          <input id="c-ttl" value="${escapeHtml(composeTtl)}" />
        </label>
      </div>
      <div class="row" style="margin-top:1rem">
        <button type="button" class="btn primary" data-action="compose" ${busy ? "disabled" : ""}>Build unsigned JSON</button>
        <button type="button" class="btn" data-action="compose-to-approvals" ${lastTxJson && !busy ? "" : "disabled"}>Send to Approvals</button>
        <button type="button" class="btn" data-action="save-tx" ${lastTxJson && !busy ? "" : "disabled"}>Save JSON…</button>
      </div>
      <pre class="out" id="c-out">${escapeHtml(lastTxJson)}</pre>
    </section>
  `);
}

function viewApprovals(): string {
  return shell(`
    <section class="panel">
      <h2>Approvals desk</h2>
      <p class="hint">Why load JSON: cosigners pass the same unsigned or partly signed transaction file around. Open it here, add your approval with Unlock PEM, verify, then Save for the next signer or Put when ready. No key is required just to inspect JSON.</p>
      <label class="field"><span>Transaction JSON</span>
        <textarea class="tall" id="a-json" placeholder='{"Version1":…}'>${escapeHtml(lastTxJson)}</textarea>
      </label>
      <div class="grid two" style="margin-top:0.75rem">
        <label class="field"><span>Preset</span>
          <select id="a-preset">${presetOptions(approvalsPreset)}</select>
        </label>
        <label class="field"><span>RPC override</span>
          <input id="a-rpc" placeholder="leave empty for preset" value="${escapeHtml(approvalsRpc)}" />
        </label>
        <label class="field"><span>Put op label</span>
          <select id="a-op">
            <option value="put_transaction" ${approvalsOp === "put_transaction" ? "selected" : ""}>put_transaction</option>
            <option value="transfer" ${approvalsOp === "transfer" ? "selected" : ""}>transfer</option>
            <option value="delegate" ${approvalsOp === "delegate" ? "selected" : ""}>delegate</option>
            <option value="undelegate" ${approvalsOp === "undelegate" ? "selected" : ""}>undelegate</option>
            <option value="redelegate" ${approvalsOp === "redelegate" ? "selected" : ""}>redelegate</option>
          </select>
        </label>
        <label class="field"><span>Policy path</span>
          <input id="a-policy" value="${escapeHtml(policyPath)}" />
        </label>
      </div>
      <div class="row" style="margin-top:0.85rem">
        <button type="button" class="btn" data-action="open-tx" ${busy ? "disabled" : ""}>Open JSON…</button>
        <button type="button" class="btn primary" data-action="a-sign" ${busy ? "disabled" : ""}>Add approval</button>
        <button type="button" class="btn" data-action="a-verify" ${busy ? "disabled" : ""}>Verify</button>
        <button type="button" class="btn" data-action="a-copy" ${busy ? "disabled" : ""}>Copy</button>
        <button type="button" class="btn" data-action="save-tx" ${busy ? "disabled" : ""}>Save JSON…</button>
        <button type="button" class="btn" data-action="pick-policy" ${busy ? "disabled" : ""}>Pick policy…</button>
        <button type="button" class="btn" data-action="a-put" ${busy ? "disabled" : ""}>Put</button>
      </div>
    </section>
  `);
}

function viewWatch(): string {
  return shell(`
    <section class="panel">
      <h2>Watch</h2>
      <p class="hint">Wait for finality on the events stream, or fetch a transaction from RPC.</p>
      <div class="grid two">
        <label class="field"><span>Preset</span>
          <select id="w-preset">${presetOptions(watchPreset)}</select>
        </label>
        <label class="field"><span>Events URL override</span>
          <input id="w-events" placeholder="leave empty for preset" value="${escapeHtml(watchEvents)}" />
        </label>
        <label class="field"><span>Transaction hash</span>
          <input id="w-hash" value="${escapeHtml(lastHash)}" placeholder="…" />
        </label>
        <label class="field"><span>Timeout (ms)</span>
          <input id="w-timeout" value="${escapeHtml(watchTimeout)}" />
        </label>
        <label class="field"><span>RPC override</span>
          <input id="w-rpc" placeholder="leave empty for preset" value="${escapeHtml(watchRpc)}" />
        </label>
      </div>
      <div class="row" style="margin-top:1rem">
        <button type="button" class="btn primary" data-action="w-wait" ${busy ? "disabled" : ""}>Wait transaction</button>
        <button type="button" class="btn" data-action="w-get" ${busy ? "disabled" : ""}>Get transaction</button>
      </div>
    </section>
  `);
}

function render(): void {
  if (!root) return;
  captureForm();
  const body =
    tab === "keys"
      ? viewKeys()
      : tab === "message"
        ? viewMessage()
        : tab === "compose"
          ? viewCompose()
          : tab === "approvals"
            ? viewApprovals()
            : viewWatch();
  root.innerHTML = body;
  bind();
}

function showFatal(text: string): void {
  const html = `<pre class="out err">${escapeHtml(text)}</pre>`;
  if (root) root.innerHTML = html;
  else document.body.insertAdjacentHTML("beforeend", html);
}

function readTxJsonText(): string {
  flushActiveField();
  const raw = fieldValue("a-json") ?? lastTxJson;
  if (!raw.trim()) throw new Error("transaction JSON is empty");
  return raw;
}

function readJsonArea(): unknown {
  const raw = readTxJsonText();
  lastTxJson = raw;
  txJsonDirty = true;
  return JSON.parse(raw);
}

function currentTxText(): string {
  return readTxJsonText();
}

function bind(): void {
  if (!root) return;
  root.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      tab = btn.dataset.tab as Tab;
      statusText = "";
      statusKind = "";
      render();
    });
  });
  root.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => void onAction(btn.dataset.action!));
  });
}

async function onAction(action: string): Promise<void> {
  if (action === "toggle-theme") {
    toggleTheme();
    return;
  }
  captureForm();
  const runner = DIALOG_ACTIONS.has(action) ? withDialog : withBusy;
  await runner(async () => {
    switch (action) {
      case "unlock": {
        publicKey = await api<string>("session_unlock");
        if (!composeInit.trim()) composeInit = publicKey;
        setStatus(`Unlocked ${truncate(publicKey)}`, "ok");
        render();
        break;
      }
      case "unload": {
        await api("session_unload");
        publicKey = null;
        setStatus("Session unloaded", "ok");
        render();
        break;
      }
      case "keygen-ed25519":
      case "keygen-secp": {
        const algo = action === "keygen-secp" ? "secp256k1" : "ed25519";
        const res = await api<{
          public_key: string;
          path: string;
          algorithm: string;
        }>("keygen_and_save", { args: { algo } });
        setStatus(
          `Saved ${res.algorithm} key → ${res.path}\nPublic key: ${res.public_key}`,
          "ok",
        );
        break;
      }
      case "msg-sign": {
        const res = await api<{ public_key: string; signature: string }>(
          "message_sign",
          {
            args: { message: msgBody },
          },
        );
        setMsgSignResult(res.public_key, res.signature);
        setStatus(
          `Signed.\nPublic Key:\n ${res.public_key}\nSignature:\n ${res.signature}`,
          "ok",
        );
        break;
      }
      case "msg-verify": {
        const res = await api<{ verified: boolean }>("message_verify", {
          args: {
            message: msgBody,
            public_key_hex: msgPk,
            signature_hex: msgSig,
          },
        });
        setStatus(
          res.verified ? "Verified!" : "Verification failed!",
          res.verified ? "ok" : "err",
        );
        break;
      }
      case "compose": {
        const preset = composePreset;
        const kind = composeKind;
        const rpc = composeRpc.trim() || null;
        const initiator = composeInit.trim();
        const target = composeTarget.trim();
        const new_validator = composeNewval.trim() || null;
        const amount = composeAmount.trim();
        const payment = composePayment.trim();
        const ttl = composeTtl.trim();
        const tx =
          kind === "transfer"
            ? await api("tx_make_transfer", {
                args: { preset, rpc, initiator, target, amount, payment, ttl },
              })
            : await api("tx_make_stake", {
                args: {
                  kind,
                  preset,
                  rpc,
                  initiator,
                  validator: target,
                  new_validator,
                  amount,
                  payment,
                  ttl,
                },
              });
        setLastTxJson(JSON.stringify(tx, null, 2));
        setStatus("Unsigned transaction built", "ok");
        break;
      }
      case "compose-to-approvals": {
        tab = "approvals";
        statusText = "";
        statusKind = "";
        break;
      }
      case "open-tx": {
        const text = await api<string>("tx_open_json");
        JSON.parse(text);
        setLastTxJson(text);
        tab = "approvals";
        setStatus("Loaded transaction JSON", "ok");
        break;
      }
      case "save-tx": {
        const contents = currentTxText();
        if (!contents.trim()) throw new Error("nothing to save");
        JSON.parse(contents);
        const path = await api<string>("tx_save_json", {
          args: { contents, default_name: "transaction.json" },
        });
        setLastTxJson(contents);
        setStatus(`Saved ${path}`, "ok");
        break;
      }
      case "pick-policy": {
        policyPath = await api<string>("pick_policy_path");
        setStatus(`Policy: ${policyPath}`, "ok");
        break;
      }
      case "a-sign": {
        const transaction_json = readJsonArea();
        const signed = await api("tx_sign_add_approval", {
          args: {
            transaction_json,
            preset: approvalsPreset,
            rpc: approvalsRpc.trim() || null,
          },
        });
        setLastTxJson(JSON.stringify(signed, null, 2));
        setStatus("Approval added", "ok");
        break;
      }
      case "a-verify": {
        const transaction_json = readJsonArea();
        const res = await api<{ verified: boolean; approvals: unknown }>(
          "tx_verify",
          {
            args: { transaction_json },
          },
        );
        setStatus(
          `${res.verified ? "Verified" : "Not verified"}\nApprovals:\n${JSON.stringify(res.approvals, null, 2)}`,
          res.verified ? "ok" : "err",
        );
        break;
      }
      case "a-copy": {
        await navigator.clipboard.writeText(currentTxText());
        setStatus("Copied transaction JSON", "ok");
        break;
      }
      case "a-put": {
        const transaction_json = readJsonArea();
        const res = await api<{
          result: unknown;
          transaction_hash: string | null;
        }>("tx_put", {
          args: {
            transaction_json,
            preset: approvalsPreset,
            rpc: approvalsRpc.trim() || null,
            op: approvalsOp,
            policy_path: policyPath.trim() || null,
          },
        });
        if (res.transaction_hash) lastHash = res.transaction_hash;
        setStatus(
          `Put OK${res.transaction_hash ? `\nHash: ${res.transaction_hash}` : ""}\n${JSON.stringify(res.result, null, 2)}`,
          "ok",
        );
        break;
      }
      case "w-wait": {
        const events_url = watchEvents.trim() || null;
        const hash = lastHash.trim();
        const timeout_ms = Number(watchTimeout.trim() || "90000");
        setStatus("Waiting on events…", "");
        const res = await api("tx_wait", {
          args: {
            preset: watchPreset,
            events_url,
            hash,
            timeout_ms,
          },
        });
        lastHash = hash;
        setStatus(JSON.stringify(res, null, 2), "ok");
        break;
      }
      case "w-get": {
        const hash = lastHash.trim();
        const res = await api("tx_get", {
          args: {
            preset: watchPreset,
            rpc: watchRpc.trim() || null,
            hash,
          },
        });
        lastHash = hash;
        setStatus(JSON.stringify(res, null, 2), "ok");
        break;
      }
      case "about": {
        setStatus(
          "Casper Signing Desk\nNative PEM signing desk over casper-rust-wasm-sdk.\nLocal tool for validators and cosigners.",
          "ok",
        );
        break;
      }
      default:
        break;
    }
  });
}

async function bootAsync(): Promise<void> {
  try {
    const livePresets = await api<PresetInfo[]>("presets");
    if (Array.isArray(livePresets) && livePresets.length > 0) {
      presets = livePresets;
    }
  } catch {
    statusText = "Using fallback presets";
    statusKind = "";
  }

  try {
    policyPath = await api<string>("default_policy");
  } catch {
    policyPath = "";
  }

  try {
    publicKey = await api<string | null>("session_status");
    if (publicKey && !composeInit.trim()) composeInit = publicKey;
  } catch {
    publicKey = null;
  }

  try {
    await listen<{ action: string }>("menu-action", (ev) => {
      const action = ev.payload?.action;
      if (!action) return;
      if (action === "openTx") void onAction("open-tx");
      else if (action === "saveTx") void onAction("save-tx");
      else if (action === "unlock") void onAction("unlock");
      else if (action === "unload") void onAction("unload");
      else if (action === "about") void onAction("about");
    });
  } catch {
    /* menu bridge optional during dev reload */
  }

  render();
}

function startApp(): void {
  root = document.querySelector("#app");
  if (!root) {
    showFatal("Casper Signing Desk: missing #app mount point.");
    return;
  }

  bindFormEditors();
  applyTheme(readStoredTheme());
  if (presets.length === 0) presets = [...FALLBACK_PRESETS];
  render();

  void bootAsync().catch((e) => {
    statusText =
      typeof e === "string" ? e : e instanceof Error ? e.message : String(e);
    statusKind = "err";
    render();
  });
}

startApp();
