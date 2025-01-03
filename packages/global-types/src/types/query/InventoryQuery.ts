import { PaginatedQuery } from './PaginatedQuery';

export interface InventoryQuery extends PaginatedQuery {
  sku?: string;
  expand?: string[];
}
