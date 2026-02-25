'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  Bell,
  Cloud,
  Heart,
  Menu,
  MousePointer,
  Search,
  Settings,
  Star,
  Sun,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Container } from './layout/container';
import SectionHeader from './SectionHeader';
import AnimatedFeatures from './WhatWeDo';

export default function AnimationComponents() {
  return (
    <Container>
      <div className="mb-4">
        <SectionHeader title="What i can do" />
        <p className="text-lg font-semibold">
          Services from A to Z helping you to grow from 0 to N
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <AnimatedFeatures />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
          <PitchDeckAnimation />
          <SocialMediaAnimation />
        </div>

        <div className="w-full max-w-7xl">
          <EngagingAnimation />
        </div>
      </div>
    </Container>
  );
}

// 1. Winning Pitch Decks (Sliding Presentation Effect)
export function PitchDeckAnimation() {
  const slides = [
    {
      id: 1,
      content: (
        <div className="w-full h-full bg-gray-800 rounded-lg p-3 flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="w-20 h-3 bg-gray-600 rounded-full"></div>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 bg-gray-700 rounded-md flex items-center justify-center">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="mt-2 flex justify-between">
            <div className="w-16 h-3 bg-gray-600 rounded-full"></div>
            <div className="w-10 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full bg-blue-800 rounded-lg p-3 flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="w-20 h-3 bg-blue-600 rounded-full"></div>
            <Menu className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-blue-700 rounded-md p-2">
            <div className="w-full h-4 bg-blue-600 rounded-full mb-2"></div>
            <div className="w-3/4 h-4 bg-blue-600 rounded-full mb-2"></div>
            <div className="w-1/2 h-4 bg-blue-600 rounded-full"></div>
          </div>
          <div className="mt-2 flex justify-around">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-full h-full bg-purple-800 rounded-lg p-3 flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="w-20 h-3 bg-purple-600 rounded-full"></div>
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-purple-700 rounded-md flex flex-col p-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="w-full h-3 bg-purple-600 rounded-full"></div>
                <div className="w-1/2 h-2 bg-purple-600 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              <div className="flex-1">
                <div className="w-full h-3 bg-purple-600 rounded-full"></div>
                <div className="w-1/2 h-2 bg-purple-600 rounded-full mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="w-full h-full bg-green-800 rounded-lg p-3 flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="w-20 h-3 bg-green-600 rounded-full"></div>
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 bg-green-700 rounded-md flex items-center justify-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <div className="w-24 h-6 bg-green-600 rounded-full"></div>
          </div>
        </div>
      ),
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col gap-4 bg-main  rounded-lg border-2 border-white/30 shadow-lg">
      <div className="relative h-64  overflow-hidden ">
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeSlide}
              initial={{ x: -300, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 80,
                  damping: 20,
                  duration: 0.8,
                },
              }}
              exit={{
                x: 300,
                opacity: 0,
                transition: {
                  type: 'spring',
                  stiffness: 80,
                  damping: 20,
                  duration: 0.5,
                },
              }}
              className="absolute flex items-center justify-center w-40 h-40"
              style={{
                filter: 'drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.3))',
                perspective: '1000px',
              }}
            >
              {slides[activeSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeSlide ? 'bg-white' : 'bg-white/30'
              }`}
              animate={{ scale: index === activeSlide ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl text-white mb-8 font-bold text-center">
        winning pitch decks
      </h2>
    </div>
  );
}

// 2. Social Media Graphics (Synchronized Icon Swap Effect)
function SocialMediaAnimation() {
  const iconSets = [
    [
      { id: 1, icon: <Cloud className="w-8 h-8" /> },
      { id: 2, icon: <Sun className="w-8 h-8" /> },
      { id: 3, icon: <Star className="w-8 h-8" /> },
    ],
    [
      { id: 4, icon: <Heart className="w-8 h-8" /> },
      { id: 5, icon: <Bell className="w-8 h-8" /> },
      { id: 6, icon: <User className="w-8 h-8" /> },
    ],
    [
      { id: 7, icon: <Settings className="w-8 h-8" /> },
      { id: 8, icon: <Search className="w-8 h-8" /> },
      { id: 9, icon: <Menu className="w-8 h-8" /> },
    ],
  ];

  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentSetIndex((prev) => (prev + 1) % iconSets.length);
        setIsChanging(false);
      }, 500); // Half of the interval for the fade out
    }, 3000);

    return () => clearInterval(interval);
  }, [iconSets.length]);

  return (
    <div className="flex flex-col gap-4 border-2 border-white/30 bg-main shadow-lg  rounded-lg ">
      <div className="h-64 flex items-center justify-center  ">
        <div className="flex gap-8">
          {iconSets[currentSetIndex].map((icon, i) => (
            <motion.div
              key={i}
              className="w-20 h-20 bg-[#336887] rounded-full flex items-center justify-center shadow-lg"
              animate={{
                boxShadow: [
                  '0px 0px 0px rgba(255,255,255,0.2)',
                  '0px 0px 20px rgba(255,255,255,0.4)',
                  '0px 0px 0px rgba(255,255,255,0.2)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              }}
            >
              <motion.div
                initial={false}
                animate={{
                  opacity: isChanging ? 0 : 1,
                  scale: isChanging ? 0.8 : 1,
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                    duration: 0.5,
                  },
                }}
              >
                {icon.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl text-white font-bold text-center mb-8">
        social media graphics
      </h2>
    </div>
  );
}

type ElementType = {
  id: number;
  type: string;
  x: string;
  y: string;
  width: number;
  height: number;
  label?: string;
};

function EngagingAnimation() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 100, y: 100 });
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const elements: ElementType[] = [
    {
      id: 1,
      type: 'button',
      x: '20%',
      y: '30%',
      width: 80,
      height: 40,
      label: 'Click',
    },
    { id: 2, type: 'toggle', x: '50%', y: '30%', width: 60, height: 30 },
    { id: 3, type: 'slider', x: '80%', y: '30%', width: 120, height: 8 },
    {
      id: 4,
      type: 'button',
      x: '35%',
      y: '70%',
      width: 80,
      height: 40,
      label: 'Submit',
    },
    { id: 5, type: 'scroll', x: '65%', y: '70%', width: 100, height: 80 },
  ];

  const sequence = [
    { elementId: 1, action: 'click' },
    { elementId: 2, action: 'toggle' },
    { elementId: 3, action: 'drag' },
    { elementId: 4, action: 'click' },
    { elementId: 5, action: 'scroll' },
  ];

  useEffect(() => {
    let currentStep = 0;
    let isRunning = true;

    const runSequence = async () => {
      while (isRunning) {
        const step = sequence[currentStep];
        const element = elements.find((el) => el.id === step.elementId);

        if (!element) {
          currentStep = (currentStep + 1) % sequence.length;
          continue;
        }

        const container = containerRef.current;
        if (!container) {
          return;
        }

        // Move cursor to element with a slight delay
        setCursorPosition({
          x: (parseFloat(element.x) / 100) * container.offsetWidth,
          y: (parseFloat(element.y) / 100) * container.offsetHeight,
        });

        // Wait for cursor to move
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Highlight the element
        setActiveElement(String(element.id));

        // Wait a moment before action
        await new Promise((resolve) => setTimeout(resolve, 400));

        switch (step.action) {
          case 'click':
            controls
              .start({ scale: 0.9 })
              .then(() => controls.start({ scale: 1 }));
            break;
          case 'toggle':
            // Toggle animation handled in the Toggle component
            break;
          case 'drag':
            setCursorPosition((prev) => ({ x: prev.x + 50, y: prev.y }));
            break;
          case 'scroll':
            for (let i = 0; i < 3; i++) {
              setScrollPosition((prev) => prev + 20);
              await new Promise((resolve) => setTimeout(resolve, 300));
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            setScrollPosition(0);
            break;
        }

        // Wait for action to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setActiveElement(null);

        // Move to next step
        currentStep = (currentStep + 1) % sequence.length;
      }
    };

    runSequence();

    return () => {
      isRunning = false;
    };
  }, [controls]);

  return (
    <div className="flex flex-col gap-4 bg-main  rounded-lg border-2 border-white/30 shadow-lg">
      <div ref={containerRef} className="relative h-64  overflow-hidden ">
        {/* Dotted circles background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-2 border-dashed border-white/20 rounded-full absolute" />
          <div className="w-[350px] h-[350px] border-2 border-dashed border-white/20 rounded-full absolute" />
          <div className="w-[200px] h-[200px] border-2 border-dashed border-white/20 rounded-full absolute" />
        </div>

        {/* UI Elements */}
        {elements.map((element) => {
          if (element.type === 'button') {
            return (
              <motion.button
                key={element.id}
                className={`absolute rounded-md flex items-center justify-center text-sm font-medium ${
                  activeElement === String(element.id)
                    ? 'bg-[#336887] text-white'
                    : 'bg-[#336887] text-white/90'
                }`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: 'translate(-50%, -50%)',
                  boxShadow:
                    activeElement === String(element.id)
                      ? '0 0 15px rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
                animate={activeElement === String(element.id) ? controls : {}}
              >
                {element.label}
              </motion.button>
            );
          } else if (element.type === 'toggle') {
            return (
              <motion.div
                key={element.id}
                className="absolute rounded-full bg-[#336887] flex items-center p-1"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: 'translate(-50%, -50%)',
                  boxShadow:
                    activeElement === String(element.id)
                      ? '0 0 15px rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
              >
                <motion.div
                  className="w-6 h-6 bg-white rounded-full"
                  animate={{
                    x:
                      activeElement === String(element.id)
                        ? element.width - 30
                        : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.div>
            );
          } else if (element.type === 'slider') {
            return (
              <motion.div
                key={element.id}
                className="absolute rounded-full bg-[#336887]"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: 'translate(-50%, -50%)',
                  boxShadow:
                    activeElement === String(element.id)
                      ? '0 0 15px rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
              >
                <motion.div
                  className="absolute w-4 h-4 bg-white rounded-full top-1/2 -translate-y-1/2"
                  style={{
                    left: activeElement === String(element.id) ? '70%' : '30%',
                  }}
                  animate={{
                    left: activeElement === String(element.id) ? '70%' : '30%',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.div>
            );
          } else if (element.type === 'scroll') {
            return (
              <motion.div
                key={element.id}
                className="absolute rounded-md bg-[#336887] overflow-hidden"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: 'translate(-50%, -50%)',
                  boxShadow:
                    activeElement === String(element.id)
                      ? '0 0 15px rgba(255, 255, 255, 0.3)'
                      : 'none',
                }}
              >
                <motion.div
                  className="w-full h-[200px] flex flex-col gap-2 p-2"
                  animate={{
                    y: -scrollPosition,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                  <div className="w-full h-4 bg-white/20 rounded-full"></div>
                </motion.div>
              </motion.div>
            );
          }
          return null;
        })}

        {/* Cursor */}
        <motion.div
          className="absolute w-4 h-4 pointer-events-none z-10"
          animate={{
            x: cursorPosition.x - 8,
            y: cursorPosition.y - 8,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
        >
          <MousePointer className="text-white" />
        </motion.div>

        {/* Horizontal bars */}
        <div className="absolute top-[20%] left-0 right-0 h-1 bg-white/20" />
        <div className="absolute bottom-[20%] left-0 right-0 h-1 bg-white/20" />
      </div>
      <h2 className="text-2xl text-white mb-8 font-bold text-center">
        engaging animations
      </h2>
    </div>
  );
}

function Home({ className }: { className: any }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
