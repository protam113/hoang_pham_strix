'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const itemVariantsRight = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

import Image from 'next/image';
import { Container } from './layout/container';

export function Introduce() {
  const t = useTranslations('Page');

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gray-900">
        {' '}
        {/* Thêm background color */}
        <Image
          src="/imgs/bgHome.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onLoadingComplete={() => {}}
        />
      </div>

      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full min-h-[500px]">
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-2 sm:mt-[120px] mt-2">
              <div className="text-xs sm:text-sm text-muted-foreground bg-white/90 backdrop-blur-sm px-2 py-1 rounded font-mono tracking-wider inline-block">
                PORTFOLIO / 2025
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-400 tracking-tight">
                Pham
                <br />
                <span className="text-white">Hoang</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-md">
              <motion.div
                className="flex flex-col gap-4"
                variants={itemVariantsRight}
              >
                <p className="text-lg text-white leading-relaxed">
                  {t('Hero.title')}
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Available for work
                </div>
                <div>Vietnamese</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">CURRENTLY</div>
              <div className="space-y-2">
                <div className="text-white">Fullstack Developer</div>
                <div className="text-white">@ _mh.len_</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">FOCUS</div>
              <div className="flex flex-wrap gap-2">
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'JavaScript (ES6+)',
                  'TailwindCSS',
                  'UI/UX (Figma)',
                  'Node.js',
                  'NestJS',
                  'Express',
                  'MongoDB',
                  'PostgreSQL',
                  'MySQL',
                  'MariaDB',
                  'Redis',
                  'Docker',
                  'Git / GitHub',
                  'CI/CD',
                  'Cloud Deployment',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border text-white rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
