#!/bin/sh
set -e

# Default to / if BASE_HREF is not set
BASE_HREF=${BASE_HREF:-/}
APP_VERSION=${APP_VERSION:-unknown}
GIT_SHA=${GIT_SHA:-unknown}
# Short sha for footer display
GIT_SHA_SHORT=$(echo "$GIT_SHA" | cut -c1-7)

ENABLE_MCP=${ENABLE_MCP:-1}
CASPER_SDK_MCP_ADDR=${CASPER_SDK_MCP_ADDR:-127.0.0.1:5790}

echo "Entrypoint running. BASE_HREF=$BASE_HREF APP_VERSION=$APP_VERSION GIT_SHA=$GIT_SHA_SHORT ENABLE_MCP=$ENABLE_MCP"

INDEX_FILE="/app/dist/index.html"
CONFIG_FILE="/app/dist/config.js"

# Ensure BASE_HREF ends with a slash if it's not just "/"
case "$BASE_HREF" in
  /) ;;
  */) ;;
  *) BASE_HREF="${BASE_HREF}/" ;;
esac

# Check if index.html exists
if [ ! -f "$INDEX_FILE" ]; then
  echo "Warning: $INDEX_FILE not found!"
  exit 1
fi

# Generate runtime config.js file
# DEBUG_MODE=1|true enables colored [wc:boot] console timings in the browser.
DEBUG_MODE_FLAG=false
case "${DEBUG_MODE:-}" in
  1|true|TRUE|yes|YES) DEBUG_MODE_FLAG=true ;;
esac

cat > "$CONFIG_FILE" <<EOF
window.__APP_CONFIG__ = {
  cors_anywhere_url: '${CORS_ANYWHERE_URL:-}',
  network_rpc_url: '${NETWORK_RPC_URL:-}',
  network_node_url: '${NETWORK_NODE_URL:-}',
  app_version: '${APP_VERSION}',
  git_sha: '${GIT_SHA_SHORT}',
  debug_mode: ${DEBUG_MODE_FLAG}
};
EOF
echo "Generated runtime config.js (debug_mode=${DEBUG_MODE_FLAG})"

# Inject config.js script tag into index.html if not already present
if ! grep -q '<script src="config.js">' "$INDEX_FILE"; then
  sed -i '/<\/head>/i\
    <script src="config.js"><\/script>' "$INDEX_FILE"
  echo "Added config.js script tag to index.html"
fi

# Check if <base href> tag already exists
if grep -q '<base href' "$INDEX_FILE"; then
  # Replace existing base href tag (handles various formats)
  sed -i -E "s|<base href=\"[^\"]*\"[[:space:]]*/?>|<base href=\"$BASE_HREF\" />|g" "$INDEX_FILE"
  echo "Updated existing <base href> tag to: $BASE_HREF"
else
  # Add base href tag after <head> tag
  # Use sed's append command (a\) for better busybox compatibility
  sed -i "/<head>/a\\
    <base href=\"$BASE_HREF\" />" "$INDEX_FILE"
  echo "Added <base href> tag: $BASE_HREF"
fi

mcp_enabled() {
  [ "$ENABLE_MCP" = "1" ] || [ "$ENABLE_MCP" = "true" ]
}

start_mcp() {
  if ! command -v casper-rust-wasm-sdk-mcp >/dev/null 2>&1; then
    echo "[entrypoint] MCP binary missing; continuing without MCP" >&2
    return 0
  fi
  echo "[entrypoint] starting MCP on ${CASPER_SDK_MCP_ADDR}" >&2
  casper-rust-wasm-sdk-mcp --http --listen "${CASPER_SDK_MCP_ADDR}" &
}

# Optional: MCP-only mode (slim Cursor / stdio-adjacent HTTP)
cmd="${1:-web}"
if [ "$#" -gt 0 ]; then
  shift
fi

case "$cmd" in
  mcp)
    exec casper-rust-wasm-sdk-mcp "$@"
    ;;
  web | serve)
    if mcp_enabled; then
      start_mcp
      export ENABLE_MCP_PROXY=1
      export MCP_UPSTREAM="http://${CASPER_SDK_MCP_ADDR}"
    else
      echo "[entrypoint] ENABLE_MCP=0 — web only" >&2
      export ENABLE_MCP_PROXY=0
    fi
    exec node /app/serve.mjs
    ;;
  *)
    # Back-compat: raw command (e.g. legacy `serve …`)
    exec "$cmd" "$@"
    ;;
esac
