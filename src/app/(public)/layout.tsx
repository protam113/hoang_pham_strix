'use client';

// import LoadingBanner from '@/components/animation/loading-banner';
import ScrollToTopButton from '@/components/button/scroll.button';
import ShuffleLoader from '@/components/shuffle-loader';

import React, { useState } from 'react';

export default function LayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <ShuffleLoader onLoadingComplete={() => setLoading(false)} />}
      {!loading && (
        <main>
          <div>{children}</div>
          <ScrollToTopButton />
        </main>
      )}
    </>
  );
}
