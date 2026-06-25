import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Logged in? Let them through.
  if (auth.isLoggedIn()) {
    return true;
  }

  // Not logged in → redirect to login, remember where they wanted to go.
  router.navigate(['/auth/jwt-login'], {
    queryParams: { returnUrl: state.url },
  });


  return false;
};
