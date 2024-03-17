import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { FooterComponent } from './layout/footer.component';
import { ModalComponent } from './layout/modal.component';
import { NavbarComponent } from './layout/navbar.component';
import { AddProduct, RemoveProduct } from './store/cart/cart.actions';
import { RemoveSavedProduct, SaveProduct } from './store/user/user.actions';

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
  private toast = inject(HotToastService);
  private actions$ = inject(Actions);

  constructor() {
    this.actions$.pipe(ofActionSuccessful(AddProduct))
      .subscribe(action => this.toast.success(`${action.product.name} add to your cart!`));
    
    this.actions$.pipe(ofActionSuccessful(RemoveProduct))
      .subscribe(action => this.toast.success(`${action.product.name} removed from your cart!`));

    this.actions$.pipe(ofActionSuccessful(SaveProduct))
      .subscribe(action => this.toast.success(`${action.product.name} saved to your profile!`));
      
    this.actions$.pipe(ofActionSuccessful(RemoveSavedProduct))
      .subscribe(action => this.toast.success(`${action.product.name} removed from your profile!`));
  }

}
