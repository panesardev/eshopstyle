import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../app.constants';
import { Category, Product } from '../types/product.interface';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);

  products$ = this.http.get<Product[]>(`${API_URL}/products`);
  categories$ = this.http.get<Category[]>(`${API_URL}/categories`);

  find(id: string) {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  findByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${API_URL}/categories/${categoryId}`);
  }

}
