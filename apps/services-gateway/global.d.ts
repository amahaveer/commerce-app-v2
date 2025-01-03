// global.d.ts

export {};

declare global {
  var systemConfig: {
    PORT: string | number; // Server port
    JWT_SECRET: string; // JWT secret for signing tokens
    OKTA_DOMAIN: string; // Okta domain URL
    OKTA_CLIENT_ID: string; // Okta client ID
    OKTA_CLIENT_SECRET: string; // Okta client secret
    REDIRECT_URI: string; // Redirect URI for Okta
    SERVICE_URLS: { [key: string]: string }; // Dictionary of service URLs
    REDIS_HOST: string; // Redis host
    REDIS_PORT: number; // Redis port
    REDIS_PASSWORD?: string; // Optional: Redis password
    REDIS_DB?: number; // Optional: Redis database index
    SERVICE_JWT_SECRET: string; // SERVICE JWT SECRET
  };
  var globalContext: {
    CT: {
      environment: string;
      defaultLocale: string;
      commercetools: {
        clientId: string;
        clientSecret: string;
        projectKey: string;
        authUrl: string;
        hostUrl: string;
      };
    };
    SENDGRID: {
      sendgrid: {
        apiKey: string;
        sender: string;
        client_host: string;
        template_account_verification: string;
        template_password_reset: string;
        template_order_confirmation: string;
        template_welcome_customer: string;
        template_account_deletion: string;
      };
    };
    CONTENTFUL: {
      contentful: {
        accessToken: string;
        previewToken: string;
        spaceId: string;
      };
    };
    PAYMENT: {
      adyen: {
        apiKey: string;
        merchantAccount: string;
        clientKey: string;
        baseUrl: string;
        hmacKey: string;
      };
    };
    CLOUDINARY: {
      cloudinary: {
        apiKey: number;
        apiSecret: string;
        autoTaggingMinConfidence: number;
        autoTaggingService: string;
        cloudName: string;
        mediaPoolName: string;
      };
    };
    SMTP: {
      smtp: {
        host: string;
        port: number;
        encryption: string;
        user: string;
        password: string;
        sender: string;
        client_host: string;
      };
    };
  };
}
