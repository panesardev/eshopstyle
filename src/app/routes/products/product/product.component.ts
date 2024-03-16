import { Component, inject, input } from '@angular/core';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { ProductsService } from '../../../services/products.service';
import { AddProduct } from '../../../store/cart/cart.actions';
import { Product } from '../../../types/product.interface';

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
  
  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

}
