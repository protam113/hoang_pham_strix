'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { Container } from './layout/container';

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-main py-16 px-4">
      <Container className="mx-auto">
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-400">
            {[0, 25, 50, 75, 100].map((position) => (
              <div
                key={position}
                className="absolute top-0 w-1 h-6 bg-gray-400"
                style={{ left: `${position}%`, transform: 'translateY(-50%)' }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-10">
            <StatCounterMemo
              value={10}
              suffix="+"
              label="Projects Delivered"
              isVisible={isVisible}
            />
            <StatCounterMemo
              value={5}
              suffix="+"
              label="Satisfied Clients"
              isVisible={isVisible}
            />
            <StatCounterMemo
              value={9000}
              suffix="+"
              label="Exp. In Man-Hours"
              isVisible={isVisible}
            />
            <StatCounterMemo
              value={97}
              suffix="%"
              label="Client Retention Rate"
              isVisible={isVisible}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

function StatCounter({
  value,
  suffix = '',
  label,
  isVisible,
}: {
  value: number;
  suffix?: string;
  label: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;
    const end = value;
    const duration = 2000; // 2s
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      if (current !== ref.current) {
        setCount(current);
        ref.current = current;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, value]);

  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white text-4xl md:text-5xl font-bold">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-300 mt-2">{label}</p>
    </div>
  );
}

// Memoize để tránh re-render
const StatCounterMemo = memo(StatCounter);
