'use client';

import { motion } from 'framer-motion';

export default function TextMarquee() {
  return (
    <div className="relative bg-main w-full overflow-hidden py-16">
      <div className="absolute inset-0 from-background via-transparent to-background z-10" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
          duration: 20,
        }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: '3px rgb(156 163 175)', // tailwind gray-400
              }}
            >
              VietStrix
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
