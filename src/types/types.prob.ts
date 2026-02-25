import { ReactNode } from 'react';

interface Section {
  id: string;
  label: string;
  color?: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface DefaultLayoutProps {
  children: ReactNode;
}

export interface ScrollProgressBarProps {
  sections: Section[];
  className?: string;
}
export interface PremiumLoaderProps {
  onLoadingComplete?: () => void;
}

export interface SectionHeaderProps {
  title: string;
  design?: string;
}
