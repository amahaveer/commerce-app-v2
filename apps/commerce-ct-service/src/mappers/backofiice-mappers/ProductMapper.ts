import {
  _Money as CommercetoolsMoney,
  Attribute as CommercetoolsAttribute,
  AttributeDefinition as CommercetoolsAttributeDefinition,
  AttributeEnumType,
  AttributeLocalizedEnumType,
  AttributeSetType,
  Category as CommercetoolsCategory,
  CategoryReference,
  FacetResults as CommercetoolsFacetResults,
  Price as CommercetoolsPrice,
  Product as CommercetoolsProduct,
  ProductProjection as CommercetoolsProductProjection,
  ProductType as CommercetoolsProductType,
  ProductTypeReference,
  ProductVariant as CommercetoolsProductVariant,
  RangeFacetResult as CommercetoolsRangeFacetResult,
  TermFacetResult as CommercetoolsTermFacetResult,
  FilteredFacetResult as CommercetoolsFilteredFacetResult,
  TypedMoney,
  InventoryEntry as CommercetoolsInventory,
} from '@commercetools/platform-sdk';
import { Locale } from '../../Locale';
import { ProductRouter } from '../../utils/routers/ProductRouter';
import {
  ProductStatus,
  LocalizedString,
  Product,
  Variant,
  Attributes,
  Category,
  Money,
  FilterField,
  FilterFieldValue,
  Facet,
  TermFacet,
  RangeFacet as ResultRangeFacet,
  ProductQuery,
  RangeFacet as QueryRangeFacet,
  TermFacet as QueryTermFacet,
  Facet as QueryFacet,
  Filter as QueryFilter,
  FacetDefinition,
  Price,
  ProductType,
  AttributeDefinition,
  FilterFieldTypes,
  FilterTypes,
  FacetTypes,
} from '@royalcyber/global-types';

const TypeMap = new Map<string, string>([
  ['boolean', FilterFieldTypes.BOOLEAN],
  ['enum', FilterFieldTypes.ENUM],
  ['text', FilterFieldTypes.TEXT],
  ['number', FilterFieldTypes.NUMBER],
  ['lenum', FilterFieldTypes.ENUM],
  ['ltext', FilterFieldTypes.TEXT],
  ['reference', FilterFieldTypes.TEXT],
  ['money', FilterFieldTypes.MONEY],
]);

export class ProductMapper {
  static commercetoolsProductToProduct: (
    commercetoolsProduct: CommercetoolsProduct,
    categoryIdField: string,
  ) => Product = (
    commercetoolsProduct: CommercetoolsProduct,
    categoryIdField: string,
  ) => {
    const productData = commercetoolsProduct.masterData.staged;
    const product: Product = {
      productId: commercetoolsProduct?.id,
      productKey: commercetoolsProduct?.key,
      productType: ProductMapper.commercetoolsProductTypeReferenceToProductType(
        commercetoolsProduct.productType,
      ),
      version: commercetoolsProduct?.version?.toString(),
      name: productData.name || '',
      slug: productData.slug || '',
      description: productData?.description || '',
      categories: ProductMapper.commercetoolsCategoryReferencesToCategories(
        productData.categories,
        categoryIdField,
      ),
      variants: ProductMapper.commercetoolsProductProjectionToVariants(
        productData.masterVariant,
        productData.variants,
      ),
      status: commercetoolsProduct.masterData.published
        ? commercetoolsProduct.masterData.hasStagedChanges
          ? ProductStatus.Modified
          : ProductStatus.Published
        : ProductStatus.Unpublished,
      taxCategory: commercetoolsProduct.taxCategory?.id,
      reviewRatingStatistics: commercetoolsProduct?.reviewRatingStatistics,
      priceMode: commercetoolsProduct?.priceMode,
      createdAt: commercetoolsProduct.createdAt,
      lastModifiedAt: commercetoolsProduct.lastModifiedAt,
    };

    product._url = ProductRouter.generateUrlFor(product);

    return product;
  };

