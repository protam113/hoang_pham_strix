'use client';

import ScrollToTopButton from '@/components/button/scroll.button';

import React from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <div>{children}</div>
        <ScrollToTopButton />
      </main>
    </>
  );
}
