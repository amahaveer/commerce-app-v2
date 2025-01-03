import { Request, ClientType } from '@royalcyber/global-types';
import { ValidationError } from '../errors/ValidationError';
import parseQueryParams from './requestHandlers/parseRequestParams';

export const getPath = (request: Request): string | null => {
  return getHeader(request, ['path']) ?? request.path;
};

export const getLocale = (request: Request): string | null => {
  const locale = getHeader(request, ['locale']) ?? request.query.locale;
  const clientType = getClientType(request);
  if (locale !== undefined) {
    return locale;
  }
  if (clientType === ClientType.WEB) {
    throw new ValidationError({
      message: `Locale is missing from request ${request}`,
    });
  }

  return locale;
};

export const getCurrency = (request: Request): string | null => {
  if (request !== undefined) {
    const currency =
      getHeader(request, ['currency']) ?? request.query['currency'];
    console.log('=====32===', currency);
    if (currency !== undefined) {
      return currency;
    }
  }

  return null;
};

export const getCountry = (locale: string) => {
  return { de_DE: 'DE', en_US: 'US', 'de_DE@EUR': 'DE', 'en_US@USD': 'US' }[
    locale
  ];
};

export const getHeader = (
  request: Request,
  headers: string[],
): string | null => {
  const requestHeaders = request.headers as Record<string, string>;
  for (const header of headers) {
    const foundHeader = requestHeaders[header.toLowerCase()];
    if (foundHeader !== undefined) {
      if (Array.isArray(foundHeader)) {
        return foundHeader[0];
      }
      return foundHeader;
    }
  }

  return null;
};

export const getClientType = (request: Request): ClientType => {
  const clientTypeHederValue = getHeader(request, ['client-type']);
  const clientType: ClientType =
    clientTypeHederValue === ClientType.BO ? ClientType.BO : ClientType.WEB;
  return clientType;
};

export const getBusinessUnitKey = (request: Request): string | null => {
  if (request !== undefined) {
    const { businessUnitKey } = parseQueryParams<{
      businessUnitKey: string;
    }>(request.query);

    return businessUnitKey ?? request.sessionData?.businessUnitKey;
  }

  return null;
};

export const getStoreKey = (request: Request): string | null => {
  if (request !== undefined) {
    const { storeKey } = parseQueryParams<{
      storeKey: string;
    }>(request.query);

    return storeKey ?? request.sessionData?.storeKey;
  }

  return null;
};

export const getStoreId = (request: Request): string | null => {
  if (request !== undefined) {
    const { storeId } = parseQueryParams<{
      storeId: string;
    }>(request.query);

    return storeId ?? request.sessionData?.storeId;
  }

  return null;
};

export const getDistributionChannelId = (request: Request): string | null => {
  if (request !== undefined) {
    const { distributionChannelId } = parseQueryParams<{
      distributionChannelId: string;
    }>(request.query);

    return distributionChannelId ?? request.sessionData?.distributionChannelId;
  }

  return null;
};

export const getSupplyChannelId = (request: Request): string | null => {
  if (request !== undefined) {
    const { supplyChannelId } = parseQueryParams<{
      supplyChannelId: string;
    }>(request.query);

    return supplyChannelId ?? request.sessionData?.supplyChannelId;
  }

  return null;
};
