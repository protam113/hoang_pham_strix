import '@/assets/styles/globals.css';
import { DelayedLoading } from '@/components/delay';
import { metadata as siteMetadata } from '@/constants/appInfos';
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export const metadata = siteMetadata;

// QUICK HACK: accept any props, then cast to correct shape
export default async function RootLayout(props: any) {
  const { children } = props as {
    children: ReactNode;
  };

  return (
    <html className="mdl-js">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-169R801JZ0"
        />
        <Script id="google-analytics">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-169R801JZ0');
        `}</Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DelayedLoading duration={1000} />

        {/* <CheckLocale /> */}
        <NextIntlClientProvider>
          <div>
            {children}
            <Toaster position="top-right" richColors />
          </div>
        </NextIntlClientProvider>
        <Script
          id="add-mdl-class"
          strategy="afterInteractive"
        >{`document.documentElement.classList.add('mdl-js');`}</Script>
      </body>
    </html>
  );
}
