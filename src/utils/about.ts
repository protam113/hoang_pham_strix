// lib/seo/our-team-service-seo.ts
import type { Metadata } from 'next';
import { createMetadata, SEOConfig } from './createMetadata';

export async function generateMySEO(): Promise<Metadata> {
  const config: SEOConfig = {
    title: 'Hoang Pham Developer',
    description:
      'Get to know the VietStrix team - a group of passionate developers, designers, and innovators dedicated to building high-quality solutions and shaping the future of technology.',
    url: '/',
    image: '/icons/Og_Logo.svg',
    keywords: [
      'VietStrix',
      'our team',
      'đội ngũ',
      'team',
      'nhân sự',
      'developers',
      'lập trình viên',
      'designers',
      'thiết kế',
      'innovators',
      'người sáng tạo',
      'experts',
      'chuyên gia',
      'about us',
      'về chúng tôi',
    ],
    breadcrumbs: [{ name: 'Home', url: '/' }],
  };

  return createMetadata(config);
}
