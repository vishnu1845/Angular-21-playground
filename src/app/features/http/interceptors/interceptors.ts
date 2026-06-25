import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-interceptors',
  imports: [],
  templateUrl: './interceptors.html',
  styleUrl: './interceptors.scss',
})
export class Interceptors {
  private http = inject(HttpClient);
  private auth = inject(Auth);

  response = signal<string>('');
  loading = signal(false);

  token = this.auth.getToken();

  // Fires a GET — authInterceptor attaches the Bearer token automatically
  sendRequest(): void {
    this.loading.set(true);
    this.response.set('');

    this.http.get('https://reqres.in/api/users/2').subscribe({
      next: (res) => {
        this.response.set(JSON.stringify(res, null, 2));
        this.loading.set(false);
      },
      error: (err) => {
        this.response.set(`Error: ${err.message}`);
        this.loading.set(false);
      },
    });
  }
}
