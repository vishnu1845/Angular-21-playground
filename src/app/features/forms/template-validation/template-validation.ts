import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-validation',
  imports: [FormsModule],
  templateUrl: './template-validation.html',
  styleUrl: './template-validation.scss',
})
export class TemplateValidation {
  user = { email: '', password: '' };
  showPassword = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    console.log('form.value →', form.value);
    form.resetForm();
  }
}