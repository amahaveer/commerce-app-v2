import { Router, Request, Response } from 'express';
const router = Router();
import { auth } from '../middleware/auth';
import { getTemplateController } from '../controllers/templateController';

router.get('/:id', getTemplateController);

export default router;
