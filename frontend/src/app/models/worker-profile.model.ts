import { PortfolioItem } from './portfolio-item.model';
import { Review } from './review.model';
import { ServiceCategory } from './service-category.model';
import { User } from './user.model';

export interface WorkerProfile {
  id: string;
  user: User;
  bio: string;
  location: string;
  portfolio: PortfolioItem[];
  reviews: Review[];
  categories: ServiceCategory[];
}
