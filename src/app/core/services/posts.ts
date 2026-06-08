import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private http = inject(HttpClient);

  getBooks(): Book[] {
    return [
      { id: 1, title: 'Who Moved My Cheese?', author: 'Spencer Johnson', year: 1998 },
      { id: 2, title: 'Vinland Saga', author: 'Makoto Yukimura', year: 2005 },
      { id: 3, title: 'Solo Leveling', author: 'Chugong', year: 2016 },
      { id: 4, title: 'Berserk', author: 'Kentaro Miura', year: 1989 },
    ];
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}