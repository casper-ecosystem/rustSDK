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
    private readonly binaryService: BinaryService,
    private readonly resultService: ResultService,
    private readonly stateService: StateService,
    private readonly formService: FormService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
  ) { }

  public async ngOnInit(): Promise<void> {
    console.info(this.sdk);
  }

  public ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.action && (this.action = state.action);
    });
  }

  public async ngAfterViewInit() {
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

  public async submitAction(action: string) {
    await this.cleanResult();
    const exec = true;
    if (this.form.disabled || this.form.valid) {
      await this.handleAction(action, exec);
    }
  }

  async walletSign(_$event: Event, _action: string) {
    this.clientService.wallet_sign_deploy();
  }

  private async handleAction(action: string, exec = false) {
    const resolveMethod = (obj: unknown) =>
      (obj as { [key: string]: () => Promise<void>; })[action]?.bind(obj);

    const fn = resolveMethod(this) || resolveMethod(this.clientService) || resolveMethod(this.binaryService);

    if (fn && typeof fn === 'function') {
      if (exec) {
        try {
          await fn();
        } catch (error) {
          console.log(this.errorService);
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
    return await this.clientService.deploy(deploy_result, speculative, this.wasm);
  }

  private async transaction(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transaction(deploy_result, speculative, this.wasm);
  }

  private async get_account(account_identifier_param: string) {
    return await this.clientService.get_account(account_identifier_param);
  }

  private async get_entity(entity_identifier_param: string) {
    return await this.clientService.get_entity(entity_identifier_param);
  }

  public async get_state_root_hash(no_mark_for_check?: boolean) {
    const state_root_hash = await this.clientService.get_state_root_hash(no_mark_for_check);
    this.stateService.setState({
      state_root_hash
    });
    return state_root_hash;
  }

  private async transfer(deploy_result = true, speculative?: boolean) {
    return await this.clientService.transfer(deploy_result, speculative);
  }

  private async transfer_transaction(transaction_result = true, speculative?: boolean) {
    return await this.clientService.transfer_transaction(transaction_result, speculative);
  }
}
