#!/usr/bin/env node
/**
 * SPA host + optional MCP proxy.
 * Serves /app/dist on PORT (default 8080).
 * When ENABLE_MCP_PROXY=1, proxies /mcp → http://127.0.0.1:5790/mcp
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const PORT = Number(process.env.PORT || 8080);
const DIST = process.env.DIST_DIR || '/app/dist';
const MCP_UPSTREAM = process.env.MCP_UPSTREAM || 'http://127.0.0.1:5790';
const ENABLE_MCP_PROXY =
  process.env.ENABLE_MCP_PROXY === '1' ||
  process.env.ENABLE_MCP_PROXY === 'true' ||
  process.env.ENABLE_MCP === '1' ||
  process.env.ENABLE_MCP === 'true';
const DEBUG_MODE =
  process.env.DEBUG_MODE === '1' ||
  process.env.DEBUG_MODE === 'true' ||
  process.env.DEBUG_MODE === 'TRUE';
const PROCESS_STARTED_AT = Date.now();
let firstHitLogged = false;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.map': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function sendFile(res, filePath) {
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    res.writeHead(404);
    res.end('Not found');
  });
  res.writeHead(200, { 'Content-Type': contentType(filePath) });
  stream.pipe(res);
}

function serveStatic(req, res, urlPath) {
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if (rel === '/' || rel === '') rel = '/index.html';
  const filePath = path.normalize(path.join(DIST, rel));
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(filePath, (err, st) => {
    if (!err && st.isFile()) {
      sendFile(res, filePath);
      return;
    }
    // SPA fallback
    sendFile(res, path.join(DIST, 'index.html'));
  });
}

function proxyMcp(req, res) {
  const upstream = new URL(MCP_UPSTREAM);
  const incoming = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  // Preserve /mcp prefix for the MCP server
  const targetPath = incoming.pathname.startsWith('/mcp')
    ? incoming.pathname + incoming.search
    : '/mcp' + incoming.pathname + incoming.search;

  const headers = { ...req.headers, host: upstream.host };
  delete headers['connection'];

  const preq = http.request(
    {
      protocol: upstream.protocol,
      hostname: upstream.hostname,
      port: upstream.port || 80,
      path: targetPath,
      method: req.method,
      headers,
    },
    (pres) => {
      res.writeHead(pres.statusCode || 502, pres.headers);
      pres.pipe(res);
    },
  );
  preq.on('error', (err) => {
    console.error('[serve] MCP proxy error:', err.message);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end('MCP upstream unavailable');
  });
  req.pipe(preq);
}

const server = http.createServer((req, res) => {
  const urlPath = req.url || '/';
  if (DEBUG_MODE && !firstHitLogged) {
    firstHitLogged = true;
    const sinceStartMs = Date.now() - PROCESS_STARTED_AT;
    console.error(
      `[serve] first-hit path=${urlPath.split('?')[0]} since_start_ms=${sinceStartMs}`,
    );
  }
  if (ENABLE_MCP_PROXY && (urlPath === '/mcp' || urlPath.startsWith('/mcp/'))) {
    proxyMcp(req, res);
    return;
  }
  serveStatic(req, res, urlPath);
});

server.listen(PORT, '0.0.0.0', () => {
  console.error(
    `[serve] listening on :${PORT} dist=${DIST} mcp_proxy=${ENABLE_MCP_PROXY ? MCP_UPSTREAM : 'off'} debug_mode=${DEBUG_MODE}`,
  );
  if (DEBUG_MODE) {
    console.error(
      `[serve] up pid=${process.pid} started_at=${new Date(PROCESS_STARTED_AT).toISOString()}`,
    );
  }
});
