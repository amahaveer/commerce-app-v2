import dotenv from 'dotenv';

import { CONTEXTS } from '../data/context'; // Import Redis client if needed for session checking


// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'OKTA_DOMAIN',
  'OKTA_CLIENT_ID',
  'OKTA_CLIENT_SECRET',
  'REDIRECT_URI',
  'REDIS_HOST',
  'REDIS_PORT',
];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }
});

// Automatically generate SERVICE_URLS based on environment variables that start with "SERVICE_"
const generateServiceUrls = () => {
  const serviceUrls: { [key: string]: string } = {};

  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('SERVICE_')) {
      const serviceName = key.replace('SERVICE_', '').replace('_URL', '').toLowerCase();
      serviceUrls[serviceName] = process.env[key] as string;
    }
  });

  return serviceUrls;
};

// Define the configuration object
const config = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET as string,
  OKTA_DOMAIN: process.env.OKTA_DOMAIN as string,
  OKTA_CLIENT_ID: process.env.OKTA_CLIENT_ID as string,
  OKTA_CLIENT_SECRET: process.env.OKTA_CLIENT_SECRET as string,
  REDIRECT_URI: process.env.REDIRECT_URI as string,
  SERVICE_URLS: generateServiceUrls(), // Dynamically generated service URLs
  SERVICE_JWT_SECRET: process.env.SERVICE_JWT_SECRET as string, 


  // Redis configuration
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: parseInt(process.env.REDIS_PORT as string, 10),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || undefined,
  REDIS_DB: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB, 10) : undefined,
};

// Attach the config object to global.systemConfig
global.systemConfig = config;
global.globalContext = CONTEXTS

export default config;
