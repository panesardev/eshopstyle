import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { AddProduct } from '../../store/cart/cart.actions';
import { CategoryFilter, PriceFilter, Product, ProductsStateType } from '../../types/product.interface';
import { SetCategoryFilter, SetPriceFilter } from '../../store/products/products.actions';
import { ProductListComponent } from '../../layout/components/product-list.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    ProductListComponent,
  ],
  templateUrl: './products.component.html',
})
export default class ProductsComponent {
  private store = inject(Store);

  state = computedAsync(() => this.store.select<ProductsStateType>(state => state.products));

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

  setPriceFilter(filter: PriceFilter) {
    this.store.dispatch(new SetPriceFilter(filter));
  }
  
  setCategoryFilter(filter: CategoryFilter) {
    this.store.dispatch(new SetCategoryFilter(filter));
  }

  isActivePriceFilter(filter: PriceFilter) {
    return this.state().priceFilter === filter;
  }

  isActiveCategoryFilter(filter: CategoryFilter) {
    return this.state().categoryFilter === filter;
  }

}
