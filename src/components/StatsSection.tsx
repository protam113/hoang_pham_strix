'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from './layout/container';

export function StatsSection() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-main py-16 px-4 ">
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
            <StatCounter
              value={10}
              suffix="+"
              label="Projects Delivered"
              isVisible={isVisible}
            />
            <StatCounter
              value={5}
              suffix="+"
              label="Satisfied Clients"
              isVisible={isVisible}
            />
            <StatCounter
              value={9000}
              suffix="+"
              label="Exp. In Man-Hours"
              isVisible={isVisible}
            />
            <StatCounter
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
}

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

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white text-4xl md:text-5xl font-bold">
        {count}
        {suffix}
      </h3>
      <p className="text-[#3981c8] mt-2">{label}</p>
    </div>
  );
}
