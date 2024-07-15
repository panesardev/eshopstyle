import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Product } from '../products/products.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private auth = inject(AuthService);

  products$ = this.auth.user$.pipe(
    map(user => user.products),
  );

  async setProducts(products: Product[]) {
    const user = await firstValueFrom(this.auth.user$);
    await this.auth.setUserDoc(user.uid, { created: user.created, products });
  }

}
