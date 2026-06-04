import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-validators',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-validators.html',
  styleUrl: './custom-validators.scss',
})
export class CustomValidators {

  private fb = inject(FormBuilder);

  form = this.fb.group({
    userName: [''],
    email: [''],
    password: ['']
  })


  onSubmit() {
    console.log(this.form.value);
  }
}
