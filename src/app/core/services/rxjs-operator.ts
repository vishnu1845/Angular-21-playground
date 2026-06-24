import { Injectable } from '@angular/core';
import { of, throwError, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RxjsOperator {
  // Each method returns an Observable that mimics an HTTP call (HttpClient also returns Observables).
  getUser(): Observable<{ id: number; name: string }> {
    return of({ id: 1, name: 'Alex' }).pipe(delay(500));
  }

  getPosts(): Observable<string[]> {
    return of(['post-1', 'post-2']).pipe(delay(800));
  }

  // Dependent call: needs a userId from a previous response.
  getPostsByUser(userId: number): Observable<string[]> {
    return of([`u${userId}-post-1`, `u${userId}-post-2`]).pipe(delay(600));
  }

  getProfile(userId: number): Observable<{ bio: string }> {
    return of({ bio: `bio of user ${userId}` }).pipe(delay(400));
  }

  // Used to demonstrate error handling.
  getFailing(): Observable<never> {
    return throwError(() => new Error('API failed')).pipe(delay(300));
  }
}
