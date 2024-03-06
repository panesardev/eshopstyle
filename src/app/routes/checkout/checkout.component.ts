import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { CartStateType } from '../../types/cart.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../types/product.interface';
import { AddProduct, RemoveProduct } from '../../store/cart/cart.actions';
import { TAX } from '../../app.constants';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  private store = inject(Store);
  private auth = inject(AuthService);

  cart = computedAsync(() => this.store.select<CartStateType>(state => state.cart));
  user = computedAsync(() => this.auth.user$);

  TAX = TAX;
  
  removeProduct(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }
  
  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }
}
