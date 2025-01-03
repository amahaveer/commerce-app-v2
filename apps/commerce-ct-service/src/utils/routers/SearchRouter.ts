import {
  Context,
  Request,
  ProductPaginatedResult,
} from '@royalcyber/global-types';
import { ProductService } from '../../services/ProductService';
import { ProductQueryFactory } from '../ProductQueryFactory';
import {
  getClientType,
  getCurrency,
  getHeader,
  getLocale,
  getPath,
} from '../Request';

export class SearchRouter {
  static identifyFrom(request: Request) {
    const urlMatches = getPath(request)?.match(/^\/search/);

    if (urlMatches) {
      return true;
    }

    return false;
  }

  static loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<ProductPaginatedResult | null> => {
    const clientType = getClientType(request);
    const productService = new ProductService(
      commercetoolsFrontendContext,
      getLocale(request),
      getCurrency(request),
      request,
    );

    const urlMatches = getPath(request)?.match(/\/search/);

    if (urlMatches) {
      const productQuery = ProductQueryFactory.queryFromParams({
        ...request,
        query: {
          ...request.query,
          query: request.query.query || request.query.q,
        },
      });
      return productService.query(productQuery, clientType);
    }

    return null;
  };
}
