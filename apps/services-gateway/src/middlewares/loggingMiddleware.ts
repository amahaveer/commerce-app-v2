import { Request, Response, NextFunction } from 'express';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[Gateway] Incoming request: ${req.method} ${req.originalUrl}`);
  next();
};
