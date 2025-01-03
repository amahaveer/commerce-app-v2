import {
  Context,
  Request,
  CategoryQuery,
  Category,
  ProductPaginatedResult,
} from '@royalcyber/global-types';
import { ProductService } from '../../services/ProductService';
import { getClientType, getCurrency, getLocale, getPath } from '../Request';
import { ProductQueryFactory } from '../ProductQueryFactory';

export class CategoryRouter {
  static identifyFrom(request: Request) {
    if (getPath(request)?.match(/[^/]+(?=\/$|$)/)) {
      return true;
    }

    return false;
  }

  static loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<ProductPaginatedResult> => {
    const clientType = getClientType(request);
    const productService = new ProductService(
      commercetoolsFrontendContext,
      getLocale(request),
      getCurrency(request),
      request,
    );

    // We are using the last subdirectory of the path to identify the category slug
    const urlMatches = getPath(request)?.match(/[^/]+(?=\/$|$)/);

    if (urlMatches) {
      const categoryQuery: CategoryQuery = {
        slug: urlMatches[0],
      };

      const categoryQueryResult = await productService.queryCategories(
        categoryQuery,
        clientType,
      );

      if (categoryQueryResult.items.length == 0) {
        return { items: [], total: 0, count: 0 };
      }

      request.query.categories = [
        (categoryQueryResult.items[0] as Category).categoryId,
      ];

      const productQuery = ProductQueryFactory.queryFromParams({
        ...request,
      });

      return await productService.query(productQuery, clientType);
    }

    return { items: [], total: 0, count: 0 };
  };
}
