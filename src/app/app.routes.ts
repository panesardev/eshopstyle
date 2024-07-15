import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { TitleResolver } from './shared/resolvers/title.resolver';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: TitleResolver,
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    title: TitleResolver,
  }
];
