import jwt from 'jsonwebtoken';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { Context } from '@royalcyber/global-types';

const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret'; // Secret key for decoding JWT

// Middleware to decode JWT context and attach it to the request
export const authMiddleware = (
  req: ExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const jwtContext = req.headers['context'] as string;

    if (jwtContext) {
      try {
        const decoded = jwt.verify(jwtContext, SECRET_KEY);

        // Ensure the decoded value is a JwtPayload
        if (typeof decoded === 'object' && decoded !== null) {
          req.customReq.context = decoded as Context;
        } else {
          console.error(`[ERROR] JWT context is not an object`);
          res
            .status(401)
            .json({ status: 'error', message: 'Invalid JWT context' });
          return;
        }
      } catch (error) {
        console.error(`[ERROR] Invalid JWT context:`, error);
        res
          .status(401)
          .json({ status: 'error', message: 'Invalid JWT context' });
        return;
      }
    }

    next();
  } catch (error) {
    console.error(`[ERROR] Error in authMiddleware:`, error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
