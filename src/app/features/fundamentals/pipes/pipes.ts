import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { PrefixPipe } from "../../../shared/pipes/prefix-pipe";

interface Person {
  name:   string;
  gender: string;
  age:    number;
}

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.html',
  imports: [CommonModule, PrefixPipe],
})
export class Pipes {

  // ── TEXT ───────────────────────────────────────────────────────────────
  name = 'angular pipes are awesome';

  // ── DATE ───────────────────────────────────────────────────────────────
  today = new Date();

  // ── NUMBER ─────────────────────────────────────────────────────────────
  pi       = 3.14159265;
  discount = 0.85;

  // ── CURRENCY ───────────────────────────────────────────────────────────
  price = 1234.56;

  // ── SLICE ──────────────────────────────────────────────────────────────
  fruits = ['Apple', 'Mango', 'Banana', 'Orange', 'Grapes'];
  title  = 'Hello Angular World';

  // ── JSON ───────────────────────────────────────────────────────────────
  user = { name: 'Alex', age: 25, city: 'Pune' };

  // ── KEYVALUE ───────────────────────────────────────────────────────────
  // Record<KeyType, ValueType>
  // it's a TypeScript utility type
  // means — an object where ALL keys are string AND all values are string

  person: Record<string, string> = {
    firstName : 'Alex',
    lastName  : 'Dev',
    city      : 'Pune',
  };


  // ── CUSTOM PIPE ───────────────────────────────────────────────────────────

  people: Person[] = [
    { name: 'Alex',  gender: 'male',   age: 25 },
    { name: 'Sarah', gender: 'female', age: 30 },
    { name: 'John',  gender: 'male',   age: 22 },
  ];

  // str:string = 'hey alex'
}
