import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { State, StateService } from '@util/state';
import { publicKeyFromSecretKey } from 'casper-rust-wasm-sdk';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { Subscription } from 'rxjs';
import { ErrorService } from '@util/error';
import { StorageService } from '@util/storage';

@Component({
  selector: 'comp-secret-key',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secret-key.component.html',
  styleUrls: ['./secret-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecretKeyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('secretKeyElt') secretKeyElt!: ElementRef;

  private stateSubscription!: Subscription;
  secret_key?: string;
  action!: string;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  async ngAfterViewInit() {
    this.setStateSubscription();
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService
      .getState()
      .subscribe(async (state: State) => {
        state.action && (this.action = state.action);
        this.changeDetectorRef.markForCheck();
      });
  }

  onSecretKeyClick() {
    (this.secretKeyElt.nativeElement as HTMLInputElement).click();
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
      this.errorService.setError('');
      try {
        public_key = publicKeyFromSecretKey(text);
      } catch (err) {
        this.errorService.setError(err as string);
      }
      if (public_key) {
        this.secret_key = text;
      }
    } else {
      this.secret_key = '';
    }

    this.stateService.setState({
      public_key,
      secret_key: this.secret_key,
    });

    this.storageService.setState({
      public_key,
    });

    this.secretKeyElt.nativeElement.value = '';

    this.changeDetectorRef.markForCheck();
  }

  isInvalid(): boolean {
    if (
      this.config['action_needs_secret_key'] &&
      !(this.config['action_needs_secret_key'] as Array<string>)?.includes(
        this.action,
      )
    ) {
      return false;
    }
    return !this.secret_key;
  }
}
