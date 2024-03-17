import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { CartState } from "../store/cart/cart.state";
import { ProductsState } from "../store/products/products.state";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { UserState } from "../store/user/user.state";

export function provideNgxs(): EnvironmentProviders {
  return importProvidersFrom(
    NgxsModule.forRoot([
      CartState, 
      ProductsState, 
      UserState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
  );
}
