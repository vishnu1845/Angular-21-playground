import { Component, inject, signal } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, from, merge, concat, forkJoin, combineLatest, interval, Subject } from 'rxjs';
import {
  map, filter, take, skip, tap, delay, retry, startWith, shareReplay,
  debounceTime, distinctUntilChanged, catchError,
  mergeMap, concatMap, switchMap, exhaustMap,
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

  // On-screen log so the demo is visible without DevTools.
  log = signal<string[]>([]);
  private emit = (label: string) => (v: unknown) =>
    this.log.update(l => [`${label} → ${typeof v === 'object' ? JSON.stringify(v) : v}`, ...l]);

  // Reactive inputs driven from the template.
  search = signal('');
  private clicks$ = new Subject<void>();

  constructor() {
    // switchMap: search-as-you-type, driven by the search <input>
    this.searchAsYouType();
    // exhaustMap: driven by the "spam me" button via submit()
    this.exhaustMapClicks();
  }

  /* ===== CREATION ===== */

  /**
   * of: Emits the given values one by one and then completes.
   * Note: of([1,2,3]) emits the whole array as a single value - use `from` to spread it.
   */
  ofDemo() {
    of(10, 20, 30).subscribe(this.emit('of'));
  }

  /**
   * from: Converts an array, Promise, or iterable into a stream, emitting each item separately.
   */
  fromDemo() {
    from([1, 2, 3]).subscribe(this.emit('from'));
  }

  /* ===== TRANSFORM / FILTER ===== */

  /**
   * map: Transforms each emitted value one-for-one, like Array.map. Sync only.
   */
  mapDemo() {
    this.api.getPosts().pipe(
      map((posts: any[]) => posts.length),
    ).subscribe(this.emit('map'));
  }

  /**
   * filter: Passes only the values that satisfy the condition and drops the rest, like Array.filter.
   */
  filterDemo() {
    this.api.getPosts().pipe(
      map((posts: any[]) => posts.filter(p => p.userId === 1).length),
    ).subscribe(this.emit('filter'));
  }

  /**
   * take(n): Emits the first n values then completes and auto-unsubscribes.
   */
  takeDemo() {
    interval(400).pipe(
      take(3),
    ).subscribe(this.emit('take'));
  }

  /**
   * skip(n): Ignores the first n values and emits the rest - the opposite of take.
   */
  skipDemo() {
    interval(400).pipe(
      skip(2),
      take(3),
    ).subscribe(this.emit('skip'));
  }

  /**
   * tap: Runs a side-effect (like logging) without changing the values flowing through.
   */
  tapDemo() {
    this.api.getUser(1).pipe(
      tap(u => this.emit('tap (side-effect)')(u.id)),
      map((u: any) => u.name),
    ).subscribe(this.emit('tap result'));
  }

  /**
   * startWith: Emits a seed value immediately before the source emits - great for a "loading" state.
   */
  startWithDemo() {
    this.api.getUser(1).pipe(
      map((u: any) => u.name),
      startWith('loading...'),
    ).subscribe(this.emit('startWith'));
  }

  /**
   * shareReplay: Shares one subscription and caches the last value, so the HTTP call runs once and is reused.
   */
  shareReplayDemo() {
    const cached$ = this.api.getUser(1).pipe(
      map((u: any) => u.name),
      shareReplay(1),
    );
    cached$.subscribe(this.emit('shareReplay sub#1'));
    cached$.subscribe(this.emit('shareReplay sub#2')); // reuses the same call
  }

  /* ===== COMBINATION (parallel vs sequential) ===== */

  /**
   * merge: Runs streams in parallel and emits values as they arrive, interleaved - order not guaranteed.
   */
  mergeDemo() {
    merge(this.api.getUser(1), this.api.getUser(2))
      .subscribe(u => this.emit('merge')(u.name));
  }

  /**
   * concat: Runs streams sequentially - the next starts only after the previous completes, so order is preserved.
   */
  concatDemo() {
    concat(this.api.getUser(1), this.api.getUser(2))
      .subscribe(u => this.emit('concat')(u.name));
  }

  /**
   * forkJoin: Runs calls in parallel, waits for all to complete, then emits once with the last of each - the RxJS Promise.all.
   * If one source errors, the whole thing errors, so guard each with catchError.
   */
  forkJoinDemo() {
    forkJoin({
      user: this.api.getUser().pipe(catchError(() => of(null))),
      posts: this.api.getPosts().pipe(catchError(() => of([] as any[]))),
    }).subscribe(d => this.emit('forkJoin')(`user=${d.user?.name}, posts=${d.posts.length}`));
  }

  /**
   * combineLatest: Emits the latest value of every source whenever any one emits - perfect for live/dependent values.
   */
  combineLatestDemo() {
    combineLatest([interval(700).pipe(take(3)), interval(1000).pipe(take(2))])
      .subscribe(([a, b]) => this.emit('combineLatest')(`${a},${b}`));
  }

  /* ===== HIGHER-ORDER FLATTENING (the #1 interview topic) =====
   * Mnemonic: mergeMap = don't care | concatMap = in line |
   *           switchMap = cancel old | exhaustMap = ignore new
   */

  /**
   * mergeMap: Maps each value to an inner observable and runs them all in parallel - no cancel, order not guaranteed.
   */
  mergeMapDemo() {
    from([1, 2, 3]).pipe(
      mergeMap(id => this.api.getComments(id)),
    ).subscribe(c => this.emit('mergeMap')(`${c.length} comments`));
  }

  /**
   * concatMap: Maps to an inner observable and runs them one at a time in order, waiting for each to complete.
   */
  concatMapDemo() {
    from([1, 2, 3]).pipe(
      concatMap(id => this.api.getPost(id)),
    ).subscribe(p => this.emit('concatMap')(p.id));
  }

  /**
   * switchMap: Cancels the previous inner observable when a new value arrives, keeping only the latest - ideal for search.
   * Driven live by the search <input> in searchAsYouType().
   */
  private searchAsYouType() {
    toObservable(this.search).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.api.getPost(Number(term) || 1)),
      takeUntilDestroyed(),
    ).subscribe(p => this.emit('switchMap/search')(p.title));
  }

  /**
   * exhaustMap: Ignores new values while the current inner observable is still running - great to block double-submits.
   * Spam the button to see extra clicks ignored while a request is in flight.
   */
  private exhaustMapClicks() {
    this.clicks$.pipe(
      exhaustMap(() => this.api.getUser(1)),
      takeUntilDestroyed(),
    ).subscribe(u => this.emit('exhaustMap')(u.name));
  }

  /** Button handler that feeds the exhaustMap stream above. */
  submit() {
    this.clicks$.next();
  }

  /* ===== TIMING / SEARCH PAIR =====
   * debounceTime + distinctUntilChanged are used together inside searchAsYouType():
   * debounceTime emits only after the source is silent for the given time;
   * distinctUntilChanged skips consecutive duplicates - so we wait for a pause and ignore unchanged text.
   */

  /* ===== ERROR / TIMING ===== */

  /**
   * retry(n): Re-subscribes up to n times if the source errors. Only fires on a real error, not a 200 with empty body.
   * catchError: catches the final error and swaps in a fallback so the app recovers instead of dying.
   */
  retryDemo() {
    this.api.getBroken().pipe(
      retry({ count: 2, delay: 800 }),
      catchError(e => { this.emit('retry gave up')(e.status); return of(null); }),
    ).subscribe(this.emit('retry'));
  }

  /**
   * delay(ms): Time-shifts every emission later; the request still fires immediately, only the result is held.
   */
  delayDemo() {
    this.api.getUser(1).pipe(
      delay(1000),
    ).subscribe(u => this.emit('delay (after 1s)')(u.name));
  }

  clear() { this.log.set([]); }
}
