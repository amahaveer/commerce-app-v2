'use client';
import { sdk } from '@royalcyber/unified-sdk';
import { ComposableCommerceEvents } from '@royalcyber/unified-sdk/composable-commerce';
import { getCookie, setCookie } from '@/utils/cookieManager';
import { SDK } from '@royalcyber/unified-commerce';
import React, { createContext, useLayoutEffect } from 'react';

interface ConfigureSDKContextProps {
  sdk: SDK<ComposableCommerceEvents>
}

const ConfigureSDKContext = createContext<ConfigureSDKContextProps | undefined>(undefined);


export const ConfigureSDKProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const currentLocale =
    typeof window !== 'undefined' ? getCookie('NEXT_LOCALE') : 'en';

  useLayoutEffect(() => {
    setCookie('client-type', 'web', 400)
    if(!currentLocale) return

    sdk.defaultConfigure(currentLocale);
  }, [currentLocale]);


  return (
    <ConfigureSDKContext.Provider value={{sdk}}>
      {children}
    </ConfigureSDKContext.Provider>
  );
};
