'use client';

import { ScrollProgressBarProps } from '@/types/types.prob';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function NavBar({
  sections,
  className,
}: ScrollProgressBarProps) {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState<Record<string, number>>(
    {}
  );
  const [activeSection, setActiveSection] = useState<string>(''); // Thêm state này
  const lastScrollY = useRef(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const sectionElements = sections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter((item) => item.element !== null);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user has scrolled to the hidden section
      const hiddenSection = document.getElementById('hidden-section');
      if (hiddenSection) {
        const hiddenSectionRect = hiddenSection.getBoundingClientRect();
        if (
          hiddenSectionRect.top < window.innerHeight &&
          hiddenSectionRect.bottom > 0
        ) {
          setVisible(false);
          return;
        }
      }

      // Show/hide the progress bar based on scroll position and hidden section
      if (currentScrollY > 100) {
        const hiddenSection = document.getElementById('hidden-section');
        if (hiddenSection) {
          const hiddenSectionRect = hiddenSection.getBoundingClientRect();
          if (
            hiddenSectionRect.top < window.innerHeight &&
            hiddenSectionRect.bottom > 0
          ) {
            setVisible(false);
          } else {
            setVisible(true);
          }
        } else {
          setVisible(true);
        }
      } else if (currentScrollY < 50) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;

      // Calculate progress for each section
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const newProgress: Record<string, number> = {};
      let highestVisibility = 0;
      let currentActiveSection = '';

      sectionElements.forEach(({ id, element }) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionHeight = rect.height;
        const sectionTop = scrollPosition + rect.top;
        const sectionBottom = sectionTop + sectionHeight;

        // Calculate how much of the section is visible
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visiblePercent = Math.max(
          0,
          Math.min(100, (visiblePx / sectionHeight) * 100)
        );

        // Calculate progress through the section (0-100%)
        const sectionScrollStart = Math.max(0, sectionTop - viewportHeight);
        const sectionScrollEnd = sectionBottom;
        const sectionScrollRange = sectionScrollEnd - sectionScrollStart;

        const progress = Math.max(
          0,
          Math.min(
            100,
            ((scrollPosition - sectionScrollStart) / sectionScrollRange) * 100
          )
        );

        newProgress[id] = progress;

        // Determine which section is most visible (active section)
        if (visiblePercent > highestVisibility) {
          highestVisibility = visiblePercent;
          currentActiveSection = id;
        }
      });

      setScrollProgress(newProgress);
      setActiveSection(currentActiveSection); // Cập nhật active section
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
          className={`w-fit mx-auto px-6 py-2 rounded-full shadow-md
          ${
            isScrolling ? 'bg-white/40 backdrop-blur-2xl shadow-lg' : 'bg-white'
          }
          `}
        >
          <nav className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left section - Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12  rounded-full flex items-center justify-center">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="/ava.jpeg"
                    alt="Profile"
                    className="rounded-full"
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
            <div className="hidden md:flex  px-4 py-2 gap-2">
              {sections.map((section, index) => {
                const isActive = activeSection === section.id;
                return (
                  <Link
                    key={section.id || index}
                    href={`#${section.id}`}
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
                        : isActive
                        ? section.color || '#f97316'
                        : 'rgba(255, 255, 255, 0.7)',
                      border: !isActive
                        ? '1px solid rgba(0, 0, 0, 0.1)'
                        : 'none',
                    }}
                  >
                    {section.label}
                  </Link>
                );
              })}
            </div>

            {/* Right section - Contact Button */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border bg-main text-lg  px-4 py-1 rounded-full text-white hover:bg-main-600 hover:text-white transition"
              >
                Get My CV
              </a>
              <a
                href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-main text-white rounded-full flex items-center justify-center hover:scale-110 transition"
              >
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1"
              onClick={toggleMobileMenu}
            >
              <span className="w-5 h-0.5 bg-black"></span>
              <span className="w-5 h-0.5 bg-black"></span>
              <span className="w-5 h-0.5 bg-black"></span>
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
              <div className="w-8 h-8  rounded-full flex items-center justify-center">
                <Image src="/logo.png" alt="Logo" width={30} height={30} />
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
            >
              CLOSE <X className="ml-1" size={18} />
            </button>
          </div>

          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-6">
            {sections.map((section, index) => {
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
            })}
          </div>

          {/* Mobile contact button */}
          <div className="mt-12 flex items-center gap-2">
            <a
              href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black px-4 py-2 rounded-full text-sm"
              onClick={toggleMobileMenu}
            >
              Get My CV
            </a>

            <a
              href="https://drive.google.com/file/d/1eJqMIYqvkneVRR1o7uMBul9dvbgXzV_B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-main text-black rounded-full flex items-center justify-center"
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
//
