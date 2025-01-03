import {
  Context,
  Request,
  Product,
  ProductQuery,
  LineItem,
  WishlistLineItem,
} from '@royalcyber/global-types';
import { ProductService } from '../../services/ProductService';
import { getPath, getLocale, getCurrency, getClientType } from '../Request';

export class ProductRouter {
  private static isProduct(
    product: Product | LineItem | WishlistLineItem,
  ): product is Product {
    // Only Product has the property "slug"
    return product.hasOwnProperty('slug');
  }

  static generateUrlFor(item: Product | LineItem | WishlistLineItem) {
    if (ProductRouter.isProduct(item)) {
      return `/${item.slug}/p/${item.variants[0].sku}`;
    }
    return `/slug/p/${item.variant?.sku ?? 'default-sku'}`;
  }

  static identifyFrom(request: Request) {
    if (getPath(request)?.match(/\/p\/([^\/]+)/)) {
      return true;
    }

    return false;
  }

  static loadFor = async (
    request: Request,
    commercetoolsFrontendContext: Context,
  ): Promise<Product | null> => {
    const clientType = getClientType(request);
    const productService = new ProductService(
      commercetoolsFrontendContext,
      getLocale(request),
      getCurrency(request),
      request,
    );

    const urlMatches = getPath(request)?.match(/\/p\/([^\/]+)/);

    if (urlMatches) {
      const productQuery: ProductQuery = {
        skus: [urlMatches[1]],
      };
      return productService.getProduct(productQuery, clientType);
    }

    return null;
  };
}
