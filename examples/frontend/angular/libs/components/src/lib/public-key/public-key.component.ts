import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State, StateService } from '@util/state';
import { Subscription } from 'rxjs';
import { ClientService } from '@util/client';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { StorageService } from '@util/storage';

@Component({
  selector: 'comp-public-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-key.component.html',
  styleUrls: ['./public-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicKeyComponent implements AfterViewInit, OnDestroy {

  public_key!: string;
  private_key!: string;
  action!: string;

  @ViewChild('publicKeyElt') publicKeyElt!: ElementRef;

  private stateSubscription!: Subscription;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly clientService: ClientService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  async ngAfterViewInit() {
    this.setStateSubscription();
    this.public_key = this.storageService.get('public_key') || this.public_key;
    if (this.public_key) {
      await this.updateAccount();
      this.stateService.setState({
        public_key: this.public_key
      });
    }
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(async (state: State) => {
      state.action && (this.action = state.action);
      if (state.public_key && this.public_key != state.public_key) {
        state.public_key && (this.public_key = state.public_key);
        state.private_key && (this.private_key = state.private_key);
        await this.updateAccount();
      } else if (state.public_key) {
        state.public_key && (this.public_key = state.public_key);
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  async onPublicKeyChange() {
    const public_key: string = this.publicKeyElt && this.publicKeyElt.nativeElement.value.toString().trim();
    this.public_key = '';
    const private_key = '';
    this.stateService.setState({
      public_key,
      private_key
    });
    this.storageService.setState({
      public_key
    });

  }

  isInvalid(): boolean {
    if (this.config['action_needs_public_key'] && !(this.config['action_needs_public_key'] as Array<string>)?.includes(this.action)) {
      return false;
    }
    return !(this.publicKeyElt?.nativeElement.value?.trim() ?? '');
  }

  private async updateAccount() {
    const get_account = await this.clientService.get_account(this.public_key);
    if (!get_account.account) {
      return;
    }
    const account_hash = get_account?.account?.account_hash;
    const main_purse = get_account?.account?.main_purse;
    this.stateService.setState({
      account_hash,
      main_purse
    });
    this.storageService.setState({
      account_hash,
      main_purse
    });
  }
}
