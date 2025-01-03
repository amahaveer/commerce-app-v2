import { Request, Response } from 'express';
import { actions, ActionNamespaces } from '../controllers';
import { generateSessionToken } from './generateSessionDataToken';

export const handleActionRequest = async (req: Request, res: Response) => {
  const actionName = req.params[0]; // e.g., 'account/getAccount'
  const actionContext = {
    globalContext: req.customReq.context,
  };
  const [actionNamespace, action] = actionName.split('/') as [
    ActionNamespaces,
    string,
  ];

  if (
    actionNamespace &&
    action &&
    actions[actionNamespace] &&
    actions[actionNamespace][action]
  ) {
    try {
      const result = await actions[actionNamespace][action](
        req.customReq,
        actionContext,
      );

      // Generate and send the Session JWT token in the response header
      const token = generateSessionToken(result.sessionData);
      res.setHeader('session-token', token);

      res
        .status(result.statusCode || 200)
        .json(JSON.parse(result.body || '{}'));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(404).json({ error: 'Action not found' });
  }
};
