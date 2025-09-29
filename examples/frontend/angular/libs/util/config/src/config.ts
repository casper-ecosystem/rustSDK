import { Verbosity, PricingMode } from 'casper-rust-wasm-sdk';

export type EnvironmentConfig = {
  [key: string]: string | object | Verbosity | boolean | PricingMode;
};

const action_needs_secret_key = [
  'deploy',
  'transfer',
  'put_deploy',
  'speculative_deploy',
  'speculative_transfer',
  'speculative_exec_deploy',
  'sign_deploy',
  'call_entrypoint_deploy',
  'install_deploy',
  'transaction',
  'transfer_transaction',
  'put_transaction',
  'speculative_transaction',
  'speculative_transfer_transaction',
  'speculative_exec',
  'sign_transaction',
  'call_entrypoint',
  'install',
];
const action_needs_public_key = [
  'make_deploy',
  'make_transfer',
  'make_transaction',
  'make_transfer_transaction',
  ...action_needs_secret_key,
];

export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  standard_payment_amount: '100000000',
  default_pricing_mode: PricingMode.Classic,
  default_gas_price_tolerance: '1',
  default_additional_computation_factor: '0',
  default_is_install_upgrade: true,
  action_needs_secret_key,
  action_needs_public_key,
  networks: {
    'node-launcher': {
      rpc_address: 'http://localhost:7777',
      node_address: 'localhost:4300?targetPort=7779&targetHost=localhost',
      stream_address: 'http://localhost:9999/events/main',
      chain_name: 'casper-net-1',
    },
    ntcl: {
      rpc_address: 'http://localhost:11101',
      node_address: 'localhost:4300/?targetPort=28101&targetHost=localhost',
      stream_address: 'http://localhost:18101/events/main',
      chain_name: 'casper-net-1',
    },
    testnet: {
      rpc_address: 'https://node.testnet.casper.network',
      node_address:
        'localhost:4300/?targetPort=7779&targetHost=node.testnet.casper.network',
      stream_address: 'https://node.testnet.casper.network/events/main',
      chain_name: 'casper-test',
    },
    mainnet: {
      rpc_address: 'https://node.mainnet.casper.network',
      node_address:
        'localhost:4300/?targetPort=7779&targetHost=node.mainnet.casper.network',
      stream_address: 'https://node.mainnet.casper.network/events/main',
      chain_name: 'casper',
    },
    custom: {
      rpc_address: 'http://3.136.227.9:7777',
      node_address: 'localhost:4300/?targetPort=7779&targetHost=3.136.227.9',
      stream_address: 'http://3.136.227.9:9999/events/main',
      chain_name: 'casper-test',
    },
    dev: {
      rpc_address: 'http://localhost:4200',
      node_address: 'localhost:4400/?targetPort=28101&targetHost=localhost',
      stream_address: 'http://localhost:4200/events/main',
      chain_name: 'casper-net-1',
    },
  },
  localhost: 'localhost',
  app_port: '4200',
  default_port: '7777',
  default_protocol: 'http://',
  docker_gateway: '172.18.0.1',
  cors_anywhere_port: '11100',
  enable_addressable_entity: false,
};
