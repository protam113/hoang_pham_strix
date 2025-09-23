// lib/seo/our-team-service-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from './createMetadata';

export async function generateMySEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'Hoang Pham Developer',
    description:
      'Fullstack developer with a strong focus on modern web technologies, passionate about crafting clean UIs, building scalable systems, and bringing creative ideas to life.',
    url: '/',
    image: '/icons/Og_Logo.svg',
    keywords: [
      'Lenf',
      'Hoàng',
      'fullstack developer',
      'web developer',
      'Next.js',
      'React',
      'NestJS',
      'Node.js',
      'TypeScript',
      'UI/UX',
      'designer',
      'cloud',
      'database',
      'frontend',
      'backend',
      'portfolio',
      'personal website',
      'developer profile',
    ],
    breadcrumbs: [{ name: 'Home', url: '/' }],
  };

  return createMetadata(config);
}
