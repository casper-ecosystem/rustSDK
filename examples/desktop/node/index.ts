import { DeployStrParams, PaymentStrParams, getTimestamp, SDK, SessionStrParams, privateToPublicKey, Bytes, Deploy, EventParseResult, DeploySubscription } from 'casper-sdk';
const fs = require('fs').promises;
const http = require('http');

const node_address = 'https://rpc.integration.casperlabs.io';
const sdk = new SDK(node_address);

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let peers_object = await sdk.get_peers();
  console.log(peers_object.peers);
  const peers_as_json = peers_object.toJson();
  console.log(peers_as_json);
  res.end(JSON.stringify(peers_as_json));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// get_deploy
const example1 = async () => {
  const deploy_hash_as_string =
    'a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9';
  const finalized_approvals = true;

  const get_deploy_options = sdk.get_deploy_options({
    deploy_hash_as_string,
    finalized_approvals,
  });

  const deploy_result = await sdk.get_deploy(get_deploy_options);

  const deploy: Deploy = deploy_result.deploy;
  const timestamp = deploy.timestamp();
  const header = deploy.toJson().header; // DeployHeader type not being exposed right now by the SDK you can convert every type to JSON
  console.log(timestamp, header);
};

// get_auction_info
const example2 = async () => {
  const get_auction_info = await sdk.get_auction_info();

  const auction_state = get_auction_info.auction_state;
  const state_root_hash = auction_state.state_root_hash.toString();
  const block_height = auction_state.block_height.toString();
  console.log(state_root_hash, block_height);
};

// get_peers
const example3 = async () => {
  const get_peers = await sdk.get_peers();

  const peers = get_peers.peers;
  peers.forEach((peer) => {
    console.log(peer);
  });
};

// get_block
const example4 = async () => {
  const get_block = await sdk.get_block();

  let block = get_block.block;
  let block_hash = block.hash;
  console.log(block_hash);
};

// make_transfer
const example5 = async () => {
  const chain_name = 'casper-net-1';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const private_key = undefined;
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

  const deploy_params = new DeployStrParams(
    chain_name,
    public_key,
    private_key,
    timestamp,
    ttl
  );

  const payment_params = new PaymentStrParams(payment_amount);

  const transfer_deploy = sdk.make_transfer(
    transfer_amount,
    target_account,
    undefined, // transfer_id
    deploy_params,
    payment_params
  );
  const transfer_deploy_as_json = transfer_deploy.toJson();
  console.log(transfer_deploy_as_json);
};

// transfer
const example6 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const private_key = `-----BEGIN PRIVATE KEY-----

-----END PRIVATE KEY-----`;
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

  const deploy_params = new DeployStrParams(
    chain_name,
    public_key,
    private_key,
    timestamp,
    ttl
  );

  const payment_params = new PaymentStrParams(payment_amount);

  const transfer_result = await sdk.transfer(
    transfer_amount,
    target_account,
    undefined, // transfer_id
    deploy_params,
    payment_params
  );
  const transfer_result_as_json = transfer_result.toJson();
  console.log(transfer_result_as_json);
};

// make_deploy
const example7 = async () => {
  const chain_name = 'integration-test';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';

  const deploy_params = new DeployStrParams(chain_name, public_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = 'set_variables';

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
  const deploy_as_json = deploy.toJson();
  console.log(deploy_as_json);
};

// deploy
const example8 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const private_key = `-----BEGIN PRIVATE KEY-----

    -----END PRIVATE KEY-----`;
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = 'set_variables';

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy_result = await sdk.deploy(deploy_params, session_params, payment_params);
  const deploy_result_as_json = deploy_result.toJson();
  console.log(deploy_result_as_json);
};

// put_deploy
const example9 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const private_key = `-----BEGIN PRIVATE KEY-----

    -----END PRIVATE KEY-----`;
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'set_variables';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy = Deploy.withPaymentAndSession(
    deploy_params,
    session_params,
    payment_params
  );

  const put_deploy_result = await sdk.put_deploy(deploy);
  const put_deploy_result_as_json = put_deploy_result.toJson();
  console.log(put_deploy_result_as_json);
};

const example10 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const public_key =
    '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
  const private_key = `-----BEGIN PRIVATE KEY-----

    -----END PRIVATE KEY-----`;
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const payment_params = new PaymentStrParams(payment_amount);

  const transfer_deploy = Deploy.withTransfer(
    transfer_amount,
    target_account,
    undefined, // transfer_id
    deploy_params,
    payment_params
  );

  const put_deploy_result = await sdk.put_deploy(transfer_deploy);
  const put_deploy_result_as_json = put_deploy_result.toJson();
  console.log(put_deploy_result_as_json);
};

