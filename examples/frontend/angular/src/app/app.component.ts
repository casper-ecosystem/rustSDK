import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CONFIG, ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN, WasmModule } from '@util/wasm';
import { BlockIdentifier, SDK, Verbosity, getBlockOptions, getStateRootHashOptions, DeployHash, GlobalStateIdentifier, Digest, DictionaryItemIdentifier, privateToPublicKey, getTimestamp, DeployStrParams, PaymentStrParams, jsonPrettyPrint, Deploy, SessionStrParams, BlockHash, DictionaryItemStrParams, hexToString, motesToCSPR, Bytes, PeerEntry } from "casper-sdk";
import { ResultComponent, ResultService } from '@components';

const imports = [
  CommonModule,
  ResultComponent,
  WasmModule
];

type network = {
  name: string;
  node_address: string;
  chain_name: string;
};

@Component({
  standalone: true,
  imports,
  providers: [ResultService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Casper client';
  state_root_hash!: string;
  peers!: PeerEntry[];
  networks!: network[];
  sdk_methods!: string[];
  sdk_rpc_methods!: string[];
  sdk_contract_methods!: string[];
  sdk_deploy_methods!: string[];
  sdk_deploy_utils_methods!: string[];
  error!: string;
  verbosity = Verbosity.High;
  node_address = this.env['node_address'].toString();
  action!: string;
  block_identifier_height!: string;
  block_identifier_height_default = this.config['block_identifier_height_default'].toString();
  block_identifier_hash!: string;
  block_identifier_hash_default = this.config['block_identifier_hash'].toString();
  transfer_amount!: string;
  ttl!: string;
  target_account!: string;
  account_hash!: string;
  main_purse!: string;
  purse_uref!: string;
  finalized_approvals = true;
  deploy_hash!: string;
  purse_identifier!: string;
  item_key!: string;
  select_dict_identifier = 'newFromContractInfo';
  seed_uref!: string;
  seed_contract_hash!: string;
  seed_account_hash!: string;
  seed_name!: string;
  seed_key!: string;
  query_key!: string;
  query_path!: string;
  account_identifier!: string;
  public_key!: string;
  private_key!: string | undefined;
  has_private_key!: boolean;
  session_hash!: string;
  session_name!: string;
  payment_amount!: string;
  entry_point!: string;
  args_json!: string;
  args_simple!: string;
  version!: string;
  call_package = false;
  file_name!: string;
  deploy_json!: string;
  chain_name = this.env['chain_name'].toString();
  network: network = {
    name: 'default',
    node_address: this.env['node_address'].toString(),
    chain_name: this.env['chain_name'].toString()
  };
  private _wasm!: Uint8Array | undefined;

  @ViewChild('selectKeyElt') selectKeyElt!: ElementRef;
  @ViewChild('blockIdentifierHeightElt') blockIdentifierHeightElt!: ElementRef;
  @ViewChild('blockIdentifierHashElt') blockIdentifierHashElt!: ElementRef;
  @ViewChild('purseUrefElt') purseUrefElt!: ElementRef;
  @ViewChild('stateRootHashElt') stateRootHashElt!: ElementRef;
  @ViewChild('finalizedApprovalsElt') finalizedApprovalsElt!: ElementRef;
  @ViewChild('deployHashElt') deployHashElt!: ElementRef;
  @ViewChild('purseIdentifierElt') purseIdentifierElt!: ElementRef;
  @ViewChild('itemKeyElt') itemKeyElt!: ElementRef;
  @ViewChild('seedUrefElt') seedUrefElt!: ElementRef;
  @ViewChild('seedAccounttHashElt') seedAccounttHashElt!: ElementRef;
  @ViewChild('seedContractHashElt') seedContractHashElt!: ElementRef;
  @ViewChild('seedNameElt') seedNameElt!: ElementRef;
  @ViewChild('seedKeyElt') seedKeyElt!: ElementRef;
  @ViewChild('queryKeyElt') queryKeyElt!: ElementRef;
  @ViewChild('queryPathElt') queryPathElt!: ElementRef;
  @ViewChild('accountIdentifierElt') accountIdentifierElt!: ElementRef;
  @ViewChild('publicKeyElt') publicKeyElt!: ElementRef;
  @ViewChild('privateKeyElt') privateKeyElt!: ElementRef;
  @ViewChild('TTLElt') TTLElt!: ElementRef;
  @ViewChild('transferAmountElt') transferAmountElt!: ElementRef;
  @ViewChild('targetAccountElt') targetAccountElt!: ElementRef;
  @ViewChild('entryPointElt') entryPointElt!: ElementRef;
  @ViewChild('argsSimpleElt') argsSimpleElt!: ElementRef;
  @ViewChild('argsJsonElt') argsJsonElt!: ElementRef;
  @ViewChild('sessionHashElt') sessionHashElt!: ElementRef;
  @ViewChild('sessionNameElt') sessionNameElt!: ElementRef;
  @ViewChild('versionElt') versionElt!: ElementRef;
  @ViewChild('callPackageElt') callPackageElt!: ElementRef;
  @ViewChild('deployJsonElt') deployJsonElt!: ElementRef;
  @ViewChild('paymentAmountElt') paymentAmountElt!: ElementRef;
  @ViewChild('selectDictIdentifierElt') selectDictIdentifierElt!: ElementRef;
  @ViewChild('wasmElt') wasmElt!: ElementRef;
  @ViewChild('deployFileElt') deployFileElt!: ElementRef;
  @ViewChild('selectNetworkElt') selectNetworkElt!: ElementRef;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngOnInit(): Promise<void> {
    console.info(this.sdk);
    this.sdk_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this.sdk))
      .filter(name => typeof (this.sdk as any)[name] === 'function')
      .filter(name => !['free', 'constructor', '__destroy_into_raw', 'getNodeAddress', 'setNodeAddress', 'getVerbosity', 'setVerbosity'].includes(name))
      .filter(name => !name.endsWith('_options'))
      .filter(name => !name.startsWith('chain_'))
      .filter(name => !name.startsWith('state_'))
      .filter(name => !name.startsWith('info_'))
      .filter(name => !name.startsWith('account'))
      .sort();

    this.sdk_deploy_methods = this.sdk_methods.filter(name => ['deploy', 'speculative_deploy', 'speculative_transfer', 'transfer'].includes(name));

    this.sdk_deploy_utils_methods = this.sdk_methods.filter(name => ['make_deploy', 'make_transfer', 'sign_deploy', 'put_deploy'].includes(name));

    this.sdk_contract_methods = this.sdk_methods.filter(name => ['call_entrypoint', 'install', 'query_contract_dict', 'query_contract_key'].includes(name));

    this.sdk_rpc_methods = this.sdk_methods.filter(name => !this.sdk_deploy_methods.concat(this.sdk_deploy_utils_methods, this.sdk_contract_methods).includes(name));
  };

  selectNetwork() {
    let network = this.selectNetworkElt.nativeElement.value;
    network = network && this.networks.find(x => x.name == network);
    if (!network) {
      const network = this.selectNetworkElt.nativeElement.value;
      // To do fix chain-name
      if (network) {
        this.node_address = network;
      }
    }
    this.network = network;
    this.chain_name = network.chain_name;
    this.node_address = network.node_address;
    this.sdk.setNodeAddress(this.node_address);
  }

  async get_peers() {
    try {
      const peers_result = await this.sdk.get_peers();
      peers_result && this.resultService.setResult(peers_result.toJson());
      peers_result && (this.peers = peers_result.peers);
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_node_status() {
    const get_node_status = await this.sdk.get_node_status();
    get_node_status && this.resultService.setResult(get_node_status.toJson());
    return get_node_status;
  }

  async get_state_root_hash(no_mark_for_check?: boolean) {
    const options: getStateRootHashOptions = this.sdk.get_state_root_hash_options({});
    if (!options) {
      return;
    }
    if (!no_mark_for_check) {
      this.getIdentifieBlock(options);
      const state_root_hash = await this.sdk.get_state_root_hash(options);
      this.state_root_hash && this.resultService.setResult(state_root_hash.toJson());
    } else {
      const state_root_hash = await this.sdk.get_state_root_hash(options);
      this.state_root_hash = state_root_hash.state_root_hash_as_string;
      this.changeDetectorRef.markForCheck();
    }
  }

  async get_account(account_identifier_param: string) {
    let account_identifier!: string;
    if (!account_identifier_param) {
      account_identifier = this.accountIdentifierElt && this.accountIdentifierElt.nativeElement.value.toString().trim();
    } else {
      account_identifier = account_identifier_param;
    }
    if (!account_identifier) {
      return;
    }
    const get_account_options = this.sdk.get_account_options({
      account_identifier_as_string: account_identifier
    });
    if (!get_account_options) {
      return;
    }
    this.getIdentifieBlock(get_account_options);
    const get_account = await this.sdk.get_account(get_account_options);
    if (!account_identifier_param) {
      get_account && this.resultService.setResult(get_account.toJson());
    }
    return get_account;
  }

  async onPublicKeyChange() {
    const public_key: string = this.publicKeyElt && this.publicKeyElt.nativeElement.value.toString().trim();
    this.account_hash = '';
    this.main_purse = '';
    const get_account = await this.get_account(public_key);
    if (public_key !== this.public_key) {
      this.public_key = public_key;
      this.private_key = '';
      this.has_private_key = false;
      this.privateKeyElt.nativeElement.value = '';
    }
    this.account_hash = get_account?.account.account_hash;
    this.main_purse = get_account?.account.main_purse;
    this.changeDetectorRef.markForCheck();
  }

  async get_auction_info() {
    try {
      const get_auction_info_options = this.sdk.get_auction_info_options({});
      this.getIdentifieBlock(get_auction_info_options);
      const get_auction_info = await this.sdk.get_auction_info(get_auction_info_options);
      get_auction_info && this.resultService.setResult(get_auction_info.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async install() {
    const payment_amount: string = this.paymentAmountElt && this.paymentAmountElt.nativeElement.value.toString().trim();
    if (!payment_amount) {
      return;
    }
    if (!this.public_key || !this.private_key) {
      return;
    }
    const wasmBuffer = this._wasm?.buffer;
    if (!wasmBuffer) {
      return;
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
    );
    const session_params = this.get_session_params();
    try {
      const install = await this.sdk.install(
        deploy_params,
        session_params,
        payment_amount,
      );
      install && this.resultService.setResult(install.toJson());
    } catch (err) {
      console.error(err);
      err && (this.error = err.toString());
    }
  }

  async get_balance() {
    const purse_uref_as_string: string = this.purseUrefElt && this.purseUrefElt.nativeElement.value.toString().trim();
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    if (!purse_uref_as_string) {
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
      console.error(err);
      err && (this.error = err.toString());
    }
  }

  async get_block_transfers() {
    try {
      const get_block_transfers_options = this.sdk.get_block_transfers_options({});
      this.getIdentifieBlock(get_block_transfers_options);
      const get_block_transfers = await this.sdk.get_block_transfers(get_block_transfers_options);
      get_block_transfers && this.resultService.setResult(get_block_transfers.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_block() {
    try {
      const chain_get_block_options: getBlockOptions = this.sdk.get_block_options({});
      this.getIdentifieBlock(chain_get_block_options);
      const chain_get_block = await this.sdk.get_block(chain_get_block_options);
      chain_get_block && this.resultService.setResult(chain_get_block.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async submitAction(action: string) {
    const exec = true;
    await this.handleAction(action, exec);
    this.changeDetectorRef.markForCheck();
  }

  async get_chainspec() {
    try {
      const get_chainspec = await this.sdk.get_chainspec();
      const chain_spec = hexToString(get_chainspec?.chainspec_bytes.chainspec_bytes);
      chain_spec && this.resultService.setResult(chain_spec);
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_deploy() {
    const finalized_approvals: boolean = this.finalizedApprovalsElt && this.finalizedApprovalsElt.nativeElement.value as boolean;
    const deploy_hash_as_string: string = this.deployHashElt && this.deployHashElt.nativeElement.value.toString().trim();
    if (!deploy_hash_as_string) {
      return;
    }
    const get_deploy_options = this.sdk.get_deploy_options({
      deploy_hash_as_string,
      finalized_approvals
    });
    try {
      const get_deploy = await this.sdk.get_deploy(get_deploy_options);
      get_deploy && this.resultService.setResult(get_deploy.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_dictionary_item() {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    const item_key: string = this.itemKeyElt && this.itemKeyElt.nativeElement.value.toString().trim();
    const seed_key: string = this.seedKeyElt && this.seedKeyElt.nativeElement.value.toString().trim();
    if (!item_key && !seed_key) {
      return;
    }
    const seed_uref: string = this.seedUrefElt && this.seedUrefElt.nativeElement.value.toString().trim();
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
        const seed_contract_hash: string = this.seedContractHashElt && this.seedContractHashElt.nativeElement.value.toString().trim();
        const seed_account_hash: string = this.seedAccounttHashElt && this.seedAccounttHashElt.nativeElement.value.toString().trim();
        const seed_name: string = this.seedNameElt && this.seedNameElt.nativeElement.value.toString().trim();
        if (!seed_name) {
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
      err && (this.error = err.toString());
    }
  }

  async get_era_info() {
    const get_era_info_options = this.sdk.get_era_info_options({});
    this.getIdentifieBlock(get_era_info_options);
    try {
      const get_era_info = await this.sdk.get_era_info(get_era_info_options);
      get_era_info && this.resultService.setResult(get_era_info.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_era_summary() {
    const get_era_summary_options = this.sdk.get_era_summary_options({});
    this.getIdentifieBlock(get_era_summary_options);
    try {
      const get_era_summary = await this.sdk.get_era_summary(get_era_summary_options);
      get_era_summary && this.resultService.setResult(get_era_summary.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async get_validator_changes() {
    try {
      const get_validator_changes = await this.sdk.get_validator_changes();
      get_validator_changes && this.resultService.setResult(get_validator_changes.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async list_rpcs() {
    try {
      const list_rpcs = await this.sdk.list_rpcs();
      list_rpcs && this.resultService.setResult(list_rpcs.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async query_balance() {
    const purse_identifier_as_string: string = this.purseIdentifierElt && this.purseIdentifierElt.nativeElement.value.toString().trim();
    if (!purse_identifier_as_string) {
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
      err && (this.error = err.toString());
    }
  }

  async query_global_state() {
    const path_as_string: string = this.queryPathElt && this.queryPathElt.nativeElement.value.toString().trim().replace(/^\/+|\/+$/g, '');
    const key_as_string: string = this.queryKeyElt && this.queryKeyElt.nativeElement.value.toString().trim();
    if (!key_as_string) {
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
      err && (this.error = err.toString());
    }
  }

  async deploy(deploy_result = true, speculative?: boolean) {
    const timestamp = getTimestamp();
    const ttl: string = this.TTLElt && this.TTLElt.nativeElement.value.toString().trim();
    if (!this.public_key) {
      return;
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
      timestamp,
      ttl
    );
    // TODO Fix better
    // Fix invalid form
    const payment_params = new PaymentStrParams();
    const payment_amount: string = this.paymentAmountElt && this.paymentAmountElt.nativeElement.value.toString().trim();
    if (!payment_amount) {
      return;
    }
    payment_params.payment_amount = payment_amount;
    const session_params = this.get_session_params();
    // let test_deploy = Deploy.withPaymentAndSession(
    //   deploy_params,
    //   session_params,
    //   payment_params,
    // );
    // if (this.private_key) {
    //   test_deploy = test_deploy.sign(this.private_key);
    // }
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
      this.deploy_json = jsonPrettyPrint(result_json, this.verbosity);
      this.deploy_json && this.resultService.setResult(result_json);
    }
    return result;
  }

  async transfer(deploy_result = true, speculative?: boolean) {
    const timestamp = getTimestamp(); // or Date.now().toString().trim(); // or undefined
    const ttl: string = this.TTLElt && this.TTLElt.nativeElement.value.toString().trim();
    if (!this.public_key) {
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
    const transfer_amount: string = this.transferAmountElt && this.transferAmountElt.nativeElement.value.toString().trim();
    const target_account: string = this.targetAccountElt && this.targetAccountElt.nativeElement.value.toString().trim();
    if (!transfer_amount || !target_account) {
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
      this.deploy_json = jsonPrettyPrint(result_json, this.verbosity);
      this.deploy_json && this.resultService.setResult(result_json);
    }
    return result;
  }

  async put_deploy() {
    const signed_deploy_as_string: string = this.deployJsonElt && this.deployJsonElt.nativeElement.value.toString().trim();
    if (!signed_deploy_as_string) {
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
    const signed_deploy_as_string: string = this.deployJsonElt && this.deployJsonElt.nativeElement.value.toString().trim();
    if (!signed_deploy_as_string) {
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
      return;
    }
    const signed_deploy_as_string: string = this.deployJsonElt && this.deployJsonElt.nativeElement.value.toString().trim();
    if (!signed_deploy_as_string) {
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
      console.error("Error parsing deploy");
    }
    if (!signed_deploy) {
      return;
    }
    signed_deploy = signed_deploy.sign(this.private_key);
    this.deploy_json = jsonPrettyPrint(signed_deploy.toJson(), this.verbosity);
    this.deployJsonElt.nativeElement.value = this.deploy_json;
  }

  async make_deploy() {
    const deploy_result = false;
    await this.deploy(deploy_result);
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

  async speculative_deploy() {
    const speculative = true;
    const deploy_result = !speculative;
    await this.deploy(deploy_result, speculative);
  }

  async call_entrypoint() {
    if (!this.public_key || !this.private_key) {
      return;
    }
    const deploy_params = new DeployStrParams(
      this.chain_name,
      this.public_key,
      this.private_key,
    );
    const session_params = this.get_session_params();
    const payment_amount: string = this.paymentAmountElt && this.paymentAmountElt.nativeElement.value.toString().trim();
    if (!payment_amount) {
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
      err && (this.error = err.toString());
    }
  }

  async query_contract_dict() {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    const dictionary_item_key: string = this.itemKeyElt && this.itemKeyElt.nativeElement.value.toString().trim();
    if (!dictionary_item_key) {
      return;
    }
    const contract_named_key: string = this.seedContractHashElt && this.seedContractHashElt.nativeElement.value.toString().trim();
    const dictionary_name: string = this.seedNameElt && this.seedNameElt.nativeElement.value.toString().trim();
    if (!dictionary_name) {
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
      err && (this.error = err.toString());
    }
  }

  async query_contract_key() {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    const key_as_string: string = this.queryKeyElt && this.queryKeyElt.nativeElement.value.toString().trim();
    if (!key_as_string) {
      return;
    }
    const path_as_string: string = this.queryPathElt && this.queryPathElt.nativeElement.value.toString().trim().replace(/^\/+|\/+$/g, '');
    const query_contract_key_options = this.sdk.query_contract_key_options({
      state_root_hash_as_string: state_root_hash || '',
      key_as_string,
      path_as_string,
    });
    try {
      const query_contract_key = await this.sdk.query_contract_key(query_contract_key_options);
      query_contract_key && this.resultService.setResult(query_contract_key.toJson());
    } catch (err) {
      err && (this.error = err.toString());
    }
  }

  async ngAfterViewInit() {
    this.networks = Object.entries(this.config['networks']).map(([name, network]) => ({
      name,
      ...network,
    }));
    const no_mark_for_check = true;
    try {
      const get_node_status = await this.get_node_status();
      if (get_node_status) {
        await this.get_state_root_hash(no_mark_for_check);
        this.action = 'get_node_status';
      }
    } catch (error) {
      console.error(error);
    }
    this.changeDetectorRef.markForCheck();
  }

  async onDeployFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    let text;
    if (file) {
      text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      try {
        const deploy_json = JSON.parse(text);
        this.deploy_json = jsonPrettyPrint(new Deploy(deploy_json).toJson(), this.verbosity);
      } catch {
        console.error("Error parsing deploy");
      }
    } else {
      this.deploy_json = '';
    }
    this.changeDetectorRef.markForCheck();
  }

  deployFileClick() {
    (this.deployFileElt.nativeElement as HTMLInputElement).click();
  }

  onPrivateKeyClick() {
    (this.privateKeyElt.nativeElement as HTMLInputElement).click();
  }

  onWasmClick() {
    (this.wasmElt.nativeElement as HTMLInputElement).click();
  }

  resetWasmClick() {
    this.wasmElt.nativeElement.value = '';
    this._wasm = undefined;
    this.file_name = '';
  }

  cleanResult() {
    this.error = '';
    this.resultService.setResult('');
  }

  async selectAction($event: Event) {
    this.cleanResult();
    const action = ($event.target as HTMLInputElement).value;
    await this.handleAction(action);
    this.changeDetectorRef.detectChanges();
  }

  async onWasmSelected(event: Event) {
    this.file_name = this.wasmElt?.nativeElement.value.split('\\').pop();
    const file = (event.target as HTMLInputElement).files?.item(0), buffer = await file?.arrayBuffer();
    this._wasm = buffer && new Uint8Array(buffer);
    const wasmBuffer = this._wasm?.buffer;
    if (!wasmBuffer) {
      this.resetWasmClick();
    }
  }

  async onPemSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      let text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      this.public_key = '';
      const public_key = privateToPublicKey(text);
      if (public_key) {
        this.public_key = public_key;
        this.private_key = text;
        this.has_private_key = true;
      }

    } else {
      this.private_key = '';
      this.has_private_key = false;
      this.privateKeyElt.nativeElement.value = '';
    }
    this.changeDetectorRef.markForCheck();
    setTimeout(async () => {
      await this.onPublicKeyChange();
    }, 0);
  }

  private async handleAction(action: string, exec?: boolean) {
    const fn = (this as any)[action];
    if (typeof fn === 'function') {
      if (exec) {
        await fn.bind(this).call();
      }
      this.action = action;
    } else {
      console.error(`Method ${action} is not defined on the component.`);
    }
  }

  motesToCSPR(elt: HTMLInputElement) {
    let amount: string = elt.value;
    if (!amount) {
      return;
    }
    amount = this.parse_commas(amount);
    elt.value = amount.toString();
    return motesToCSPR(amount);
  }

  private parse_commas(amount: string) {
    return amount.replace(/[,.]/g, '');
  }

  private getGlobalIdentifier(options: { global_state_identifier?: GlobalStateIdentifier; }) {
    const state_root_hash: string = this.stateRootHashElt && this.stateRootHashElt.nativeElement.value.toString().trim();
    let global_state_identifier!: GlobalStateIdentifier;
    if (state_root_hash) {
      global_state_identifier = GlobalStateIdentifier.fromStateRootHash(
        new Digest(state_root_hash)
      );
    } else {
      const block_identifier_height: string = this.blockIdentifierHeightElt && this.blockIdentifierHeightElt.nativeElement.value.toString().trim();
      const block_identifier_hash: string = this.blockIdentifierHashElt && this.blockIdentifierHashElt.nativeElement.value.toString().trim();
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

  private getIdentifieBlock(options: { maybe_block_id_as_string?: string; maybe_block_identifier?: BlockIdentifier; }) {
    const block_identifier_height: string = this.blockIdentifierHeightElt && this.blockIdentifierHeightElt.nativeElement.value.toString().trim();
    const block_identifier_hash: string = this.blockIdentifierHashElt && this.blockIdentifierHashElt.nativeElement.value.toString().trim();
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

  private get_session_params(): SessionStrParams {
    const session_params = new SessionStrParams();
    const entry_point: string = this.entryPointElt && this.entryPointElt.nativeElement.value.toString().trim();
    if (entry_point) {
      session_params.session_entry_point = entry_point;
    }
    const args_simple: [string] = this.argsSimpleElt && this.argsSimpleElt.nativeElement.value.toString()
      .trim()
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item !== '');
    const args_json: string = this.argsJsonElt && this.argsJsonElt.nativeElement.value.toString().trim();
    if (args_simple?.length) {
      session_params.session_args_simple = args_simple;
    }
    else if (args_json) {
      session_params.session_args_json = args_json;
    }
    const call_package: boolean = this.callPackageElt && this.callPackageElt.nativeElement.value as boolean;
    const session_hash: string = this.sessionHashElt && this.sessionHashElt.nativeElement.value.toString().trim();
    const session_name: string = this.sessionNameElt && this.sessionNameElt.nativeElement.value.toString().trim();
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
    if (this._wasm) {
      session_params.session_bytes = Bytes.fromUint8Array(this._wasm);
    }
    const version: string = this.versionElt && this.versionElt.nativeElement.value.toString().trim();
    if (version) {
      session_params.session_version = version;
    }
    return session_params;
  }

  changePort(peer: PeerEntry) {
    const address = peer.address.split(':');
    const new_address = ['http://', address.shift(), ':', '7777'].join('');
    return (new_address);
  }

  async copy(value: string) {
    this.resultService.copyClipboard(value);
  }

}
