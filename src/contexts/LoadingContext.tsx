'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface LoadingContextType {
  heroReady: boolean;
  setHeroReady: (ready: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [heroReady, setHeroReady] = useState(false);

  return (
    <LoadingContext.Provider value={{ heroReady, setHeroReady }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
