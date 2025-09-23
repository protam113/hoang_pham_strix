import '@/assets/styles/globals.css';
import LocaleGate from '@/components/core/LocaleGate';
import { metadata as siteMetadata } from '@/constants/appInfos';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export const metadata = siteMetadata;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params as { locale: string };
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="mdl-js">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-169R801JZ0"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-169R801JZ0');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocaleGate>{children}</LocaleGate>
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
        <Script id="add-mdl-class" strategy="afterInteractive">
          {`document.documentElement.classList.add('mdl-js');`}
        </Script>
      </body>
    </html>
  );
}
