import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withInMemoryScrolling, withPreloading } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { CartState } from './domains/cart/cart.state';
import { ProductsState } from './domains/products/products.state';
import { UserState } from './domains/user/user.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      NgxsModule.forRoot([
        CartState, 
        ProductsState, 
        UserState,
      ]),
    ),
  ],
};
