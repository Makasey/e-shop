import { Car } from './Car';

export interface Cart {
  id: string;
  status: string;
  cart: Car[];
  userId: string;
}
