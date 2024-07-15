import { Product } from "../products/products.interface";

export class GetUserProducts {
  static readonly type = '[USER] get user products';
}

export class SetUserProducts {
  static readonly type = '[USER] set user products';
  constructor(public products: Product[]) {}
}

export class SaveProduct {
  static readonly type = '[USER] save product';
  constructor(public product: Product) {}
}

export class RemoveSavedProduct {
  static readonly type = '[USER] remove saved product';
  constructor(public product: Product) {}
}

