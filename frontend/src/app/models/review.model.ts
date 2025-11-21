import { User } from './user.model';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: User;
}
