import { DeployStrParams, PaymentStrParams, getTimestamp, SDK, SessionStrParams, publicKeyFromSecretKey, Bytes, Deploy, EventParseResult, Subscription, Transaction, TransactionStrParams, TransactionBuilderParams, AddressableEntityHash } from 'casper-sdk';
const fs = require('fs').promises;
const http = require('http');

const rpc_address = 'http://localhost:11101';
const sdk = new SDK(rpc_address);

// const server = http.createServer(async (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   let peers_object = await sdk.get_peers();
//   console.log(peers_object.peers);
//   const peers_as_json = peers_object.toJson();
//   console.log(peers_as_json);
//   res.end(JSON.stringify(peers_as_json));
// });

//const PORT = process.env.PORT || 3000;

// example0
// const example0 = server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// get_transaction
const example1 = async () => {
  const transaction_hash_as_string =
    '27d81df41801602f47cdb4618a814407daf38d0c39be32c7f6c109d7e39a3f4b';
  const finalized_approvals = true;

  const get_transaction_options = sdk.get_transaction_options({
    transaction_hash_as_string,
    finalized_approvals,
  });

  const transaction_result = await sdk.get_transaction(get_transaction_options);

  const transaction = transaction_result.transaction;
  const timestamp = transaction.timestamp;
  const header = transaction.header;
  const hash = transaction.hash.toString();
  console.log(timestamp, header, hash);
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

const example31 = async () => {
  const get_binary_node_status = await sdk.get_binary_node_status("127.0.0.1:28101");
  console.log(get_binary_node_status);
  const peers = get_binary_node_status.peers;
  peers.forEach((peer) => {
    console.log(peer);
  });
};

example31();

// get_block
const example4 = async () => {
  const get_block = await sdk.get_block();

  let block = get_block.block;
  let block_hash = block.hash;
  console.log(block_hash);
};

// make_transfer_transaction
const example5 = async () => {
  const chain_name = 'casper-net-1';
  const public_key =
    '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
  const secret_key = undefined;
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const transaction_params = new TransactionStrParams(
    chain_name,
    public_key,
    secret_key,
    timestamp,
    ttl
  );

  transaction_params.payment_amount = payment_amount;

  const make_transfer_transaction = sdk.make_transfer_transaction(
    undefined, // Optional maybe_source
    target_account,
    transfer_amount,
    transaction_params,
  );
  const make_transfer_transaction_as_json = make_transfer_transaction.toJson();
  console.log(make_transfer_transaction_as_json);
};

// transfer_transaction
const example6 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const transaction_params = new TransactionStrParams(
    chain_name,
    public_key,
    secret_key,
    timestamp,
    ttl
  );

  transaction_params.payment_amount = payment_amount;

  const transfer_transaction_result = await sdk.transfer_transaction(
    undefined, // Optional maybe_source
    target_account,
    transfer_amount,
    transaction_params,
  );
  const transfer_transaction_result_as_json = transfer_transaction_result.toJson();
  console.log(transfer_transaction_result_as_json);
  const transaction_hash = transfer_transaction_result.transaction_hash.toString();
  console.log(transaction_hash);
};

// make_transaction
const example7 = async () => {
  const chain_name = 'integration-test';
  const public_key =
    '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
  const payment_amount = '5000000000';
  const entity_hash_hex_string =
    '5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'set_variables';

  const transaction_params = new TransactionStrParams(chain_name, public_key);
  transaction_params.payment_amount = payment_amount;

  let entity_hash = new AddressableEntityHash(entity_hash_hex_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);

  const transaction = sdk.make_transaction(builder_params, transaction_params);
  const transaction_as_json = transaction.toJson();
  console.log(transaction_as_json);
};

// transaction
const example8 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '5000000000';
  const entity_hash_hex_string =
    '5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'set_variables';

  const transaction_params = new TransactionStrParams(chain_name, public_key, secret_key);
  transaction_params.payment_amount = payment_amount;

  let entity_hash = new AddressableEntityHash(entity_hash_hex_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);

  const transaction_result = await sdk.transaction(builder_params, transaction_params);
  const transaction_result_as_json = transaction_result.toJson();
  console.log(transaction_result_as_json);
};

