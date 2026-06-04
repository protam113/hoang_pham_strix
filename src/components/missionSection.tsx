'use client';

import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function MissionSection() {
  const t = useTranslations('Page');
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 'some' });

  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        // Animate Left Column elements (staggered)
        gsap.fromTo(
          '.about-animate',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
        );

        // Count up animation for stats
        const counters = document.querySelectorAll('.count-number');
        counters.forEach((counter) => {
          const target = parseInt(
            counter.getAttribute('data-target') || '0',
            10
          );
          const obj = { val: 0 };
          gsap.fromTo(
            obj,
            { val: 0 },
            {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                counter.textContent = Math.floor(obj.val).toString();
              },
            }
          );
        });

        // Reveal Right Column Image
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, scale: 0.95, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out' }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#ffffff] text-black py-20 sm:py-32 flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12 flex flex-col justify-center">
            {/* Index & Title */}
            <div className="about-animate space-y-2 opacity-0">
              <span className="text-sm font-mono tracking-widest text-black/50 block">
                02
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none uppercase">
                {t('About.heading')}
              </h2>
            </div>

            {/* Description */}
            <div className="about-animate max-w-xl opacity-0">
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-medium">
                {t('About.bio')}
              </p>
            </div>

            {/* Stats Row */}
            <div className="about-animate grid grid-cols-3 gap-6 sm:gap-8 border-t border-b border-black/10 py-8 max-w-lg opacity-0">
              {/* Stat 1 */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-black flex items-baseline">
                  <span className="count-number" data-target="6">
                    0
                  </span>
                  <span className="text-main font-bold">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider leading-snug">
                  {t('About.projectsCount')}
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-black flex items-baseline">
                  <span className="count-number" data-target="2">
                    0
                  </span>
                  <span className="text-main font-bold">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider leading-snug">
                  {t('About.experienceYears')}
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-black flex items-baseline">
                  <span className="count-number" data-target="10">
                    0
                  </span>
                  <span className="text-main font-bold">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-neutral-500 uppercase tracking-wider leading-snug">
                  {t('About.clientsCount')}
                </div>
              </div>
            </div>

            {/* Platforms Card & Links */}
            <div className="about-animate flex items-center gap-6 opacity-0">
              {/* Small graphic card */}
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg border border-white/10 shrink-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-main to-neutral-800 opacity-60"></div>
                <span className="text-white text-xl font-black relative z-10 font-mono tracking-tighter">
                  HP
                </span>
              </div>

              {/* Text Links */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono tracking-widest text-neutral-400 font-bold">
                <a
                  href="https://github.com/protam113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors uppercase"
                >
                  Github
                </a>
                <span>/</span>
                <a
                  href="https://www.linkedin.com/in/hoangpham-strix/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors uppercase"
                >
                  Linkedin
                </a>
                <span>/</span>
                <a
                  href="https://www.facebook.com/vietstrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors uppercase"
                >
                  Facebook
                </a>
                <span>/</span>
                <a
                  href="https://zalo.me/0377783437"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors uppercase"
                >
                  Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div
            ref={rightRef}
            className="lg:col-span-5 flex items-center justify-center w-full opacity-0"
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-black/10">
              <Image
                src="/ava.jpeg"
                alt="Hoang Pham"
                fill
                priority
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
