import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { State, StateService } from '@util/state';

@Component({
  selector: 'comp-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusComponent implements AfterViewInit, OnDestroy {
  account_hash!: string;
  main_purse!: string;
  state_root_hash!: string;

  @Output() get_state_root_hash_output: EventEmitter<boolean> = new EventEmitter<boolean>();

  private stateSubscription!: Subscription;

  constructor(
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      state.account_hash && (this.account_hash = state.account_hash);
      state.main_purse && (this.main_purse = state.main_purse);
      state.state_root_hash && (this.state_root_hash = state.state_root_hash);
      state && this.changeDetectorRef.markForCheck();
    });
  }

  async ngAfterViewInit() {
    this.setStateSubscription();
  }


  get_state_root_hash() {
    const no_mark_for_check = true;
    this.get_state_root_hash_output.emit(no_mark_for_check);
  }
}
