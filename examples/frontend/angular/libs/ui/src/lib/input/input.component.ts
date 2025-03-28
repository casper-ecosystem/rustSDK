import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService, InputField } from '@util/form';
import { motesToCSPR } from 'casper-rust-wasm-sdk';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() inputField!: InputField;
  @Input() parentForm!: FormGroup;
  @ViewChild('template', { static: true }) template!: TemplateRef<never>;
  @Input() hidden_when_disabled!: boolean;

  constructor(private readonly formService: FormService) {}

  onChange(inputField: InputField) {
    const control = this.parentForm?.get(inputField.controlName);
    const fieldName =
      control &&
      inputField.disabled_when?.find((field) => field.includes('value'));
    fieldName && this.formService.updateForm();
  }

  isInvalid(controlName: string): boolean {
    const control = this.parentForm?.get(controlName);
    return (
      !!control?.enabled &&
      !!control?.dirty &&
      !control?.value &&
      !control?.valid
    );
  }

  isRequired(inputField: InputField): boolean {
    const control = this.parentForm?.get(inputField.controlName);
    return (
      !!control?.enabled &&
      !control?.dirty &&
      !control?.value &&
      !!inputField.required
    );
  }

  motesToCSPR(amount: string) {
    if (!amount) {
      return;
    }
    amount = this.parse_commas(amount);
    return motesToCSPR(amount);
  }

  private parse_commas(amount: string) {
    return amount.replace(/[,.]/g, '');
  }
}
