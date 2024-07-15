import { Route } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/title.resolver';

export const routes: Route[] = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
    title: TitleResolver,
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component'),
    title: TitleResolver,
  },
  {
    path: 'profile',
    loadChildren: () => import('./domains/user/user.routes'),
    title: TitleResolver,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    title: TitleResolver,
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.component'),
    title: TitleResolver,
  },
  {
    path: 'products',
    loadChildren: () => import('./domains/products/products.routes'),
    title: TitleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: TitleResolver,
  }
];
