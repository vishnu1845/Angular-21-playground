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


// ANGULAR 21 COMPLETE CURRICULUM

// 1. FUNDAMENTALS (What Angular Is)
//    - Why Angular? SPA, MVC, TypeScript
//    - Setup & Installation
//    - Folder Structure & File Purposes in details essential info that we can explain to the interviewer
//    - Bootstrapping Process

// 2. CORE CONCEPTS (The Building Blocks)
//    - Components (with modern patterns)
//    - Templates (interpolation, binding, directives)
//    - Decorators (@Component, @Input, @Output, etc.)
//    - Modules vs Standalone Components

// 3. STATE & DATA (How Data Flows)
//    - Signals (Angular 21 recommended)
//    - Services & Dependency Injection
//    - RxJS Basics (Observables, Subjects, BehaviorSubject)
//    - Change Detection Strategies

// 4. FORMS (Handling User Input)
//    - Template-Driven Forms
//    - Reactive Forms (FormGroup, FormControl)
//    - Signal Forms (Angular 21 new)
//    - Validation & Error Handling

// 5. ADVANCED FEATURES
//    - Routing & Navigation
//    - HTTP & API Integration
//    - Interceptors
//    - Lifecycle Hooks (with modern patterns)
//    - ViewChild, ContentChild, etc.

// 6. PATTERNS & BEST PRACTICES
//    - Inter-component Communication
//    - Custom Directives & Pipes
//    - Lazy Loading & Module Organization
//    - Performance Optimization

// 7. INTERVIEW MASTERY
//    - Top 50 Q&A (sorted by frequency)
//    - Tricky Gotchas
//    - Code snippets that impress