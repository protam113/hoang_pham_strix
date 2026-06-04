'use client';

import { ContactButton } from '@/components/button/contact.button';
import ScrollToTopButton from '@/components/button/scroll.button';

import React from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="relative min-h-screen">
        <div className="relative">{children}</div>
        <ScrollToTopButton />
        <ContactButton />
      </main>
    </>
  );
}
