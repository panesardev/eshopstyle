import { Product } from "../products/products.interface";

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface CartStateType {
  subtotal: number;
  total: number;
  items: CartItem[];
  quantity: number;
}