// put_transaction
const example9 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '5000000000';
  const entity_hash_formatted_string =
    'addressable-entity-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'set_variables';

  const transaction_params = new TransactionStrParams(chain_name, public_key, secret_key);
  transaction_params.payment_amount = payment_amount;

  let entity_hash = AddressableEntityHash.fromFormattedStr(entity_hash_formatted_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);

  const transaction = Transaction.newSession(
    builder_params,
    transaction_params
  );
  const put_transaction_result = await sdk.put_transaction(transaction);
  const put_transaction_result_as_json = put_transaction_result.toJson();
  console.log(put_transaction_result_as_json);
};

// put_transaction transfer_transaction
const example10 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const transfer_params = new TransactionStrParams(chain_name, public_key, secret_key);

  transfer_params.payment_amount = payment_amount;

  const transfer_transaction = Transaction.newTransfer(
    undefined, // optional maybe_source
    target_account,
    transfer_amount,
    transfer_params,
    undefined, // optional transfer_id
  );

  const put_transaction_result = await sdk.put_transaction(transfer_transaction);
  const put_transaction_result_as_json = put_transaction_result.toJson();
  console.log(put_transaction_result_as_json);
};

// install
const example11 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const initiator_addr = publicKeyFromSecretKey(secret_key);
  const transaction_params = new TransactionStrParams(chain_name, initiator_addr, secret_key);
  transaction_params.session_args_json = JSON.stringify([
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
  transaction_params.payment_amount = '500000000000';

  async function loadFile() {
    try {
      const fileBuffer = await fs.readFile(__dirname + '/../../../tests/wasm/cep78.wasm');
      return fileBuffer.buffer; // Returns an ArrayBuffer
    } catch (error) {
      throw new Error('Error reading file: ' + error.message);
    }
  }

  const buffer = await loadFile();
  const wasm = buffer && new Uint8Array(buffer);
  const wasmBuffer = wasm?.buffer;
  if (!wasmBuffer) {
    console.error('Failed to read wasm file.');
    return;
  }

  const install_result = await sdk.install(
    transaction_params,
    Bytes.fromUint8Array(wasm)
  );
  const install_result_as_json = install_result.toJson();
  console.log(install_result_as_json.transaction_hash);
  const eventParseResult: EventParseResult = await sdk.waitTransaction(events_address, install_result_as_json.transaction_hash);
  const cost = eventParseResult.body?.transaction_processed?.execution_result.Success?.cost;
  //  console.log(eventParseResult.body.transaction_processed);
  console.log(`install cost ${cost}`);
};

// call_entrypoint
const example12 = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const initiator_addr = publicKeyFromSecretKey(secret_key);
  const entity_hash_formatted_string =
    'addressable-entity-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'mint';
  const token_owner =
    'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';
  const payment_amount = '5000000000';

  const transaction_params = new TransactionStrParams(chain_name, initiator_addr, secret_key);
  transaction_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];
  transaction_params.payment_amount = payment_amount;

  let entity_hash = AddressableEntityHash.fromFormattedStr(entity_hash_formatted_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, entry_point);

  const call_entrypoint_result = await sdk.call_entrypoint(
    builder_params,
    transaction_params
  );
  const call_entrypoint_result_as_json = call_entrypoint_result.toJson();

  // watch transaction_hash to trigger callback
  const transaction_hash_results = [call_entrypoint_result_as_json.transaction_hash];
  const watcher = sdk.watchTransaction(events_address);
  const Subscriptions: Subscription[] = [];
  const getEventHandlerFn = (transactionHash: string) => {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      console.log(`callback for ${transactionHash}`);
      if (eventParseResult.err) {
        return false;
      }
      else if (eventParseResult.body?.transaction_processed?.execution_result.Success) {
        console.log(eventParseResult.body?.transaction_processed?.execution_result.Success);
        return true;
      }
      else {
        console.error(eventParseResult.body?.transaction_processed?.execution_result.Failure);
        return false;
      };
    };
    return eventHandlerFn;
  };

  transaction_hash_results.map(async (transaction_hash) => {
    const eventHandlerFn = getEventHandlerFn(transaction_hash);
    console.log(transaction_hash);
    const subscription: Subscription = new Subscription(transaction_hash, eventHandlerFn);
    Subscriptions.push(subscription);
  });
  watcher.subscribe(Subscriptions);
  const results = await watcher.start();
  watcher.stop();
  console.log(results);
};

