'use client';

import { Button } from '@/components/ui/button';
import { useMobile } from '@/contexts/MobileContext';
import { projects } from '@/types/data/project.data';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

export default function MasonryGallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const t = useTranslations('Page');
  const { isMobile } = useMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Background transition: Dark Blue -> Light Blue -> White (delayed)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.7, 0.95],
    ['#013162', '#6fc9ff', '#ffffff']
  );

  // Y Movement: Desktop only
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-80vh']);

  // Mobile: 1 column, Desktop: 3 columns
  const column1 = isMobile ? projects : projects.filter((_, i) => i % 3 === 0);
  const column2 = isMobile ? [] : projects.filter((_, i) => i % 3 === 1);
  const column3 = isMobile ? [] : projects.filter((_, i) => i % 3 === 2);

  // Mobile: Simple static layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="masonry-gallery"
        className="relative z-10 bg-gradient-to-b from-[#013162] via-[#6fc9ff] to-white py-12 px-4"
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-lg uppercase tracking-wider text-white">
            ({t('Featured.title')})
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 w-full max-w-[600px] mx-auto">
          {projects.map((project, index) => (
            <MasonryCard
              key={`mobile-${index}`}
              index={index}
              project={project}
              isInView={isInView}
            />
          ))}
        </div>
      </section>
    );
  }

  // Desktop: Scroll animation layout
  return (
    <section
      ref={sectionRef}
      id="masonry-gallery"
      className="relative z-10"
      style={{
        height: '250vh',
        touchAction: 'pan-y',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-4 md:left-8 z-10"
      >
        <h2 className="text-xl uppercase tracking-wider text-white">
          ({t('Featured.title')})
        </h2>
      </motion.div>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-start justify-center"
        style={{ backgroundColor }}
      >
        <motion.div
          style={{ y }}
          className="relative w-full max-w-[1400px] mx-auto px-8 pt-20 pb-40"
        >
          <div className="flex flex-row gap-8 w-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 w-1/3">
              {column1.map((project, index) => (
                <MasonryCard
                  key={`col1-${index}`}
                  index={index * 3}
                  project={project}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-8 w-1/3">
              {column2.map((project, index) => (
                <MasonryCard
                  key={`col2-${index}`}
                  project={project}
                  isInView={isInView}
                  index={index * 3 + 1}
                />
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-8 w-1/3">
              {column3.map((project, index) => (
                <MasonryCard
                  key={`col3-${index}`}
                  project={project}
                  isInView={isInView}
                  index={index * 3 + 2}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MasonryCard({
  project,
  index,
  isInView,
}: {
  project: any;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true, margin: '-20px', amount: 0.3 }}
      className={`group relative overflow-hidden rounded-lg md:rounded-xl shadow-xl md:shadow-2xl transition-all duration-500 bg-gray-900/20 border-2 border-transparent w-full ${project.aspect || 'aspect-[4/3]'} hover:scale-[1.02] hover:shadow-3xl active:scale-[0.98]`}
    >
      <Image
        src={project.image || '/imgs/bgHome.webp'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={90}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <p className="text-xs md:text-sm text-gray-300">{project.category}</p>
          <h3 className="text-lg md:text-xl text-gray-200 font-bold mt-1">
            {project.title}
          </h3>
        </div>

        {/* Button visible on mobile, hover on desktop */}
        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="w-full flex justify-center items-center gap-2 text-sm"
            >
              View Project <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
