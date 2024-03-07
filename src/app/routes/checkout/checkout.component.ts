import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { CartStateType } from '../../types/cart.interface';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../types/product.interface';
import { AddProduct, RemoveProduct, ResetCart } from '../../store/cart/cart.actions';
import { TAX } from '../../app.constants';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  private store = inject(Store);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  cart = computedAsync(() => this.store.select<CartStateType>(state => state.cart));
  user = computedAsync(() => this.auth.user$);

  TAX = TAX;

  email: string;
  emailError: boolean = false;
  displayName: string;
  displayNameError: boolean = false;

  showStep2 = false;
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;

  userEffect = effect(() => {
    if (this.user()) {
      this.email = this.user().email;
      this.emailError = false;
      this.displayName = this.user().displayName;
      this.displayNameError = false;
    }
  });
  
  removeProduct(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }
  
  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  continueFromEmail() {
    if (!this.email) {
      this.emailError = true; 
      this.showStep2 = false;
    } 
    else if (!this.displayName) {
      this.displayNameError = true; 
      this.showStep2 = false;
    }
    else {
      this.emailError = false;
      this.displayNameError = false;
      this.showStep2 = true;
    }
  }

  placeOrder() {
    this.store.dispatch(new ResetCart());
    this.router.navigateByUrl('/');
    this.toast.success('Your order has been placed!');
  }
}
