import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  message = signal('initial child value');

  update() {
    this.message.set('UPDATED at ' + new Date().toLocaleTimeString());
  }

  greet(name: string): string {
    return `Child says hi to ${name}`;
  }
}

