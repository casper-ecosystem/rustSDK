import "./styles.css";
import { listen } from "@tauri-apps/api/event";
import { api, type PresetInfo } from "./api";

type Tab = "keys" | "message" | "compose" | "approvals" | "watch";

const root = document.querySelector("#app")!;

let tab: Tab = "keys";
let publicKey: string | null = null;
let lastTxJson = "";
let lastHash = "";
let policyPath = "";
let statusText = "";
let statusKind: "ok" | "err" | "" = "";
let busy = false;
let presets: PresetInfo[] = [];

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
  render();
}

async function withBusy(fn: () => Promise<void>): Promise<void> {
  if (busy) return;
  busy = true;
  render();
  try {
    await fn();
  } catch (e) {
    const msg = typeof e === "string" ? e : e instanceof Error ? e.message : String(e);
    setStatus(msg, "err");
  } finally {
    busy = false;
    render();
  }
}

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
  return `
    <header class="top">
      <div class="brand">
        <h1>Casper Signing Desk</h1>
        <p>Native PEM · message verify · transfer / stake · multisig · wait</p>
      </div>
      <div class="session">
        <span class="badge ${unlocked ? "on" : ""}"><span class="dot"></span>${unlocked ? "unlocked" : "locked"}</span>
        <code class="pk ${unlocked ? "unlocked" : ""}">${unlocked ? truncate(publicKey!) : "no key in session"}</code>
        <button type="button" class="btn primary" data-action="unlock" ${busy ? "disabled" : ""}>Unlock PEM</button>
        <button type="button" class="btn ghost" data-action="unload" ${unlocked && !busy ? "" : "disabled"}>Unload</button>
      </div>
    </header>
    <nav class="tabs">
      ${(["keys", "message", "compose", "approvals", "watch"] as Tab[])
        .map(
          (id) =>
            `<button type="button" data-tab="${id}" class="${tab === id ? "active" : ""}">${id[0]!.toUpperCase()}${id.slice(1)}</button>`,
        )
        .join("")}
    </nav>
    <main class="${busy ? "busy" : ""}">${body}</main>
    ${statusText ? `<div class="out ${statusKind}" style="margin:0 1.25rem 1rem">${escapeHtml(statusText)}</div>` : ""}
    <footer class="note">Secrets never enter the webview. Put uses fail-closed policy. File menu: Open/Save JSON · Unlock. No Casper Wallet · transaction path only.</footer>
  `;
}

function viewKeys(): string {
  return shell(`
    <section class="panel">
      <h2>Keys</h2>
      <p class="hint">Generate a key and save the PEM via the OS dialog. Rust writes the file; the secret is never shown here. Unlock a PEM into the session to sign.</p>
      <div class="row">
        <button type="button" class="btn primary" data-action="keygen-ed25519" ${busy ? "disabled" : ""}>Generate Ed25519</button>
        <button type="button" class="btn" data-action="keygen-secp" ${busy ? "disabled" : ""}>Generate Secp256k1</button>
      </div>
    </section>
  `);
}

