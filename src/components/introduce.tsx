'use client';

import { useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Container } from './layout/container';

interface TextSegment {
  text: string;
  className?: string;
  isHighlight?: boolean;
}

interface TypewriterTextProps {
  segments: TextSegment[];
  speed?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  segments,
  speed = 50,
  className = 'text-lg sm:text-xl text-gray-300 leading-relaxed',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Flatten all segments into a single array with their styling info
  const allSegments = segments.map((segment) => ({
    text: segment.text,
    className: segment.className || 'text-gray-300',
    isHighlight: segment.isHighlight || false,
  }));

  useEffect(() => {
    if (!isTyping || currentSegmentIndex >= allSegments.length) {
      return;
    }

    const currentSegment = allSegments[currentSegmentIndex];
    const currentText = currentSegment.text;

    if (currentCharIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Move to next segment
      setCurrentSegmentIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }
  }, [currentCharIndex, currentSegmentIndex, allSegments, speed, isTyping]);

  // Build the displayed content with proper styling
  const buildStyledContent = () => {
    let content = [];
    let charCount = 0;

    for (let i = 0; i < allSegments.length; i++) {
      const segment = allSegments[i];
      const segmentLength = segment.text.length;

      if (charCount + segmentLength <= displayedText.length) {
        // This entire segment should be displayed
        content.push(
          <span key={i} className={segment.className}>
            {segment.text}
          </span>
        );
        charCount += segmentLength;
      } else if (charCount < displayedText.length) {
        // This segment is partially displayed
        const partialLength = displayedText.length - charCount;
        content.push(
          <span key={i} className={segment.className}>
            {segment.text.substring(0, partialLength)}
          </span>
        );
        break;
      } else {
        break;
      }
    }

    return content;
  };

  return (
    <p className={className}>
      {buildStyledContent()}
      {isTyping && currentSegmentIndex < allSegments.length && (
        <span className="animate-pulse text-white">|</span>
      )}
    </p>
  );
};

export function Introduce() {
  const t = useTranslations('Page');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const textSegments: TextSegment[] = [
    { text: t('Hero.t1'), className: 'text-gray-300' },
    { text: t('Hero.t2'), className: 'text-gray-100' },
    { text: ' ', className: 'text-gray-300' },
    { text: t('Hero.t3'), className: 'text-gray-300' },
    { text: t('Hero.t4'), className: 'text-gray-100' },
    { text: t('Hero.t5'), className: 'text-gray-300' },
    { text: t('Hero.t6'), className: 'text-gray-100' },
    { text: ' ', className: 'text-gray-300' },
    { text: t('Hero.t7'), className: 'text-gray-300' },
    { text: t('Hero.t8'), className: 'text-gray-100' },
    { text: t('Hero.t9'), className: 'text-gray-300' },
    { text: t('Hero.t10'), className: 'text-gray-100' },
    { text: ',', className: 'text-gray-300' },
    { text: t('Hero.t11'), className: 'text-gray-100' },
    { text: t('Hero.t12'), className: 'text-gray-300' },
    { text: t('Hero.t13'), className: 'text-gray-100' },
    { text: t('Hero.t14') + '.', className: 'text-gray-300' },
  ];

  return (
    <div
      className="min-h-screen bg-main flex items-start pt-20 pb-8 px-4 sm:px-6 lg:px-8 lg:items-center lg:pt-0"
      style={{
        backgroundImage: 'url(/imgs/bgHome.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-2 sm:mt-[120px] mt-2">
              <div className="text-xs sm:text-sm text-muted-foreground bg-white/90 backdrop-blur-sm px-2 py-1 rounded font-mono tracking-wider inline-block">
                PORTFOLIO / 2025
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-400 tracking-tight">
                Pham
                <br />
                <span className="text-white">Hoang</span>
              </h1>
            </div>

            <div className="space-y-6 max-w-md">
              <TypewriterText
                segments={textSegments}
                speed={10}
                className="text-lg sm:text-xl text-gray-300 leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500  rounded-full animate-pulse"></div>
                  Available for work
                </div>
                <div>Vietnamese</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">CURRENTLY</div>
              <div className="space-y-2">
                <div className="text-white">Fullstack Developer</div>
                <div className="text-white">@ _mh.len_</div>
                {/* <div className="text-xs text-muted-foreground">
                  2021 — Present
                </div> */}
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-200 font-mono">FOCUS</div>
              <div className="flex flex-wrap gap-2">
                {[
                  // Core Frontend
                  'React',
                  'Next.js',
                  'TypeScript',
                  'JavaScript (ES6+)',
                  'TailwindCSS',
                  'UI/UX (Figma)',

                  // Backend
                  'Node.js',
                  'NestJS',
                  'Express',

                  // Database
                  'MongoDB',
                  'PostgreSQL',
                  'MySQL',
                  'MariaDB',
                  'Redis',

                  // DevOps / Tools
                  'Docker',
                  'Git / GitHub',
                  'CI/CD',
                  'Cloud Deployment',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs border border-border text-white rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