// sign transaction
const example13 = async () => {
  const chain_name = 'integration-test';
  const payment_amount = '5000000000';
  const entity_hash_formatted_string =
    'addressable-entity-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const initiator_addr = publicKeyFromSecretKey(secret_key);
  const transaction_params = new TransactionStrParams(chain_name, initiator_addr);
  transaction_params.payment_amount = payment_amount;

  let entity_hash = AddressableEntityHash.fromFormattedStr(entity_hash_formatted_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, 'set_variables');

  const transaction = sdk.make_transaction(builder_params, transaction_params);
  const signed_transaction = transaction.sign(secret_key);
  console.log(signed_transaction.approvals());
};

// add signature to transaction
const example14 = async () => {
  const chain_name = 'integration-test';
  const payment_amount = '5000000000';
  const entity_hash_hex_string =
    '5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  let public_key_kms = '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
  const transaction_params = new TransactionStrParams(chain_name, public_key_kms);
  transaction_params.payment_amount = payment_amount;

  let entity_hash = new AddressableEntityHash(entity_hash_hex_string);
  let builder_params = TransactionBuilderParams.newInvocableEntity(entity_hash, 'set_variables');

  const transaction = sdk.make_transaction(builder_params, transaction_params);

  const signature_kms = '012dbd52d47f982e870476ab6c123f3f29848199b08f5997f757f63986ef656480e27f8e12698c39f14281d2a62c1e8896cc9f272ae3312a68228c5863f849980b';
  let signed_transaction = transaction.addSignature(public_key_kms, signature_kms);

  const public_key_kms_2 = '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';
  const signature_kms_2 = '012dbd52d47f982e870476ab6c123f3f29848199b08f5997f757f63986ef656480e27f8e12698c39f14281d2a62c1e8896cc9f272ae3312a68228c5863f849980c';
  signed_transaction = signed_transaction.addSignature(public_key_kms_2, signature_kms_2);
  console.log(signed_transaction.approvals);
};

