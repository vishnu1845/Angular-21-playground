import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JsonCrud, User, UserPayload } from '../../../core/services/json-crud';

@Component({
  selector: 'app-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './crud.html',
  styleUrl: './crud.scss',
})
export class Crud implements OnInit {
  private readonly jsonCrud = inject(JsonCrud);
  private readonly fb = inject(FormBuilder);

  readonly users = signal<User[]>([]);
  readonly editingId = signal<string | null>(null); // null = ADD, id = EDIT

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
      next: (users) => this.users.set(users),
    });
  }

  // ── EDIT mode ────────────────────────────────────────
  editUser(user: User): void {
    this.editingId.set(user.id);
    this.form.patchValue(user);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  // ── CREATE / UPDATE ──────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.form.getRawValue();
    const id = this.editingId();

    const request$ =
      id !== null
        ? this.jsonCrud.updateUser(id, payload)
        : this.jsonCrud.createUser(payload);

    request$.subscribe({
      next: () => {
        this.cancelEdit();
        this.loadUsers(); // re-fetch → UI mirrors db.json
      },
    });
  }

  // ── DELETE ───────────────────────────────────────────
  deleteUser(id: string): void {
    this.jsonCrud.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
    });
  }
}
