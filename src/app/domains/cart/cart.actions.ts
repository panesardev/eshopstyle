import { Product } from "../products/products.interface";

export class AddProduct {
  static readonly type = '[CART] add product';
  constructor(public product: Product) {}
}

export class RemoveProduct {
  static readonly type = '[CART] remove product';
  constructor(public product: Product) {}
}

export class SaveCart {
  static readonly type = '[CART] save cart';
}

export class ResetCart {
  static readonly type = '[CART] reset cart';
}

export class ComputeQuantity {
  static readonly type = '[CART] compute quantity';
}

export class ComputePrice {
  static readonly type = '[CART] compute price';
}

export class ComputeCart {
  static readonly type = '[CART] compute cart';
}

