import { PaginatedQuery } from './PaginatedQuery';

export interface StoreQuery extends PaginatedQuery {
  name?: string;
  expand?: string[];
}
