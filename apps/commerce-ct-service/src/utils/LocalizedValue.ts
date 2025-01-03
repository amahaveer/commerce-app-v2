import { LocalizedString } from '@royalcyber/global-types';
import { Locale } from '../Locale';

export default class LocalizedValue {
  static getLocalizedValue = (
    locale: Locale,
    defaultLocale: string,
    productValue?: LocalizedString,
  ): string => {
    if (!productValue) {
      return '';
    }
    if (productValue[locale.language]) {
      return productValue[locale.language];
    }
    if (productValue[defaultLocale]) {
      return productValue[defaultLocale];
    }

    return productValue[0];
  };
}
