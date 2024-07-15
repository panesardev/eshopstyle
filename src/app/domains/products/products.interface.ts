export interface Product {
	id: string;
  name: string;
	category: Category;
	price: number;
	photoURL: string;
	description: string;
}

export interface ProductsStateType {
  products: Product[];
  categoryFilter: CategoryFilter;
  priceFilter: PriceFilter;
}

export type Category = 'MEN' | 'WOMEN' | 'ELECTRONICS' | 'JEWELRY';

export type PriceFilter = 'LOW_TO_HIGH' | 'HIGH_TO_LOW' | 'NONE';

export type CategoryFilter = 'MEN' | 'WOMEN' | 'ELECTRONICS' | 'JEWELRY' | 'NONE';
