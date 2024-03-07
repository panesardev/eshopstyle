export interface Product {
	id: string;
  name: string;
	category: Category;
	price: number;
	photoURL: string;
	description: string;
}

export type Category = 'MEN' | 'WOMEN' | 'ELECTRONICS' | 'JEWELRY';

export interface ProductsStateType {
  products: Product[];
  categoryFilter: CategoryFilter;
  priceFilter: PriceFilter;
}

export type PriceFilter = 'LOW_TO_HIGH' | 'HIGH_TO_LOW' | 'NONE';
export type CategoryFilter = 'MEN' | 'WOMEN' | 'ELECTRONICS' | 'JEWELRY' | 'NONE';

export function filterByPrice(products: Product[], filter: PriceFilter) {
	switch(filter) {
		case 'HIGH_TO_LOW': return products.sort((a, b) => b.price - a.price);
		case 'LOW_TO_HIGH': return products.sort((a, b) => a.price - b.price);;
		case 'NONE': return products.sort();
	}
}

export function filterByCategory(products: Product[], filter: CategoryFilter) {
	return filter === 'NONE' ? products : products.filter(p => p.category === filter); 
}