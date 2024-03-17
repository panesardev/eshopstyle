import { Component, effect, inject, input } from '@angular/core';
import { Store } from '@ngxs/store';
import { computedAsync } from 'ngxtension/computed-async';
import { ProductsService } from '../../../services/products.service';
import { AddProduct } from '../../../store/cart/cart.actions';
import { Product } from '../../../types/product.interface';
import { RemoveSavedProduct, SaveProduct } from '../../../store/user/user.actions';
import { UserState, UserStateType } from '../../../store/user/user.state';
import { map } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
})
export default class ProductComponent {
  private productsService = inject(ProductsService);
  private auth = inject(AuthService);
  private store = inject(Store);

  id = input.required<string>();

  product = computedAsync(() => this.productsService.find(this.id()));

  isProductSaved = computedAsync(() => 
    this.auth.user$.pipe(
      map(user => user.products),
      map(products => products.find(p => p.id === this.id())),
      map(product => !!product),
    ),
  );

  addToCart(product: Product): void {
    this.store.dispatch(new AddProduct(product));
  }

  saveProduct(product: Product): void {
    this.store.dispatch(new SaveProduct(product));
  }

  removeSavedProduct(product: Product): void {
    this.store.dispatch(new RemoveSavedProduct(product));
  }

}
