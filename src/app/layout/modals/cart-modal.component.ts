import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { CartStateType } from '../../types/cart.interface';
import { Modal } from '../../types/modal.class';
import { BaseModalComponent } from './base-modal.component';
import { RouterLink } from '@angular/router';
import { AddProduct, RemoveProduct, ResetCart } from '../../store/cart/cart.actions';
import { Product } from '../../types/product.interface';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [
    BaseModalComponent,
    RouterLink,
  ],
  template: `
    <app-base-modal classes="md:w-[700px] md:ml-auto h-full">
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
              <div class="flex flex-col md:flex-row justify-between gap-6 bg-white p-4">
                <div class="flex items-center gap-6">
                  <h1 class="font-bold">{{ item.product.name }}</h1>
                </div>
                <div class="flex justify-between md:justify-start gap-6">
                  <div class="bg-base-200 w-fit px-3 py-1 rounded-full">{{ '$ ' + item.product.price.toFixed(2) }}</div>
                  <div class="flex justify-center items-center gap-4">
                    <span class="border-slate-200 hover:bg-slate-100 border-2 px-3 py-1 cursor-pointer" (click)="removeProduct(item.product)">-</span>
                    <span class="border-slate-200 bg-slate-100 border-2 w-12 py-1 text-center">{{ item.quantity }}</span>
                    <span class="border-slate-200 hover:bg-slate-100 border-2 px-3 py-1 cursor-pointer" (click)="addProduct(item.product)">+</span>
                  </div>
                </div>
              </div>
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
    </app-base-modal>
  `,
})
export class CartModalComponent extends Modal {
  private store = inject(Store);

  cart = computedAsync(() => this.store.select<CartStateType>(state => state.cart));

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
