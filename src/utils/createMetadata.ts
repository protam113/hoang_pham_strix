import type { Metadata } from 'next';

export const siteBaseUrl = 'https://hoang_pham_strix.vercel.com';

// Schema types for better TypeScript support
interface BaseSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  image: string;
}

interface ArticleSchema extends BaseSchema {
  '@type': 'Article';
  author?: { '@type': 'Person'; name: string };
  datePublished?: string;
  dateModified?: string;
  articleSection?: string;
  keywords?: string;
}

interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage';
  breadcrumb?: any;
  mainEntity?: any;
}

type SchemaType = ArticleSchema | WebPageSchema | BaseSchema;

export type SEOConfig = {
  title: string;
  description: string;
  image?: string;
  url?: string;
  // Enhanced fields
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
  siteName?: string;
  articleSection?: string;
  tags?: string[];
  // Schema.org specific
  schemaType?: 'WebPage' | 'Article' | 'Product' | 'Organization' | 'HowTo';
  breadcrumbs?: Array<{ name: string; url: string }>;
  faq?: Array<{ question: string; answer: string }>;
  howTo?: {
    '@context': string;
    '@type': string;
    name: string;
    step: {
      '@type': string;
      text: string;
    }[];
  } | null;
};

export function createMetadata({
  title,
  description,
  image,
  url,
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  locale = 'vi_VN',
  siteName = 'Hoang Pham CV',
  articleSection,
  tags = [],
  schemaType = 'WebPage',
  breadcrumbs = [],
  faq = [],
}: SEOConfig): Metadata {
  const fullUrl = url || siteBaseUrl;
  const ogImage = image || `${siteBaseUrl}/default-og.jpg`;

  // Generate structured data based on type
  const generateStructuredData = (): SchemaType => {
    if (schemaType === 'Article') {
      const articleSchema: ArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        name: title,
        description,
        url: fullUrl,
        image: ogImage,
      };

      // Add optional Article fields
      if (author) articleSchema.author = { '@type': 'Person', name: author };
      if (publishedTime) articleSchema.datePublished = publishedTime;
      if (modifiedTime || publishedTime)
        articleSchema.dateModified = modifiedTime || publishedTime;
      if (articleSection) articleSchema.articleSection = articleSection;
      if (keywords.length > 0) articleSchema.keywords = keywords.join(', ');

      return articleSchema;
    }

    // Default WebPage schema
    const webPageSchema: WebPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: fullUrl,
      image: ogImage,
    };

    // Add breadcrumbs if provided
    if (breadcrumbs.length > 0) {
      webPageSchema.breadcrumb = {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      };
    }

    // Add FAQ schema if provided
    if (faq.length > 0) {
      webPageSchema.mainEntity = faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }));
    }

    return webPageSchema;
  };

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`, // For nested pages
    },
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,

    // Enhanced alternates
    alternates: {
      canonical: fullUrl,
      languages: {
        'vi-VN': fullUrl,
        'x-default': fullUrl, // Default for international users
      },
    },

    // Enhanced robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Enhanced Open Graph
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      locale,
      type: schemaType === 'Article' ? 'article' : 'website',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section: articleSection,
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
        // Add multiple image sizes for better performance
        {
          url: ogImage.replace('.jpg', '-small.jpg'),
          width: 600,
          height: 315,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },

    // Enhanced Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: author ? `@${author}` : undefined,
      site: '@your_twitter_handle', // Add your Twitter handle
      images: [ogImage],
    },

    // Additional metadata
    category: articleSection,
    classification: tags.join(', '),

    // Structured data and additional schemas
    other: {
      'application/ld+json': JSON.stringify([
        generateStructuredData(),
        // Add Organization schema
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteName,
          url: siteBaseUrl,
          logo: `/favicon.ico`,
          sameAs: [
            'https://facebook.com/yourpage',
            'https://twitter.com/yourhandle',
            'https://linkedin.com/company/yourcompany',
          ],
        },
      ]),
    },
  };
}

// Helper function for blog posts
export function createBlogMetadata(
  config: SEOConfig & {
    readingTime?: string;
    wordCount?: number;
  }
): Metadata {
  return createMetadata({
    ...config,
    schemaType: 'Article',
  });
}
