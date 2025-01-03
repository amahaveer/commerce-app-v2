import express, {
  Application,
  Request as ExpressRequest,
  Response,
} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request as CustomRequest } from '@royalcyber/global-types';
import { CategoryRouter } from './utils/routers/CategoryRouter';
import { ProductRouter } from './utils/routers/ProductRouter';
import { SearchRouter } from './utils/routers/SearchRouter';
import { customRequestMiddleware } from './middlewares/customRequestMiddleware';
import { handleActionRequest } from './utils/handleActionRequest';
import { sessionDataMiddleware } from './middlewares/sessionDataMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';

class CommerceServer {
  private app: Application;
  private port: number;

  constructor() {
    dotenv.config();
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(customRequestMiddleware);
    this.app.use(authMiddleware);
    this.app.use(sessionDataMiddleware);
    this.app.use(
      cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: ['POST'],
        credentials: true,
        exposedHeaders: ['Authorization', 'session-token', 'Content-Type'],
      }),
    );
    this.port = parseInt('3005');
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.app.get('/', this.handleRoot.bind(this));
    this.app.get('/ping', this.handlePing.bind(this));
    this.app.use('/action/*', handleActionRequest);
    this.app.get('/*', this.createRouterHandler());
  }

  getRouterClass = (req: CustomRequest) => {
    if (ProductRouter.identifyFrom(req)) {
      return ProductRouter;
    }
    if (SearchRouter.identifyFrom(req)) {
      return SearchRouter;
    }
    if (CategoryRouter.identifyFrom(req)) {
      return CategoryRouter;
    }
  };

  private createRouterHandler() {
    return async (req: ExpressRequest, res: Response) => {
      const RouterClass = this.getRouterClass(req.customReq);
      const result = await RouterClass?.loadFor(
        req.customReq,
        req.customReq.context,
      );
      res.json(result);
    };
  }

  private handleRoot(req: ExpressRequest, res: Response): void {
    res.status(200).json({ CT_PROJECT_KEY: process.env.CT_PROJECT_KEY });
  }

  private handlePing(req: ExpressRequest, res: Response): void {
    res
      .status(200)
      .json({ name: `Hello I am listening on port ${this.port} !!!` });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

// Usage
const server = new CommerceServer();
server.start();
