'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Container } from './layout/container';

export const WorkEx = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.work-item');
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
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
        <div className="space-y-10 col-span-12 lg:col-span-8">
          {workExperiences.map((item, index) => (
            <div
              key={index}
              className="work-item opacity-0 translate-y-10 transition-all duration-700"
            >
              <h3 className="text-2xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{item.period}</p>
              <p className="text-gray-300 mb-3">{item.description}</p>

              {/* Roles */}
              {item.roles && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.roles.map((role, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-white text-primary rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech */}
              <div className="flex flex-wrap gap-2">
                {item.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/10 text-white rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Separator */}
              {index < workExperiences.length - 1 && (
                <div className="border-b border-gray-700 mt-6" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
