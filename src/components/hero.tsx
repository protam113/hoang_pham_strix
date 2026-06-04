'use client';

import { calculateExperience } from '@/utils/calculateExperience';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { InteractiveClean } from './interactive-clean.custom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const t = useTranslations('Page');
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = calculateExperience(2024, 9); // Started September 2024

  const leftColRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entry animation for the left column content
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.animate-item', { opacity: 0, y: 35 });
      gsap.set(mockupRef.current, { opacity: 0, scale: 0.8, rotateY: -40 });

      // Animate left side
      gsap.to('.animate-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });

      // Animate right side mockup
      gsap.to(mockupRef.current, {
        opacity: 1,
        scale: 1,
        rotateY: -20, // default rotation
        rotateX: 10,
        rotateZ: 5,
        duration: 1.2,
        ease: 'elastic.out(1, 0.75)',
        delay: 0.5,
      });

      // Continuous float animation for mockup, paused when scrolled offscreen
      gsap.to(mockupRef.current, {
        y: '+=12',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'resume pause resume pause',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const card = mockupRef.current;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    // Calculate tilt angles based on cursor position relative to center
    const tiltX = (y / (box.height / 2)) * -15; // max tilt 15deg
    const tiltY = (x / (box.width / 2)) * 15;

    gsap.to(card, {
      rotateX: tiltX + 10, // offset initial 10deg
      rotateY: tiltY - 20, // offset initial -20deg
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!mockupRef.current) return;
    gsap.to(mockupRef.current, {
      rotateX: 10,
      rotateY: -20,
      duration: 0.8,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();

      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    },
    []
  );

  return (
    <section
      id="main"
      className="relative min-h-screen w-full flex items-center justify-center bg-background py-20 sm:py-28 overflow-hidden"
    >
      {/* Background Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-5 pointer-events-none opacity-5">
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="border-r border-black h-full"></div>
        <div className="h-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* Left Content */}
          <div
            ref={leftColRef}
            className="lg:col-span-7 space-y-8 sm:space-y-10 flex flex-col justify-center"
          >
            {/* Avatar & Portfolio Badges */}
            <div className="animate-item flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-black/10 shadow-sm">
                <Image
                  src="/ava.webp"
                  alt="Hoang Pham"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-widest text-black/50 uppercase">
                  Portfolio / {currentYear}
                </div>
                <div className="text-xs font-semibold text-black/80 font-mono">
                  {yearsOfExperience}+ Years Experience
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="animate-item space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-black tracking-tight leading-[1.1] uppercase">
                Pham Minh
                <span className="block uppercase text-main  font-extrabold font-logoFont">
                  Hoang
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-black/60 tracking-wide uppercase">
                Fullstack Developer
              </p>
            </div>

            {/* Bio Description */}
            <div className="animate-item max-w-lg">
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                {t('Hero.title', { years: yearsOfExperience })}
              </p>
            </div>

            {/* Action buttons and Status */}
            <div className="animate-item flex flex-col sm:flex-row sm:items-center gap-6 pt-2">
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="inline-flex items-center gap-3 bg-main hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-full text-sm tracking-wide transition-all group shadow-md w-fit cursor-pointer"
              >
                <span>EXPLORE MY WORK</span>
                <div className="w-5 h-5 bg-white text-black rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowDown size={12} />
                </div>
              </a>

              <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-black/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Available for work</span>
                </div>
                <div className="h-4 w-px bg-black/10"></div>
                <div>Vietnamese 🇻🇳</div>
              </div>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-5 flex items-center justify-center">
            {/* Interactive Mockup Container */}
            <motion.div
              ref={mockupRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative w-56 h-56 md:w-72 md:h-72 lg:w-full lg:h-full lg:aspect-[4/5] max-w-lg mx-auto lg:mx-0 order-2 cursor-grab active:cursor-grabbing"
              style={{
                touchAction: 'pan-y',
                transformStyle: 'preserve-3d',
                perspective: 1000,
              }}
            >
              <InteractiveClean />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