// get_deploy
const example1_legacy = async () => {
  const deploy_hash_as_string =
    '4ea826ecae4a3b02dc8627c36c7115539c8aac9b73551fffab3f98fc47fd0499';
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

// make_transfer
const example5_legacy = async () => {
  const chain_name = 'casper-net-1';
  const public_key =
    '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
  const secret_key = undefined;
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const deploy_params = new DeployStrParams(
    chain_name,
    public_key,
    secret_key,
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
const example6_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
  const ttl = '1h'; // or undefined
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const deploy_params = new DeployStrParams(
    chain_name,
    public_key,
    secret_key,
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
  console.log(transfer_result.deploy_hash.toString());
};

// make_deploy
const example7_legacy = async () => {
  const chain_name = 'integration-test';
  const public_key =
    '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
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
const example8_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';

  const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = 'set_variables';

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy_result = await sdk.deploy(deploy_params, session_params, payment_params);
  const deploy_result_as_json = deploy_result.toJson();
  console.log(deploy_result_as_json);
};

// put_deploy
const example9_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const entry_point = 'set_variables';

  const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

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

// put_deploy transfer
const example10_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const payment_amount = '100000000';
  const transfer_amount = '2500000000';
  const target_account =
    '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';

  const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

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

// install_deploy
const example11_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

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

  const install_result = await sdk.install_deploy(
    deploy_params,
    session_params,
    payment_amount
  );
  const install_result_as_json = install_result.toJson();
  console.log(install_result_as_json.deploy_hash);
  const eventParseResult: EventParseResult = await sdk.waitDeploy(events_address, install_result_as_json.deploy_hash);
  const cost = eventParseResult.body?.transaction_processed?.execution_result.Success?.cost;
  //  console.log(eventParseResult.body.transaction_processed);
  console.log(`install cost ${cost}`);
};

// call_entrypoint_deploy
const example12_legacy = async () => {
  const rpc_address = 'http://127.0.0.1:11101';
  const events_address = 'http://127.0.0.1:18101/events';
  const sdk = new SDK(rpc_address);
  const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const contract_hash =
    'hash-7705c58f20c445c605ba1bf5adab66686a8f891879d6012e07fe24c8bf3af3f2';
  const entry_point = 'mint';
  const token_owner =
    'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';
  const payment_amount = '5000000000';

  const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = entry_point;
  session_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];

  const call_entrypoint_deploy_result = await sdk.call_entrypoint_deploy(
    deploy_params,
    session_params,
    payment_amount
  );
  const call_entrypoint_deploy_result_as_json = call_entrypoint_deploy_result.toJson();

  // watch deploy_hash to trigger callback
  const deploy_hash_results = [call_entrypoint_deploy_result_as_json.deploy_hash];
  const watcher = sdk.watchDeploy(events_address);
  const subscriptions: Subscription[] = [];
  const getEventHandlerFn = (deployHash: string) => {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      console.log(`callback for ${deployHash}`);
      if (eventParseResult.err) {
        return false;
      }
      else if (eventParseResult.body?.transaction_processed?.execution_result.Success) {
        console.log(eventParseResult.body?.transaction_processed?.execution_result.Success);
        return true;
      }
      else {
        console.error(eventParseResult.body?.transaction_processed?.execution_result.Failure);
        return false;
      };
    };
    return eventHandlerFn;
  };

  deploy_hash_results.map(async (deploy_hash) => {
    const eventHandlerFn = getEventHandlerFn(deploy_hash);
    console.log(deploy_hash);
    const subscription: Subscription = new Subscription(deploy_hash, eventHandlerFn);
    subscriptions.push(subscription);
  });
  watcher.subscribe(subscriptions);
  const results = await watcher.start();
  watcher.stop();
  console.log(results);
};

// sign deploy
const example13_legacy = async () => {
  const chain_name = 'integration-test';
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  const secret_key = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
-----END PRIVATE KEY-----`;
  const public_key = publicKeyFromSecretKey(secret_key);
  const deploy_params = new DeployStrParams(chain_name, public_key);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = 'set_variables';

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
  const deploy_signed = deploy.sign(secret_key);
  console.log(deploy_signed.toJson());
};

// add signature to deploy
const example14_legacy = async () => {
  const chain_name = 'integration-test';
  const payment_amount = '5000000000';
  const contract_hash =
    'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
  let public_key_kms = '01aff5c18a954604dd27d139d8e0cfc533ac3d53784d76c7a7ac5ff4039510fdf6';
  const deploy_params = new DeployStrParams(chain_name, public_key_kms);

  const session_params = new SessionStrParams();
  session_params.session_hash = contract_hash;
  session_params.session_entry_point = 'set_variables';

  const payment_params = new PaymentStrParams(payment_amount);

  const deploy = sdk.make_deploy(deploy_params, session_params, payment_params);

  const signature_kms = '012dbd52d47f982e870476ab6c123f3f29848199b08f5997f757f63986ef656480e27f8e12698c39f14281d2a62c1e8896cc9f272ae3312a68228c5863f849980b';
  let deploy_signed = deploy.addSignature(public_key_kms, signature_kms);

  const public_key_kms_2 = '01868e06026ba9c8695f6f3bb10d44782004dbc144ff65017cf484436f9cf7b0f6';
  const signature_kms_2 = '012dbd52d47f982e870476ab6c123f3f29848199b08f5997f757f63986ef656480e27f8e12698c39f14281d2a62c1e8896cc9f272ae3312a68228c5863f849980c';
  deploy_signed = deploy_signed.addSignature(public_key_kms_2, signature_kms_2);
  console.log(deploy_signed.toJson());
};

// example1();
