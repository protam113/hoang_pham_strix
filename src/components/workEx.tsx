'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { Container } from './layout/container';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WorkItem = memo(({ item }: { item: any }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="space-y-3"
      whileInView="show"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h3 className="text-2xl font-semibold">{item.title}</h3>
      <p className="text-sm text-gray-400">{item.period}</p>
      <p className="text-gray-300">{item.description}</p>

      <div className="flex flex-wrap gap-2">
        {item.roles?.map((role: string, i: number) => (
          <span
            key={i}
            className="px-2 py-1 text-xs bg-white text-primary rounded-full"
          >
            {role}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {item.tech.map((tech: string, i: number) => (
          <span
            key={i}
            className="px-2 py-1 text-xs bg-white/10 text-white rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
});
WorkItem.displayName = 'WorkItem';

export const WorkEx = () => {
  const t = useTranslations('Page');

  const workExperiences = [
    {
      title: 'Hội Dòng Anh Em Đức Maria',
      roles: ['Leader', 'UX/UI', 'Frontend', 'Backend'],
      period: 'Aug 2024 – Oct 2024',
      description: t('Experience.p1'),
      tech: ['React', 'Next.js', 'NestJS', 'Docker'],
    },
    {
      title: 'Hust4l Blog (Agency Project)',
      roles: ['Fullstack Developer', 'UI/UX Designer'],
      period: 'Oct 2024 - Dec 2024',
      description: t('Experience.p2'),
      tech: [
        'Next.js',
        'TailwindCSS',
        'TypeScript',
        'NestJS',
        'MongoDb',
        'Docker',
        'UI/UX Design',
      ],
    },
    {
      title: 'Unien Company Website',
      roles: ['Leader', 'UX/UI', 'Frontend'],
      period: 'Jan 2025 - Feb 2025',
      description: t('Experience.p3'),
      tech: ['React', 'TailwindCSS', 'UI/UX Design'],
    },
    {
      title: 'VIA Exhibition Website',
      roles: ['Leader', 'UX/UI', 'Frontend'],
      period: 'Mar 2025 - May 2025',
      description: t('Experience.p5'),
      tech: ['React', 'TailwindCSS', 'UI/UX Design'],
    },
    {
      title: 'Vietstrix (Freelance Project)',
      roles: ['Founder', 'Leader', 'Fullstack Developer', 'UI/UX Designer'],
      period: 'Jub 2025 – Aug 2025',
      description: t('Experience.p4'),
      tech: ['React', 'Next.js', 'NestJS', 'MongoDB', 'Cloud Deployment'],
    },
    {
      title: 'Atom Report App (Freelance Project)',
      roles: ['Fullstack Developer', 'UI/UX Designer'],
      period: 'Oct 2025 – Jan 2026',
      description: t('Experience.p6'),
      tech: [
        'React',
        'Vite',
        'NestJS',
        'Go',
        'Microservice',
        'MongoDB',
        'Nginx',
      ],
    },

    {
      title: 'Vss App (Solo Project)',
      roles: ['Fullstack Developer', 'UI/UX Designer'],
      period: 'Jan 2026 – *** 2026',
      description: t('Experience.p7'),
      tech: [
        'React',
        'Vite',
        'NestJS',
        'Go',
        'Microservice',
        'MongoDB',
        'Nginx',
        'Rust',
        'Ruby on rails',
        'Micro Frontned',
        'PostgreSql',
        'Minio',
      ],
    },
  ];

  return (
    <section className="bg-main min-h-screen text-white py-16 px-6">
      {/* Section header */}

      <div className="border-b border-gray-400 mt-4" />

      <Container className="max-w-6xl mx-auto grid grid-cols-12 gap-8 min-h-screen">
        {/* Left side */}
        <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
          <h2 className="text-4xl font-bold text-white uppercase mt-4 mb-4 flex items-center gap-2 leading-tight">
            <ArrowUpRight size={40} strokeWidth={1.5} />{' '}
            {t('Experience.title1')} <br /> {t('Experience.title2')}
          </h2>
        </div>

        {/* Right side */}
        <motion.div
          className="space-y-10 col-span-12 lg:col-span-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          {workExperiences.map((item, index) => (
            <WorkItem key={index} item={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
