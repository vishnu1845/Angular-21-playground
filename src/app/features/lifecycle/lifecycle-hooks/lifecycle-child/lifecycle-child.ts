import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  signal,
  inject,
  DestroyRef,
  afterNextRender,
  afterEveryRender,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogEntry } from '../lifecycle-hooks';

@Component({
  selector: 'app-lifecycle-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifecycle-child.html',
  styleUrl: './lifecycle-child.scss',
})
export class LifecycleChild
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // ── Input from parent ─────────────────────────────────────────────────
  // Using @Input() decorator (NOT signal input) so ngOnChanges fires
  @Input() userName: string = '';

  // ── Output: emits log entries up to parent ────────────────────────────
  @Output() logEvent = new EventEmitter<LogEntry>();

  // ── Signals for template display (written only OUTSIDE CD / render hooks)
  readonly doCheckCount = signal(0);
  readonly renderCount  = signal(0);

  // ── Raw counters: plain numbers, safe to increment during CD ──────────
  // Signals CANNOT be written inside CD hooks or afterEveryRender —
  // writing a signal marks the view dirty → triggers another CD → infinite loop
  // So we increment plain numbers during the hook, then sync to signals on flush
  private _doCheckCount = 0;
  private _renderCount  = 0;

  private readonly zone       = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  // Buffer: collect log entries during a CD pass, flush AFTER pass completes
  private logBuffer: LogEntry[] = [];
  private flushScheduled = false;

  // ── CREATION PHASE ────────────────────────────────────────────────────
  constructor() {
    this.buffer('Creation', 'constructor', 'Component instantiated by Angular');

    // afterNextRender & afterEveryRender: standalone FUNCTIONS (not class methods)
    // must be called inside injection context — constructor is ideal
    afterNextRender(() => {
      // fires ONCE after all components rendered to DOM
      this.buffer('Rendering', 'afterNextRender', 'DOM fully rendered — fires once only');
      // must flush outside Angular — calling zone.run() here would mark views dirty
      this.zone.runOutsideAngular(() =>
        setTimeout(() => this.zone.run(() => this.flushNow()), 15000)
      );
    });

    afterEveryRender(() => {
      // fires after EVERY render cycle
      // ⚠️ NEVER write signals here — marks view dirty → triggers render → infinite loop
      this._renderCount++;
      const count = this._renderCount;
      this.buffer('Rendering', 'afterEveryRender', `Render cycle #${count}`);
      this.zone.runOutsideAngular(() =>
        setTimeout(() => this.zone.run(() => {
          this.renderCount.set(count); // safe: we're outside the render hook now
          this.flushNow();
        }), 15000)
      );
    });

    // DestroyRef: modern alternative / companion to ngOnDestroy
    // keeps cleanup logic physically close to setup code
    this.destroyRef.onDestroy(() => {
      this.buffer('Destruction', 'DestroyRef.onDestroy', 'Cleanup via DestroyRef (modern pattern)');
      this.flushNow();
    });
  }

  // ── CHANGE DETECTION PHASE ────────────────────────────────────────────

  // Runs BEFORE ngOnInit on first change, then on every @Input() change after
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userName']) {
      const c = changes['userName'];
      const detail = `"${c.previousValue ?? 'undefined'}" → "${c.currentValue}" | firstChange: ${c.firstChange}`;
      this.buffer('ChangeDetection', 'ngOnChanges', detail);
    }
  }

  // Runs once — after all inputs initialized, before template checked
  ngOnInit(): void {
    this.buffer('ChangeDetection', 'ngOnInit', `Inputs ready — userName: "${this.userName}"`);
  }

  // Runs on EVERY CD cycle — very frequent
  // ⚠️ Do NOT write signals here — use plain counter instead
  ngDoCheck(): void {
    this._doCheckCount++;
    this.buffer('ChangeDetection', 'ngDoCheck', `CD cycle #${this._doCheckCount} — runs very frequently ⚠️`);
  }

  // Runs once after projected content (<ng-content>) is initialized
  ngAfterContentInit(): void {
    this.buffer('ChangeDetection', 'ngAfterContentInit', 'Projected content initialized');
  }

  // Runs every time projected content is checked
  ngAfterContentChecked(): void {
    this.buffer('ChangeDetection', 'ngAfterContentChecked', 'Projected content checked ⚠️ frequent');
  }

  // Runs once after component's own view (template) is initialized
  ngAfterViewInit(): void {
    this.buffer('ChangeDetection', 'ngAfterViewInit', 'View initialized — safe to read ViewChild here');
  }

  // Runs every time component's view is checked — LAST hook in the CD pass
  // This is the right place to schedule the flush — CD is fully done after this
  ngAfterViewChecked(): void {
    this.buffer('ChangeDetection', 'ngAfterViewChecked', 'Component view checked ⚠️ frequent');
    // sync plain counter → signal (safe here, flush is deferred to setTimeout)
    this.doCheckCount.set(this._doCheckCount);
    this.scheduleFlush();
  }

  // ── DESTRUCTION PHASE ─────────────────────────────────────────────────

  // Runs once just before component is destroyed
  ngOnDestroy(): void {
    this.buffer('Destruction', 'ngOnDestroy', 'Component about to be destroyed — cleanup here');
    this.flushNow();
  }

  // ── Buffer / flush helpers ────────────────────────────────────────────

  // Queue an entry — pure array push, zero side effects
  private buffer(phase: LogEntry['phase'], hook: string, detail: string): void {
    this.logBuffer.push({
      phase, hook, detail,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      }),
    });
  }

  // Defer flush to next macrotask — completely outside current CD pass
  private scheduleFlush(): void {
    if (this.flushScheduled) return;
    this.flushScheduled = true;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => this.zone.run(() => this.flushNow()), 15000);
    });
  }

  // Emit all buffered entries to parent at once
  private flushNow(): void {
    this.flushScheduled = false;
    const entries = [...this.logBuffer];
    this.logBuffer = [];
    entries.forEach(entry => this.logEvent.emit(entry));
  }
}