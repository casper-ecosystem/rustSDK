import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { CONFIG, ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN } from '@util/wasm';
import { SDK, PeerEntry } from "casper-sdk";
import { ResultComponent, HeaderComponent, ErrorComponent, StatusComponent, ActionComponent, SubmitActionComponent, PublicKeyComponent, SecretKeyComponent, FormComponent } from '@components';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';
import { ResultService } from '@util/result';
import { ClientService } from '@util/client';
import { FormService } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorService } from '@util/error';
import { StorageService } from '@util/storage';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  FormComponent,
  ResultComponent,
  HeaderComponent,
  ErrorComponent,
  StatusComponent,
  ActionComponent,
  SubmitActionComponent,
  PublicKeyComponent,
  SecretKeyComponent,
];

@Component({
  standalone: true,
  imports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  action!: string;
  peers!: PeerEntry[];
  form: FormGroup = this.formService.form;

  @ViewChild('selectDictIdentifierElt') selectDictIdentifierElt!: ElementRef;

  private wasm!: Uint8Array | undefined;
  private stateSubscription!: Subscription;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly clientService: ClientService,
    private readonly resultService: ResultService,
    private readonly stateService: StateService,
    private readonly formService: FormService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
  ) { }

  async ngOnInit(): Promise<void> {
    console.info(this.sdk);
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.action && (this.action = state.action);
    });
  }

  async ngAfterViewInit() {
    const no_mark_for_check = true;
    const action = this.storageService.get('action') || this.config['default_action'].toString();
    try {
      if (action == this.config['default_action'].toString()) {
        await this.handleAction(action, true);
      }
      await this.get_state_root_hash(no_mark_for_check);

    } catch (error) {
      console.error(error);
      this.errorService.setError(error as string);
    }
    this.stateService.setState({
      action
    });
    this.setStateSubscription();
  }

  async selectAction(action: string) {
    await this.cleanResult();
    this.stateService.setState({
      action
    });
    await this.handleAction(action);
    this.storageService.setState({
      action
    });
  }

  async submitAction(action: string) {
    await this.cleanResult();
    const exec = true;
    if (this.form.disabled || this.form.valid) {
      await this.handleAction(action, exec);
    }
  }

  async walletSign(_$event: Event, action: string) {
    console.log(action);
    this.clientService.wallet_sign_deploy();
  }

  private async handleAction(action: string, exec?: boolean) {
    const fn = (this as unknown as { [key: string]: () => Promise<void>; })[action];
    if (fn && typeof fn === 'function') {
      if (exec) {
        try {
          await fn.bind(this)();
        }
        catch (error) {
          this.errorService.setError(error as string);
        }
      }
    } else {
      const error = `Method ${action} is not defined on the component.`;
      console.error(error);
      this.errorService.setError(error as string);
    }
  }

  async onWasmSelected(wasm: Uint8Array) {
    wasm && (this.wasm = wasm);
  }

  private async cleanResult() {
    this.errorService.setError('');
    await this.resultService.setResult('');
  }

  private async call_entrypoint_deploy() {
    return await this.clientService.call_entrypoint_deploy();
  }

  private async call_entrypoint() {
    return await this.clientService.call_entrypoint();
  }

  private async deploy(deploy_result = true, speculative?: boolean) {
    return await this.clientService.deploy(deploy_result, speculative, this.wasm);
  }

  private async transaction(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transaction(deploy_result, speculative, this.wasm);
  }

  private async get_account(account_identifier_param: string) {
    return await this.clientService.get_account(account_identifier_param);
  }

  private async get_auction_info() {
    return await this.clientService.get_auction_info();
  }

  private async get_balance() {
    return await this.clientService.get_balance();
  }

  private async get_block() {
    return await this.clientService.get_block();
  }

  private async get_block_transfers() {
    return await this.clientService.get_block_transfers();
  }

  private async get_chainspec() {
    return await this.clientService.get_chainspec();
  }

  private async get_deploy() {
    return await this.clientService.get_deploy();
  }

  private async get_transaction() {
    return await this.clientService.get_transaction();
  }


  private async get_dictionary_item() {
    return await this.clientService.get_dictionary_item();
  }

  private async get_entity(entity_identifier_param: string) {
    return await this.clientService.get_entity(entity_identifier_param);
  }

  private async get_era_info() {
    return await this.clientService.get_era_info();
  }

  private async get_era_summary() {
    return await this.clientService.get_era_summary();
  }

  private async get_node_status() {
    return await this.clientService.get_node_status();
  }

  private async get_peers() {
    this.peers = await this.clientService.get_peers();
    return this.peers;
  }

  async get_state_root_hash(no_mark_for_check?: boolean) {
    const state_root_hash = await this.clientService.get_state_root_hash(no_mark_for_check);
    this.stateService.setState({
      state_root_hash
    });
    return state_root_hash;
  }

  private async get_validator_changes() {
    return await this.clientService.get_validator_changes();
  }

  private async install_deploy() {
    return await this.clientService.install_deploy(this.wasm);
  }

  private async install() {
    return await this.clientService.install(this.wasm);
  }

  private async list_rpcs() {
    return await this.clientService.list_rpcs();
  }

  private async make_deploy() {
    return await this.clientService.make_deploy(this.wasm);
  }

  private async make_transaction() {
    return await this.clientService.make_transaction(this.wasm);
  }

  private async make_transfer() {
    return await this.clientService.make_transfer();
  }

  private async make_transfer_transaction() {
    return await this.clientService.make_transfer_transaction();
  }

  private async put_deploy() {
    return await this.clientService.put_deploy();
  }

  private async put_transaction() {
    return await this.clientService.put_transaction();
  }

  private async query_balance() {
    return await this.clientService.query_balance();
  }

  private async query_balance_details() {
    return await this.clientService.query_balance_details();
  }

  private async query_contract_dict() {
    return await this.clientService.query_contract_dict();
  }

  private async query_contract_key() {
    return await this.clientService.query_contract_key();
  }

  private async query_global_state() {
    return await this.clientService.query_global_state();
  }

  private async sign_deploy() {
    return await this.clientService.sign_deploy();
  }

  private async sign_transaction() {
    return await this.clientService.sign_transaction();
  }

  private async speculative_deploy() {
    return await this.clientService.speculative_deploy(this.wasm);
  }

  private async speculative_transaction() {
    return await this.clientService.speculative_transaction(this.wasm);
  }

  private async speculative_exec_deploy() {
    return await this.clientService.speculative_exec_deploy();
  }

  private async speculative_exec() {
    return await this.clientService.speculative_exec();
  }

  private async speculative_transfer() {
    return await this.clientService.speculative_transfer();
  }

  private async speculative_transfer_transaction() {
    return await this.clientService.speculative_transfer_transaction();
  }

  private async transfer(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transfer(deploy_result, speculative);
  }

  private async transfer_transaction(transaction_result = true, speculative?: boolean) {
    return await this.clientService.transfer_transaction(transaction_result, speculative);
  }
}
