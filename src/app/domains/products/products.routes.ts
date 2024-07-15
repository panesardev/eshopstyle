import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/product/product.component'),
  },
];

export default routes;