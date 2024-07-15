import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../app.constants';
import { Product } from './products.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  products$ = this.http.get<Product[]>(`${API_URL}/products`);

  find(id: string) {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

}
