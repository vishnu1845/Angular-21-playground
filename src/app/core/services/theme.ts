import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  
  isDarkMode = signal(true);

  constructor() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {

      this.isDarkMode.set(false);
    }

    effect(() => {

      const dark = this.isDarkMode();

      document.body.classList.toggle(
        'light-theme',
        !dark
      );

      localStorage.setItem(
        'theme',
        dark ? 'dark' : 'light'
      );

    });

  }

  toggleTheme() {

    this.isDarkMode.update(value => !value);
  }
}

