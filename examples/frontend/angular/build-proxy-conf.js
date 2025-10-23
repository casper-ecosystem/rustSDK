const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

/**
 * Builds proxy configuration for Angular dev server
 *
 * This script:
 * 1. Reads RPC_ADDRESS from .env file (defaults to http://localhost:11101)
 * 2. Replaces ${RPC_ADDRESS} placeholder in proxy.conf.template.json
 * 3. Generates proxy.conf.json for ng serve
 *
 * The proxy allows Angular dev server to proxy RPC calls to avoid CORS issues
 * when connecting to local NCTL nodes.
 */

const templatePath = './proxy.conf.template.json';
const outputPath = './proxy.conf.json';
const rpc_address = process.env.RPC_ADDRESS || 'http://localhost:11101';

const template = fs.readFileSync(templatePath, 'utf-8');
const config = template.replace(
  /\$\{RPC_ADDRESS\}/g,
  rpc_address.replace(/\/rpc$/, ''),
);

fs.writeFileSync(outputPath, config);

console.log(`Proxy configuration generated at ${outputPath}`);
console.log(`Using RPC address: ${rpc_address}`);
