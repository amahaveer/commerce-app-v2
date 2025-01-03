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
  ProductDiscount,
  Product as CommercetoolsProduct,
  ProductProjection as CommercetoolsProductProjection,
  ProductType as CommercetoolsProductType,
  ProductVariant as CommercetoolsProductVariant,
  RangeFacetResult as CommercetoolsRangeFacetResult,
  TermFacetResult as CommercetoolsTermFacetResult,
  FilteredFacetResult as CommercetoolsFilteredFacetResult,
  TypedMoney,
  InventoryEntry as CommercetoolsInventory,
  ProductTypeReference,
} from '@commercetools/platform-sdk';
import {
  AttributeDefinition,
  Price,
  Product,
  ProductStatus,
  ProductType,
  Variant,
  DiscountValue,
  Attributes,
  Category,
  Money,
  FilterField,
  FilterFieldValue,
  Facet,
  Facet as QueryFacet,
  TermFacet,
  TermFacet as QueryTermFacet,
  RangeFacet as ResultRangeFacet,
  RangeFacet as QueryRangeFacet,
  ProductQuery,
  Filter as QueryFilter,
  FacetDefinition,
  FilterFieldTypes,
  LocalizedString,
  FilterTypes,
  FacetTypes,
  Inventory,
  ClientType,
} from '@royalcyber/global-types';
import { Locale } from '../Locale';
import { ProductRouter } from '../utils/routers/ProductRouter';
import LocalizedValue from '../utils/LocalizedValue';
import { StoreMapper } from './StoreMapper';

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
    clientType: ClientType,
  ) => Product = (
    commercetoolsProduct: CommercetoolsProduct,
    categoryIdField: string,
    clientType: ClientType,
  ) => {
    const productData = commercetoolsProduct.masterData.staged;
    return {
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
        clientType,
      ),
      variants: ProductMapper.commercetoolsProductVariantsToVariants(
        productData.masterVariant,
        productData.variants,
        clientType,
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
    } as Product;
  };

  static commercetoolsProductProjectionToProduct: (
    commercetoolsProduct: CommercetoolsProductProjection,
    productIdField: string,
    categoryIdField: string,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ) => Product = (
    commercetoolsProduct: CommercetoolsProductProjection,
    productIdField: string,
    categoryIdField: string,
    locale: Locale,
    defaultLocale: string,
    clientType: ClientType,
  ) => {
    if (clientType === ClientType.BO) {
      return {
        productId: commercetoolsProduct?.id,
        productKey: commercetoolsProduct?.key,
        productRef: (commercetoolsProduct as any)?.[productIdField],
        productType:
          ProductMapper.commercetoolsProductTypeReferenceToProductType(
            commercetoolsProduct.productType,
          ),
        version: commercetoolsProduct?.version?.toString(),
        name: commercetoolsProduct?.name || '',
        slug: commercetoolsProduct?.slug || '',
        description: commercetoolsProduct?.description || '',
        categories: ProductMapper.commercetoolsCategoryReferencesToCategories(
          commercetoolsProduct.categories,
          categoryIdField,
          clientType,
        ),
        variants: ProductMapper.commercetoolsProductVariantsToVariants(
          commercetoolsProduct.masterVariant,
          commercetoolsProduct.variants,
          clientType,
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
      } as Product;
    }

    const product = {
      productId: commercetoolsProduct?.id,
      productKey: commercetoolsProduct?.key,
      productRef: (commercetoolsProduct as any)?.[productIdField],
      version: commercetoolsProduct?.version?.toString(),
      name: LocalizedValue.getLocalizedValue(
        locale,
        defaultLocale,
        commercetoolsProduct?.name,
      ),
      slug: LocalizedValue.getLocalizedValue(
        locale,
        defaultLocale,
        commercetoolsProduct?.slug,
      ),
      description: LocalizedValue.getLocalizedValue(
        locale,
        defaultLocale,
        commercetoolsProduct?.description,
      ),
      categories: ProductMapper.commercetoolsCategoryReferencesToCategories(
        commercetoolsProduct.categories,
        categoryIdField,
        clientType,
        locale,
      ),
      variants: ProductMapper.commercetoolsProductProjectionToVariants(
        commercetoolsProduct,
        clientType,
        locale,
      ),
    } as Product;

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

  static commercetoolsProductVariantsToVariants: (
    masterVariant: CommercetoolsProductVariant,
    variants: CommercetoolsProductVariant[],
    clientType: ClientType,
  ) => Variant[] = (
    masterVariant: CommercetoolsProductVariant,
    productVariants: CommercetoolsProductVariant[],
    clientType: ClientType,
  ) => {
    const variants: Variant[] = [];

    if (masterVariant !== undefined) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(
          masterVariant,
          clientType,
        ),
      );
    }

    for (let i = 0; i < productVariants.length; i++) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(
          productVariants[i],
          clientType,
        ),
      );
    }

    return variants;
  };

  static commercetoolsProductProjectionToVariants: (
    commercetoolsProduct: CommercetoolsProductProjection,
    clientType: ClientType,
    locale?: Locale,
  ) => Variant[] = (
    commercetoolsProduct: CommercetoolsProductProjection,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const variants: Variant[] = [];

    if (commercetoolsProduct?.masterVariant) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(
          commercetoolsProduct.masterVariant,
          clientType,
          locale,
        ),
      );
    }

    for (let i = 0; i < commercetoolsProduct.variants.length; i++) {
      variants.push(
        ProductMapper.commercetoolsProductVariantToVariant(
          commercetoolsProduct.variants[i],
          clientType,
          locale,
        ),
      );
    }

    return variants;
  };

  static commercetoolsProductVariantToVariant: (
    commercetoolsVariant: CommercetoolsProductVariant,
    clientType: ClientType,
    locale?: Locale,
  ) => Variant = (
    commercetoolsVariant: CommercetoolsProductVariant,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    if (clientType === ClientType.BO) {
      const attributes = commercetoolsVariant.attributes
        ? ProductMapper.commercetoolsAttributesToAttributes(
            commercetoolsVariant.attributes,
            clientType,
          )
        : [];
      return {
        id: commercetoolsVariant.id?.toString(),
        sku: commercetoolsVariant.sku?.toString(),
        images: {
          assets: commercetoolsVariant?.assets?.map(
            (asset) => asset.sources?.[0].uri
          ) ?? [],
          urls: commercetoolsVariant?.images?.map((image) => image.url) ?? [],
          labels: commercetoolsVariant?.images?.map((image) => image.label) ?? [],
          dimensions: commercetoolsVariant?.images?.map((image) => image.dimensions) ?? []
        },
        groupId: (attributes as Attributes)?.baseId || undefined,
        attributes: attributes,
        prices: ProductMapper.commercetoolsPricesToPrices(
          commercetoolsVariant.prices,
        ),
        isOnStock: commercetoolsVariant.availability?.isOnStock,
        restockableInDays: commercetoolsVariant.availability?.restockableInDays,
        availableQuantity: commercetoolsVariant.availability?.availableQuantity,
        key: commercetoolsVariant?.key,
        isMatchingVariant: commercetoolsVariant?.isMatchingVariant,
        availability: commercetoolsVariant?.availability,
        isAvailable: commercetoolsVariant.availability?.isOnStock,
      } as unknown as Variant;
    }

    const attributes = commercetoolsVariant.attributes
      ? ProductMapper.commercetoolsAttributesToAttributes(
          commercetoolsVariant.attributes,
          clientType,
          locale,
        )
      : [];
    const { price, discountedPrice, discounts } =
      ProductMapper.extractPriceAndDiscounts(commercetoolsVariant, locale);

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
      price: price,
      discountedPrice: discountedPrice,
      discounts: discounts,
      isOnStock: commercetoolsVariant.availability?.isOnStock,
      restockableInDays: commercetoolsVariant.availability?.restockableInDays,
      availableQuantity: commercetoolsVariant.availability?.availableQuantity,
      isMatchingVariant: commercetoolsVariant.isMatchingVariant,
    } as unknown as Variant;
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

  static commercetoolsAttributesToAttributes: (
    commercetoolsAttributes: CommercetoolsAttribute[],
    clientType: ClientType,
    locale?: Locale,
  ) => Attributes = (
    commercetoolsAttributes: CommercetoolsAttribute[],
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const attributes: Attributes = {};

    if (clientType === ClientType.BO) {
      commercetoolsAttributes?.forEach((commercetoolsAttribute) => {
        attributes[commercetoolsAttribute.name] = commercetoolsAttribute.value;
      });
    }

    if (clientType === ClientType.WEB && locale) {
      commercetoolsAttributes?.forEach((commercetoolsAttribute) => {
        attributes[commercetoolsAttribute.name] =
          ProductMapper.extractAttributeValue(
            commercetoolsAttribute.value,
            locale,
          );
      });
    }

    return attributes;
  };

  static commercetoolsCategoryReferencesToCategories: (
    commercetoolsCategoryReferences: CategoryReference[],
    categoryIdField: string,
    clientType: ClientType,
    locale?: Locale,
  ) => Category[] = (
    commercetoolsCategoryReferences: CategoryReference[],
    categoryIdField: string,
    clientType: ClientType,
    locale?: Locale,
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
          clientType,
          locale,
        );
      }

      categories.push(category);
    });

    return categories;
  };

  static commercetoolsCategoryToCategory: (
    commercetoolsCategory: CommercetoolsCategory,
    categoryIdField: string,
    clientType: ClientType,
    locale?: Locale,
  ) => Category = (
    commercetoolsCategory: CommercetoolsCategory,
    categoryIdField: string,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    const localeLanguage = locale?.language;

    const generateSlug = (
      slugObj: Record<string, string> | undefined,
      id: string,
    ) => (localeLanguage ? (slugObj?.[localeLanguage] ?? id) : id);

    const ancestorSlugs = commercetoolsCategory.ancestors.map((ancestor) =>
      generateSlug(ancestor.obj?.slug, ancestor.id),
    );

    const categorySlug = generateSlug(
      commercetoolsCategory.slug,
      commercetoolsCategory.id,
    );

    // Handle Backoffice (BO) logic
    if (clientType === ClientType.BO) {
      return {
        categoryId: (commercetoolsCategory as any)?.[categoryIdField],
        parentId: (
          commercetoolsCategory.parent?.obj as { [key: string]: any }
        )?.[categoryIdField],
        name: commercetoolsCategory.name || '',
        slug: commercetoolsCategory.slug || '',
        depth: commercetoolsCategory.ancestors.length,
        subCategories: (commercetoolsCategory as any).subCategories?.map(
          (subCategory: CommercetoolsCategory) =>
            ProductMapper.commercetoolsCategoryToCategory(
              subCategory,
              categoryIdField,
              clientType,
              locale,
            ),
        ),
      };
    }

    // Handle other client types (e.g., WEB)
    return {
      categoryId: (commercetoolsCategory as any)?.[categoryIdField],
      parentId: (commercetoolsCategory.parent?.obj as { [key: string]: any })?.[
        categoryIdField
      ],
      name: localeLanguage
        ? commercetoolsCategory.name?.[localeLanguage]
        : undefined,
      slug: localeLanguage
        ? commercetoolsCategory.slug?.[localeLanguage]
        : undefined,
      depth: commercetoolsCategory.ancestors.length,
      subCategories: (commercetoolsCategory as any).subCategories?.map(
        (subCategory: CommercetoolsCategory) =>
          ProductMapper.commercetoolsCategoryToCategory(
            subCategory,
            categoryIdField,
            clientType,
            locale,
          ),
      ),
      _url: `/${[...ancestorSlugs, categorySlug].join('/')}`,
    };
  };

  static commercetoolsCategoriesToTreeCategory(
    commercetoolsCategories: CommercetoolsCategory[],
    categoryIdField: string,
    clientType: ClientType,
    locale: Locale,
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
        this.commercetoolsCategoryToCategory(
          category,
          categoryIdField,
          clientType,
          locale,
        ),
      );
  }

  static extractAttributeValue(
    commercetoolsAttributeValue: unknown,
    locale: Locale,
  ): unknown {
    if (
      typeof commercetoolsAttributeValue === 'object' &&
      commercetoolsAttributeValue !== null &&
      'key' in commercetoolsAttributeValue &&
      'label' in commercetoolsAttributeValue
    ) {
      return {
        key: commercetoolsAttributeValue['key'],
        label: ProductMapper.extractAttributeValue(
          commercetoolsAttributeValue['label'],
          locale,
        ),
      };
    }

    if (
      typeof commercetoolsAttributeValue === 'object' &&
      commercetoolsAttributeValue !== null &&
      'typeId' in commercetoolsAttributeValue &&
      commercetoolsAttributeValue['typeId'] === 'product' &&
      (commercetoolsAttributeValue as { id?: string }).id !== undefined
    ) {
      return (commercetoolsAttributeValue as unknown as { id: string }).id;
    }

    if (commercetoolsAttributeValue instanceof Array) {
      return commercetoolsAttributeValue.map((value) =>
        ProductMapper.extractAttributeValue(value, locale),
      );
    }

    if (
      typeof commercetoolsAttributeValue === 'object' &&
      commercetoolsAttributeValue !== null &&
      locale.language in commercetoolsAttributeValue
    ) {
      return (commercetoolsAttributeValue as { [key: string]: any })[
        locale.language
      ];
    }
    return commercetoolsAttributeValue;
  }

  static commercetoolsProductDiscountValueToProductDiscountValue(
    commercetoolsProductDiscountValue: ProductDiscount,
    locale?: Locale,
  ): DiscountValue[] {
    const productDiscountValue: DiscountValue = {
      type: commercetoolsProductDiscountValue.value.type,
      description: locale
        ? commercetoolsProductDiscountValue.description?.[locale.language]
        : commercetoolsProductDiscountValue.description,
    };

    if (commercetoolsProductDiscountValue.value.type == 'relative') {
      Object.assign(productDiscountValue, {
        permyriad: commercetoolsProductDiscountValue.value.permyriad,
      });
    }

    if (commercetoolsProductDiscountValue.value.type == 'absolute') {
      const discountValues = commercetoolsProductDiscountValue.value.money.map(
        (money) => {
          return this.commercetoolsMoneyToMoney(money);
        },
      );

      Object.assign(productDiscountValue, {
        value: discountValues,
      });
    }

    return [productDiscountValue];
  }

  static extractPriceAndDiscounts(
    commercetoolsVariant: CommercetoolsProductVariant,
    locale?: Locale,
  ) {
    let price: Money | undefined;
    let discountedPrice: Money | undefined;
    let discounts: DiscountValue[] | undefined;

    if (commercetoolsVariant?.scopedPrice) {
      price = this.commercetoolsMoneyToMoney(
        commercetoolsVariant.scopedPrice?.value,
      );
      if (commercetoolsVariant.scopedPrice?.discounted?.value) {
        discountedPrice = this.commercetoolsMoneyToMoney(
          commercetoolsVariant.scopedPrice?.discounted?.value,
        );
      }

      if (commercetoolsVariant.scopedPrice?.discounted?.discount?.obj) {
        discounts =
          this.commercetoolsProductDiscountValueToProductDiscountValue(
            commercetoolsVariant.scopedPrice?.discounted?.discount?.obj,
            locale,
          );
      }

      return { price, discountedPrice, discounts };
    }

    if (commercetoolsVariant?.price) {
      price = this.commercetoolsMoneyToMoney(commercetoolsVariant.price?.value);
      if (commercetoolsVariant.price?.discounted?.value) {
        discountedPrice = this.commercetoolsMoneyToMoney(
          commercetoolsVariant.price?.discounted?.value,
        );
      }

      if (commercetoolsVariant.price?.discounted?.discount?.obj) {
        discounts =
          this.commercetoolsProductDiscountValueToProductDiscountValue(
            commercetoolsVariant.price?.discounted?.discount?.obj,
            locale,
          );
      }

      return { price, discountedPrice, discounts };
    }

    if (commercetoolsVariant?.prices && locale) {
      //Filter price by country and currency and if we don't find one, then filter only by currency
      let commercetoolsPrice: CommercetoolsPrice | undefined =
        commercetoolsVariant?.prices.find((price: CommercetoolsPrice) => {
          return (
            !price.hasOwnProperty('channel') &&
            !price.hasOwnProperty('customerGroup') &&
            price.country === locale.country &&
            price.value.currencyCode === locale.currency
          );
        });

      if (!commercetoolsPrice) {
        commercetoolsPrice = commercetoolsVariant?.prices.find(
          (price: CommercetoolsPrice) => {
            return (
              !price.hasOwnProperty('channel') &&
              !price.hasOwnProperty('customerGroup') &&
              !price.hasOwnProperty('country') &&
              price.value.currencyCode === locale.currency
            );
          },
        );
      }

      price = commercetoolsPrice?.value
        ? this.commercetoolsMoneyToMoney(commercetoolsPrice.value)
        : undefined;

      if (commercetoolsPrice?.discounted?.value) {
        discountedPrice = this.commercetoolsMoneyToMoney(
          commercetoolsPrice?.discounted?.value,
        );
      }

      if (commercetoolsPrice?.discounted?.discount?.obj) {
        discounts =
          this.commercetoolsProductDiscountValueToProductDiscountValue(
            commercetoolsPrice?.discounted?.discount?.obj,
            locale,
          );
      }

      return { price, discountedPrice, discounts };
    }

    return { price, discountedPrice, discounts };
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

  static commercetoolsInventoryToInventory: (
    commercetoolsInventory: CommercetoolsInventory,
    clientType: ClientType,
    locale?: Locale,
  ) => Inventory = (
    commercetoolsInventory: CommercetoolsInventory,
    clientType: ClientType,
    locale?: Locale,
  ) => {
    return {
      id: commercetoolsInventory.id,
      version: commercetoolsInventory.version.toString(),
      key: commercetoolsInventory.key,
      sku: commercetoolsInventory.sku,
      supplyChannel: commercetoolsInventory.supplyChannel?.obj
        ? StoreMapper.commercetoolsChannelToChannel(
            commercetoolsInventory.supplyChannel?.obj,
            clientType,
            locale,
          )
        : undefined,
      quantityOnStock: commercetoolsInventory.quantityOnStock,
      availableQuantity: commercetoolsInventory.availableQuantity,
      restockableInDays: commercetoolsInventory.restockableInDays,
      expectedDelivery: commercetoolsInventory.expectedDelivery || '',
      custom: commercetoolsInventory.custom,
      createdAt: commercetoolsInventory.createdAt,
      lastModifiedAt: commercetoolsInventory.lastModifiedAt,
    };
  };
}
