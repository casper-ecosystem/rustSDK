const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });

export const key_name_default = 'secret_key.pem';
export const key_path_default = '../../../../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/';
export const rpc_address_default = 'http://localhost:11101';
export const app_address_default = 'http://localhost:4200';
export const chain_name_default = 'casper-net-1';

// Either use direct env variables for secret keys of casper-node-launcher-js  or key path to NTCL
export const secret_key_user_1 = process.env.SECRET_KEY_USER_1;
export const secret_key_user_2 = process.env.SECRET_KEY_USER_2;

export const key_name = key_name_default;
export const key_path = process.env.SECRET_KEY_NCTL_PATH || key_path_default;
export const rpc_address = process.env.RPC_ADDRESS || rpc_address_default;
export const app_address = process.env.APP_ADDRESS || app_address_default;
export const chain_name = process.env.CHAIN_NAME || chain_name_default;

export const payment_amount = '5500000000';
export const transfer_amount = '2500000000';
export const entrypoint = 'mint';
export const contract_hello = 'hello.wasm';
export const contract_cep78 = 'cep78.wasm';
export const payment_amount_contract_cep78 = '500000000000';
export const test_hello_key = 'test_hello_key';
export const contract_cep78_key = 'cep78_contract_hash_enhanced-nft-1';
export const package_cep78_key = 'cep78_contract_package_enhanced-nft-1';
export const collection_name = 'enhanced-nft-1';
export const args_simple =
  `key-name:String='${test_hello_key}',message:String='Hello Casper'`;
export const args_json = `[
{"name": "collection_name", "type": "String", "value": "${collection_name}"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 1}
]`;
