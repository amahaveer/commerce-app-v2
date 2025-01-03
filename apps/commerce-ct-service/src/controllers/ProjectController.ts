import { ActionContext, Request, Response } from '@royalcyber/global-types';
import { getCurrency, getLocale } from '../utils/Request';
import { ProjectService } from '../services/ProjectService';
import handleError from '../utils/handleError';
import extractRegionFromCommercetoolsHostUrl from '../utils/extractRegionFromCommercetoolsHostUrl';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
) => Promise<Response>;

function getProjectService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new ProjectService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

export const getProjectSettings: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const projectApi = getProjectService(request, actionContext);

    const project = await projectApi.getProjectSettings();

    const region = actionContext.globalContext
      ? extractRegionFromCommercetoolsHostUrl(actionContext.globalContext)
      : undefined;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({ ...project, region }),
      sessionData: {
        ...projectApi.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};
