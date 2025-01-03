"use client";

import { Account } from '@royalcyber/global-types';
import { sdk } from '@royalcyber/unified-sdk';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { LoginAccountPayload } from '@/sdk/composable-commerce/types/payloads/AccountPayloads';


type AccountContextType = {
  account?: Account | null;
  loggedIn: boolean;
  error?: {} 
  accountLoading: boolean;
  login: (data: Record<string, string>) => Promise<object>;
  logout: () => Promise<boolean>;
};


const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchAccountDetails = useCallback(async () => {
    try {
      const accountResponse = await sdk.composableCommerce.account.getAccount();
      if(!accountResponse.isError && accountResponse?.data?.loggedIn){
        setAccount(accountResponse?.data?.account || null);
      } else {
        setAccount(null);
      }
    } catch (err:any) {
      setError(err.message || 'Error fetching account details');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (data: Record<string, string>) => {
    const loginPayload = { email: data.email, password: data.password } as LoginAccountPayload;
    const result: any = await sdk.composableCommerce.account.login(loginPayload);
    if (!result.isError) {
      fetchAccountDetails();
    }
    return result;
  }, []);

  const logout = useCallback(async () => {
      const result: any = await sdk.composableCommerce.account.logout();
    if (!result.isError) {
      setAccount(null);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    sdk.defaultConfigure('en');
    setLoading(true);
      fetchAccountDetails();
  }, [ fetchAccountDetails]);

  return (
    <AccountContext.Provider
      value={{
        account,
        loggedIn: !!account,
        error,
        accountLoading: loading,
        login,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within a AccountProvider');
  }
  return context;
};
