import {
  ActionContext,
  Request,
  Response,
  Address,
  Account,
  CustomerQuery,
  ClientType,
  CustomerGroup,
} from '@royalcyber/global-types';
import { AccountService } from '../services/AccountService';
import { CartFetcher } from '../utils/CartFetcher';
import { getClientType, getCurrency, getLocale } from '../utils/Request';
// import { EmailApiFactory } from '../utils/EmailApiFactory';
import { AccountAuthenticationError } from '../errors/AccountAuthenticationError';
import { CartService } from '../services/CartService';
import handleError from '../utils/handleError';
import { response } from 'express';

type ActionHook = (
  request: Request,
  actionContext: ActionContext,
) => Promise<Response>;

export type AccountRegisterBody = {
  accountId?: string;
  email?: string;
  password?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  middleName?: string;
  title?: string;
  vatId?: string;
  locale?: string;
  customerNumber?: string;
  externalId?: string,
  birthdayYear?: string;
  birthdayMonth?: string;
  birthdayDay?: string;
  addresses?: Address[];
  billingAddress?: Address;
  shippingAddress?: Address;
};

export type AccountLoginBody = {
  email?: string;
  password?: string;
};

type AccountChangePasswordBody = {
  oldPassword: string;
  newPassword: string;
};

function getaccountService(request: Request, actionContext: ActionContext) {
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

function getCartApi(request: Request, actionContext: ActionContext) {
  if (!actionContext.globalContext) {
    throw new Error('Global context is undefined');
  }
  return new CartService(
    actionContext.globalContext,
    getLocale(request),
    getCurrency(request),
    request,
  );
}

async function loginAccount(
  request: Request,
  actionContext: ActionContext,
  account: Account,
): Promise<Response> {
  const accountService = getaccountService(request, actionContext);
  const cartApi = getCartApi(request, actionContext);

  const cart = await CartFetcher.fetchCart(cartApi, request);

  account = await accountService.login(account, cart);

  if (!account.confirmed) {
    // If needed, the account confirmation email can be requested using
    // the endpoint action/account/requestConfirmationEmail.
    const response: Response = {
      statusCode: 401,
      body: JSON.stringify(
        `Your email address "${account.email}" was not yet verified.`,
      ),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  }

  const response: Response = {
    statusCode: 200,
    body: JSON.stringify(account),
    sessionData: {
      ...accountService.getSessionData(),
      account: account,
      cartId: undefined, // We unset the cartId as it could have been changed after login
    },
  };

  return response;
}

function assertIsAuthenticated(request: Request) {
  const account = fetchAccountFromSession(request);

  if (account === undefined) {
    throw new AccountAuthenticationError({ message: 'Not logged in.' });
  }
}

function fetchAccountFromSession(request: Request): Account | undefined {
  if (request.sessionData?.account !== undefined) {
    return request.sessionData.account;
  }

  return undefined;
}

function parseBirthday(
  accountRegisterBody: AccountRegisterBody,
): Date | undefined {
  if (accountRegisterBody.birthdayYear) {
    return new Date(
      +accountRegisterBody.birthdayYear,
      +(accountRegisterBody?.birthdayMonth ?? 1),
      +(accountRegisterBody?.birthdayDay ?? 1),
    );
  }

  return undefined;
}

function mapRequestToAccount(request: Request): Account {
  const accountRegisterBody: AccountRegisterBody = JSON.parse(
    request.body ?? '{}',
  );

  const account: Account = {
    accountId: accountRegisterBody?.accountId,
    email: accountRegisterBody?.email ?? '',
    password: accountRegisterBody?.password,
    salutation: accountRegisterBody?.salutation,
    firstName: accountRegisterBody?.firstName,
    middleName: accountRegisterBody?.middleName,
    lastName: accountRegisterBody?.lastName,
    companyName: accountRegisterBody?.companyName,
    title: accountRegisterBody?.title,
    vatId: accountRegisterBody?.vatId,
    locale: accountRegisterBody?.locale,
    customerNumber: accountRegisterBody?.customerNumber,
    externalId: accountRegisterBody?.externalId,
    birthday: parseBirthday(accountRegisterBody),
    addresses: [],
  };

  if (accountRegisterBody.billingAddress) {
    accountRegisterBody.billingAddress.isDefaultBillingAddress = true;
    accountRegisterBody.billingAddress.isDefaultShippingAddress = !(
      accountRegisterBody.shippingAddress !== undefined
    );

    account.addresses = account.addresses || [];
    account.addresses.push(accountRegisterBody.billingAddress);
  }

  if (accountRegisterBody.shippingAddress) {
    accountRegisterBody.shippingAddress.isDefaultShippingAddress = true;
    accountRegisterBody.shippingAddress.isDefaultBillingAddress = !(
      accountRegisterBody.billingAddress !== undefined
    );

    account.addresses = account.addresses || [];
    account.addresses.push(accountRegisterBody.shippingAddress);
  }

  if (accountRegisterBody.addresses) {
    account.addresses = accountRegisterBody.addresses;
  }

  return account;
}

function mapRequestToCustomerGroup(request: Request): CustomerGroup {
  const customerGroupBody: Partial<CustomerGroup> = JSON.parse(
    request.body ?? '{}',
  );

  const customerGroup: CustomerGroup = {
    id: customerGroupBody?.id,
    key: customerGroupBody?.key,
    name: customerGroupBody?.name,
    custom: customerGroupBody?.custom ?? null,
  };

  return customerGroup;
}

export const getAccount: ActionHook = async (request: Request) => {
  try {
    const account = fetchAccountFromSession(request);

    if (account === undefined) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          loggedIn: false,
        }),
      };
    }

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({
        loggedIn: true,
        account,
      }),
      sessionData: {
        ...request.sessionData,
        account: account,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const register: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const locale = getLocale(request) || 'en'; // Provide a default value if locale is null

    const accountService = getaccountService(request, actionContext);
    const cartApi = getCartApi(request, actionContext);

    const accountData = mapRequestToAccount(request);

    const cart = await CartFetcher.fetchCart(cartApi, request);

    const account = await accountService.create(accountData, cart);

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    // const emailApi = EmailApiFactory.getDefaultApi(actionContext.globalContext, locale || 'en');

    // emailApi.sendWelcomeCustomerEmail(account);

    // if (!account.confirmed) {
    //   emailApi.sendAccountVerificationEmail(account);
    // }

    // We are unsetting the confirmationToken to avoid exposing it to the client
    account.confirmationToken = undefined;

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const requestConfirmationEmail: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const locale = getLocale(request);

    const accountService = getaccountService(request, actionContext);
    const cartApi = getCartApi(request, actionContext);

    const accountLoginBody: AccountLoginBody = JSON.parse(request.body ?? '{}');

    let account = {
      email: accountLoginBody.email,
      password: accountLoginBody.password,
    } as Account;

    const cart = await CartFetcher.fetchCart(cartApi, request);

    account = await accountService.login(account, cart);

    if (account.confirmed) {
      const response: Response = {
        statusCode: 405,
        body: JSON.stringify(
          `Your email address "${account.email}" was verified already.`,
        ),
        sessionData: {
          ...accountService.getSessionData(),
          account: account,
        },
      };

      return response;
    }
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    // const emailApi = EmailApiFactory.getDefaultApi(actionContext.globalContext, locale || 'en');
    // emailApi.sendAccountVerificationEmail(account);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify({}),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const confirm: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    type AccountConfirmBody = {
      token?: string;
    };

    const accountConfirmBody: AccountConfirmBody = JSON.parse(
      request.body ?? '{}',
    );

    if (!accountConfirmBody.token) {
      throw new Error('Token is undefined');
    }
    const account = await accountService.confirmEmail(accountConfirmBody.token);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account: account,
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const login: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const accountLoginBody: AccountLoginBody = JSON.parse(request.body ?? '{}');

    const account = {
      email: accountLoginBody.email,
      password: accountLoginBody.password,
    } as Account;

    return await loginAccount(request, actionContext, account);
  } catch (error) {
    return handleError(error, request);
  }
};

