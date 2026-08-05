# DEPRECATED for Hub / Cursor. Prefer interchouette/casper-webclient:{dev,latest,$APP_VERSION}
# which embeds the same binary (see docker/Dockerfile.cicd). Kept for local experiments only.
#   docker build -f mcp/Dockerfile -t casper-rust-wasm-sdk-mcp:local .

ARG RUST_IMAGE=rust:slim-bookworm
ARG RUNTIME_IMAGE=debian:bookworm-slim

FROM ${RUST_IMAGE} AS builder

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    pkg-config \
    libssl-dev \
    git \
    binutils \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY mcp ./mcp
COPY tests/integration/rust ./tests/integration/rust

RUN cargo build -p casper-rust-wasm-sdk-mcp --release \
  && strip -s target/release/casper-rust-wasm-sdk-mcp \
  && cp target/release/casper-rust-wasm-sdk-mcp /casper-rust-wasm-sdk-mcp

FROM ${RUNTIME_IMAGE} AS runtime

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /casper-rust-wasm-sdk-mcp /usr/local/bin/casper-rust-wasm-sdk-mcp

ENV CASPER_SDK_MCP_ADDR=0.0.0.0:8790 \
    CASPER_RPC_URL=http://host.docker.internal:11101 \
    CASPER_NODE_URL=host.docker.internal:28101 \
    RUST_LOG=warn \
    SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

EXPOSE 8790

# Default CMD is HTTP (compose). For Cursor stdio, override command to just the binary
# and do NOT set CASPER_SDK_MCP_HTTP (clap would force HTTP and break stdio).
ENTRYPOINT ["casper-rust-wasm-sdk-mcp"]
CMD ["--http", "--listen", "0.0.0.0:8790"]
