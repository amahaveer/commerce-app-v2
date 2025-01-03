'use client';

import { ApplicationProvider } from 'context/application.context';
import { ThemeProvider } from '@mui/material/styles';
import { basicTheme } from 'theme/basic';
import { LanguageProvider } from 'context/language.context';
import { CustomerProvider } from 'context/customers';

export default function Providers({ children,  }: { children: React.ReactNode, }) {
  
  return (
    <LanguageProvider>
      <ApplicationProvider>
        <ThemeProvider theme={basicTheme}>
          <CustomerProvider>{children}</CustomerProvider>
        </ThemeProvider>
      </ApplicationProvider>
    </LanguageProvider>
  );
}
