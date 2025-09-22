// components/core/LocaleGate.tsx
'use client';

import { useEffect, useState } from 'react';

export default function LocaleGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 3000); // 3 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
