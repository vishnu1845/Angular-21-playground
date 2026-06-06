import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

function mustBeTrue(control: AbstractControl) {
  return control.value === true ? null : { mustBeTrue: true };
}

@Component({
  selector: 'app-custom-validators',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-validators.html',
  styleUrl: './custom-validators.scss',
})
export class CustomValidators {

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
    reminder: [false, mustBeTrue]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.getRawValue());
  }

  get f() { return this.form.controls; }
}