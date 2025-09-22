'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import '../../assets/styles/globals.css';

export default function NotFound() {
  const t = useTranslations('Page');

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{
        backgroundImage: 'url(/imgs/bgHome.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md space-y-6 text-white">
        <h1
          className="text-[220px] font-bold leading-none tracking-tighter animate-fade-in-down"
          style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
        >
          404
        </h1>
        <h2
          className="text-4xl font-bold animate-fade-in-up"
          style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}
        >
          {t('NotFound.title')}
        </h2>
        <p
          className="text-gray-300 animate-fade-in-up"
          style={{ animationDelay: '0.6s', animationDuration: '0.8s' }}
        >
          {t('NotFound.desc1')}
          <br />
          {t('NotFound.desc2')}
        </p>
        <div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up"
          style={{ animationDelay: '0.8s', animationDuration: '0.8s' }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-main px-6 py-3 font-medium text-white transition-colors hover:bg-red-main/80 hover:scale-105 transform  md:transition-transform duration-300 animate-pulse-subtle"
          >
            BACK TO HOMEPAGE
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
