const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: '../../../.env' });

const templatePath = './proxy.conf.template.json';
const outputPath = './proxy.conf.json';
const node_address = process.env.NODE_ADDRESS || 'http://localhost:11101';

const template = fs.readFileSync(templatePath, 'utf-8');
const config = template.replace(
  /\$\{NODE_ADDRESS\}/g,
  node_address.replace(/\/rpc$/, ''),
);

fs.writeFileSync(outputPath, config);

console.log(`Proxy configuration generated at ${outputPath}`);
