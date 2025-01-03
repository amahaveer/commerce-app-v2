import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];


  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JwT_SECRET as string, (err) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    next();
  });
};