// install
const example11 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events/main';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const private_key = `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIMSwux1yM00NOvQ+Q6iR6iGbA7rHPqVTx1uE2Si89A3y
    -----END PRIVATE KEY-----`;
  const public_key = privateToPublicKey(private_key);
  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  async function loadFile() {
    try {
      const fileBuffer = await fs.readFile(__dirname + '/../../../tests/wasm/cep78.wasm');
      return fileBuffer.buffer; // Returns an ArrayBuffer
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }

  const session_params = new SessionStrParams();
  session_params.session_args_json = JSON.stringify([
    { "name": "collection_name", "type": "String", "value": "enhanced-nft-1" },
    { "name": "collection_symbol", "type": "String", "value": "ENFT-1" },
    { "name": "total_token_supply", "type": "U64", "value": 100 },
    { "name": "ownership_mode", "type": "U8", "value": 0 },
    { "name": "nft_kind", "type": "U8", "value": 1 },
    { "name": "allow_minting", "type": "Bool", "value": true },
    { "name": "owner_reverse_lookup_mode", "type": "U8", "value": 0 },
    { "name": "nft_metadata_kind", "type": "U8", "value": 2 },
    { "name": "identifier_mode", "type": "U8", "value": 0 },
    { "name": "metadata_mutability", "type": "U8", "value": 0 },
    { "name": "events_mode", "type": "U8", "value": 1 }
  ]);
  const payment_amount = '500000000000';

  const buffer = await loadFile();
  const wasm = buffer && new Uint8Array(buffer);
  const wasmBuffer = wasm?.buffer;
  if (!wasmBuffer) {
    console.error('Failed to read wasm file.');
    return;
  }

  session_params.session_bytes = Bytes.fromUint8Array(wasm);

  const install_result = await sdk.install(
    deploy_params,
    session_params,
    payment_amount
  );
  const install_result_as_json = install_result.toJson();
  console.log(install_result_as_json.deploy_hash);
  const eventParseResult: EventParseResult = await sdk.waitDeploy(events_address, install_result_as_json.deploy_hash);
  const cost = eventParseResult.body.DeployProcessed?.execution_result.Success?.cost;
  //  console.log(eventParseResult.body.DeployProcessed);
  console.log(`install cost ${cost}`);
};

// call_entrypoint
const example12 = async () => {
  const node_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events/main';
  const sdk = new SDK(node_address);
  const chain_name = 'casper-net-1';
  const private_key = `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIMSwux1yM00NOvQ+Q6iR6iGbA7rHPqVTx1uE2Si89A3y
    -----END PRIVATE KEY-----`;
  const public_key = privateToPublicKey(private_key);
  const contract_hash =
    'hash-7705c58f20c445c605ba1bf5adab66686a8f891879d6012e07fe24c8bf3af3f2';
  const entry_point = 'mint';
  const token_owner =
    'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';
  const payment_amount = '5000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, private_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];

  const call_entrypoint_result = await sdk.call_entrypoint(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();

  // watch deploy_hash to trigger callback
  const deploy_hash_results = [call_entrypoint_result_as_json.deploy_hash];
  const watcher = sdk.watchDeploy(events_address);
  const deploySubscriptions: DeploySubscription[] = [];
  const getEventHandlerFn = (deployHash: string) => {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      console.log(`callback for ${deployHash}`);
      if (eventParseResult.err) {
        return false;
      }
      else if (eventParseResult.body?.DeployProcessed?.execution_result.Success) {
        console.error(eventParseResult.body?.DeployProcessed?.execution_result.Success);
        return true;
      }
      else {
        console.error(eventParseResult.body?.DeployProcessed?.execution_result.Failure);
        return false;
      };
    };
    return eventHandlerFn;
  };

  deploy_hash_results.map(async (deploy_hash) => {
    const eventHandlerFn = getEventHandlerFn(deploy_hash);
    console.log(deploy_hash);
    const deploySubscription: DeploySubscription = new DeploySubscription(deploy_hash, eventHandlerFn);
    deploySubscriptions.push(deploySubscription);
  });
  watcher.subscribe(deploySubscriptions);
  const results = await watcher.start();
  watcher.stop();
  console.log(results);
};
