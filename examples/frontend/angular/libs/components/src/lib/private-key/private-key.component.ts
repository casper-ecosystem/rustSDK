import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State, StateService } from '@util/state';
import { privateToPublicKey } from 'casper-sdk';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { Subscription } from 'rxjs';
import { ErrorService } from '@util/error';
import { StorageService } from '@util/storage';

@Component({
  selector: 'comp-private-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-key.component.html',
  styleUrls: ['./private-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateKeyComponent implements AfterViewInit, OnDestroy {

  @ViewChild('privateKeyElt') privateKeyElt!: ElementRef;

  private stateSubscription!: Subscription;
  private_key?: string;
  action!: string;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  async ngAfterViewInit() {
    this.setStateSubscription();
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe(async (state: State) => {
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }

  onPrivateKeyClick() {
    (this.privateKeyElt.nativeElement as HTMLInputElement).click();
  }

  async onPemSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    let public_key = '';
    if (file) {
      let text = await file.text();
      if (!text.trim()) {
        return;
      }
      text = text.trim();
      this.errorService.setError("");
      try {
        public_key = privateToPublicKey(text);
      } catch (err) {
        this.errorService.setError(err as string);
      }
      if (public_key) {
        this.private_key = text;
      }

    } else {
      this.private_key = '';
    }

    this.stateService.setState({
      public_key,
      private_key: this.private_key
    });

    this.storageService.setState({
      public_key,
    });

    this.privateKeyElt.nativeElement.value = '';

    this.changeDetectorRef.markForCheck();
  }

  isInvalid(): boolean {
    if (this.config['action_needs_private_key'] && !(this.config['action_needs_private_key'] as Array<string>)?.includes(this.action)) {
      return false;
    }
    return !this.private_key;
  }

}
