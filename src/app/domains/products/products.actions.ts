import { CategoryFilter, PriceFilter } from "./products.interface";

export class GetProducts {
  static readonly type = '[PRODUCTS] get products';
}

export class SetPriceFilter {
  static readonly type = '[PRODUCTS] set price filter';
  constructor(public filter: PriceFilter) {}
}

export class SetCategoryFilter {
  static readonly type = '[PRODUCTS] set category filter';
  constructor(public filter: CategoryFilter) {}
}

export class ClearFilters {
  static readonly type = '[PRODUCTS] clear filters';
}