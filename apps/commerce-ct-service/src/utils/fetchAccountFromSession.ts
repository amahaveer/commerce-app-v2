import { Request, Account } from '@royalcyber/global-types';

export function fetchAccountFromSession(request: Request): Account | undefined {
  if (request.sessionData?.account !== undefined) {
    return request.sessionData.account;
  }

  return undefined;
}

export function fetchAccountFromSessionEnsureLoggedIn(
  request: Request,
): Account {
  const account = fetchAccountFromSession(request);
  if (!account) {
    throw new Error('Not logged in.');
  }
  return account;
}
