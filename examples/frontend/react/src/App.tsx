import 'bootstrap/dist/css/bootstrap.min.css';
import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import './App.css';

import init, {
  SDK,
  Verbosity,
  DeployHash,
  URef,
  Key,
  Digest,
  DictionaryItemIdentifier,
  BlockIdentifier,
  GlobalStateIdentifier,
  Path,
  Deploy,
  AccessRights,
  PublicKey,
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  hexToUint8Array,
  jsonPrettyPrint,
  privateToPublicKey,
  getTimestamp,
  Bytes,
  AccountIdentifier
} from 'casper-wasm-sdk';

const host = 'http://localhost:3000';
const block_identifier_height_default = BigInt(1);
const pubKey_default =
  '0115c9b40c06ff99b0cbadf1140b061b5dbf92103e66a6330fbcc7768f5219c1ce';
const secret_key = `-----BEGIN PRIVATE KEY-----
  MC4CAQAwBQYDK2VwBCIEIFQBgrG+PRSS0uehoYE15rjUP1J28UIjGWGvNpcsw+xU
  -----END PRIVATE KEY-----`;
const chain_name = 'integration-test';

function App() {
  const [wasm, setWasm] = useState(false);
  const [block_identifier_height, setBlock_identifier_height] = useState(
    block_identifier_height_default
  );
  const [hash, setHash] = useState('');
  const [pubKey] = useState(pubKey_default);
  const [block, setBlock] = useState('');
  const [info_get_account_info_hash, setInfo_get_account_info_hash] =
    useState('');
  const [info_get_account_info_purse, setInfo_get_account_info_purse] =
    useState('');
  const [info_get_deploy, setInfo_get_deploy] = useState('');
  const [sessionPath, setSessionPath] = useState('');
  const [state_get_balance, setState_get_balance] = useState('');
  const [state_get_dictionary_item, setState_get_dictionary_item] = useState(
    []
  );
  const [query_global_state, setQuery_global_state] = useState('');

  const [account_put_deploy, setAccount_put_deploy] = useState('');
  const [make_deploy, setMake_deploy] = useState('');
  const [make_transfer, setMake_transfer] = useState('');
  const [sdk, setSdk] = useState({});

  let test = false;
  useEffect(() => {
    if (!test) {
      // FIX ME please
      test = true;
      initApp();
    }
  }, []);

  const fetchWasm = async () => {
    // console.log('fetchWasm');
    await init();
    //console.log(wasm);
    setWasm(true);
  };

  const initApp = async () => {
    if (!wasm) {
      await fetchWasm();
    };
    // console.log(wasm);
    const sdk = new SDK();
    setSdk(sdk);
    console.log(sdk);

    try {
      let get_state_root_hash_options = sdk.get_state_root_hash_options({
        node_address: host,
        verbosity: Verbosity.Low
      });
      const chain_get_state_root_hash = (await sdk.chain_get_state_root_hash(get_state_root_hash_options));
      console.log(chain_get_state_root_hash);
      setHash(chain_get_state_root_hash?.state_root_hash_as_string);
      console.log(
        'js chain_get_state_root_hash',
        chain_get_state_root_hash?.state_root_hash_as_string
      );
      console.log(chain_get_state_root_hash);
      let chain_get_block_options = sdk.get_block_options({
        node_address: host,
        verbosity: Verbosity.High,
        blockIdentifier: BlockIdentifier.fromHeight(block_identifier_height)
      });
      const chain_get_block = await sdk.chain_get_block(chain_get_block_options);
      setBlock(chain_get_block?.block.hash);
      console.log('js chain_get_block', chain_get_block);
      const account_identifier = new AccountIdentifier(pubKey);
      let state_get_account_info_options = sdk.get_account_options({
        node_address: host,
        verbosity: Verbosity.High,
        blockIdentifier: BlockIdentifier.fromHeight(block_identifier_height),
        account_identifier: account_identifier.toJson()
      });
      const state_get_account_info = (await sdk.state_get_account_info(state_get_account_info_options)).toJson();
      console.log('js state_get_account_info', state_get_account_info);

      setInfo_get_account_info_hash(
        state_get_account_info?.account.account_hash
      );
      setInfo_get_account_info_purse(
        state_get_account_info?.account.main_purse
      );

      let stateRootHashDigest = new Digest(chain_get_state_root_hash?.state_root_hash_as_string);

      console.log(stateRootHashDigest);
      console.log(stateRootHashDigest.toJson());
      const dictionary_item_identifier =
        DictionaryItemIdentifier.newFromSeedUref(
          'uref-386f3d77417ac76f7c0b8d5ea8764cb42de8e529a091da8e96e5f3c88f17e530-007', '0'
        );

      let get_dictionary_item_options = sdk.get_dictionary_item_options({
        node_address: host,
        state_root_hash_as_string: chain_get_state_root_hash?.state_root_hash_as_string,
        //state_root_hash: stateRootHashDigest.toJson(),
        dictionary_item_identifier: dictionary_item_identifier.toJson(),
        //  verbosity: Verbosity.High
      });
      console.log(get_dictionary_item_options);
      const state_get_dictionary_item = (await sdk.state_get_dictionary_item(get_dictionary_item_options)).toJson();

      setState_get_dictionary_item(
        state_get_dictionary_item?.stored_value.CLValue.parsed
      );
      console.log('js state_get_dictionary_item', state_get_dictionary_item);
      console.log(chain_get_state_root_hash?.state_root_hash);
      stateRootHashDigest = new Digest(chain_get_state_root_hash?.state_root_hash_as_string);
      let state_get_balance_options = sdk.get_balance_options({
        node_address: host,
        state_root_hash: stateRootHashDigest.toJson(),
        purse_uref: new URef(
          'b1d24c7a1502d70d8cf1ad632c5f703e5f3be0622583a00e47cad08a59025d2e',
          AccessRights.READ_ADD_WRITE()
        ).toJson(),
        //purse_uref_as_string: 'uref-b1d24c7a1502d70d8cf1ad632c5f703e5f3be0622583a00e47cad08a59025d2e-007',
        verbosity: Verbosity.High,
      });
      const state_get_balance = (await sdk.state_get_balance(state_get_balance_options)).toJson();
      console.log('js state_get_balance', state_get_balance);
      setState_get_balance(state_get_balance?.balance_value);


      let path = new Path('');
      let key = Key.fromURef(
        new URef(
          'b57dfc006ca3cff3f3f17852447d3de86ca69c1086405097ceda3b2a492290e8',
          AccessRights.READ_ADD_WRITE()
        )
      );
      console.log(key);
      let query_global_state_options = sdk.query_global_state_options({
        node_address: host,
        global_state_identifier: GlobalStateIdentifier.fromStateRootHash(
          new Digest(chain_get_state_root_hash?.state_root_hash_as_string)
        ).toJson(),
        key: key.toJson(),
        //path_as_string: path.toString(),
        path: path.toJson(),
        verbosity: Verbosity.High,
      });
      console.log(query_global_state_options);
      const query_global_state = (await sdk.query_global_state(query_global_state_options)).toJson();
      console.log('js query_global_state', query_global_state);
      setQuery_global_state(
        query_global_state?.stored_value.CLValue.parsed
      );

      let session_account =
        privateToPublicKey(secret_key);
      const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
      const ttl = '1h';

      console.log("privateToPublicKey result", session_account);

      let deploy_params = new DeployStrParams(
        chain_name,
        session_account,
        secret_key,
        timestamp,
        ttl
      );
      console.log(deploy_params);

      let payment_params = new PaymentStrParams();
      payment_params.payment_amount = '500000000';
      console.log(payment_params);

      // Transfer minimum amount of tokens to recipient
      const make_transfer = sdk.make_transfer(
        '2500000000',
        '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
        undefined, // transfer_id
        deploy_params,
        payment_params,
      ).toJson();
      setMake_transfer(jsonPrettyPrint(make_transfer));
      console.log(jsonPrettyPrint(make_transfer, Verbosity.Medium));

      deploy_params = new DeployStrParams(
        chain_name,
        session_account
      );
      console.log(deploy_params);

      let session_params = new SessionStrParams();
      // Call an erc 20 token in the wild
      session_params.session_hash =
        '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
      session_params.session_entry_point = 'decimals';
      session_params.session_args_simple = ["foo:Bool='true'", "bar:String='value'"]; // session_args_simple or session_args_json but not both
      //session_params.session_args_json = JSON.stringify([{ "name": "foo", "type": "U256", "value": 1 }]); // Arrary of objects as multiple args
      console.log(session_params);

      payment_params = new PaymentStrParams();
      payment_params.payment_amount = '5500000000';
      console.log(payment_params);

      let test_deploy = Deploy.withPaymentAndSession(
        deploy_params,
        session_params,
        payment_params,
      );

      deploy_params = new DeployStrParams(
        chain_name,
        session_account
      );
      payment_params = new PaymentStrParams();
      payment_params.payment_amount = '5500000000';
      test_deploy = test_deploy.sign(secret_key);
      test_deploy = test_deploy.withTTL('60m', secret_key);
      test_deploy = test_deploy.withSession(JSON.parse('{ "StoredContractByHash": { "hash": "9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477", "entry_point": "decimals", "args": []}}'));
      console.log(test_deploy.toJson());

      let test_transfer = Deploy.withTransfer(
        '2500000000',
        '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
        undefined,
        deploy_params,
        payment_params,
      );
      console.log(test_transfer);


      payment_params = new PaymentStrParams();
      payment_params.payment_amount = '5500000000';
      deploy_params = new DeployStrParams(
        chain_name,
        session_account
      );
      session_params = new SessionStrParams();
      session_params.session_hash =
        '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
      session_params.session_entry_point = 'decimals';
      session_params.session_args_json = JSON.stringify([{ "name": "foo", "type": "U256", "value": 1 }]); // Arrary of objects as multiple args
      const make_deploy = sdk.make_deploy(
        deploy_params,
        session_params,
        payment_params,
      ).toJson();
      setMake_deploy(jsonPrettyPrint(make_deploy));
      console.log(jsonPrettyPrint(make_deploy, Verbosity.Medium));

      // Update hash && timestamp if you need to deploy this already signed deploy
      const deployAsString =
        '{"hash":"20f0ead3d5e93706598716ec4c1cd8afe987d80a7dffb444dd7f9c6bb9d40937","header":{"account":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","timestamp":"2023-08-07T23:30:30.785Z","ttl":"30m","gas_price":1,"body_hash":"0f7bbc79a5f02f2621347005c62fb440d8d07d5c97e2cd11da090da24989f61f","dependencies":[],"chain_name":"integration-test"},"payment":{"ModuleBytes":{"module_bytes":"","args":[["amount",{"bytes":"058e31a6553a","cl_type":"U512"}]]}},"session":{"StoredContractByHash":{"hash":"9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477","entry_point":"decimals","args":[]}},"approvals":[{"signer":"01d589b1ff893657417d180148829e2e0c509182f0f4678c2af7d1ddd58012ccd9","signature":"018e64c442f6a4ccae0758bcf43a3f76a36e3d3744332d65ee1cafd0b2f30ffa362ad14c500742ed58c3736a863de34e1266c354f76e5915ac991c834aee3aeb08"}]}';

      let deploy_to_sign = new Deploy(JSON.parse(deployAsString));
      console.log(deploy_to_sign.toJson());

      let deploy_signed = (await sdk.sign_deploy(
        deploy_to_sign,
        secret_key
      )).toJson();
      console.log('js deploy_signed two parties', deploy_signed.approvals);
      console.log(deploy_signed);
      console.assert(deploy_signed.approvals.length === 2); // Deploy has two approvals

      deploy_to_sign = new Deploy(JSON.parse(deployAsString));
      deploy_to_sign = deploy_to_sign.addArg("test:bool='false"); // Deploy was modified has no approvals anymore
      deploy_to_sign = deploy_to_sign.addArg({ "name": "name_of_my_key", "type": "U256", "value": 1 }); // No arrary as one arg
      console.log('deploy_to_sign ', deploy_to_sign.toJson());
      console.assert(deploy_to_sign.toJson().approvals.length === 0);
      deploy_signed = (await sdk.sign_deploy(
        deploy_to_sign,
        secret_key
      )).toJson();
      console.log('js deploy + addArg > sign_deploy', deploy_signed.approvals);
      console.assert(deploy_signed.approvals.length === 1); // Deploy should have one approval

      deploy_to_sign = new Deploy(make_deploy);
      console.log('make_deploy footprint', deploy_to_sign.footprint());
      console.assert(deploy_to_sign.toJson().approvals.length === 0); // Deploy has no approval
      console.log('make_deploy ApprovalsHash before', deploy_to_sign.approvalsHash());
      deploy_signed = deploy_to_sign.addArg("test:bool='true'", secret_key); // Deploy was modified has one approval
      console.log('make_deploy signed', deploy_signed.toJson());
      console.log('js deploy + addArg + secret_key ', deploy_signed.toJson().approvals);
      console.assert(deploy_signed.toJson().approvals.length === 1); // Deploy should have one approval
      console.log('make_deploy ApprovalsHash after', deploy_signed.approvalsHash());

      let signed_deploy = new Deploy(make_transfer); // or make_deploy
      console.log(signed_deploy);
      const account_put_deploy = (await sdk.account_put_deploy(
        host,
        signed_deploy,
        Verbosity.High,
      )).toJson();
      console.log('js account_put_deploy', account_put_deploy);
      setAccount_put_deploy(account_put_deploy?.deploy_hash);

      if (!account_put_deploy?.deploy_hash) {
        return;
      }

      let finalized_approvals = true;
      let get_deploy_options = sdk.get_deploy_options({
        node_address: host,
        deploy_hash: new DeployHash(
          //'397acea5a765565c7d11839f2d30bf07a8e7740350467d3a358f596835645445' // random deploy
          account_put_deploy?.deploy_hash
        ).toJson(),
        finalized_approvals: finalized_approvals,
        verbosity: Verbosity.High,
      });
      // const info_get_deploy = await sdk.get_deploy(get_deploy_options);
      // console.log('js info_get_deploy', info_get_deploy);
      // setInfo_get_deploy(info_get_deploy?.api_version);

      // test call entry point
      session_account = privateToPublicKey(secret_key);
      deploy_params = new DeployStrParams(
        chain_name,
        session_account,
        secret_key
      );
      console.log(deploy_params);
      session_params = new SessionStrParams();
      // Call an erc 20 token in the wild
      session_params.session_hash =
        '9d0235fe7f4ac6ba71cf251c68fdd945ecf449d0b8aecb66ab0cbc18e80b3477';
      session_params.session_entry_point = 'decimals';
      // let payment_params = new PaymentStrParams();
      // payment_params.payment_amount = '5500000000';
      // console.log(payment_params);
      let test_call_entrypoint = (await sdk.call_entrypoint(
        host,
        deploy_params,
        session_params,
        '5500000000'
      )).toJson();
      console.log(test_call_entrypoint.deploy_hash);

    } catch (error) {
      console.error(error);
    }
  };

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !(sdk instanceof SDK)) {
      return;
    }
    const sdkInstance = sdk as SDK;
    selectedFile && setSessionPath(selectedFile.name);
    const session_account = privateToPublicKey(secret_key);
    let deploy_params = new DeployStrParams(
      chain_name,
      session_account,
      secret_key
    );
    console.log(deploy_params);
    let session_params = new SessionStrParams();
    session_params.session_args_simple = ["message:string='hello casper"];
    console.log(session_params);
    const file = event.target.files?.[0];
    const buffer = await file?.arrayBuffer();
    const wasm = buffer && new Uint8Array(buffer);
    const wasmBuffer = wasm?.buffer;
    if (!wasmBuffer) {
      return;
    }
    if (wasm) {
      session_params.session_bytes = Bytes.fromUint8Array(wasm);
      let test_install = await sdkInstance.install(
        host,
        deploy_params,
        session_params,
        '500000000'
      );
      console.log(test_install);
    } else {
      console.error("Failed to read wasm file.");
    }
  };

  return (
    <div className="App">
      <>
        <img src={'./logo.png'} alt="CasperLabs"></img>
        <div className="text-start my-3 mx-4">
          <div className="my-2">
            <label className="fw-bold">State root hash</label>
            <div className="ms-2 d-inline-flex">{hash}</div>
          </div>

          <div className="my-2 w-50">
            <form className="form-inline">
              <label className="form-control">
                Block hash for height
                <input
                  className="ms-2 form-control-sm text-center"
                  type="number"
                  name="height"
                  placeholder={block_identifier_height_default.toString()}
                  defaultValue={block_identifier_height.toString()}
                ></input>
              </label>
            </form>
            <div className="my-2">
              <label className="fw-bold">Block Info Hash</label>
              <div className="ms-2 d-inline-flex">{block}</div>
            </div>
          </div>

          <div className="w-50">
            <form className="form-inline">
              <label className="ms-2fw-bold form-control">
                <span>Public key</span>
                <input
                  className="ms-2 form-control-sm w-75 text-center"
                  type="text"
                  name="pubKey"
                  placeholder={pubKey}
                  defaultValue={pubKey}
                ></input>
              </label>
            </form>
          </div>

          <div className="my-2">
            <label className="fw-bold">Account Info Hash</label>
            <div className="ms-2 d-inline-flex">
              {info_get_account_info_hash}
            </div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Account Info Purse</label>
            <div className="ms-2 d-inline-flex">
              {info_get_account_info_purse}
            </div>
          </div>

          <div className="my-2 w-50">
            <form className="form-inline">
              <label className="form-control">
                Account main purse uref
                <input
                  className="ms-2 form-control-sm w-75 text-center"
                  type="text"
                  name="purse"
                  placeholder="uref-"
                  defaultValue={info_get_account_info_purse}
                ></input>
              </label>
            </form>
            <div className="my-2">
              <label className="fw-bold">State get balance</label>
              <div className="ms-2 d-inline-flex">{state_get_balance}</div>
            </div>
          </div>

          <div className="my-2">
            <label className="fw-bold">Install wasm</label>
            <div className="ms-2 d-inline-flex">
              <input
                className="hidden"
                type="file"
                onChange={onFileSelected}
                accept=".wasm"
              />
            </div>
          </div>

          <div className="my-2">
            <label className="fw-bold">State get dictionary item</label>
            {state_get_dictionary_item.map((item, index) => (
              <div key={index}>
                <span>Key: {item['key']}</span>
                <span className="ms-2">{item['value']}</span>
              </div>
            ))}
          </div>
          <div className="my-2">
            <label className="fw-bold">Query global state</label>
            <div className="ms-2 d-inline-flex">{query_global_state}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Make Deploy</label>
            <div>{make_deploy}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Make transfer deploy</label>
            <div>{make_transfer}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Put Deploy</label>
            <div>{account_put_deploy}</div>
          </div>
          <div className="my-2">
            <label className="fw-bold">Deploy info</label>
            <div>{info_get_deploy}</div>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
