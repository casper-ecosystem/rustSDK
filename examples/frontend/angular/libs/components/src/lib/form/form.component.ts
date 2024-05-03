import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent, SelectComponent, TextareaComponent } from '@util/ui';
import { SubmitWasmComponent } from '../submit-wasm/submit-wasm.component';
import { SubmitFileComponent } from '../submit-file/submit-file.component';
import { FormService, InputContainer } from '@util/form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { State, StateService } from '@util/state';
import { Subscription } from 'rxjs';
import { Deploy, Verbosity, jsonPrettyPrint } from 'casper-sdk';
import { CONFIG, EnvironmentConfig } from '@util/config';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  InputComponent,
  SubmitWasmComponent,
  SubmitFileComponent,
  TextareaComponent,
  SelectComponent
];

@Component({
  selector: 'comp-form',
  standalone: true,
  imports,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements AfterViewInit, OnDestroy {

  @Input() form!: FormGroup<any>;
  action!: string;
  formFields: Map<string, InputContainer[][]> = this.formService.formFields;

  @Output() wasm_selected: EventEmitter<Uint8Array> = new EventEmitter<Uint8Array>();

  private stateSubscription!: Subscription;
  private verbosity = this.config['verbosity'];

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly formService: FormService,
    private readonly stateService: StateService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnDestroy() {
    this.stateSubscription && this.stateSubscription.unsubscribe();
  }

  async ngAfterViewInit() {
    this.setStateSubscription();
  }

  private setStateSubscription() {
    this.stateSubscription = this.stateService.getState().subscribe((state: State) => {
      console.log(state);
      state.action && (this.action = state.action);
      this.changeDetectorRef.markForCheck();
    });
  }

  async onWasmSelected(wasm: Uint8Array | undefined) {
    wasm && this.wasm_selected.emit(wasm);
    this.stateService.setState({
      has_wasm: !!wasm
    });
  }

  async onDeployFileSelected(deploy_json: string) {
    deploy_json = deploy_json && jsonPrettyPrint(new Deploy(deploy_json).toJson(), this.verbosity as Verbosity);
    console.log(deploy_json);
    deploy_json && this.stateService.setState({
      deploy_json
    });
  }

}
