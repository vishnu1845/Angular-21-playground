import { Component, inject } from '@angular/core';
import { forkJoin, of, interval, fromEvent } from 'rxjs';
import {
  switchMap, mergeMap, concatMap, exhaustMap,
  map, filter, debounceTime, distinctUntilChanged,
  take, catchError, retry, tap, combineLatestWith,
} from 'rxjs/operators';
import { RxjsOperator } from '../../../core/services/rxjs-operator';

@Component({
  selector: 'app-operators',
  imports: [],
  templateUrl: './operators.html',
  styleUrl: './operators.scss',
})
export class Operators {
  private api = inject(RxjsOperator);

  constructor() {
    // Calls every example so you can check the console one-by-one.
    this.runAll();
  }

  runAll() {
    this.parallelCalls();
    this.dependentCalls();
    this.searchTyping();
    this.parallelWrites();
    this.orderedSaves();
    this.preventDoubleSubmit();
    this.combineStreams();
    this.transformAndFilter();
    this.handleErrors();
    this.limited();
    // autocomplete() needs a real <input>, so call it from the template (see note below).
  }

  // ───────────────────────────────────────────────
  // 1) PARALLEL calls → forkJoin
  // Fires ALL calls at once, waits for ALL to complete, emits ONE combined object.
  // Best for "load everything before showing the page". Like Promise.all.
  // ───────────────────────────────────────────────
  parallelCalls() {
    forkJoin({
      user: this.api.getUser(),
      posts: this.api.getPosts(),
    }).subscribe((data) => console.log('1) forkJoin (parallel) →', data));
  }

  // ───────────────────────────────────────────────
  // 2) SEQUENTIAL / DEPENDENT calls → switchMap
  // 2nd call depends on the 1st result (chaining). switchMap also CANCELS
  // the previous inner call if a new outer value arrives.
  // ───────────────────────────────────────────────
  dependentCalls() {
    this.api.getUser().pipe(
      switchMap((user) => this.api.getPostsByUser(user.id))
    ).subscribe((posts) => console.log('2) switchMap (dependent chain) →', posts));
  }

  // ───────────────────────────────────────────────
  // 3) switchMap → CANCELS previous. USE FOR: search/autocomplete, latest-wins.
  // ───────────────────────────────────────────────
  searchTyping() {
    of('a', 'ab', 'abc').pipe(
      switchMap((term) => this.api.getPostsByUser(term.length))
    ).subscribe((r) => console.log('3) switchMap (latest wins) →', r));
  }

  // ───────────────────────────────────────────────
  // 4) mergeMap → runs ALL in parallel, no order guarantee. USE FOR: independent writes.
  // ───────────────────────────────────────────────
  parallelWrites() {
    of(1, 2, 3).pipe(
      mergeMap((id) => this.api.getProfile(id))
    ).subscribe((r) => console.log('4) mergeMap (parallel) →', r));
  }

  // ───────────────────────────────────────────────
  // 5) concatMap → queues, runs one-by-one IN ORDER. USE FOR: ordered sequential saves.
  // ───────────────────────────────────────────────
  orderedSaves() {
    of(1, 2, 3).pipe(
      concatMap((id) => this.api.getProfile(id))
    ).subscribe((r) => console.log('5) concatMap (ordered) →', r));
  }

  // ───────────────────────────────────────────────
  // 6) exhaustMap → IGNORES new values while one is running.
  // USE FOR: prevent double form submit / spam clicks.
  // ───────────────────────────────────────────────
  preventDoubleSubmit() {
    of('click', 'click', 'click').pipe(
      exhaustMap(() => this.api.getUser())
    ).subscribe((r) => console.log('6) exhaustMap (ignore while busy) →', r));
  }

  // ───────────────────────────────────────────────
  // 7) COMBINATION → combineLatestWith
  // Emits whenever ANY source emits, using the latest value of each.
  // ───────────────────────────────────────────────
  combineStreams() {
    this.api.getUser().pipe(
      combineLatestWith(this.api.getPosts())
    ).subscribe(([user, posts]) => console.log('7) combineLatestWith →', user, posts));
  }

  // ───────────────────────────────────────────────
  // 8) TRANSFORM + FILTER → tap / filter / map
  // tap = side-effect (logging), filter = drop unwanted, map = reshape data.
  // ───────────────────────────────────────────────
  transformAndFilter() {
    of(1, 2, 3, 4).pipe(
      tap((n) => console.log('8) tap (before filter) →', n)),
      filter((n) => n % 2 === 0), // keep evens
      map((n) => n * 10)          // reshape
    ).subscribe((r) => console.log('8) map/filter (result) →', r));
  }

  // ───────────────────────────────────────────────
  // 9) ERROR HANDLING → retry + catchError
  // retry re-subscribes N times; catchError provides a fallback so the stream doesn't die.
  // ───────────────────────────────────────────────
  handleErrors() {
    this.api.getFailing().pipe(
      retry(2),                                  // try 2 more times
      catchError((err) => {
        console.error('9) catchError (caught) →', err.message);
        return of('fallback value');             // graceful recovery
      })
    ).subscribe((r) => console.log('9) catchError (result) →', r));
  }

  // ───────────────────────────────────────────────
  // 10) LIMITING emissions → take
  // Auto-completes after N emissions (good for avoiding manual unsubscribe).
  // ───────────────────────────────────────────────
  limited() {
    interval(1000).pipe(
      take(3) // only first 3 ticks, then completes
    ).subscribe((n) => console.log('10) take →', n));
  }

  // ───────────────────────────────────────────────
  // 11) RATE-LIMITING → debounceTime + distinctUntilChanged
  // Classic autocomplete: wait for typing pause, ignore duplicate terms, then call API.
  // Needs a real <input>. Wire it from the template: (input)="autocomplete($event.target)"
  // ───────────────────────────────────────────────
  autocomplete(input: HTMLInputElement) {
    fromEvent(input, 'input').pipe(
      map((e) => (e.target as HTMLInputElement).value),
      debounceTime(300),          // wait 300ms after last keystroke
      distinctUntilChanged(),     // skip duplicate term
      switchMap((term) => this.api.getPostsByUser(term.length))
    ).subscribe((r) => console.log('11) autocomplete →', r));
  }
}
