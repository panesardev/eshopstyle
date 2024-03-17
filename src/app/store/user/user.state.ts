import { inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { UserService } from '../../services/user.service';
import { Product } from "../../types/product.interface";
import { UserData } from "../../types/user.interface";
import { GetUserProducts, RemoveSavedProduct, SaveProduct, SetUserProducts } from "./user.actions";

export type UserStateType = UserData;

const initial: UserStateType = {
  products: [] as Product[],
}

@State({
  name: 'user',
  defaults: initial,
})
export class UserState {
  private userService = inject(UserService);

  ngxsOnInit(ctx: StateContext<UserStateType>): void {
    ctx.dispatch(new GetUserProducts());
  }
  
  @Action(GetUserProducts)
  getUserProducts(ctx: StateContext<UserStateType>) {
    return this.userService.getUserProducts().pipe(
      tap(products => ctx.setState({ products })),
    );
  }

  @Action(SetUserProducts)
  async setUserProducts(ctx: StateContext<UserStateType>, action: SetUserProducts) {
    await this.userService.setUserProducts(action.products);
  }

  @Action(SaveProduct)
  saveProduct(ctx: StateContext<UserStateType>, action: SaveProduct) {
    const state = ctx.getState();
    state.products = [...state.products, action.product];

    ctx.setState(state);
    ctx.dispatch(new SetUserProducts(state.products));
  }
  
  @Action(RemoveSavedProduct)
  removeSavedProduct(ctx: StateContext<UserStateType>, action: RemoveSavedProduct) {
    const state = ctx.getState();
    state.products = state.products.filter(p => p.id !== action.product.id);

    ctx.setState(state);
    ctx.dispatch(new SetUserProducts(state.products));
  }

}