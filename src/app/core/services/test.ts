
import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string,
  name: string,
  email: string,
  phone: string
}

export type UserPayload = Omit<User, 'id'>

@Injectable({
  providedIn: 'root',//singleton
})
export class Test {

  private http = inject(HttpClient);
  public url = 'http://localhost:3000/users';

  getApi(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  postApi(payload: UserPayload): Observable<User> {
    return this.http.post<User>(this.url, payload);
  }

  deleteData(id:string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  } 
  
  updateUser(id:string, payLoad: UserPayload): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, payLoad);
  }
}