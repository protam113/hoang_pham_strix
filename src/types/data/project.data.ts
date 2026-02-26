export const Tags = {
  'Front-end': [
    'React',
    'Nextjs',
    'Vite',
    'TailwindCSS',
    'ShadcnUI',
    'Zustand',
    'Redux',
    'React Query',
    'Micro-Frontend',
  ],

  'CI-CD': ['CI-CD', 'Docker', 'GitHub', 'GitLab'],

  'Back-end': [
    'Nestjs',
    'Go',
    'Ruby on Rails',
    'Rust',
    'Nodejs',
    'Nginx',
    'JWT',
    'OAuth2',
    'Keycloak',
  ],

  Database: ['MongoDB', 'PostgreSQL', 'Redis', 'Minio', 'AWS S3'],

  Architecture: ['MicroService', 'Grpc'],
} as const;

export type TagCategory = keyof typeof Tags;
export type Tag = (typeof Tags)[TagCategory][number];

export type Project = {
  title: string;
  category: string;
  image: string;
  href: string;
  tag: Tag[];
};

export const projects: Project[] = [
  {
    title: 'Hoi Dong Anh Em Duc Maria',
    category: 'Organization',
    image: '/imgs/hdh.webp',
    href: 'https://hoidonganhemducmaria.com/',
    tag: ['Nextjs', 'Docker', 'CI-CD', 'React'],
  },
  {
    title: 'Vietstirx',
    category: 'Start Up',
    image: '/imgs/vsv.webp',
    href: 'https://hoang-pham-strix.vercel.app',
    tag: ['Nextjs', 'React', 'TailwindCSS', 'CI-CD', 'GitHub'],
  },
  {
    title: 'Hust4l',
    category: 'Commerce site',
    image: '/imgs/husth.webp',
    href: 'https://hust4l.vercel.app/',
    tag: [
      'Nextjs',
      'React',
      'TailwindCSS',
      'CI-CD',
      'TailwindCSS',
      'React Query',
      'GitHub',
    ],
  },
  {
    title: 'UNIEN',
    category: 'Company blog',
    image: '/imgs/unu.webp',
    href: 'https://unien.vercel.app/',
    tag: [
      'Nextjs',
      'React',
      'TailwindCSS',
      'CI-CD',
      'Nestjs',
      'MongoDB',
      'Zustand',
      'React Query',
      'Docker',
      'GitHub',
    ],
  },
  {
    title: 'VIA',
    category: 'Commerce site',
    image: '/imgs/via.webp',
    href: 'https://hoang-pham-strix.vercel.app',
    tag: ['Nextjs', 'React', 'TailwindCSS', 'Docker', 'Zustand', 'React Query'],
  },
  {
    title: 'Atom Report App',
    category: 'To do list',
    image: '/imgs/atom.jpeg',
    href: 'https://hoang-pham-strix.vercel.app',
    tag: [
      'Vite',
      'React',
      'TailwindCSS',
      'Docker',
      'Zustand',
      'React Query',
      'MicroService',
      'Go',
      'Minio',
      'MongoDB',
      'Nestjs',
      'JWT',
      'Grpc',
      'GitHub',
      'Nginx',
    ],
  },
  {
    title: 'Finance News App',
    category: 'News',
    image: '/imgs/news.jpeg',
    href: 'https://news-finace-app-d27p-hjoowkxuj-protam113s-projects.vercel.app/',
    tag: ['Nextjs', 'React', 'TailwindCSS'],
  },
  {
    title: 'Vss App',
    category: 'To do list',
    image: '/imgs/vss.jpeg',
    href: 'https://hoang-pham-strix.vercel.app',
    tag: [
      'Nextjs',
      'React',
      'TailwindCSS',
      'Docker',
      'Zustand',
      'React Query',
      'MicroService',
      'Go',
      'Minio',
      'MongoDB',
      'Nestjs',
      'JWT',
      'Grpc',
      'GitHub',
      'Nginx',
      'Micro-Frontend',
      'Rust',
      'Ruby on Rails',
      'OAuth2',
      'PostgreSQL',
    ],
  },
];
