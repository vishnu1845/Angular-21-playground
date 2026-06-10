import { Component, computed, signal } from '@angular/core';
import { SIDEBAR_DATA } from '../../../core/constants/sidebar-data';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from "@angular/router";
import { Search } from '../../../core/services/search';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  constructor(private searchService: Search) {

  }

  sidebarItems = computed(() => {

    const term = this.searchService
      .searchTerm()
      .toLowerCase();

    if (!term) {

      return SIDEBAR_DATA;
    }

    return SIDEBAR_DATA
      .map(section => ({

        ...section,

        children: section.children.filter(child =>

          child.label
            .toLowerCase()
            .includes(term)
        )

      }))
      .filter(section => section.children.length > 0);

  });

  activeSection = signal<number>(0);

  toggleSection(index: number) {
    this.activeSection.set(index);
  }
}


