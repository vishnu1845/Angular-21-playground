import {
  Component,
  ViewChild,         // OLD: decorator query
  AfterViewInit,     // OLD: query is ready ONLY after the view initializes
  ChangeDetectorRef, // OLD: needed to avoid NG0100 on late value changes
  inject,
  viewChild,         // NEW: signal-based query
  computed,          // NEW: derive reactive state (auto-updates)
  signal,
} from '@angular/core';
import { Child } from './child/child';

@Component({
  selector: 'app-view-child',
  imports: [Child],
  templateUrl: './view-child.html',
})
export class ViewChildDemo implements AfterViewInit {

  private cdr = inject(ChangeDetectorRef);

  // ============ OLD WAY: @ViewChild ============
  // Plain property. Undefined until ngAfterViewInit.
  @ViewChild(Child) childOld!: Child;

  // Snapshot values. They DO NOT auto-update — read ON DEMAND.
  oldMessage = '';
  oldGreeting = '';

  ngAfterViewInit() {
    // Reading earlier (constructor/ngOnInit) => undefined.
    this.readOld();

    // We changed bound values AFTER the view was already checked => NG0100.
    // detectChanges() re-runs CD now, synchronously => fixes it.
    // NOTE: markForCheck() would NOT fix it here — it only schedules a
    // check for the NEXT cycle, but the error is in the CURRENT pass.
    this.cdr.detectChanges();
  }

  // OLD = manual refresh: must re-read to see new child values.
  readOld() {
    this.oldMessage = this.childOld.message();
    this.oldGreeting = this.childOld.greet('Parent');
  }

  // ============ NEW WAY: viewChild() ============
  // Returns a SIGNAL. Read anytime via this.childNew().
  // .required removes the "!" and guarantees the child exists.
  childNew = viewChild.required(Child);

  // AUTO-updates whenever the child's message signal changes.
  // No lifecycle hook, no detectChanges().
  newMessage = computed(() => this.childNew().message());

  // Method calls aren't reactive, so trigger on demand.
  newGreeting = signal('');
  readNew() {
    this.newGreeting.set(this.childNew().greet('Parent'));
  }
}