  static commercetoolsProductProjectionToProduct: (
    commercetoolsProduct: CommercetoolsProductProjection,
    productIdField: string,
    categoryIdField: string,
  ) => Product = (
    commercetoolsProduct: CommercetoolsProductProjection,
    productIdField: string,
    categoryIdField: string,
  ) => {
    const product: Product = {
      productId: commercetoolsProduct?.id,
      productKey: commercetoolsProduct?.key,
      productRef: (commercetoolsProduct as any)?.[productIdField],
      productType: ProductMapper.commercetoolsProductTypeReferenceToProductType(
        commercetoolsProduct.productType,
      ),
      version: commercetoolsProduct?.version?.toString(),
      name: commercetoolsProduct?.name || '',
      slug: commercetoolsProduct?.slug || '',
      description: commercetoolsProduct?.description || '',
      categories: ProductMapper.commercetoolsCategoryReferencesToCategories(
        commercetoolsProduct.categories,
        categoryIdField,
      ),
      variants: ProductMapper.commercetoolsProductProjectionToVariants(
        commercetoolsProduct.masterVariant,
        commercetoolsProduct.variants,
      ),
      status: commercetoolsProduct.published
        ? commercetoolsProduct.hasStagedChanges
          ? ProductStatus.Modified
          : ProductStatus.Published
        : ProductStatus.Unpublished,
      taxCategory: commercetoolsProduct.taxCategory?.id,
      reviewRatingStatistics: commercetoolsProduct?.reviewRatingStatistics,
      priceMode: commercetoolsProduct?.priceMode,
      createdAt: commercetoolsProduct.createdAt,
      lastModifiedAt: commercetoolsProduct.lastModifiedAt,
    };

    product._url = ProductRouter.generateUrlFor(product);

    return product;
  };

  static commercetoolsProductTypeReferenceToProductType: (
    commercetoolsProductTypeReference: ProductTypeReference,
  ) => ProductType = (
    commercetoolsProductTypeReference: ProductTypeReference,
  ) => {
    let productType: ProductType = {
      id: commercetoolsProductTypeReference.id,
    };
    if (commercetoolsProductTypeReference.obj) {
      productType = ProductMapper.commercetoolsProductToProductType(
        commercetoolsProductTypeReference.obj,
      );
    }
    return productType;
  };

  static commercetoolsProductToProductType: (
    commercetoolsProductType: CommercetoolsProductType,
  ) => ProductType = (commercetoolsProductType: CommercetoolsProductType) => {
    return {
      id: commercetoolsProductType.id,
      version: commercetoolsProductType.version.toString(),
      key: commercetoolsProductType.key,
      name: commercetoolsProductType.name,
      description: commercetoolsProductType.name,
      createdAt: commercetoolsProductType.createdAt,
      lastModifiedAt: commercetoolsProductType.lastModifiedAt,
      attributes:
        ProductMapper.commercetoolsAttributeDefinitionToAttributeDefinition(
          commercetoolsProductType.attributes || [],
        ),
    } as ProductType;
  };

  static commercetoolsAttributeDefinitionToAttributeDefinition: (
    commercetoolsAttributeDefinitions: CommercetoolsAttributeDefinition[],
  ) => AttributeDefinition[] = (
    commercetoolsAttributeDefinitions: CommercetoolsAttributeDefinition[],
  ) => {
    return commercetoolsAttributeDefinitions.map(
      (commercetoolsAttributeDefinition) => {
        return {
          type: commercetoolsAttributeDefinition.type,
          name: commercetoolsAttributeDefinition.name,
          label: commercetoolsAttributeDefinition.label,
          isRequired: commercetoolsAttributeDefinition.isRequired,
          attributeConstraint:
            commercetoolsAttributeDefinition.attributeConstraint,
          inputTip: commercetoolsAttributeDefinition.inputTip,
          inputHint: commercetoolsAttributeDefinition.inputHint,
          isSearchable: commercetoolsAttributeDefinition.isSearchable,
        };
      },
    );
  };

