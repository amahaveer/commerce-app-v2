import { Context } from '@royalcyber/global-types';

/**
 * Use this object to override values locally that would normally
 * be fetched from the projectConfiguration.
 * Only works in development.
 */
const projectConfigurationOverrides: { [key: string]: any } = {};

const isDevEnv = (context: Context) => {
  return context.environment === 'development' || context.environment === 'dev';
};

export const getFromProjectConfig = (key: string, context: Context) => {
  if (isDevEnv(context) && projectConfigurationOverrides[key]) {
    return projectConfigurationOverrides[key];
  }
  
  return context.projectConfiguration[key];
};

export const getContext = () =>
  ({
    environment: 'development',
    project: {
      projectId: '',
      name: '',
      customer: '',
      locales: [],
      defaultLocale: 'en_US',
      configuration: {
        commercetools: {
          authUrl:
            process.env.CT_AUTH_HOST ??
            'https://auth.us-central1.gcp.commercetools.com',
          clientId: process.env.CT_CLIENT_ID ?? 'your-client-id',
          clientSecret: process.env.CT_CLIENT_SECRET ?? 'your-client-secret',
          hostUrl:
            process.env.CT_HOST_URL ??
            'https://api.us-central1.gcp.commercetools.com',
          projectKey: process.env.CT_PROJECT_KEY ?? 'upc',
          productIdField: process.env.CT_PRODUCT_ID_FIELD ?? 'id',
          categoryIdField: process.env.CT_CATEGORY_ID_FIELD ?? 'id',
          productSelectionIdField:
            process.env.CT_PRODUCT_SELECTION_ID_FIELD ?? 'id',
          defaultAssociateRoleKeys:
            process.env.CT_DEFAULT_ASSOCIATE_ROLE_KEYS ?? 'defaultRole',
          defaultStoreKey: process.env.CT_DEFAULT_STORE_KEY ?? 'defaultStore',
        },
      },
    },
    projectConfiguration: {},
    locale: 'en_US',
    // featureFlags: [],
  }) ;