function viewMessage(): string {
  return shell(`
    <section class="panel">
      <h2>Message sign / verify</h2>
      <p class="hint">casper-sign-verify parity: sign with the unlocked PEM, or verify against a public key hex (01 / 02 prefix).</p>
      <div class="grid two">
        <div class="grid">
          <label class="field"><span>Message</span>
            <textarea id="msg-body" placeholder="email@example.com"></textarea>
          </label>
          <div class="row">
            <button type="button" class="btn primary" data-action="msg-sign" ${busy ? "disabled" : ""}>Sign</button>
          </div>
        </div>
        <div class="grid">
          <label class="field"><span>Public key hex</span>
            <input id="msg-pk" placeholder="01…" />
          </label>
          <label class="field"><span>Signature hex</span>
            <input id="msg-sig" placeholder="…" />
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
      <p class="hint">Build unsigned transfer or stake JSON. Sign under Approvals. Override RPC when the preset host is wrong.</p>
      <div class="grid two">
        <label class="field"><span>Preset</span>
          <select id="c-preset">${presetOptions()}</select>
        </label>
        <label class="field"><span>Kind</span>
          <select id="c-kind">
            <option value="transfer">Transfer</option>
            <option value="delegate">Delegate</option>
            <option value="undelegate">Undelegate</option>
            <option value="redelegate">Redelegate</option>
          </select>
        </label>
        <label class="field"><span>RPC override</span>
          <input id="c-rpc" placeholder="leave empty for preset" />
        </label>
        <label class="field"><span>Initiator public key</span>
          <input id="c-init" value="${publicKey ?? ""}" placeholder="01…" />
        </label>
        <label class="field"><span>Target / validator</span>
          <input id="c-target" placeholder="01…" />
        </label>
        <label class="field"><span>New validator (redelegate)</span>
          <input id="c-newval" placeholder="01…" />
        </label>
        <label class="field"><span>Amount (motes)</span>
          <input id="c-amount" value="2500000000" />
        </label>
        <label class="field"><span>Payment (motes)</span>
          <input id="c-payment" value="100000000" />
        </label>
        <label class="field"><span>TTL</span>
          <input id="c-ttl" value="30m" />
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
      <p class="hint">Load JSON (File → Open or button), add an approval with the unlocked PEM, verify, save for the next cosigner, put when policy allows.</p>
      <label class="field"><span>Transaction JSON</span>
        <textarea class="tall" id="a-json" placeholder='{"Version1":…}'>${escapeHtml(lastTxJson)}</textarea>
      </label>
      <div class="grid two" style="margin-top:0.75rem">
        <label class="field"><span>Preset</span>
          <select id="a-preset">${presetOptions()}</select>
        </label>
        <label class="field"><span>RPC override</span>
          <input id="a-rpc" placeholder="leave empty for preset" />
        </label>
        <label class="field"><span>Put op label</span>
          <select id="a-op">
            <option value="put_transaction">put_transaction</option>
            <option value="transfer">transfer</option>
            <option value="delegate">delegate</option>
            <option value="undelegate">undelegate</option>
            <option value="redelegate">redelegate</option>
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
          <select id="w-preset">${presetOptions()}</select>
        </label>
        <label class="field"><span>Events URL override</span>
          <input id="w-events" placeholder="leave empty for preset" />
        </label>
        <label class="field"><span>Transaction hash</span>
          <input id="w-hash" value="${escapeHtml(lastHash)}" placeholder="…" />
        </label>
        <label class="field"><span>Timeout (ms)</span>
          <input id="w-timeout" value="90000" />
        </label>
        <label class="field"><span>RPC override</span>
          <input id="w-rpc" placeholder="leave empty for preset" />
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

function readJsonArea(): unknown {
  const raw = (document.querySelector("#a-json") as HTMLTextAreaElement | null)?.value ?? lastTxJson;
  return JSON.parse(raw);
}

function currentTxText(): string {
  if (tab === "approvals") {
    return (document.querySelector("#a-json") as HTMLTextAreaElement | null)?.value ?? lastTxJson;
  }
  return lastTxJson;
}

function bind(): void {
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
  await withBusy(async () => {
    switch (action) {
      case "unlock": {
        publicKey = await api<string>("session_unlock");
        setStatus(`Unlocked ${truncate(publicKey)}`, "ok");
        break;
      }
      case "unload": {
        await api("session_unload");
        publicKey = null;
        setStatus("Session unloaded", "ok");
        break;
      }
      case "keygen-ed25519":
      case "keygen-secp": {
        const algo = action === "keygen-secp" ? "secp256k1" : "ed25519";
        const res = await api<{ public_key: string; path: string; algorithm: string }>(
          "keygen_and_save",
          { args: { algo } },
        );
        setStatus(
          `Saved ${res.algorithm} key → ${res.path}\nPublic key: ${res.public_key}`,
          "ok",
        );
        break;
      }
      case "msg-sign": {
        const message = (document.querySelector("#msg-body") as HTMLTextAreaElement).value;
        const res = await api<{ public_key: string; signature: string }>("message_sign", {
          args: { message },
        });
        const pkEl = document.querySelector("#msg-pk") as HTMLInputElement | null;
        const sigEl = document.querySelector("#msg-sig") as HTMLInputElement | null;
        if (pkEl) pkEl.value = res.public_key;
        if (sigEl) sigEl.value = res.signature;
        setStatus(`Signed.\nPublic Key:\n ${res.public_key}\nSignature:\n ${res.signature}`, "ok");
        break;
      }
      case "msg-verify": {
        const message = (document.querySelector("#msg-body") as HTMLTextAreaElement).value;
        const public_key_hex = (document.querySelector("#msg-pk") as HTMLInputElement).value;
        const signature_hex = (document.querySelector("#msg-sig") as HTMLInputElement).value;
        const res = await api<{ verified: boolean }>("message_verify", {
          args: { message, public_key_hex, signature_hex },
        });
        setStatus(res.verified ? "Verified!" : "Verification failed!", res.verified ? "ok" : "err");
        break;
      }
      case "compose": {
        const preset = (document.querySelector("#c-preset") as HTMLSelectElement).value;
        const kind = (document.querySelector("#c-kind") as HTMLSelectElement).value;
        const rpc = (document.querySelector("#c-rpc") as HTMLInputElement).value.trim() || null;
        const initiator = (document.querySelector("#c-init") as HTMLInputElement).value.trim();
        const target = (document.querySelector("#c-target") as HTMLInputElement).value.trim();
        const new_validator =
          (document.querySelector("#c-newval") as HTMLInputElement).value.trim() || null;
        const amount = (document.querySelector("#c-amount") as HTMLInputElement).value.trim();
        const payment = (document.querySelector("#c-payment") as HTMLInputElement).value.trim();
        const ttl = (document.querySelector("#c-ttl") as HTMLInputElement).value.trim();
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
        lastTxJson = JSON.stringify(tx, null, 2);
        setStatus("Unsigned transaction built", "ok");
        break;
      }
      case "compose-to-approvals": {
        tab = "approvals";
        statusText = "";
        break;
      }
      case "open-tx": {
        const text = await api<string>("tx_open_json");
        JSON.parse(text);
        lastTxJson = text;
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
        lastTxJson = contents;
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
        const preset = (document.querySelector("#a-preset") as HTMLSelectElement).value;
        const rpc = (document.querySelector("#a-rpc") as HTMLInputElement).value.trim() || null;
        const signed = await api("tx_sign_add_approval", {
          args: { transaction_json, preset, rpc },
        });
        lastTxJson = JSON.stringify(signed, null, 2);
        setStatus("Approval added", "ok");
        break;
      }
      case "a-verify": {
        const transaction_json = readJsonArea();
        const res = await api<{ verified: boolean; approvals: unknown }>("tx_verify", {
          args: { transaction_json },
        });
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
        const preset = (document.querySelector("#a-preset") as HTMLSelectElement).value;
        const rpc = (document.querySelector("#a-rpc") as HTMLInputElement).value.trim() || null;
        const op = (document.querySelector("#a-op") as HTMLSelectElement).value;
        const policy_path =
          (document.querySelector("#a-policy") as HTMLInputElement).value.trim() || null;
        const res = await api<{ result: unknown; transaction_hash: string | null }>("tx_put", {
          args: { transaction_json, preset, rpc, op, policy_path },
        });
        if (res.transaction_hash) lastHash = res.transaction_hash;
        setStatus(
          `Put OK${res.transaction_hash ? `\nHash: ${res.transaction_hash}` : ""}\n${JSON.stringify(res.result, null, 2)}`,
          "ok",
        );
        break;
      }
      case "w-wait": {
        const preset = (document.querySelector("#w-preset") as HTMLSelectElement).value;
        const events_url =
          (document.querySelector("#w-events") as HTMLInputElement).value.trim() || null;
        const hash = (document.querySelector("#w-hash") as HTMLInputElement).value.trim();
        const timeout_ms = Number(
          (document.querySelector("#w-timeout") as HTMLInputElement).value.trim() || "90000",
        );
        setStatus("Waiting on events…", "");
        const res = await api("tx_wait", { args: { preset, events_url, hash, timeout_ms } });
        lastHash = hash;
        setStatus(JSON.stringify(res, null, 2), "ok");
        break;
      }
      case "w-get": {
        const preset = (document.querySelector("#w-preset") as HTMLSelectElement).value;
        const rpc = (document.querySelector("#w-rpc") as HTMLInputElement).value.trim() || null;
        const hash = (document.querySelector("#w-hash") as HTMLInputElement).value.trim();
        const res = await api("tx_get", { args: { preset, rpc, hash } });
        lastHash = hash;
        setStatus(JSON.stringify(res, null, 2), "ok");
        break;
      }
      case "about": {
        setStatus(
          "Casper Signing Desk\nNative PEM signing desk over casper-rust-wasm-sdk.\nNot a custody wallet.",
          "ok",
        );
        break;
      }
      default:
        break;
    }
  });
}

async function boot(): Promise<void> {
  presets = await api<PresetInfo[]>("presets");
  policyPath = await api<string>("default_policy");
  publicKey = await api<string | null>("session_status");
  await listen<{ action: string }>("menu-action", (ev) => {
    const action = ev.payload?.action;
    if (!action) return;
    if (action === "openTx") void onAction("open-tx");
    else if (action === "saveTx") void onAction("save-tx");
    else if (action === "unlock") void onAction("unlock");
    else if (action === "unload") void onAction("unload");
    else if (action === "about") void onAction("about");
  });
  render();
}

boot().catch((e) => {
  root.innerHTML = `<pre class="out err">${escapeHtml(String(e))}</pre>`;
});
