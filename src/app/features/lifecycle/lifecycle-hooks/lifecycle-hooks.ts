import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifecycleChild } from './lifecycle-child/lifecycle-child';

// Shared LogEntry interface — imported by child too
export interface LogEntry {
  phase: 'Creation' | 'ChangeDetection' | 'Rendering' | 'Destruction';
  hook: string;
  detail: string;
  timestamp: string;
}

// Phase color map — used in template
export const PHASE_COLORS: Record<LogEntry['phase'], string> = {
  Creation:        'phase-creation',
  ChangeDetection: 'phase-cd',
  Rendering:       'phase-render',
  Destruction:     'phase-destroy',
};

@Component({
  selector: 'app-lifecycle-hooks',
  standalone: true,
  imports: [CommonModule, LifecycleChild],
  templateUrl: './lifecycle-hooks.html',
  styleUrl: './lifecycle-hooks.scss',
})
export class LifecycleHooks {
  // ── State ──────────────────────────────────────────────────────────────
  readonly showChild   = signal(true);          // controls @if — triggers destroy/recreate
  readonly userName    = signal('Vishnu');       // passed as @Input() to child
  readonly logs        = signal<LogEntry[]>([]); // all hook log entries
  readonly phaseColors = PHASE_COLORS;

  // Names to cycle through on "Update Name" click
  private readonly names = ['Vishnu', 'Angular', 'Signals', 'Lifecycle', 'DestroyRef', 'Vishnu'];
  private nameIndex = 1; // start at index 1 (0 is already set)

  // ── Actions ────────────────────────────────────────────────────────────

  updateName(): void {
    this.userName.set(this.names[this.nameIndex % this.names.length]);
    this.nameIndex++;
  }

  toggleChild(): void {
    // @if on child → destroy (ngOnDestroy) then recreate (full init chain)
    this.showChild.update(v => !v);
  }

  clearLogs(): void {
    this.logs.set([]);
  }

  // ── Called by child via (logEvent) output ──────────────────────────────
  onLogEvent(entry: LogEntry): void {
    // prepend so newest is on top
    this.logs.update(prev => [entry, ...prev]);
  }

  // ── Template helper ────────────────────────────────────────────────────
  phaseClass(phase: LogEntry['phase']): string {
    return PHASE_COLORS[phase];
  }
}