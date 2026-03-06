'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';
import SectionHeader from './SectionHeader';

// Case study data - static data that doesn't change with locale
const caseStudies = [
  {
    id: 1,
    client: 'Gigs Apps',
    year: 'Python',
    titleKey: 's1.a',
    descriptionKey: 's1.q',
    imageUrl: '/gif/app_demo.gif',
    url: 'https://github.com/protam113/gigs_app',
  },
  {
    id: 2,
    client: 'Tax Research',
    year: 'Python',
    titleKey: 's2.a',
    descriptionKey: 's2.q',
    imageUrl: '/gif/060326_1.gif',
    url: 'https://github.com/protam113/tax-reseach',
  },
];

export default function AppSections() {
  const t = useTranslations('Page.Apps');

  return (
    <section className="py-4 px-4 md:px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionHeader title="My Apps" design="" />
        </div>

        <div className="relative">
          {/* Left column */}
          <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:pr-6 space-y-16">
            {caseStudies
              .filter((_, i) => i % 2 === 0)
              .map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={index * 2}
                  t={t}
                />
              ))}
          </div>

          {/* Right column - starts lower */}
          <div className="md:w-1/2 md:absolute md:right-0 md:top-[10%] md:pl-6 space-y-16">
            {caseStudies
              .filter((_, i) => i % 2 === 1)
              .map((study, index) => (
                <CaseStudyCard
                  key={study.id}
                  study={study}
                  index={index * 2 + 1}
                  t={t}
                />
              ))}
          </div>
          <div className="md:h-[825px]"></div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, index, t }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Add state for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Get translated title and description
  const title = t(study.titleKey);
  const description = t(study.descriptionKey);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    // Get image dimensions and position
    const rect = imageRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-2 md:mb-0 cursor-pointer"
      onClick={() => study.url && window.open(study.url, '_blank')}
    >
      <div
        ref={imageRef}
        className="overflow-hidden rounded-lg group relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="aspect-4/3 relative">
          <Image
            src={study.imageUrl || '/placeholder.svg'}
            alt={title}
            width={800}
            height={600}
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Read more text that follows mouse */}
          {isHovering && (
            <motion.div
              className="absolute flex items-center justify-center bg-lime-500 bg-opacity-60 text-black px-4 py-2 rounded-full text-sm font-medium z-10 pointer-events-none"
              style={{
                x: mousePosition.x - 50, // Center the text horizontally
                y: mousePosition.y - 15, // Center the text vertically
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Read more
            </motion.div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/30 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-medium">{study.client}</p>
          <p className="text-gray-500">{study.year}</p>
        </div>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>

        <div className="mb-4">
          <div className="relative pl-6 italic text-gray-600">
            <span className="absolute left-0 top-0 text-3xl text-gray-300">
              "
            </span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