export const logout: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  const accountService = getaccountService(request, actionContext);

  return {
    statusCode: 200,
    body: JSON.stringify({}),
    sessionData: {
      ...accountService.getSessionData(),
      account: undefined,
      cartId: undefined,
      wishlistId: undefined,
    },
  } as Response;
};

/**
 * Change password
 */
export const password: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    let account = fetchAccountFromSession(request);
    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }

    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    const accountChangePasswordBody: AccountChangePasswordBody = JSON.parse(
      request.body ?? '{}',
    );

    account = await accountService.updatePassword(
      account,
      accountChangePasswordBody.oldPassword,
      accountChangePasswordBody.newPassword,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

/**
 * Request new reset token
 */
export const requestReset: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const locale = getLocale(request);
    const clientType = getClientType(request);

    type AccountRequestResetBody = {
      email?: string;
      newPassword?: string;
    };

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      locale,
      getCurrency(request),
    );
    // const emailApi = EmailApiFactory.getDefaultApi(actionContext.globalContext, locale || 'en');

    const accountRequestResetBody: AccountRequestResetBody = JSON.parse(
      request.body ?? '{}',
    );

    if (!accountRequestResetBody.email) {
      throw new Error('Email is undefined');
    }
    const passwordResetToken = await accountService.generatePasswordResetToken(
      accountRequestResetBody.email,
    );

    let response: Response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unhandled client type' }),
      sessionData: {},
    };

    if (clientType === ClientType.BO) {
      if (!passwordResetToken || !passwordResetToken.token) {
        throw new Error('Failed to generate password reset token');
      }
      const { newPassword } = accountRequestResetBody;

      if (!newPassword) {
        throw new Error('Email or new password is undefined');
      }

      await accountService.resetPassword(passwordResetToken.token, newPassword);

      // Return success response
      response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Password reset successful' }),
        sessionData: {
          ...accountService.getSessionData(),
          account: undefined,
        },
      };
    }
    else {
      response = {
        statusCode: 200,
        body: JSON.stringify({}),
        sessionData: {
          ...accountService.getSessionData(),
          // TODO: should we redirect to logout rather to unset the account?
          account: undefined,
        },
      };
    }
    // emailApi.sendPasswordResetEmail(accountRequestResetBody as Account, passwordResetToken.token);

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

