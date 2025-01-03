import { Request, Response } from 'express';
import { getTemplate } from '../services/template';

export const getTemplateController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req?.params;
    const template = await getTemplate(id);
    if (template) {
      res.status(200);
      res.json({
        template,
      });
    }
  } catch (err: any) {
    console.log(
      'ERROR getTemplateController.ts/getTemplateController() :: ',
      err.message,
    );
    res.status(500);
    res.json({
      message: 'Internal server error',
    });
  }
};
