import { Car } from './Car';

export interface Order {
  id: string;
  status: string;
  order: Car[];
  userId: string;
}
