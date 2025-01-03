import { Category } from '@royalcyber/global-types';

function mapCommercetoolsCategoryToLocaliseString(nameAllLocales: any) {
  return nameAllLocales.reduce(
    (
      acc: Record<string, string>,
      localeObj: { value: string; locale: string },
    ) => ({ ...acc, [localeObj.locale]: localeObj.value }),
    {},
  );
}
export class CategoryMapper {
  // Map a category object to a localized structure
  static mapCommercetoolsCategory(category: any): Category {
    return {
      categoryId: category?.id || '',
      key: category?.key || '',
      name: mapCommercetoolsCategoryToLocaliseString(category.nameAllLocales),
      externalId: category?.externalId || '',
      childCount: category?.childCount || 0,
      orderHint: category?.orderHint || 0,
      createdAt: category?.createdAt || '',
      lastModifiedAt: category?.lastModifiedAt || '',
      stagedProductCount: category.stagedProductCount,
      // ancestors:
      //   category.ancestors?.map((ancestor: any) => ({
      //     categoryId: ancestor.id,
      //     name: mapCommercetoolsCategoryToLocaliseString(
      //       ancestor.nameAllLocales,
      //     ),
      //   })) || [],
      version: category.version,
      slug: mapCommercetoolsCategoryToLocaliseString(category.slugAllLocales),
    };
  }
}
