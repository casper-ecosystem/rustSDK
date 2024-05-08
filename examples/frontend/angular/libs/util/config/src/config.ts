import { Verbosity } from "casper-sdk";

export type EnvironmentConfig = {
  [key: string]: string | object | Verbosity;
};

const action_needs_private_key = ['deploy', 'transfer', 'put_deploy', 'speculative_deploy', 'speculative_transfer', 'speculative_exec', 'sign_deploy', 'call_entrypoint', 'install'];
const action_needs_public_key = ['make_deploy', 'make_transfer', ...action_needs_private_key];

export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  default_action: 'get_node_status',
  verbosity: Verbosity.High,
  minimum_transfer: '2500000000',
  TTL: '30m',
  gas_fee_transfer: '100000000',
  action_needs_private_key,
  action_needs_public_key,
  networks: {
    'node-launcher': {
      node_address: 'http://localhost:7777',
      stream_address: 'http://localhost:9999/events/main',
      chain_name: 'casper-net-1'
    },
    ntcl: {
      node_address: 'http://localhost:11101',
      stream_address: 'http://localhost:18101/events/main',
      chain_name: 'casper-net-1'
    },
    integration: {
      node_address: 'https://rpc.integration.casperlabs.io',
      stream_address: 'https://events.integration.casperlabs.io/events/main',
      chain_name: 'integration-test'
    },
    testnet: {
      node_address: 'https://rpc.testnet.casperlabs.io',
      stream_address: 'https://events.testnet.casperlabs.io/events/main',
      chain_name: 'casper-test'
    },
    mainnet: {
      node_address: 'https://rpc.mainnet.casperlabs.io',
      stream_address: 'https://events.mainnet.casperlabs.io/events/main',
      chain_name: 'casper'
    },
    custom: {
      node_address: 'http://3.136.227.9:7777',
      stream_address: 'http://3.136.227.9:9999/events/main',
      chain_name: 'casper-test'
    },
  },
  default_port: '7777',
  default_protocol: 'http://',
  default_network: 'custom',
};