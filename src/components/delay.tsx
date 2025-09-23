'use client';

import { useEffect, useState } from 'react';
import ShuffleLoader from './shuffle-loader';

export function DelayedLoading({
  duration = 2000,
  onComplete,
}: {
  duration?: number;
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timeout);
  }, [duration, onComplete]);

  if (done) return null;

  return <ShuffleLoader onLoadingComplete={onComplete ?? (() => {})} />;
}
