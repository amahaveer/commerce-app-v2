import { Product } from '../product';

export interface PaginatedResult<T> {
  data?: any;
  total?: number;
  previousCursor?: string;
  nextCursor?: string;
  count: number;
  items: T[];
  query?: any;
}

export interface ProductPaginatedResult extends PaginatedResult<Product> {
  facets?: any[];
}
