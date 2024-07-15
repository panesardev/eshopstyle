import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Action, NgxsOnInit, State, StateContext } from "@ngxs/store";
import { TAX } from "../../app.constants";
import { AddProduct, ComputeCart, ComputePrice, ComputeQuantity, RemoveProduct, ResetCart, SaveCart } from "./cart.actions";
import { initialCartState, createCartItem } from "./cart.utilities";
import { CartStateType } from "./cart.interface";

@State({
  name: 'cart',
  defaults: initialCartState(),
})
@Injectable()
export class CartState implements NgxsOnInit {
  private platform = inject(PLATFORM_ID);

  ngxsOnInit(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platform) && localStorage['cart']) {
			ctx.setState(JSON.parse(localStorage['cart']));
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
      const item = createCartItem({ 
        product: action.product,
        price: action.product.price,
        quantity: 1,
      });
      state.items.push(item);
    }
    
    ctx.setState(state);
    ctx.dispatch(new ComputeCart());
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
    ctx.dispatch(new ComputeCart());
  }

  @Action(ComputeCart)
  computeCart(ctx: StateContext<CartStateType>) {
    const state = ctx.getState();
    // compute cart.quantity
    state.quantity = state.items.map(i => i.quantity).reduce((p, c) => p + c);
    
    // compute cart.subtotal
    state.subtotal = state.items.map(i => i.price).reduce((p, c) => p + c);
    
    // compute cart.price
    state.total = state.subtotal + (state.subtotal * TAX);

    ctx.setState(state);
    ctx.dispatch(new SaveCart());
  }

  @Action(SaveCart)
  saveCart(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platform)) {
			localStorage['cart'] = JSON.stringify(ctx.getState());
		}
  }

  @Action(ResetCart)
  resetCart(ctx: StateContext<CartStateType>) {
		if (isPlatformBrowser(this.platform)) {
      const resetState = initialCartState();
      
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