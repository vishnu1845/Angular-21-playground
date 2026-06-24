import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};


// src/app/
//   core/
//     services/auth.service.ts
//     interceptors/auth.interceptor.ts
//     interceptors/error.interceptor.ts
//     guards/auth.guard.ts
//   features/
//     jwt-login/
//     route-protection/
//     interceptors/        (demo page)
//     error-handling/      (demo page)
