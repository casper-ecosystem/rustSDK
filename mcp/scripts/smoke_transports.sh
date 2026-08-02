#!/usr/bin/env bash
# Smoke both Cursor transports against a live NCTL (or CASPER_RPC_URL).
# Usage: make mcp-smoke   # or: ./mcp/scripts/smoke_transports.sh
set -euo pipefail

RPC_URL="${CASPER_RPC_URL:-http://127.0.0.1:11101}"
HTTP_URL="${CASPER_SDK_MCP_HTTP_URL:-http://127.0.0.1:8790/mcp}"
IMAGE="${CASPER_SDK_MCP_IMAGE:-casper-rust-wasm-sdk-mcp:2.2.2}"
PASS=0
FAIL=0
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

ok() { echo "  OK  $*"; PASS=$((PASS + 1)); }
bad() { echo "  FAIL $*"; FAIL=$((FAIL + 1)); }

need() {
  if ! command -v "$1" >/dev/null; then
    echo "missing dependency: $1" >&2
    exit 1
  fi
}
need curl
need docker
need python3

echo "== probe NCTL RPC ($RPC_URL) =="
probe_rpc() {
  local base="$1"
  curl -s -m 3 -o "$TMP/nctl.json" -w '%{http_code}' \
    -H 'Content-Type: application/json' \
    -d '{"jsonrpc":"2.0","id":1,"method":"info_get_status","params":{}}' \
    "$base"
}
CODE=$(probe_rpc "${RPC_URL%/}/rpc" || true)
if [[ "$CODE" != "200" ]]; then
  CODE=$(probe_rpc "$RPC_URL" || true)
fi
if [[ "$CODE" == "200" ]]; then
  ok "NCTL reachable"
else
  bad "NCTL not reachable at $RPC_URL (start NCTL first)"
  echo "PASS=$PASS FAIL=$FAIL"
  exit 1
fi

json_rpc() {
  python3 - "$@" <<'PY'
import json, sys
id_, method = sys.argv[1], sys.argv[2]
params = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {}
msg = {"jsonrpc": "2.0", "method": method, "params": params}
if id_ != "null":
    msg["id"] = int(id_) if id_.isdigit() else id_
sys.stdout.write(json.dumps(msg, separators=(",", ":")))
PY
}

# --- HTTP (Docker compose sidecar) ---
echo "== HTTP transport ($HTTP_URL) =="
json_rpc 1 initialize '{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke-transports","version":"0"}}' \
  >"$TMP/init.json"

CODE=$(curl -s -D "$TMP/hdrs" -o "$TMP/init.out" -m 8 -w '%{http_code}' \
  -H 'Accept: application/json, text/event-stream' \
  -H 'Content-Type: application/json' \
  --data-binary @"$TMP/init.json" \
  "$HTTP_URL" || echo 000)
if [[ "$CODE" == "200" ]] && grep -q 'casper-rust-wasm-sdk' "$TMP/init.out"; then
  ok "initialize"
else
  bad "initialize (HTTP $CODE) — run: make mcp-http"
  echo "PASS=$PASS FAIL=$FAIL"
  exit 1
fi

SESSION=$(grep -i '^mcp-session-id:' "$TMP/hdrs" | awk '{print $2}' | tr -d '\r')
if [[ -n "$SESSION" ]]; then
  ok "session $SESSION"
else
  bad "missing mcp-session-id"
fi

json_rpc null notifications/initialized '{}' >"$TMP/initialized.json"
curl -s -m 5 \
  -H "Mcp-Session-Id: $SESSION" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  --data-binary @"$TMP/initialized.json" \
  "$HTTP_URL" >/dev/null || true

http_call() {
  local id="$1" name="$2"
  json_rpc "$id" tools/call "{\"name\":\"$name\",\"arguments\":{}}" >"$TMP/call.json"
  curl -s -m 25 \
    -H "Mcp-Session-Id: $SESSION" \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json, text/event-stream' \
    --data-binary @"$TMP/call.json" \
    "$HTTP_URL"
}

RESP=$(http_call 2 sdk_help)
if echo "$RESP" | grep -q 'sdk_get_node_status\|helpers\|rpc\|Transports'; then
  ok "tools/call sdk_help"
else
  bad "tools/call sdk_help: ${RESP:0:200}"
fi

RESP=$(http_call 3 sdk_get_node_status)
if echo "$RESP" | grep -q 'api_version\|peers\|chainspec_name\|casper-net'; then
  ok "tools/call sdk_get_node_status"
else
  bad "tools/call sdk_get_node_status: ${RESP:0:240}"
fi

RESP=$(http_call 4 sdk_get_block)
if echo "$RESP" | grep -q 'block\|hash\|header'; then
  ok "tools/call sdk_get_block"
else
  bad "tools/call sdk_get_block: ${RESP:0:240}"
fi

# --- Docker stdio ---
echo "== Docker stdio ($IMAGE) =="
if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  bad "image $IMAGE missing — run: make mcp-docker-build"
else
  {
    json_rpc 1 initialize '{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke-stdio","version":"0"}}'
    printf '\n'
    json_rpc null notifications/initialized '{}'
    printf '\n'
    json_rpc 2 tools/call '{"name":"sdk_help","arguments":{}}'
    printf '\n'
    json_rpc 3 tools/call '{"name":"sdk_get_node_status","arguments":{}}'
    printf '\n'
    sleep 2
  } | timeout 30 docker run --rm -i \
    --add-host host.docker.internal:host-gateway \
    -e "CASPER_RPC_URL=http://host.docker.internal:11101" \
    -e "CASPER_NODE_URL=host.docker.internal:28101" \
    -e RUST_LOG=warn \
    --entrypoint casper-rust-wasm-sdk-mcp \
    "$IMAGE" >"$TMP/stdio.out" 2>"$TMP/stdio.err" || true

  if grep -q 'casper-rust-wasm-sdk' "$TMP/stdio.out"; then
    ok "initialize"
  else
    bad "initialize — $(head -c 160 "$TMP/stdio.err")"
  fi
  if grep -q 'sdk_get_node_status\|helpers\|rpc\|Transports' "$TMP/stdio.out"; then
    ok "tools/call sdk_help"
  else
    bad "tools/call sdk_help — $(head -c 200 "$TMP/stdio.out")"
  fi
  if grep -q 'api_version\|peers\|chainspec_name\|casper-net' "$TMP/stdio.out"; then
    ok "tools/call sdk_get_node_status"
  else
    bad "tools/call sdk_get_node_status — $(head -c 240 "$TMP/stdio.out")"
  fi
fi

echo
echo "PASS=$PASS FAIL=$FAIL"
[[ "$FAIL" -eq 0 ]]
