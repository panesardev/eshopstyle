import { inject, Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { take, tap } from "rxjs";
import { GetUserProducts, RemoveSavedProduct, SaveProduct, SetUserProducts } from "./user.actions";
import { initialUserState } from "./user.utilities";
import { UserService } from "./user.service";
import { UserStateType } from "./user.interface";

@State({
  name: 'user',
  defaults: initialUserState(),
})
@Injectable()
export class UserState {
  private userService = inject(UserService);

  ngxsOnInit(ctx: StateContext<UserStateType>): void {
    ctx.dispatch(new GetUserProducts());
  }
  
  @Action(GetUserProducts)
  getUserProducts(ctx: StateContext<UserStateType>) {
    return this.userService.products$.pipe(
      take(1),
      tap(products => ctx.setState({ products })),
    );
  }

  @Action(SetUserProducts)
  async setUserProducts(ctx: StateContext<UserStateType>, action: SetUserProducts) {
    this.userService.setProducts(action.products)
      .then(() => ctx.setState({ products: action.products }));
  }

  @Action(SaveProduct)
  saveProduct(ctx: StateContext<UserStateType>, action: SaveProduct) {
    const state = ctx.getState();
    const products = [...state.products, action.product];

    ctx.dispatch(new SetUserProducts(products));
  }
  
  @Action(RemoveSavedProduct)
  removeSavedProduct(ctx: StateContext<UserStateType>, action: RemoveSavedProduct) {
    const state = ctx.getState();
    const products = state.products.filter(p => p.id !== action.product.id);

    ctx.dispatch(new SetUserProducts(products));
  }

}