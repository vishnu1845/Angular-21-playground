import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Auth } from '../services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';

      switch (error.status) {
        case 0:
          message = 'Network error — server unreachable';
          break;
        case 401:
          message = 'Unauthorized — logging out';
          auth.logout(); // token invalid/expired → clear session
          break;
        case 403:
          message = 'Forbidden — you lack permission';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Server error — try again later';
          break;
      }

      console.error(`[HTTP Error ${error.status}] ${message}`, error);

      // Re-throw so the component can still react if needed
      return throwError(() => ({ status: error.status, message }));
    })
  );
};
