import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../products.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
  ],
  template: `
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 md:gap-8">
      @for (product of products(); track product.id) {
        <div class="bg-white grid gap-4 md:gap-6 h-fit p-4 md:p-6 border-2 border-base-100">
          <div routerLink="/products/{{ product.id }}" class="cursor-pointer">
            <img [src]="product.photoURL" [alt]="product.name">
          </div>
          <div>
            <h1 class="text-lg font-bold">{{ product.name }}</h1>
            <p class="w-[12ch] md:w-[16ch] xl:w-[20ch] text-ellipsis text-nowrap overflow-hidden">{{ product.description }}</p>
          </div>
          <div class="flex items-center gap-4 h-8">
            <div class="text-sm md:text-lg font-bold grid content-center bg-base-200 px-2 md:px-4 h-full rounded-full">$ {{ product.price }}</div>
            <div class="text-sm md:text-lg bg-slate-200 hover:bg-base-300 grid content-center px-2 md:px-4 h-full rounded-full cursor-pointer transition-all" (click)="onAddToCart.emit(product)">
              <i class="fa-solid fa-cart-plus"></i>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class ProductListComponent {
  products = input.required<Product[]>();
  onAddToCart = output<Product>();
}
