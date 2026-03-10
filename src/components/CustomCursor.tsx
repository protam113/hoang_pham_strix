'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {isHovered && (
        <div
          ref={cursorRef}
          className="fixed z-[9999] pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 50,
            height: 50,
            left: 0,
            top: 0,
          }}
        >
          <Image
            src="/icons/logo-cricle.svg"
            alt="Custom Cursor"
            width={30}
            height={30}
            className="w-full h-full object-contain drop-shadow-xl"
            priority
          />
        </div>
      )}
    </>
  );
}
