import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-error-handling',
  imports: [],
  templateUrl: './error-handling.html',
  styleUrl: './error-handling.scss',
})
export class ErrorHandling {
  private http = inject(HttpClient);

  result = signal<string>('');
  loading = signal(false);

  // Hit endpoints that return specific error codes
  trigger(status: number): void {
    this.loading.set(true);
    this.result.set('');

    // httpstat.us returns whatever status code you ask for
    this.http.get(`https://httpstat.us/${status}`).subscribe({
      next: () => {
        this.result.set('✅ Success (no error)');
        this.loading.set(false);
      },
      error: (err) => {
        // This err is the CLEAN object re-thrown by errorInterceptor
        this.result.set(`❌ Caught by errorInterceptor → status: ${err.status}, message: "${err.message}"`);
        this.loading.set(false);
      },
    });
  }
}
