import { Request as CustomRequest } from '@royalcyber/global-types';
declare global {
  namespace Express {
    interface Request {
      customReq: CustomRequest;
    }
  }
}
