'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import InteractivePortrait from './hero/interactive-portrait';
import SignatureMarqueeSection from './hero/signature-marquee-section';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Phase 1: Shrink Portrait (0% -> 40%)
  // Maps scroll 0-0.4 to scale 1-0.45
  const scale = useTransform(smoothProgress, [0, 0.4], [1, 0.45]);

  // Phase 2: Text Parallax (0% -> 80%)
  // Text moves slightly to create depth
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  // Phase 3: Exit (80% -> 100%)
  // Everything slides up to reveal next section
  const exitY = useTransform(smoothProgress, [0.85, 1], ['0%', '-100%']);
  const exitOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-main">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        {/* Background Text Layer */}
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          style={{
            y: exitY,
            opacity: exitOpacity,
          }}
        >
          <motion.div
            className="w-full h-full flex items-center justify-center opacity-0"
            style={{ opacity: textOpacity }}
          >
            <SignatureMarqueeSection />
          </motion.div>
        </motion.div>

        {/* Foreground Portrait Layer */}
        <motion.div
          className="relative z-10 w-full h-full flex items-center justify-center"
          style={{
            scale: scale,
            y: exitY,
            opacity: exitOpacity,
          }}
        >
          {<InteractivePortrait />}
        </motion.div>
      </div>
    </section>
  );
}
