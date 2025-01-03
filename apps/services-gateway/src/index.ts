import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import qs from 'qs';
import cors from 'cors';

import './config/system'; // Ensure this sets global.systemConfig
import redisClient from './config/redisConfig'; // Import Redis client
import { authorizeRequest } from './middlewares/authMiddleware';
import { gatewayMiddleware } from './middlewares/gatewayMiddleware';

const app: Application = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['POST'],
    credentials: true,
    exposedHeaders: ['Authorization', 'session-token', 'Content-Type'],
  }),
);
app.use(express.json());
app.use(cookieParser() as unknown as express.RequestHandler);

// Load configuration values from global systemConfig
const { JWT_SECRET, PORT, OKTA_DOMAIN, OKTA_CLIENT_ID, OKTA_CLIENT_SECRET } =
  global.systemConfig;

const requiredConfig = {
  JWT_SECRET,
  PORT,
  OKTA_DOMAIN,
  OKTA_CLIENT_ID,
  OKTA_CLIENT_SECRET,
};
Object.entries(requiredConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`Critical configuration missing: ${key} is required.`);
    process.exit(1);
  }
});

// Login route to request Okta access token
app.post('/generate-okta-token', async (req, res) => {
  try {
    const tokenUrl = `${OKTA_DOMAIN}/oauth2/default/v1/token`;
    const authHeader = `Basic ${Buffer.from(`${OKTA_CLIENT_ID}:${OKTA_CLIENT_SECRET}`).toString('base64')}`;

    const requestData = qs.stringify({
      grant_type: 'client_credentials',
      scope: 'read', // Define scopes as needed
    });

    const response = await axios.post(tokenUrl, requestData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
    });

    const accessToken = response.data.access_token;

    // Generate a unique Redis key based on the access token or client ID
    const sessionKey = `okta:session:${OKTA_CLIENT_ID}`;

    // Store access token in Redis with expiration
    await redisClient.set(sessionKey, accessToken, {
      EX: 360000, // Set expiration to 1 hour
    });

    res.status(200).json({
      status: 'success',
      token: accessToken,
    });
  } catch (error: any) {
    // Improved error logging
    console.error(`[ERROR] Failed to retrieve token from Okta:`, {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    res.status(error.response?.status || 500).json({
      status: 'error',
      message: 'Failed to retrieve access token from Okta',
      details: error.response?.data || error.message,
    });
  }
});

//OKTA
app.get('/auth', (req: Request, res: Response) => {
  const authorizationUrl =
    `${OKTA_DOMAIN}/oauth2/default/v1/authorize` +
    `?client_id=0oal50f6zci7FL0D35d7` +
    `&response_type=code` +
    // `&scope=openid` +
    `&scope=openid profile email customer_id` +
    `&redirect_uri=http://localhost:4000/authorization-code/callback` +
    `&state=YOUR_UNIQUE_STATE_VALUE`;

  console.log(authorizationUrl);

  res.redirect(authorizationUrl);
});
app.get(
  '/authorization-code/callback',
  async (req: Request, res: Response): Promise<any> => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      // Exchange authorization code for an access token
      const tokenUrl = `${OKTA_DOMAIN}/oauth2/default/v1/token`;
      const authHeader = `Basic ${Buffer.from(`0oal50f6zci7FL0D35d7:XfNQYmGP3FqfcD4UdTpogbzt1w_7iO0_wazwQK8MJBpJaYwpMY6k4ywt0-xdeF0N`).toString('base64')}`;

      const requestData = qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:4000/authorization-code/callback',
      });

      const response = await axios.post(tokenUrl, requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: authHeader,
        },
      });

      const accessToken = response.data.access_token;

      // Optionally, store the access token in Redis, session, or a secure cookie
      // For example, setting it as a cookie (not secure for production)
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: false,
      });

      // Redirect the user to the homepage or another route with success
      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token: accessToken,
      });
    } catch (error: any) {
      console.error(
        `[ERROR] Failed to exchange code for token:`,
        error.message,
      );
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve access token from Okta',
        details: error.response?.data || error.message,
      });
    }
  },
);

app.post('/ropc-token', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const tokenResponse = await axios.post(
      `${OKTA_DOMAIN}/oauth2/default/v1/token`,
      new URLSearchParams({
        grant_type: 'password',
        username: 'sohail.iqbal@royalcyber.com',
        password: '!@#Estrenstar12345',
        scope: 'openid manage_my_profile:upc',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(`0oal50f6zci7FL0D35d7:XfNQYmGP3FqfcD4UdTpogbzt1w_7iO0_wazwQK8MJBpJaYwpMY6k4ywt0-xdeF0N`).toString('base64')}`,
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    res.status(200).json({ token: accessToken });
  } catch (error: any) {
    console.error(
      'Error fetching token:',
      error.response?.data || error.message,
    );
    res
      .status(500)
      .json({ error: 'Failed to fetch token', details: error.response?.data });
  }
});

//OKTA END
// Define the logout handler with explicit types for req and res
app.post(
  '/logout',
  authorizeRequest,
  async (req: Request, res: Response): Promise<any> => {
    try {
      // Ensure authorization header exists and is correctly formatted
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

      if (!token) {
        return res
          .status(400)
          .json({ status: 'error', message: 'No token provided' });
      }

      // Define the Redis session key based on the token
      const sessionKey = `okta:session:${req?.user?.sub}`;

      // Delete the session from Redis to invalidate it
      const deleteResult = await redisClient.del(sessionKey);
      if (deleteResult === 0) {
        console.warn(`[WARN] Token not found in Redis for key: ${sessionKey}`);
        return res.status(404).json({
          status: 'error',
          message: 'Session not found or already logged out',
        });
      }

      // Clear any cookie if applicable (e.g., if token is stored in cookies)
      res.clearCookie('access_token');

      return res.status(200).json({
        status: 'success',
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      console.error(`[ERROR] Logout failed:`, {
        message: error.message,
        stack: error.stack,
      });
      return res.status(500).json({
        status: 'error',
        message: 'Failed to log out',
        details: error.message,
      });
    }
  },
);

// Middleware for authorization and request forwarding
app.use('/', authorizeRequest, gatewayMiddleware);

// Basic error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(`[ERROR] Unhandled server error:`, err);
    res.status(500).json({ error: 'Internal server error' });
  },
);

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
