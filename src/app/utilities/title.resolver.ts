import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { BRAND } from "../app.constants";

export const titleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  const path = route.routeConfig?.path;

  let title: string = `Shop with Style`;

  if (path) {
    title = path[0].toUpperCase() + path.slice(1, path.length);
  }

  if (path === '**') {
    title = `404 Not Found`;
  }

  if (path === 'products/:id') {
    title = 'Products';
  }

  return `${title} - ${BRAND}`;
}