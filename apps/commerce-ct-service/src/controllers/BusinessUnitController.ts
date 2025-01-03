import {
  ActionContext,
  ClientType,
  Request,
  Response,
  Account,
  Address,
  BusinessUnit,
  ApprovalRule,
  ApprovalRuleQuery,
  ApprovalFlowsQuery,
} from '@royalcyber/global-types';
import {
  getBusinessUnitKey,
  getCurrency,
  getLocale,
  getStoreKey,
} from '../utils/Request';
import { fetchAccountFromSession } from '../utils/fetchAccountFromSession';
import handleError from '../utils/handleError';
import parseRequestBody from '../utils/requestHandlers/parseRequestBody';
import { ValidationError } from '../errors/ValidationError';
import { assertIsAuthenticated } from '../utils/assertIsAuthenticated';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import queryParamsToStates from '../utils/queryParamsToState';
import queryParamsToIds from '../utils/queryParamsToIds';
import queryParamsToSortAttributes from '../utils/requestHandlers/queryParamsToSortAttributes';
import BusinessUnitApi from '../services/BusinessUnitService';
import { CartService } from '../services/CartService';
import { AccountService } from '../services/AccountService';
import { getClientType } from '../utils/Request';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => Promise<Response>;

export interface BusinessUnitRequestBody {
  account: Account;
  parentBusinessUnit?: string;
  name?: string;
  contactEmail?: string;
}

function getBusinessUnitService(
  request: Request,
  actionContext: ActionContext,
) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  const locale = getLocale(request);
  const currency = getCurrency(request);

  return new BusinessUnitApi(actionContext.globalContext, locale, currency);
}

function getCartService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  const locale = getLocale(request);
  const currency = getCurrency(request);
  return new CartService(actionContext.globalContext, locale, currency);
}

