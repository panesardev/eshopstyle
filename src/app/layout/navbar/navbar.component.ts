import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { BRAND } from '../../app.constants';
import { ModalService } from '../modals/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private modal = inject(ModalService);
  private store = inject(Store);

  cartQuantity = toSignal(this.store.select(state => state.cart.quantity));

  brand = BRAND;

  openNavModal(): void {
    this.modal.openLazy(() => import('../modals/components/nav.component').then(c => c.NavComponent));
  }

  openCartModal(): void {
    this.modal.openLazy(() => import('../modals/components/cart.component').then(c => c.CartComponent));
  }

}
