import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { TAX } from "../../app.constants";
import { CartItem } from "../../types/cart.interface";
import { AddProduct, ComputePrice, ComputeQuantity, RemoveProduct, ResetCart, SaveCart } from "./cart.actions";

export interface CartStateType {
  subtotal: number;
  total: number;
  items: CartItem[];
  quantity: number;
}

const initialState: CartStateType = {
  items: [],
  subtotal: 0.00,
  total: 0.00,
  quantity: 0,
};

@State({
  name: 'cart',
  defaults: initialState,
})
@Injectable()
export class CartState {
  private platformId = inject(PLATFORM_ID);

  ngxsOnInit(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platformId) && localStorage['cart']) {
			const state = JSON.parse(localStorage['cart']);
			ctx.setState(state);
		}
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<CartStateType>, action: AddProduct) {
    const state = ctx.getState();

    const exists = state.items.find(item => item.product.id === action.product.id);

    if (exists) {
      const index = state.items.indexOf(exists);
      state.items[index].quantity++;
      state.items[index].price = state.items[index].price + action.product.price;
    } 
    else {
      const item: CartItem = { 
        product: action.product,
        price: action.product.price,
        quantity: 1,
      };
      state.items.push(item);
    }
    
    ctx.setState(state);

    ctx.dispatch([
      new ComputeQuantity(),
      new ComputePrice(),
      new SaveCart(),
    ]);
  }

  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<CartStateType>, action: RemoveProduct) {
    const state = ctx.getState();

    const exists = state.items.find(item => item.product.id === action.product.id);

    if (exists) {
      const index = state.items.indexOf(exists);
      if (state.items[index].quantity > 0) {
        state.items[index].quantity--;
        state.items[index].price = state.items[index].price - action.product.price;
      }
      else if (state.items[index].quantity == 0) {
        state.items.splice(index, 1);
      }
    }

    ctx.setState(state);
    
    ctx.dispatch([
      new ComputeQuantity(),
      new ComputePrice(),
      new SaveCart(),
    ]);
  }

  @Action(SaveCart)
  saveCart(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platformId)) {
			localStorage['cart'] = JSON.stringify(ctx.getState());
		}
  }

  @Action(ResetCart)
  resetCart(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platformId)) {
      const resetState: CartStateType = {
        items: [],
        subtotal: 0.00,
        total: 0.00,
        quantity: 0,
      };
      
      localStorage['cart'] = JSON.stringify(resetState);
      ctx.setState(resetState);
		}
  }

  @Action(ComputeQuantity)
  computeQuantity(ctx: StateContext<CartStateType>) {
    const state = ctx.getState();

    state.quantity = state.items.map(i => i.quantity).reduce((p, c) => p + c);

    ctx.setState(state);
  }

  @Action(ComputePrice)
  computePrice(ctx: StateContext<CartStateType>) {
    const state = ctx.getState();

    state.subtotal = state.items.map(i => i.price).reduce((p, c) => p + c);
    state.total = state.subtotal + (state.subtotal * TAX);

    ctx.setState(state);
  }

}