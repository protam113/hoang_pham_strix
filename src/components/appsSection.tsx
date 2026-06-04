'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState } from 'react';

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
    <section className="relative min-h-screen bg-[#ffffff] text-black py-20 sm:py-32 flex flex-col items-center justify-start overflow-hidden w-full border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        {/* Title */}
        <div className="space-y-2 mb-12 sm:mb-20">
          <span className="text-sm font-mono tracking-widest text-black/50 block">
            05
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none uppercase">
            My Apps
          </h2>
        </div>

        {/* Grid of Apps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 w-full">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, index, t }: any) {
  const imageRef = useRef<HTMLDivElement>(null);

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

  const formatNumber = (num: number) => {
    return num < 9 ? `0${num + 1}` : `${num + 1}`;
  };

  return (
    <div
      className="group relative w-full aspect-[16/11] overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-lg border border-black/[0.03] bg-[#090a0c] cursor-pointer"
      onClick={() => study.url && window.open(study.url, '_blank')}
    >
      {/* Background Image */}
      <Image
        src={study.imageUrl || '/placeholder.svg'}
        alt={title}
        fill
        unoptimized
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 600px"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/95 group-hover:via-black/50" />

      {/* Card Contents */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between select-none text-white">
        {/* Top bar: Client & Tech Tag */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              {study.client}
            </span>
            <div className="mt-2">
              <span className="px-2 py-0.5 text-[9px] font-mono bg-white/10 border border-white/5 text-white/80 rounded-md">
                {study.year}
              </span>
            </div>
          </div>
          <span className="text-2xl font-black text-white/20 font-mono tracking-tighter">
            {formatNumber(index)}
          </span>
        </div>

        {/* Bottom bar: Title, Description & Action Button */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl text-white font-extrabold tracking-tight uppercase leading-none">
            {title}
          </h3>
          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pt-2">
            <button className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-black border-none rounded-full px-6 py-2.5 font-bold flex justify-center items-center gap-2 text-xs shadow-md">
              <span>VIEW REPOSITORY</span>
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
