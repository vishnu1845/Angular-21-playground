import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface User {
  name: string;
  age: number;
}

interface FormData {
  userName: string;
  email: string;
}

@Component({
  selector: 'app-data-binding',
  imports: [FormsModule],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {

  // ─── i. String Interpolation ───────────────────────────────
  greet: string = 'Hey, Morning!';
  currentDate: Date = new Date();
  pi: number = 3.14159;
  userName = signal<string>('Alex');

  getUpperName(): string {
    return this.userName().toUpperCase();
  }

  // ─── ii. Property Binding ──────────────────────────────────
  imageUrl = 'images/car.jpeg';
  isLoading = signal<boolean>(false);
  tooltipText = signal<string>('Click to submit');
  inputPlaceholder = signal<string>('Enter something...');

  toggleLoading(): void {
    this.isLoading.update(v => !v);
  }

  // ─── iii. Event Binding ────────────────────────────────────
  userName1     = signal<string>('Alex');
  count         = signal<number>(0);
  focused       = signal<boolean>(false);
  keyPressed    = signal<string>('');
  mousePos      = signal<{ x: number; y: number }>({ x: 0, y: 0 });
  submittedData = signal<FormData | null>(null);

  private searchInput$ = new Subject<string>();
  // Subject is both Observable + Observer
  // You can PUSH values into it  →  .next(val)
  // You can LISTEN to it         →  .subscribe()
  
  searchTerm    = signal<string>('');

  constructor() {
    this.searchInput$.pipe(debounceTime(400)).subscribe(val => {
      this.searchTerm.set(val);
    });
  }

  onInputChange(event: Event): void {
    console.log(event);
    const value = (event.target as HTMLInputElement).value;  // type assertion  , forcefully anocote -type assertion doesn't convert the value, it just tells TypeScript what type to treat it as at compile time. Runtime doesn't care.
    // const value = ( document.getElementById('userName') as HTMLInputElement).value
    this.userName1.set(value);
  }

  onIncrement(): void { this.count.update(c => c + 1); }
  onDecrement(): void { this.count.update(c => c - 1); }
  onReset(): void     { this.count.set(0); }

 onEnterPress(event: KeyboardEvent): void {
  if (event.key !== 'Enter') return;  // ✅ guard at top
  const value = (event.target as HTMLInputElement).value;
  console.log('Enter confirmed:', value);
}

  onKeyUp(event: KeyboardEvent): void {
    this.keyPressed.set(event.key);
  }

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchInput$.next(val); // pushes value into the pipe
  }

  onMouseMove(event: MouseEvent): void {
    this.mousePos.set({ x: event.offsetX, y: event.offsetY });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    this.submittedData.set({
      userName: data.get('userName') as string,
      email:    data.get('email') as string,
    });
    form.reset();
  }

  // ─── iv. Two-Way Binding — OLD WAY (ngModel) ──────────────
  username       = signal('');
  user           = signal<User>({ name: 'Alice', age: 22 });
  ngModelValue   = '';          // plain variable for classic ngModel

  updateName(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.user.update(u => ({ ...u, name: value }));
  }

  updateAge(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.user.update(u => ({ ...u, age: value }));
  }

  // ─── iv. Two-Way Binding — NEW WAY (model() signal) ───────
  count2        = model<number>(0);
  modelName     = model<string>('');
  modelUser     = signal<User>({ name: 'Bob', age: 25 });

  updateCount(delta: number): void {
    this.count2.update(v => v + delta);
  }

  updateModelName(event: Event): void {
    const value = (event.target as HTMLInputElement).value; 
    this.modelName.set(value);
  }

  updateModelUser(field: keyof User, event: Event): void {
    const raw   = (event.target as HTMLInputElement).value;
    const value = field === 'age' ? Number(raw) : raw;
    this.modelUser.update(u => ({ ...u, [field]: value }));
  }
}