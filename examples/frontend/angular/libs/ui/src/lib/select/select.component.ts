import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputField } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { State, StateService } from '@util/state';
import { Subscription } from 'rxjs';
import { PricingMode } from 'casper-sdk';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements AfterViewInit, OnDestroy {
  @Input() inputField!: InputField;
  @Input() parentForm!: FormGroup;
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;

  select_dict_identifier!: string;

  private stateSubscription!: Subscription;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  async ngAfterViewInit() {
    this.setStateSubscription();
  }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      setTimeout(() => {
        state.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
        this.changeDetectorRef.markForCheck();
      });
    });
  }


  onChange($event: Event) {
    const value = ($event.target as HTMLInputElement)?.value;
    const name = ($event.target as HTMLInputElement)?.name;
    if (name === 'select_dict_identifier') {
      this.stateService.setState({
        select_dict_identifier: value
      });
    }
    if (name === 'pricing_mode') {
      this.stateService.setState({
        pricing_mode: PricingMode[value as unknown as number].toString()
      });
    }
  }

}
