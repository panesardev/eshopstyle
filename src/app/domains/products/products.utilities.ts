import { CategoryFilter, PriceFilter, Product, ProductsStateType } from "./products.interface";

export function initialProductsState(): ProductsStateType {
	return {
		products: [],
		categoryFilter: 'NONE',
		priceFilter: 'NONE',
	};
}

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
