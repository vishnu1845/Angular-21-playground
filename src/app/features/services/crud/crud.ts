import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ServiceCrud, User } from '../../../core/services/service-crud';

@Component({
  selector: 'app-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './crud.html',
  styleUrl: './crud.scss',
})
export class Crud implements OnInit {
  ngOnInit(): void {
    console.log(this.form);
  }

  private crudService = inject(ServiceCrud);
  private fb = inject(FormBuilder);

  // ── State ────────────────────────────────────────────────────
  users = signal<User[]>([]);
  isLoading = signal(false);
  deletingId = signal<number | null>(null);
  editingId = signal<number | null>(null);   // null = ADD mode, number = EDIT mode
  message = signal('');

  // ── Form ─────────────────────────────────────────────────────
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  // ── Single getter ─────────────────────────────────────────────
  get f() { return this.form.controls; }

  // ── GET ──────────────────────────────────────────────────────
  loadUsers(): void {
    this.isLoading.set(true);

    this.crudService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        // console.log(error);
        this.message.set('❌ Failed to load users.');
        this.isLoading.set(false);
      },

    });
  }

  // ── EDIT — fill form with selected user's data ────────────────
  editUser(user: User): void {
    this.editingId.set(user.id);              // switch form to EDIT mode
    this.form.patchValue({                    // patchValue fills only the given fields
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
  }

  // ── CANCEL edit — reset form back to ADD mode ─────────────────
  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  // ── POST / PUT — same submit, mode decided by editingId ───────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as Omit<User, 'id'>;

    if (this.editingId() !== null) {
      // ── PUT ───────────────────────────────────────────────────
      this.crudService.updateUser(this.editingId()!, payload).subscribe({
        next: (updated) => {
          // replace the old user object in the signal array
          this.users.update(prev =>
            prev.map(u => u.id === updated.id ? updated : u)
          );
          this.message.set(`✏️ "${updated.name}" updated successfully!`);
          this.cancelEdit();                  // reset form + exit edit mode
        },
        error: () => this.message.set('❌ Failed to update user.')
      });

    } else {
      // ── POST ──────────────────────────────────────────────────
      this.crudService.createUser(payload).subscribe({
        next: (created) => {
          this.users.update(prev => [...prev, created]);
          this.message.set(`✅ "${created.name}" added successfully!`);
          this.form.reset();
        },
        error: (error: any) => {
          this.message.set('❌ Failed to add user.')
          console.log(error);
        }
      });
    }
  }

  // ── DELETE ───────────────────────────────────────────────────
  deleteUser(id: number): void {
    this.deletingId.set(id);

    this.crudService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(prev => prev.filter(u => u.id !== id));
        this.message.set(`🗑️ User #${id} deleted.`);
        this.deletingId.set(null);
      },
      error: () => {
        this.message.set('❌ Failed to delete user.');
        this.deletingId.set(null);
      }
    });
  }
}