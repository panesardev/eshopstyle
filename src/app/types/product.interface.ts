export interface Product {
	id: string;
  name: string;
	categoryId: number;
	price: number;
	photoURL: string;
	description: string;
}

export interface Category {
	id: number;
	name: string;
}