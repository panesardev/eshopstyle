import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduct } from '../../../cart/cart.actions';
import { ProductListComponent } from '../../components/product-list.component';
import { SetCategoryFilter, SetPriceFilter } from '../../products.actions';
import { CategoryFilter, PriceFilter, Product, ProductsStateType } from '../../products.interface';

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

  state = toSignal(this.store.select<ProductsStateType>(state => state.products));

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
