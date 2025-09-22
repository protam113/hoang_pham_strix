import '@/assets/styles/globals.css';
import CheckLocale from '@/components/core/CheckLocale';
import LocaleGate from '@/components/core/LocaleGate';
import { metadata as siteMetadata } from '@/constants/appInfos';
import { NextIntlClientProvider } from 'next-intl';
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
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <>
      <CheckLocale locale={locale} />

      <html lang={locale} className="mdl-js">
        <head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-169R801JZ0"
          ></Script>
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
          <NextIntlClientProvider locale={locale}>
            <div>
              <LocaleGate>{children}</LocaleGate>
              <Toaster position="top-right" richColors />
            </div>
          </NextIntlClientProvider>
          <Script id="add-mdl-class" strategy="afterInteractive">
            {`document.documentElement.classList.add('mdl-js');`}
          </Script>
        </body>
      </html>
    </>
  );
}
