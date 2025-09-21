'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PageMetadata } from '@/constants/appInfos';

interface SEOProps {
  title: string;
  description?: string;
}

export default function SEO({ title, description }: SEOProps) {
  const pathname = usePathname();
  const metadata = PageMetadata(title, description); // Gọi hàm PageMetadata

  useEffect(() => {
    document.title = metadata.title as string;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', metadata.description as string);
  }, [metadata, pathname]);

  return null; // Không render gì, chỉ cập nhật metadata
}
