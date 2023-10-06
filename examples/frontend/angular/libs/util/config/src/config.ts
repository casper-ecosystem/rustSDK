export type EnvironmentConfig = {
  [key: string]: string | object;
};
export const config: EnvironmentConfig = {
  wasm_asset_path: 'assets/casper_rust_wasm_sdk_bg.wasm',
  verbosity: 'High',
  minimum_transfer: '2500000000',
  TTL: '30m',
  gas_fee_transfer: '100000000',
  block_identifier_height_default: '1958541',
  block_identifier_hash: '372e4c83a6ca19c027d3daf4807ad8fc16b9f01411ef39d5e00888128bf4fd59',
  networks: {
    localhost: {
      node_address: 'http://localhost:11101',
      chain_name: 'casper-net-1'
    },
    integration: {
      node_address: 'https://rpc.integration.casperlabs.io',
      chain_name: 'integration-test'
    },
    testnet: {
      node_address: 'https://rpc.testnet.casperlabs.io',
      chain_name: 'casper-test'
    },
    mainnet: {
      node_address: 'https://rpc.mainnet.casperlabs.io',
      chain_name: 'casper'
    },
    ip: {
      node_address: 'http://3.136.227.9:7777',
      chain_name: 'integration-test'
    },
  }
};