import { Product } from "./product.interface";

export interface CartStateType {
  subtotal: number;
  total: number;
  items: CartItem[];
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}
