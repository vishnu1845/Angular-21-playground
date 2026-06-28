import { Component, inject, OnInit, signal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Test, User } from '../../../core/services/test';

@Component({
  selector: 'app-component-lifecycle-demo',
  imports: [ReactiveFormsModule],
  templateUrl: './component-lifecycle-demo.html',
  styleUrl: './component-lifecycle-demo.scss',
})
export class ComponentLifecycleDemo implements OnInit {

  private jsonServer = inject(Test);
  private fb = inject(FormBuilder);

  public users = signal<User[]>([]);
  // public users: any[] = []
  public tableHead = ['Id','Name', 'Email', 'Phone', 'Actions'];
  public editableId = signal<null | string> (null);

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData() {
    this.jsonServer.getApi().subscribe((data) => {
      this.users.set(data)
      console.log(this.users());
      // this.users.push(data)
    })
  }


  form = this.fb.nonNullable.group({
    name: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]]
  })

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const id = this.editableId();

    const request$ = id
      ? this.jsonServer.updateUser(id, payload)
      : this.jsonServer.postApi(payload)

    request$.subscribe(() => {
      this.fetchData()
      this.form.reset()
    })

    console.log(this.form.getRawValue());//disabled
  }

  get f () {return this.form.controls;}


  onEdit(user: User) {
    this.editableId.set(user.id);
    this.form.patchValue(user)
  }

  onDelete(id: string): void {
    this.jsonServer.deleteData(id).subscribe(() => {
      this.fetchData();
    })
  }

  cancelEdit(): void {
    this.editableId.set(null);
    this.form.reset();
  }
}