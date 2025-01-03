import { Router, Request, Response } from 'express';
const router = Router();
import { auth } from '../middleware/auth';
import { getContentController } from '../controllers/contentController';

router.get('/:id', getContentController);

export default router;
