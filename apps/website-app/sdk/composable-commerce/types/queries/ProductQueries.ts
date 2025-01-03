import { ProductQuery } from '@royalcyber/global-types';

type GetProductQuery = {
  id?: string;
  sku?: string;
  key?: string;
};

type ProductQueryQuery = Omit<
  ProductQuery,
  'filters' | 'facets' | 'sortAttributes'
>;

type QueryProductCategoriesQuery = {
  limit?: number;
  cursor?: string;
  slug?: string;
};

export {
  type GetProductQuery,
  type ProductQueryQuery,
  type QueryProductCategoriesQuery,
};
