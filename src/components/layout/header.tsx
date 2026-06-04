'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { ScrollProgressBarProps } from '@/types/types.prob';
import { MapPin } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function NavBar({ sections }: ScrollProgressBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('main');
  const drawerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<{ id: string; element: HTMLElement }>>([]);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageSwitch = () => {
    const nextLocale = locale === 'en' ? 'vi' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const viewportHeight = window.innerHeight;
      let highestVisibility = 0;
      let currentActiveSection = activeSection;

      sectionsRef.current.forEach(({ id, element }) => {
        const rect = element.getBoundingClientRect();
        const sectionHeight = rect.height || 1;

        // Calculate visibility percentage
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visiblePercent = Math.max(0, (visiblePx / sectionHeight) * 100);

        if (visiblePercent > highestVisibility) {
          highestVisibility = visiblePercent;
          currentActiveSection = id;
        }
      });

      if (currentActiveSection && currentActiveSection !== activeSection) {
        setActiveSection(currentActiveSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, activeSection]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();

      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.offsetTop - navbarHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });

        setMobileOpen(false);
      }
    },
    []
  );

  const itemSubtitles: Record<string, { en: string; vn: string }> = {
    main: { vn: 'GIỚI THIỆU', en: 'INTRODUCE' },
    about: { vn: 'VỀ TÔI', en: 'WHO AM I' },
    experience: { vn: 'KINH NGHIỆM', en: 'EXPERIENCE' },
    projects: { vn: 'SẢN PHẨM', en: 'PROJECTS' },
    skills: { vn: 'NĂNG LỰC', en: 'SKILLS' },
    apps: { vn: 'ỨNG DỤNG', en: 'APPS' },
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          mobileOpen
            ? 'bg-transparent'
            : scrolled
              ? 'bg-transparent'
              : 'bg-transparent'
        }`}
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a
              href="#main"
              onClick={(e) => handleSmoothScroll(e, 'main')}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="rounded-full flex items-center justify-center">
                <Avatar className="w-14 h-14 sm:w-20 sm:h-20">
                  <AvatarImage
                    src="/ava.webp"
                    alt="Profile"
                    className="rounded-full"
                    loading="eager"
                  />
                  <AvatarFallback className="text-6xl">HP</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex text-black flex-col font-black tracking-tight leading-[0.9]">
                <span className="text-2xl sm:text-3xl font-extrabold uppercase">
                  Hoang
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold uppercase">
                  Pham
                </span>
              </div>
            </a>

            {/* Middle location badge */}
            <div className="hidden md:flex items-center gap-2.5 px-5 py-3 rounded-full border border-black/10 bg-white/40 backdrop-blur-md shadow-sm text-sm font-bold text-black uppercase tracking-widest">
              <MapPin size={18} className="text-red-500 animate-bounce" />
              <span>Based in Ho Chi Minh, VN 🇻🇳</span>
            </div>

            {/* Header controls (Language switch & Burger menu) */}
            <div className="flex items-center gap-3 sm:gap-4 z-[1001]">
              {/* Language Switch Button */}
              <button
                onClick={handleLanguageSwitch}
                className={`w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center font-mono font-bold text-sm tracking-wider transition-all duration-200 cursor-pointer border ${
                  mobileOpen
                    ? 'text-white bg-white/10 hover:bg-white/20 border-white/10'
                    : scrolled
                      ? 'text-main bg-gray-100 hover:bg-gray-200 border-black/5'
                      : 'text-main bg-gray-100 hover:bg-gray-200 border-black/5'
                }`}
                aria-label="Chuyển đổi ngôn ngữ"
              >
                {locale.toUpperCase()}
              </button>

              {/* Burger Menu Button - Visible on all screen sizes */}
              <button
                id="mobile-menu-btn"
                className={`w-[64px] h-[64px] sm:w-[68px] sm:h-[68px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  mobileOpen
                    ? 'text-white bg-white/10 hover:bg-white/20'
                    : scrolled
                      ? 'text-main bg-gray-100 hover:bg-gray-200'
                      : 'text-main bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label="Mở menu"
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                }}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {mobileOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[998] transition-opacity duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* LEFT PANEL - CONNECT (Slides from Left on Desktop) */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-screen bg-[#0a0a0c] text-white z-[999] transition-transform duration-500 ease-in-out shadow-2xl flex flex-col justify-between pt-32 pb-12 px-8 sm:px-16 md:px-24 w-1/2 hidden md:flex ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.3em] text-secondary-500 uppercase">
              KẾT NỐI VỚI TÔI
            </span>
            <h3 className="text-3xl font-black uppercase tracking-tight text-white">
              Hoang Pham
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase block mb-2">
                ĐIỆN THOẠI HỖ TRỢ
              </span>
              <a
                href="tel:+84377783437"
                className="text-2xl font-bold text-white hover:text-secondary-400 transition-colors"
              >
                +84 377 783 437
              </a>
            </div>

            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase block mb-2">
                EMAIL LIÊN HỆ
              </span>
              <a
                href="mailto:hoangpm2003.strix@gmail.com"
                className="text-2xl font-bold text-white hover:text-secondary-400 transition-colors"
              >
                hoangpm2003.strix@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase block">
            MẠNG XÃ HỘI
          </span>
          <div className="flex flex-col space-y-3">
            <a
              href="https://www.facebook.com/vietstrix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white/60 hover:text-white transition-all flex items-center gap-2 group"
            >
              <span>Facebook</span>
              <span className="text-xs text-white/30 group-hover:text-secondary-400 transition-colors">
                @vietstrix
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/hoangpham-strix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white/60 hover:text-white transition-all flex items-center gap-2 group"
            >
              <span>LinkedIn</span>
              <span className="text-xs text-white/30 group-hover:text-secondary-400 transition-colors">
                @hoangpham-strix
              </span>
            </a>
            <a
              href="https://github.com/protam113"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white/60 hover:text-white transition-all flex items-center gap-2 group"
            >
              <span>GitHub</span>
              <span className="text-xs text-white/30 group-hover:text-secondary-400 transition-colors">
                @protam113
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - MENU LINKS (Slides from Right) */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 h-screen bg-[#111115] text-white z-[999] transition-transform duration-500 ease-in-out shadow-2xl flex flex-col justify-between pt-32 pb-12 px-8 sm:px-16 md:px-24 border-l border-white/5 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        } w-full md:w-1/2`}
      >
        <div className="flex-1 overflow-y-auto space-y-8 scrollbar-none">
          {sections.map((section) => {
            const active = activeSection === section.id;
            const subtitle = itemSubtitles[section.id] || {
              vn: 'ĐI TỚI',
              en: section.label.toUpperCase(),
            };

            return (
              <div
                key={section.id}
                className="group border-b border-white/5 pb-6 last:border-none"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase block">
                    {subtitle.vn}
                  </span>
                  <div className="flex items-center justify-between">
                    <a
                      href={`#${section.id}`}
                      className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-all hover:text-secondary-400 ${
                        active ? 'text-secondary-400' : 'text-white'
                      }`}
                      onClick={(e) => handleSmoothScroll(e, section.id)}
                    >
                      {subtitle.en}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info inside menu (Only visible on mobile screens) */}
        <div className="md:hidden border-t border-white/5 pt-6 mt-6 space-y-4">
          <div className="flex flex-row justify-between text-xs text-white/40">
            <a
              href="tel:+84377783437"
              className="hover:text-white transition-colors font-bold"
            >
              +84 377 783 437
            </a>
            <a
              href="mailto:hoangpm2003.strix@gmail.com"
              className="hover:text-white transition-colors font-bold"
            >
              hoangpm2003.strix@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/vietstrix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white/60 hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/in/hoangpham-strix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white/60 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/protam113"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white/60 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Desktop menu copyright footer */}
        <div className="hidden md:flex justify-between items-center text-[10px] text-white/30 tracking-wider font-medium border-t border-white/5 pt-6 mt-6">
          <span>hoangpm2003.strix@gmail.com</span>
          <span>© {new Date().getFullYear()} Hoang Pham</span>
        </div>
      </div>
    </>
  );
}
