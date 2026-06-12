import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ServiceCrud, User, UserPayload } from '../../../core/services/service-crud';

@Component({
  selector: 'app-real-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './real-crud.html',
  styleUrl: './real-crud.scss',
})
export class RealCrud  implements OnInit {
  private readonly crudService = inject(ServiceCrud);
  private readonly fb = inject(FormBuilder);

  // ── State ────────────────────────────────────────────────────
  readonly users = signal<User[]>([]);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly deletingId = signal<number | null>(null);
  readonly editingId = signal<number | null>(null); // null = ADD, number = EDIT
  readonly message = signal('');

  // ── Form ─────────────────────────────────────────────────────
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // ── READ ─────────────────────────────────────────────────────
  loadUsers(): void {
    this.isLoading.set(true);
    this.crudService
      .getUsers()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (users) => this.users.set(users),
        error: () => this.notify('❌ Failed to load users.'),
      });
  }

  // ── EDIT mode ────────────────────────────────────────────────
  editUser(user: User): void {
    this.editingId.set(user.id);
    this.form.patchValue(user);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  // ── CREATE / UPDATE — one submit, mode decided by editingId ──
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.form.getRawValue();
    const id = this.editingId();

    const request$ =
      id !== null
        ? this.crudService.updateUser(id, payload)
        : this.crudService.createUser(payload);

    this.isSaving.set(true);
    request$.pipe(finalize(() => this.isSaving.set(false))).subscribe({
      next: () => {
        this.notify(id !== null ? '✏️ User updated successfully!' : '✅ User added successfully!');
        this.cancelEdit();
        this.loadUsers(); // re-fetch → UI always mirrors the database
      },
      error: () => this.notify('❌ Failed to save user.'),
    });
  }

  // ── DELETE — pass only the id, then re-fetch ─────────────────
  deleteUser(id: number): void {
    this.deletingId.set(id);
    this.crudService
      .deleteUser(id)
      .pipe(finalize(() => this.deletingId.set(null)))
      .subscribe({
        next: () => {
          this.notify(`🗑️ User #${id} deleted.`);
          this.loadUsers(); // re-fetch → deleted row gone because DB says so
        },
        error: () => this.notify('❌ Failed to delete user.'),
      });
  }

  // ── Helper ───────────────────────────────────────────────────
  private notify(text: string): void {
    this.message.set(text);
    setTimeout(() => this.message.set(''), 3000); // auto-dismiss toast
  }
}
