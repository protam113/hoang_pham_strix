'use client';

import { Button } from '@/components/ui/button';
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Background transition: Dark Green -> Dark Green -> White
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9],
    ['#013162', '#6fc9ff', '#ffffff']
  );

  // Y Movement: Move grid up to reveal all images
  // Starts at 0vh and moves up to -150vh to show bottom images
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-60vh']);

  const column1 = projects.filter((_, i) => i % 3 === 0);
  const column2 = projects.filter((_, i) => i % 3 === 1);
  const column3 = projects.filter((_, i) => i % 3 === 2);

  return (
    <section
      ref={sectionRef}
      id="masonry-gallery"
      className="relative"
      style={{
        height: '200vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-xl uppercase tracking-wider text-white">
          ({t('Featured.title')})
        </h2>
      </motion.div>
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor }}
      >
        <motion.div
          style={{ y }}
          className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 py-20"
        >
          <div className="flex flex-col md:flex-row gap-8 w-full">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 w-full md:w-1/3">
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
            <div className="flex flex-col gap-8 w-full md:w-1/3">
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
            <div className="flex flex-col gap-8 w-full md:w-1/3">
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 bg-gray-900/20 border-2 border-transparent w-full ${project.aspect || 'aspect-[4/3]'} hover:scale-[1.02] hover:shadow-3xl`}
    >
      <Image
        src={project.image || '/imgs/bgHome.webp'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div>
          <p className="text-sm text-gray-300">{project.category}</p>
          <h3 className="text-xl text-gray-200 font-bold mt-1">
            {project.title}
          </h3>
        </div>

        {/* Hiện button ngay khi hover card */}
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a href={project.href} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              variant="outline"
              className="w-full flex justify-center items-center gap-2"
            >
              View Project <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
