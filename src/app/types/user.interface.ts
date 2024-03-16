import { Product } from './product.interface';

export interface User extends UserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface UserData {
  products: Product[];
}
export const newUserData: UserData = {
  products: [] as Product[],
}
