import { Context, ClientConfig } from '@royalcyber/global-types';
import { normalizeUrl } from './NormalizeData';

export const getConfig = (context: Context): ClientConfig => {
  const clientConfig: ClientConfig = {
    authUrl: context.configuration?.authUrl,
    clientId: context.configuration?.clientId,
    clientSecret: context.configuration?.clientSecret,
    hostUrl: context.configuration?.hostUrl,
    projectKey: context.configuration?.projectKey,
    productIdField: context.configuration?.productIdField,
    categoryIdField: context.configuration?.categoryIdField,
    defaultAssociateRoleKeys: context.configuration?.defaultAssociateRoleKeys
      ? context.configuration.defaultAssociateRoleKeys.map((associateRoleKey: string) => associateRoleKey.trim())
      : []
  };

  // Normalize urls
  clientConfig.authUrl = normalizeUrl(clientConfig.authUrl);
  clientConfig.hostUrl = normalizeUrl(clientConfig.hostUrl);

  return clientConfig;
};
