import { PaginatedQuery } from './PaginatedQuery';

export interface ProductSelectionQuery extends PaginatedQuery {
  name?: string;
  expand?: string[];
}
