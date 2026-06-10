import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

// ── Interface lives here (no separate model file needed) ──────
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceCrud {

  private http = inject(HttpClient);

  private API  = 'https://jsonplaceholder.typicode.com/users';

  // GET — fetch all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  // POST — create a new user
  createUser(payload: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.API, payload);
  }

  // DELETE — remove user by id
  deleteUser(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.API}/${id}`);
  }

  // PUT - update user by id
  updateUser(id: number, user: Omit<User, 'id'>): Observable<User> {
    return this.http.put<User>(`${this.API}/${id}`, user);
  }
}