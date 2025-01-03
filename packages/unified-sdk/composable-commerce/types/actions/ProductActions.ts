import {
  Category,
  FilterField,
  Inventory,
  PaginatedResult,
  Product,
  ProductPaginatedResult
} from '@royalcyber/global-types';
import {
  GetInventryQuery,
  GetProductQuery,
  ProductQueryQuery,
  QueryProductCategoriesQuery,
} from '../queries/ProductQueries';
import { SDKResponse, ServerOptions } from '@royalcyber/unified-commerce';

type GetProductTypeIdResult = Product;
type DeleteInventryResult = { success: boolean; message: string };
type CreateUpdateInventryPayload = Partial<Inventory>;

type GetProductAction = (
  query: GetProductQuery,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Product>>;

type GetProjectAction = (options?: {
  serverOptions?: ServerOptions;
}) => Promise<SDKResponse<Product>>;

type GetProductTypeIdAction = (
  id: string,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<GetProductTypeIdResult>>;

type ProductQueryAction = (
  query: ProductQueryQuery,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<ProductPaginatedResult>>;

type GetProductTypesAction = (options?: {
  serverOptions?: ServerOptions;
}) => Promise<SDKResponse<PaginatedResult<GetProductTypeIdResult>>>;

type GetInvetoriesAction = (
  query: QueryProductCategoriesQuery,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<ProductPaginatedResult>>;

type QueryProductCategoriesAction = (
  query: QueryProductCategoriesQuery,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<PaginatedResult<Category>>>;

type GetSearchableProductAttributesAction = (options?: {
  serverOptions?: ServerOptions;
}) => Promise<SDKResponse<FilterField[]>>;

type GetCategoryProductAction = (
  id: string,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<{ categoryId: string; products: Product[] }>>;

type DeleteInventryAction = (
  id: string,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<DeleteInventryResult>>;

type UpdateInventryAction = (
  query: GetInventryQuery,
  payload: CreateUpdateInventryPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Inventory>>;

export {
  type GetProductAction,
  type ProductQueryAction,
  type QueryProductCategoriesAction,
  type GetSearchableProductAttributesAction,
  type GetCategoryProductAction,
  type GetInvetoriesAction,
  type GetProjectAction,
  type GetProductTypeIdAction,
  type GetProductTypesAction,
  type DeleteInventryAction,
  type UpdateInventryAction,
};
