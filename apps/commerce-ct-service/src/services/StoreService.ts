import {
  ClientType,
  PaginatedResult,
  StoreQuery,
  ProductSelectionQuery,
  Store,
  ProductSelection,
} from '@royalcyber/global-types';
import { ProductService } from './ProductService';
import { StoreMapper } from '../mappers/StoreMapper';
import { ProductMapper } from '../mappers/ProductMapper';
import { ExternalError } from '../errors/ExternalError';

export class StoreService extends ProductService {
  async queryStores(
    storeQuery: StoreQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Store>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = +(storeQuery.limit ?? 24);
    const where: string[] = [];

    if (storeQuery.name) {
      where.push(`name(${locale.language}="${storeQuery.name}")`);
    }

    const methodArgs = {
      queryArgs: {
        limit: limit,
        offset: this.getOffsetFromCursor(storeQuery.cursor ?? ''),
        where: where.length > 0 ? where : undefined,
        expand:
          clientType === ClientType.BO
            ? [
                'supplyChannel[*]',
                'distributionChannels[*]',
                'productSelections[*].productSelection',
              ]
            : [],
      },
    };

    return await this.requestBuilder()
      .stores()
      .get(methodArgs)
      .execute()
      .then((response) => {
        const items = response.body.results.map((store) =>
          StoreMapper.commercetoolsStoreToStore(store, clientType, locale),
        );

        const result: PaginatedResult<Store> = {
          total: response.body.total,
          items: items,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
          query: storeQuery,
        };

        return result;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getStore(storeId: string, clientType: ClientType): Promise<Store> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const methodArgs = {
      queryArgs: {
        expand:
          clientType === ClientType.BO
            ? [
                'supplyChannel[*]',
                'distributionChannels[*]',
                'productSelections[*].productSelection',
              ]
            : [],
      },
    };

    return await this.requestBuilder()
      .stores()
      .withId({ ID: storeId })
      .get(methodArgs)
      .execute()
      .then((response) =>
        StoreMapper.commercetoolsStoreToStore(
          response.body,
          clientType,
          locale,
        ),
      )
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async queryProductSelections(
    productSelectionQuery: ProductSelectionQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Store>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = +(productSelectionQuery.limit ?? 24);
    const where: string[] = [];

    if (productSelectionQuery.name) {
      where.push(`name(${locale.language}="${productSelectionQuery.name}")`);
    }

    const methodArgs = {
      queryArgs: {
        limit: limit,
        offset: this.getOffsetFromCursor(productSelectionQuery.cursor ?? ''),
        where: where.length > 0 ? where : undefined,
        expand: productSelectionQuery?.expand ?? [],
      },
    };

    return await this.requestBuilder()
      .productSelections()
      .get(methodArgs)
      .execute()
      .then((response) => {
        const items = response.body.results.map((productSelection) =>
          StoreMapper.commercetoolsProductSelectionToProductSelection(
            productSelection,
            clientType,
            locale,
          ),
        );

        const result: PaginatedResult<ProductSelection> = {
          total: response.body.total,
          items: items,
          count: response.body.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
          query: productSelectionQuery,
        };

        return result;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }
}
