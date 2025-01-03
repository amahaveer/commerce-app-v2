import localFont from 'next/font/local';
import './globals.css';
import { CookiesProvider } from 'next-client-cookies/server';
import FooterComponent from '@/components/footer/footerComponenet';
import Header from '@/components/header/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CheckoutProvider } from '../Context/CheckoutContext';
import { Toaster } from '@/components/ui/toaster';
import { OktaTokenProvider } from '../../context/OktaTokenContext';
import { ConfigureSDKProvider } from '../../context/ConfigureSDKContext';
import { CartProvider } from '@/context/CartContext';
import { AccountProvider } from '@/context/AccountContext';
import { WishListProvider } from '@/context/WishListContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigureSDKProvider>
          <OktaTokenProvider>
            <CookiesProvider>
              <NextIntlClientProvider messages={messages}>
                <AccountProvider>
                  <CartProvider>
                    <CheckoutProvider>
                      <WishListProvider>
                        <Header />
                        <Toaster />
                        {children}
                        <FooterComponent />
                      </WishListProvider>
                    </CheckoutProvider>
                  </CartProvider>
                </AccountProvider>
              </NextIntlClientProvider>
            </CookiesProvider>
          </OktaTokenProvider>
        </ConfigureSDKProvider>
      </body>
    </html>
  );
}
