'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Slogan() {
  const t = useTranslations('Page');

  const headingText = t('About.title') === 'Về Tôi' ? 'Châm ngôn' : 'Slogan';
  const authorRole =
    t('About.title') === 'Về Tôi'
      ? 'Lập trình viên Fullstack'
      : 'Fullstack Developer';

  return (
    <section className="relative bg-white text-black py-20 sm:py-32 flex items-center justify-center overflow-hidden w-full border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          {/* Left Column: Heading and Portrait */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-12 flex flex-col justify-start">
            {/* Index & Title */}
            <div className="space-y-2">
              <span className="text-sm font-mono tracking-widest text-black/50 block">
                04
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none uppercase">
                {headingText}
              </h2>
            </div>

            {/* Portrait Image */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl border border-black/5">
              <Image
                src="/ava.jpeg"
                alt="Hoang Pham"
                fill
                priority
                className="object-cover hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
          </div>

          {/* Right Column: Quote and Author Info */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full pt-8 lg:pt-32 lg:pl-12">
            {/* Large Quotes */}
            <span className="text-6xl sm:text-7xl font-serif text-black/25 leading-none select-none mb-6 block">
              &ldquo;
            </span>

            {/* Quote block */}
            <blockquote className="space-y-8 max-w-2xl">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-800 leading-snug tracking-tight">
                {t('Slogan')}
              </p>

              <div className="border-t border-black/10 pt-6">
                <cite className="not-italic text-lg font-bold text-black block">
                  Pham Minh Hoang
                </cite>
                <span className="text-sm text-neutral-500 font-semibold tracking-wider uppercase">
                  {authorRole}
                </span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
