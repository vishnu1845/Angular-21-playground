import { Component, computed, signal } from '@angular/core';
import { single } from 'rxjs';

export interface TodoList {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {

  // newTodo = signal('');
  // todos = signal<TodoList[]>([]);

  // remainingCount = computed(() => this.todos().filter(t => !t.done).length);

  // addTodo(): void {
  //   const text = this.newTodo().trim();
  //   if (!text) return;

  //   this.todos.update(list => [...list, { text, done: false }]);
  //   this.newTodo.set('');
  // }

  // toggleTodo(index: number): void {
  //   this.todos.update(list =>
  //     list.map((t, i) => i === index ? { ...t, done: !t.done } : t)
  //   );
  // }

  // deleteTodo(index: number): void {
  //   this.todos.update(list => list.filter((_, i) => i !== index));
  // }


  // ///////////////////////////////////////////////////

  newTodo = signal('');
  todos = signal<TodoList[]>([]);

  addTodo() {
    let text = this.newTodo().trim()

    if(!text) return;

    this.todos.update(list => [...list, {text, done:false}]);
    this.newTodo.set('');
  }

  deleteTodo(index: number) {
    let result = confirm('are you sure about this delete action')
    if(result) {
      this.todos.update(list => list.filter((_, i) => i !== index));
    }
  }
}