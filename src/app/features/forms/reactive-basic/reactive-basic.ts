import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { JsonPipe } from '@angular/common';   

@Component({
  selector: 'app-reactive-basic',
  imports: [ReactiveFormsModule, JsonPipe],  
  templateUrl: './reactive-basic.html',
  styleUrl: './reactive-basic.scss',
})
export class ReactiveBasic {
  
  // ─── inject FormBuilder (no constructor needed) ───────────
  private fb = inject(FormBuilder);

  // ─── Signals ──────────────────────────────────────────────
  isSubmitted  = signal(false);
  showPassword = signal(false);
  isLoading    = signal(false);

  // ─── Reactive Form — minimal boilerplate with inject ──────
  form = this.fb.group({
    userName: ['',  [Validators.required, Validators.minLength(3)]],
    email:    ['',  [Validators.required, Validators.email]],
    password: ['',  [Validators.required, Validators.minLength(8),
                     Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
  });

  // ─── Shorthand getters (avoid repeating form.get() in HTML) 
  get f() { return this.form.controls; }

  // ─── Helpers ──────────────────────────────────────────────
  isInvalid(control: AbstractControl | null): boolean {
    return !!(control?.invalid && (control.touched || this.isSubmitted()));
  }

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  // ─── Submit ───────────────────────────────────────────────
  onSubmit(): void {
    this.isSubmitted.set(true);

    if (this.form.invalid) return;

    this.isLoading.set(true);

    // simulate API call
    setTimeout(() => {
      console.log('Form Value:', this.form.value);
      this.isLoading.set(false);
      this.form.reset();
      this.isSubmitted.set(false);
    }, 1500);
  }
}