/**
 * Reset password
 */
export const reset: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    type AccountResetBody = {
      token?: string;
      newPassword?: string;
    };

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountResetBody: AccountResetBody = JSON.parse(request.body ?? '{}');

    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!accountResetBody.token || !accountResetBody.newPassword) {
      throw new Error('Token or new password is undefined');
    }
    const account = await accountService.resetPassword(
      accountResetBody.token,
      accountResetBody.newPassword,
    );
    account.password = accountResetBody.newPassword;

    return await loginAccount(request, actionContext, account);
  } catch (error) {
    return handleError(error, request);
  }
};

export const update: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    const clientType = getClientType(request);
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    let account: Account;
    let response: Response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unhandled client type' }),
      sessionData: {},
    };

    if (clientType === ClientType.BO) {
      account = mapRequestToAccount(request);
      account = await accountService.update(account);
      response = {
        statusCode: 200,
        body: JSON.stringify(account),
        sessionData: {
          account,
        },
      }
    } else if (clientType === ClientType.WEB) {
      assertIsAuthenticated(request);
      const sessionAccount = fetchAccountFromSession(request);
      account = {
        ...sessionAccount,
        ...mapRequestToAccount(request),
      };
      account = await accountService.update(account);
      account.confirmationToken = undefined;
      response = {
        statusCode: 200,
        body: JSON.stringify(account),
        sessionData: {
          ...accountService.getSessionData(),
          account,
        },
      };
    }

    // if (!account.confirmed) {
    //   emailApi.sendAccountVerificationEmail(account);
    // }

    //We are unsetting the confirmationToken to avoid exposing it to the client

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}').address;
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = await accountService.addAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addShippingAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}').address;

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = await accountService.addShippingAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const addBillingAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}').address;

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }

    account = await accountService.addBillingAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const { address }: { address: Address } = JSON.parse(request.body ?? '{}');

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    let response: Response = {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unhandled client type' }),
      sessionData: {},
    };

    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (clientType === ClientType.BO) {
      let account = mapRequestToAccount(request);
      account = await accountService.updateAddress(account, address);
      response = {
        statusCode: 200,
        body: JSON.stringify(account),
        sessionData: {
          account,
        },
      }
    } else if (clientType === ClientType.WEB) {
      assertIsAuthenticated(request);

      let account = fetchAccountFromSession(request);

      //const address: Address = JSON.parse(request.body ?? '{}');

      if (!account) {
        throw new AccountAuthenticationError({
          message: 'Account not found in session.',
        });
      }
      account = await accountService.updateAddress(account, address);
      response = {
        statusCode: 200,
        body: JSON.stringify({ address }),
        sessionData: {
          ...accountService.getSessionData(),
          account,
        },
      };
    }

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const removeAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}');

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = await accountService.removeAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const setDefaultBillingAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}');

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = await accountService.setDefaultBillingAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const setDefaultShippingAddress: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const address: Address = JSON.parse(request.body ?? '{}');

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }
    const accountService = new AccountService(
      actionContext.globalContext,
      getLocale(request),
      getCurrency(request),
    );

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = await accountService.setDefaultShippingAddress(account, address);

    return {
      statusCode: 200,
      body: JSON.stringify(account),
      sessionData: {
        ...accountService.getSessionData(),
        account,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const deleteAccount: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    assertIsAuthenticated(request);

    let account = fetchAccountFromSession(request);

    const accountDeleteBody: { password: string } = JSON.parse(
      request.body ?? '{}',
    );

    const accountService = getaccountService(request, actionContext);

    if (!account) {
      throw new AccountAuthenticationError({
        message: 'Account not found in session.',
      });
    }
    account = {
      email: account.email,
      password: accountDeleteBody.password,
    } as Account;

    account = await accountService.login(account, undefined);

    await accountService.delete(account);

    return {
      statusCode: 200,
      body: JSON.stringify(null),
      sessionData: {
        ...request.sessionData,
        account: null,
      },
    };
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCustomers: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const accountService = getaccountService(request, actionContext);
    const customerQuery: CustomerQuery = request.query;
    const customers = await accountService.getCustomerList(customerQuery, clientType);

    return {
      statusCode: 200,
      body: JSON.stringify(customers),
      sessionData: {
        ...accountService.getSessionData()
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCustomer: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const accountService = getaccountService(request, actionContext);
    const { id, key } = request.query as { id?: string; key?: string };

    if (!id && !key) {
      throw new Error('Either id or key must be provided to fetch the customer.');
    }

    const customer = await accountService.fetchCustomer({ id, key, clientType });

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(customer),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCustomerGroups: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const accountService = getaccountService(request, actionContext);
    const customerQuery: CustomerQuery = request.query;
    // Fetch customer groups using the account service
    const customerGroups = await accountService.getCustomerGroupList(customerQuery, clientType);

    return {
      statusCode: 200,
      body: JSON.stringify(customerGroups),
      sessionData: {
        ...accountService.getSessionData(),
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const createCustomerGroup: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const accountService = getaccountService(request, actionContext);
    const customerGroupData = mapRequestToCustomerGroup(request);

    const customerGroup = await accountService.addCustomerGroup(customerGroupData);

    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(customerGroup),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const updateCustomerGroup: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    if (!actionContext.globalContext) {
      throw new Error('Global context is undefined');
    }

    const accountService = getaccountService(request, actionContext);
    const customerGroupData = mapRequestToCustomerGroup(request);

    let customerGroup: CustomerGroup;
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    if (!customerGroupData.id) {
      throw new Error('Please provide Customer Group id.');
    }

    customerGroup = await accountService.updateCustomerGroup(customerGroupData);

    return {
      statusCode: 200,
      body: JSON.stringify(customerGroup),
      sessionData: {
        customerGroup,
      },
    } as Response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCustomerGroup: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);
    const accountService = getaccountService(request, actionContext);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    // Extracting customer group identifier from the request
    const { id, key } = request.query as { id?: string; key?: string };

    if (!id && !key) {
      throw new Error('Either id or key must be provided to fetch the customer group.');
    }

    // Fetch customer group using the account service
    const customerGroup = await accountService.fetchCustomerGroup({ id, key, clientType });

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(customerGroup),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};

export const getCustomerOrders: ActionHook = async (
  request: Request,
  actionContext: ActionContext,
) => {
  try {
    const clientType = getClientType(request);

    if (clientType !== ClientType.BO) {
      throw new Error('Invalid client type.');
    }

    const accountService = getaccountService(request, actionContext);
    const customerQuery: CustomerQuery = request.query;

    if (!customerQuery.id) {
      throw new Error('Customer ID must be provided to fetch orders.');
    }

    const orders = await accountService.fetchOrdersByCustomerId(customerQuery);

    const response: Response = {
      statusCode: 200,
      body: JSON.stringify(orders),
      sessionData: {
        ...accountService.getSessionData(),
      },
    };

    return response;
  } catch (error) {
    return handleError(error, request);
  }
};