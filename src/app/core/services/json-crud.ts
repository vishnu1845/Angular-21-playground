import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}
export type UserPayload = Omit<User, 'id'>;

@Injectable({ providedIn: 'root' })
export class JsonCrud {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  createUser(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload);
  }
  updateUser(id: string, payload: UserPayload): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, payload);
  }
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}


