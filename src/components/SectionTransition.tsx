'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export default function SectionTransition({
  children,
  id,
  className = '',
  delay = 0,
}: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
