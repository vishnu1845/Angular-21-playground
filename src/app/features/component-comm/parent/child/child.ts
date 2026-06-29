import { Component, EventEmitter, input, Input, output, Output, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {

  // @Input() userName!: string;
  userName = input<string>();

  // @Output() messageEvent = new EventEmitter<string>();
  messageEvent = output<string>();
  sendMessageViaOutput() {
    this.messageEvent.emit('Hello Parent! (via Output)');
  }

  message = signal<string>('');
  sendMessageViaSignal() {
    this.message.set('Hello Parent! (via Signal + TemplateRef)');
  }
}