import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { ProductsStateType, filterByCategory, filterByPrice } from "../../types/product.interface";
import { ClearFilters, GetProducts, SetCategoryFilter, SetPriceFilter } from "./products.actions";

const initialState: ProductsStateType = {
  products: [],
  categoryFilter: 'NONE',
  priceFilter: 'NONE',
};

@State({
  name: 'products',
  defaults: initialState,
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
    return this.productsService.products$.pipe(
      tap(products => ctx.patchState({ 
        products: filterByPrice(products, action.filter),
        priceFilter: action.filter,
      })),
    );
  }
  
  @Action(SetCategoryFilter)
  setCategoryFilter(ctx: StateContext<ProductsStateType>, action: SetCategoryFilter) {
    return this.productsService.products$.pipe(
      tap(products => ctx.patchState({ 
        products: filterByCategory(products, action.filter),
        categoryFilter: action.filter,
      })),
    );
  }

  @Action(ClearFilters)
  clearFilter(ctx: StateContext<ProductsStateType>) {
    ctx.patchState({ categoryFilter: 'NONE', priceFilter: 'NONE' });
    ctx.dispatch(new GetProducts());
  }

}