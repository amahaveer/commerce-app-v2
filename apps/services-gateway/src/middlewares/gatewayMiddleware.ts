import { Request, Response, NextFunction } from 'express';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import redisClient from '../config/redisConfig'; // Import Redis client if needed for session checking

import jwt from 'jsonwebtoken'; // Import jsonwebtoken library

// Access SERVICE_URLS from global.systemConfig
const serviceBaseUrls = global.systemConfig.SERVICE_URLS;
const SERVICE_JWT_SECRET = global.systemConfig.SERVICE_JWT_SECRET;
const CONTEXTS: any = global.globalContext;

function parseIfStringified(response: any) {
  if (typeof response === 'string') {
    try {
      return JSON.parse(response); // Parse and return if it’s a stringified JSON
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return response; // Return as-is if parsing fails
    }
  }
  return response; // Return as-is if it’s already a JSON object
}

// Middleware function to forward requests to the appropriate service
export const gatewayMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Validate the session by checking `req.user`, which should be set by the authorizeRequest middleware
    if (!req.user) {
      console.error(`[ERROR] Unauthorized request: Missing session data`);
      res
        .status(401)
        .json({ status: 'error', message: 'Unauthorized: Invalid session' });
      return;
    }

    // Optional: Check Redis for session validity, if sessions are stored there
    const sessionId = req.user?.sessionId;
    if (sessionId) {
      const sessionData = await redisClient.get(sessionId);
      if (!sessionData) {
        console.error(
          `[ERROR] Session not found in Redis for sessionId: ${sessionId}`,
        );
        res
          .status(401)
          .json({ status: 'error', message: 'Unauthorized: Session expired' });
        return;
      }
    }

    // Find the service path that matches the start of the request path
    console.log(`[DEBUG] Service URLs configuration:`, serviceBaseUrls);
    // console.log(JSON.stringify(CONTEXTS[path]))
    const servicePath = Object.keys(serviceBaseUrls).find((path) =>
      req.path.startsWith(`/${path}`),
    );

    if (!servicePath || !serviceBaseUrls[servicePath]) {
      res.status(404).json({
        status: 'error',
        message: 'Service not found or misconfigured',
      });
      return;
    }

    const serviceContext =
      JSON.stringify(CONTEXTS[`${servicePath.toUpperCase()}`]) || {};
    const encodedContext = jwt.sign(serviceContext, SERVICE_JWT_SECRET);
    const baseUrl = serviceBaseUrls[servicePath];
    const serviceUrl = baseUrl + req.originalUrl.replace(`/${servicePath}`, '');

    // Forward headers, excluding 'content-length' to prevent conflicts
    const headers = { ...req.headers };
    delete headers['content-length'];

    // Include user session info in headers, if required by downstream services
    headers['user-id'] = req.user?.sub;
    headers['user-name'] = req.user?.name;
    headers['user-email'] = req.user?.email;
    headers['context'] = encodedContext;

    // Axios request configuration
    const axiosConfig: AxiosRequestConfig = {
      method: req.method as AxiosRequestConfig['method'],
      url: serviceUrl,
      headers,
      ...(req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH'
        ? { data: req.body }
        : {}),
    };

    // Log the axiosConfig for debugging purposes
    console.log(
      `[DEBUG] Forwarding request configuration:`,
      JSON.stringify(axiosConfig, null, 2),
    );

    // Make the request to the target service
    const response: AxiosResponse = await axios(axiosConfig);

    // Forward all headers from the backend to the client
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value as string);
    });

    // Uniform success response
    res.status(response.status).json({
      status: 'success',
      data: parseIfStringified(response.data),
    });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || error.message || 'Internal server error';

    console.error(`[ERROR] Error forwarding request:`, {
      message: error.message,
      config: error.config,
      response: error.response?.data,
    });

    // Uniform error response
    res.status(status).json({
      status: 'error',
      message: message,
      details: error.response?.data || {},
    });
  }
};
