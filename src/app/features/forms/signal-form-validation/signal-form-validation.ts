// import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
// import { form, FormField, submit, required, email } from '@angular/forms/signals';

// interface RegisterData {
//   userName: string;
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// @Component({
//   selector: 'app-signal-form-validation',
//   standalone: true,
//   imports: [FormField],
//   templateUrl: './signal-form-validation.html',
//   styleUrls: ['./signal-form-validation.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SignalFormValidation {

//   registerModel = signal<RegisterData>({
//     userName: '',
//     email: '',
//     password: '',
//     rememberMe: false,
//   });

//   registerForm = form(this.registerModel, (fieldPath) => {
//     required(fieldPath.userName, { message: 'Username is required.' });
//     required(fieldPath.email,    { message: 'Email is required.' });
//     email(fieldPath.email,       { message: 'Enter a valid email.' });
//     required(fieldPath.password, { message: 'Password is required.' });
//   });

//   onSubmit(event: Event) {
//     event.preventDefault();
//     submit(this.registerForm, async () => {
//       console.log('Submitted ✅', this.registerModel());
//     });
//   }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////



//CRUD

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, submit, required, email, minLength } from '@angular/forms/signals';

interface RegisterData {
  userName: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

interface UserRecord extends RegisterData {
  id: number;
}

@Component({
  selector: 'app-signal-form-validation',
  imports: [FormField],
  templateUrl: './signal-form-validation.html',
  styleUrl: './signal-form-validation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormValidation {

  tableHeaders = ['#', 'Username', 'Email', 'Password', 'Remember Me', 'Action'];

  users    = signal<UserRecord[]>([]);
  nextId   = signal(1);
  editingId = signal<number | null>(null);

  // ── the signal IS the form model — patch & reset happen here ──────────
  private emptyModel: RegisterData = {
    userName: '',
    email: '',
    password: '',
    rememberMe: false,
  };

  registerModel = signal<RegisterData>({ ...this.emptyModel });

  registerForm = form(this.registerModel, (path) => {
    required(path.userName, { message: 'Username is required.' });
    required(path.email,    { message: 'Email is required.' });
    email(path.email,       { message: 'Enter a valid email.' });
    required(path.password, { message: 'Password is required.' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters.' });
  });

  // ── RESET — just set signal back to empty ─────────────────────────────
  private resetForm(): void {
    this.registerModel.set({ ...this.emptyModel });
  }

  // ── SUBMIT ────────────────────────────────────────────────────────────
  onSubmit(event: Event): void {
    event.preventDefault();

    submit(this.registerForm, async () => {
      const newUser: UserRecord = {
        id: this.nextId(),
        ...this.registerModel(),
      };
      this.users.update(list => [...list, newUser]);
      this.nextId.update(id => id + 1);
      this.resetForm();
    });
  }

  // ── EDIT — patch signal with existing user data ───────────────────────
  onEdit(user: UserRecord): void {
    this.editingId.set(user.id);
    // "patch" = just set the signal with existing values
    this.registerModel.set({
      userName:   user.userName,
      email:      user.email,
      password:   user.password,
      rememberMe: user.rememberMe,
    });
  }

  // ── UPDATE ────────────────────────────────────────────────────────────
  onUpdate(event: Event): void {
    event.preventDefault();

    submit(this.registerForm, async () => {
      this.users.update(list =>
        list.map(u =>
          u.id === this.editingId()
            ? { id: u.id, ...this.registerModel() }
            : u
        )
      );
      this.editingId.set(null);
      this.resetForm();
    });
  }

  // ── CANCEL ────────────────────────────────────────────────────────────
  onCancel(): void {
    this.editingId.set(null);
    this.resetForm();
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.users.update(list => list.filter(u => u.id !== id));
  }
}