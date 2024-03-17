import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, first, firstValueFrom, map, of } from 'rxjs';
import { Product } from '../types/product.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private auth = inject(AuthService);

  getUserProducts() {
    return this.auth.user$.pipe(
      first(),
      map(user => user.products),
      catchError(() => of([])),
    );
  }

  async setUserProducts(products: Product[]) {
    const user = await firstValueFrom(this.auth.user$);
    await this.auth.setUser(user.uid, { products });
  }

}
