'use client';

import { Fingerprint, Layout, Palette, Play, Server } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AnimatedFeatures() {
  const t = useTranslations('Page');

  const focusItems = [
    {
      key: 'artDirection',
      icon: <Palette size={20} className="text-white" />,
      bgColor: 'bg-[#0088ff]', // vibrant blue
    },
    {
      key: 'branding',
      icon: <Fingerprint size={20} className="text-white" />,
      bgColor: 'bg-[#65e043]', // green
    },
    {
      key: 'motionGraphics',
      icon: <Play size={20} className="text-white fill-white" />,
      bgColor: 'bg-[#f59e0b]', // orange-yellow
    },
    {
      key: 'webDesign',
      icon: <Layout size={20} className="text-white" />,
      bgColor: 'bg-[#f43f5e]', // red-rose
    },
    {
      key: 'backend',
      icon: <Server size={20} className="text-white" />,
      bgColor: 'bg-[#8b5cf6]', // purple
    },
  ];

  return (
    <section
      className="relative min-h-screen bg-[#ffffff] text-black py-20 sm:py-32 flex items-center justify-center overflow-hidden w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
          {/* Left Title Column */}
          <div className="lg:col-span-5 focus-title-animate space-y-2">
            <span className="text-sm font-mono tracking-widest text-black/50 block">
              03
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none uppercase">
              {t('Focus.title')}
            </h2>
          </div>

          {/* Right List Column */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {focusItems.map((item) => (
              <div
                key={item.key}
                className="focus-item-animate flex items-center gap-4 bg-[#f8f8f9] hover:bg-[#f1f1f3] px-6 py-4 rounded-2xl transition-all duration-300 border border-black/[0.03] hover:shadow-xs group cursor-pointer"
              >
                {/* Colorful square icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${item.bgColor} group-hover:scale-105 transition-transform duration-300`}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span className="text-lg font-bold text-neutral-800 tracking-tight">
                  {t(`Focus.${item.key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
