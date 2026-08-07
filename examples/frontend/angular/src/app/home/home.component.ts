import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CONFIG, ENV, EnvironmentConfig } from '@util/config';
import { SDK_TOKEN } from '@util/wasm';
import { SDK, PeerEntry, Transaction } from 'casper-rust-wasm-sdk';
import {
  ResultComponent,
  HeaderComponent,
  ErrorComponent,
  StatusComponent,
  ActionComponent,
  SubmitActionComponent,
  PublicKeyComponent,
  SecretKeyComponent,
  FormComponent,
} from '@components';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';
import { ResultService } from '@util/result';
import { ClientService } from '@util/client';
import { FormService } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorService } from '@util/error';
import { StorageService } from '@util/storage';
import { BinaryService } from '@util-binary';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  action!: string;
  peers!: PeerEntry[];
  form: FormGroup = this.formService.form;

  @ViewChild('selectDictIdentifierElt') selectDictIdentifierElt!: ElementRef;

  private wasm!: Uint8Array | undefined;
  private stateSubscription!: Subscription;
  private bootstrapGeneration = 0;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    @Inject(ENV) public readonly env: EnvironmentConfig,
    private readonly clientService: ClientService,
    private readonly binaryService: BinaryService,
    private readonly resultService: ResultService,
    private readonly stateService: StateService,
    private readonly formService: FormService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
  ) {
    this.setStateSubscription();
  }

  public ngOnInit(): void {
    console.info(this.sdk);
    const action =
      this.storageService.get('action') ||
      this.config['default_action'].toString();
    this.action = action;
    this.stateService.setState({
      action,
      status_loading: true,
    });
  }

  public ngOnDestroy() {
    this.bootstrapGeneration++;
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService
      .getState()
      .subscribe((state: State) => {
        state.action && (this.action = state.action);
      });
  }

  public ngAfterViewInit() {
    const action =
      this.action ||
      this.storageService.get('action') ||
      this.config['default_action'].toString();
    void this.bootstrapChainStatus(action);
  }

  private async bootstrapChainStatus(action: string) {
    const generation = ++this.bootstrapGeneration;
    const no_mark_for_check = true;
    try {
      if (action == this.config['default_action'].toString()) {
        const get_node_status = await this.sdk.get_node_status();
        if (generation !== this.bootstrapGeneration) {
          return;
        }
        if (get_node_status) {
          await this.resultService.setResult(get_node_status.toJson());
        }
      }
      if (generation !== this.bootstrapGeneration) {
        return;
      }
      await this.get_state_root_hash(no_mark_for_check);
    } catch (error) {
      if (generation === this.bootstrapGeneration) {
        console.error(error);
        this.errorService.setError(error as string);
      }
    } finally {
      if (generation === this.bootstrapGeneration) {
        this.stateService.setState({
          status_loading: false,
        });
      }
    }
  }

  async selectAction(action: string) {
    this.bootstrapGeneration++;
    this.stateService.setState({
      action,
      status_loading: false,
    });
    await this.cleanResult();
    await this.handleAction(action);
    this.storageService.setState({
      action,
    });
  }

  public async submitAction(action: string) {
    await this.cleanResult();
    const exec = true;
    if (this.form.disabled || this.form.valid) {
      await this.handleAction(action, exec);
      return;
    }
    this.errorService.setError('form is invalid');
  }

  async walletSign(_$event: Event, action: string) {
    if (action === 'sign_transaction') {
      await this.clientService.wallet_sign_transaction();
      return;
    }
    await this.clientService.wallet_sign_deploy();
  }

  private async handleAction(action: string, exec = false) {
    const resolveMethod = (obj: unknown) =>
      (obj as { [key: string]: () => Promise<void> })[action]?.bind(obj);

    const fn =
      resolveMethod(this) ||
      resolveMethod(this.clientService) ||
      resolveMethod(this.binaryService);

    if (fn && typeof fn === 'function') {
      if (exec) {
        try {
          await fn();
        } catch (error) {
          this.errorService.setError(error as string);
        }
      }
    } else {
      const error = `Method ${action} is not defined on the component or clientService.`;
      console.error(error);
      this.errorService.setError(error);
    }
  }

  async onWasmSelected(wasm: Uint8Array) {
    wasm && (this.wasm = wasm);
  }

  private async cleanResult() {
    this.errorService.setError('');
    await this.resultService.setResult('');
  }

  private async deploy(deploy_result = true, speculative?: boolean) {
    return await this.clientService.deploy(
      deploy_result,
      speculative,
      this.wasm,
    );
  }

  private async transaction(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transaction(
      deploy_result,
      speculative,
      this.wasm,
    );
  }

  private async get_account(account_identifier_param: string) {
    return await this.clientService.get_account(account_identifier_param);
  }

  private async get_entity(entity_identifier_param: string) {
    return await this.clientService.get_entity(entity_identifier_param);
  }

  public async get_state_root_hash(no_mark_for_check?: boolean) {
    const state_root_hash =
      await this.clientService.get_state_root_hash(no_mark_for_check);
    this.stateService.setState({
      state_root_hash,
    });
    return state_root_hash;
  }

  private async transfer(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transfer(deploy_result, speculative);
  }

  private async transfer_transaction(
    transaction_result = true,
    speculative?: boolean,
  ) {
    return await this.clientService.transfer_transaction(
      transaction_result,
      speculative,
    );
  }

  private async get_binary_try_accept_transaction() {
    let transaction = (await this.clientService.transaction(
      false,
      false,
      this.wasm,
    )) as Transaction;
    return await this.binaryService.get_binary_try_accept_transaction(
      transaction,
    );
  }

  private async get_binary_try_speculative_execution() {
    let transaction = (await this.clientService.transaction(
      false,
      true,
      this.wasm,
    )) as Transaction;
    return await this.binaryService.get_binary_try_speculative_execution(
      transaction,
    );
  }

  private async install_deploy() {
    return await this.clientService.install_deploy(this.wasm);
  }

  private async install() {
    return await this.clientService.install(this.wasm);
  }

  private async make_deploy() {
    return await this.clientService.make_deploy(this.wasm);
  }

  private async make_transaction() {
    return await this.clientService.make_transaction(this.wasm);
  }

  private async speculative_deploy() {
    return await this.clientService.speculative_deploy(this.wasm);
  }

  private async speculative_transaction() {
    return await this.clientService.speculative_transaction(this.wasm);
  }
}
