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
  aspect: string;
  video?: string;
};

export const projects: Project[] = [
  {
    title: 'Hoi Dong Anh Em Duc Maria',
    category: 'Organization',
    image: '/imgs/hdh.webp',
    video: '/vid/hdae.mp4',
    href: 'https://hoidonganhemducmaria.com/',
    tag: ['Nextjs', 'Docker', 'CI-CD', 'React'],
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Vietstirx',
    category: 'Start Up',
    image: '/imgs/vsv.png',
    video: '/vid/untitled.mp4',
    href: 'https://vietstrix.com',
    tag: ['Nextjs', 'React', 'TailwindCSS', 'CI-CD', 'GitHub'],
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Hust4l',
    category: 'Commerce site',
    image: '/imgs/husth.webp',
    video: '/vid/hust.mp4',
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
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'UNIEN',
    category: 'Company blog',
    image: '/imgs/unu.webp',
    video: '/vid/unien.mp4',
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
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Com Lanh',
    category: 'Commerce site',
    image: '/imgs/gao.png',
    video: '/vid/comlanh.mp4',
    href: 'https://comlanh.vietstrix.com',
    tag: ['Nextjs', 'React', 'TailwindCSS', 'Docker', 'Zustand', 'React Query'],
    aspect: 'aspect-[3/4]',
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
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Finance News App',
    category: 'News',
    image: '/imgs/news.jpeg',
    href: 'https://news-finace-app-d27p-hjoowkxuj-protam113s-projects.vercel.app/',
    tag: ['Nextjs', 'React', 'TailwindCSS'],
    aspect: 'aspect-[4/3]',
  },
  {
    title: 'Bui Media',
    category: 'Agency Website',
    image: '/imgs/bui.png',
    video: '/vid/bui.mp4',
    href: 'https://buimedia.vietstrix.com',
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
    aspect: 'aspect-[4/3]',
  },
];
