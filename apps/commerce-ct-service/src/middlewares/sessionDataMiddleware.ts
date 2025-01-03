import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const sessionDataMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['session-token'] as string;
  if (token) {
    try {
      // Decode the JWT (e.g., using a secret or public key)
      const sessiondata = jwt.verify(
        token,
        process.env.JWT_SECRET || 'defaultSecret',
      );
      req.customReq.sessionData = sessiondata;
    } catch (err) {
      console.error('Invalid session data token', err);
    }
  }
  next();
};
