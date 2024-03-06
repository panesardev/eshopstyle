import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { AddProduct } from '../../store/cart/cart.actions';
import { CategoryFilter, PriceFilter, Product, ProductsStateType } from '../../types/product.interface';
import { SetCategoryFilter, SetPriceFilter } from '../../store/products/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {
  private store = inject(Store);

  state = computedAsync(() => 
    this.store.select<ProductsStateType>(state => state.products)
  );

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

  setPriceFilter(filter: PriceFilter) {
    this.store.dispatch(new SetPriceFilter(filter));
  }
  
  setCategoryFilter(filter: CategoryFilter) {
    this.store.dispatch(new SetCategoryFilter(filter));
  }

}
