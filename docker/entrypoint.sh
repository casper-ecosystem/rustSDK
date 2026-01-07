#!/bin/sh
set -e

# Default to / if BASE_HREF is not set
BASE_HREF=${BASE_HREF:-/}

echo "Entrypoint running. BASE_HREF=$BASE_HREF"

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
cat > "$CONFIG_FILE" <<EOF
window.__APP_CONFIG__ = {
  cors_anywhere_url: '${CORS_ANYWHERE_URL:-}',
  network_rpc_url: '${NETWORK_RPC_URL:-}',
  network_node_url: '${NETWORK_NODE_URL:-}'
};
EOF
echo "Generated runtime config.js"

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

# Execute the original command (serve)
exec "$@"
