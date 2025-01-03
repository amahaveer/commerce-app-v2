import { Request, Token } from '@royalcyber/global-types';

export const getToken = (request: Request): Token | undefined => {
  if (request !== undefined) {
    const token: Token | undefined = request.sessionData?.token ?? undefined;

    return token;
  }

  return undefined;
};

export const tokenHasExpired = (token?: Token): boolean => {
  if (token === undefined) {
    return true;
  }

  return (
    token.expirationTime !== undefined && Date.now() >= token.expirationTime
  );
};

export const calculateExpirationTime = (
  expiredIn?: number,
): number | undefined => {
  if (expiredIn === undefined) {
    return undefined;
  }

  return expiredIn * 1000 + Date.now();
};
