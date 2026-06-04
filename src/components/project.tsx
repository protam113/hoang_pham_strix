'use client';

import { Button } from '@/components/ui/button';
import { Project, projects } from '@/types/data/project.data';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function MasonryGallerySection() {
  const t = useTranslations('Page');

  // Group projects into pairs: [ [p1, p2], [p3, p4], ... ]
  const projectPairs: [Project, Project?][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    projectPairs.push([projects[i], projects[i + 1]]);
  }

  const isVietnamese = t('About.title') === 'Về Tôi';
  const instructionText = isVietnamese
    ? 'RÊ CHUỘT ĐỂ XEM VIDEO • PREVIEW WORK • '
    : 'HOVER TO PLAY VIDEO • PREVIEW WORK • ';

  return (
    <section className="relative min-h-screen bg-[#ffffff] text-black py-20 sm:py-32 flex flex-col items-center justify-start overflow-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        {/* Title with Rotating Badge */}
        <div className="flex flex-row justify-between items-end gap-6 mb-12 sm:mb-20 w-full">
          <div className="space-y-2">
            <span className="text-sm font-mono tracking-widest text-black/50 block">
              01
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none uppercase">
              {t('Featured.title')}
            </h2>
          </div>

          {/* Rotating Badge Helper */}
          <div className="relative hidden md:flex items-center justify-center pointer-events-none select-none">
            <div className="w-24 h-24 animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text className="text-[7px] font-mono fill-neutral-400 uppercase tracking-[0.16em] font-bold">
                  <textPath href="#circlePath" startOffset="0%">
                    {instructionText}
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Center icon */}
            <div className="absolute w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
              <svg
                className="w-4 h-4 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Rows of 2 Projects */}
        <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 w-full">
          {projectPairs.map((pair, index) => (
            <ProjectRow
              key={index}
              p1={pair[0]}
              p2={pair[1]}
              rowIndex={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  p1,
  p2,
  rowIndex,
}: {
  p1: Project;
  p2?: Project;
  rowIndex: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, amount: 'some' });

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.project-card-animate',
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }, rowRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 w-full"
    >
      <div className="project-card-animate opacity-0">
        <ProjectCard project={p1} index={rowIndex * 2} />
      </div>
      {p2 && (
        <div className="project-card-animate opacity-0">
          <ProjectCard project={p2} index={rowIndex * 2 + 1} />
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovering) {
      video.play().catch((err) => {
        console.log('Video play interrupted:', err);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 20;
    const rotateY = (x - centerX) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale: 1.015,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const formatNumber = (num: number) => {
    return num < 9 ? `0${num + 1}` : `${num + 1}`;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className="group relative w-full aspect-[16/10] overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-lg border border-black/[0.03] bg-[#090a0c] cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={project.image || '/imgs/bgHome.webp'}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 600px"
        quality={90}
        loading="lazy"
      />

      {/* Hover Video Preview */}
      {project.video && (
        <video
          ref={videoRef}
          src={project.video}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 pointer-events-none"
          style={{ opacity: isHovering ? 1 : 0 }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/45" />

      {/* Card Contents */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between select-none z-10">
        {/* Top bar: Category & Number */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              {project.category}
            </span>
            {/* Tags preview */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tag.slice(0, 3).map((t: string) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[9px] font-mono bg-white/10 border border-white/5 text-white/80 rounded-md"
                >
                  {t}
                </span>
              ))}
              {project.tag.length > 3 && (
                <span className="px-2 py-0.5 text-[9px] font-mono bg-white/15 text-white/90 rounded-md">
                  +{project.tag.length - 3}
                </span>
              )}
            </div>
          </div>
          <span className="text-2xl font-black text-white/20 font-mono tracking-tighter">
            {formatNumber(index)}
          </span>
        </div>

        {/* Bottom bar: Title & Action Button */}
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl text-white font-extrabold tracking-tight uppercase leading-none">
            {project.title}
          </h3>

          <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pt-2">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button
                size="sm"
                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-black border-none rounded-full px-6 py-5 font-bold flex justify-center items-center gap-2 text-sm shadow-md"
              >
                <span>VISIT WEBSITE</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
