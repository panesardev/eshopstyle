import { Component, input, output } from '@angular/core';
import { Product } from '../../products/products.interface';
import { CartItem } from '../cart.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  template: `
    <div class="flex flex-col md:flex-row justify-between gap-6 bg-white p-4">
      <div class="flex items-center gap-6">
        <h1 class="font-bold">{{ item().product.name }}</h1>
      </div>
      <div class="flex justify-between md:justify-start gap-6">
        <div class="bg-base-200 w-fit px-3 py-1 rounded-full">{{ '$ ' + item().product.price.toFixed(2) }}</div>
        <div class="flex justify-center items-center gap-4">
          <span class="border-slate-200 hover:bg-slate-100 border-2 px-3 py-1 cursor-pointer" (click)="onRemoveProduct.emit(item().product)">-</span>
          <span class="border-slate-200 bg-slate-100 border-2 w-12 py-1 text-center">{{ item().quantity }}</span>
          <span class="border-slate-200 hover:bg-slate-100 border-2 px-3 py-1 cursor-pointer" (click)="onAddProduct.emit(item().product)">+</span>
        </div>
      </div>
    </div>
  `,
})
export class CartItemComponent {
  item = input.required<CartItem>();
  onAddProduct = output<Product>();
  onRemoveProduct = output<Product>();
}
