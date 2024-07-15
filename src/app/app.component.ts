import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { RenderModalComponent } from './layout/modals/render-modal.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RenderModalComponent,
  ],
  template: `
    <app-navbar />
    <main class="max-w-[1920px] mx-auto mt-20 p-4 md:p-8">
      <router-outlet />
    </main>
    @defer {
      <app-footer />
      <app-render-modal />
    }
  `,
})
export class AppComponent {}
