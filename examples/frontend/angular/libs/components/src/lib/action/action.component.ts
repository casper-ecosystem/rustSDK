import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SDK } from 'casper-sdk';
import { SDK_TOKEN } from '@util/wasm';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';

@Component({
  selector: 'comp-action',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements AfterViewInit, OnDestroy {

  sdk_methods!: string[];
  sdk_rpc_methods!: string[];
  sdk_contract_methods!: string[];
  sdk_deploy_methods!: string[];
  sdk_deploy_utils_methods!: string[];
  action!: string;

  @Output() select_action: EventEmitter<string> = new EventEmitter<string>();

  private stateSubscription!: Subscription;

  constructor(
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngAfterViewInit(): Promise<void> {
    this.sdk_methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this.sdk))
      .filter(name => typeof (this.sdk as any)[name] === 'function')
      .filter(name => !['free', 'constructor', '__destroy_into_raw', 'getNodeAddress', 'setNodeAddress', 'getVerbosity', 'setVerbosity', 'watchDeploy', 'waitDeploy'].includes(name))
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
    this.setStateSubscription();
  };

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }

  selectAction($event: Event) {
    const action = ($event.target as HTMLInputElement).value;
    this.select_action.emit(action);
  }
}
