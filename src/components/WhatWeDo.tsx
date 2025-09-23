'use client';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

export default function AnimatedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
      <FastFriendlyApps />
      <div className="grid grid-rows-2 gap-6">
        <CatchyIdentity />
        <ResponsiveWebsites />
      </div>
    </div>
  );
}

function FastFriendlyApps() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lines = useMemo(() => {
    if (!isClient) {
      // Return consistent server-side values
      return [...Array(12)].map((_, i) => ({
        speed: 1,
        opacity: 0.2,
        width: i % 3 === 0 ? 2 : 1,
        height: 50,
        delay: i * 0.1,
        left: i * 8,
      }));
    }

    // Client-side random values
    return [...Array(12)].map((_, i) => ({
      speed: 0.8 + Math.random() * 1.2,
      opacity: 0.1 + Math.random() * 0.3,
      width: Math.random() < 0.3 ? 2 : 1,
      height: 30 + Math.random() * 70,
      delay: i * 0.1 * Math.random(),
      left: i * 8 + Math.random() * 5,
    }));
  }, [isClient]);

  return (
    <motion.div
      className="bg-main border-2 border-white/30 shadow-lg rounded-lg p-8 flex flex-col items-center justify-center relative overflow-hidden h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Vertical lines animation with varying properties */}
      <div className="absolute inset-0 flex justify-around">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="absolute bg-white"
            style={{
              width: `${line.width}px`,
              height: `${line.height}%`,
              left: `${line.left}%`,
              opacity: line.opacity,
            }}
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: line.speed,
              delay: line.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Center container for phone */}
      <div className="flex-1 flex items-center justify-center w-full">
        {/* Smartphone frame with floating effect */}
        <motion.div
          className="relative z-10"
          animate={{
            y: [0, -12, -8, -12, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3,
            ease: 'easeInOut',
          }}
        >
          {/* Shadow that shifts with movement */}
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-md"
            animate={{
              width: ['60%', '50%', '60%'],
              opacity: [0.2, 0.15, 0.2],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: 'easeInOut',
            }}
          />

          {/* Phone frame */}
          <div className="w-40 h-64 bg-transparent border-2 border-white rounded-3xl relative flex items-center justify-center">
            <div className="w-16 h-4 bg-white rounded-full absolute top-2"></div>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
              <div className="w-8 h-4 bg-white rounded-full border-2 border-white"></div>
              <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-white text-2xl font-bold mt-4">
        fast and friendly apps
      </h2>
    </motion.div>
  );
}
function CatchyIdentity() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const diamonds = useMemo(() => {
    if (!isClient) {
      // Return consistent server-side values
      return [...Array(8)].map((_, i) => ({
        size: 12,
        top: (i * 12) % 100,
        left: (i * 15) % 100,
        duration: 4 + i,
        delay: i * 0.5,
      }));
    }

    // Client-side random values
    return [...Array(8)].map((_, i) => ({
      size: 8 + Math.random() * 16,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 4 + i,
      delay: i * 0.5,
    }));
  }, [isClient]);

  const sparkles = useMemo(() => {
    if (!isClient) {
      // Return consistent server-side values
      return [...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        return {
          size: 4,
          distance: 50,
          x: Math.cos(angle) * 50,
          y: Math.sin(angle) * 50,
          duration: 1,
          delay: i * 0.1,
          xOffset: 0,
          yOffset: 0,
          repeatDelay: 1,
        };
      });
    }

    // Client-side random values
    return [...Array(20)].map((_, i) => {
      const size = 2 + Math.random() * 6;
      const distance = 40 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const duration = 0.6 + Math.random() * 1.5;
      const delay = Math.random() * 3;
      const xOffset = Math.random() * 10 - 5;
      const yOffset = Math.random() * 10 - 5;
      const repeatDelay = Math.random() * 2;

      return {
        size,
        distance,
        x,
        y,
        duration,
        delay,
        xOffset,
        yOffset,
        repeatDelay,
      };
    });
  }, [isClient]);

  return (
    <motion.div
      className="bg-main border-2 border-white/30 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Background diamonds */}
      {diamonds.map((diamond, i) => (
        <motion.div
          key={i}
          className="absolute border border-white/20 rotate-45"
          style={{
            width: `${diamond.size}px`,
            height: `${diamond.size}px`,
            top: `${diamond.top}%`,
            left: `${diamond.left}%`,
          }}
          animate={{
            rotate: ['45deg', '225deg'],
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: diamond.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: diamond.delay,
          }}
        />
      ))}

      {/* Icon with pulsing glow effect */}
      <motion.div
        className="relative mb-8 z-10"
        animate={{
          boxShadow: [
            '0 0 0 rgba(255,255,255,0.2)',
            '0 0 20px rgba(255,255,255,0.4)',
            '0 0 0 rgba(255,255,255,0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        <div className="w-28 h-28 bg-white/10 border-2 border-white rounded-lg flex items-center justify-center">
          <span className="text-white text-3xl font-bold">Aa</span>
        </div>

        {/* Sparkles with varying properties */}
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              left: '50%',
              top: '50%',
              filter: 'blur(0.5px)',
            }}
            initial={{ x: sparkle.x, y: sparkle.y, opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: sparkle.x + (isClient ? Math.random() * 10 - 5 : 0),
              y: sparkle.y + (isClient ? Math.random() * 10 - 5 : 0),
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: sparkle.delay,
              repeatDelay: isClient ? Math.random() * 2 : 1,
            }}
          />
        ))}
      </motion.div>

      <h2 className="text-white text-2xl font-bold mt-auto">catchy identity</h2>
    </motion.div>
  );
}

