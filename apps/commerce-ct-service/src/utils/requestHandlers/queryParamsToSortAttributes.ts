import { SortAttributes, SortOrder } from '@royalcyber/global-types';
const queryParamsToSortAttributes = (queryParams: any) => {
  const sortAttributes: SortAttributes = {};

  if (queryParams.sortAttributes) {
    let sortAttribute: Record<string, SortOrder>;

    for (sortAttribute of Object.values(queryParams.sortAttributes) as Record<
      string,
      SortOrder
    >[]) {
      const key = Object.keys(sortAttribute)[0];
      sortAttributes[key] = sortAttribute[key] || SortOrder.ASCENDING;
    }
  }

  return sortAttributes;
};

export default queryParamsToSortAttributes;
