export const environment = {
  production: true,
  // Public Docker/cloud images default to testnet; ntcl needs a reachable
  // NETWORK_RPC_URL (local compose still works when the page is on localhost).
  default_network: 'testnet',
  is_docker: true,
};