function ResponsiveWebsites() {
  // Define variants for each device frame
  const desktopVariants = {
    stacked: { width: '60%', height: '60%', x: 0, y: 0, zIndex: 1 },
    expanded: { width: '90%', height: '70%', x: 0, y: 0, zIndex: 1 },
    highlighted: { boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' },
    final: { boxShadow: '0 0 0 1px rgba(255,255,255,0)' },
  };

  const tabletVariants = {
    stacked: { width: '60%', height: '60%', x: 0, y: 0, zIndex: 2 },
    expanded: { width: '60%', height: '60%', x: 30, y: 10, zIndex: 2 },
    highlighted: { boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' },
    final: { boxShadow: '0 0 0 1px rgba(255,255,255,0)' },
  };

  const mobileVariants = {
    stacked: { width: '60%', height: '60%', x: 0, y: 0, zIndex: 3 },
    expanded: { width: '30%', height: '50%', x: 60, y: 20, zIndex: 3 },
    highlighted: { boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' },
    final: { boxShadow: '0 0 0 1px rgba(255,255,255,0)' },
  };

  return (
    <motion.div
      className="bg-main border-2 border-white/30 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="relative mb-8 flex items-center justify-center h-48 w-full">
        {/* Desktop - largest frame */}
        <motion.div
          className="absolute border-2 border-white rounded-md bg-transparent"
          initial="stacked"
          animate={['stacked', 'expanded', 'highlighted', 'final']}
          variants={desktopVariants}
          transition={{
            times: [0, 0.5, 0.6, 1],
            duration: 3,
            ease: 'easeOut',
          }}
        >
          <div className="h-3 w-full bg-transparent border-b-2 border-white flex items-center">
            <div className="flex gap-1 ml-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-3/4 h-1/2 border border-white/30 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Tablet - medium frame */}
        <motion.div
          className="absolute border-2 border-white rounded-md bg-transparent"
          initial="stacked"
          animate={['stacked', 'expanded', 'highlighted', 'final']}
          variants={tabletVariants}
          transition={{
            times: [0, 0.5, 0.65, 1],
            duration: 3,
            ease: 'easeOut',
            delay: 0.1,
          }}
        >
          <div className="h-3 w-full bg-transparent border-b-2 border-white flex items-center">
            <div className="flex gap-1 ml-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-3/4 h-1/2 border border-white/30 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Mobile - smallest frame */}
        <motion.div
          className="absolute border-2 border-white rounded-md bg-transparent"
          initial="stacked"
          animate={['stacked', 'expanded', 'highlighted', 'final']}
          variants={mobileVariants}
          transition={{
            times: [0, 0.5, 0.7, 1],
            duration: 3,
            ease: 'easeOut',
            delay: 0.2,
          }}
        >
          <div className="h-3 w-full bg-transparent border-b-2 border-white flex items-center">
            <div className="flex gap-1 ml-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-3/4 h-1/2 border border-white/30 rounded-sm"></div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-white text-2xl font-bold mt-auto">
        responsive websites
      </h2>
    </motion.div>
  );
}
