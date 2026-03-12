'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { InteractiveClean } from './design/interactive-clean';

export default function Slogan() {
  const t = useTranslations('Page');

  return (
    <section className="relative bg-main px-6 md:px-12 overflow-hidden pb-5">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen">
          <div className="flex flex-col justify-center items-start lg:items-end lg:pr-12 order-2 lg:order-1">
            <div className="relative">
              {/* Large decorative quote */}
              <div
                className="absolute -left-16 -top-20 lg:-left-24 lg:-top-32 text-white/80 opacity-30 text-[200px] lg:text-[280px] leading-none pointer-events-none select-none simteste"
                style={{ fontFamily: 'var(--font-alex-brush), cursive' }}
              >
                &ldquo;
              </div>

              {/* Main quote with improved spacing and hierarchy */}
              <blockquote className="relative z-10 max-w-xl text-white">
                <p className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-lorenzo-text-light leading-[1.1] tracking-tight mb-8">
                  {t('Slogan')}
                </p>
              </blockquote>

              {/* Author attribution */}
              <div className="mt-4">
                <p className="text-base font-medium font-mono md:text-lg text-accent">
                  - Hoang Pham
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-4/5 md:aspect-square max-w-lg mx-auto lg:mx-0 order-1 lg:order-2"
            style={{ touchAction: 'pan-y' }}
          >
            <div className="hidden md:block absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-3xl z-20" />
            <div className="hidden md:block absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-3xl z-20" />
            <div className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-white rounded-bl-3xl z-20" />
            <div className="hidden md:block absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-3xl z-20" />
            <InteractiveClean />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
