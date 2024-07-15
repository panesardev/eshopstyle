import { CartItem, CartStateType } from "./cart.interface";

export function initialCartState(): CartStateType {
  return {
    items: [],
    subtotal: 0.00,
    total: 0.00,
    quantity: 0,
  };
}

export function createCartItem(item: CartItem): CartItem {
  return item;
}
