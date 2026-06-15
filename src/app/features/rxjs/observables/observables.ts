import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObservableService } from '../../../core/services/observable';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.scss',
})
export class Observables implements OnInit, OnDestroy {
  // Single container → one unsubscribe() tears down everything.
  private subscriptions = new Subscription();

  // Logs grouped per concept (for clean template display)
  coreLogs: string[] = [];
  coldLogs: string[] = [];
  hotLogs: string[] = [];
  subjectLogs: string[] = [];
  behaviorLogs: string[] = [];
  replayLogs: string[] = [];
  asyncLogs: string[] = [];

  // Counters for interactive buttons
  private hotCounter = 2;
  private subjectCounter = 2;
  private behaviorCounter = 2;

  constructor(public obs: ObservableService) {}

  ngOnInit(): void {
    this.runCoreDemo();
    this.runColdDemo();
    this.runHotDemo();
    this.runSubjectDemo();
    this.runBehaviorDemo();
    this.runReplayDemo();
    this.runAsyncSubjectDemo();
  }

  // ════════════════════════════════════════════════════════════
  //  CORE OBSERVABLE
  // ════════════════════════════════════════════════════════════
  private runCoreDemo(): void {
    // Subscribing with FULL observer (3 callbacks)
    const sub = this.obs.getCustomObservable().subscribe({
      next: (v) => this.coreLogs.push(`next → ${v}`),       // 1, 2, 3
      error: (e) => this.coreLogs.push(`error → ${e}`),
      complete: () => this.coreLogs.push('complete → done'),
    });
    this.subscriptions.add(sub);

    // Sync vs Async ordering proof
    this.coreLogs.push('START');
    this.obs.getSyncObservable().subscribe((v) =>
      this.coreLogs.push(`sync → ${v}`),
    );
    const asyncSub = this.obs.getAsyncObservable().subscribe((v) =>
      this.coreLogs.push(`async → ${v}`),
    );
    this.subscriptions.add(asyncSub);
    this.coreLogs.push('END');
    // Order: START, sync A/B/C, END, then async 0,1,2...
  }

  // ════════════════════════════════════════════════════════════
  //  COLD 🧊 — each subscriber gets its OWN execution
  // ════════════════════════════════════════════════════════════
  private runColdDemo(): void {
    const cold$ = this.obs.getColdObservable();
    // Two subscribers → DIFFERENT values (independent runs)
    cold$.subscribe((v) => this.coldLogs.push(`Sub A → ${v}`));
    cold$.subscribe((v) => this.coldLogs.push(`Sub B → ${v}`));
  }

  // ════════════════════════════════════════════════════════════
  //  HOT 🔥 — shared execution, late subscribers MISS values
  // ════════════════════════════════════════════════════════════
  private runHotDemo(): void {
    // Sub A joins first
    const subA = this.obs
      .getHotObservable()
      .subscribe((v) => this.hotLogs.push(`Sub A → ${v}`));
    this.subscriptions.add(subA);

    this.obs.emitHotValue(1); // A sees 1

    // Sub B joins LATE → will miss value 1
    const subB = this.obs
      .getHotObservable()
      .subscribe((v) => this.hotLogs.push(`Sub B → ${v}`));
    this.subscriptions.add(subB);

    this.obs.emitHotValue(2); // A sees 2, B sees 2 (B missed 1)
  }

  // ════════════════════════════════════════════════════════════
  //  SUBJECT — no memory (future emissions only)
  // ════════════════════════════════════════════════════════════
  private runSubjectDemo(): void {
    const subA = this.obs.plainSubject.subscribe((v) =>
      this.subjectLogs.push(`Sub A → ${v}`),
    );
    this.subscriptions.add(subA);

    this.obs.plainSubject.next(1); // A: 1

    const subB = this.obs.plainSubject.subscribe((v) =>
      this.subjectLogs.push(`Sub B → ${v}`),
    );
    this.subscriptions.add(subB);

    this.obs.plainSubject.next(2); // A: 2, B: 2 (B missed 1)
  }

  // ════════════════════════════════════════════════════════════
  //  BEHAVIORSUBJECT — holds latest, emits immediately
  // ════════════════════════════════════════════════════════════
  private runBehaviorDemo(): void {
    // Subscribes AFTER initial value(0) → receives 0 right away
    const subA = this.obs.behaviorSubject.subscribe((v) =>
      this.behaviorLogs.push(`Sub A → ${v}`),
    );
    this.subscriptions.add(subA);

    this.obs.behaviorSubject.next(1); // A: 1

    // Late subscriber → immediately gets LATEST value (1)
    const subB = this.obs.behaviorSubject.subscribe((v) =>
      this.behaviorLogs.push(`Sub B → ${v}`),
    );
    this.subscriptions.add(subB);

    this.obs.behaviorSubject.next(2); // A: 2, B: 2
    // .value reads current value synchronously
    this.behaviorLogs.push(`current value = ${this.obs.behaviorSubject.value}`);
  }

  // ════════════════════════════════════════════════════════════
  //  REPLAYSUBJECT — replays last N values to new subscribers
  // ════════════════════════════════════════════════════════════
  private runReplayDemo(): void {
    // Emit BEFORE subscribing — buffer keeps last 2
    this.obs.replaySubject.next(1);
    this.obs.replaySubject.next(2);
    this.obs.replaySubject.next(3);

    // New subscriber replays last 2 → 2, 3
    const sub = this.obs.replaySubject.subscribe((v) =>
      this.replayLogs.push(`Sub → ${v}`),
    );
    this.subscriptions.add(sub);
  }

  // ════════════════════════════════════════════════════════════
  //  ASYNCSUBJECT — only the FINAL value, on complete()
  // ════════════════════════════════════════════════════════════
  private runAsyncSubjectDemo(): void {
    const sub = this.obs.asyncSubject.subscribe((v) =>
      this.asyncLogs.push(`Sub → ${v}`),
    );
    this.subscriptions.add(sub);

    this.obs.asyncSubject.next(1);
    this.obs.asyncSubject.next(2);
    this.obs.asyncSubject.next(3);
    this.obs.asyncSubject.complete(); // only NOW emits 3 (the last value)
  }

  // ════════════════════════════════════════════════════════════
  //  INTERACTIVE BUTTON HANDLERS (used by Bootstrap buttons)
  // ════════════════════════════════════════════════════════════

  // Emit a new hot value → both subscribers receive it live
  triggerHot(): void {
    this.obs.emitHotValue(++this.hotCounter);
  }

  // Emit into the plain Subject → current subscribers receive it
  emitSubject(): void {
    this.obs.plainSubject.next(++this.subjectCounter);
  }

  // Emit into the BehaviorSubject → updates latest value
  emitBehavior(): void {
    this.obs.behaviorSubject.next(++this.behaviorCounter);
  }

  // ── Cleanup: prevents memory leaks ──────────────────────────
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