function getAccountService(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new AccountService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

export const getBusinessUnits: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const expandStores = request.query?.['expandStores'] === 'true';

    if (!account?.accountId) {
      throw new ResourceNotFoundError({ message: 'No account id found.' });
    }

    const businessUnits = await businessUnitApi.getBusinessUnitsForUser(
      account?.accountId,
      expandStores,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnits),
      sessionData: {
        ...request.sessionData,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const getBusinessUnitOrders: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const cartApi = getCartService(request, actionContext);
    const businessUnitKey = request?.query?.['businessUnitKey'];

    if (!businessUnitKey) {
      throw new ValidationError({ message: 'No business unit key' });
    }
    const orders = await cartApi.getBusinessUnitOrders(clientType);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(orders),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const create: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    if (!request.body) {
      throw new ValidationError({ message: 'No body' });
    }

    const businessUnitRequestBody: BusinessUnitRequestBody = JSON.parse(
      request.body,
    );

    const businessUnit = await businessUnitApi.createForAccount(
      businessUnitRequestBody.account,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addAssociate: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const locale = getLocale(request);
    // const emailApi = EmailApiFactory.getDefaultApi(actionContext, locale);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const accountApi = getAccountService(request, actionContext);

    if (!request.body) {
      throw new ValidationError({ message: 'No body' });
    }

    const addUserBody: { email: string; roleKeys: string[] } = JSON.parse(
      request.body,
    );

    let accountAssociate = await accountApi.getAccountByEmail(
      addUserBody.email,
    );

    if (!accountAssociate) {
      const accountData = {
        email: addUserBody.email,
        password: Math.random().toString(36).slice(-8),
      };
      accountAssociate = await accountApi.create(accountData);

      const passwordResetToken = await accountApi.generatePasswordResetToken(
        accountAssociate.email,
      );
      // emailApi.sendAssociateVerificationAndPasswordResetEmail(accountAssociate, passwordResetToken);
    }

    const businessUnitKey = request.query['businessUnitKey'];

    if (
      !businessUnitKey ||
      !account?.accountId ||
      !accountAssociate?.accountId
    ) {
      throw new ResourceNotFoundError({
        message: 'No business unit key or account id',
      });
    }

    const businessUnit = await businessUnitApi.addAssociate(
      businessUnitKey,
      account.accountId,
      accountAssociate.accountId,
      addUserBody.roleKeys,
    );

    // emailApi.sendWelcomeAssociateEmail(accountAssociate, businessUnit);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeAssociate: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    if (!request.body) {
      throw new ValidationError({ message: 'No body' });
    }

    const { accountId: associateAccountId } = JSON.parse(request.body);
    const businessUnitKey = request.query['businessUnitKey'];

    if (!businessUnitKey || !account?.accountId || !associateAccountId) {
      throw new ResourceNotFoundError({
        message: 'Business unit key or account id missing',
      });
    }
    const businessUnit = await businessUnitApi.removeAssociate(
      businessUnitKey,
      account.accountId,
      associateAccountId,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateAssociate: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    if (!request.body) {
      throw new ValidationError({ message: 'No body' });
    }

    const {
      accountId: associateId,
      roleKeys,
    }: { accountId: string; roleKeys: string[] } = JSON.parse(request.body);
    const businessUnitKey = request.query['businessUnitKey'];

    if (!businessUnitKey || !account?.accountId || !associateId) {
      throw new ResourceNotFoundError({
        message: 'Business unit key or account id missing',
      });
    }

    const businessUnit = await businessUnitApi.updateAssociate(
      businessUnitKey,
      account.accountId,
      associateId,
      roleKeys,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateBusinessUnit: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const requestData = parseRequestBody<BusinessUnitRequestBody>(request.body);

    const businessUnitRequestData: BusinessUnit = {
      ...requestData,
      contactEmail: requestData?.contactEmail,
      name: requestData?.name,
      key: request.query['businessUnitKey'],
    };

    if (!businessUnitRequestData?.key || !account?.accountId) {
      throw new ResourceNotFoundError({
        message: 'Business unit key or account id missing',
      });
    }

    const businessUnit = await businessUnitApi.updateBusinessUnit(
      businessUnitRequestData,
      account.accountId,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const addBusinessUnitAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const { address } =
      parseRequestBody<{ address: Address }>(request.body) ?? {};

    if (!address) {
      throw new ResourceNotFoundError({
        message: 'Request body is invalid or address is missing',
      });
    }

    const businessUnitKey = request.query['businessUnitKey'];

    if (!businessUnitKey || !account?.accountId) {
      throw new ResourceNotFoundError({
        message: 'Business unit key or account id missing',
      });
    }

    const businessUnit = await businessUnitApi.addBusinessUnitAddress(
      businessUnitKey,
      account.accountId,
      address,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateBusinessUnitAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);
    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const { address } =
      parseRequestBody<{ address: Address }>(request.body) ?? {};

    if (!address) {
      throw new ResourceNotFoundError({
        message: 'Request body is invalid or address is missing',
      });
    }

    const businessUnitKey = request.query['businessUnitKey'];

    if (!businessUnitKey || !account?.accountId) {
      throw new ResourceNotFoundError({
        message: 'Business unit key or account id missing',
      });
    }

    const businessUnit = await businessUnitApi.updateBusinessUnitAddress(
      businessUnitKey,
      account.accountId,
      address,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeBusinessUnitAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);
    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const requestData = parseRequestBody<{ addressId: string }>(request.body);
    const addressId = requestData?.addressId;

    if (!addressId || !account?.accountId) {
      throw new ResourceNotFoundError({
        message: 'Address id or account id missing',
      });
    }

    const businessUnitKey = request.query['businessUnitKey'];

    const businessUnit = await businessUnitApi.removeBusinessUnitAddress(
      businessUnitKey,
      account.accountId,
      addressId,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const getBusinessUnit: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const businessUnitKey = request.query?.['businessUnitKey'];

    if (!account?.accountId) {
      throw new ValidationError({ message: 'Account ID is missing.' });
    }

    const businessUnit = await businessUnitApi.getByKeyForAccount(
      businessUnitKey,
      account.accountId,
      true,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(businessUnit),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const getAssociateRoles: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);
    const associateRoles = await businessUnitApi.getAssociateRoles();

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(associateRoles),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const setBusinessUnitAndStoreKeys: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);
    const businessUnitKey = getBusinessUnitKey(request);
    const storeKey = getStoreKey(request);

    if (!businessUnitKey || !storeKey) {
      throw new ValidationError({
        message: 'Business unit or store key is missing.',
      });
    }

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    if (!account?.accountId) {
      throw new ValidationError({ message: 'Account ID is missing.' });
    }

    const businessUnit = await businessUnitApi.getByKeyForAccount(
      businessUnitKey,
      account?.accountId,
      true,
    );

    const store = businessUnit.stores?.find((store) => store.key === storeKey);

    if (!store) {
      throw new ResourceNotFoundError({
        message: `Business Unit "${businessUnitKey}" is not linked to the store "${storeKey}"`,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({}),
      sessionData: {
        ...request.sessionData,
        businessUnitKey,
        storeKey,
        storeId: store.id,
        distributionChannelId: store?.distributionChannels?.[0]?.id, // Use only the first distribution channel
        supplyChannelId: store?.supplyChannels?.[0]?.id, // Use only the first supply channel
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const getAssociate: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);
    const businessUnitKey = getBusinessUnitKey(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    if (!account?.accountId || !businessUnitKey) {
      throw new ValidationError({
        message: 'Account ID or Business Unit Key is missing.',
      });
    }

    const associate = await businessUnitApi.getAssociate(
      businessUnitKey,
      account.accountId,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(associate),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const createApprovalRule: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    const account = fetchAccountFromSession(request);
    const businessUnitKey = getBusinessUnitKey(request);
    const storeKey = getStoreKey(request);

    const approvalRuleRequest = parseRequestBody<{
      approvalRule: ApprovalRule;
    }>(request.body);

    if (
      !businessUnitKey ||
      !storeKey ||
      !account?.accountId ||
      !approvalRuleRequest?.approvalRule
    ) {
      throw new ValidationError({
        message:
          'Business unit or store key or account id or approval rule is missing.',
      });
    }

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const approvalRule = await businessUnitApi.createApprovalRule(
      account.accountId,
      businessUnitKey,
      approvalRuleRequest?.approvalRule,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(approvalRule),
      sessionData: request.sessionData,
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const queryApprovalRules: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const account = assertIsAuthenticated(request);
    const businessUnitKey = getBusinessUnitKey(request);
    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const approvalRuleQuery: ApprovalRuleQuery = {
      limit: request.query?.limit ?? undefined,
      approvalRuleStatus: queryParamsToStates(
        'approvalRuleStatus',
        request.query,
      ),
      sortAttributes: queryParamsToSortAttributes(request.query),
      approvalRuleIds: queryParamsToIds('approvalRuleIds', request.query),
    };

    if (!businessUnitKey || !account?.accountId) {
      throw new ValidationError({
        message: 'Business unit key or account id is missing.',
      });
    }

    const queryResult = await businessUnitApi.queryApprovalRules(
      businessUnitKey,
      account.accountId,
      approvalRuleQuery,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(queryResult),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateApprovalRule: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const account = assertIsAuthenticated(request);
    const businessUnitKey = getBusinessUnitKey(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const approvalRuleRequest = parseRequestBody<{
      approvalRule: Omit<ApprovalRule, 'approvalRuleVersion'>;
    }>(request.body);

    if (
      !businessUnitKey ||
      !account?.accountId ||
      !approvalRuleRequest?.approvalRule
    ) {
      throw new ValidationError({
        message: 'Business unit or account id or approval rule is missing.',
      });
    }

    const approvalRule = await businessUnitApi.updateApprovalRule(
      approvalRuleRequest.approvalRule,
      account.accountId,
      businessUnitKey,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(approvalRule),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const queryApprovalFlows: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const account = assertIsAuthenticated(request);
    const businessUnitKey = getBusinessUnitKey(request);
    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const approvalFlowsQuery: ApprovalFlowsQuery = {
      limit: request.query?.limit ?? undefined,
      sortAttributes: queryParamsToSortAttributes(request.query),
      approvalFlowStatus: queryParamsToStates(
        'approvalFlowStatus',
        request.query,
      ),
      approvalFlowIds: queryParamsToIds('approvalFlowIds', request.query),
    };

    if (!businessUnitKey || !account?.accountId) {
      throw new ValidationError({
        message: 'Business unit key or account id is missing.',
      });
    }

    const approvalRules = await businessUnitApi.queryApprovalFlows(
      businessUnitKey,
      account.accountId,
      approvalFlowsQuery,
      clientType,
    );

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(approvalRules),
      sessionData: {
        ...request.sessionData,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const approveApprovalFlow: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
  clientType: ClientType,
) => {
  try {
    const account = assertIsAuthenticated(request);
    const businessUnitKey = getBusinessUnitKey(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const { approvalFlowId } =
      parseRequestBody<{ approvalFlowId: string }>(request.body) ?? {};

    if (!approvalFlowId) {
      throw new ResourceNotFoundError({
        message: 'Request body is invalid or approvalFlowId is missing',
      });
    }

    if (!businessUnitKey || !account?.accountId) {
      throw new ValidationError({
        message: 'Business unit key or account id is missing.',
      });
    }

    const approvalFlow = await businessUnitApi.approveApprovalFlow(
      businessUnitKey,
      account.accountId,
      approvalFlowId,
      clientType,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(approvalFlow),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const rejectApprovalFlow: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const account = assertIsAuthenticated(request);
    const businessUnitKey = getBusinessUnitKey(request);

    const businessUnitApi = getBusinessUnitService(request, actionContext);

    const { approvalFlowId, reason } =
      parseRequestBody<{ approvalFlowId: string; reason?: string }>(
        request.body,
      ) ?? {};

    if (!approvalFlowId) {
      throw new ResourceNotFoundError({
        message: 'Request body is invalid or approvalFlowId is missing',
      });
    }

    if (!businessUnitKey || !account?.accountId) {
      throw new ValidationError({
        message: 'Business unit key or account id is missing.',
      });
    }

    const approvalFlow = await businessUnitApi.rejectApprovalFlow(
      businessUnitKey,
      account.accountId,
      approvalFlowId,
      reason,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(approvalFlow),
      sessionData: request.sessionData,
    };
  } catch (error) {
    return handleError(error, request);
  }
};
