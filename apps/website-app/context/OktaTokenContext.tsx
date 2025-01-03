'use client';

import { apiClient } from '@/lib/commerceTools/apiClient';
import { setCookie } from '@/utils/cookieManager';
import React, { createContext, useState, useContext, useLayoutEffect } from 'react';

interface OktaTokenContextProps {
  oktaToken: string | null
}

const OktaTokenContext = createContext<OktaTokenContextProps | undefined>(undefined);

export const cookieName = "okta-token"
const cookieExpiry = 0.042

export const useOktaToken = () => {
  const context = useContext(OktaTokenContext);
  if (!context) {
    throw new Error('useOktaToken must be used within a OktaTokenProvider');
  }
  return context;
};

export const OktaTokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [oktaToken, setOktaToken] = useState<string>('')

  function getOktaToken() {
    apiClient.post(`${process.env.NEXT_PUBLIC_OKTA_API_URL}`).then((data) => {
      setOktaToken(data.token)
      setCookie(cookieName, data.token, cookieExpiry)
      return data.token 
    }).catch((err) => {
      console.log(err, 'token errors')
    })

  }

  useLayoutEffect(() => {

    const tokenInterval = setInterval(() => {
      getOktaToken()
    }, 3500000)

    if(!oktaToken){
      getOktaToken()
    }

    return () => clearInterval(tokenInterval)
  }, []);


  return (
    <OktaTokenContext.Provider
      value={{
        oktaToken
      }}
    >
      {children}
    </OktaTokenContext.Provider>
  );
};
