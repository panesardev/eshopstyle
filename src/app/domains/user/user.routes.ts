import { Route } from "@angular/router";

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/profile/profile.component'),
  },
];

export default routes;