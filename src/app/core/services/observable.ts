import { Injectable } from '@angular/core';
import {
  Observable,          // ← RxJS Observable (no longer shadowed)
  of,
  interval,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableService {
  // ════════════════════════════════════════════════════════════
  //  SECTION A — CORE OBSERVABLE
  // ════════════════════════════════════════════════════════════

  // ── 1. Custom Observable (built from scratch) ───────────────
  // Lazy: this body runs ONLY when subscribed.
  getCustomObservable(): Observable<number> {
    return new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();  // stream ends here
      subscriber.next(4);     // ❌ ignored — runs after complete()
    });
  }

  // ── 2. Synchronous Observable ───────────────────────────────
  // of() emits all values immediately, then completes.
  getSyncObservable(): Observable<string> {
    return of('A', 'B', 'C');
  }

  // ── 3. Asynchronous Observable ──────────────────────────────
  // interval() emits 0,1,2... every second (never completes).
  getAsyncObservable(): Observable<number> {
    return interval(1000);
  }

  // ════════════════════════════════════════════════════════════
  //  SECTION B — COLD vs HOT
  // ════════════════════════════════════════════════════════════

  // ── COLD 🧊 ─────────────────────────────────────────────────
  // Producer is created INSIDE → each subscriber gets its OWN run.
  // Two subscribers will see DIFFERENT random numbers.
  getColdObservable(): Observable<number> {
    return new Observable<number>((subscriber) => {
      const value = Math.random();   // producer inside
      subscriber.next(value);
      subscriber.complete();
    });
  }

  // ── HOT 🔥 ──────────────────────────────────────────────────
  // Producer is created OUTSIDE (shared Subject) → all subscribers
  // share ONE run. Late subscribers MISS earlier values.
  private hotProducer$ = new Subject<number>();

  getHotObservable(): Observable<number> {
    return this.hotProducer$.asObservable();
  }

  emitHotValue(value: number): void {
    this.hotProducer$.next(value);   // shared emission to all subscribers
  }

  // ════════════════════════════════════════════════════════════
  //  SECTION C — THE 4 SUBJECT TYPES
  // ════════════════════════════════════════════════════════════

  // ── 1. Subject — no memory, future emissions only ───────────
  plainSubject = new Subject<number>();

  // ── 2. BehaviorSubject — holds latest, needs initial value ──
  behaviorSubject = new BehaviorSubject<number>(0);

  // ── 3. ReplaySubject — replays last N values to new subs ────
  replaySubject = new ReplaySubject<number>(2); // buffer = 2

  // ── 4. AsyncSubject — only final value, on complete ─────────
  asyncSubject = new AsyncSubject<number>();
}

