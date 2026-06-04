'use client';

import { cn } from '@/utils/utils';
import React from 'react';

export interface PushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  label?: string;
  className?: string;
}

export const ContactButton: React.FC<PushButtonProps> = ({
  onClick,
  className,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      window.open(
        'https://drive.google.com/file/d/1cWvt36s9WPiCmenWBfz_M9etPMopd-TD/view?usp=sharing',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <button
        className={cn(
          'group flex items-center gap-2.5 rounded-full border border-white/10 bg-black/75 px-8 py-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/90 hover:border-white/20 active:scale-95 focus-visible:outline-none',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="whitespace-nowrap text-sm font-bold tracking-widest uppercase text-white/90">
          Get My CV
        </span>
        <svg
          className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
    </div>
  );
};
