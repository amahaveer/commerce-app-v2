import { SDK, Event, ServerOptions } from '@royalcyber/unified-commerce';
import {
  GetCategoriesAction,
  CreateCategoryAction,
  UpdateCategoryAction,
  DeleteCategoryAction,
  GetCategoryByIdAction,
} from '../../types/actions/CategoryAction';
import { PaginatedResult, Category } from '@royalcyber/global-types';
import { ComposableCommerceEvents } from '../../types/events/ComposableCommerceEvents';
import { GetCategoryQuery } from '../../types/queries/ProductQueries';

export type CategoryActions = {
  getCategories: GetCategoriesAction;
  getCategoryById: GetCategoryByIdAction;
  createCategory: CreateCategoryAction;
  updateCategory: UpdateCategoryAction;
  deleteCategory: DeleteCategoryAction;
};

export const getCategoryActions = (
  sdk: SDK<ComposableCommerceEvents>,
): CategoryActions => {
  return {
    getCategories: async (
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<PaginatedResult<Category>>({
        actionName: 'category/getCategories',
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },
    getCategoryById: async (
      id,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<Category>({
        actionName: 'category/getCategoryById',
        query: {
          id,
        },
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },

    createCategory: async (
      payload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Category>({
        actionName: 'category/createCategory',
        payload,
        parallel: false,
        serverOptions: options.serverOptions,
      });
      return response;
    },

    updateCategory: async (
      query: GetCategoryQuery,
      payload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Category>({
        actionName: 'category/updateCategory',
        query,
        payload,
        parallel: false,
        serverOptions: options.serverOptions,
      });
      return response;
    },

    deleteCategory: async (
      id,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<{
        success: boolean;
        message: string;
      }>({
        actionName: 'category/deleteCategory',
        query: { id },
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },
  };
};
