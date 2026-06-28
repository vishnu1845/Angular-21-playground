import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Thin data layer. Real network calls against JSONPlaceholder.
 * Each GET completes after one response, which makes it ideal for
 * demonstrating forkJoin / concat / flattening operators.
 */
@Injectable({ providedIn: 'root' })
export class RxjsOperator {
  private http = inject(HttpClient);
  private base = 'https://jsonplaceholder.typicode.com';

  getUser(id = 1): Observable<any>             { return this.http.get(`${this.base}/users/${id}`); }
  getPosts(): Observable<any>                  { return this.http.get(`${this.base}/posts`); }
  getPost(id: number): Observable<any>         { return this.http.get(`${this.base}/posts/${id}`); }
  getComments(postId: number): Observable<any> { return this.http.get(`${this.base}/posts/${postId}/comments`); }
  getTodos(): Observable<any>                  { return this.http.get(`${this.base}/todos`); }

  // Guaranteed 404 -> used to actually trigger retry/catchError.
  getBroken(): Observable<any>                 { return this.http.get(`${this.base}/INVALID_ENDPOINT`); }
}
