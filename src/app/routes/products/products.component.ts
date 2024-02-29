import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { ProductsService } from '../../services/products.service';
import { AddProduct } from '../../store/cart/cart.actions';
import { Product } from '../../types/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {
  private productsService = inject(ProductsService);
  private store = inject(Store);

  products = computedAsync(() => this.productsService.products$);

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

}
