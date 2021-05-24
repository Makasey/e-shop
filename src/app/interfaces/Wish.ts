import { Car } from './Car';

export interface Wish {
  id?: string;
  status?: string;
  wishlist?: Car[];
  userId?: string;
}
