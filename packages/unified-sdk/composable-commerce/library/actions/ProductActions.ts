import { Event, SDK, ServerOptions } from '@royalcyber/unified-commerce';
import {
  GetInventryQuery,
  GetProductQuery,
  ProductQueryQuery,
  QueryProductCategoriesQuery,
} from '../../types/queries/ProductQueries';
import {
  GetProductAction,
  GetSearchableProductAttributesAction,
  ProductQueryAction,
  QueryProductCategoriesAction,
  GetCategoryProductAction,
  GetInvetoriesAction,
  GetProjectAction,
  GetProductTypeIdAction,
  GetProductTypesAction,
  DeleteInventryAction,
  UpdateInventryAction,
} from '../../types/actions/ProductActions';
import { Product, FilterField, Category } from '@royalcyber/global-types';
import { ComposableCommerceEvents } from '../../types/events/ComposableCommerceEvents';
import { PaginatedResult, ProductPaginatedResult } from '@royalcyber/global-types';
import { Inventory } from '@royalcyber/global-types';

export type ProductActions = {
  getProduct: GetProductAction;
  query: ProductQueryAction;
  queryCategories: QueryProductCategoriesAction;
  getSearchableAttributes: GetSearchableProductAttributesAction;
  getCategoryProducts: GetCategoryProductAction;
  getInventories: GetInvetoriesAction;
  getProject: GetProjectAction;
  getProductType: GetProductTypeIdAction;
  getProductTypes: GetProductTypesAction;
  deleteInventry: DeleteInventryAction;
  updateInventry: UpdateInventryAction;
};

export const getProductActions = (
  sdk: SDK<ComposableCommerceEvents>,
): ProductActions => {
  return {
    updateInventry: async (
      query: GetInventryQuery,
      payload,
      options: { serverOptions?: ServerOptions } = {},
    ) => {
      const response = await sdk.callAction<Inventory>({
        actionName: 'product/updateInventory',
        query,
        payload,
        parallel: false,
        serverOptions: options.serverOptions,
      });
      return response;
    },
    getProduct: async (
      query: GetProductQuery,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<Product>({
        actionName: 'product/getProduct',
        query,
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      if (!response.isError && response.data) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productFetched',
        //     data: {
        //       product: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    query: async (
      query: ProductQueryQuery,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<ProductPaginatedResult>({
        actionName: 'product/query',
        query,
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productsQueried',
        //     data: {
        //       query: query,
        //       result: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    queryCategories: async (
      query: QueryProductCategoriesQuery,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<PaginatedResult<Category>>({
        actionName: 'product/queryCategories',
        query,
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productCategoriesQueried',
        //     data: {
        //       query: query,
        //       result: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    getCategoryProducts: async (
      id: string,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<{
        categoryId: string;
        products: Product[];
      }>({
        actionName: 'product/getCategoryProducts',
        query: {
          id,
        },
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },
    getSearchableAttributes: async (
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<FilterField[]>({
        actionName: 'product/searchableAttributes',
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'searchableProductAttributesFetched',
        //     data: {
        //       filterFields: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    getInventories: async (
      query: QueryProductCategoriesQuery,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<PaginatedResult<Product>>({
        actionName: 'product/getInventories',
        query,
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productCategoriesQueried',
        //     data: {
        //       query: query,
        //       result: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    getProject: async (
      // query,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<Product>({
        actionName: 'product/getProject',
        // query,
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError && response.data) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productFetched',
        //     data: {
        //       product: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    getProductType: async (
      id,
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<Product>({
        actionName: 'product/getProductType',
        query: {
          id,
        },
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },
    getProductTypes: async (
      options: {
        skipQueue?: boolean;
        customHeaderValue?: string;
        serverOptions?: ServerOptions;
      } = {},
    ) => {
      const response = await sdk.callAction<PaginatedResult<Product>>({
        actionName: 'product/getProductTypes',
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });

      if (!response.isError) {
        // sdk.trigger(
        //   new Event({
        //     eventName: 'productCategoriesQueried',
        //     data: {
        //       query: query,
        //       result: response.data,
        //     },
        //   }),
        // );
      }
      return response;
    },
    deleteInventry: async (
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
        actionName: 'product/deleteInvetry',
        query: { id },
        parallel: options.skipQueue,
        customHeaderValue: options.customHeaderValue,
        serverOptions: options.serverOptions,
      });
      return response;
    },
  };
};
