import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-jwt-login',
  imports: [ReactiveFormsModule],
  templateUrl: './jwt-login.html',
  styleUrl: './jwt-login.scss',
})
export class JwtLogin {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  errorMsg = signal('');

  // reqres.in test credentials prefilled
  form = this.fb.group({
    email: ['emilys', [Validators.required]],      
    password: ['emilyspass', [Validators.required]],
  });


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');

    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!).subscribe({
      next: () => {
        // Send user back to where they wanted, or default page
        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/auth/route-protection';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.errorMsg.set(err.message || 'Login failed');
        this.loading.set(false);
      },
    });
  }
}
