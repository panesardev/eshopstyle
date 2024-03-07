import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar.component';
import { FooterComponent } from './layout/footer.component';
import { ModalComponent } from './layout/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ModalComponent,
  ],
  template: `
    <app-modal/>
    <app-navbar/>
    <main class="max-w-[1920px] mx-auto mt-20 p-4 md:p-8">
      <router-outlet />
    </main>
    <app-footer/>
  `,
})
export class AppComponent {
  
}
