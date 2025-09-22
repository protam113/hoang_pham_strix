'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LangButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isVietnamese, setIsVietnamese] = useState<boolean | null>(null);

  useEffect(() => {
    if (!pathname) return;
    setIsVietnamese(pathname.startsWith('/vi'));
  }, [pathname]);

  const handleLangChange = (lang: 'vi' | 'en') => {
    if (isVietnamese === null) return;
    router.push(`/${lang}`);
  };

  if (isVietnamese === null) return null;

  return (
    <div className="flex items-center gap-4 text-base lg:text-lg">
      <span
        onClick={() => handleLangChange('en')}
        className={`cursor-pointer ${
          !isVietnamese
            ? 'text-white rounded-lg p-2 border-b-2 bg-main'
            : 'text-black'
        }`}
      >
        EN
      </span>
      /
      <span
        onClick={() => handleLangChange('vi')}
        className={`cursor-pointer ${
          isVietnamese
            ? 'text-white rounded-lg p-2 border-b-2 bg-main'
            : 'text-black'
        }`}
      >
        VN
      </span>
    </div>
  );
};

export default LangButton;
