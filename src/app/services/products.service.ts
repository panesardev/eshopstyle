import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../app.constants';
import { Product } from '../types/product.interface';
import { first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  products$ = this.http.get<Product[]>(`${API_URL}/products`).pipe(first());

  find(id: string) {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

}
