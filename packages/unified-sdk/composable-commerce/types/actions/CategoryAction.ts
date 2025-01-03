import { SDKResponse, ServerOptions } from '@royalcyber/unified-commerce';
// import { Category, PaginatedResult } from 'shared/types/category';
import {
  Category,
  CategoryQuery,
  PaginatedResult,
} from '@royalcyber/global-types';
import { GetCategoryQuery } from '../queries/ProductQueries';

// Query for fetching categories
type GetCategoriesQuery = CategoryQuery;

// Query for creating/updating a category
type CreateUpdateCategoryPayload = Partial<Category>;

// Action result types
type GetCategoriesResult = PaginatedResult<Category>;
type GetCategoryByIdResult = Category;
type CreateCategoryResult = Category;
type UpdateCategoryResult = Category;
type DeleteCategoryResult = { success: boolean; message: string };

// Define the actions
type GetCategoriesAction = (options?: {
  serverOptions?: ServerOptions;
}) => Promise<SDKResponse<GetCategoriesResult>>;

type GetCategoryByIdAction = (
  id: string,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<GetCategoryByIdResult>>;

type CreateCategoryAction = (
  payload: CreateUpdateCategoryPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<CreateCategoryResult>>;

type UpdateCategoryAction = (
  query: GetCategoryQuery,
  payload: CreateUpdateCategoryPayload,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<Category>>;

type DeleteCategoryAction = (
  id: string,
  options?: { serverOptions?: ServerOptions },
) => Promise<SDKResponse<DeleteCategoryResult>>;

export {
  type GetCategoriesAction,
  type GetCategoryByIdAction,
  type CreateCategoryAction,
  type UpdateCategoryAction,
  type DeleteCategoryAction,
};
