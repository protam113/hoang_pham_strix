'use client';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      className="bg-main border-2 border-white/30 shadow-lg rounded-lg p-8 flex flex-col items-center justify-center relative overflow-hidden h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Vertical lines animation with varying properties */}
      <div className="absolute inset-0 flex justify-around">
        {[...Array(12)].map((_, i) => {
          // Create varying properties for each line
          const speed = 0.8 + Math.random() * 1.2; // Speed between 0.8 and 2
          const opacity = 0.1 + Math.random() * 0.3; // Opacity between 0.1 and 0.4
          const width = Math.random() < 0.3 ? 2 : 1; // Occasionally thicker lines
          const height = 30 + Math.random() * 70; // Height between 30% and 100%
          const delay = i * 0.1 * Math.random(); // Staggered delays

          return (
            <motion.div
              key={i}
              className="absolute bg-white"
              style={{
                width: `${width}px`,
                height: `${height}%`,
                left: `${i * 8 + Math.random() * 5}%`,
                opacity: opacity,
              }}
              initial={{ y: '-100%' }}
              animate={{ y: '200%' }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: speed,
                delay: delay,
                ease: 'linear',
              }}
            />
          );
        })}
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
  return (
    <motion.div
      className="bg-main  border-2 border-white/30 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Background diamonds */}
      {[...Array(8)].map((_, i) => {
        const size = 8 + Math.random() * 16;
        return (
          <motion.div
            key={i}
            className="absolute border border-white/20 rotate-45"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: ['45deg', '225deg'],
              opacity: [0, 0.3, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        );
      })}

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
          <span className="text-[#336887] text-3xl font-bold">Aa</span>
        </div>

        {/* Sparkles with varying properties */}
        {[...Array(20)].map((_, i) => {
          const size = 2 + Math.random() * 6;
          const distance = 40 + Math.random() * 40;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          const duration = 0.6 + Math.random() * 1.5;
          const delay = Math.random() * 3;

          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: '50%',
                top: '50%',
                filter: 'blur(0.5px)',
              }}
              initial={{ x, y, opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: x + (Math.random() * 10 - 5),
                y: y + (Math.random() * 10 - 5),
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                repeatDelay: Math.random() * 2,
              }}
            />
          );
        })}
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
