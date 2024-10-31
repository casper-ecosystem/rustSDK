import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State, StateService } from '@util/state';
import formFields, { option } from './form';
import { CONFIG, EnvironmentConfig } from '@util/config';
import { StorageService } from '@util/storage';
import { PricingMode } from 'casper-sdk';

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
    private readonly storageService: StorageService,
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
        row.forEach(({ input, textarea, select }) => {
          const name = input?.controlName || textarea?.controlName || select?.controlName || '';
          name && (formControlsConfig[name] = new FormControl(this.getDefaultOptionValue(select?.options)));
          if (select?.options && name === 'selectDictIdentifier') {
            const select_dict_identifier = select?.options.find(option => option.default)?.value || '';
            this.stateService.setState({
              select_dict_identifier
            });
          }
        });
      });
    });
    return this.formBuilder.group(formControlsConfig);
  }

  private getDefaultOptionValue(options: option[] | undefined): string | null {
    const defaultOption = options && options.find(option => option.default);
    return defaultOption ? defaultOption.value : null;
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
        row.forEach(({ input, textarea, select, required }) => {
          if (!input && !textarea && !select) {
            return;
          }
          const name = input?.controlName || textarea?.controlName || select?.controlName || '';
          const control = this.form.get(name);
          if (!control) { return; }
          const state = input?.state_name || textarea?.state_name || select?.state_name || [];
          const stateName = state && state.find(name => this.state[name as keyof State]);
          const storageName = input?.storage_name || textarea?.storage_name || select?.storage_name || "";
          let defaultValue = stateName ? this.state[stateName as keyof State] : '';
          defaultValue = storageName ? this.storageService.get(storageName as keyof State) : defaultValue;

          if (defaultValue) {
            defaultValue && control.setValue(defaultValue);
          } else if (input?.config_name) {
            const defaultValue = this.config[input?.config_name as string] || '';
            defaultValue && control.setValue(defaultValue);
            defaultValue && (input.placeholder_config_value = defaultValue as string);
          }
          control.enable();
          if (required) {
            input && (input.required = true);
            textarea && (textarea.required = true);
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
      row.forEach(({ input, textarea, select }) => {
        const name = input?.controlName || textarea?.controlName || select?.controlName || '';
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
          updateValue && control.setValue(updateValue);

          if (textarea.disabled_when) {
            const fieldName: string = control.value && textarea.disabled_when?.find(field => field.includes('value'));
            const targetControlName = fieldName && fieldName.split('.')[0];
            const targetControl = targetControlName && this.form?.get(targetControlName);
            if (targetControl) {
              targetControl.disable();
              disabledTargets.push(targetControlName);
            }
            if (!disabledTargets.includes(textarea.controlName)) {
              control.enable();
            }
          }

        }
        else if (select && select.enabled_when) {
          if (this.has_wasm && select.enabled_when?.includes('has_wasm')) {
            control.enable();
          } else {
            control.disable();
          }
        }
        else if (input) {
          const state = input?.state_name || [];
          const stateName = state && state.find(name => this.state[name as keyof State]);
          const updateValue = stateName ? this.state[stateName as keyof State] : '';
          updateValue && control.setValue(updateValue);

          if (input.enabled_when) {
            if (this.action === 'get_dictionary_item' &&
              this.select_dict_identifier && !input.enabled_when?.includes(this.select_dict_identifier)) {
              control.disable();
            } else if (this.select_dict_identifier) {
              control.enable();
            }
          }
          else if (input.disabled_when) {
            const fieldName: string = control.value && input.disabled_when?.find(field => field.includes('value'));
            const targetControlName = fieldName && fieldName.split('.')[0];
            console.log(targetControlName);
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
            const fixedPricingMode = (PricingMode[this.state.pricing_mode as unknown as PricingMode] as unknown as number === PricingMode.Classic);
            if (input?.disabled_when?.includes('fixedPricingMode') && fixedPricingMode) {
              control.reset();
              control.disable();
            }
          }
        }
        if (input || textarea) {
          const storageName = input?.storage_name || textarea?.storage_name || "";
          storageName && this.storageService.setState({
            [storageName]: control.value
          });
        }
      });
    });
  }

  get formFields() {
    return formFields;
  }

}
