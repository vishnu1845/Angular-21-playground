import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from "../../../shared/directives/highlight";
import { AutoFocusDirective } from '../../../shared/directives/auto-focus';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
}

@Component({
  selector: 'app-directives',
  imports: [CommonModule, HighlightDirective, AutoFocusDirective],
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
})
export class Directives {
  // @if demo
  isLoggedIn = signal(true);

  // @for demo
  users = signal<User[]>([
    { id: 1, name: 'Vishnu', role: 'admin' },
    { id: 2, name: 'Rahul', role: 'user' },
    { id: 3, name: 'Priya', role: 'guest' },
  ]);

  // @switch demo
  currentRole = signal<'admin' | 'user' | 'guest'>('admin');

  // ngClass demo
  isActive = signal(false);
  hasError = signal(false);

  // ngStyle demo
  textColor = signal('teal');

  // Methods
  toggleLogin() {
    this.isLoggedIn.set(!this.isLoggedIn());
  }

  addUser() {
    const newUser: User = {
      id: Date.now(),
      name: `User ${this.users().length + 1}`,
      role: 'user',
    };
    this.users.update(prev => [...prev, newUser]);
  }

  removeUser(id: number) {
    this.users.update(prev => prev.filter(u => u.id !== id));
  }

  switchRole(role: 'admin' | 'user' | 'guest') {
    this.currentRole.set(role);
  }
}