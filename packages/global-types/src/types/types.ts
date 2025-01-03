/**
 * Context retrieved by an "action" extension.
 *
 * All fields in the context are optional. We want to introduce a mechanism in the future that allows extensions to
 * annotate which context data they require.
 */
export interface ActionContext {
  globalContext?: Context;
}

/**
 * Base configuration properties for rendered elements .
 */
export interface Configuration {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

/**
 * Context that an API  server is running in (project & environment).
 *
 * Includes environment information configuration and project information.
 */
export interface Context {
  environment: string;
  configuration: ClientConfig;
  projectConfiguration: any;
  defaultLocale: string;
  featureFlags?: Record<string, boolean> | [];
  defaultAssociateRoleKeys?: string;
}

export interface ClientConfig {
  authUrl: string;
  clientId: string;
  clientSecret: string;
  hostUrl: string;
  projectKey: string;
  productIdField?: string;
  categoryIdField?: string;
  sessionUrl?: string;
  checkoutApplicationKey?: string;
  defaultAssociateRoleKeys?: string[];
}

/**
 * Project information and configuration as determined by env.
 */
export interface Project {
  projectId: string;
  name: string;
  customer: string;
  configuration: any;
  locales: string[];
  defaultLocale: string;
}

/**
 *
 *
 * The request structure is inspired by Express.js version 4.x and contains additional  $sessionData.
 */
export interface Request {
  context: Context;
  body?: string;
  hostname?: string;
  method: string;
  path: string;
  query: any;
  clientIp?: string;
  headers?: Record<string, string> | [];
  sessionData?: null | any;
}

/**
 * Response as to be returned by an "action" extension.
 *
 * The response structure is inspired by Express.js version 4.x +  sessionData.
 * IMPORTANT: To retain session information you need to return the session that comes in through sessionData in a
 * request in the response of the action.
 */
export interface Response {
  statusCode: number;
  body?: string;
  /**
   * session data to be written.
   */
  sessionData?: null | any;
}

// Define the ActionHook type
export type ActionHook = (request: Request, actionContext: ActionContext) => Promise<Response>;

// Define the type for the actions registry
export type ActionRegistry = {
  [namespace: string]: {
    [action: string]: ActionHook;
  };
};

export enum ClientType {
  WEB = 'web',
  BO = 'backoffice',
}
