import type { User } from 'firebase/auth';
import { Product } from '../domains/products/products.interface';

export interface AuthUser extends User, AdditionalUserData {}

export interface AdditionalUserData {
  created: string;
  products: Product[];
}

export type OAuthProviderName = 'google' | 'github';
