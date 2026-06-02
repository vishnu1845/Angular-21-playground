import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  street:  string | null;
  suite?:  string | null;   
  city:    string | null;
  zipcode: string | null;
}

export interface User {
  id:       number;
  name:     string | null;
  username: string | null;
  email:    string | null;
  phone:    string | null;
  website:  string | null;
  address:  Address;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private api  = 'https://jsonplaceholder.typicode.com';

  getUsers(): Observable<User[]>                              { return this.http.get<User[]>(`${this.api}/users`);           }
  getUserById(id: number): Observable<User>                   { return this.http.get<User>(`${this.api}/users/${id}`);       }
  createUser(user: Partial<User>): Observable<User>           { return this.http.post<User>(`${this.api}/users`, user);      }
  updateUser(id: number, user: Partial<User>): Observable<User> { return this.http.put<User>(`${this.api}/users/${id}`, user); }
  deleteUser(id: number): Observable<void>                    { return this.http.delete<void>(`${this.api}/users/${id}`);    }
}