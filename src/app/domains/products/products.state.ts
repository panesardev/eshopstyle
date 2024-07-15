import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ClearFilters, GetProducts, SetCategoryFilter, SetPriceFilter } from "./products.actions";
import { initialProductsState, filterByCategory, filterByPrice } from "./products.utilities";
import { ProductsService } from "./products.service";
import { ProductsStateType } from "./products.interface";

@State({
  name: 'products',
  defaults: initialProductsState(),
})
@Injectable()
export class ProductsState {
  private productsService = inject(ProductsService);

  ngxsOnInit(ctx: StateContext<ProductsStateType>) {
    ctx.dispatch(new GetProducts());
  }
  
  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductsStateType>) {
    return this.productsService.products$.pipe(
      tap(products => ctx.patchState({ products })),
    );
  }

  @Action(SetPriceFilter)
  setPriceFilter(ctx: StateContext<ProductsStateType>, action: SetPriceFilter) {
    if (action.filter === 'NONE') {
      ctx.patchState({ 
        products: ctx.getState().products,
        priceFilter: action.filter,
      });
    }
    else {
      ctx.patchState({ 
        products: filterByPrice(ctx.getState().products, action.filter),
        priceFilter: action.filter,
      });
    }
  }
  
  @Action(SetCategoryFilter)
  setCategoryFilter(ctx: StateContext<ProductsStateType>, action: SetCategoryFilter) {
    return this.productsService.products$.pipe(
      tap(products => ctx.patchState({ 
        products: filterByCategory(products, action.filter),
        categoryFilter: action.filter,
      })),
      tap(() => ctx.dispatch(new SetPriceFilter('NONE'))),
    );
  }

  @Action(ClearFilters)
  clearFilter(ctx: StateContext<ProductsStateType>) {
    ctx.patchState({ categoryFilter: 'NONE', priceFilter: 'NONE' });
    ctx.dispatch(new GetProducts());
  }

}