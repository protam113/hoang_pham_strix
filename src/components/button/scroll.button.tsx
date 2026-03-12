'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-center gap-3 z-[9999] pointer-events-none">
      <a
        href="https://www.linkedin.com/in/hoangpham-strix/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 md:w-12 md:h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center transition duration-300 pointer-events-auto"
        aria-label="Linkedin"
      >
        <FaLinkedin size={18} className="md:w-5 md:h-5" />
      </a>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 md:w-12 md:h-12 bg-main text-white rounded-full shadow-lg hover:bg-main-700 flex items-center justify-center transition duration-300 pointer-events-auto"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} className="md:w-5 md:h-5" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
