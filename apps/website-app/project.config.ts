import { Currency } from '@royalcyber/unified-commerce/lib/types/Currency';

interface LocalizationMapping {
  locale: string;
  currency: Currency;
  currencyCode: string;
  countryName: string;
  countryCode: string;
}

const defaultLocale = {
  locale: 'en_US',
  currency: 'USD',
  currencyCode: '$',
  countryCode: 'US',
  countryName: 'United States',
} as LocalizationMapping;

const localizationMapper = {
  en: {
    locale: 'en_US',
    currency: 'USD',
    currencyCode: '$',
    countryCode: 'US',
    countryName: 'United States',
  },
  de: {
    locale: 'de_DE',
    currency: 'EUR',
    currencyCode: '€',
    countryCode: 'DE',
    countryName: 'Germany',
  },
} as Record<string, LocalizationMapping>;

export const getLocalizationInfo = (locale: string): LocalizationMapping => {
  // Explicit fallback with optional chaining to ensure LocalizationMapping is returned
  return localizationMapper[locale] ?? defaultLocale;
};
