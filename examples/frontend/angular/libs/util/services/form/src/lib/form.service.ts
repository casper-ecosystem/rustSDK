import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, StateService } from '@util/state';
import formFields from './form';
import { CONFIG, EnvironmentConfig } from '@util/config';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  form!: FormGroup;

  private state!: State;
  private action!: string;
  private has_wasm!: boolean;
  private select_dict_identifier!: string;

  constructor(
    @Inject(CONFIG) public readonly config: EnvironmentConfig,
    private readonly formBuilder: FormBuilder,
    private readonly stateService: StateService,
  ) {
    this.stateService.getState().subscribe((state: State) => {
      this.has_wasm = !!state?.has_wasm;
      state?.select_dict_identifier && (this.select_dict_identifier = state.select_dict_identifier);
      if (state?.action && this.action !== state.action) {
        state.action && (this.action = state.action);
        this.initializeForm();
      }
      state && (this.state = state);
      this.action && this.updateForm();
    });
    this.form = this.defaultForm;
  }

  private get defaultForm() {
    const formControlsConfig: { [key: string]: FormControl; } = {};
    formFields.forEach((fields) => {
      fields.forEach((row) => {
        row.forEach((field) => {
          const name = field.input?.controlName || field.textarea?.controlName || '';
          name && (formControlsConfig[name] = new FormControl());
          if (field.select?.options) {
            const select_dict_identifier = field.select?.options.find(option => option.default)?.value || '';
            this.stateService.setState({
              select_dict_identifier
            });
          }
        });
      });
    });
    return this.formBuilder.group(formControlsConfig);
  }

  private initializeForm() {
    Object.values(this.form.controls).forEach(control => {
      control.clearValidators();
      control.markAsPristine();
      control.disable();
    });
    const fields = this.action && formFields.get(this.action);
    if (fields) {
      fields.forEach((row) => {
        row.forEach((field) => {
          if (!field.input && !field.textarea) {
            return;
          }
          const name = field.input?.controlName || field.textarea?.controlName || '';
          const control = this.form.get(name);
          if (!control) { return; }
          const state = field.input?.state_name || field.textarea?.state_name || field.select?.state_name || [];
          const stateName = state && state.find(name => this.state[name as keyof State]);
          const defaultValue = stateName ? this.state[stateName as keyof State] : '';

          if (defaultValue) {
            defaultValue && control.setValue(defaultValue);
          } else if (field.input?.config_name) {
            const defaultValue = this.config[field.input?.config_name as string] || '';
            defaultValue && control.setValue(defaultValue);
            defaultValue && (field.input.placeholder_config_value = defaultValue as string);
          }

          control.enable();
          if (field.required) {
            field.input && (field.input.required = true);
            field.textarea && (field.textarea.required = true);
            control.setValidators([Validators.required]);
          }
        });
      });
    }
  }

  updateForm() {
    const fields = this.action && formFields.get(this.action);
    if (!fields) {
      return;
    }
    const disabledTargets: string[] = [];
    fields.forEach((row) => {
      row.forEach(({ input, textarea }) => {
        const name = input?.controlName || textarea?.controlName;
        if (!name) {
          return;
        }
        const control = this.form.get(name);
        if (!control) {
          return;
        }

        if (textarea) {
          const state = textarea?.state_name || [];
          const stateName = state && state.find(name => this.state[name as keyof State]);
          const updateValue = stateName ? this.state[stateName as keyof State] : '';
          control.setValue(updateValue);
        }
        else if (input && input.enabled_when) {
          if (this.select_dict_identifier && !input.enabled_when?.includes(this.select_dict_identifier)) {
            control.disable();
          } else if (this.select_dict_identifier) {
            control.enable();
          }
        }
        else if (input && input.disabled_when) {
          const fieldName: string = control.value && input.disabled_when?.find(field => field.includes('value'));
          const targetControlName = fieldName && fieldName.split('.')[0];
          const targetControl = targetControlName && this.form?.get(targetControlName);
          if (targetControl) {
            targetControl.disable();
            disabledTargets.push(targetControlName);
          }
          if (this.has_wasm && input?.disabled_when?.includes('has_wasm')) {
            control.reset();
            control.disable();
          } else if (!disabledTargets.includes(input.controlName)) {
            control.enable();
          }
        }
      });
    });
  }

  get formFields() {
    return formFields;
  }

}
