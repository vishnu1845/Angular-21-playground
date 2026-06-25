import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'https://dummyjson.com/auth';

  // Signal tracks login state reactively (Angular 17+ style)
  isLoggedIn = signal<boolean>(this.hasToken());

  // POST credentials → API returns a token → we store it

  login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap((res) => {
          this.setToken(res.accessToken);   // dummyjson returns accessToken
          this.isLoggedIn.set(true);
        })
      );
  }


  // Clear token + send user back to login
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/jwt-login']);   // updated path
  }


  // Read token (interceptor uses this)
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
