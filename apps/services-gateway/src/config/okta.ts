import OktaJwtVerifier = require("@okta/jwt-verifier");
import dotenv from 'dotenv';

dotenv.config();

export const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER!,
  clientId: process.env.OKTA_CLIENT_ID!,
});
