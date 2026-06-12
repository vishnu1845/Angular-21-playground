import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-basic',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-basic.html',
  styleUrl: './template-basic.scss',
})
export class TemplateBasic {
  user = { email: '', password: '' };

  onSubmit(form: NgForm) {
    console.log('form.value →', form.value);
    form.resetForm();
  }
}