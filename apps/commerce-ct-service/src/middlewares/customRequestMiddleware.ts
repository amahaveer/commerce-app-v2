import { Context, Request as CustomRequest } from '@royalcyber/global-types';
import { Request as ExpressRequest, Response, NextFunction } from 'express';

// Middleware to map express request to Request type
export const mapExpressRequestToCustomRequest = (
  req: ExpressRequest,
): CustomRequest => {
  return {
    body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    hostname: req.hostname,
    method: req.method,
    path: req.path,
    query: req.query,
    clientIp: req.ip,
    headers: req.headers as Record<string, string>,
    sessionData: {},
    context: {} as Context,
  };
};

export const customRequestMiddleware = (
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  req.customReq = mapExpressRequestToCustomRequest(req);
  next();
};
