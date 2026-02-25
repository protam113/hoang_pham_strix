'use client';

import { PremiumLoaderProps } from '@/types/types.prob';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ShuffleLoader({
  onLoadingComplete,
}: PremiumLoaderProps) {
  const [squares, setSquares] = useState([
    { id: 1, x: 0, y: 0, visible: true },
    { id: 2, x: 1, y: 0, visible: true },
    { id: 3, x: 2, y: 0, visible: true },
    { id: 4, x: 0, y: 1, visible: true },
    { id: 5, x: 1, y: 1, visible: true },
    { id: 6, x: 2, y: 1, visible: true },
    { id: 7, x: 0, y: 2, visible: true },
    { id: 8, x: 1, y: 2, visible: true },
    { id: 9, x: 2, y: 2, visible: true },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSquares((prev) => {
        return prev.map((square) => {
          const visibleCount = prev.filter((s) => s.visible).length;
          if (visibleCount <= 4 && square.visible) return square;

          return {
            ...square,
            visible: Math.random() > 0.3,
          };
        });
      });
    }, 300);

    // ⏱ Loader sẽ chạy trong 2 giây rồi gọi callback
    const timeout = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.(); // 👈 gọi callback sau khi loading kết thúc
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/imgs/bgHome.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="relative w-24 h-24">
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          {squares.map((square) => (
            <motion.div
              key={square.id}
              initial={{ opacity: 1 }}
              animate={{
                opacity: square.visible ? 1 : 0,
                scale: square.visible ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              className="w-7 h-7 bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
