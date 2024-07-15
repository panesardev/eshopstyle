import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { AuthService } from '../../../../auth/auth.service';
import { AddProduct } from '../../../../domains/cart/cart.actions';
import { Product } from '../../../../domains/products/products.interface';
import { ProductsService } from '../../../../domains/products/products.service';
import { RemoveSavedProduct, SaveProduct } from '../../../../domains/user/user.actions';

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

  product = toSignal(this.productsService.find(this.id()));

  isProductSaved = toSignal(
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
