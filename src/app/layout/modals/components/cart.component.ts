import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { AddProduct, RemoveProduct, ResetCart } from '../../../domains/cart/cart.actions';
import { CartStateType } from '../../../domains/cart/cart.interface';
import { CartItemComponent } from '../../../domains/cart/components/cart-item.component';
import { Product } from '../../../domains/products/products.interface';
import { Modal } from '../modal.class';
import { ModalComponent } from '../modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    ModalComponent,
    CartItemComponent,
  ],
  template: `
    <app-modal classes="md:w-[700px] md:ml-auto h-full">
      <div class="grid grid-cols-3 items-center mb-4">
        <div></div>
        <h1 class="text-2xl text-center">Your Cart</h1>
        <div>
          <button class="bg-primary text-white ml-auto py-1 px-3 rounded-full" (click)="modal.close()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="h-0 border-[1px] border-base-300 rounded-full mb-8"></div>
      @if (!cart() || !cart().items.length) {
        <p>Cart is empty!</p>
        <a routerLink="/products" class="text-primary hover:underline" (click)="modal.close()">Browse products</a>
      }
      @else {
        <div class="grid gap-8">
          <div class="max-h-[400px] overflow-scroll overflow-x-hidden grid gap-4">
            @for (item of cart().items; track item.price) {
              <app-cart-item [item]="item" (onAddProduct)="addProduct($event)" (onRemoveProduct)="removeProduct($event)"/>
            }
          </div>

          <div class="text-lg text-center">
            Your subtotal is $ {{ cart().subtotal.toFixed(2) }} and taxes will be calculated at checkout.
          </div>

          <div class="flex justify-center gap-4 md:gap-8">
            <button class="bg-white text-red-500 px-6 py-2" (click)="resetCart()">Reset Cart</button>
            <button routerLink="/checkout" (click)="modal.close()" class="text-white bg-primary px-8 py-3">Continue to checkout</button>
          </div>
        </div>
      }
    </app-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends Modal {
  private store = inject(Store);

  cart = toSignal(this.store.select<CartStateType>(state => state.cart));

  removeProduct(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
  }
  
  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  resetCart() {
    this.store.dispatch(new ResetCart());
  }

}
