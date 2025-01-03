// packages/global-types/express.d.ts
import { Request as CustomRequest } from './index';

declare global {
  namespace Express {
    interface Request {
      customReq: CustomRequest;
    }
  }
}
