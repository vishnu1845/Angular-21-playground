import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Search {
  searchTerm = signal('');

  setSearchTerm(value: string) {
    this.searchTerm.set(value);
  }
}
