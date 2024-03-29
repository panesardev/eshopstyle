import { Injectable, inject } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ProductsService } from "../../services/products.service";
import { CategoryFilter, PriceFilter, Product, filterByCategory, filterByPrice } from "../../types/product.interface";
import { ClearFilters, GetProducts, SetCategoryFilter, SetPriceFilter } from "./products.actions";

export interface ProductsStateType {
  products: Product[];
  categoryFilter: CategoryFilter;
  priceFilter: PriceFilter;
}

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