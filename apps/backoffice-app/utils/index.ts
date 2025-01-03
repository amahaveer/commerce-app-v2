import { IFormatCurrency, IOptionPair, ITranslateFunc } from 'types/global';

export const extractSetAtrributeOptions = (item: any, locale = 'en-US') => {
  const results: Array<any> = item.type?.elementType?.values?.results;
  if (!results || !results.length) return [];

  return results.map((res) => ({
    value: res.key,
    label: res.labelAllLocales?.find((data: any) => data?.locale === locale)
      ?.value
  }));
};

export const getCurrencyOptions = (): Array<any> => [
  { value: 'euro', label: 'EU' },
  { value: 'dollar', label: 'USD' }
];

export const getBooleanOptions = (): Array<any> => [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

export const getFilterOperatorOptions = (
  translate: ITranslateFunc
): Array<IOptionPair> => [
  { value: 'and', label: translate('common.and') },
  { value: 'or', label: translate('common.or') }
];

export const getFilterAttributeFieldOptions = (
  translate: ITranslateFunc
): Array<IOptionPair> => [
  { value: 'all', label: translate('common.allFields') },
  { value: 'empty', label: translate('common.empty') },
  { value: 'filled', label: translate('common.filled') }
];

export const getPublishStatusOptions = () => [
  {
    value: 'published',
    label: 'Publish',
    color: '#067446',
    bgColor: '#dbfae6'
  },
  {
    value: 'unpublished',
    label: 'Unpublish',
    color: '#545978',
    bgColor: '#f0f1f5'
  }
];

export const convertToLabelValuePairs = (data: Array<string>) =>
  data.map((item) => ({
    value: item,
    label: item
  }));

export const flattenObject = (obj: any, parentKey = '', result: any = {}) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

export const isValidImageUrl = (url: string) =>
  /\.(jpg|jpeg|png|gif)$/.test(url);

export function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return '--'; // Return '--' if the date is invalid
  }

  // Get parts of the date
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  // Get parts of the time
  let hours = date.getHours();
  const minutes: any = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'

  // If any of the values is NaN, return '--'
  if (
    !month ||
    !day ||
    !year ||
    !hours ||
    !minutes ||
    isNaN(hours) ||
    isNaN(minutes)
  ) {
    return '--';
  }

  // Format the date and time as MM/DD/YYYY HH:MM AM/PM
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;

  return formattedDate;
}

export function formatCurrency(payload: IFormatCurrency = {}) {
  const { currencyCode = 'USD', centAmount, fractionDigits } = payload; // Default to '$' if currencyCode is undefined
  if (centAmount === undefined) return '--';

  // Convert centAmount to actual value based on fractionDigits
  const amount = centAmount / Math.pow(10, fractionDigits || 0);

  // Use Intl.NumberFormat to format the currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits // Optionally limit maximum fraction digits to match the input precision
  }).format(amount);
}

export const getBase64ImageDimensions = (
  base64Image: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = base64Image;
  });
};
