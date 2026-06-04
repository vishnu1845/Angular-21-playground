import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-validation',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-validation.html',
  styleUrl: './reactive-validation.scss',
})
export class ReactiveValidation {

  private fb = inject(FormBuilder);  //new version

  // constructor(private fb: FormBuilder){}


  isLoading    = signal(false);
  showPassword = signal(false);

  form = this.fb.nonNullable.group({
  // form = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8),
                    Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
  });

  get f() { return this.form.controls; }

  isInvalid(control: AbstractControl | null): boolean {
  return !!(control?.invalid && control.touched);
  }

  isValid(control: AbstractControl | null): boolean {
    return !!(control?.valid && control.touched);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();         
    if (this.form.invalid) return;
    this.isLoading.set(true);
    setTimeout(() => {
      console.log('Form Value:', this.form.value);
      this.isLoading.set(false);
      this.form.reset();
    }, 1500);
  }
}