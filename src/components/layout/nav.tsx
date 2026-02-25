'use client';

import { ScrollProgressBarProps } from '@/types/types.prob';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import LangButton from '../button/language.button';

// Throttle function để giảm frequency của scroll events
const throttle = (
  func: (...args: any[]) => void,
  delay: number
): ((...args: any[]) => void) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func.apply(this, args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime)
      );
    }
  };
};

export default function NavBar({ sections }: ScrollProgressBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolling, setIsScrolling] = useState(false);

  const lastScrollY = useRef(0);
  const sectionsRef = useRef<Array<{ id: string; element: HTMLElement }>>([]);
  const rafId = useRef<number | null>(null);

  // Memoize section elements để tránh DOM queries liên tục
  useEffect(() => {
    sectionsRef.current = sections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter((item) => item.element !== null) as Array<{
      id: string;
      element: HTMLElement;
    }>;
  }, [sections]);

  // Tối ưu scroll handler với requestAnimationFrame
  const optimizedScrollHandler = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Batch DOM reads
      const hiddenSection = document.getElementById('hidden-section');
      const hiddenSectionRect = hiddenSection?.getBoundingClientRect();

      // Update scroll state
      setIsScrolling(currentScrollY > 0);

      // Handle visibility logic
      if (hiddenSection && hiddenSectionRect) {
        const isHiddenVisible =
          hiddenSectionRect.top < viewportHeight &&
          hiddenSectionRect.bottom > 0;
        if (isHiddenVisible) {
          return;
        }
      }

      lastScrollY.current = currentScrollY;

      // Batch state updates
      let highestVisibility = 0;
      let currentActiveSection = '';

      // Process sections efficiently
      sectionsRef.current.forEach(({ id, element }) => {
        const rect = element.getBoundingClientRect();
        const sectionHeight = rect.height;

        // Calculate visibility percentage
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visiblePercent = Math.max(
          0,
          Math.min(100, (visiblePx / sectionHeight) * 100)
        );

        // Track most visible section
        if (visiblePercent > highestVisibility) {
          highestVisibility = visiblePercent;
          currentActiveSection = id;
        }
      });

      // Batch state updates để giảm re-renders
      setActiveSection(currentActiveSection);
    });
  }, []);

  // Throttled scroll handler
  const throttledScrollHandler = useCallback(
    () => throttle(optimizedScrollHandler, 16)(),
    [optimizedScrollHandler]
  );

  useEffect(() => {
    // Use passive listeners for better performance
    window.addEventListener('scroll', throttledScrollHandler, {
      passive: true,
    });

    // Initial call
    throttledScrollHandler();

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [throttledScrollHandler]);

  // Memoized smooth scroll handler
  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();

      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 100;
        const elementPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });

        setMobileMenuOpen(false);
      }
    },
    []
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  // Handle body overflow efficiently
  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;

    if (mobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalOverflow || 'unset';
    }

    return () => {
      body.style.overflow = originalOverflow || 'unset';
    };
  }, [mobileMenuOpen]);

  // Memoized navigation items để tránh re-render không cần thiết
  const navigationItems = sections.map((section, index) => {
    const isActive = activeSection === section.id;
    return (
      <a
        key={section.id || index}
        href={`#${section.id}`}
        onClick={(e) => handleSmoothScroll(e, section.id)}
        className={`
          px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105
          ${
            isActive
              ? 'text-white font-semibold scale-105 shadow-lg'
              : 'text-black hover:text-white'
          }
        `}
        style={{
          backgroundColor: isActive
            ? section.color || '#f97316'
            : 'rgba(255, 255, 255, 0.7)',
          border: !isActive ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {section.label}
      </a>
    );
  });

  const mobileNavigationItems = sections.map((section, index) => {
    const isActive = activeSection === section.id;
    return (
      <Link
        key={section.id || index}
        href={`#${section.id}`}
        className={`
          py-2 px-4 rounded-full text-sm font-medium w-fit transition-all hover:scale-105
          ${
            isActive
              ? 'text-white font-semibold scale-105 shadow-lg'
              : 'text-black hover:text-main'
          }
        `}
        style={{
          backgroundColor: isActive
            ? section.color || '#f97316'
            : 'rgba(255, 255, 255, 0.7)',
          border: !isActive ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        }}
        onClick={toggleMobileMenu}
      >
        {section.label}
      </Link>
    );
  });

  return (
    <>
      {/* Desktop Navigation */}
      <div
        data-navbar
        className={`fixed z-50 w-full flex justify-center items-center min-h-[80px] ${
          isScrolling ? 'bg-transparent' : 'bg-transparent'
        }`}
      >
        <div
          className={`w-fit mx-auto px-6 py-2 rounded-full shadow-md transition-all duration-200
          ${
            isScrolling ? 'bg-white/40 backdrop-blur-2xl shadow-lg' : 'bg-white'
          }`}
        >
          <nav className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left section - Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full flex items-center justify-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src="/ava.webp"
                    alt="Profile"
                    className="rounded-full"
                    loading="eager"
                  />
                  <AvatarFallback className="text-6xl">HP</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex text-black flex-col font-semibold">
                <span className="text-xl leading-none font-semibold uppercase">
                  Hoang
                </span>
                <span className="text-xl leading-none font-semibold uppercase">
                  Pham
                </span>
              </div>
            </Link>

            {/* Center section - Navigation Links */}
            <div className="hidden md:flex px-4 py-2 gap-2">
              {navigationItems}
            </div>

            <LangButton />

            {/* Right section - Contact Button */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border bg-main text-lg px-4 py-1 rounded-full text-white hover:bg-main-600 hover:text-white transition-colors duration-200"
              >
                Get My CV
              </a>
              <a
                href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-main text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
              >
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="w-5 h-0.5 bg-black transition-all duration-200"></span>
              <span className="w-5 h-0.5 bg-black transition-all duration-200"></span>
              <span className="w-5 h-0.5 bg-black transition-all duration-200"></span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 md:hidden">
          <div className="flex justify-between items-center mb-12">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Image
                  src="/ava.webp"
                  alt="Logo"
                  width={30}
                  height={30}
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs leading-none font-semibold uppercase">
                  Hoang
                </span>
                <span className="text-xs leading-none font-semibold uppercase">
                  Pham
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              className="flex items-center text-sm font-medium"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              CLOSE <X className="ml-1" size={18} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-6">{mobileNavigationItems}</div>

          {/* Mobile contact button */}
          <div className="mt-12 flex items-center gap-2">
            <a
              href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-4 py-2 rounded-full text-sm transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              Get My CV
            </a>
            <a
              href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-main text-black rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
              onClick={toggleMobileMenu}
            >
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
