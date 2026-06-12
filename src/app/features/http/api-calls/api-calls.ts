import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JsonCrud, User, UserPayload } from '../../../core/services/json-crud';

@Component({
  selector: 'app-api-calls',
  imports: [ReactiveFormsModule],
  templateUrl: './api-calls.html',
  styleUrl: './api-calls.scss',
})
export class ApiCalls implements OnInit {
  
  private readonly jsonCrud = inject(JsonCrud);
  private readonly fb = inject(FormBuilder);

  // Needed because this app is ZONELESS:
  // plain property changes inside subscribe() will NOT update the UI
  // until we explicitly tell Angular "this view is dirty".
  private readonly cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  editingId: string | null = null; // null = ADD mode, id = EDIT mode

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // ── READ ─────────────────────────────────────────────
  loadUsers(): void {
    this.jsonCrud.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.cdr.markForCheck(); // schedule a render (zoneless requirement)
      },
    });
  }

  // ── EDIT mode ────────────────────────────────────────
  editUser(user: User): void {
    this.editingId = user.id;
    this.form.patchValue(user);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset();
  }

  // ── CREATE / UPDATE ──────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.form.getRawValue(); //disabled field

    const request$ = this.editingId
      ? this.jsonCrud.updateUser(this.editingId, payload)
      : this.jsonCrud.createUser(payload);

    request$.subscribe({
      next: () => {
        this.cancelEdit();
        this.loadUsers(); // re-fetch so the UI mirrors db.json
      },
    });
  }

  // ── DELETE ───────────────────────────────────────────
  deleteUser(id: string): void {
    if (!confirm('Delete this user?')) return;

    this.jsonCrud.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
    });
  }

  /* ────────────────────────────────────────────────────
     ALTERNATIVE: async pipe way (no cdr needed)
     The AsyncPipe subscribes for you and calls markForCheck()
     internally, so it works in zoneless apps automatically.

     users$: Observable<User[]> = this.jsonCrud.getUsers();

     Template:
     @if (users$ | async; as users) {
       @for (user of users; track user.id) { ... }
     }

     Downside: after create/update/delete you must re-assign
     users$ = this.jsonCrud.getUsers(); to trigger a re-fetch.
     ──────────────────────────────────────────────────── */
}
