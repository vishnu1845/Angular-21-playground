import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Search } from '../../../core/services/search';
import { Theme } from '../../../core/services/theme';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(public searchService: Search, public themeService: Theme){}
}
