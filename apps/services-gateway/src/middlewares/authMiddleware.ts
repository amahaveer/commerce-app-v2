import { Request, Response, NextFunction } from 'express';
import OktaJwtVerifier from '@okta/jwt-verifier';
import redisClient from '../config/redisConfig';

// Use the global `systemConfig`
const OKTA_DOMAIN = global.systemConfig?.OKTA_DOMAIN;
const OKTA_CLIENT_ID = global.systemConfig?.OKTA_CLIENT_ID;

// Initialize the Okta JWT Verifier
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${OKTA_DOMAIN}/oauth2/default`,
  clientId: OKTA_CLIENT_ID,
});

// Define a custom user type for the request
interface UserClaims {
  sub: string;
  name?: string; // Make name optional
  email?: string;
  [key: string]: any;
}

// Extend the Express Request type to include the user claims
declare global {
  namespace Express {
    interface Request {
      user?: UserClaims;
    }
  }
}

export const authorizeRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  console.log(`[DEBUG] Received request at ${req.originalUrl}`);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error(`[ERROR] Unauthorized: No token provided. Auth header: ${authHeader}`);
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log(`[DEBUG] Extracted token: ${token}`);

  try {
    // Verify the token with Okta
    console.log('[DEBUG] Verifying token with Okta...');
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    
    console.log('[DEBUG] Token verified successfully. Claims:', jwt.claims);
    req.user = jwt.claims as UserClaims; // Attach the decoded claims to the request

    // Optional: Check Redis for session validity
    const sessionKey = `okta:session:${req.user.sub}`;
    console.log(`okta:session:${req.user.sub}`)
    const storedToken = await redisClient.get(sessionKey);
    if (!storedToken || storedToken !== token) {
      console.error(`[ERROR] Unauthorized: Session not found in Redis for token: ${token}`);
      res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
      return;
    }

    console.log('[DEBUG] Passing control to the next middleware');
    next();
  } catch (err: any) {
    console.error(`[ERROR] Unauthorized: Invalid token. Error message: ${err?.message}`);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
