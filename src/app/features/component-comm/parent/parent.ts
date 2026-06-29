import { Component, signal } from '@angular/core';
import { Child } from './child/child';

@Component({
  selector: 'app-parent',
  imports: [Child],
  templateUrl: './parent.html',
  styleUrl: './parent.scss',
})
export class Parent {

  parentName = signal('Alex');

  outputMessage = signal('');
  onMessageReceived(message: string) {
    this.outputMessage.set(message);
  }

}