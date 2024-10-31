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
  sdk_deprecated!: string[];
  sdk_deploy_methods!: string[];
  sdk_deploy_utils_methods!: string[];
  sdk_transaction_methods!: string[];
  sdk_transaction_utils_methods!: string[];
  sdk_binary_methods!: string[];
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
      .filter(name => !['free', 'constructor', '__destroy_into_raw', 'getRPCAddress', 'setRPCAddress', 'getNodeAddress', 'setNodeAddress', 'getVerbosity', 'setVerbosity', 'watchDeploy', 'waitDeploy'].includes(name))
      .filter(name => !name.endsWith('_options'))
      .filter(name => !name.startsWith('chain_'))
      .filter(name => !name.startsWith('state_'))
      .filter(name => !name.startsWith('info_'))
      .filter(name => !name.startsWith('account_'))
      .filter(name => !name.startsWith('wait'))
      .filter(name => !name.startsWith('watch'))
      .sort();

    this.sdk_deploy_methods = this.sdk_methods.filter(name => ['deploy', 'speculative_deploy', 'speculative_transfer', 'transfer'].includes(name));
    this.sdk_deploy_utils_methods = this.sdk_methods.filter(name => ['make_deploy', 'make_transfer', 'sign_deploy', 'put_deploy', 'call_entrypoint_deploy', 'install_deploy'].includes(name));

    this.sdk_transaction_methods = this.sdk_methods.filter(name => ['transaction', 'speculative_transaction', 'speculative_transfer_transaction', 'transfer_transaction'].includes(name));
    this.sdk_transaction_utils_methods = this.sdk_methods.filter(name => ['make_transaction', 'make_transfer_transaction', 'sign_transaction', 'put_transaction', 'call_entrypoint', 'install', 'query_contract_dict', 'query_contract_key'].includes(name));

    this.sdk_deprecated = this.sdk_methods.filter(name => ['get_account', 'get_deploy', 'get_era_info', 'put_deploy', 'speculative_exec_deploy', 'sign_deploy', 'make_deploy', 'make_transfer', 'speculative_deploy', 'speculative_transfer', 'deploy', 'transfer', 'call_entrypoint_deploy', 'install_deploy', 'get_balance'].includes(name));

    this.sdk_binary_methods = this.sdk_methods.filter(name => name.startsWith('get_binary'));

    const baseMethodsSet = new Set();
    const rejectedMethodsSet = new Set();
    this.sdk_binary_methods = [...new Set(
      this.sdk_binary_methods.filter(name => {
        if (name.endsWith('_hash') || name.endsWith('_height') || name.endsWith('_era') || name.endsWith('_state_root_hash')) {
          rejectedMethodsSet.add(name);
          const baseMethod = name.slice(0, name.lastIndexOf('_'));
          baseMethodsSet.add(baseMethod.replace('_by', '').replace('_block', ''));
          return false;
        }
        return true;
      })
    )];

    // Convert the Set to an array and add the base methods to the final sdk_binary_methods
    this.sdk_binary_methods = [...this.sdk_binary_methods, ...Array.from(baseMethodsSet) as string[]];

    // Remove duplicates again to avoid any conflicts
    this.sdk_binary_methods = [...new Set(this.sdk_binary_methods.sort())];

    this.sdk_rpc_methods = this.sdk_methods.filter(name =>
      ![
        ...this.sdk_binary_methods,
        ...Array.from(rejectedMethodsSet),
        ...this.sdk_deploy_methods,
        ...this.sdk_deploy_utils_methods,
        ...this.sdk_transaction_utils_methods,
        ...this.sdk_transaction_methods,
      ].includes(name)
    );
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