  static commercetoolsProductProjectionToVariants: (
    masterVariant: CommercetoolsProductVariant,
    variants: CommercetoolsProductVariant[],
  ) => Variant[] = (
    masterVariant: CommercetoolsProductVariant,
    productVariants: CommercetoolsProductVariant[],
  ) => {
    const variants: Variant[] = [];

    if (masterVariant !== undefined) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(masterVariant),
      );
    }

    for (let i = 0; i < productVariants.length; i++) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(productVariants[i]),
      );
    }

    return variants;
  };

  static commercetoolsProductVariantToVariant: (
    commercetoolsVariant: CommercetoolsProductVariant,
  ) => Variant = (commercetoolsVariant: CommercetoolsProductVariant) => {
    const attributes = commercetoolsVariant.attributes
      ? ProductMapper.commercetoolsAttributesToAttributes(
          commercetoolsVariant.attributes,
        )
      : [];

    return {
      id: commercetoolsVariant.id?.toString(),
      sku: commercetoolsVariant.sku?.toString(),
      images: [
        ...(commercetoolsVariant?.assets?.map(
          (asset) => asset.sources?.[0].uri,
        ) ?? []),
        ...(commercetoolsVariant?.images?.map((image) => image.url) ?? []),
      ],
      groupId: (attributes as Attributes)?.baseId || undefined,
      attributes: attributes,
      prices: ProductMapper.commercetoolsPricesToPrices(
        commercetoolsVariant.prices,
      ),
      isOnStock: commercetoolsVariant.availability?.isOnStock,
      restockableInDays: commercetoolsVariant.availability?.restockableInDays,
      availableQuantity: commercetoolsVariant.availability?.availableQuantity,
    } as unknown as Variant;
  };

  static commercetoolsAttributesToAttributes: (
    commercetoolsAttributes: CommercetoolsAttribute[],
  ) => Attributes = (commercetoolsAttributes: CommercetoolsAttribute[]) => {
    const attributes: Attributes = {};

    commercetoolsAttributes?.forEach((commercetoolsAttribute) => {
      attributes[commercetoolsAttribute.name] = commercetoolsAttribute.value;
    });

    return attributes;
  };

  static commercetoolsPricesToPrices: (
    commercetoolsPrices: CommercetoolsPrice[] | undefined,
  ) => Price[] | undefined = (
    commercetoolsPrices: CommercetoolsPrice[] | undefined,
  ) => {
    if (commercetoolsPrices === undefined) {
      return undefined;
    }
    const prices: Price[] = commercetoolsPrices.map((commercetoolsPrice) => {
      return {
        id: commercetoolsPrice.id,
        key: commercetoolsPrice.key,
        value: ProductMapper.commercetoolsMoneyToMoney(
          commercetoolsPrice.value,
        ),
        country: commercetoolsPrice.country,
        customerGroupId: commercetoolsPrice.customerGroup?.id,
        channelId: commercetoolsPrice.channel?.id,
        validFrom: commercetoolsPrice.validFrom,
        validUntil: commercetoolsPrice.validUntil,
        discounted: commercetoolsPrice.discounted,
        tiers: commercetoolsPrice.tiers,
        custom: commercetoolsPrice.custom,
      } as Price;
    });
    return prices;
  };

  static commercetoolsCategoryReferencesToCategories: (
    commercetoolsCategoryReferences: CategoryReference[],
    categoryIdField: string,
  ) => Category[] = (
    commercetoolsCategoryReferences: CategoryReference[],
    categoryIdField: string,
  ) => {
    const categories: Category[] = [];

    commercetoolsCategoryReferences.forEach((commercetoolsCategory) => {
      let category: Category = {
        categoryId: commercetoolsCategory.id,
      };

      if (commercetoolsCategory.obj) {
        category = ProductMapper.commercetoolsCategoryToCategory(
          commercetoolsCategory.obj,
          categoryIdField,
        );
      }

      categories.push(category);
    });

    return categories;
  };

  static commercetoolsCategoryToCategory: (
    commercetoolsCategory: CommercetoolsCategory,
    categoryIdField: string,
  ) => Category = (
    commercetoolsCategory: CommercetoolsCategory,
    categoryIdField: string,
  ) => {
    return {
      categoryId: (commercetoolsCategory as any)?.[categoryIdField],
      parentId: (commercetoolsCategory.parent?.obj as { [key: string]: any })?.[
        categoryIdField
      ],
      name: commercetoolsCategory.name || '',
      slug: commercetoolsCategory.slug || '',
      depth: commercetoolsCategory.ancestors.length,
      subCategories: (commercetoolsCategory as any).subCategories?.map(
        (subCategory: CommercetoolsCategory) =>
          ProductMapper.commercetoolsCategoryToCategory(
            subCategory,
            categoryIdField,
          ),
      ),
    };
  };

  static commercetoolsCategoriesToTreeCategory(
    commercetoolsCategories: CommercetoolsCategory[],
    categoryIdField: string,
  ) {
    const nodes: {
      [key: string]: CommercetoolsCategory & {
        subCategories: CommercetoolsCategory[];
      };
    } = {};

    for (const category of commercetoolsCategories) {
      (
        category as CommercetoolsCategory & {
          subCategories: CommercetoolsCategory[];
        }
      ).subCategories = [];
      nodes[category.id] = { ...category, subCategories: [] };
    }

    for (const category of commercetoolsCategories) {
      if (!category.parent?.id) continue;

      nodes[category.parent.id].subCategories.push(category);
    }

    return commercetoolsCategories
      .filter((category) => category.ancestors.length === 0)
      .map((category) =>
        this.commercetoolsCategoryToCategory(category, categoryIdField),
      );
  }

  static commercetoolsMoneyToMoney(
    commercetoolsMoney: CommercetoolsMoney | TypedMoney,
  ): Money | undefined {
    if (commercetoolsMoney === undefined) {
      return undefined;
    }

    return {
      fractionDigits:
        commercetoolsMoney.hasOwnProperty('fractionDigits') &&
        (commercetoolsMoney as TypedMoney).fractionDigits !== undefined
          ? (commercetoolsMoney as TypedMoney).fractionDigits
          : 2,
      centAmount: commercetoolsMoney.centAmount,
      currencyCode: commercetoolsMoney.currencyCode,
    };
  }

  static commercetoolsProductTypesToFilterFields(
    commercetoolsProductTypes: CommercetoolsProductType[],
    locale: Locale,
  ): FilterField[] {
    const filterFields: FilterField[] = [];

    commercetoolsProductTypes?.forEach((productType) => {
      productType.attributes?.forEach((attribute) => {
        if (!attribute.isSearchable) {
          return;
        }

        filterFields.push(
          ProductMapper.commercetoolsAttributeDefinitionToFilterField(
            attribute,
            locale,
          ),
        );
      });
    });

    return filterFields;
  }

  static commercetoolsAttributeDefinitionToFilterField(
    commercetoolsAttributeDefinition: CommercetoolsAttributeDefinition,
    locale: Locale,
  ): FilterField {
    let commercetoolsAttributeTypeName =
      commercetoolsAttributeDefinition.type.name;

    let commercetoolsAttributeValues =
      commercetoolsAttributeDefinition.type?.hasOwnProperty('values')
        ? (
            commercetoolsAttributeDefinition.type as
              | AttributeEnumType
              | AttributeLocalizedEnumType
          ).values
        : [];

    if (commercetoolsAttributeTypeName === 'set') {
      const elementType = (
        commercetoolsAttributeDefinition.type as AttributeSetType
      ).elementType;

      commercetoolsAttributeTypeName = elementType.name;
      commercetoolsAttributeValues = elementType?.hasOwnProperty('values')
        ? (elementType as AttributeEnumType | AttributeLocalizedEnumType).values
        : [];
    }

    const filterFieldValues: FilterFieldValue[] = [];

    for (const value of commercetoolsAttributeValues) {
      const attributeValueLabel =
        commercetoolsAttributeTypeName === 'enum'
          ? value.label
          : ((value.label as LocalizedString)?.[locale.language] ?? value.key);

      filterFieldValues.push({
        value:
          typeof attributeValueLabel === 'string' ? attributeValueLabel : '',
        name:
          typeof attributeValueLabel === 'string'
            ? attributeValueLabel
            : undefined,
      });
    }

    return {
      field: `variants.attributes.${commercetoolsAttributeDefinition.name}`,
      type:
        TypeMap.get(commercetoolsAttributeTypeName) ??
        commercetoolsAttributeTypeName,
      label:
        commercetoolsAttributeDefinition.label?.[locale.language] ??
        commercetoolsAttributeDefinition.name,
      values: filterFieldValues.length > 0 ? filterFieldValues : undefined,
      translatable: false,
    };
  }

  static commercetoolsProductTypesToFacetDefinitions(
    commercetoolsProductTypes: CommercetoolsProductType[],
    locale: Locale,
  ): FacetDefinition[] {
    const facetDefinitionsIndex: { [key: string]: FacetDefinition } = {};
    const facetDefinitions: FacetDefinition[] = [];

    commercetoolsProductTypes?.forEach((productType) => {
      productType.attributes?.forEach((attribute) => {
        if (!attribute.isSearchable) {
          return;
        }

        let attributeType = attribute.type.name;

        if (
          attribute.type.name === 'set' &&
          (attribute.type as AttributeSetType).elementType
        ) {
          attributeType =
            attribute.type.name +
            '_' +
            (attribute.type as AttributeSetType).elementType.name;
        }

        const facetDefinition: FacetDefinition = {
          attributeType: attributeType,
          attributeId: `variants.attributes.${attribute.name}`,
          attributeLabel:
            attribute.label[locale.language] !== undefined &&
            attribute.label[locale.language].length > 0
              ? attribute.label[locale.language]
              : attribute.name,
        };

        // Store facets by attributeId to avoid duplicated attributes
        if (facetDefinition.attributeId)
          facetDefinitionsIndex[facetDefinition.attributeId] = facetDefinition;
      });
    });

    for (const [attributeId, facetDefinition] of Object.entries(
      facetDefinitionsIndex,
    )) {
      facetDefinitions.push(facetDefinition);
    }

    return facetDefinitions;
  }

  static facetDefinitionsToCommercetoolsQueryArgFacets(
    facetDefinitions: FacetDefinition[],
    locale: Locale,
  ): string[] {
    const queryArgFacets: string[] = [];

    facetDefinitions?.forEach((facetDefinition) => {
      let facet: string;

      switch (facetDefinition.attributeType) {
        case 'money':
          facet = `${facetDefinition.attributeId}.centAmount:range (0 to *)`;
          break;

        case 'enum':
          facet = `${facetDefinition.attributeId}.label`;
          break;

        case 'lenum':
          facet = `${facetDefinition.attributeId}.label.${locale.language}`;
          break;

        case 'ltext':
          facet = `${facetDefinition.attributeId}.${locale.language}`;
          break;

        case 'number':
        case 'boolean':
        case 'text':
        case 'reference':
        default:
          facet = facetDefinition.attributeId || '';
          break;
      }

      // Alias to identifier used by us
      queryArgFacets.push(`${facet} as ${facetDefinition.attributeId}`);
    });

    return queryArgFacets;
  }

  static facetDefinitionsToFilterQueries(
    queryFilters: QueryFilter[],
    facetDefinitions: FacetDefinition[],
    locale: Locale,
  ): string[] {
    const filterQueries: string[] = [];
    const typeLookup: { [key: string]: string } = {};

    if (facetDefinitions.length === 0) {
      return filterQueries;
    }

    facetDefinitions.forEach((facetDefinition) => {
      if (facetDefinition.attributeId)
        typeLookup[facetDefinition.attributeId] =
          facetDefinition.attributeType || '';
    });

    queryFilters.forEach((queryFilter) => {
      if (!typeLookup?.hasOwnProperty(queryFilter.identifier)) {
        return;
      }

      switch (typeLookup[queryFilter.identifier]) {
        case 'money':
          filterQueries.push(
            `${queryFilter.identifier}.centAmount:range (${(queryFilter as unknown as QueryRangeFacet).min} to ${
              (queryFilter as unknown as QueryRangeFacet).max
            })`,
          );
          break;
        case 'enum':
          filterQueries.push(
            `${queryFilter.identifier}.label:"${(queryFilter as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'lenum':
          filterQueries.push(
            `${queryFilter.identifier}.label.${locale.language}:"${(
              queryFilter as unknown as QueryTermFacet
            ).terms?.join('","')}"`,
          );
          break;
        case 'ltext':
          filterQueries.push(
            `${queryFilter.identifier}.${locale.language}:"${(queryFilter as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'set_reference':
          filterQueries.push(
            `${queryFilter.identifier}.id:"${(queryFilter as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'number':
        case 'boolean':
        case 'text':
        default:
          if (queryFilter.type === FilterTypes.TERM) {
            filterQueries.push(
              `${queryFilter.identifier}:"${(queryFilter as unknown as QueryTermFacet).terms?.join('","')}"`,
            );
            break;
          }

          if (queryFilter.type === FilterTypes.BOOLEAN) {
            filterQueries.push(
              `${queryFilter.identifier}:"${(queryFilter as unknown as QueryTermFacet).terms?.[0] === 'T' ? 'true' : 'false'}"`,
            );
            break;
          }

          filterQueries.push(
            `${queryFilter.identifier}:range (${(queryFilter as unknown as QueryRangeFacet).min} to ${
              (queryFilter as unknown as QueryRangeFacet).max
            })`,
          );

          break;
      }
    });

    return filterQueries;
  }

  static facetDefinitionsToFilterFacets(
    queryFacets: QueryFacet[],
    facetDefinitions: FacetDefinition[],
    locale: Locale,
  ): string[] {
    const filterFacets: string[] = [];
    const typeLookup: { [key: string]: string } = {};

    if (facetDefinitions.length === 0) {
      return filterFacets;
    }

    facetDefinitions.forEach((facetDefinition) => {
      if (facetDefinition.attributeId)
        typeLookup[facetDefinition.attributeId] =
          facetDefinition.attributeType || '';
    });

    queryFacets.forEach((queryFacet) => {
      if (!typeLookup?.hasOwnProperty(queryFacet.identifier)) {
        return;
      }

      switch (typeLookup[queryFacet.identifier]) {
        case 'money':
          filterFacets.push(
            `${queryFacet.identifier}.centAmount:range (${(queryFacet as QueryRangeFacet).min} to ${
              (queryFacet as QueryRangeFacet).max
            })`,
          );
          break;
        case 'enum':
          filterFacets.push(
            `${queryFacet.identifier}.label:"${(queryFacet as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'lenum':
          filterFacets.push(
            `${queryFacet.identifier}.label.${locale.language}:"${(queryFacet as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'ltext':
          filterFacets.push(
            `${queryFacet.identifier}.${locale.language}:"${(queryFacet as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'set_reference':
          filterFacets.push(
            `${queryFacet.identifier}.id:"${(queryFacet as unknown as QueryTermFacet).terms?.join('","')}"`,
          );
          break;
        case 'number':
        case 'boolean':
        case 'text':
        default:
          if (queryFacet.type === FacetTypes.TERM) {
            filterFacets.push(
              `${queryFacet.identifier}:"${(queryFacet as unknown as QueryTermFacet).terms?.join('","')}"`,
            );
            break;
          }

          if (queryFacet.type === FacetTypes.BOOLEAN) {
            filterFacets.push(
              `${queryFacet.identifier}:"${(queryFacet as unknown as QueryTermFacet).terms?.[0] === 'T' ? 'true' : 'false'}"`,
            );
            break;
          }

          filterFacets.push(
            `${queryFacet.identifier}:range (${(queryFacet as QueryRangeFacet).min} to ${
              (queryFacet as QueryRangeFacet).max
            })`,
          );

          break;
      }
    });

    return filterFacets;
  }

  static commercetoolsFacetResultsToFacets(
    facetDefinitions: FacetDefinition[],
    commercetoolsFacetResults: CommercetoolsFacetResults,
    productQuery: ProductQuery,
    locale: Locale,
  ): Facet[] {
    const facets: Facet[] = [];
    let facetLabel: string = '';

    for (const [facetKey, facetResult] of Object.entries(
      commercetoolsFacetResults,
    )) {
      const facetQuery = this.findFacetQuery(productQuery, facetKey);

      facetDefinitions.filter((facet) => {
        if (facet.attributeId === facetKey) {
          facetLabel = facet.attributeLabel || '';
        }
      });

      switch (facetResult.type) {
        case 'range':
          facets.push(
            ProductMapper.commercetoolsRangeFacetResultToRangeFacet(
              facetLabel,
              facetKey,
              facetResult as CommercetoolsRangeFacetResult,
              facetQuery as QueryRangeFacet | undefined,
            ),
          );
          break;

        case 'terms':
          if (facetResult.dataType === 'number') {
            facets.push(
              ProductMapper.commercetoolsTermNumberFacetResultToRangeFacet(
                facetLabel,
                facetKey,
                facetResult as CommercetoolsTermFacetResult,
                facetQuery as QueryRangeFacet | undefined,
              ),
            );
            break;
          }
          // Mahaveer - Temporarily commenting this code to avoid compilation error
          facets.push(
            ProductMapper.commercetoolsTermFacetResultToTermFacet(
              facetLabel,
              facetKey,
              facetResult as CommercetoolsTermFacetResult,
              facetQuery as QueryTermFacet | undefined,
            ),
          );
          break;
        case 'filter':
          facets.push(
            ProductMapper.commercetoolsFilteredFacetResultToFacet(
              facetLabel,
              facetKey,
              facetResult as CommercetoolsFilteredFacetResult,
              facetQuery as QueryTermFacet | undefined,
            ),
          );
          break;
        default:
          break;
      }
    }

    return facets;
  }

  static commercetoolsRangeFacetResultToRangeFacet(
    facetLabel: string,
    facetKey: string,
    facetResult: CommercetoolsRangeFacetResult,
    facetQuery: QueryRangeFacet | undefined,
  ) {
    const rangeFacet: ResultRangeFacet = {
      type: FacetTypes.RANGE,
      identifier: facetKey,
      label: facetLabel,
      key: facetKey,
      min: facetResult.ranges[0].min,
      max: facetResult.ranges[0].max,
      selected: facetQuery !== undefined,
      minSelected: facetQuery ? facetQuery.min : undefined,
      maxSelected: facetQuery ? facetQuery.max : undefined,
    };

    return rangeFacet;
  }

  static commercetoolsTermFacetResultToTermFacet(
    facetLabel: string,
    facetKey: string,
    facetResult: CommercetoolsTermFacetResult,
    facetQuery: QueryTermFacet | undefined,
  ) {
    const termFacet: TermFacet = {
      type:
        facetResult.dataType === 'boolean'
          ? FacetTypes.BOOLEAN
          : FacetTypes.TERM,

      identifier: facetKey,
      label: facetLabel,
      key: facetKey,
      count: facetResult.total,
      selected: facetQuery !== undefined,
      terms: facetResult.terms.map((facetResultTerm) =>
        facetResultTerm.term.toString(),
      ),
    };
    return termFacet;
  }

  static commercetoolsFilteredFacetResultToFacet(
    facetLabel: string,
    facetKey: string,
    facetResult: CommercetoolsFilteredFacetResult,
    facetQuery: QueryTermFacet | undefined,
  ) {
    const facet: Facet = {
      type: FacetTypes.TERM,
      identifier: facetKey,
      label: facetLabel,
      key: facetKey,
      count: facetResult.count,
      selected: facetQuery !== undefined,
    };
    return facet;
  }

  static commercetoolsTermNumberFacetResultToRangeFacet(
    facetLabel: string,
    facetKey: string,
    facetResult: CommercetoolsTermFacetResult,
    facetQuery: QueryRangeFacet | undefined,
  ) {
    const rangeFacet: ResultRangeFacet = {
      type: FacetTypes.RANGE,
      identifier: facetKey,
      label: facetLabel,
      key: facetKey,
      count: facetResult.total,
      min:
        Math.min(
          ...facetResult.terms.map((facetResultTerm) => facetResultTerm.term),
        ) ?? Number.MIN_SAFE_INTEGER,
      max:
        Math.max(
          ...facetResult.terms.map((facetResultTerm) => facetResultTerm.term),
        ) ?? Number.MAX_SAFE_INTEGER,
    };

    if (facetQuery) {
      rangeFacet.selected = true;
      rangeFacet.minSelected = facetQuery.min;
      rangeFacet.maxSelected = facetQuery.max;
    }
    return rangeFacet;
  }

  static calculatePreviousCursor(offset: number, count: number) {
    return offset - count >= 0 ? `offset:${offset - count}` : undefined;
  }

  static calculateNextCursor(offset: number, count: number, total: number) {
    return offset + count < total ? `offset:${offset + count}` : undefined;
  }

  private static findFacetQuery(productQuery: ProductQuery, facetKey: string) {
    if (productQuery.facets !== undefined) {
      for (const facet of productQuery.facets) {
        if (facet.identifier === facetKey) {
          return facet;
        }
      }
    }

    return undefined;
  }
}
