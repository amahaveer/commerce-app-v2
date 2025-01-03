'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import localeMessages from "../locales";
import { ILanguageExpose } from 'types/language.type';
import { getProjectSettings } from 'app/api/projectSettings.api';
import { flattenObject } from 'utils';


const LanguageContext = createContext<ILanguageExpose>({
    locale: "en-US",
    languageList: [],
    messages: {},
    DEFAULT_LOCALE: "en-US",
    switchLanguage: () => {},
});

export const LanguageProvider = ({ children,  }: { children: ReactNode,  }) => {

  const DEFAULT_LOCALE = 'en-US'
  const [locale, setLocale] = useState(DEFAULT_LOCALE);
  const [languages, setLanguages] = useState(['en-US']);

  const switchLanguage = (newLocale: string) => {
    setLocale(newLocale);
  };

  const fetchRequiredData = async () => {
    const data = await getProjectSettings();
    if (data) {
      setLanguages(data.languages);
    }
  }

  useEffect(() => {
    fetchRequiredData()
  }, [])

  const expose: ILanguageExpose = {
    locale, 
    languageList: languages,
    messages: localeMessages[locale],
    DEFAULT_LOCALE,
    switchLanguage
  }

  const flattened = flattenObject(localeMessages[locale]);
  
  return (
    <LanguageContext.Provider value={expose}>
      <IntlProvider locale={locale} messages={flattened}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
