const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

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
