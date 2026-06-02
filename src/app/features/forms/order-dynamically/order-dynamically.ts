import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators, AbstractControl,
  FormGroup, FormControl
} from '@angular/forms';

// ─── Typed form shape ─────────────────────────────────────────
type OrderForm = {
  deliveryType: FormControl<string | null>;
  address: FormControl<string | null>;
  pincode: FormControl<string | null>;
  landmark: FormControl<string | null>;
  pickupTime: FormControl<string | null>;
  dineDate: FormControl<string | null>;
  dineTime: FormControl<string | null>;
  guests: FormControl<string | null>;
  paymentMethod: FormControl<string | null>;
  cardNumber: FormControl<string | null>;
  cardExpiry: FormControl<string | null>;
  cardCvv: FormControl<string | null>;
  upiId: FormControl<string | null>;
  bankName: FormControl<string | null>;
  accountNo: FormControl<string | null>;
};

@Component({
  selector: 'app-order-dynamically',
  imports: [ReactiveFormsModule],
  templateUrl: './order-dynamically.html',
  styleUrl: './order-dynamically.scss',
})
export class OrderDynamically {

  private fb = inject(FormBuilder);

  // ─── Step tracker ─────────────────────────────────────────
  currentStep = signal<number>(1);
  totalSteps = 3;

  // ─── Step 1 — Delivery type options ───────────────────────
  deliveryTypes = [
    { value: 'home', label: '🏠 Home Delivery' },
    { value: 'takeaway', label: '🛍️ Takeaway' },
    { value: 'dinein', label: '🍽️ Dine In' },
  ];

  // ─── Step 2 — Payment method options ──────────────────────
  paymentMethods = [
    { value: 'card', label: '💳 Credit / Debit Card' },
    { value: 'upi', label: '📱 UPI' },
    { value: 'nb', label: '🏦 Net Banking' },
    { value: 'cod', label: '💵 Cash on Delivery' },
  ];

  // ─── Main form — typed as FormGroup<OrderForm> ────────────
  form: FormGroup<OrderForm> = this.fb.group({
    deliveryType: [''],
    address: [''],
    pincode: [''],
    landmark: [''],
    pickupTime: [''],
    dineDate: [''],
    dineTime: [''],
    guests: [''],
    paymentMethod: [''],
    cardNumber: [''],
    cardExpiry: [''],
    cardCvv: [''],
    upiId: [''],
    bankName: [''],
    accountNo: [''],
  }) as FormGroup<OrderForm>;

  // ─── Shorthand getter — typed ─────────────────────────────
  get f(): OrderForm { return this.form.controls; }

  // ─── Helpers ──────────────────────────────────────────────
  isInvalid(control: AbstractControl | null): boolean {
    return !!(control?.invalid && control.touched);
  }

  isValid(control: AbstractControl | null): boolean {
    return !!(control?.valid && control.touched);
  }

  getError(control: AbstractControl | null): string {
    if (!control?.errors) return '';
    if (control.errors['required']) return 'This field is required.';
    if (control.errors['minlength']) return `Min ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['pattern']) return 'Invalid format.';
    return 'Invalid value.';
  }

  // ─── Step 1 — delivery type change ────────────────────────
  // ✅ Fix 1 — accept string | null
  onDeliveryChange(type: string | null): void {
    if (!type) return;

    // ✅ Fix 2 — access controls directly, no string indexing
    const deliveryFields: (keyof OrderForm)[] = [
      'address', 'pincode', 'pickupTime', 'dineDate', 'dineTime', 'guests'
    ];

    deliveryFields.forEach(k => {
      this.f[k].clearValidators();
      this.f[k].reset();
    });

    if (type === 'home') {
      this.f.address.setValidators([Validators.required]);
      this.f.pincode.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]);
    }

    if (type === 'takeaway') {
      this.f.pickupTime.setValidators([Validators.required]);
    }

    if (type === 'dinein') {
      this.f.dineDate.setValidators([Validators.required]);
      this.f.dineTime.setValidators([Validators.required]);
      this.f.guests.setValidators([Validators.required]);
    }

    this.form.updateValueAndValidity();
  }

  // ─── Step 2 — payment method change ───────────────────────
  // ✅ Fix 1 — accept string | null
  onPaymentChange(method: string | null): void {
    if (!method) return;

    // ✅ Fix 2 — access controls directly, no string indexing
    const paymentFields: (keyof OrderForm)[] = [
      'cardNumber', 'cardExpiry', 'cardCvv', 'upiId', 'bankName', 'accountNo'
    ];

    paymentFields.forEach(k => {
      this.f[k].clearValidators();
      this.f[k].reset();
    });

    if (method === 'card') {
      this.f.cardNumber.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.f.cardExpiry.setValidators([Validators.required]);
      this.f.cardCvv.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    }

    if (method === 'upi') {
      this.f.upiId.setValidators([Validators.required, Validators.pattern(/^[\w.\-]+@[\w]+$/)]);
    }

    if (method === 'nb') {
      this.f.bankName.setValidators([Validators.required]);
      this.f.accountNo.setValidators([Validators.required]);
    }

    this.form.updateValueAndValidity();
  }

  // ─── Step navigation ──────────────────────────────────────
  nextStep(): void {
    if (this.isCurrentStepInvalid()) return;
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  // ─── Validate only current step ───────────────────────────
  private isCurrentStepInvalid(): boolean {
    const step = this.currentStep();

    if (step === 1) {
      const fields: (keyof OrderForm)[] = [
        'deliveryType', 'address', 'pincode', 'pickupTime', 'dineDate', 'dineTime', 'guests'
      ];
      fields.forEach(k => this.f[k].markAsTouched());
      return fields.some(k => this.f[k].invalid);
    }

    if (step === 2) {
      const fields: (keyof OrderForm)[] = [
        'paymentMethod', 'cardNumber', 'cardExpiry', 'cardCvv', 'upiId', 'bankName', 'accountNo'
      ];
      fields.forEach(k => this.f[k].markAsTouched());
      return fields.some(k => this.f[k].invalid);
    }

    return false;
  }

  // ─── Submit ───────────────────────────────────────────────
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    console.log('Order placed:', this.form.getRawValue());
  }
}