import {
  CategoryDraft,
  CategoryUpdateAction,
} from '@commercetools/platform-sdk';
import {
  CategoryQuery,
  Category,
  PaginatedResult,
  ClientType,
} from '@royalcyber/global-types';
import { ProductMapper } from '../mappers/ProductMapper';
import { CategoryMapper } from '../mappers/CategoryMapper';
import { BaseService } from './BaseService';
import { ExternalError } from '../errors/ExternalError';
import {
  getCategoriesGraphQlQuery,
  getCategoryById,
} from '../graphqlQueries/categoryQuery';

export class CategoryService extends BaseService {
  protected getOffsetFromCursor(cursor: string) {
    if (cursor === undefined) {
      return undefined;
    }

    const offsetMach = cursor.match(/(?<=offset:).+/);
    return offsetMach !== null ? +Object.values(offsetMach)[0] : undefined;
  }

  async queryCategories(
    categoryQuery: CategoryQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Category>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    // TODO: get default from constant
    const limit = +(categoryQuery.limit ?? 24);
    const where: string[] = [];

    if (categoryQuery.slug) {
      where.push(`slug(${locale.language}="${categoryQuery.slug}")`);
    }

    if (categoryQuery.parentId) {
      where.push(`parent(id="${categoryQuery.parentId}")`);
    }
    const methodArgs = {
      queryArgs: {
        limit: limit,
        offset: this.getOffsetFromCursor(categoryQuery.cursor ?? ''),
        where: where.length > 0 ? where : undefined,
        expand: [
          ...(categoryQuery?.expand ? categoryQuery?.expand : []),
          'ancestors[*]',
          'parent',
        ],
      },
    };
    return await this.getCommercetoolCategoryGraphQLResponse(methodArgs)
      .then((response) => {
        const items = response.results.map((category: any) =>
          CategoryMapper.mapCommercetoolsCategory(category),
        );
        const result: PaginatedResult<Category> = {
          total: response.total,
          items: items,
          count: response.count,
          previousCursor: ProductMapper.calculatePreviousCursor(
            methodArgs?.queryArgs?.offset ?? 0,
            response.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.offset ?? 0,
            response.count ?? 0,
            response.total ?? 0,
          ),
          query: categoryQuery,
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

  protected async getCommercetoolCategoryGraphQLResponse(methodArgs: object) {
    try {
      const { queryArgs } = methodArgs as {
        queryArgs: {
          limit: number;
          offset: number;
          where?: string;
          expand?: string[];
        };
      };
      const query = getCategoriesGraphQlQuery();
      const variables = {
        where: queryArgs.where,
        offset: queryArgs.offset ? queryArgs.offset : 0,
        limit: queryArgs.limit,
        expand: queryArgs.expand,
      };
      const response = await this.requestBuilder()
        .graphql()
        .post({
          body: {
            query,
            variables,
          },
        })
        .execute();
      if (response.body.errors && response.body.errors.length > 0) {
        const error = response.body.errors[0];
        throw new ExternalError({
          statusCode: error.extensions?.extensionStatusCode || 500,
          message: error.message || 'GraphQL response contains an error',
          body: {
            errors: [
              { code: String(error.extensions?.code || 'UNKNOWN_ERROR') },
            ],
          },
        });
      }
      return response.body.data.categories;
    } catch (error) {
      const typedError =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');

      throw new ExternalError({
        statusCode: (typedError as any).code || 500,
        message: typedError.message || 'An unexpected error occurred',
        body: (typedError as any).body || {},
      });
    }
  }

  protected async getCommercetoolsCategoryPagedQueryResponse(
    methodArgs: object,
  ) {
    return await this.requestBuilder()
      .categories()
      .get(methodArgs)
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const query = getCategoryById();
    try {
      const response = await this.requestBuilder()
        .graphql()
        .post({
          body: {
            query,
            variables: {
              id: categoryId,
            },
          },
        })
        .execute();

      if (response.body.errors && response.body.errors.length > 0) {
        const error = response.body.errors[0];
        throw new ExternalError({
          statusCode: error.extensions?.extensionStatusCode || 500,
          message: error.message || 'GraphQL response contains an error',
          body: {
            errors: [
              { code: String(error.extensions?.code || 'UNKNOWN_ERROR') },
            ],
          },
        });
      }

      const categoryData = response.body.data.category;

      if (!categoryData) {
        throw new ExternalError({
          statusCode: 404,
          message: `Category with ID ${categoryId} not found.`,
        });
      }

      // Map the response to the Category type
      return CategoryMapper.mapCommercetoolsCategory(categoryData);
    } catch (error) {
      const typedError =
        error instanceof Error
          ? error
          : new Error('An unexpected error occurred');

      throw new ExternalError({
        statusCode: (typedError as any).code || 500,
        message: typedError.message || 'An unexpected error occurred',
        body: (typedError as any).body || {},
      });
    }
  }

  async create(categoryDraft: CategoryDraft): Promise<Category> {
    const category = await this.requestBuilder()
      .categories()
      .post({
        body: categoryDraft,
      })
      .execute()
      .then((response) => {
        return CategoryMapper.mapCommercetoolsCategory(response?.body);
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
    return category;
  }

  async updateCategory(
    categoryId: string,
    categoryDraft: Partial<Category>,
  ): Promise<Category> {
    const locale = await this.getCommercetoolsLocal(ClientType.BO);
    const categoryUpdateActions: CategoryUpdateAction[] = [];
    // Map fields to update actions
    if (categoryDraft.name && typeof categoryDraft.name === 'object') {
      categoryUpdateActions.push({
        action: 'changeName',
        name: categoryDraft.name,
      });
    }

    if (categoryDraft.slug && typeof categoryDraft.slug === 'object') {
      categoryUpdateActions.push({
        action: 'changeSlug',
        slug: categoryDraft.slug,
      });
    }

    if (categoryDraft.externalId) {
      categoryUpdateActions.push({
        action: 'setExternalId',
        externalId: categoryDraft.externalId,
      });
    }

    if (
      categoryDraft.description &&
      typeof categoryDraft.description === 'object'
    ) {
      categoryUpdateActions.push({
        action: 'setDescription',
        description: categoryDraft.description,
      });
    }
    if (categoryDraft.key) {
      categoryUpdateActions.push({
        action: 'setKey',
        key: categoryDraft.key,
      });
    }
    if (categoryDraft.orderHint) {
      categoryUpdateActions.push({
        action: 'changeOrderHint',
        orderHint: categoryDraft.orderHint,
      });
    }
    return await this.updateCategoryInCommerceTools(
      categoryId,
      categoryUpdateActions,
    );
  }

  protected async updateCategoryInCommerceTools(
    categoryId: string,
    categoryUpdateActions: CategoryUpdateAction[],
  ): Promise<Category> {
    const currentCategoryVersion = await this.fetchCategoryVersion(categoryId);

    const categoryUpdate = {
      version:
        currentCategoryVersion ??
        (() => {
          throw new Error('Category version is undefined');
        })(),
      actions: categoryUpdateActions,
    };
    return await this.requestBuilder()
      .categories()
      .withId({ ID: categoryId })
      .post({
        body: categoryUpdate,
      })
      .execute()
      .then((response) => {
        const category: Category = {
          ...response.body,
          version: response.body.version, // Cast to string
        };
        return category;
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  protected async fetchCategoryVersion(categoryId: string): Promise<number> {
    const category = await this.requestBuilder()
      .categories()
      .withId({ ID: categoryId })
      .get()
      .execute();
    return category.body.version;
  }

  async deleteCategory(
    categoryId: string,
    categoryVersion: number,
    clientType: ClientType,
  ): Promise<Category> {
    const locale = await this.getCommercetoolsLocal(clientType);

    return await this.requestBuilder()
      .categories()
      .withId({
        ID: categoryId,
      })
      .delete({
        queryArgs: {
          version: categoryVersion ? +categoryVersion : 0,
        },
      })
      .execute()
      .then(() => {
        return {
          categoryId: categoryId,
          locale,
          clientType,
        };
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
