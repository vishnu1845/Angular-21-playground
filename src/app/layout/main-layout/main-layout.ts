import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
// import { HeaderComponent } from '../../shared/components/header/header.component';

// @Component({
//   selector: 'app-main-layout',
//   imports: [
//     RouterOutlet,
//     SidebarComponent,
//     HeaderComponent
//   ],
//   templateUrl: './main-layout.component.html',
//   styleUrl: './main-layout.component.scss',
// })
// export class MainLayoutComponent {}