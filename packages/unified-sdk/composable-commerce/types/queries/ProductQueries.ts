import { ProductQuery } from '@royalcyber/global-types';

type GetProductQuery = {
  id?: string;
  sku?: string;
  key?: string;
};
type GetCategoryQuery = {
  id?: string;
};
type GetInventryQuery = {
  id?: string;
};

type ProductQueryQuery = Omit<
  ProductQuery,
  'filters' | 'facets' | 'sortAttributes'
>;

type QueryProductCategoriesQuery = {
  sku?: string;
  limit?: number;
  cursor?: string;
  slug?: string;
};

export {
  type GetProductQuery,
  type ProductQueryQuery,
  type QueryProductCategoriesQuery,
  type GetCategoryQuery,
  type GetInventryQuery,
};
