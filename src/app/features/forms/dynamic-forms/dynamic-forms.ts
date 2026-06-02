import { Component, inject, signal, OnInit }         from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../../../core/services/user';

// ─── Field config interface ────────────────────────────────
interface FieldConfig {
  name:        string;
  label:       string;
  type:        string;
  placeholder: string;
  validators:  any[];
}

@Component({
  selector:    'app-dynamic-forms',
  imports:     [ReactiveFormsModule],
  templateUrl: './dynamic-forms.html',
  styleUrl:    './dynamic-forms.scss',
})
export class DynamicForms implements OnInit {

  private fb          = inject(FormBuilder);
  private userService = inject(UserService);

  // ─── Signals ──────────────────────────────────────────────
  isLoading  = signal(false);
  isSuccess  = signal(false);
  errorMsg   = signal('');

  // ─── Field definitions ────────────────────────────────────
  fieldConfigs: FieldConfig[] = [
    { name: 'name',     label: 'Full Name', type: 'text',     placeholder: 'Leanne Graham',        validators: [Validators.required, Validators.minLength(3)]                            },
    { name: 'username', label: 'Username',  type: 'text',     placeholder: 'e.g. alex_dev',        validators: [Validators.required, Validators.minLength(3)]                            },
    { name: 'email',    label: 'Email',     type: 'email',    placeholder: 'you@example.com',      validators: [Validators.required, Validators.email]                                   },
    { name: 'phone',    label: 'Phone',     type: 'text',     placeholder: '1-770-736-8031',       validators: [Validators.required]                                                     },
    { name: 'website',  label: 'Website',   type: 'text',     placeholder: 'yoursite.com',         validators: [Validators.required]                                                     },
    { name: 'street',   label: 'Street',    type: 'text',     placeholder: 'Kulas Light',          validators: [Validators.required]                                                     },
    { name: 'city',     label: 'City',      type: 'text',     placeholder: 'Gwenborough',          validators: [Validators.required]                                                     },
    { name: 'zipcode',  label: 'Zipcode',   type: 'text',     placeholder: '92998-3874',           validators: [Validators.required]                                                     },
  ];

  // ─── Build form dynamically from fieldConfigs ─────────────
  form = this.fb.group(
    Object.fromEntries(
      this.fieldConfigs.map(f => [f.name, ['', f.validators]])
    )
  );

  // ─── On init — prefill form with first user from API ──────
  ngOnInit(): void {
    this.isLoading.set(true);
    this.userService.getUserById(1).subscribe({   //came from API — you didn't write these
      next: (user) => {
        this.form.patchValue({
          name:     user.name,
          username: user.username,
          email:    user.email,
          phone:    user.phone,
          website:  user.website,
          street:   user.address.street,
          city:     user.address.city,
          zipcode:  user.address.zipcode,
        });
        this.isLoading.set(false);
        console.log('User loaded:', user);
      },
      error: (err) => {
        this.errorMsg.set('Failed to load user data.');
        this.isLoading.set(false);
        console.error('Error:', err);
      }
    });
  }

  // ─── Shorthand getter ─────────────────────────────────────
  get f() { return this.form.controls; }

  // ─── Helpers ──────────────────────────────────────────────
  isInvalid(control: AbstractControl | null): boolean {
    return !!(control?.invalid && control.touched);
  }

  isValid(control: AbstractControl | null): boolean {
    return !!(control?.valid && control.touched);
  }

  getError(control: AbstractControl | null): string {
    if (!control?.errors) return '';
    if (control.errors['required'])  return 'This field is required.';
    if (control.errors['minlength']) return `Min ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['email'])     return 'Enter a valid email.';
    return 'Invalid value.';
  }

  // ─── Submit — POST to API ─────────────────────────────────
 onSubmit(): void {
  this.form.markAllAsTouched();
  if (this.form.invalid) return;

  this.isLoading.set(true);
  this.isSuccess.set(false);

  // ✅ getRawValue() returns all values as string, never null
  const v = this.form.getRawValue();

  const payload = {
    name:     v['name'],
    username: v['username'],
    email:    v['email'],
    phone:    v['phone'],
    website:  v['website'],
    address: {
      street:  v['street'],
      city:    v['city'],
      zipcode: v['zipcode'],
    }
  };

  this.userService.createUser(payload).subscribe({
    next: (res) => {
      console.log('User created:', res);
      this.isSuccess.set(true);
      this.isLoading.set(false);
      this.form.reset();
    },
    error: (err) => {
      console.error('Submit error:', err);
      this.errorMsg.set('Submission failed. Please try again.');
      this.isLoading.set(false);
    }
  });
}

  // ─── Reset ────────────────────────────────────────────────
  onReset(): void {
    this.form.reset();
    this.isSuccess.set(false);
    this.errorMsg.set('');
  }
}