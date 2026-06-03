import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';

interface RegisterData {
  userName: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-signal-forms',
  imports: [FormField],
  templateUrl: './signal-forms.html',
  styleUrl: './signal-forms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalForms {

  // registerModel = signal<RegisterData>({
  //   userName: '',
  //   email: '',
  //   password: '',
  //   rememberMe: false,
  // });

  // registerForm = form(this.registerModel);

  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   submit(this.registerForm, async () => {
  //     const data = this.registerModel();
  //     console.log('Form Submitted', data);
  //   });
  // }

/////////////////////////////////////////////////////////////////////////////

  registerModel = signal<RegisterData>({
    userName: '',
    email: '',
    password: '',
    rememberMe: false
  })

  registerForm = form(this.registerModel);

  onSubmit(event:Event) {
    event.preventDefault();
    submit(this.registerForm, async () => {
      const data = this.registerModel();
      console.log('Form Submitted', data);
    })
  }
}