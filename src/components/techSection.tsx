'use client';

import { Tags } from '@/types/data/project.data';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Layers, Shield, Wind, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface TechStat {
  label: string;
  value: string;
}

interface Hotspot {
  id: number;
  x: number;
  y: number;
  label: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'devops';
  stats: TechStat[];
  technologies: readonly string[];
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    x: 50,
    y: 10,
    label: 'FRONT-END',
    description:
      'Modern frontend technologies for building responsive and interactive user interfaces with optimal performance.',
    category: 'frontend',
    technologies: Tags['Front-end'],
    stats: [
      { label: 'Framework', value: 'React/Next.js' },
      { label: 'Styling', value: 'TailwindCSS' },
      { label: 'State', value: 'Zustand/Redux' },
    ],
  },
  {
    id: 2,
    x: 85,
    y: 50,
    label: 'DATABASE',
    description:
      'Robust database solutions for data persistence, caching, and object storage with high availability.',
    category: 'database',
    technologies: Tags.Database,
    stats: [
      { label: 'NoSQL', value: 'MongoDB' },
      { label: 'SQL', value: 'PostgreSQL' },
      { label: 'Cache', value: 'Redis' },
    ],
  },
  {
    id: 3,
    x: 50,
    y: 90,
    label: 'BACK-END',
    description:
      'Scalable backend services with modern frameworks, authentication, and microservices architecture.',
    category: 'backend',
    technologies: Tags['Back-end'],
    stats: [
      { label: 'Runtime', value: 'Node.js/Go' },
      { label: 'Framework', value: 'NestJS' },
      { label: 'Auth', value: 'JWT/OAuth2' },
    ],
  },
  {
    id: 4,
    x: 15,
    y: 50,
    label: 'DEVOPS',
    description:
      'Continuous integration and deployment pipeline with containerization and version control.',
    category: 'devops',
    technologies: Tags['CI-CD'],
    stats: [
      { label: 'Container', value: 'Docker' },
      { label: 'CI/CD', value: 'GitHub/GitLab' },
      { label: 'Deploy', value: 'Automated' },
    ],
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'frontend':
      return <Layers className="w-4 h-4 text-lorenzo-accent" />;
    case 'backend':
      return <Shield className="w-4 h-4 text-lorenzo-accent" />;
    case 'database':
      return <Activity className="w-4 h-4 text-lorenzo-accent" />;
    case 'devops':
      return <Zap className="w-4 h-4 text-lorenzo-accent" />;
    default:
      return <Wind className="w-4 h-4 text-lorenzo-accent" />;
  }
};

interface HotspotPointProps {
  spot: Hotspot;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function HotspotPoint({ spot, isActive, onHover, onLeave }: HotspotPointProps) {
  return (
    <div
      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
    >
      <div className="relative flex items-center justify-center w-12 h-12">
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeOut',
          }}
          className="absolute inset-0 bg-lorenzo-accent/40 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeOut',
            delay: 0.2,
          }}
          className="absolute inset-0 bg-blue-500/30 rounded-full"
        />
        <div className="relative w-3 h-3 bg-main-700 rounded-full shadow-[0_0_15px_rgba(163,230,53,1)] ring-2 ring-main/70" />
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 w-[320px] md:w-[360px]"
          >
            <div className="absolute -top-4 left-1/2 w-px h-4 bg-linear-to-b from-transparent to-main/50" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-main rounded-full shadow-[0_0_10px_#a3e635]" />

            <div className="relative overflow-hidden rounded-lg bg-main/80 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-lorenzo-accent/50 to-transparent opacity-50" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-lorenzo-accent/5 blur-[50px]" />

              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2 text-white">
                  {getCategoryIcon(spot.category)}
                  <span className="text-xs font-bold tracking-widest  uppercase opacity-80">
                    {spot.category}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/60">
                  SYS.ID.{spot.id.toString().padStart(3, '0')}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
                  {spot.label}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4 border-l-2 border-lorenzo-accent/30 pl-3">
                  {spot.description}
                </p>

                <div className="mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-white/70 mb-2">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {spot.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-main/10 text-white border border-lorenzo-accent/20 rounded hover:bg-lorenzo-accent/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {spot.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 rounded px-2 py-2 border border-white/5 hover:border-lorenzo-accent/30 transition-colors group"
                    >
                      <div className="text-[9px] uppercase tracking-wider text-white/80 mb-1 group-hover:text-white/70 transition-colors">
                        {stat.label}
                      </div>
                      <div className="text-xs font-medium text-white font-mono">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-2 right-2 flex gap-0.5 opacity-30">
                <div className="w-1 h-1 bg-lorenzo-accent rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TechSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section
      id="tech-specs"
      className="relative min-h-screen bg-white px-6 md:px-12 overflow-visible py-0 mb-0 pb-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-main leading-tight">
            <span className="block font-sans leading-[0.85] text-lorenzo-dark">
              TECH
            </span>
            <span className="block text-lorenzo-dark text-9xl">STACKS</span>
          </h2>
          <p className="text-base mt-6 max-w-2xl text-lorenzo-dark md:text-base">
            Explore the technical specifications of my tech stack. Hover over
            the points to discover more.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-4/3 md:aspect-3/2">
            <Image
              src="/imgs/tech.jpg"
              alt="Tech Stacks"
              fill
              className="object-contain"
              priority
            />

            {hotspots.map((spot) => (
              <HotspotPoint
                key={spot.id}
                spot={spot}
                isActive={activeHotspot === spot.id}
                onHover={() => setActiveHotspot(spot.id)}
                onLeave={() => setActiveHotspot(null)}
              />
            ))}
          </div>

          <div className="md:hidden text-center mt-8 text-gray-500 text-sm">
            Tap on the pulsating points to see the information
          </div>
        </div>
      </div>
    </section>
  );
}
