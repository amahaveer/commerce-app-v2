import { eCategorySearchFields } from 'constants/category.constant';

export const getCategorySearchOptions = () => {
  return Object?.entries(eCategorySearchFields)?.map(([key, value]) => ({
    label: key?.replace(/_/g, ' '),
    value: value
  }));
};
