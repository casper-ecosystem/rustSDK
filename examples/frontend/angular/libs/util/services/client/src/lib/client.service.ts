import { Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { ErrorService } from '@util/error';
import { FormService } from '@util/form';
import { ResultService } from '@util/result';
import { State, StateService } from '@util/state';
import { SDK_TOKEN } from '@util/wasm';
import { BlockHash, BlockIdentifier, Bytes, Deploy, DeployStrParams, DictionaryItemIdentifier, DictionaryItemStrParams, Digest, GlobalStateIdentifier, PaymentStrParams, SDK, SessionStrParams, Verbosity, getBlockOptions, getStateRootHashOptions, getTimestamp, hexToString, jsonPrettyPrint } from 'casper-sdk';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private chain_name!: string;
  private public_key!: string;
  private private_key!: string | undefined;
  private deploy_json!: string;
  private select_dict_identifier!: string;
  // TODO Verbosity from config
  private verbosity = Verbosity.High;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    private readonly resultService: ResultService,
    private readonly formService: FormService,
    private readonly errorService: ErrorService,
    private readonly stateService: StateService,
  ) {
    this.setStateSubscription();
  }

  private setStateSubscription() {
    this.stateService.getState().subscribe((state: State) => {
      state.chain_name && (this.chain_name = state.chain_name);
      state.public_key && (this.public_key = state.public_key);
      state.private_key && (this.private_key = state.private_key);
      state.deploy_json && (this.deploy_json = state.deploy_json);
      state.verbosity && (this.verbosity = state.verbosity);
      state.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
    });
  }

  async get_account(account_identifier_param: string) {
    let account_identifier!: string;
    if (!account_identifier_param) {
      account_identifier = this.getIdentifier('accountIdentifier')?.value?.trim();
    } else {
      account_identifier = account_identifier_param;
    }
    if (!account_identifier) {
      const err = "account_identifier is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const get_account_options = this.sdk.get_account_options({
      account_identifier_as_string: account_identifier
    });
    if (!get_account_options) {
      const err = "get_account_options is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    this.getIdentifieBlock(get_account_options);
    try {
      const get_account = await this.sdk.get_account(get_account_options);
      if (!account_identifier_param) {
        this.resultService.setResult(get_account.toJson());
      }
      return get_account;
    } catch (err: any) {
      this.errorService.setError(err.toString());
      return err;
    }
  }

  async get_deploy() {
    const finalized_approvals = this.getIdentifier('finalizedApprovals')?.value;
    const deploy_hash_as_string: string = this.getIdentifier('deployHash')?.value?.trim();
    if (!deploy_hash_as_string) {
      const err = "deploy_hash_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const get_deploy_options = this.sdk.get_deploy_options({
      deploy_hash_as_string
    });
    get_deploy_options.finalized_approvals = finalized_approvals;
    try {
      const get_deploy = await this.sdk.get_deploy(get_deploy_options);
      get_deploy && this.resultService.setResult(get_deploy.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_peers() {
    let peers: any;
    try {
      const peers_result = await this.sdk.get_peers();
      peers_result && this.resultService.setResult(peers_result.toJson());
      peers_result && (peers = peers_result.peers);
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
    return peers;
  }

  async get_node_status() {
    const get_node_status = await this.sdk.get_node_status();
    get_node_status && this.resultService.setResult(get_node_status.toJson());
    return get_node_status;
  }

  async get_state_root_hash(no_mark_for_check?: boolean) {
    let state_root_hash = '';
    const options: getStateRootHashOptions = this.sdk.get_state_root_hash_options({});
    if (!options) {
      const err = "get_state_root_hash options are missing";
      err && (this.errorService.setError(err.toString()));
    }
    if (!no_mark_for_check) {
      this.getIdentifieBlock(options);
      const get_state_root_hash = await this.sdk.get_state_root_hash(options);
      get_state_root_hash && this.resultService.setResult(get_state_root_hash.toJson());
    } else {
      const chain_get_state_root_hash = await this.sdk.get_state_root_hash(options);
      state_root_hash = chain_get_state_root_hash.toString();
    }
    return state_root_hash;
  }

  async get_auction_info() {
    try {
      const get_auction_info_options = this.sdk.get_auction_info_options({});
      this.getIdentifieBlock(get_auction_info_options);
      const get_auction_info = await this.sdk.get_auction_info(get_auction_info_options);
      get_auction_info && this.resultService.setResult(get_auction_info.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_balance() {
    const purse_uref_as_string: string = this.getIdentifier('purseUref')?.value?.trim();
    const state_root_hash: string = this.getIdentifier('stateRootHash')?.value?.trim();
    if (!purse_uref_as_string) {
      const err = "purse_uref_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    try {
      const get_balance_options = this.sdk.get_balance_options({
        state_root_hash_as_string: state_root_hash || '',
        purse_uref_as_string,
      });
      const get_balance = await this.sdk.get_balance(get_balance_options);
      get_balance && this.resultService.setResult(get_balance.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_block() {
    try {
      const chain_get_block_options: getBlockOptions = this.sdk.get_block_options({});
      this.getIdentifieBlock(chain_get_block_options);
      const chain_get_block = await this.sdk.get_block(chain_get_block_options);
      chain_get_block && this.resultService.setResult(chain_get_block.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_block_transfers() {
    try {
      const get_block_transfers_options = this.sdk.get_block_transfers_options({});
      this.getIdentifieBlock(get_block_transfers_options);
      const get_block_transfers = await this.sdk.get_block_transfers(get_block_transfers_options);
      get_block_transfers && this.resultService.setResult(get_block_transfers.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_chainspec() {
    try {
      const get_chainspec = await this.sdk.get_chainspec();
      const chain_spec = hexToString(get_chainspec?.chainspec_bytes.chainspec_bytes);
      chain_spec && this.resultService.setResult(chain_spec);
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_era_info() {
    const get_era_info_options = this.sdk.get_era_info_options({});
    this.getIdentifieBlock(get_era_info_options);
    try {
      const get_era_info = await this.sdk.get_era_info(get_era_info_options);
      get_era_info && this.resultService.setResult(get_era_info.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_era_summary() {
    const get_era_summary_options = this.sdk.get_era_summary_options({});
    this.getIdentifieBlock(get_era_summary_options);
    try {
      const get_era_summary = await this.sdk.get_era_summary(get_era_summary_options);
      get_era_summary && this.resultService.setResult(get_era_summary.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_validator_changes() {
    try {
      const get_validator_changes = await this.sdk.get_validator_changes();
      get_validator_changes && this.resultService.setResult(get_validator_changes.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async list_rpcs() {
    try {
      const list_rpcs = await this.sdk.list_rpcs();
      list_rpcs && this.resultService.setResult(list_rpcs.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async query_balance() {
    const purse_identifier_as_string: string = this.getIdentifier('purseIdentifier')?.value?.trim();
    if (!purse_identifier_as_string) {
      const err = "deploy_hash_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const query_balance_options = this.sdk.query_balance_options({
      purse_identifier_as_string
    });
    this.getGlobalIdentifier(query_balance_options);
    try {
      const query_balance = await this.sdk.query_balance(query_balance_options);
      query_balance && this.resultService.setResult(query_balance.balance);
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async query_global_state() {
    const path_as_string: string = this.getIdentifier('queryPath')?.value?.trim() || '';
    const key_as_string: string = this.getIdentifier('queryKey')?.value?.trim();
    if (!key_as_string) {
      const err = "key_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const query_global_state_options = this.sdk.query_global_state_options({
      key_as_string,
      path_as_string,
    });
    this.getGlobalIdentifier(query_global_state_options);
    try {
      const query_global_state = await this.sdk.query_global_state(query_global_state_options);
      query_global_state && this.resultService.setResult(query_global_state.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async deploy(deploy_result = true, speculative?: boolean, wasm?: Uint8Array) {
    const timestamp = getTimestamp();
    const ttl: string = this.getIdentifier('TTL')?.value?.trim() || '';
    if (!this.public_key) {
      const err = "public_key is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
      timestamp,
      ttl
    );
    const payment_params = new PaymentStrParams();
    const payment_amount: string = this.getIdentifier('paymentAmount')?.value?.trim();
    if (!payment_amount) {
      const err = "paymentAmount is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    payment_params.payment_amount = payment_amount;
    const session_params = this.get_session_params(wasm);
    // let test_deploy = Deploy.withPaymentAndSession(
    //   deploy_params,
    //   session_params,
    //   payment_params,
    // );
    // if (this.private_key) {
    //   test_deploy = test_deploy.sign(this.private_key);
    // }
    try {
      let result;
      if (speculative) {
        const maybe_block_options = {
          maybe_block_id_as_string: undefined,
          maybe_block_identifier: undefined,
        };
        this.getIdentifieBlock(maybe_block_options);
        const { maybe_block_id_as_string, maybe_block_identifier } = maybe_block_options;
        result = await this.sdk.speculative_deploy(
          deploy_params,
          session_params,
          payment_params,
          maybe_block_id_as_string,
          maybe_block_identifier
        );
      }
      else if (deploy_result) {
        result = await this.sdk.deploy(
          deploy_params,
          session_params,
          payment_params,
        );
      } else {
        result = this.sdk.make_deploy(
          deploy_params,
          session_params,
          payment_params,
        );
      }
      if (result) {
        const result_json = result.toJson();
        this.deploy_json = jsonPrettyPrint(result_json, this.verbosity as Verbosity);
        this.deploy_json && this.resultService.setResult(result_json);
        !deploy_result && this.updateDeployJson(this.deploy_json);
      }
      return result;
    } catch (err) {
      err && this.errorService.setError(err as string);
      return;
    }
  }

  async install(wasm?: Uint8Array) {
    const payment_amount: string = this.getIdentifier('paymentAmount')?.value?.trim();
    if (!payment_amount) {
      const err = "paymentAmount is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    if (!this.public_key || !this.private_key) {
      const err = "public_key or private_key is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const wasmBuffer = wasm?.buffer;
    if (!wasmBuffer) {
      const err = "wasmBuffer is missing";
      err && (this.errorService.setError(err.toString()));
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
    );
    const session_params = this.get_session_params(wasm);
    try {
      const install = await this.sdk.install(
        deploy_params,
        session_params,
        payment_amount,
      );
      install && this.resultService.setResult(install.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async transfer(deploy_result = true, speculative?: boolean) {
    const timestamp = getTimestamp(); // or Date.now().toString().trim(); // or undefined
    const ttl: string = this.getIdentifier('TTL')?.value?.trim() || '';
    if (!this.public_key) {
      const err = "public_key is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }

    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
      timestamp,
      ttl
    );
    const payment_params = new PaymentStrParams();
    payment_params.payment_amount = this.config['gas_fee_transfer'].toString();
    const transfer_amount: string = this.getIdentifier('transferAmount')?.value?.trim();
    const target_account: string = this.getIdentifier('targetAccount')?.value?.trim();
    if (!transfer_amount || !target_account) {
      const err = "transfer_amount or target_account is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }

    // let test_transfer = Deploy.withTransfer(
    //   '2500000000',
    //   '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54',
    //   undefined,
    //   deploy_params,
    //   payment_params,
    // );
    // console.log(test_transfer);
    try {
      let result;
      if (speculative) {
        const maybe_block_options = {
          maybe_block_id_as_string: undefined,
          maybe_block_identifier: undefined,
        };
        this.getIdentifieBlock(maybe_block_options);
        const { maybe_block_id_as_string, maybe_block_identifier } = maybe_block_options;
        result = await this.sdk.speculative_transfer(
          transfer_amount,
          target_account,
          undefined, // transfer_id
          deploy_params,
          payment_params,
          maybe_block_id_as_string,
          maybe_block_identifier
        );
      }
      else if (deploy_result) {
        result = await this.sdk.transfer(
          transfer_amount,
          target_account,
          undefined, // transfer_id
          deploy_params,
          payment_params,
        );
      } else {
        result = await this.sdk.make_transfer(
          transfer_amount,
          target_account,
          undefined, // transfer_id
          deploy_params,
          payment_params,
        );
      }
      if (result) {
        const result_json = result.toJson();
        this.deploy_json = jsonPrettyPrint(result_json, this.verbosity as Verbosity);
        this.deploy_json && this.resultService.setResult(result_json);
        !deploy_result && this.updateDeployJson(this.deploy_json);
      }
      return result;
    } catch (err) {
      err && this.errorService.setError(err as string);
      return;
    }
  }

  async put_deploy() {
    const signed_deploy_as_string: string = this.getIdentifier('deployJson')?.value?.trim();
    if (!signed_deploy_as_string) {
      const err = "deployJson is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const signed_deploy = new Deploy(JSON.parse(signed_deploy_as_string));
    // if (!signed_deploy.isValid()) {
    //   console.error('Deploy is not valid.');
    //   return;
    // }
    // if (signed_deploy.isExpired()) {
    //   console.error('Deploy is expired.');
    //   return;
    // }
    // the deploy hash is correct (should be the hash of the header), and
    // the body hash is correct (should be the hash of the body), and
    // approvals are non empty, and
    // all approvals are valid signatures of the deploy hash

    const put_deploy = await this.sdk.put_deploy(
      signed_deploy,
    );
    put_deploy && this.resultService.setResult(put_deploy.toJson());
    return put_deploy;
  }

  async speculative_exec() {
    const signed_deploy_as_string: string = this.getIdentifier('deployJson')?.value?.trim();
    if (!signed_deploy_as_string) {
      const err = "signed_deploy_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const signed_deploy = new Deploy(JSON.parse(signed_deploy_as_string));
    // if (!signed_deploy.isValid()) {
    //   console.error('Deploy is not valid.');
    //   return;
    // }
    // if (signed_deploy.isExpired()) {
    //   console.error('Deploy is expired.');
    //   return;
    // }
    const speculative_exec_options = this.sdk.speculative_exec_options({
      deploy: signed_deploy.toJson()
    });
    this.getIdentifieBlock(speculative_exec_options);
    const speculative_exec = await this.sdk.speculative_exec(speculative_exec_options);
    speculative_exec && this.resultService.setResult(speculative_exec.toJson());
    return speculative_exec;
  }

  async sign_deploy() {
    if (!this.private_key) {
      const err = "private_key is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const signed_deploy_as_string: string = this.getIdentifier('deployJson')?.value?.trim();
    if (!signed_deploy_as_string) {
      const err = "signed_deploy_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }

    // TODO
    // deploy_to_sign = deploy_to_sign.addArg("test:bool='false"); // Deploy was modified has no approvals anymore
    // deploy_to_sign = deploy_to_sign.addArg({ "name": "name_of_my_key", "type": "U256", "value": 1 });


    let signed_deploy;
    try {
      signed_deploy = new Deploy(JSON.parse(signed_deploy_as_string));
    }
    catch {
      const err = "Error parsing deploy";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    if (!signed_deploy) {
      const err = "signed_deploy_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    signed_deploy = signed_deploy.sign(this.private_key);
    this.deploy_json = jsonPrettyPrint(signed_deploy.toJson(), this.verbosity as Verbosity);
    this.getIdentifier('deployJson')?.setValue(this.deploy_json);
    this.updateDeployJson(this.deploy_json);
  }

  private updateDeployJson(deploy_json: string) {
    deploy_json && this.stateService.setState({
      deploy_json
    });
  }

  async make_deploy(wasm?: Uint8Array) {
    const deploy_result = false;
    const speculative = false;
    await this.deploy(deploy_result, speculative, wasm);
  }

  async make_transfer() {
    const deploy_result = false;
    await this.transfer(deploy_result);
  }

  async speculative_transfer() {
    const speculative = true;
    const deploy_result = !speculative;
    await this.transfer(deploy_result, speculative);
  }

  async speculative_deploy(wasm?: Uint8Array) {
    const speculative = true;
    const deploy_result = !speculative;
    await this.deploy(deploy_result, speculative, wasm);
  }

  async call_entrypoint() {
    if (!this.public_key || !this.private_key) {
      const err = "public_key or private_key is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
    );
    const session_params = this.get_session_params();
    const payment_amount: string = this.getIdentifier('paymentAmount')?.value?.trim();
    if (!payment_amount) {
      const err = "paymentAmount is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    try {
      const call_entrypoint = await this.sdk.call_entrypoint(
        deploy_params,
        session_params,
        payment_amount
      );
      call_entrypoint && this.resultService.setResult(call_entrypoint.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async query_contract_dict() {
    const state_root_hash: string = this.getIdentifier('stateRootHash')?.value?.trim();
    const dictionary_item_key: string = this.getIdentifier('itemKey')?.value?.trim();
    if (!dictionary_item_key) {
      const err = "itemKey is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const contract_named_key: string = this.getIdentifier('seedContractHash')?.value?.trim() || '';
    const dictionary_name: string = this.getIdentifier('seedName')?.value?.trim();
    if (!dictionary_name) {
      const err = "seedName is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    let dictionary_item_params: DictionaryItemStrParams | undefined;
    if (contract_named_key) {
      // We have two ways to identify a dictionary, either by identifier or by item params
      // const dictionary_item_identifier =
      //   DictionaryItemIdentifier.newFromContractInfo(
      //     contract_named_key,
      //     dictionary_name,
      //     dictionary_item_key
      //   );
      dictionary_item_params = new DictionaryItemStrParams();
      dictionary_item_params.setContractNamedKey(contract_named_key, dictionary_name, dictionary_item_key);
    }
    if (!dictionary_item_params) {
      const err = "dictionary_item_params is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const query_contract_dict_options = this.sdk.query_contract_dict_options({
      state_root_hash_as_string: state_root_hash || '',
      // dictionary_item_identifier: dictionary_item_identifier.toJson() // you need to send JSON of the object, not the object or you need to use setter
    });
    // Here setter does take instance of DictionaryItemStrParams
    query_contract_dict_options.dictionary_item_params = dictionary_item_params;
    try {
      const query_contract_dict = await this.sdk.query_contract_dict(query_contract_dict_options);
      query_contract_dict && this.resultService.setResult(query_contract_dict.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async query_contract_key() {
    const state_root_hash: string = this.getIdentifier('stateRootHash')?.value?.trim();
    const key_as_string: string = this.getIdentifier('queryKey')?.value?.trim();
    if (!key_as_string) {
      const err = "key_as_string is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const path_as_string: string = this.getIdentifier('queryPath')?.value.toString().trim().replace(/^\/+|\/+$/g, '');
    const query_contract_key_options = this.sdk.query_contract_key_options({
      state_root_hash_as_string: state_root_hash || '',
      key_as_string,
      path_as_string,
    });
    try {
      const query_contract_key = await this.sdk.query_contract_key(query_contract_key_options);
      query_contract_key && this.resultService.setResult(query_contract_key.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  async get_dictionary_item() {
    const state_root_hash: string = this.getIdentifier('stateRootHash')?.value?.trim();
    const item_key: string = this.getIdentifier('itemKey')?.value?.trim();
    const seed_key: string = this.getIdentifier('seedKey')?.value?.trim();
    if (!item_key && !seed_key) {
      const err = "seedKey or itemKey is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const seed_uref: string = this.getIdentifier('seedUref')?.value?.trim();
    let dictionary_item_identifier: DictionaryItemIdentifier | undefined;
    if (seed_uref && this.select_dict_identifier === 'newFromSeedUref') {
      dictionary_item_identifier =
        DictionaryItemIdentifier.newFromSeedUref(
          seed_uref,
          item_key
        );
    } else {
      if (seed_key && this.select_dict_identifier === 'newFromDictionaryKey') {
        dictionary_item_identifier =
          DictionaryItemIdentifier.newFromDictionaryKey(
            seed_key
          );
      } else {
        const seed_contract_hash: string = this.getIdentifier('seedContractHash')?.value?.trim();
        const seed_account_hash: string = this.getIdentifier('seedAccountHash')?.value?.trim();
        const seed_name: string = this.getIdentifier('seedName')?.value?.trim();
        if (!seed_name) {
          const err = "seed_name  is missing";
          err && (this.errorService.setError(err.toString()));
          return;
        }
        if (seed_contract_hash && this.select_dict_identifier === 'newFromContractInfo') {
          dictionary_item_identifier =
            DictionaryItemIdentifier.newFromContractInfo(
              seed_contract_hash,
              seed_name,
              item_key
            );
        }
        else if (seed_account_hash && this.select_dict_identifier === 'newFromAccountInfo') {
          dictionary_item_identifier =
            DictionaryItemIdentifier.newFromAccountInfo(
              seed_account_hash,
              seed_name,
              item_key
            );
        }
      }
    }
    if (!dictionary_item_identifier) {
      const err = "dictionary_item_identifier  is missing";
      err && (this.errorService.setError(err.toString()));
      return;
    }
    const get_dictionary_item_options = this.sdk.get_dictionary_item_options({
      state_root_hash_as_string: state_root_hash || '',
    });
    get_dictionary_item_options.dictionary_item_identifier = dictionary_item_identifier;
    try {
      const state_get_dictionary_item = await this.sdk.state_get_dictionary_item(get_dictionary_item_options);
      state_get_dictionary_item && this.resultService.setResult(state_get_dictionary_item.toJson());
    } catch (err) {
      err && (this.errorService.setError(err.toString()));
    }
  }

  private getIdentifier(formControlName: string) {
    return this.formService.form.get(formControlName) as FormControl;
  }

  private getIdentifieBlock(options: { maybe_block_id_as_string?: string; maybe_block_identifier?: BlockIdentifier; }) {
    const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
    const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
    if (block_identifier_hash) {
      options.maybe_block_id_as_string = block_identifier_hash;
      options.maybe_block_identifier = undefined;
    } else if (block_identifier_height) {
      const maybe_block_identifier = BlockIdentifier.fromHeight(BigInt(block_identifier_height));
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = maybe_block_identifier;
    } else {
      options.maybe_block_id_as_string = undefined;
      options.maybe_block_identifier = undefined;
    }
  }

  private getGlobalIdentifier(options: { global_state_identifier?: GlobalStateIdentifier; }) {
    const state_root_hash: string = this.getIdentifier('stateRootHash')?.value?.trim();

    let global_state_identifier!: GlobalStateIdentifier;
    if (state_root_hash) {
      global_state_identifier = GlobalStateIdentifier.fromStateRootHash(
        new Digest(state_root_hash)
      );
    } else {
      const block_identifier_height: string = this.getIdentifier('blockIdentifierHeight')?.value?.trim();
      const block_identifier_hash: string = this.getIdentifier('blockIdentifierHash')?.value?.trim();
      if (block_identifier_hash) {
        global_state_identifier = GlobalStateIdentifier.fromBlockHash(new BlockHash(block_identifier_hash));
      } else if (block_identifier_height) {
        global_state_identifier = GlobalStateIdentifier.fromBlockHeight(BigInt(block_identifier_height));
      }
    }
    if (global_state_identifier) {
      options.global_state_identifier = global_state_identifier;
    }
  }

  private get_session_params(wasm?: Uint8Array): SessionStrParams {
    const session_params = new SessionStrParams();
    const entry_point: string = this.getIdentifier('entryPoint')?.value?.trim();
    if (entry_point) {
      session_params.session_entry_point = entry_point;
    }
    const args_simple: [string] = this.getIdentifier('argsSimple')?.value?.trim()
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item !== '');
    const args_json: string = this.getIdentifier('argsJson')?.value?.trim();
    if (args_simple?.length) {
      session_params.session_args_simple = args_simple;
    }
    else if (args_json) {
      session_params.session_args_json = args_json;
    }
    const call_package: boolean = this.getIdentifier('callPackage')?.value;
    const session_hash: string = this.getIdentifier('sessionHash')?.value?.trim();
    const session_name: string = this.getIdentifier('sessionName')?.value?.trim();
    if (!call_package) {
      if (session_hash) {
        session_params.session_hash = session_hash;
      } else if (session_name) {
        session_params.session_name = session_name;
      }
    } else {
      if (session_hash) {
        session_params.session_package_hash = session_hash;
      } else if (session_name) {
        session_params.session_package_name = session_name;
      }
    }
    if (wasm) {
      session_params.session_bytes = Bytes.fromUint8Array(wasm);
    }
    const version: string = this.getIdentifier('version')?.value?.trim();
    if (version) {
      session_params.session_version = version;
    }
    return session_params;
  }
}
