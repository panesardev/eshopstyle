import { Component, inject, input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { computedAsync } from 'ngxtension/computed-async';
import { Store } from '@ngxs/store';
import { Product } from '../../../types/product.interface';
import { AddProduct } from '../../../store/cart/cart.actions';
import { map } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
})
export default class ProductComponent {
  private productsService = inject(ProductsService);
  private store = inject(Store);

  id = input.required<string>();

  product = computedAsync(() => this.productsService.find(this.id()));
  productCategoryName = computedAsync(() => 
    this.productsService.categories$.pipe(
      map(categories => categories.find(c => c.id === this.product().categoryId).name),
    )
  );

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

}
