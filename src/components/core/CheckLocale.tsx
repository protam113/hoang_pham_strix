// components/CheckLocale.tsx
'use client';

import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function CheckLocale({ locale }: { locale: string }) {
  useEffect(() => {
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }
  }, [locale]);

  return null;
}
