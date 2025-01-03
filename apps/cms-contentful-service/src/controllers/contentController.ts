import { getContent } from '../services/content';
import { Request, Response } from 'express';

export const getContentController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req?.params;
    const content = await getContent(id);
    if (content) {
      res.status(200);
      res.json({
        content,
      });
    }
  } catch (err: any) {
    console.log(
      'ERROR getContentController.ts/getContentController() :: ',
      err.message,
    );
    res.status(500);
    res.json({
      message: 'Internal server error',
    });
  }
};
