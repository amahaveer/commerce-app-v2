import {
  InventoryEntry,
  InventoryEntryDraft,
  InventoryEntryUpdateAction,
  ProductDraft,
  ProductUpdate,
  Project,
} from '@commercetools/platform-sdk';
import {
  ProductQuery,
  Product,
  FilterField,
  FilterFieldTypes,
  CategoryQuery,
  CategoryQueryFormat,
  Category,
  FacetDefinition,
  PaginatedResult,
  ProductPaginatedResult,
  ProductType,
  Inventory,
  InventoryQuery,
  ClientType,
} from '@royalcyber/global-types';
import { ProductMapper } from '../mappers/ProductMapper';
import { BaseService } from './BaseService';
import { ExternalError } from '../errors/ExternalError';

export class ProductService extends BaseService {
  async query(
    productQuery: ProductQuery,
    clientType: ClientType,
  ): Promise<ProductPaginatedResult> {
    const locale = await this.getCommercetoolsLocal(clientType);

    // TODO: get default from constant
    const limit = +(productQuery.limit ?? 24);

    const filterQuery: string[] = [];
    const filterFacets: string[] = [];
    const sortAttributes: string[] = [];

    const facetDefinitions: FacetDefinition[] = [
      ...ProductMapper.commercetoolsProductTypesToFacetDefinitions(
        await this.getProductTypes(),
        locale,
      ),
      // Include Category facet
      {
        attributeId: 'categories.id',
        attributeType: 'text',
      },
      // Include Scoped Price facet
      {
        attributeId: 'variants.scopedPrice.value',
        attributeType: 'money',
      },
      // Include Price facet
      {
        attributeId: 'variants.price',
        attributeType: 'money',
      },
      // Include Scoped Price discount facet
      {
        attributeId: 'variants.scopedPriceDiscounted',
        attributeType: 'boolean',
      },
    ];

    const queryArgFacets =
      ProductMapper.facetDefinitionsToCommercetoolsQueryArgFacets(
        facetDefinitions,
        locale,
      );

    // Handle productRefs base on value set in productIdField
    if (
      productQuery.productRefs !== undefined &&
      productQuery.productRefs.length !== 0
    ) {
      switch (this.productIdField) {
        case 'id':
          (productQuery.productIds ??= []).push(...productQuery.productRefs);
          break;
        case 'key':
        default:
          (productQuery.productKeys ??= []).push(...productQuery.productRefs);
          break;
      }
    }

    if (
      productQuery.productIds !== undefined &&
      productQuery.productIds.length !== 0
    ) {
      filterQuery.push(`id:"${productQuery.productIds.join('","')}"`);
    }

    if (
      productQuery.productKeys !== undefined &&
      productQuery.productKeys.length !== 0
    ) {
      filterQuery.push(`key:"${productQuery.productKeys.join('","')}"`);
    }

    if (productQuery.skus !== undefined && productQuery.skus.length !== 0) {
      filterQuery.push(`variants.sku:"${productQuery.skus.join('","')}"`);
    }

    if (
      productQuery.categories !== undefined &&
      productQuery.categories.length !== 0
    ) {
      let categoryIds = productQuery.categories.filter(
        function uniqueCategories(value, index, self) {
          return self.indexOf(value) === index;
        },
      );

      // commercetools only allows filter categories by id. If we are using something different as categoryIdField,
      // we need first to fetch the category to get the correspondent category id.
      if (this.categoryIdField !== 'id') {
        const categoriesMethodArgs = {
          queryArgs: {
            where: [`key in ("${categoryIds.join('","')}")`],
          },
        };

        categoryIds = await this.getCommercetoolsCategoryPagedQueryResponse(
          categoriesMethodArgs,
        ).then((response) => {
          return response.body.results.map((category) => {
            return category.id;
          });
        });
      }

      filterQuery.push(
        `categories.id: ${categoryIds.map((category) => {
          return `subtree("${category}")`;
        })}`,
      );
    }

    if (productQuery.filters !== undefined) {
      filterQuery.push(
        ...ProductMapper.facetDefinitionsToFilterQueries(
          productQuery.filters,
          facetDefinitions,
          locale,
        ),
      );
    }

    if (productQuery.facets !== undefined) {
      filterFacets.push(
        ...ProductMapper.facetDefinitionsToFilterFacets(
          productQuery.facets,
          facetDefinitions,
          locale,
        ),
      );
    }

    switch (true) {
      case productQuery.sortAttributes !== undefined:
        Object.keys(productQuery.sortAttributes).map(
          (field, directionIndex) => {
            if (productQuery.sortAttributes) {
              sortAttributes.push(
                `${field} ${Object.values(productQuery.sortAttributes)[directionIndex]}`,
              );
            }
          },
        );
        break;
      default:
        // By default, in CoCo, search results are sorted descending by their relevancy with respect to the provided
        // text (that is their “score”). Sorting by score and then by id will ensure consistent products order
        // across several search requests for products that have the same relevance score.
        sortAttributes.push(`score desc`, `id desc`);
    }

    const methodArgs = {
      queryArgs: {
        sort: sortAttributes,
        limit: limit,
        offset: this.getOffsetFromCursor(productQuery.cursor ?? ''),
        priceCurrency: locale.currency,
        priceCountry: locale.country,
        facet: queryArgFacets.length > 0 ? queryArgFacets : undefined,
        filter: filterFacets.length > 0 ? filterFacets : undefined,
        'filter.facets': filterFacets.length > 0 ? filterFacets : undefined,
        'filter.query': filterQuery.length > 0 ? filterQuery : undefined,
        [`text.${locale.language}`]: productQuery.query,
        expand: [
          ...(productQuery?.expand ? productQuery?.expand : []),
          'categories[*].ancestors[*]',
          'categories[*].parent',
          'productType',
        ],
        markMatchingVariants: true,
        fuzzy: true,
        ...(clientType === ClientType.BO ? { staged: true } : {}),
      },
    };

    return await this.requestBuilder()
      .productProjections()
      .search()
      .get(methodArgs)
      .execute()
      .then((response) => {
        const items = response.body.results.map((product) =>
          ProductMapper.commercetoolsProductProjectionToProduct(
            product,
            this.productIdField,
            this.categoryIdField,
            locale,
            this.defaultLocale,
            clientType,
          ),
        );

        const result: ProductPaginatedResult = {
          total: response.body.total,
          items: items,
          count: response.body.count,
          facets: ProductMapper.commercetoolsFacetResultsToFacets(
            facetDefinitions,
            response.body.facets,
            productQuery,
            locale,
          ),
          previousCursor: ProductMapper.calculatePreviousCursor(
            response.body.offset,
            response.body.count,
          ),
          nextCursor: ProductMapper.calculateNextCursor(
            response.body.offset ?? 0,
            response.body.count ?? 0,
            response.body.total ?? 0,
          ),
          query: productQuery,
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

  async getProduct(
    productQuery: ProductQuery,
    clientType: ClientType,
  ): Promise<Product> {
    const result = await this.query(productQuery, clientType);

    return result.items.shift() as Product;
  }

  async getSearchableAttributes(
    clientType: ClientType,
  ): Promise<FilterField[]> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const response = await this.requestBuilder()
      .productTypes()
      .get()
      .execute()
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    const filterFields = ProductMapper.commercetoolsProductTypesToFilterFields(
      response.body.results,
      locale,
    );

    // Category filter. Not included as commercetools product type.
    filterFields.push({
      field: 'categoryIds',
      type: FilterFieldTypes.ENUM,
      label: 'Category',
      values: await this.queryCategories(
        {
          limit: 250,
          format: CategoryQueryFormat.TREE,
        },
        ClientType.WEB,
      ).then((result) => {
        return (result.items as Category[])
          .map((item) => {
            return {
              value: item.categoryId ?? '',
              name: item.name,
            };
          })
          .filter((item) => item.value !== '');
      }),
    });

    // Variants price filter. Not included as commercetools product type.
    filterFields.push({
      field: 'variants.price',
      type: FilterFieldTypes.MONEY,
      label: 'Variants price', // TODO: localize label
    });

    // Variants scoped price filter. Not included as commercetools product type.
    filterFields.push({
      field: 'variants.scopedPrice.value',
      type: FilterFieldTypes.MONEY,
      label: 'Variants scoped price', // TODO: localize label
    });

    return filterFields;
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

    return await this.getCommercetoolsCategoryPagedQueryResponse(methodArgs)
      .then((response) => {
        const items =
          categoryQuery.format === CategoryQueryFormat.TREE
            ? ProductMapper.commercetoolsCategoriesToTreeCategory(
                response.body.results,
                this.categoryIdField,
                clientType,
                locale,
              )
            : response.body.results.map((category) =>
                ProductMapper.commercetoolsCategoryToCategory(
                  category,
                  this.categoryIdField,
                  clientType,
                  locale,
                ),
              );

        const result: PaginatedResult<Category> = {
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

  protected getOffsetFromCursor(cursor: string) {
    if (cursor === undefined) {
      return undefined;
    }

    const offsetMach = cursor.match(/(?<=offset:).+/);
    return offsetMach !== null ? +Object.values(offsetMach)[0] : undefined;
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

  async queryProductTypes(): Promise<ProductType[]> {
    const response = await this.getProductTypes();

    return response.map((productType) =>
      ProductMapper.commercetoolsProductToProductType(productType),
    );
  }

  async getProductType(productTypeId: string): Promise<ProductType> {
    const response = await this.getProductTypes();

    const productType = response.find(
      (productType) => productType.id === productTypeId,
    );
    return productType
      ? ProductMapper.commercetoolsProductToProductType(productType)
      : ({} as ProductType);
  }

  async create(productDraft: ProductDraft): Promise<Product> {
    const product = await this.requestBuilder()
      .products()
      .post({
        body: productDraft,
      })
      .execute()
      .then((response) => {
        return ProductMapper.commercetoolsProductToProduct(
          response.body,
          this.categoryIdField,
          ClientType.BO,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    return product;
  }

  async update(
    productId: string,
    productUpdate: ProductUpdate,
  ): Promise<Product> {
    const product = await this.requestBuilder()
      .products()
      .withId({ ID: productId })
      .post({
        body: productUpdate,
      })
      .execute()
      .then((response) => {
        return ProductMapper.commercetoolsProductToProduct(
          response.body,
          this.categoryIdField,
          ClientType.BO,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });

    return product;
  }

  async getProjectSeetings(): Promise<Project> {
    return await this.getProject();
  }

  async queryInventories(
    inventoryQuery: InventoryQuery,
    clientType: ClientType,
  ): Promise<PaginatedResult<Inventory>> {
    const locale = await this.getCommercetoolsLocal(clientType);
    const limit = +(inventoryQuery.limit ?? 24);
    const where: string[] = [];

    if (inventoryQuery.sku) {
      where.push(`sku="${inventoryQuery.sku}"`);
    }

    const expand = inventoryQuery?.expand ?? [];

    const methodArgs = {
      queryArgs: {
        limit: limit,
        offset: this.getOffsetFromCursor(inventoryQuery.cursor ?? ''),
        where: where.length > 0 ? where : undefined,
        expand:
          clientType === ClientType.BO ? [...expand, 'supplyChannel'] : expand,
      },
    };

    return await this.requestBuilder()
      .inventory()
      .get(methodArgs)
      .execute()
      .then((response) => {
        const items = response.body.results.map((inventory) =>
          ProductMapper.commercetoolsInventoryToInventory(
            inventory,
            clientType,
            locale,
          ),
        );

        const result: PaginatedResult<Inventory> = {
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
          query: inventoryQuery,
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

  async createInventory(
    inventoryDraft: InventoryEntryDraft,
  ): Promise<Inventory> {
    try {
      const locale = await this.getCommercetoolsLocal(ClientType.BO);
      // Make the API request to create the inventory
      const response = await this.requestBuilder()
        .inventory() // Corrected endpoint to `inventory` instead of `products`
        .post({
          body: inventoryDraft,
        })
        .execute();

      // Map the response to the desired Inventory object
      const inventory = ProductMapper.commercetoolsInventoryToInventory(
        response.body,
        ClientType.BO,
        locale,
      );

      return inventory;
    } catch (error) {
      // Log the error for debugging
      console.error('Error creating inventory:', error);

      // Throw a wrapped error with details
      throw new ExternalError({
        statusCode: (error as any).code ?? 500, // Use `(error as any)` for custom error objects
        message: 'Failed to create inventory.',
        body: (error as any).body ?? null,
      });
    }
  }
  async updateInventory(
    inventoryId: string,
    inventoryDraft: InventoryEntryDraft,
  ): Promise<Inventory> {
    try {
      const inventoryUpdateActions: InventoryEntryUpdateAction[] = [];
      if (inventoryDraft.quantityOnStock) {
        inventoryUpdateActions.push({
          action: 'changeQuantity',
          quantity: inventoryDraft.quantityOnStock,
        });
      }
      if (inventoryDraft.key) {
        inventoryUpdateActions.push({
          action: 'setKey',
          key: inventoryDraft.key,
        });
      }
      if (inventoryDraft.restockableInDays) {
        inventoryUpdateActions.push({
          action: 'setRestockableInDays',
          restockableInDays: inventoryDraft.restockableInDays,
        });
      }
      if (inventoryDraft.expectedDelivery) {
        inventoryUpdateActions.push({
          action: 'setExpectedDelivery',
          expectedDelivery: inventoryDraft.expectedDelivery,
        });
      }
      return await this.updateInventryInCommerceTools(
        inventoryId,
        inventoryUpdateActions,
      );
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error; // Re-throw the error to propagate it
    }
  }

  protected async updateInventryInCommerceTools(
    inventoryId: string,
    inventoryUpdateActions: InventoryEntryUpdateAction[],
  ): Promise<Inventory> {
    const currentInventryVersion = await this.fetchInventryVersion(inventoryId);
    const inventoryUpdate = {
      version:
        currentInventryVersion ??
        (() => {
          throw new Error('Invetry version is undefined');
        })(),
      actions: inventoryUpdateActions,
    };
    const locale = await this.getCommercetoolsLocal(ClientType.BO);
    return await this.requestBuilder()
      .inventory()
      .withId({ ID: inventoryId })
      .post({
        body: inventoryUpdate,
      })
      .execute()
      .then((response) => {
        return ProductMapper.commercetoolsInventoryToInventory(
          response.body,
          ClientType.BO,
          locale,
        );
      })
      .catch((error) => {
        throw new ExternalError({
          statusCode: error.code,
          message: error.message,
          body: error.body,
        });
      });
  }

  async deleteInventry(
    inventoryId: string,
    clientType: ClientType,
  ): Promise<Inventory> {
    const locale = await this.getCommercetoolsLocal(clientType);

    const inventoryVersion = await this.fetchInventryVersion(inventoryId);
    if (!inventoryVersion) {
      throw new Error('Inventry version is undefined');
    }
    return await this.requestBuilder()
      .inventory()
      .withId({
        ID: inventoryId,
      })
      .delete({
        queryArgs: {
          version: inventoryVersion ? +inventoryVersion : 0,
        },
      })
      .execute()
      .then(() => {
        return {
          id: inventoryId,
          locale,
          clientType,
          expectedDelivery: '',
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

  protected async fetchInventryVersion(inventoryId: string): Promise<number> {
    const inventory = await this.requestBuilder()
      .inventory()
      .withId({ ID: inventoryId })
      .get()
      .execute();
    return inventory.body.version;
  }
}
