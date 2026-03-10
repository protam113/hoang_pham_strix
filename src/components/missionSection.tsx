'use client';

import { useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function MissionSection() {
  const t = useTranslations('Page');

  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [1.2, 1, 0.2]
  );
  const imageY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -200]);
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6],
    [0, 1, 1, 0]
  );

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setSignatureDrawn(true), 800);
    }
  }, [isInView]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrolled = -rect.top;
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTextTransform = () => {
    if (scrollProgress < 0.2) {
      const progress = scrollProgress / 0.2;
      return {
        opacity: progress,
        transform: `translateX(${(1 - progress) * -50}px)`,
      };
    }
    return {
      opacity: 1,
      transform: 'translateX(0px)',
    };
  };

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-screen bg-white text-main py-24 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/*
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 border-2 border-white/20 rounded-full px-6 py-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-lorenzo-accent">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">TEAM LORENZO SINCE 2020</span>
          </div>
        </div>
        */}

        <div className="relative h-32 flex items-center justify-center mt-16">
          <img
            src="/ava.jpeg"
            className="h-full w-auto max-h-[60px] object-contain"
          />
        </div>

        <div className="text-center">
          <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold uppercase tracking-tight text-balance leading-[1.1] xl:text-2xl">
            &quot;{t('Introduce.content1')}&quot;
          </h2>
          <h2 className="text-lg mt-4 md:text-xl lg:text-2xl font-extrabold uppercase tracking-tight text-balance leading-[1.1] xl:text-2xl">
            &quot;
            {t('Introduce.content2')}&quot;
          </h2>
        </div>
      </div>
    </section>
  );
}
