import { Routes } from '@angular/router';
import { titleResolver } from './utilities/title.resolver';
import { authGuard } from './utilities/auth.guard';
import IndexComponent from './routes/index/index.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: titleResolver,
  },
  // {
  //   path: '',
  //   redirectTo: '/checkout',
  //   pathMatch: 'full',
  // },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.component'),
    title: titleResolver,
  },
  {
    path: 'checkout',
    loadComponent: () => import('./routes/checkout/checkout.component'),
    title: titleResolver,
  },
  {
    path: 'profile',
    loadComponent: () => import('./routes/profile/profile.component'),
    title: titleResolver,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login/login.component'),
    title: titleResolver,
  },
  {
    path: 'privacy',
    loadComponent: () => import('./routes/privacy/privacy.component'),
    title: titleResolver,
  },
  {
    path: 'products',
    loadComponent: () => import('./routes/products/products.component'),
    title: titleResolver,
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./routes/products/product/product.component'),
    title: titleResolver,
  },
  {
    path: 'place-order',
    loadComponent: () => import('./routes/place-order/place-order.component'),
    title: titleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found.component'),
    title: titleResolver,
  },
];