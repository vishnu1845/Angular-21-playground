// import { Component, inject, OnInit, signal } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// import { JsonCrud, User, UserPayload } from '../../../core/services/json-crud';

// @Component({
//   selector: 'app-crud',
//   imports: [ReactiveFormsModule],
//   templateUrl: './crud.html',
// })
// export class Crud implements OnInit {
//   private jsonServer = inject(JsonCrud);
//   private fb = inject(FormBuilder);

//   public users = signal<User[]>([]);
//   public tableHead = ['Id', 'Name', 'Email', 'Phone', 'Actions'];
//   public editingId = signal<string | null>(null);

//   form = this.fb.nonNullable.group({
//     name: ['', [Validators.required]],
//     email: ['', [Validators.required, Validators.email]],
//     phone: ['', [Validators.required]],
//   });

//   get f() {
//     return this.form.controls;
//   }

//   get isEditing(): boolean {
//     return this.editingId() !== null;
//   }

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   // READ
//   loadUsers(): void {
//     this.jsonServer.getUsers().subscribe((data) => this.users.set(data));
//   }

//   // CREATE / UPDATE
//   onSubmit(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     const payLoad: UserPayload = this.form.getRawValue();
//     const id = this.editingId();

//     const request$ = id
//       ? this.jsonServer.updateUser(id, payLoad)
//       : this.jsonServer.createUser(payLoad);

//     request$.subscribe(() => {
//       this.cancelEdit();
//       this.loadUsers();
//     });
//   }

//   // EDIT mode
//   onEdid(user: User): void {
//     this.editingId.set(user.id);
//     this.form.patchValue(user);
//   }

//   cancelEdit(): void {
//     this.editingId.set(null);
//     this.form.reset();
//   }

//   // DELETE
//   onDelete(id: string): void {
//     this.jsonServer.deleteUser(id).subscribe(() => this.loadUsers());
//   }
// }



// // *************************************************************************************************************


import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { JsonCrud, User, UserPayload } from '../../../core/services/json-crud';

@Component({
  selector: 'app-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './crud.html',
})
export class Crud implements OnInit {
  private readonly jsonCrud = inject(JsonCrud);
  private readonly fb = inject(FormBuilder);

  readonly users = signal<User[]>([]);
  readonly editingId = signal<string | null>(null); // null = ADD, id = EDIT

  // dynamic table headers
  readonly columns = ['ID', 'Name', 'Email', 'Phone', 'Actions'];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });

  get f() {
    return this.form.controls;
  }

  get isEditing(): boolean {
    return this.editingId() !== null;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // READ
  loadUsers(): void {
    this.jsonCrud.getUsers().subscribe((users) => this.users.set(users));
  }

  // EDIT mode
  editUser(user: User): void {
    this.editingId.set(user.id);
    this.form.patchValue(user);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
  }

  // CREATE / UPDATE
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UserPayload = this.form.getRawValue();
    const id = this.editingId();

    const request$ = id
      ? this.jsonCrud.updateUser(id, payload)
      : this.jsonCrud.createUser(payload);

    request$.subscribe(() => {
      this.cancelEdit();
      this.loadUsers();
    });
  }

  // DELETE
  deleteUser(id: string): void {
    this.jsonCrud.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
